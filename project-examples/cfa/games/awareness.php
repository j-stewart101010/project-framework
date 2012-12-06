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
<script src="awareness.js" type="text/javascript"></script>
</head>
<body class="awareness" onload="Awareness.Init();">

<div id="wrap">
	<div id="main" role="main">
		
	</div>
	<div id="controls">
		<div class="gui panel">
			<div class="control temperature">
				<p class="title">- Temperature -</p>
				<div class="gui slider">
					<div id="temperature-slider" class="slider-inner">
						<div class="gui overlay"></div>
						<div class="range"></div>
					</div>
				</div>
			</div>
			<div class="control humidity">
				<p class="title">- Humidity -</p>
				<div class="gui slider">
					<div id="humidity-slider" class="slider-inner">
						<div class="gui overlay"></div>
						<div class="range"></div>
					</div>
				</div>
			</div>
			<div class="control wind">
				<p class="title">- Wind -</p>
				<div class="gui slider">
					<div id="wind-slider" class="slider-inner">
						<div class="gui overlay"></div>
						<div class="range"></div>
					</div>
				</div>
			</div>
			<div class="control vegetation">
				<p class="title">- Vegetation -</p>
				<div class="gui slider">
					<div id="vegetation-slider" class="slider-inner">
						<div class="gui overlay"></div>
						<div class="range"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="fdr">
			<div class="pointer">
				<img src="assets/awareness/awareness-over.png" width="250" height="150" usemap="#fdr-map" />
				<map id="fdr-map" name="fdr-map">
				<area shape="poly" alt="Code Red" coords="152,123, 148,109, 219,65, 232,92, 235,123, 151,123" href="#codered">
				<area shape="poly" alt="Extreme" coords="145,106, 132,98, 155,17, 183,28, 207,49, 145,106" href="#extreme">
				<area shape="poly" alt="Severe" coords="133,98, 118,98, 95,18, 126,13, 155,17, 132,98" href="#severe">
				<area shape="poly" alt="Very High" coords="118,98, 109,104, 53,40, 71,27, 94,18, 118,98" href="#vhigh">
				<area shape="poly" alt="High" coords="109,104, 102,114, 25,79, 36,58, 53,40, 109,104" href="#high">
				<area shape="poly" alt="Low-Moderate" coords="102,114, 100,123, 15,123, 18,98, 25,78, 102,114" href="#low">
				</map>
			</div>
		</div>
		<a class="gui next" href="#">Next</a>
	</div>
	<div id="background">
		<div class="background low"><img src="assets/awareness/awareness-bg-01.jpg" /></div>
		<div class="background high"><img src="assets/awareness/awareness-bg-02.jpg" /></div>
		<div class="background vhigh"><img src="assets/awareness/awareness-bg-03.jpg" /></div>
		<div class="background severe"><img src="assets/awareness/awareness-bg-04.jpg" /></div>
		<div class="background extreme"><img src="assets/awareness/awareness-bg-05.jpg" /></div>
		<div class="background codered"><img src="assets/awareness/awareness-bg-06.jpg" /></div>
	</div>
</div>

</body>
</html>