<?php
    /*
        Template Name: Front
    */
?>

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

<!--Navigation-->
<ul id="slide-list"></ul>

<div class="bottom-container">
	<div class="wrapper row text-center">
		<div class="copy">

			<?php $content = get_field('content'); ?>			
			<?php if ($content) : ?>
				<?php print $content; ?>
			<?php endif; ?>

		</div>
	</div>
	<footer>
	  <div class="wrapper">
	  
	    <?php include('inc/footer-content.php'); ?>

	  </div>
	</footer>
</div>

</body>
<?php wp_footer(); ?>
</html>