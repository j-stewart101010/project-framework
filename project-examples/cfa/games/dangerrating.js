var DangerRating = {

	animrate: 200,

	Init: function(){
	
		// Tell parent window game is loaded		
		if(window.parent.FR) {
			window.parent.FR.Games.Loaded();
		}
		
		// Set up finish button
		$('#controls a.next').on('click', function(event){
			event.preventDefault();
			window.parent.FR.Games.Next();
		});
		
		// Set up game
		var self = this;
		var left = $('#main').width() - $('#ratings').position().left;
		var ratings = $('#ratings div.rating');
		ratings.first().addClass('active');
		ratings.not(':first-child').css('left', left);

		$('#fdr-map area').on('mouseover', function(event){
			var id = $(this).attr('href');
			var next = $(id);
			var prev = $('#ratings div.rating.active');
			prev.removeClass('active');
			
			$('#pointer').attr('class', next.attr('id'));

			next
				.addClass('active')
				.stop(true)
				.css('opacity', 1)
				.animate({
					left: 0
				}, self.animrate, function(){
					prev.css('left', left);
				});
		});
	}
	
};