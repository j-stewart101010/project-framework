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
<script src="dangerrating.js" type="text/javascript"></script>
</head>
<body class="dangerrating" onload="DangerRating.Init();">

<div id="wrap">
	<div id="main" role="main">
	</div>
	<div id="controls">
		<a class="gui next" href="#">Next</a>
		<div id="pointer">
			<img src="assets/dangerrating/dangerrating-over.png" width="364" height="200" usemap="#fdr-map" />
		</div>
		<map id="fdr-map" name="fdr-map">
			<area shape="poly" alt="Code Red" coords="222,158, 228,183, 365,182, 359,131, 337,87, 222,158" href="#code-red">
			<area shape="poly" alt="Extreme" coords="234,8, 282,30, 317,61, 215,153, 195,141, 234,8" href="#extreme">
			<area shape="poly" alt="Severe" coords="129,8, 179,1, 234,8, 195,141, 171,141, 129,8" href="#severe">
			<area shape="poly" alt="Very High" coords="62,47, 94,24, 129,8, 171,141, 154,151, 62,47" href="#very-high">
			<area shape="poly" alt="High" coords="143,165, 154,151, 62,47, 36,75, 18,108, 143,165" href="#high">
			<area shape="poly" alt="Low-Moderate" coords="143,165, 139,182, 2,183, 6,143, 18,108, 143,165" href="#low-moderate">
		</map>
		<div id="ratings">
			<div id="low-moderate" class="rating">
				<h2 class="title">Low-Moderate</h2>
				<ul>
					<li>If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.</li>
					<li>Be aware of how fires can start and minimise the risk.</li>
					<li>Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.</li>
				</ul>
			</div>
			<div id="high" class="rating">
				<h2 class="title">High</h2>
				<ul>
					<li>If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.</li>
					<li>Be aware of how fires can start and minimise the risk.</li>
					<li>Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.</li>
				</ul>
			</div>
			<div id="very-high" class="rating">
				<h2 class="title">Very High</h2>
				<ul>
					<li>If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.</li>
					<li>Be aware of how fires can start and minimise the risk.</li>
					<li>Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.</li>
				</ul>
			</div>
			<div id="severe" class="rating">
				<h2 class="title">Severe</h2>
				<ul>
					<li>If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.</li>
					<li>Be aware of how fires can start and minimise the risk.</li>
					<li>Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.</li>
				</ul>
			</div>
			<div id="extreme" class="rating">
				<h2 class="title">Extreme</h2>
				<ul>
					<li>If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.</li>
					<li>Be aware of how fires can start and minimise the risk.</li>
					<li>Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.</li>
				</ul>
			</div>
			<div id="code-red" class="rating">
				<h2 class="title">Code Red</h2>
				<ul>
					<li>If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.</li>
					<li>Be aware of how fires can start and minimise the risk.</li>
					<li>Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.</li>
				</ul>
			</div>
		</div>
	</div>
	<div id="background">
		<img src="assets/dangerrating/dangerrating-bg-side.jpg" alt="Fire Danger Rating" width="944" height="520" />
	</div>
</div>

</body>
</html>