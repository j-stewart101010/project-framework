<?php

	add_action( 'init', 'register_cpt_rooms' );

	function register_cpt_rooms() {

		$labels = array(
			'name' => _x( 'Rooms', 'rooms' ),
			'singular_name' => _x( 'Room', 'rooms' ),
			'add_new' => _x( 'Add new', 'rooms' ),
			'add_new_item' => _x( 'Add new room', 'rooms' ),
			'edit_item' => _x( 'Edit room', 'rooms' ),
			'new_item' => _x( 'New room', 'rooms' ),
			'view_item' => _x( 'View room', 'rooms' ),
			'search_items' => _x( 'Search rooms', 'rooms' ),
			'not_found' => _x( 'No rooms found', 'rooms' ),
			'not_found_in_trash' => _x( 'No rooms found in Trash', 'rooms' ),
			'menu_name' => _x( 'Rooms', 'rooms' )
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

		register_post_type( 'rooms', $args );
	}

?>
