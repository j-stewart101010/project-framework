FR.Games = {

	animspeed: 'slow',
	container: false,
	
	Load: function(id){
		FR.Media.StopVideo();
		var self = this;
		this.container = $('#game-' + id);
		this.container.empty().fadeIn(0);
		$('<div class="loading" />').appendTo(this.container);
		$('<iframe id="game-container" src="games/' + id + '.php" frameborder="0" allowtransparency="true" />').appendTo(this.container);
	},
	
	Loaded: function(){
		if(this.container) {
			this.container.find('div.loading').fadeOut(this.animspeed, function(){
				$(this).remove();
			});
		}
	},
	
	UnLoad: function(id){
		$('#game-container').remove();
		this.container = false;
	},
	
	Next: function(){
		FR.Media.UnloadSounds()
	
		var game = FR.GetSubSection();
		FR.SetComplete(game);
		var page = this.container.parents('div.subsection').find('div.page.active').next('div.page');
		this.container.fadeOut(this.animspeed, function(){
			$(this).empty();
		});
		FR.ContentTabs.JumpTo(page, true);	
	},
	
	PlayVideo: function(id, args){
		
		var image = $('#background div.image');
		var video = new MediaElement(id, {
			pluginPath: '../assets/js/mediaelement/',
			enableAutosize: false,
			enablePluginDebug: false,
			success: function(mediaElement, domObject){
				mediaElement.addEventListener('play', function(event) {					
				}, false);
				mediaElement.addEventListener('ended', function(event) {					
					if(args.remove) {
						var wrap = $(domObject).parents('div.video');
						wrap.fadeOut(function(){
							var flash = $('#' + event.target.id);
							if(flash.length) {
								flash.parents('div.me-plugin').remove();
							}
						});
						//image.css('display', 'block');
					}
				}, false);
				if(args.onTimeUpdate) {
					mediaElement.addEventListener('timeupdate', function(){
						args.onTimeUpdate.apply(false, [mediaElement]);
					})
				}
				if(args.onComplete) {
					mediaElement.addEventListener('ended', function(){
						args.onComplete.apply(false, [mediaElement]);
					})
				}
				mediaElement.play();
			}
		});	
	},
	
	AssetLoaded: function(filename, video){
		return window.parent.FR.Preloader.IsLoaded(filename, video);
	},
	
	FlipView: function(view, playvideo){
		FR.Games.flipping = true;
		switch(view) {
			case 'top':
				var from = $('#view-side');
				var to = $('#view-top');
				break;
			case 'side':
				var from = $('#view-top');
				var to = $('#view-side');
				break;
		}
		
		var fromimg = from.find('div.image');
		var toimg = to.find('div.image');
		var tovideo = to.find('div.video');
		var video = to.find('video');
		if(video.length) {
			var videoid = video.attr('id');
			var videosrc = video.find('source').first().attr('src').split('/').pop();
			videosrc = videosrc.substr(0, videosrc.indexOf('.'));
		}
		
		if(playvideo && video.length && this.AssetLoaded(videosrc, true)) {

			to.css('opacity', 0);
			toimg.css('opacity', 0);
			tovideo.css('opacity', 1);
			
			this.video = new MediaElement(videoid, {
				pluginPath: '../assets/js/mediaelement/',
				enableAutosize: false,
				enablePluginDebug: false,
				success: function(mediaElement, domObject){
					mediaElement.addEventListener('play', function(event) {					
						from.animate({
							opacity: 0
						}, function(){
							$(this).css('visibility', 'hidden');
						});
						
						to.css('visibility', 'visible').animate({
							opacity: 1
						});
					}, false);
					mediaElement.addEventListener('ended', function(event) {					
						toimg.animate({
							opacity: 1
						});
						tovideo.animate({
							opacity: 0
						}, function(){
							$('#' + event.target.id).parents('div.me-plugin').remove();			
							FR.Games.flipping = false;
						});
					}, false);
					mediaElement.play();
				}
			});				
		}
		else {
			fromimg.css('visibility', 'visible');
			toimg.css('visibility', 'visible');
			to.css('opacity', 0);
			
			from.animate({
				opacity: 0
			}, function(){
				$(this).css('visibility', 'hidden');
			});
			
			to.css('visibility', 'visible').animate({
				opacity: 1
			}, function(){
				FR.Games.flipping = false;
			});
		}
	}

};