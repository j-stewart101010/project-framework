<?php include("inc/header.php"); ?>

<section id="slideshow-container">
	<div class="wrapper">
		<div id="slideshow">
		  <img src="images/slide-room-1.jpg" alt="" />
		  <img src="images/slide-lounge-1.jpg" alt=""  />
		  <img src="images/slide-neighborhood-1.jpg" alt="" />
		</div>
	</div>
</section>

<div id="content-container">
	<div class="wrapper">
		<section class="intro">
			<div class="wrapper">
				<h1>Courtyard Suite</h1>
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

				<div class="col">
					<p>These open, airy rooms are located in the central courtyard building away from Congress Ave. and come with a queen bed, daybed seating area, high ceilings and a private porch overlooking the pool and courtyard. Courtyard Suites are approximately 425 sq. ft.</p>
				</div>

				<div class="col">
					<div id="interior" class="booking-container">
						<form id="checkinform" class="custom" method="" action="">
							<div class="form-field">
									<label class="overlabel" id="checkin" for="checkin">Arrival</label>
									<input type="text" name="checkin" class="checkin required hasDatepicker">
									<img class="ui-datepicker-trigger" src="images/icons/calendar.png" alt="Date Picker">
							</div>
							<div class="form-field">
									<label class="overlabel" id="checkout" for="checkout">Departure</label>
									<input type="text" name="checkout" class="checkout required hasDatepicker">
									<img class="ui-datepicker-trigger" src="images/icons/calendar.png" alt="Date Picker">
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
			
				<div id="map-link"><a href="" target="_blank">See the courtyard suites <span class="map-line"><span>on the</span></span> property map</a></div>
				<div class="border-container"><hr class="styled-border"></div>
			</div>
		</section>

		<section id="trip-advisor">
			<div class="wrapper">
				<h4>Guest reviews from Trip Advisor</h4>
				<p>“This hotel is so fun. You must stay here. Once an old motor lodge, this hotel has been transformed into a green oasis in the middle of the South Congress neighborhood of Austin. Each room opens onto its own section of an amazing garden. The bed is very comfortable, the room is super clean (not huge but very clean), great...”</p>
				<p><a href="" target="_blank">Read full review</a></p>
			</div>
		</section>
	</div>
</div>
<?php include("inc/footer-scripts.php"); ?>
<?php include("inc/footer.php"); ?>
