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
<script src="emberattack.js" type="text/javascript"></script>
<script src="emberattack.paths.js" type="text/javascript"></script>
</head>
<body class="emberattack" onload="EmberAttack.Init();">

<div id="wrap">
	<div id="main" role="main">
		
	</div>
	<div id="controls">
		<div class="modal" id="emberattack-modal">
			<div class="inner">
				<p class="title-small">You extinguished:</h1>
				<p class="title-large" id="ember-count"></p>
				<p><a id="emberattack-play" class="button pink play" href="#"><span>Try Again</span></a>
				   <a id="emberattack-skip" class="button pink skip" href="#"><span>Next</span></a></p>
			</div>
		</div>
		<div class="gui compass">
			<p class="value" id="compass-value">NW 100kmh</p>
		</div>
		<div class="gui counter">
			<p class="title">EMBERS</p>
			<p class="value" id="counter-value"></p>
		</div>
		<div class="gui panel">
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
				<div id="tree-fire"></div>
				<canvas id="canvas" width="944" height="520"></canvas>
			</div>
			<div class="image">
				<img src="assets/emberattack/emberattack-bg-side.jpg" />
			</div>
			<div class="video">
				<video id="flip-side" width="944" height="520" >
					<source src="assets/emberattack/emberattack-flip-side.mp4" type="video/mp4" />
					<source src="assets/emberattack/emberattack-flip-side.webm" type="video/ogg" />
				</video>
			</div>
		</div>
		<div class="view" id="view-top">
			<div class="image">
				<img src="assets/emberattack/emberattack-bg-top.jpg" />
			</div>
			<div class="video">
				<video id="flip-top" width="944" height="520" >
					<source src="assets/emberattack/emberattack-flip-top.mp4" type="video/mp4" />
					<source src="assets/emberattack/emberattack-flip-top.webm" type="video/ogg" />
				</video>
			</div>
		</div>
	</div>
</div>

<div id="sprites" class="hidden">
	<img id="ember-01" src="assets/emberattack/ember01.png" width="50" height="50" />
	<img id="ember-02" src="assets/emberattack/ember02.png" width="50" height="50" />
	<img id="ember-03" src="assets/emberattack/ember03.png" width="50" height="50" />
	<img id="ember-out" src="assets/emberattack/ember-out.png" width="50" height="50" />
</div>

</body>
</html>