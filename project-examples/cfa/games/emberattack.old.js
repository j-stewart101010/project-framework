var EmberAttack = {

	animrate: 'slow',

	Init: function(){
		var self = this;
		
		// Tell parent window game is loaded		
		if(window.parent.FR) {
			window.parent.FR.Games.Loaded();
		}
		
		// Set up finish button
		$('#controls a.next').on('click', function(event){
			event.preventDefault();
			window.parent.FR.Games.Next();
		});
		
		// Set up toggle view
		$('#view-toggle').on('click', function(event){
			event.preventDefault();
			if(FR.Games.flipping) return;
			$(this).toggleClass('active');
			if($(this).hasClass('active')) {
				FR.Games.FlipView('top', true);
			}
			else {
				FR.Games.FlipView('side', true);
			}
		});
		
		// Burning tree
		var tree = new TextureMask('tree', {
			fps: 15,
			loop: true,
			mask: {
				src: '../assets/images/games/mask-tree.jpg',
				frames: 15
			},
			texture: {
				src: '../assets/images/games/fire-texture-side.jpg',
				frames: 10
			}
		});
		
		// Start the game
		EmberAttackGame.Init({
			fps: 15,
			spawnrate: 1000,
			spawnadjust: 100,
			clickelem: $('#controls')
		});
	}
	
};

