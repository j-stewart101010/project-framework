<?php include('../config.php'); ?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title>Fire Ready</title>
<link href="../assets/game.css" type="text/css" rel="stylesheet" media="screen" />
<script src="../assets/min/?g=js<?php echo(FR_STAGING ? '&v='.uniqid('').'&debug' : null) ?>" type="text/javascript"></script>
<script src="firespread.js" type="text/javascript"></script>
</head>
<body class="firespread" onload="FireSpread.Init({lores: <?php echo(isset($_GET['lores']) ? 'true' : 'false') ?>});">

<div id="wrap">
	<div id="main" role="main">
		
	</div>
	<div id="controls">
		<div class="modal" id="firespread-settings">
			<div class="inner">
				<h1 class="title-large">Wind Speed</h1>
				<p class="description">Pick the speed of the wind below to see its effect on fire.</p>
				<div class="slider">
					<div id="windspeed-slider"></div>
				</div>
				<p class="play">
					<a id="firespread-play" class="button pink play" href="#"><span>Play</span></a>
				</p>
			</div>
		</div>
		<div class="gui compass">
			<p class="value" id="compass-value">NW 100kmh</p>
		</div>
		<div class="gui counter">
			<p class="title">TIME (h/m)</p>
			<p class="value" id="counter-value"></p>
		</div>
		<a class="gui next" href="#">Next</a>
	</div>
	<div id="background">
		<div class="video" id="firespread-50">
			<video id="video-firespread-50" width="944" height="520" poster="assets/firespread/firespread-bg-top.jpg">
				<source src="assets/firespread/firespread-50kph.mp4" type="video/mp4" />
				<source src="assets/firespread/firespread-50kph.webm" type="video/ogg" />
			</video>
		</div>
		<div class="video" id="firespread-75">
			<video id="video-firespread-75" width="944" height="520" poster="assets/firespread/firespread-bg-top.jpg">
				<source src="assets/firespread/firespread-75kph.mp4" type="video/mp4" />
				<source src="assets/firespread/firespread-75kph.webm" type="video/ogg" />
			</video>
		</div>
		<div class="video" id="firespread-100">
			<video id="video-firespread-100" width="944" height="520" poster="assets/firespread/firespread-bg-top.jpg">
				<source src="assets/firespread/firespread-100kph.mp4" type="video/mp4" />
				<source src="assets/firespread/firespread-100kph.webm" type="video/ogg" />
			</video>
		</div>
		<div class="video" id="firespread-zoom">
			<video id="video-firespread-zoom" width="944" height="520">
				<source src="assets/firespread/firespread-zoom.mp4" type="video/mp4" />
				<source src="assets/firespread/firespread-zoom.webm" type="video/ogg" />
			</video>
		</div>
		<div class="image" id="firespread-background">
			<img src="assets/firespread/firespread-bg-top.jpg" />
		</div>	
	</div>
</div>

</body>
</html>