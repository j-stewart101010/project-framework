FR.Media = {
	
	defaultvolume: 50,	// Default media volume
	video: false,
	
	Init: function(){
		/*
		$('div.video')
			.on('click', function(event){
				event.preventDefault();
				if($(this).hasClass('paused') || FR.Media.video.ended) {
					FR.Media.PlayVideo();
					$(this).removeClass('paused');	
				}
				else {
					FR.Media.PauseVideo();
					$(this).addClass('paused');	
				}		
			})
			.append('<div class="frame"><a class="play" href="#">Toggle video</a></div>');
			*/
	},
	
	SetVolume: function(volume){
		// Set volume of active video
		if(this.video) {
			this.video.setVolume(volume / 100);
		}
		// Store volume setting
		$.cookie('volume', volume, {
			expires: 365
		});
	},
	
	// Get stored volume setting, or default
	GetVolume: function(){
		var volume = parseInt($.cookie('volume'));
		return !isNaN(volume) ? volume : this.defaultvolume;
	},
	
	// Load (& optionally play) a video
	LoadVideo: function(id, autoplay){
		var self = this;
		
		// Stop any playing video
		self.StopVideo();
		
		// Initialise medialelement
		this.video = new MediaElement(id, {
			pluginPath: 'assets/js/mediaelement/',
			enableAutosize: false,
			success: function(mediaElement, domObject){
				if(autoplay) {
					mediaElement.play();
					// iOS does not support autoplaying videos..
					if(mediaElement.paused) {
						$('#' + id).parents('div.video').addClass('paused');
					}
				}
				else {
					$('#' + id).parents('div.video').addClass('paused');
				}
				mediaElement.setVolume(self.GetVolume() / 100);
				mediaElement.addEventListener('ended', function(e) {
					$(this).parents('div.video').addClass('paused');
				}, false);
			},
			error: function(){
			}
		});
	},
	
	// Pause the currently playing video
	PauseVideo: function(){
		if(this.video) {
			this.video.pause();
		}
	},
	
	// Play the currently loaded video
	PlayVideo: function(){
		if(this.video) {
			this.video.play();
			this.video.setVolume(this.GetVolume() / 100);
		}
	},
	
	// Stop the currently loaded video
	StopVideo: function(){
		if(this.video) {
			this.video.stop();
			if(this.video.pluginType != 'native') {
				$('#' + this.video.id).parents('div.me-plugin').remove();
			}
			this.video = false;
		}
	},
	
	// Load a video backgorund
	LoadBackground: function(id){
		new MediaElement(id, {
			pluginPath: 'assets/js/mediaelement/',
			enableAutosize: false,
			loop: true,
			success: function(mediaElement, domObject){
				mediaElement.addEventListener('ended', function(){
					//mediaElement.play();
				});
				mediaElement.play();
			}
		});	
	},
	
	// Unload a video backgorund
	UnloadBackground: function(id){
		var flash = $('#' + id).siblings('div.me-plugin');
		if(flash) {
			flash.remove();
		}
	},
	
	VideoFormat: function(){
		if($.browser.mozilla || $.browser.opera) {
			return 'webm';
		}
		else {
			return 'mp4';
		}	
	},
	
	AudioFormat: function(){
		if($.browser.mozilla || $.browser.opera) {
			return 'ogg';
		}
		else {
			return 'mp3';
		}	
	}

};