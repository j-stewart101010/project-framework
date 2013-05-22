
<?php get_header(); ?>

<?php $page_banner_images = get_field('page_banner'); ?>

<section id="slideshow-container">
	<div id="slideshow">
	  <?php if ($page_banner_images) : ?>
	    <?php foreach ($page_banner_images as $page_banner_image) : ?>
	      <?php $image = returnImageURL($page_banner_image['image'], 'page_banner'); ?>
	  	  <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
	    <?php endforeach; ?>
	  <?php endif; ?>
	</div>
</section>

<div id="content-container">
	<div class="wrapper">
		<section class="intro">
			<div class="wrapper">
				<h1><?php the_title(); ?></h1>
				<nav id="sub-nav">
					<ul class="inline-list">
						<li class="current_page_item"><a href="">Courtyard Suite</a></li>
						<li><a href="">Grand Suite</a></li>
						<li><a href="">Petite Suite</a></li>
						<li><a href="">Double Queen</a></li>
						<li><a href="">Grand Standard</a></li>
						<li><a href="">Standard</a></li>
						<li><a href="">Share Bath</a></li>
					</ul>
				</nav>
			</div>
		</section>

		<section class="info-container">
			<div class="wrapper">

				<div class="highlight">
					<div class="wrapper">
						<h2>Book a room and get 2 free cocktails</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum ultricies neque. <a href="" target="_blank">Book Now</a></p>
					</div>
				</div>

				<div class="col">
					<?php echo get_field('content'); ?>
				</div>

				<div class="col">
					<div id="interior" class="booking-container">
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
			
				<div id="map-link"><a href="" target="_blank">See the <?php the_title(); ?> <span class="map-line"><span>on the</span></span> property map</a></div>
				<div class="border-container"><hr class="styled-border"></div>

			</div>
		</section>
        
        <?php $reviews = get_posts(array('post_type' => 'reviews', 'posts_per_page'  => 1, 'orderby' => 'rand'));  ?> 

        <?php if ($reviews) : ?>

	        <?php foreach ($reviews as $review) : ?>
				<section id="trip-advisor">
					<div class="wrapper">
						<h4><?php print get_the_title($review->ID); ?></h4>
						<?php print get_field('content', $review->ID); ?>
						<p><a href="<?php echo get_field( 'trip_advisor', $review->ID ); ?>" target="_blank">Read full review</a></p>
					</div>
				</section>	            
	        <?php endforeach; ?>

		<?php endif; ?>

        <?php wp_reset_query(); ?>  

	</div>
</div>

<?php get_footer(); ?>
