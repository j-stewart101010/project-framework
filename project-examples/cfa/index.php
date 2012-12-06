<?php include('config.php'); ?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8 ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9 ie8" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Fire Ready</title>
<meta name="viewport" content="width=device-width; initial-scale=0.96; maximum-scale=0.96; minimum-scale=0.96; user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link href="assets/style.css" type="text/css" rel="stylesheet" media="screen" />
<!--[if IE]><link href="assets/iefix.css" type="text/css" rel="stylesheet" media="screen" /><![endif]-->
<script src="assets/min/?g=js<?php echo(FR_STAGING ? '&v='.uniqid('').'&debug' : null) ?>" type="text/javascript"></script>
<script type="text/javascript">
FR.tasks = <?php echo json_encode($sections) ?>;
</script>
</head>
<body class="fireready">

<div id="wrap">

	<div id="header">
		<a class="fr-logo" href="http://www.cfa.vic.gov.au" title="Fire Ready - Prepare. Act. Survive." target="_blank">Fire Ready - Prepare. Act. Survive.</a>
		<ul class="navigation">
			<li class="resources"><a href="#/safety/resources">Resources</a></li>
			<li class="accessibility">Turn Accessibility <a class="access on" href="./accessible/" title="View accessible version">On</a> <a class="access off" title="View enhanced version">Off</a></li>
			<li class="social"><a class="social fbook" href="#" title="Follow us on Facebook">Facebook</a></li>
			<li class="social"><a class="social twitter" href="#" title="Follow us on Twitter">Twitter</a></li>
		</ul>
	</div><!-- /#header -->
		
	<div id="outer">
		<div id="main" role="main">
			<div id="content">
			<?php
				include('pages/home.php');
				include('pages/enter.php');
				include('pages/risk.php');
				include('pages/behaviour.php');
				include('pages/safety.php');
				include('pages/audio.php');
			?>			
			</div><!-- /#content -->
		</div><!-- /#main -->
	</div><!-- /#outer -->
	
	
	<div id="footer">
		<ul class="navigation">
			<li class="section home"><a href="#/" title="Return to the homepage">Home</a></li>
			<li class="section risk">
				<a href="#/risk">Fire risk</a>
				<div class="submenu">
					<div class="inner">
						<p class="title">Fire Risk</p>
						<ul>
							<li class="ember-attack"><a href="#/risk/ember-attack">Ember Attack</a></li>
							<li class="radiant-heat"><a href="#/risk/radiant-heat">Radiant Heat</a></li>
							<li class="fire-danger-rating"><a href="#/risk/fire-danger-rating">Fire Danger Rating</a></li>
						</ul>
					</div>
				</div>
			</li>
			<li class="section behaviour">
				<a href="#/behaviour">How Fire Behaves</a>
				<div class="submenu">
					<div class="inner">
						<p class="title">How Fire Behaves</p>
						<ul>
							<li class="fire-spread"><a href="#/behaviour/fire-spread">Fire Spread</a></li>
							<li class="topography"><a href="#/behaviour/topography">Topography</a></li>
						</ul>
					</div>
				</div>
			</li>
			<li class="section safety">
				<a href="#/safety">Fire safety</a>
				<div class="submenu">
					<div class="inner">
						<p class="title">Fire safety</p>
						<ul>
							<li class="awareness"><a href="#/safety/awareness">Safety &amp; Awareness</a></li>
							<li class="resources"><a href="#/safety/resources">Resources</a></li>
						</ul>
					</div>
				</div>
			</li>
			<li class="control volume">
				<a href="#">Adjust volume</a>
				<div class="volume-slider">
					<div id="volume-slider"></div>
					<a id="volume-max" class="volume-set max" href="#"></a>
					<a id="volume-min" class="volume-set min" href="#"></a>
				</div>
			</li>
		</ul>
	</div><!-- /#footer -->

</div><!-- /#wrap -->

</body>
</html>