<?php

	// Custom Post Types
	require_once ('cpt/rooms.php');
	require_once ('cpt/reviews.php');
	require_once ('cpt/events.php');
	//require_once ('cpt/hotel.php');

	add_action( 'after_setup_theme', 'theme_setup' );

	//Define a list of constants to avoid uneccessary db calls
	define( 'HOME_URI', home_url() );
	define( 'THEME_URI', get_stylesheet_directory_uri() );
	define( 'THEME_IMAGES', THEME_URI . '/images' );
	define( 'THEME_CSS', THEME_URI . '/css' );
	define( 'THEME_JS', THEME_URI . '/js' );

	// Theme Setup
	function theme_setup() {
		
		// Add support for post thumbnais 
		add_theme_support( 'post-thumbnails' );
		
		// Define the post thumbnails
		if ( function_exists( 'add_image_size' ) ) {
			add_image_size( 'home-page-banner', 1250, 725, true );
			add_image_size( 'room-thumb', 550, 370, true );
			add_image_size( 'page-banner', 1250, 550, true );
			add_image_size( 'event-thumb', 512, 280, true );
		}			
		
        // Add specific CSS class by filter
        add_filter('body_class','add_class_names');

		//Register main menu
		register_nav_menu( 'primary', 'Primary Menu' );
		
		// Add default posts and comments RSS feed links to head
		add_theme_support( 'automatic-feed-links' );

		//Add JS hooks
		add_action('wp_enqueue_scripts', 'load_scripts');   		
			
		//Add basic theme support for menus	
		add_theme_support( 'menus' );  
			
		// Remove the un-needed menus by the theme
		add_action('admin_menu', 'remove_menus');
			
		// Allow custom logo on login page
		add_action("login_head", "my_login_head"); 
	}

	function load_scripts() {
		if (!is_admin()) {  
			global $post;

			wp_deregister_script( 'jquery' );

            wp_register_script('jquery', THEME_JS.'/vendor/jquery-1.8.2.min.js','','');
            wp_enqueue_script('jquery');

            wp_register_script('modernizr', THEME_JS.'/foundation/modernizr.foundation.js','','');
            wp_enqueue_script('modernizr'); 

            //Define a template path for our javascript so we can access assets
            wp_enqueue_script('templateURL', THEME_JS.'/foundation/app.js');
			wp_localize_script('templateURL', 'templateURL', THEME_URI);  

			if (is_page_template('front.php')) {
				wp_register_script('supersized', THEME_JS.'/vendor/supersized.3.2.7.min.js','','',true);
	            wp_enqueue_script('supersized');

				wp_register_script('supersized-initializer', THEME_JS.'/vendor/supersized.initializer.js','','',true);
	            wp_enqueue_script('supersized-initializer');	  

	            //If the template has a supersized gallery on it we need the image data so we output it in script tags so we can access it in our JS
	            $page_banner = get_field('page_banner', $post->ID); 
	            if ($page_banner) {
	            	$page_banner_array = array();
	            	foreach ($page_banner as $imageID) {
	            		$page_banner_array[] = returnImageURL($imageID['image'], 'page_banner');
	            	}
		            wp_enqueue_script('backgroundGallery', THEME_JS.'/foundation/app.js');
					wp_localize_script('backgroundGallery', 'backgroundGallery', $page_banner_array);	
	            }
			}             

			wp_register_script('jquery-event-move', THEME_JS.'/foundation/jquery.event.move.js','','',true);
            wp_enqueue_script('jquery-event-move');

			wp_register_script('jquery-event-swipe', THEME_JS.'/foundation/jquery.event.swipe.js','','',true);
            wp_enqueue_script('jquery-event-swipe');

			wp_register_script('jquery-event', THEME_JS.'/foundation/jquery.event.swipe.js','','',true);
            wp_enqueue_script('jquery-event');

			wp_register_script('foundation-alerts', THEME_JS.'/foundation/jquery.foundation.alerts.js','','',true);
            wp_enqueue_script('foundation-alerts');

			wp_register_script('foundation-buttons', THEME_JS.'/foundation/jquery.foundation.buttons.js','','',true);
            wp_enqueue_script('foundation-buttons');

			wp_register_script('foundation-forms', THEME_JS.'/foundation/jquery.foundation.forms.js','','',true);
            wp_enqueue_script('foundation-forms');

			wp_register_script('foundation-tabs', THEME_JS.'/foundation/jquery.foundation.tabs.js','','',true);
            wp_enqueue_script('foundation-tabs');

			wp_register_script('foundation-orbit', THEME_JS.'/foundation/jquery.foundation.orbit.js','','',true);
            wp_enqueue_script('foundation-orbit');

			wp_register_script('foundation-topbar', THEME_JS.'/foundation/jquery.foundation.topbar.js','','',true);
            wp_enqueue_script('foundation-topbar');

			wp_register_script('foundation-clearing', THEME_JS.'/foundation/jquery.foundation.clearing.js','','',true);
            wp_enqueue_script('foundation-clearing');

			wp_register_script('plugins-ck', THEME_JS.'/plugins-ck.js','','',true);
            wp_enqueue_script('plugins-ck');

			wp_register_script('main-ck', THEME_JS.'/main-ck.js','','',true);
            wp_enqueue_script('main-ck');                                   
		}
	}

	// Register the global option page for editing templates
	if(function_exists("register_options_page")) {
		register_options_page('Global');
	}		

	//Remove admin menu items that are no longer required
	function remove_menus() {
		global $menu;
		$restricted = array(__('Posts'), __('Links'), __('Comments'));
		end ($menu);
		while (prev($menu)){
			$value = explode(' ',$menu[key($menu)][0]);
			if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
		}
	}           

	//Return an image url based on an image ID
	function returnImageURL($attachment_id, $size) {
		$imageObject = array();
		$imageURL = wp_get_attachment_image_src( $attachment_id, $size );
        $imageObject['url'] = $imageURL[0];
        $imageObject['alt'] = get_post_meta($attachment_id, '_wp_attachment_image_alt', true);

        return $imageObject;
	}                            
		
	//Append a class name to the body tag depending on which page we are on
	function add_class_names($classes) {
        global $post;
        

		return $classes;
	}

	/**
	 * Gets the id of the topmost ancestor of the current page. Returns the current
	 * page's id if there is no parent.
	 * 
	 * @uses object $post
	 * @return int 
	 */
	if(!function_exists('get_post_top_ancestor_id')){
		function get_post_top_ancestor_id(){
		    global $post;
		    
		    if($post->post_parent){
		        $ancestors = array_reverse(get_post_ancestors($post->ID));
		        return $ancestors[0];
		    }
		    
		    return $post->ID;
		}
	}		