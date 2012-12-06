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
<script src="radiantheat.js" type="text/javascript"></script>
</head>
<body class="radiantheat" onload="RadiantHeat.Init();">

<div id="wrap">
	<div id="main" role="main">
		
	</div>
	<div id="controls">
		<div class="gui slider">
			<div id="thermometer-slider"></div>
		</div>
		<div class="gui panel">
			<div class="control thermal">
				<p class="title">- Thermal Vision -</p>
				<a class="gui switch thermal" id="thermal-toggle" href="#"></a>
			</div>
			<div class="control view">
				<p class="title">- Change Views -</p>
				<a class="gui switch view" id="view-toggle" href="#"></a>
			</div>
		</div>
		<a class="gui next" href="#">Next</a>
	</div>
	<div id="background">
		<div class="view" id="view-side">
			<div class="canvas">
				<div id="fire-bush-side"></div>
			</div>
			<div class="image">
				<div class="background thermal" id="view-side-thermal">
					<img src="assets/radiantheat/radiantheat-bg-side-thermal-01.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-side-thermal-02.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-side-thermal-03.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-side-thermal-04.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-side-thermal-05.jpg" />
				</div>
				<div class="background normal" id="view-side-normal">
					<img src="assets/radiantheat/radiantheat-bg-side.jpg" />
				</div>
			</div>
			<div class="video">
				<video id="flip-side" width="944" height="520" >
					<source src="assets/radiantheat/radiantheat-flip-side.mp4" type="video/mp4" />
					<source src="assets/radiantheat/radiantheat-flip-side.webm" type="video/ogg" />
				</video>
			</div>
		</div>
		<div class="view" id="view-top">
			<div class="image">
				<div class="background thermal" id="view-top-thermal">
					<img src="assets/radiantheat/radiantheat-bg-top-thermal-01.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-top-thermal-02.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-top-thermal-03.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-top-thermal-04.jpg" />
					<img src="assets/radiantheat/radiantheat-bg-top-thermal-05.jpg" />
				</div>
				<div class="background normal" id="view-top-normal">
					<img src="assets/radiantheat/radiantheat-bg-top.jpg" />
				</div>
			</div>
			<div class="video">
				<video id="flip-flip" width="944" height="520" >
					<source src="assets/radiantheat/radiantheat-flip-top.mp4" type="video/mp4" />
					<source src="assets/radiantheat/radiantheat-flip-top.webm" type="video/ogg" />
				</video>
			</div>
		</div>
	</div>
</div>

<img id="fire-texture-side" src="assets/fire-texture-side.jpg" />
<img id="fire-texture-side-thermal" src="assets/fire-texture-side-thermal.jpg" />
<img id="fire-texture-top" src="assets/fire-texture-top.jpg" />
<img id="fire-texture-top-thermal" src="assets/fire-texture-top-thermal.jpg" />


</body>
</html>