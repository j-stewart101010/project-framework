    
    <div id="footer-links">
      <ul class="inline-list">
        <li><a href="#">Sitemap</a></li>
        <li><a href="<?php print get_field('facebook', 'option'); ?>" target="_blank">Facebook</a></li>
        <li><a href="<?php print get_field('instagram', 'option'); ?>">Instagram</a></li>
        <li><a href="<?php print get_field('twitter', 'option'); ?>" target="_blank">Twitter</a></li>
        <li><a href="<?php print get_field('spotify', 'option'); ?>">Spotify</a></li>
        <li><a href="<?php print get_field('trip_advisor', 'option'); ?>" target="_blank">Trip Advisor</a></li>
      </ul>
    </div>

        <div id="footer-info">
      <h4>Enter your email address to receive news and offers from us</h4>
      <form id="subscribeform-footer" method="post" action="">
          <div class="form-field">
              <label class="overlabel" id="email-footer" for="email-footer">Email Address</label>
              <input type="text" name="email-footer" class="email-footer required">
          </div>
          <input type="submit" class="button expand postfix" value="Submit &rarr;">
      </form>
      <div class="logo-container">
        <a class="logo" href=""><img src="<?php print THEME_IMAGES; ?>/logos/bunkhouse.png" alt="Bunkhouse"></a>
        <a class="logo sm" href=""><img src="<?php print THEME_IMAGES; ?>/logos/jos.png" alt="Jo's"></a>
      </div>
    </div>