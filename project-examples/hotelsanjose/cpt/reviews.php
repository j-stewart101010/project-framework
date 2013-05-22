<?php

	add_action( 'init', 'register_cpt_reviews' );

	function register_cpt_reviews() {

		$labels = array(
			'name' => _x( 'Reviews', 'reviews' ),
			'singular_name' => _x( 'Review', 'reviews' ),
			'add_new' => _x( 'Add new', 'reviews' ),
			'add_new_item' => _x( 'Add new reviews', 'reviews' ),
			'edit_item' => _x( 'Edit review', 'reviews' ),
			'new_item' => _x( 'New review', 'reviews' ),
			'view_item' => _x( 'View review', 'reviews' ),
			'search_items' => _x( 'Search reviews', 'reviews' ),
			'not_found' => _x( 'No reviews found', 'reviews' ),
			'not_found_in_trash' => _x( 'No reviews found in Trash', 'reviews' ),
			'menu_name' => _x( 'Reviews', 'reviews' )
		);

		$args = array( 
			'labels' => $labels,
			'hierarchical' => true,
			
			'supports' => array( 'title', 'revisions' ),
			'taxonomies' => array( 'page-category' ),
			'public' => true,
			'show_ui' => true,
			'show_in_menu' => true,
			'menu_position' => 20,
			
			'show_in_nav_menus' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'has_archive' => false,
			'query_var' => true,
			'can_export' => true,
			'rewrite' => true,
			'capability_type' => 'page'
		);

		register_post_type( 'reviews', $args );
	}

?>
