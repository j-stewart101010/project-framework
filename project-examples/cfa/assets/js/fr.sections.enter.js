
FR.Sections.enter = {

	animrate: 3000,
	animpause: 5000,
	defaultsection: 'risk',
	// Main navigation sprite sizes
	sprite_small: 100,
	sprite_med: 130,
	sprite_large: 160,
	// Completed navigation sprite sizes
	complete_small: 25,
	complete_med: 35,
	complete_large: 45,
	
	init: true,
	
	Load: function(from){
	
		FR.Media.LoadBackground('enter-background');
		this.el = $('#enter');
		this.items = this.el.find('div.navigation .item');
		
		// Set up current section
		if(!from || from == 'home') {
			this.currentsection = this.defaultsection;
		}
		else {
			// Has user completed all tasks in this section?
			if(!FR.SectionComplete(from)) {
				this.currentsection = from;
			}
			else {
				// Find the next incomplete section
				var nextsection = false;
				for(var key in FR.tasks) {
					if(!nextsection && !FR.SectionComplete(key)) {
						nextsection = key;
					}
				}
				if(nextsection) {
					this.currentsection = nextsection;
				}
				else {
					// All sections complete
					FR.SetHash('/finished');
				}
			}
		}
		
		// Play intro
		this.IntroContent(this.init);
		
		var self = this;
		if(this.init) {
			this.init = false;
			
			// Set up main navigation
			var index = 0;
			
			this.el.find('div.navigation').each(function(){
				var titlelink = $(this).find('.title a');
				var section = titlelink.attr('rel');
				titlelink.on('click', function(event){
					event.preventDefault();
					FR.SetHash('/' + section);
				});
				
				$(this).find('.item').each(function(){
					var id = 'nav-' + index;
					var item = $(this);				
					item.attr('id', id);
					item.find('div.link').css({ opacity: 0 });

					// Set up mouse events
					item.on('mouseenter', function(){						
						var id = $(this).attr('id');
						self.items.each(function(){
							if($(this).attr('id') != id) {
								// Shrink other items
								if($(this).hasClass(self.currentsection)) {
									var size = self.Dimensions(self.sprite_small, self.sprite_large);
								}
								else {
									var size = self.Dimensions(self.complete_small, self.complete_large);
								}
								$(this).find('div.sprites').stop(true).animate(size, 'fast');
							}
							else {
								// Expand this item
								if($(this).hasClass(self.currentsection)) {
									var size = self.Dimensions(self.sprite_large, self.sprite_large);
									var left = 16;
								}
								else {
									var size = self.Dimensions(self.complete_large, self.complete_large);
									var left = 0;
								}
								$(this).find('div.sprites').stop(true).animate(size, 'fast');
								$(this).find('div.link').stop(true).animate({
									left: left,
									opacity: 1
								}, 'fast');
							}
						});
					});
					item.on('mouseleave', function(){
						self.items.each(function(){
							if($(this).hasClass(self.currentsection)) {
								var size = self.Dimensions(self.sprite_med, self.sprite_large);
							}
							else {
								var size = self.Dimensions(self.complete_med, self.complete_large);
							}
							$(this).find('div.sprites').stop(true).animate(size, 'fast');
							$(this).find('div.link').stop(true).animate({
								left: 0,
								opacity: 0
							}, 'fast');
						});
					});
					item.on('click', function(event){
						event.preventDefault();
						var hash = '/' + section + '/' + $(this).find('a').attr('rel');
						FR.SetHash(hash);
					});
				
    				// set float limits
    				var position_top = parseInt(item.css('top'));
    				var position_left = parseInt(item.css('left'));
    				item.data({
    				    range_bottom: position_top - 50,
    				    range_top: position_top + 50,
    				    range_left: position_left - 50,
    				    range_right: position_left + 50
    				});
					
					index++;
				});
			
			});
		} // end init
		
		// Set up current / other sections
		this.el.find('div.navigation').each(function(){
			var section = $(this).attr('id').split('-').pop();
			if(section == self.currentsection) {
				$(this).removeClass('othersection');
				$(this).addClass('currentsection');
			}
			else {
				$(this).removeClass('currentsection');
				$(this).addClass('othersection');
			}
		});
		
		// Set up scaling images & animated sprites
		self.sprites = [];
		self.items.each(function(){
			var subsection = $(this).find('a').attr('rel');
			var current = $(this).hasClass(self.currentsection) ? true : false;
			if(current) {
				var large = self.sprite_large;
				var med = self.sprite_med;
				var sprite = new PNGAnim('sprite-' + subsection, 'assets/images/elements/fireball-strip-150x150.png', 31);
				self.sprites.push(sprite);
			}
			else {
				var large = self.complete_large;
				var med = self.complete_med;
			}
			
			var images = $(this).find('div.images');
			images.css({
				width:  large,
				height: large
			});
			
			var sprites = $(this).find('div.sprites');
			sprites.css(self.Dimensions(med, large));
			
			// start floating around
			//if ($(this).parent().hasClass('currentsection')) {
    		//	self.FloatAround($(this));
			//}	
		});
		
	},
	
	FloatAround: function(elem) {
	   if (elem.is(':visible')) {
    	   elem.animate({
    	       top: FR.Sections.enter.RandomInt(elem.data('range_bottom'), elem.data('range_top')),
    	       left: FR.Sections.enter.RandomInt(elem.data('range_left'), elem.data('range_right'))
    	   }, FR.Sections.enter.RandomInt(2000, 4000), 'linear', function() {
    	       FR.Sections.enter.FloatAround(elem);
    	   });
	   }
	},
	
	RandomInt: function(min, max) {
	   return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	Dimensions: function(size, relativeto){
		var self = this;
		return {
			width:  size,
			height: size,
			top:   (relativeto - size) / 2,
			left:  (relativeto - size) / 2
		};
	},
	
	Unload: function(to){
		for(var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].Destroy();
		}
		this.sprites = [];
		FR.Media.UnloadBackground('enter-background');
	},
	
	IntroContent: function(show){
		// Fade in/out content
		var self = this;
		var navigation = $('#enter-navigation');
		var content = $('#enter div.content div.inner');
		
		navigation.css({ opacity: 0 })
		content.css({ opacity: 0 })
		
		if(show) {
			content
				.animate({
					opacity: 1
				}, self.animrate, function(){
					navigation.animate({
						opacity: 1
					}, self.animrate);
				});	
			/*window.setTimeout(function(){
				content
				.animate({
					opacity: 0
				}, self.animrate);
			}, self.animpause);*/
		}
		else {
			content.css({ display: 'none' });
			navigation.animate({
				opacity: 1
			}, 'slow');
		}		
	}
	
};