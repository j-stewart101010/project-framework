FR.Media.TriggerSounds = function(soundscapeid, args) {
    if (typeof soundscapeid !== 'undefined' && typeof FR.Media.SoundScape.Compositions[soundscapeid] == 'object') {
        if (FR.Media.SoundScape.Stopped == true) {
            FR.Media.SoundScape.Stopped = false;
            FR.Media.SoundScape.Setup();
        }

        FR.Media.SoundScape.Compositions[soundscapeid].init(args || null);
    }
}

FR.Media.UnloadSounds = function() {
    FR.Media.SoundScape.CancelTimeouts();
    for (sound in FR.Media.SoundScape.Sounds) {
        FR.Media.SoundScape.Sounds[sound].pause();
    }

    FR.Media.SoundScape.Stopped = true;
}

FR.Media.SoundScape = {
    Stopped: true,

    Timeouts: [],
    Intervals: [],

    CancelTimeouts: function() {
        for (timeout in FR.Media.SoundScape.Timeouts) {
            clearTimeout(FR.Media.SoundScape.Timeouts[timeout]);
        }
        FR.Media.SoundScape.Timeouts = [];

        for (interval in FR.Media.SoundScape.Intervals) {
            clearTimeout(FR.Media.SoundScape.Intervals[interval]);
        }
        FR.Media.SoundScape.Intervals = [];
    },

    Sounds: {},

    Setup: function() {
        FR.Media.SoundScape.Compositions.emberattack.current_range = 0;
        FR.Media.SoundScape.Compositions.emberattack.rooffire = false;

        FR.Media.SoundScape.Compositions.topography.current_intensity = -1;
    },

    Compositions: {
        emberattack: {
            init: function(args) {
                if (args.extinguish) {
                    FR.Media.SoundScape.Compositions.emberattack.extinguish();
                }

                if (args.rooffire) {
                    this.rooffire = true;
                    FR.Media.SoundScape.Queue([{
                        file: 'woosh'
                    }]);
                }

                if (typeof args.timeelapsed != 'undefined') {
                    // when roof catches on fire, jack up sound to the over 20 sec mark regardless of actual time
                    FR.Media.SoundScape.Compositions.emberattack.timeelapsed(this.rooffire ? 20000 : args.timeelapsed);
                }
            },

            extinguish: function() {
                FR.Media.SoundScape.Queue([{
                    file: 'slide'
                }]);
            },

            timeelapsed: function(time) {
                switch (true) {
                    case (time < 10000):
                        if (this.current_range !== 10) {
                            this.current_range = 10;
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firesoft',
                                    repeat: 3000
                                }
                            ]);
                        }
                        break;

                    case (time < 20000):
                        if (this.current_range !== 20) {
                            this.current_range = 20;
                            FR.Media.SoundScape.CancelTimeouts();
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firebig',
                                    repeat: 3000
                                }
                            ]);
                        }
                        break;

                    default:
                        if (this.current_range !== 'default') {
                            this.current_range = 'default';
                            FR.Media.SoundScape.CancelTimeouts();
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firebig',
                                    repeat: 3000
                                },
                                {   file: 'metalbend',
                                    delay: 4000,
                                    repeat: 16000
                                },
                                {   file: 'extrascuff',
                                    delay: 6000,
                                    repeat: 12000
                                },
                                {   file: 'windsoft',
                                    delay: 2000,
                                    repeat: 4000
                                }
                            ]);
                        }
                        break;
                }
            }
        },

        topography: {
            init: function(args) {
                var intensity = (args.position > -700 && args.position < -250) * (args.slider || 0);

                if (intensity != this.current_intensity) {
                    this.current_intensity = intensity;
                    FR.Media.SoundScape.CancelTimeouts();

                    switch(intensity) {
                        case 0:
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firesoft',
                                    repeat: 3000
                                }
                            ]);
                            break;
                        case 1:
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firesoft',
                                    repeat: 3000
                                },
                                {
                                    file: 'windsoft',
                                    repeat: 6000
                                }
                            ]);
                            break;
                        case 2:
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firebig',
                                    repeat: 3000
                                },
                                {
                                    file: 'windsoft',
                                    repeat: 6000
                                }
                            ]);
                            break;
                        case 3:
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firebig',
                                    repeat: 3000
                                },
                                {
                                    file: 'wind1',
                                    repeat: 5000
                                }
                            ]);
                            break;
                        case 4:
                            FR.Media.SoundScape.Queue([
                                {
                                    file: 'firebig',
                                    repeat: 3000
                                },
                                {
                                    file: 'wind1',
                                    repeat: 5000
                                },
                                {
                                    file: 'treefall',
                                    repeat: 5000
                                }
                            ]);
                            break;
                    }
                }
            }
        },

        awareness: {
            init: function(args) {
                FR.Media.SoundScape.CancelTimeouts();
                switch(args.rating) {
                    case 'low':
                        FR.Media.SoundScape.Queue([
                            {
                                file: 'bird1',
                                repeat: 5000,
                                delay: 2000
                            },
                            {
                                file: 'rain',
                                repeat: 6000
                            }
                        ]);
                        break;
                    case 'high':
                        FR.Media.SoundScape.Queue([
                            {
                                file: 'bird1',
                                repeat: 5000,
                                delay: 2000
                            },
                            {
                                file: 'windsoft',
                                repeat: 6000
                            }
                        ]);
                        break;
                    case 'vhigh':
                        FR.Media.SoundScape.Queue([
                            {
                                file: 'bird1',
                                repeat: 6000,
                                delay: 2000
                            },
                            {
                                file: 'windsoft',
                                repeat: 6000
                            },
                            {
                                file: 'extracrack',
                                repeat: 4000,
                                delay: 1000,
                                volumeAdjust: 0.3
                            }
                        ]);
                        break;
                    case 'severe':
                        FR.Media.SoundScape.Queue([
                            {
                                file: 'wind1',
                                repeat: 5000
                            },
                            {
                                file: 'extracrack',
                                repeat: 4000,
                                delay: 1000,
                                volumeAdjust: 0.3
                            }
                        ]);
                        break;
                    case 'extreme':
                        FR.Media.SoundScape.Queue([
                            {
                                file: 'wind1',
                                repeat: 5000
                            },
                            {
                                file: 'extracrack',
                                repeat: 4000,
                                delay: 1000,
                                volumeAdjust: 0.3
                            },
                            {
                                file: 'extrascuff',
                                repeat: 7000,
                                delay: 3000,
                                volumeAdjust: 0.3
                            }
                        ]);
                        break;
                    case 'codered':
                        FR.Media.SoundScape.Queue([
                            {
                                file: 'wind1',
                                repeat: 5000
                            },
                            {
                                file: 'extracrack',
                                repeat: 4000,
                                delay: 1000,
                                volumeAdjust: 0.3
                            },
                            {
                                file: 'extrascuff',
                                repeat: 7000,
                                delay: 3000,
                                volumeAdjust: 0.3
                            },
                            {
                                file: 'drone2',
                                repeat: 4000
                            }
                        ]);
                        break;
                }
            }
        },

        buttonclick: {
            init: function() {
                FR.Media.SoundScape.Queue([{
                    file: 'click2'
                }]);
            }
        }
    },

    Queue: function(sounds_arr) {
        var default_settings = {
            // milliseconds (1000th of a second)
            delay: 0,
            repeat: 0,
            volumeAdjust: 1
        }
        
        for (sound in sounds_arr) {
            (function() {
                var sound_arr = $.extend({}, default_settings, sounds_arr[sound]);
    
                FR.Media.SoundScape.Timeouts.push(
                    setTimeout(function() {
                        FR.Media.SoundScape.Play(sound_arr);
    
                        if (sound_arr.repeat) {
                            FR.Media.SoundScape.Intervals.push(
                                setInterval(function() {
                                    FR.Media.SoundScape.Play(sound_arr);
                                }, sound_arr.repeat)
                            );
                        }
                    }, sound_arr.delay)
                );
            })();
        }
    },

    Play: function(sound_arr) {
        var file =
            FR.Media.SoundScape.Sounds[sound_arr.file].ended ||
            FR.Media.SoundScape.Sounds[sound_arr.file].paused ||
            typeof FR.Media.SoundScape.Sounds[sound_arr.file + '_alt'] == 'undefined' ?
                sound_arr.file : 
                sound_arr.file + '_alt';

        FR.Media.SoundScape.Sounds[file].setVolume(FR.Media.GetVolume() / 100 * sound_arr.volumeAdjust);
        FR.Media.SoundScape.Sounds[file].play();
    }
}

$(function() {
    // convert audio elements to mediaelement object
    $('#game_audio audio').each(function() {
        var elem = $(this);
        var sound = FR.Media.SoundScape.Sounds[elem.attr('id')] = new MediaElement(elem.get(0), {
            pluginPath: 'assets/js/mediaelement/'
        });
        sound.pause();
    });

    // play click sound when clicking :)
    $('a.play, div#footer a').on('click', function() {
        FR.Media.TriggerSounds('buttonclick');
    });
});