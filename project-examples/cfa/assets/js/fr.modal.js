FR.Modal = {

	animdur: 'fast',	// Modal show/hide fade duration
	
	Init: function(){
		var self = this;
		$('div.modal').each(function(){
			var modal = $(this);
			
			// Add close event
			modal.find('a.close').on('click', function(event){
				event.preventDefault();
				self.Close(modal);
			});
			
			// Inject overlay if modal is within content section
			if(modal.parents('div.subsection').length) {
				$('<div class="overlay" />').appendTo($(this));
			}
			
			// Set up internal content pages
			var pages = $(this).find('div.steps');
			if(pages.length) {
				pages.find('div.step').hide(0).first().show(0);
				pages.find('a.next').on('click', function(event){
					event.preventDefault();
					$(event.target).parents('div.step').fadeOut();
					$(event.target).parents('div.step').next('div.step').fadeIn();
				});
			}
		});
	},
		
	Close: function(el, immediate){
		var self = this;
		el.parents('div.under-modal').removeClass('under-modal');
		el.fadeOut(immediate ? 0 : self.animdur);
		FR.Media.StopVideo();
	},
	
	Show: function(el, immediate){
		var self = this;
		el.parents('div.section').addClass('under-modal');
		el.fadeIn(immediate ? 0 : self.animdur);
	}

};