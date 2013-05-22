<?php
    /*
        Template Name: Neighborhood
    */
?>

<?php get_header(); ?>

<section id="slideshow-container">
	<div class="wrapper">
		<div id="slideshow">
		  <img src="images/slide-neighborhood-1.jpg" alt="" />
		  <img src="images/slide-room-1.jpg" alt="" />
		  <img src="images/slide-lounge-1.jpg" alt=""  />
		</div>
	</div>
</section>

<div id="content-container">
	<div class="wrapper">
		<section class="intro">
			<div class="wrapper">
				<h1>Neighborhood</h1>
				<div class="copy">
					<p>“This hotel is so fun. You must stay here. Once an old motor lodge, this hotel has been transformed into a green oasis in the middle of the South Congress neighborhood of Austin. Each room opens onto its own section of an.</p>
				</div>
			</div>
		</section>

		<section id="neighborhood-map">

				<div id="tab-container">

					<dl class="tabs contained">
					  <dd class="active"><a href="#simpleContained1">
					  	<p><span>Our Neighborhood</span>
						A short walk from the hotel</p></a></dd>
					  <dd><a href="#simpleContained2">
					  	<p><span>Around Town</span>
						A short drive from the hotel</p></a></dd>
					</dl>

					<div id="filter-container">
						<h4>Our neighborhood – South Congress</h4>
						<form id="filter" class="custom">
							<label>Filter by</label>
							<label for="checkbox1"><input type="checkbox" id="checkbox1"> <img src="images/icons/neighborhood-c.png" alt="Clubs & Restaurants"> Clubs & Restaurants</label>
			   			<label for="checkbox2"><input type="checkbox" id="checkbox2"> <img src="images/icons/neighborhood-s.png" alt="Clubs & Restaurants"> Shopping</label>
			   			<label for="checkbox3"><input type="checkbox" id="checkbox3"> <img src="images/icons/neighborhood-o.png" alt="Clubs & Restaurants"> Other</label>
			   			<label for="checkbox4"><input type="checkbox" checked id="checkbox4"> Show All</label>
						</form>
					</div>

					<ul class="tabs-content contained">
					  <li class="active" id="simpleContained1Tab">
					  		<ul id="map-menu">
							<li>
								<a href="#">Clubs & Rest.</a>
								<ul class="all clubs">
									<li><a href="#" class="marker-changer" rel="">Club 1</a></li>
									<li><a href="#" class="marker-changer" rel="">Club 2</a></li>
									<li><a href="#" class="marker-changer" rel="">Club 3</a></li>
								</ul>
							</li>
							<li>
								<a href="#">Shopping</a>
								<ul class="all shopping ">
									<li><a href="#" class="marker-changer" rel="">Luthers</a></li>
									<li><a href="#" class="marker-changer" rel="">Blackmail</a></li>
									<li><a href="#" class="marker-changer" rel="">Stag</a></li>
								</ul>
							</li>
							<li>
								<a href="#">Other</a>
								<ul class="all other">
									<li><a href="#" class="marker-changer" rel="">Other 1</a></li>
									<li><a href="#" class="marker-changer" rel="">Other 2</a></li>
									<li><a href="#" class="marker-changer" rel="">Other 3</a></li>
								</ul>
							</li>
						</ul>
					  		<iframe width="100%" height="520" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.ca/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=1315+South+Congress&amp;aq=&amp;sll=49.891235,-97.15369&amp;sspn=36.315092,87.451172&amp;ie=UTF8&amp;hq=&amp;hnear=1315+S+Congress+Ave,+Austin,+Travis,+Texas+78704,+United+States&amp;t=m&amp;ll=30.255434,-97.748966&amp;spn=0.038553,0.008583&amp;z=14&amp;iwloc=A&amp;output=embed"></iframe></li>
					  <li id="simpleContained2Tab">This is simple tab 2s content. Now you see it!</li>
					</ul>

				</div>

		</section>
	</div>
</div>
<?php include("inc/footer-scripts.php"); ?>
<?php get_footer(); ?>
