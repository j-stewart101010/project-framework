<?php

	add_action( 'init', 'register_cpt_events' );

	function register_cpt_events() {

		$labels = array(
			'name' => _x( 'Event', 'events' ),
			'singular_name' => _x( 'Event', 'events' ),
			'add_new' => _x( 'Add new', 'events' ),
			'add_new_item' => _x( 'Add new event', 'events' ),
			'edit_item' => _x( 'Edit event', 'events' ),
			'new_item' => _x( 'New event', 'events' ),
			'view_item' => _x( 'View event', 'events' ),
			'search_items' => _x( 'Search events', 'events' ),
			'not_found' => _x( 'No events found', 'events' ),
			'not_found_in_trash' => _x( 'No events found in Trash', 'events' ),
			'menu_name' => _x( 'Events', 'events' )
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

		register_post_type( 'events', $args );
	}

?>
