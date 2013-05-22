<!DOCTYPE html>

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->

<head>
  <meta charset="utf-8" />

  <!-- Set the viewport width to device width for mobile -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title><?php wp_title( '|', true, 'right' ); ?></title>

  <!-- Included CSS Files -->
  <link rel="stylesheet" type="text/css" href="<?php bloginfo( 'stylesheet_url' ); ?>">

  <!--<script src="js/foundation/modernizr.foundation.js"></script>-->
  <script type="text/javascript" src="//use.typekit.net/rca5ruo.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  <link href='http://fonts.googleapis.com/css?family=Cutive+Mono' rel='stylesheet' type='text/css'>
  <script>
      var ROOT_URL = document.location.protocol + '//' + document.location.host;
  </script>

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <!-- Header and Nav -->
<header>
  <div id="header-container">
    <div class="wrapper">
    <nav class="top-bar">
      <ul>
        <li class="name">
          <a class="logo" href="index.php">Hotel San Jose</a>
        </li>
        <li class="toggle-topbar"><a href="#"></a></li>
      </ul>

      <section>

        <?php wp_nav_menu( array( 'container' => 'false', 'theme_location' => 'primary', 'menu_class' => 'right', 'menu_id' => 'main-nav' ) ); ?>

      </section>
      </nav>
    </div>
  </div>
</header>
  <!-- End Header and Nav -->