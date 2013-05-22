<?php
    /*
        Template Name: Hotel
    */
?>

<?php get_header(); ?>

<section id="slideshow-container">
	<div id="slideshow">
	  <img src="images/slide-lounge-1.jpg" alt="" />
	  <img src="images/slide-room-1.jpg" alt=""  />
	  <img src="images/slide-neighborhood-1.jpg" alt="" />
	</div>
</section>

<div id="content-container">
	<div class="wrapper">
		<section class="intro">
			<div class="wrapper">
				<h1>Lounge</h1>
				<nav id="sub-nav">

					<ul class="inline-list">
					    <?php wp_list_pages( array('title_li'=>'','include'=>get_post_top_ancestor_id()) ); ?>
					    <?php wp_list_pages( array('title_li'=>'','depth'=>1,'child_of'=>get_post_top_ancestor_id()) ); ?>
					</ul>

				</nav>
			</div>
		</section>

		<section class="info-container">
			<div class="wrapper">

				<?php $content = get_field('content', $post->ID); ?>
				<?php $pdf_links_title = get_field('pdf_links_title', $post->ID); ?>
				<?php $pdf_links = get_field('pdf_links', $post->ID); ?>

				<?php if ($content && $pdf_links_title && $pdf_links) : ?>

					<div class="col">
						<?php echo $content; ?>
					</div>
					<div class="col">
						<h2><?php echo $pdf_links_title; ?></h2>
						<ul class="menu-list">
							<?php foreach ($pdf_links as $pdf_link) : ?>
								<li><a href="<?php echo $pdf_link['pdf_link']; ?>" target="_blank"><?php echo $pdf_link['pdf_link_title']; ?></a></li>
							<?php endforeach; ?>
						</ul>
					</div>

				<?php elseif ($content) : ?>

					<?php echo $content; ?>

				<?php endif; ?>

			</div>
		</section>

		<?php $hotel_events = get_field('hotel_events', $post->ID); ?>

		<section id="promo-container">
			<div class="wrapper">
				<h4 class="line"><span>Events &amp; Promos</span></h4>
				
				<ul class="block-grid two-up mobile">

				<?php foreach ($hotel_events as $hotel_event) : ?>	

				  <li><a href="" data-reveal-id="warhol-nye">
				  	<h2><?php echo get_the_title( $hotel_event->ID ); ?></h2>
				  	<img src="images/placeholder-thumb-promo-1.jpg" alt="Warhol Factory New Years Eve">
				  	<div class="description"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum ultricies neque in pellentesque. Vivamus luctus lectus quam, ac vestibulum est.</p><p class="more-info">Click for more info</p></div></a>
				  </li>

				  <li><a href="" data-reveal-id="sweet-spot">
				  	<h2>The Sweet Spot</h2>
				  	<img src="images/placeholder-thumb-promo-2.jpg" alt="The Sweet Spot">
				  	<div class="description"><p>A sweet and dirty mingling of 50’s/60’s RnB, Rock n Roll, Blues, Soul, Garage, Country, Gospel.</p><p>7:30 - 10:30 Every Sunday</p><p class="more-info">Click for more info</p></div></a>
				  </li>
				
				<?php endforeach; ?>

				</ul>

			</div>
		</section>

		<div id="warhol-nye" class="reveal-modal large">
			<div class="wrapper">
				<div class="modal-content">
				  <h2>Warhol Factory New Years Eve</h2>
				  <img src="images/placeholder-thumb-promo-1.jpg" alt="Warhol Factory New Years Eve">
				  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum ultricies neque in pellentesque. Vivamus luctus lectus quam, ac vestibulum est.</p>
				  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum ultricies neque in pellentesque. Vivamus luctus lectus quam, ac vestibulum est.</p>
				  <p><a href="" target="_blank">Buy Tickets</a></p>
				</div>
				<a class="close-reveal-modal">&#215;</a>
			</div>
		</div>

		<div id="sweet-spot" class="reveal-modal large">
			<div class="wrapper">
				<div class="modal-content">
				  <h2>The Sweet Spot</h2>
				  <img src="images/placeholder-thumb-promo-2.jpg" alt="The Sweet Spot">
				  <p>A sweet and dirty mingling of 50’s/60’s RnB, Rock n Roll, Blues, Soul, Garage, Country, Gospel.</p><p>7:30 - 10:30 Every Sunday</p><p class="more-info">Click for more info</p>
				  <p><a href="" target="_blank">Buy Tickets</a></p>
				</div>
				<a class="close-reveal-modal">&#215;</a>
			</div>
		</div>

	</div>
</div>




<?php get_footer(); ?>
