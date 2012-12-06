FR.Footer = {

	animdur: 200,	// Submenu fade duration

	Init: function(){
		var self = this;
		
		// Setup popup submenus
		FR.els.footer.find('div.submenu, div.volume-slider').each(function(){
			var item = $(this);
			if(item.hasClass('submenu')) {
				// Align bottom with footer top
				item.css('top', ($(this).outerHeight() * -1) + 3);
			}
			item
				.css('opacity', 0)
				// Attach mouse events to parent list element
				.parents('li')
					.on('mouseover', function(){
						self.ShowMenu(item);
					})
					.on('mouseout', function(){
						self.HideMenu(item);
					})
					.on('click', function(){
						self.HideMenu(item);
					});
			
			// Create dropshadow element
			var title = item.find('.title');
			var html = title.html();
			title.css('height', title.height()).css('position', 'relative').wrapInner('<span class="text" />');
			$('<span class="shadow" />').html(html).appendTo(title);
		});
		
		// Setup volume slider
		$('#volume-slider').slider({
			orientation: 'vertical',
			range: 'min',
			value: FR.Media.GetVolume(),
			slide: function(event, ui){
				FR.Media.SetVolume(ui.value);
			}
		});
		
		// Min / Max volume event handlers
		$('#volume-max').on('click', function(event){
			event.preventDefault();
			$('#volume-slider').slider('value', 100);
			FR.Media.SetVolume(100);
		});
		
		$('#volume-min').on('click', function(event){
			event.preventDefault();
			$('#volume-slider').slider('value', 0);
			FR.Media.SetVolume(0);
		});
		
	},
	
	ShowMenu: function(submenu){
		var self = this;
		submenu
			.stop(true)
			.css('visibility', 'visible')
			.animate({
				opacity: 1
			}, self.animdur);
	},
	
	HideMenu: function(submenu){
		var self = this;
		submenu
			.stop(true)
			.animate({
				opacity: 0
			}, self.animdur, function(){
				submenu.css('visibility', 'hidden');
			});
	}
	
};