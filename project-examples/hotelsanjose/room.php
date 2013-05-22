<?php
    /*
        Template Name: Rooms
    */
?>

<?php get_header(); ?>

<div id="content-container">
	<div class="wrapper">

		<section class="intro">
			<div class="wrapper">
				<h1>Rooms</h1>
			</div>
		</section>

		<section id="room-container">
			<div class="wrapper">

				<?php $rooms = get_posts( array( 'post_type' => 'rooms', 'posts_per_page'  => -1 ) ); ?> 
				<?php $lastElement = end($rooms); ?>

				<?php foreach ($rooms as $key => $room) : ?>

					<?php $fields = get_fields($room->ID); ?>

					<article class="room-block">
				    	<a href="<?php echo get_permalink( $room->ID ); ?>">
					    	<div class="description"><h3><?php echo $fields['excerpt']; ?></h3></div>
					    	<?php $image = returnImageURL($fields['thumbnail'], 'room-thumb'); ?>
					    	<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
				    	</a>
				    	<h2><?php echo get_the_title($room->ID); ?></h2>
			    	</article>	

					<?php if ($room->ID == $lastElement->ID) : ?>

						<article class="room-block amenities">
					    	<div class="text" style="height: 356px;">
								<?php echo get_field('amenities_list', 'option'); ?>
							</div>
					    	<h2><?php echo get_field('amenities_title', 'option'); ?></h2>
					    </article>

				    <?php endif; ?>		        	

				<?php endforeach; ?>
			
			</div>
		</section>
		
	</div>
</div>

<?php get_footer(); ?>