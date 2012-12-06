jQuery.fn.reverse = [].reverse;


var FR = {

	animdur: 300,				// Duration of AJAX load / internal navigation fades
	transitions: true,			// Use CSS3 transitions?
	transitiondur: 500,			// CSS3 transition duration (should match transition styles in styles.scss)
	defaultsection: 'home',		// Default content to load when no hash
	autoplayvideo: true,		// Autoplay videos?
	videobg: true,				// Use video backgrounds?
	preloader: true,			// Use preloader?
	complete: [],				// Completed tasks
	Sections: {},

	Init: function(){
		$('html').removeClass('no-js');
		
		// Initialise
		this.loading = false;
		this.section = false;
		this.subsection = false;
		this.videoformat = FR.Media.VideoFormat();
		this.audioformat = FR.Media.AudioFormat();
		
		// Element cache
		this.els = {
			body:   $('body'),
			wrap:   $('#wrap'),
			outer:  $('#outer'),
			main:   $('#main'),
			footer: $('#footer')
		};
		
		// Setup UI elements
		this.Footer.Init();
		this.UpdateComplete();
		
		// Hide content
		this.els.main.find('div.section').css({ opacity: 0, display: 'none' });
		this.els.main.find('div.subsection').css({ opacity: 0, display: 'none' });
		
		// Setup subcontrols
		FR.ContentTabs.Init();
		FR.Modal.Init();
		FR.Media.Init();
		
		// Hashtag navigation
		var self = this;
		self.CheckHash(true);
		$(window).load(function(){
			if(self.preloader) {
				self.Preloader.Init();
			}
			window.setInterval(function(){
				self.CheckHash(false);
			}, 10);
		});

	},
	
	// Check location hash for section/subsection
	CheckHash: function(init){
		if(this.loading) return;
		var hash = this.GetHash();
		if(!hash) {
			hash = this.defaultsection;
			this.SetHash('/' + hash);
		}
		var sections = hash.split('/');
		var section = sections.shift();
		var subsection = sections.shift();

		if(section != this.GetSection() || subsection != this.GetSubSection()) {
			// New section, load content
			this.FocusSection(section, subsection, init);
			this.SetSection(section);
			this.SetSubSection(subsection);
		}
	},
	
	FocusSection: function(sectionid, subsectionid, init){
		var self = this;
		var tosection = $('#' + sectionid);
		
		// Update completed tasks
		FR.UpdateComplete();
		
		if(tosection.length) {
			
			if(subsectionid) {
				// Explicit subsection
				var tosubsection = $('#' + subsectionid);
			}
			else {
				// Default to first subsection, if any
				var tosubsection = tosection.find('div.subsection').first();
				if(tosubsection.length) {
					window.location.hash+= '/' + tosubsection.attr('id');
				}
				else {
					tosubsection = false;
				}
			}
			
			if(sectionid != self.section) {
				// Navigating to different top-level section
				var fromsection = $('#' + self.GetSection());
			}
			else {
				// Navigating to subsection within same section
				var fromsection = $('#' + self.GetSubSection());
			}
			
			// Transition type
			if((self.GetSection() == 'enter' && !tosection.hasClass('splash')) || (sectionid == 'enter' && !fromsection.hasClass('splash'))) {
				var transtype = 'transition';
			}
			else {
				var transtype = 'fade';
			}
			
			if(tosubsection) {
				var loadsection = tosubsection.attr('id');
			}
			else {
				var loadsection = tosection.attr('id');
			}
			
			if(!init) {
								
				// Unload any active game
				fromsection.find('.game').empty();
			
				// Run any unload handler
				self.Media.UnloadSounds();
				self.Media.StopVideo();
				self.UnloadSection(fromsection.attr('id'), loadsection);
				
				// Perform the transition
				switch(transtype) {
					default:

						// Fade out old section
						fromsection.animate({
							opacity: 0
						}, self.animdur, function(){
							
							// Hide old section
							$(this).css('display', 'none');
							self.ResetSection(fromsection);
							
							// Update body class
							FR.els.body.attr('class', sectionid);
							
							self.LoadSection(loadsection, fromsection.attr('id'));
							
							// Fade in new section
							if(tosubsection) {
								tosubsection.css({ opacity: 1, display: 'block' });
							}
							tosection.css('display', 'block');
							tosection.animate({
								opacity: 1
							}, self.animtime, function(){
							});
						});
						break;
				
					case 'transition':
						FR.els.outer.addClass('flip');
												
						// Fade out the old section
						fromsection.animate({
							opacity: 0
						}, self.animdur, function(){
							$(this).css('display', 'none');
						});
						
						// Transition 1/2 way
						window.setTimeout(function(){
							FR.els.body.attr('class', sectionid);
							tosection.addClass('flip');
							
							self.LoadSection(loadsection, fromsection.attr('id'));
							
							// Show the new section
							if(tosubsection) {
								tosubsection.css({ opacity: 1, display: 'block' });
							}
							tosection.css({ opacity: 0, display: 'block' });
							tosection.animate({
								opacity: 1
							}, self.animdur, function(){
							});
							
						}, self.transitiondur / 2);
						
						// Transition finished
						window.setTimeout(function(){
							// Remove transiton classes
							FR.els.outer.removeClass('flip');
							tosection.removeClass('flip');
							
							// Reset the old section
							self.ResetSection(fromsection);
						}, self.transitiondur);
						break;
				}
			}
			else {
				// Update body class
				FR.els.body.attr('class', sectionid);
				
				// Fade in new section
				if(tosubsection) {
					tosubsection.css({ opacity: 1, display: 'block' });
				}
				self.LoadSection(loadsection, false);
				tosection.css('display', 'block');
				tosection.animate({
					opacity: 1
				}, self.animtime, function(){
				});
			}
		}	
	},
	
	ResetSection: function(section){
		// Reset old section subsections
		var subsections = false;
		if(section.hasClass('section')) {
			subsections = section.find('div.subsection');
		}
		else if(section.hasClass('subsection')) {
			subsections = section.parents('div.section').find('div.subsection');
		}
		
		section.find('div.game').fadeIn(0);
		if(subsections) {
			subsections.each(function(){
				// Reset section back to its first page tab
				var page = $(this).find('div.page').first();
				FR.ContentTabs.JumpTo(page, true);
				
				// Show any previously hidden modal
				var modal =  $(this).find('div.modal');
				if(modal.length) {
					FR.Modal.Show(modal, true);
				}
				
				$(this).css({ opacity: 0, display: 'none' });
			});
		}
	},
	
	// Trigger section-specific JS if defined
	LoadSection: function(id, from){
		id = id.replace(/-/g, '');
		if(FR.Sections[id]) {
			FR.Sections[id].Load(from);
		}
	},
	
	UnloadSection: function(id, to){
		if(FR.Sections[id]) {
			FR.Sections[id].Unload(to);
		}
	},
	
	GetHash: function(){
		return window.location.hash.split('#/').pop();
	},
	
	SetHash: function(hash){
		window.location.hash = hash;
	},
	
	GetSection: function(){
		return this.section;
	},
	
	SetSection: function(section){
		this.section = section;
	},
	
	GetSubSection: function(){
		return this.subsection;
	},
	
	SetSubSection: function(subsection){
		this.subsection = subsection;
	},
	
	
	// Check if a task is complete
	IsComplete: function(key){
		var data = this.GetComplete();
		return $.inArray(key, data) > -1 ? true : false;
	},
	
	// Set a task as complete
	SetComplete: function(key){
		var data = this.GetComplete();
		if($.inArray(key, data) < 0) {
			data.push(key);
		}
		this.complete = data;
		$.cookie('complete', $.toJSON(data), {
			//expires: 365
		});
	},
	
	// Get completed task list
	GetComplete: function(){
		var data = $.cookie('complete');
		if(data) {
			data = $.parseJSON(data);
		}
		else {
			data = [];
		}
		return $.merge(data, this.complete);
	},
	
	// Update the UI to reflect completed tasks
	UpdateComplete: function(parent){
		if(!parent) parent = FR.els.body;
		var data = this.GetComplete();
		for(var i = 0; i < data.length; i++) {
			parent.find('.' + data[i]).addClass('complete');
		}
	},
	
	// Check if all tasks in a section are complete
	SectionComplete: function(key){
		var sectioncomplete = true;
		var sectiontasks = FR.tasks[key].sections;
		for(var key in sectiontasks) {
			if(!FR.IsComplete(key)) {
				sectioncomplete = false;
			}
		}
		return sectioncomplete;
	}

};


$(document).ready(function(){
	if($('body').hasClass('fireready')) {
		FR.Init();
	}
});