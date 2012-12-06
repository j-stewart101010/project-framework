FR.ContentTabs = {

	margin: 8,  	 // Extra left margin
	conleft: 2, 	 // Border-radius of content tabs
	animdur: 'fast', // Slider animation duration

	Init: function(){
		var self = this;
		var margin = this.margin;
		var conleft = this.conleft;
		
		// Set up intro screen
		//var intro = $('#introduction div.intro');
		//intro.css('margin-top', Math.floor(intro.outerHeight() / 2) * -1);
		
		// Set up horizontal page stack
		$('#content div.pages').each(function(){
			var parent = $(this);
			var pages = parent.find('div.page');
			var numpages = pages.length;
			
			// Calculate spacing
			var spacing = parseInt(pages.first().find('div.content').css('margin-left'));
			
			// Calculate content width
			var width = pages.first().width() - (spacing * (numpages - 1));
			
			// Store pages data in page parent
			$(this).data('pages', {
				num: numpages,
				spacing: spacing,
				width: width,
				margin: margin,
				conleft: conleft
			});
			
			// Add next/previous click events
			$(this).find('a.prev').on('click', function(event){
				event.preventDefault();
				self.Paginate(parent, -1);
			});
			$(this).find('a.next').on('click', function(event){
				event.preventDefault();
				self.Paginate(parent, 1);
			});
			
			// Set up left position
			var left = width + margin;
			pages.each(function(i){
				var page = $(this);
				page.css('width', width);
				if(i == 0) {
					// First page
					page.addClass('active');
					var wrap = page.find('div.content');
					// Push content wrapper under tab
					wrap.css('margin-left', parseInt(wrap.css('margin-left')) - margin - conleft);
				}
				else {
					page.css('left', left);
					left+= spacing;
				}
			});			
		});
	},
	
	// Jump to a page
	JumpTo: function(page, immediate){
		var self = this;

		if(page.length) {
			var pages = page.parents('div.pages');
			var data = pages.data('pages');
			var curr = pages.find('div.page.active');
			var prev = page.prevAll('div.page');
			var next = page.nextAll('div.page');
						
			// Current page
			curr.removeClass('active');
			
			// Remove current page video
			var curr_vid = $(curr).find('div.video video');
			if (curr_vid.length) {
    			FR.Media.StopVideo();
            }
			
			
			// Remove any active game
			curr.find('div.game').fadeOut(self.animdur, function(){
				$(this).empty().show(0);
			});
			
			var wrap = curr.find('div.content');
			// Move content wrapper away from tab
			wrap.animate({
				marginLeft: parseInt(wrap.css('margin-left')) + data.margin + data.conleft
			}, immediate ? 0 : self.animdur);
			
			// New page
			var wrap = page.find('.content');
			// Move content wrapper under tab
			wrap.css('margin-left', parseInt(wrap.css('margin-left')) - data.margin - data.conleft);
			// Move page to left
			var left = prev.length * data.spacing;
			page.addClass('active');
			page.animate({
				left: left
			}, immediate ? 0 : self.animdur);
			
			// Look for videos to play
			var page_vid = $(page).find('div.video video');
			if (page_vid.length) {
    			FR.Media.LoadVideo(page_vid.attr('id'), FR.autoplayvideo);
            }
			
			// Preceding pages
			var left = 0;
			prev.reverse().each(function(i){
				// Move page to left
				$(this).animate({
					left: left
				}, immediate ? 0 : self.animdur);
				left+= data.spacing;
			});
			
			// Following pages
			var left = data.width + data.margin + (data.spacing * prev.length - 0);
			next.each(function(i){
				// Move page to right
				$(this).animate({
					left: left
				}, immediate ? 0 : self.animdur);
				left+= data.spacing;
			});	
		}
		else {
			return false;
		}
	},
	
	// Move to previous or next page
	Paginate: function(parent, direction){
		switch(direction) {
			case -1:
				var page = parent.find('div.page.active').prev('div.page');
				break;
			case 1:
				var page = parent.find('div.page.active').next('div.page');
				break;
		}
		if(page.length) {
			this.JumpTo(page);
		}
		else {
			return false;
		}	
	}	

};