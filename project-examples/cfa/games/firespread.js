var FireSpread = {

	Init: function(args){
		var self = this;
		var parent = window.parent;
	
		// Tell parent window game is loaded		
		if(window.parent.FR) {
			parent.FR.Games.Loaded();
		}
		
		// Set up finish button
		$('#controls a.next').on('click', function(event){
			event.preventDefault();
			parent.FR.Games.Next();
		});
		
		$('#counter-value').html('');
		
		// Set up video layers
		$('#firespread-zoom').stop(true).fadeIn(0);
		
		// Play intro zoom
		FR.Games.PlayVideo('video-firespread-zoom', {
			onComplete: function(obj){
				$('#firespread-zoom').stop(true).fadeOut();
				$('#firespread-background').stop(true).fadeIn();
				$('#firespread-settings').stop(true).fadeIn();
			}
		});
		
		// Set up slider & play button
		$('#firespread-settings').fadeOut(0);
		$('#windspeed-slider').slider({
			orientation: 'horizontal',
			range: 'min',
			min: 50,
			max: 100,
			step: 25
		});
		
		$('#firespread-play').on('click', function(event){
			event.preventDefault();
			var windspeed = $('#windspeed-slider').slider('value');
			$('#firespread-settings').fadeOut();
			self.Play(windspeed);			
		});
	},
	
	Play: function(windspeed){
		$('#background div.video, #background div.image').stop(true).fadeOut();		
		$('#firespread-' + windspeed).stop(true).fadeIn();
		FR.Games.PlayVideo('video-firespread-' + windspeed, {
			onTimeUpdate: function(obj){
				var s = obj.currentTime * 60 * 60;
				var h = '' + parseInt(s / 3600) % 24;
				if(h.length == 1) h = '0' + h;
				var m = '' + parseInt(s / 60) % 60;
				if(m.length == 1) m = '0' + m;
				var time = h + m;
				var html = '';
				for(var i = 0; i < 4; i++) {
					html+= '<span>' + time.substr(i, 1) + '</span>';
				}
				$('#counter-value').html(html);
			},
			onComplete: function(obj){
				$('#firespread-settings').fadeIn();
			}
		});
		if(window.parent.FR.Media.TriggerSounds) {
			window.parent.FR.Media.TriggerSounds('firespread', {
				windspeed: windspeed
			});
		}
	}
	
};
