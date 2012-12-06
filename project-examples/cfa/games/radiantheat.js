var RadiantHeat = {

	animrate_switch: 'slow',
	animrate_heat: 3000,
	heatlevel: 1,
	view: 'side',

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
		
		self.images_side = $('#view-side-thermal').find('img');
		self.images_top = $('#view-top-thermal').find('img');
		
		$('#view-top').css('opacity', 0);
	
		// Toggle thermal / normal
		$('#thermal-toggle').on('click', function(event){
			event.preventDefault();
			$(this).toggleClass('active');
			if($(this).hasClass('active')) {
				// Thermal view
				$('div.background.normal').stop(true).animate({opacity: 0}, self.animrate_switch);
				$('div.background.thermal').stop(true).animate({opacity: 1}, self.animrate_switch);
				switch(self.view) {
					case 'side':
						self.fire.SetTexture('fire-texture-side-thermal');
						break;
					case 'top':
						break;
				}
			}
			else {
				// Normal view
				$('div.background.normal').stop(true).animate({opacity: 1}, self.animrate_switch);
				$('div.background.thermal').stop(true).animate({opacity: 0}, self.animrate_switch);
				switch(self.view) {
					case 'side':
						self.fire.SetTexture('fire-texture-side');
						break;
					case 'top':
						break;
				}
			}
		});
		
		// Set up toggle view
		$('#view-toggle').on('click', function(event){
			event.preventDefault();
			if(FR.Games.flipping) return;
			$(this).toggleClass('active');
			if($(this).hasClass('active')) {
				FR.Games.FlipView('top', true);
				self.view = 'top';
			}
			else {
				FR.Games.FlipView('side', true);
				self.view = 'side';
			}
		});
	
		// Set up the slider
		self.images_side
			.first().css('opacity', 1)
			.nextAll().css('opacity', 0);
			
		self.images_top
			.first().css('opacity', 1)
			.nextAll().css('opacity', 0);
		
		$('#thermometer-slider').slider({
			orientation: 'vertical',
			range: 'min',
			min: 1,
			max: self.images_side.length,
			step: 1,
			slide: function(event, ui){				
				// Adjust range element for top position
				if(ui.value == self.images_side.length) {
					$(this).addClass('top');
				}
				else {
					$(this).removeClass('top');
				}
				
				var index = ui.value - 1;
				self.heatlevel = ui.value;
				
				// Crossfade thermal levels
				$([self.images_side, self.images_top]).each(function(){
					var images = $(this);
					// Fade in the new image
					$(images[index]).stop(true).animate({
						opacity: 1
					}, self.animrate_heat);
					
					// Fade out any higher images
					$(images[index]).nextAll().stop(true).animate({
						opacity: 0
					}, self.animrate_heat);
				});	

				// Trigger sounds callback
				if(window.parent.FR.Media.TriggerSounds) {
					window.parent.FR.Media.TriggerSounds('radiantheat', {
						heatlevel: self.heatlevel
					});
				}
			
			}
		});
		
		// Set up fire
		self.SetFire('fire-bush-side', 'assets/radiantheat/radiantheat-mask-bush-side.jpg', 'assets/fire-texture-side.jpg');
	},
	
	SetFire: function(id, mask, texture){
		var self = this;
		self.fire = new TextureMask(id, {
			fps: 15,
			loop: 37,
			mask: { 
				src: mask,
				frames: 42
			},
			texture: {
				src: texture,
				frames: 10
			}
		});
	}
	
	
	
};