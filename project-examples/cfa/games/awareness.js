var Awareness = {

	rating: 'low',
	conditions: {
		'low': {
			'temperature': 15,
			'humidity': 100,
			'wind': 15,
			'vegetation': 15
		},
		'high': {
			'temperature': 30,
			'humidity': 80,
			'wind': 15,
			'vegetation': 30
		},
		'vhigh': {
			'temperature': 45,
			'humidity': 60,
			'wind': 30,
			'vegetation': 45
		},
		'severe': {
			'temperature': 60,
			'humidity': 45,
			'wind': 60,
			'vegetation': 60
		},
		'extreme': {
			'temperature': 80,
			'humidity': 30,
			'wind': 80,
			'vegetation': 80
		},
		'codered': {
			'temperature': 100,
			'humidity': 15,
			'wind': 100,
			'vegetation': 100
		}
	},
	animspeed: 'slow',

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
		

		// Set up backgrounds
		$('#background').find('div.background')
			.first().addClass('active').css('opacity', 1)
			.nextAll().css('opacity', 0);
				
		// Set up FDR
		$('#fdr-map area').on('mouseover', function(event){
			event.preventDefault();
			self.rating = $(this).attr('href').split('#').pop();
			self.UpdateRating();
		});
		
		self.UpdateRating();
	},
	
	UpdateRating: function(){
		var self = this;
		var rating = self.rating;
		
		// Update FDR
		$('#fdr').attr('class', rating);
		
		// Update conditions
		for(var x in self.conditions[rating]) {
			var slider = $('#' + x + '-slider');
			var range = slider.find('div.range');
			range.stop(true).animate({
				width: self.conditions[rating][x] + '%'
			}, self.animspeed);
		}
		
		// Hide/show layers
		var show = $('#background').find('.background.' + rating);
		var hide = show.nextAll();
		show.stop(true).animate({
			opacity: 1
		}, self.animspeed);
		hide.stop(true).animate({
			opacity: 0
		}, self.animspeed);
		
		// Trigger sounds callback
		if(window.parent.FR.Media.TriggerSounds) {
			window.parent.FR.Media.TriggerSounds('awareness', {
				rating: self.rating
			});
		}
		
	}
};