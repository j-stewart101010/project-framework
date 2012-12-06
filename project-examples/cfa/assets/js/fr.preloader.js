FR.Preloader = {

	files: [
		'assets/images/elements/fireball-strip-150x150.png',
		'games/assets/fire-texture-side.jpg',
		'games/assets/fire-texture-top.jpg',
		'games/assets/fire-texture-side-thermal.jpg',
		'games/assets/fire-texture-top-thermal.jpg',
		'games/assets/awareness/awareness-bg-01.jpg',
		'games/assets/awareness/awareness-bg-02.jpg',
		'games/assets/awareness/awareness-bg-03.jpg',
		'games/assets/awareness/awareness-bg-04.jpg',
		'games/assets/awareness/awareness-bg-05.jpg',
		'games/assets/awareness/awareness-bg-06.jpg',
		'games/assets/awareness/awareness-fdr.png',
		'games/assets/awareness/awareness-over.png',
		'games/assets/dangerrating/dangerrating-bg-side.jpg',
		'games/assets/dangerrating/dangerrating-over.png',
		'games/assets/dangerrating/dangerrating-pointer.png',
		'games/assets/emberattack/emberattack-bg-side.jpg',
		'games/assets/emberattack/emberattack-bg-top.jpg',
		'games/assets/emberattack/emberattack-mask-roof.jpg',
		'games/assets/emberattack/emberattack-mask-spotfire-01.jpg',
		'games/assets/emberattack/emberattack-mask-spotfire-02.jpg',
		'games/assets/emberattack/emberattack-mask-tree.jpg',
		'games/assets/emberattack/ember01.png',
		'games/assets/emberattack/ember02.png',
		'games/assets/emberattack/ember03.png',
		'games/assets/emberattack/ember-out.png',
		'games/assets/radiantheat/radiantheat-bg-side.jpg',
		'games/assets/radiantheat/radiantheat-bg-side-thermal-01.jpg',
		'games/assets/radiantheat/radiantheat-bg-side-thermal-02.jpg',
		'games/assets/radiantheat/radiantheat-bg-side-thermal-03.jpg',
		'games/assets/radiantheat/radiantheat-bg-side-thermal-04.jpg',
		'games/assets/radiantheat/radiantheat-bg-side-thermal-05.jpg',
		'games/assets/radiantheat/radiantheat-bg-top.jpg',
		'games/assets/radiantheat/radiantheat-bg-top-thermal-01.jpg',
		'games/assets/radiantheat/radiantheat-bg-top-thermal-02.jpg',
		'games/assets/radiantheat/radiantheat-bg-top-thermal-03.jpg',
		'games/assets/radiantheat/radiantheat-bg-top-thermal-04.jpg',
		'games/assets/radiantheat/radiantheat-bg-top-thermal-05.jpg',
		'games/assets/radiantheat/radiantheat-mask-bush-side.jpg',
		'games/assets/topography/topography-bg-0deg.jpg',
		'games/assets/topography/topography-bg-10deg.jpg',
		'games/assets/topography/topography-bg-20deg.jpg',
		'games/assets/topography/topography-bg-30deg.jpg',
		'games/assets/topography/topography-bg-40deg.jpg',
		'games/assets/topography/topography-mask-0deg.jpg',
		'games/assets/topography/topography-mask-10deg.jpg',
		'games/assets/topography/topography-mask-20deg.jpg',
		'games/assets/topography/topography-mask-30deg.jpg',
		'games/assets/topography/topography-mask-40deg.jpg',
		'games/assets/topography/topography-mask-mask.jpg'
	],
	
	loaded: {},
	
	Init: function(){
		var video_ext = '.' + FR.videoformat;
		this.files.push('assets/video/loop-smoke' + video_ext);
		this.files.push('assets/video/loop-embers' + video_ext);
		
		this.files.push('games/assets/firespread/firespread-zoom' + video_ext);
		this.files.push('games/assets/firespread/firespread-50kph' + video_ext);
		this.files.push('games/assets/firespread/firespread-75kph' + video_ext);
		this.files.push('games/assets/firespread/firespread-100kph' + video_ext);
		
		this.files.push('games/assets/radiantheat/radiantheat-flip-side' + video_ext);
		this.files.push('games/assets/radiantheat/radiantheat-flip-top' + video_ext);
		
		this.files.push('games/assets/emberattack/emberattack-flip-side' + video_ext);
		this.files.push('games/assets/emberattack/emberattack-flip-top' + video_ext);
		
        this.files.push('assets/video/video-awareness-fact1' + video_ext);
        this.files.push('assets/video/video-dangerrating' + video_ext);
        this.files.push('assets/video/video-firespread' + video_ext);
        this.files.push('assets/video/video-embers-fact' + video_ext);
        this.files.push('assets/video/video-dangerrating-fact' + video_ext);
        this.files.push('assets/video/video-awareness-fact4' + video_ext);
        this.files.push('assets/video/video-embers' + video_ext);
        this.files.push('assets/video/video-topography-fact' + video_ext);
        this.files.push('assets/video/video-topography' + video_ext);
        this.files.push('assets/video/video-awareness-fact2' + video_ext);
        this.files.push('assets/video/video-firespread-fact' + video_ext);
        this.files.push('assets/video/video-radiant' + video_ext);
        this.files.push('assets/video/video-awareness' + video_ext);
        this.files.push('assets/video/video-radiant-fact' + video_ext);
        this.files.push('assets/video/video-awareness-fact3' + video_ext);

        // this should preload all audio files in audio.php
        var audio_ext = '.' + FR.audioformat;
        $('#game_audio audio:not([id$="_alt"])').find('source:first-child').each(function() {
            var src = $(this).attr('src');
            FR.Preloader.files.push(
                (src.substr(0, src.lastIndexOf('.')) || src) + audio_ext
            );
        });
		
		this.LoadFiles();
	},
	
	LoadFiles: function(){
		var index = 0;
		for(var i = 0; i < FR.Preloader.files.length; i++) {
			var file = FR.Preloader.files[i];
			var filename = FR.Preloader.files[i].split('/').pop();
			FR.Preloader.loaded[filename] = false;
			$.ajaxq('preload', {
				url: file,
				cache: true,
				success: function(result) {
					var filename = FR.Preloader.files[index].split('/').pop();
					FR.Preloader.loaded[filename] = true;
					index++;
				}
			});
		}
	},
	
	GetLoaded: function(){
		return this.loaded;
	},
	
	IsLoaded: function(filename, video){
		if(video) {
			filename = filename + '.' + FR.videoformat;
		}
		return this.loaded[filename] ? true : false;
	}
	
};