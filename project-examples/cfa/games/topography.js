var Topography = {

	fps: 15,
	// Uphill, Downhill
	speeds: [[1, 1], [2, 1], [4, 1], [8, 1], [16, 1]],
	slidervalue: 0,
	hilltop_pos: -400, // point at which the slope switches to downhill
	sounds_callback_time: 1000,

	Init: function(){
		var self = this;
		self.maskspeed = self.speeds[0][0];
		
		self.levels = $('#background').find('div.background');
		self.firemasks = $('img.firemask');
		self.levels
			.first().addClass('active').css('display', 'block')
			.nextAll().css('display', 'none');
	
		// Tell parent window game is loaded		
		if(window.parent.FR) {
			window.parent.FR.Games.Loaded();
		}
		
		// Set up finish button
		$('#controls a.next').on('click', function(event){
			event.preventDefault();
			window.parent.FR.Games.Next();
		});
		
		// Set up the slider
		$('#topography-slider').slider({
			orientation: 'vertical',
			range: 'min',
			min: 1,
			max: self.levels.length,
			step: 1,
			slide: function(event, ui){
				var index = ui.value - 1;
				//self.slidervalue = index;
				
				// Set mask image				
				self.fire.SetMask($(self.firemasks[index]).attr('id'));
				
				// Update mask speed
				if(self.maskpos < self.hilltop_pos) {
					self.maskspeed = self.speeds[index][0];
				}
				else {
					self.maskspeed = self.speeds[index][1];
				}
				
				// Hill layers are toggled in self.fire.onTextureData() below.				
			}
		});
		
		// Set up masking mask
		self.imask = document.getElementById('mask');
		self.cmask = document.getElementById('mask-canvas');
		self.cmaskctx = self.cmask.getContext('2d');
		self.cmaskctx.drawImage(self.imask, self.imask.width * -1, 0);
		self.maskpos = self.imask.width * -1;
		
		self.mask_interval = window.setInterval(function(){
			if(self.maskpos < 0) {
				// Slow down fire mask when hilltop reached
				if(self.maskpos >= self.hilltop_pos && self.maskspeed > self.speeds[self.slidervalue][1]) {
					self.maskspeed-= 1;
				}
				self.maskpos+= self.maskspeed;
				self.cmask.width = self.cmask.width;
				self.cmaskctx.drawImage(self.imask, self.maskpos, 0);
			}
		}, self.fps);

		// Set up fire
		self.fire = new TextureMask('fire', {
			fps: self.fps,
			loop: true,
			mask: { 
				src: $(self.firemasks[0]).attr('src'),
				frames: 6
			},
			texture: {
				src: 'assets/fire-texture-side.jpg',
				frames: 10
			},
			onTextureData: function(imgdata, obj){
				var mdata = self.cmaskctx.getImageData(0, 0, obj.width, obj.height);
				var w2 = obj.width;
				for(y = 0; y < obj.height; y++) {
					inpos = y * obj.width * 4;
					outpos = inpos + w2 * 4
					for(x = 0; x < w2; x++) {
						r = mdata.data[inpos++];
						g = mdata.data[inpos++];
						b = mdata.data[inpos++];
						a = mdata.data[inpos++];
						// Multiply alpha of texture pixel to combined r/g/b of mask
						var a = imgdata.data[inpos-1];
						a = a * (((r + g + b) / 3) / 255);
						imgdata.data[inpos-1] = a;
					}
				}
				
				// Update hill layer at fire framerate to avoid syncing/jumping issues
				var index = $('#topography-slider').slider('value') - 1;
				if(index != self.slidervalue) {
					self.slidervalue = index;
					var show = $(self.levels[index]);
					var hide = show.siblings('.background');
					show.addClass('active').css({
						display: 'block'
					});
					hide.removeClass('active').css({
						display: 'none'
					});	
				}
				return imgdata;
			}
		});
		
		// Sounds callback interval
		self.sounds_interval = window.setInterval(function(){
			if(window.parent.FR.Media.TriggerSounds) {
				window.parent.FR.Media.TriggerSounds('topography', {
					slider: self.slidervalue,
					position: self.maskpos
				});
			}
		}, self.sounds_callback_time);
		
	}
	
};
