<?php include("inc/header.php"); ?>
<div id="content-container" class="events">
	<div class="wrapper">

		<section class="intro">
			<div class="wrapper">
				<h1>Events</h1>
				<p>Like, follow or subscribe for event updates</p>
				<div id="subscribe-container">
					<div class="col">
						<ul class="social">
							<li><a class="facebook" href="http://www.facebook.com/pages/Hotel-San-Jose/69339791672" target="_blank">Facebook</a></li>
							<li><a class="twitter" href="https://twitter.com/SanJoseHotel" target="_blank">Twitter</a></li>
						</ul>
						<h4>Subscribe to our mailing list</h4>
					</div>

					<div class="col">
						<form id="subscribeform" method="post" action="">
							<div class="form-field">
								<label class="overlabel" id="email" for="email">Email</label>
								<input type="text" name="email" class="email required">
							</div>
							<input type="submit" class="button expand postfix" value="Subscribe">
						</form>
					</div>
				</div>
			</div>
		</section>

		<section>
				<div id="events-container">
					<ul class="block-grid two-up mobile">
					  <li><a href="single-events.php"><div><h2>South x San Jose <span class="border"></span><span class="date">March 18 - 21, 2013</span></h2></div><img src="images/placeholder-thumb-events.jpg" alt=""></a></li>
					  <li><a href="single-events.php"><div><h2>Chili Cook Off <span class="border"></span><span class="date">date tbd</span></h2></div><img src="images/placeholder-thumb-events.jpg" alt=""></a></li>
					  <li><a href="single-events.php"><div><h2>Pet Parade <span class="border"></span><span class="date">March 18 - 21, 2013</span></h2></div><img src="images/placeholder-thumb-events.jpg" alt=""></a></li>
					  <li><a href="single-events.php"><div><h2>Lounge events <span class="border"></span><span class="date">weekly lisitings</span></h2></div><img src="images/placeholder-thumb-events.jpg" alt=""></a></li>
					</ul>
				</div>
		</section>

	</div>
</div>
<?php include("inc/footer-scripts.php"); ?>
<?php include("inc/footer.php"); ?>
