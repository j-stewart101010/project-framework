<?php get_header(); ?>

<div id="home" class="booking-container">
	<div class="row">
		<form id="checkinform" class="custom" method="" action="">
			<div class="form-field">
				<label class="overlabel" id="checkin" for="checkin">Arrival</label>
				<input type="text" name="checkin" class="checkin required hasDatepicker">
				<img class="ui-datepicker-trigger" src="<?php print THEME_IMAGES; ?>/icons/calendar.png" alt="Date Picker">
			</div>
			<div class="form-field">
				<label class="overlabel" id="checkout" for="checkout">Departure</label>
				<input type="text" name="checkout" class="checkout required hasDatepicker">
				<img class="ui-datepicker-trigger" src="<?php print THEME_IMAGES; ?>/icons/calendar.png" alt="Date Picker">
			</div>
			<div class="form-field">
				<div class="custom dropdown">
					<a href="#" class="current">
						# of Adults
					</a>
					<a href="#" class="selector"></a>
					<ul>
						<li>1</li>
						<li>2</li>
						<li>3</li>
					</ul>
				</div>
			</div>
			<div class="form-field">
				<input type="submit" class="button" value="Check Availability">
			</div>
		</form>
	</div>
</div>
<?php get_footer(); ?>
<script src="js/vendor/supersized.3.2.7.min.js"></script>
<script>
$(function() {
	$.supersized({
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   3000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	1000,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript

		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   1,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width

		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	1,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation

		slides 					:  	[	// Slideshow Images
		{	image : ROOT_URL+'/images/homepage-slide-1.jpg', 
		title : ''
	},
	{	image : ROOT_URL+'/images/homepage-slide-1.jpg', 
	title : ''
}
],

		// Theme Options			   
		progress_bar			:	1,			// Timer for each slide							
		mouse_scrub				:	0
	});
});
</script>
<!--Navigation-->
<ul id="slide-list"></ul>

<div class="bottom-container">
	<div class="wrapper row text-center">
		<div class="copy">
			<p><img src="images/homepage-copy-image.png" alt=""></p>
			<p>Welcome to the San Jose, a hotel for friends from near and far in Austin, Texas. Built in 1936 as an "ultramodern" motor court, the property has been transformed into a 40 room urban bungalow-style hotel tucked behind stucco walls and set amidst lush garden courtyards. The San Jose is located on South Congress Avenue, a few blocks from downtown and Lady Bird Johnson Lake in the heart of one of Austin's favorite neighborhoods. More than just a unique place to sleep, the Hotel San Jose serves as a gathering place and occasional hub of community activity for locals and visitors alike. Dogs are always welcome.</p>
		</div>
	</div>
	<footer>
	  <div class="wrapper">
	  
	    <div id="footer-links">
	      <ul class="inline-list">
	        <li><a href="#">Sitemap</a></li>
	        <li><a href="http://www.facebook.com/pages/Hotel-San-Jose/69339791672" target="_blank">Facebook</a></li>
	        <li><a href="#">Instagram</a></li>
	        <li><a href="https://twitter.com/SanJoseHotel" target="_blank">Twitter</a></li>
	        <li><a href="#">Spotify</a></li>
	        <li><a href="http://www.tripadvisor.com/Hotel_Review-g30196-d142074-Reviews-Hotel_San_Jose-Austin_Texas.html" target="_blank">Trip Advisor</a></li>
	      </ul>
	    </div>

	    <div id="footer-info">
	      <h4>Enter your email address to receive news and offers from us</h4>
	      <form id="subscribeform-footer" method="post" action="">
	          <div class="form-field">
	              <label class="overlabel" id="email-footer" for="email-footer">Email Address</label>
	              <input type="text" name="email-footer" class="email-footer required">
	          </div>
	          <input type="submit" class="button expand postfix" value="Submit &rarr;">
	      </form>
	      <div class="logo-container">
	        <a class="logo" href=""><img src="<?php print THEME_IMAGES; ?>/logos/bunkhouse.png" alt="Bunkhouse"></a>
	        <a class="logo sm" href=""><img src="<?php print THEME_IMAGES; ?>/logos/jos.png" alt="Jo's"></a>
	      </div>
	    </div>

	  </div>
	</footer>
</div>

