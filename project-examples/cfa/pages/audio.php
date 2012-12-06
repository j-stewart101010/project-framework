<?php

// to make a sound available to the cfa games just add the mp3/ogg pairs to assets/audio
// sounds with either fire, rain, wind or drone in the filename will be pulled in twice, for overlapping

echo '<div id="game_audio">';

foreach (glob('assets/audio/*.mp3') as $path_mp3) {
    $path_ogg = preg_replace('/\.mp3$/', '.ogg', $path_mp3);
    $id = preg_replace(array('/^.*\//', '/\.(mp3|ogg)$/', '/[^a-zA-Z0-9]/'), '', $path_mp3);
    
    echo '<audio preload="auto" id="'.$id.'"><source src="'.$path_mp3.'"><source src="'.$path_ogg.'"></audio>', "\n";
    if (preg_match('/fire|rain|wind|drone/', $id)) {
        echo '<audio preload="auto" id="'.$id.'_alt"><source src="'.$path_mp3.'"><source src="'.$path_ogg.'"></audio>', "\n";
    }
}

echo '</div>';

?>