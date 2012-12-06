FR.Sections.home = {

	Load: function(){
    	// Stop a video if its playing
        FR.Media.StopVideo();
        
		FR.Media.LoadBackground('home-background');
		
		this.keyboard = $('#keys');
		var self = this;
		var word = [];
		
		this.keyboard.find('span.key').each(function(){
			$(this).removeClass('typed');
			// Set up word from letters innerHTML
			if($(this).html()) {
				word.push($(this).html().toLowerCase());
			}
			// Add click events
			$(this).on('mousedown', function(){
				$(this).addClass('down');
				if($(this).hasClass('letter')) {
					self.KeyPress($(this).html());
				}
				else if($(this).hasClass('enter')) {
					self.KeyPress('enter');
				}
			});
			$(this).on('mouseup', function(){
				$(this).removeClass('down');
			});
		});
		self.keyboard.data('word', word);
		
		// Set up keypress handlers
		$(window).on('keydown', function(event){
			var word = self.keyboard.data('word');
			if(event.which != 13) {
				self.KeyPress(String.fromCharCode(event.which));
			}
			else if(word.length == 0) {
				self.KeyPress('enter');
			}
		});
		$(window).on('keyup', function(event){
			$('#keys .key.down').removeClass('down');
		});
	},
	
	Unload: function(){
		FR.Media.UnloadBackground('home-background');
		$(window).off('keydown');
	},

	Init: function(){
		
	},
	
	KeyPress: function(key){
		var self = this;
		var word = self.keyboard.data('word');
		if(key.toLowerCase() == word[0]) {
			FR.Media.TriggerSounds('buttonclick');
			$('#keys .key').not('.typed').first().addClass('down').addClass('typed');
			word.shift();
			self.keyboard.data('word', word);
		}
		else if(key == 'enter' && word.length == 0) {
			FR.Media.TriggerSounds('buttonclick');
			$('#keys .key.enter').addClass('down').addClass('typed');
			self.Unload();
			FR.SetComplete('keyboard');
			FR.SetHash('/enter');
		}
	}
	
};