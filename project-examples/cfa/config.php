<?php
if(strpos($_SERVER['HTTP_HOST'], '.local') !== false || strpos($_SERVER['HTTP_HOST'], 'deependmelbourne') !== false) {
	define('FR_STAGING', true);
}
else {
	define('FR_STAGING', false);
}

// Site sections
$sections = array(
	'risk' => array(
		'title' => 'Fire Risk',
		'sections' => array(
			'ember-attack' => array(
				'title' => 'Ember Attack',
			),
			'radiant-heat' => array(
				'title' => 'Radiant Heat',
			),
			'fire-danger-rating' => array(
				'title' => 'fire Danger Rating',
			),
		),
	),
	'behaviour' => array(
		'title' => 'Fire Behaviour',
		'sections' => array(
			'fire-spread' => array(
				'title' => 'Fire Spread',
			),
			'topography' => array(
				'title' => 'Topography',
			),
		),
	),
	'safety' => array(
		'title' => 'Fire Safety',
		'sections' => array(
			'awareness' => array(
				'title' => 'Safety &amp; Awareness',
			),
			'resources' => array(
				'title' => 'Resources',
			),
		),
	),
);