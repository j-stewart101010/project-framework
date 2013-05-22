<?php

	add_action( 'init', 'register_cpt_hotel' );

	function register_cpt_hotel() {

		$labels = array(
			'name' => _x( 'Hotel pages', 'hotel' ),
			'singular_name' => _x( 'Hotel page', 'hotel' ),
			'add_new' => _x( 'Add hotel page', 'hotel' ),
			'add_new_item' => _x( 'Add new hotel page', 'hotel' ),
			'edit_item' => _x( 'Edit hotel page', 'hotel' ),
			'new_item' => _x( 'New hotel page', 'hotel' ),
			'view_item' => _x( 'View hotel pages', 'hotel' ),
			'search_items' => _x( 'Search hotel pages', 'hotel' ),
			'not_found' => _x( 'No hotel pages found', 'hotel' ),
			'not_found_in_trash' => _x( 'No hotel pages found in Trash', 'hotel' ),
			'menu_name' => _x( 'Hotel', 'hotel' )
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

		register_post_type( 'hotel', $args );
	}

?>
