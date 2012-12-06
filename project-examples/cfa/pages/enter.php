<!-- BEGIN: /enter -->
<div id="enter" class="section splash">
	
	<div id="enter-navigation">
		<?php foreach($sections as $section => $sectionvals): ?>
		<div class="navigation <?php echo $section ?>" id="nav-<?php echo $section ?>">
			<h2 class="title"><a href="#<?php echo $section ?>" rel="<?php echo $section ?>"><?php echo $sectionvals['title'] ?></a></h2>
			<?php foreach($sectionvals['sections'] as $subsection => $subsectionvals): ?>
			<div class="item <?php echo $section ?> <?php echo $subsection ?>">
				<div class="link">
					<a href="#<?php echo $subsection ?>" rel="<?php echo $subsection ?>"><span><em><?php echo $sectionvals['title'] ?>:</em> <?php echo $subsectionvals['title'] ?></a></span>
					<div class="shadow"></div>
				</div>
				<div class="images">
					<div class="sprites">
						<div class="sprite incomplete" id="sprite-<?php echo $subsection ?>">
							<!--<img src="assets/images/elements/fireball-strip-150x150.png" width="150" height="4650" />-->
							<div class="icon"><img src="assets/images/elements/enter-icon-<?php echo $section ?>.png" /></div>
						</div>
						<div class="sprite complete">
							<img src="assets/images/elements/enter-icon-<?php echo $section ?>-complete.png" />
						</div>
					</div>
				</div>
			</div>
			<?php endforeach; ?>
		</div>
		<?php endforeach; ?>
	</div>
		
	<div class="content">
		<div class="inner">
			<h2 class="title">Victoria is one of the most fire-prone areas in the world.</h2>
			<p>Bushfires are incredibly dangerous and difficult to predict. <br />
			Click on an ember to find out why.</p>
		</div>
		<div class="background">
			<video id="enter-background" width="960" height="594" loop="loop" >
				<source src="assets/video/loop-embers.mp4" type="video/mp4" />
				<source src="assets/video/loop-embers.webm" type="video/ogg" />
			</video>
		</div>
	</div>
	
</div>
<!-- END: /enter -->
	