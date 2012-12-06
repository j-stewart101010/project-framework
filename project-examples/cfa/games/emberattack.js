var EmberAttack = {

	animrate: 'slow',

	Init: function(){
		var self = this;
		
		// Tell parent window game is loaded		
		if(window.parent.FR) {
			window.parent.FR.Games.Loaded();
		}
		
		// Set up next button
		$('#controls a.next').on('click', function(event){
			event.preventDefault();
			window.parent.FR.Games.Next();
		});
		
		// Set up modal buttons
		$('#emberattack-play').on('click', function(event){
			event.preventDefault();
			$('#wrap').animate({
				opacity: 0
			}, function(){
				window.location = window.location;
			});
		});
		$('#emberattack-skip').on('click', function(event){
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
		
		// Start the game
		EmberAttackGame.Init({
			fps: 15,
			spawnrate: 1000,
			spawnratemin: 200,
			spawnrateadjust: 10,
			clickelem: $('#controls'),
			onComplete: function(obj){
				$('#ember-count').html(obj.extinguishcount + ' ember' + (obj.extinguishcount != 1 ? 's' : ''));
				window.setTimeout(function(){
					$('#emberattack-modal').fadeIn();
				}, 5000);
			}
		});
	}
	
};

var EmberAttackGame = {
	hitspots: [
		// Left, right, top, bottom
		{
			id: 'roof-l',
			coords: [520, 640, 280, 330],
			burn_threshold: 2,
			landed_count: 0,
			sprites: {
				mask: {
					src: 'assets/emberattack/emberattack-mask-roof.jpg', frames: 98, loop: 75
				},
				texture: {
					src: 'assets/fire-texture-side.jpg', frames: 10
				}
			}
		},
		{
			id: 'ground',
			coords: [0, 944, 490, 520],
			burn_prob: 50,
			burn_size: 100,
			burn_max: 4,
			burn_count: 0,
			sprites: {
				mask: [
					{ src: 'assets/emberattack/emberattack-mask-spotfire-01.jpg', frames: 31, loop: 7 },
					{ src: 'assets/emberattack/emberattack-mask-spotfire-02.jpg', frames: 31, loop: 7 }
				],
				texture: {
					src: 'assets/fire-texture-side.jpg', frames: 10
				}
			}
		}
	],
	
	embers: [],
	sprites: [],
	elindex: 0,
	elcount: 0,
	extinguishcount: 0,
	time: 0,
	view: 'side',
	sounds_callback_time: 2000,
	
	Init: function(args){
		var self = this;
		self.args = args;
		self.UpdateScore();
		
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
		
		// Burning tree
		var tree = new TextureMask('tree-fire', {
			fps: 10,
			loop: 50,
			mask: { 
				src: 'assets/emberattack/emberattack-mask-tree.jpg',
				frames: 66
			},
			texture: {
				src: 'assets/fire-texture-side.jpg',
				frames: 10
			}
		});
		
		self.Run();
	},
	
	Run: function(){
		var self = this;
		self.canspawn = true;
		
		var millis = 1000 / self.args.fps;
		
		// Render interval
		self.render_interval = window.setInterval(function(){
			self.time+= millis;
			self.Render();			
		}, millis);
		
		// Spawn interval
		self.Spawn();
		
		// Sounds callback interval
		self.sounds_interval = window.setInterval(function(){
			if(window.parent.FR.Media.TriggerSounds) {
				window.parent.FR.Media.TriggerSounds('emberattack', {
					timeelapsed: Math.floor(self.time)
				});
			}
		}, self.sounds_callback_time);
	},
	
	Spawn: function(){
		var self = this;
		if(self.canspawn) {
			self.AddElement();
		}
		window.setTimeout(function(){
			if(self.args.spawnrate > self.args.spawnratemin && self.canspawn) {
				self.args.spawnrate-= self.args.spawnrateadjust;
			}
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
						switch(self.view) {
							case 'side':
								self.cc.drawImage(el.sprite, el.x, el.y);
								break;
							case 'top':
								break;
						}
						break;
					case 'landed':
						switch(self.view) {
							case 'side':
								self.cc.drawImage(el.sprite, el.x, el.y);
								break;
							case 'top':
								break;
						}
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
				self.RemoveElement(el);	
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
				
			case 'roof-l':
				hitspot.landed_count++;
				if(hitspot.landed_count == hitspot.burn_threshold) {
					self.RemoveElement(el);	
					
					// Load a roof fire
					var wrapid = 'roof-fire';
					var wrap = $('<div>')
						.attr({
							'id': wrapid,
							'class': 'canvas'
						});
					$(wrap).appendTo($('#background'));
					
					var texture = hitspot.sprites.texture;
					var mask = hitspot.sprites.mask;
					var fire = new TextureMask(wrapid, {
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
					
					// Trigger sounds callback
					if(window.parent.FR.Media.TriggerSounds) {
						window.parent.FR.Media.TriggerSounds('emberattack', {
							rooffire: true
						});
					}
					
					// End the game
					self.EndGame();
					
				}
				else if(hitspot.landed_count > hitspot.burn_threshold) {
					self.RemoveElement(el);	
				}
				break;
		}
		self.hitspots[index] = hitspot;
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
		self.extinguishcount++;
		self.UpdateScore();
		
		// Trigger sounds callback
		if(window.parent.FR.Media.TriggerSounds) {
			window.parent.FR.Media.TriggerSounds('emberattack', {
				extinguish: true
			});
		}
	},
	
	RemoveElement: function(el, updatetotal){	
		var self = this;
		delete self.embers[el.id];
		if(updatetotal) {
			self.elcount--;
		}
	},
	
	UpdateScore: function(){
		var self = this;
		var score = (self.extinguishcount + '').split();
		while(score.length < 4) {
			score = '0' + score;
		}
		var html = '';
		for(var i = 0; i < 4; i++) {
			html+= '<span>' + score.substr(i, 1) + '</span>';
		}
		$('#counter-value').html(html);
	},
	
	EndGame: function(){
		var self = this;
		self.canspawn = false;
		if(self.args.onComplete) {
			self.args.onComplete.apply(false, [self]);
		}
	}

};