var EmberAttackGame = {
	hitspots: [
		// Left, right, top, bottom
		{
			id: 'roof-l',
			coords: [520, 640, 280, 330],
			burn_threshold: 4,
			burn_texture: '../assets/images/games/fire-texture-side.jpg',
			burn_mask: '../assets/images/games/mask-emberattack-roof-l.jpg'
		},
		{
			id: 'roof-r',
			coords: [854, 894, 280, 330],
			burn_threshold: 4,
			burn_texture: '../assets/images/games/fire-texture-side.jpg',
			burn_mask: '../assets/images/games/mask-emberattack-roof-r.jpg'
		},
		{
			id: 'ground',
			coords: [0, 944, 480, 520],
			burn_prob: 50,
			burn_size: 100,
			burn_max: 4,
			burn_count: 0,
			sprites: {
				texture: {
					src: '../assets/images/games/fire-texture-side.jpg', frames: 10
				},
				mask: [
					{ src: '../assets/images/games/mask-spotfire-01.jpg', frames: 31, loop: 7 },
					{ src: '../assets/images/games/mask-spotfire-02.jpg', frames: 31, loop: 7 }
				]
			}
		}
	],
	
	embers: [],
	sprites: [],
	elindex: 0,
	elcount: 0,
	
	Init: function(args){
		var self = this;
		self.args = args;
		
		// Main draw canvas
		self.canvas = document.getElementById('canvas');
		self.cc = self.canvas.getContext('2d');
		
		// Onclick handler
		if(!self.args.clickelem) {
			self.args.clickelem = self.canvas;
		}
		$(self.args.clickelem).on('click', function(event){
			var x = event.clientX;
			var y = event.clientY;
			$(self.embers).each(function(i, el){
				if(el && el.status == 'falling' && x >= el.x && x <= el.x + el.w && y >= el.y && y <= el.y + el.h) {
					el.strength--;
					if(el.strength < 1) {
						self.ExtinguishElement(el);
					}
				}
			});
		});
		
		// Setup sprites
		var spriteimages = document.getElementById('sprites').getElementsByTagName('img');
		for(var i = 0; i < spriteimages.length; i++) {
			var img = spriteimages[i];
			var id = img.id;
			var canvas = document.createElement('canvas');
			canvas.setAttribute('width', img.width);
			canvas.setAttribute('height', img.height);
			var cb = canvas.getContext('2d');
			cb.drawImage(img, 0, 0);
			img.parentNode.insertBefore(canvas, img);
			if($(img).attr('id') != 'ember-out') {
				self.sprites.push(canvas);
			}
			else {
				self.sprite_out = canvas;
			}
		}
		
		self.Run();
	},
	
	Run: function(){
		var self = this;
		
		// Render interval
		self.interval = window.setInterval(function(){
			self.Render();
		}, 1000 / self.args.fps);
		
		// Spawn interval
		self.Spawn();
	},
	
	Spawn: function(){
		var self = this;
		self.AddElement();
		window.setTimeout(function(){
			self.Spawn();
		}, self.args.spawnrate);
	},
	
	Render: function(){
		var self = this;
		self.canvas.width = self.canvas.width;
		var embers = self.embers;
		for(var id in self.embers) {
			var el = embers[id];
			var xc = el.x + (el.w / 2);
			var yc = el.y + (el.h / 2);
			if(el.p <= self.paths[el.path].length) {
			
				if(el.status == 'falling') {
					// Check if within hitspot
					$(self.hitspots).each(function(i, hitspot){
						var t = hitspot.coords[2] + (Math.random() * 50); // Randomise offset top to better distribute landed embers
						if(xc > hitspot.coords[0] && xc < hitspot.coords[1] && yc > t && yc < hitspot.coords[3]) {
							switch(el.status) {
								default:
									el.status = 'landed';
									self.Landed(el, i);	
									self.RemoveElement(el);									
									break;
								case 'extinguished':
									self.RemoveElement(el, false);
									break;
							}
						}
					});
				}
				
				switch(el.status) {
					default:
						// Update element position
						var perc = (el.p / self.paths[el.path].length) * 100; // Percentage of path complete
						el.x = self.paths[el.path][el.p][0];
						el.y = self.paths[el.path][el.p][1];
						el.y+= el.offset_s + ((perc / 100) * el.offset_e); // Add percentage of path complete * end offset to ypos
						el.p+= 5;
						embers[id] = el;
						self.cc.drawImage(el.sprite, el.x, el.y);
						break;
					case 'landed':
						self.cc.drawImage(el.sprite, el.x, el.y);
						break;
				}
			}
			else {
				// element has left the screen..
				self.RemoveElement(el, false);
			}
		}
		self.embers = embers;
	},
	
	Landed: function(el, index){
		var self = this;
		var hitspot = self.hitspots[index];
		switch(hitspot.id) {
			case 'ground':
				if(hitspot.burn_count < hitspot.burn_max && Math.random() * 100 < hitspot.burn_prob) {
					// Load a spot fire
					var wrapid = 'spotfire-' + new Date().getTime();
					var wrap = $('<div>')
						.attr({
							'id': wrapid,
							'class': 'canvas'
						})
						.css({
							'width': hitspot.burn_size,
							'height': hitspot.burn_size,
							'top': el.y - (hitspot.burn_size / 1.3),
							'left': el.x - (hitspot.burn_size / 2)
						});
					$(wrap).appendTo($('#background'));
					
					var texture = hitspot.sprites.texture;
					var mask = hitspot.sprites.mask[Math.floor(Math.random() * hitspot.sprites.mask.length)];
					var spotfire = new TextureMask(wrapid, {
						fps: 15,
						loop: mask.loop,
						mask: {
							src: mask.src,
							frames: mask.frames
						},
						texture: {
							src: texture.src,
							frames: texture.frames
						}
					});
					
					hitspot.burn_count++;
					self.hitspots[index] = hitspot;
				}
				break;
		}
	},
	
	AddElement: function(args){
		var self = this;
		var args = {};
		
		args.path = Math.floor(Math.random() * self.paths.length);
		args.sprite = self.sprites[Math.floor(Math.random() * self.sprites.length)];
		args.offset_s = Math.floor(Math.random() * 300) * -1;
		args.offset_e = Math.floor(Math.random() * 700);
		
		args.id = self.elindex;
		args.w = args.sprite.width;
		args.h = args.sprite.height;
		args.p = 0; // Current point within path
		args.age = 0;
		args.strength = 1;
		args.status = 'falling';
		
		self.embers[self.elindex] = args;
		self.elindex++;
		self.elcount++;
	},
	
	ExtinguishElement: function(el){
		var self = this;
		el.sprite = self.sprite_out;
		el.status = 'extinguished';
		self.embers[el.id] = el;
		self.elcount--;
	},
	
	RemoveElement: function(el, updatetotal){	
		var self = this;
		delete self.embers[el.id];
		if(updatetotal) {
			self.elcount--;
		}
	}

};

/*
var spawn = function(){
	EmberAttackGame.AddElement();
	window.setTimeout(function(){
		spawn();
	}, 1000);
};
*/
