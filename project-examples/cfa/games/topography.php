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
<script src="topography.js" type="text/javascript"></script>
</head>
<body class="topography" onload="Topography.Init();">

<div id="wrap">
	<div id="main" role="main">
		
	</div>
	<div id="controls">
		<div class="gui compass">
			<p class="value" id="compass-value">NW 100kmh</p>
		</div>
		<div class="gui slider">
			<div id="topography-slider"></div>
		</div>
		<a class="gui next" href="#">Next</a>
	</div>
	<div id="background">
		<div class="canvas" id="fire"></div>
		<div class="background">
			<div class="image"><img src="assets/topography/topography-bg-0deg.jpg" /></div>
		</div>
		<div class="background">
			<div class="image"><img src="assets/topography/topography-bg-10deg.jpg" /></div>
		</div>
		<div class="background">
			<div class="image"><img src="assets/topography/topography-bg-20deg.jpg" /></div>
		</div>
		<div class="background">
			<div class="image"><img src="assets/topography/topography-bg-30deg.jpg" /></div>
		</div>
		<div class="background">
			<div class="image"><img src="assets/topography/topography-bg-40deg.jpg" /></div>
		</div>
	</div>
</div>

<img class="firemask" id="fire-0deg" src="assets/topography/topography-mask-0deg.jpg" />
<img class="firemask" id="fire-10deg" src="assets/topography/topography-mask-10deg.jpg" />
<img class="firemask" id="fire-20deg" src="assets/topography/topography-mask-20deg.jpg" />
<img class="firemask" id="fire-30deg" src="assets/topography/topography-mask-30deg.jpg" />
<img class="firemask" id="fire-40deg" src="assets/topography/topography-mask-40deg.jpg" />

<img id="mask" src="assets/topography/topography-mask-mask.jpg" width="1000" height="520" />
<canvas id="mask-canvas" width="1000" height="520"></canvas>


</body>
</html>