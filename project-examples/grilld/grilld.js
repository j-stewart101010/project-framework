
	var grilld = {
	
	/* ============================================
	   Global Script Methods
	   ========================================== */
		Global : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
							
				instance.imageBackgroundResize($('.fullBg'));
				var fontSizeElements = [{ element : $('.home #content h1'),
											values : {
												ratio : "3.8",
												defaultSize : "62",
												lineHeight : true
											}
										},{								
										  element : $('#main-menu ul li a'),
										    values : {
												ratio : "6.5",
												defaultSize : "35",
												lineHeight : false
											}											
										},{
										  element : $('#home-footer p'),
											values : {
												ratio : "10.9",
												defaultSize : "23",
												lineHeight : false
											}						  
										}];	
				instance.fontResize(fontSizeElements);
				$('#main-menu ul li a').on("click", this, instance.displaySubNavigation);
				$('.close').on("click", this, instance.onClosePanel);
				$('#main .tab-navigation li a').on("click", this, $.proxy(this.checkContentHeightOnTabClick, this));
				$(window).load(function(){ instance.imageBackgroundResize($('.fullBg')); $('.fullBg, .home #main, #main-menu .navigation').fadeIn(); });
				$(window).resize(function(){ instance.imageBackgroundResize($('.fullBg')); instance.fontResize(fontSizeElements); });
				instance.restyleSelectBoxes();
				if ($('.generic').length > 0) {
					instance.checkContentHeight();
					$(window).resize(function(){ instance.checkContentHeight(); });
				}
			},
			/* =======================
			   Restyle Select Boxes
			   ==================== */
			restyleSelectBoxes : function() {
				var instance = this;
				$('select').each(function() {
					select = $(this);
					select.wrap('<div class="select-menu" />');
					select.parent().prepend('<span />');
					select.addClass('styled');
					select.parent().find('span').html($(this).find('option').eq(this.selectedIndex).html());
					select.change(function () {
						$(this).parent().find('span').html($(this).find('option').eq(this.selectedIndex).html());
						$(this).parent().find('span').removeClass().addClass($(this).find('option').eq(this.selectedIndex).attr('class'));
					});					
				});	
			},				
			/* =======================
			   Close Block Panel When A Cross Is Clicked
			   ==================== */
			onClosePanel : function() {
				var instance = this;
				$(this).parent().fadeOut();
			},		
			/* =======================
			   Image Background Resize
			   ==================== */				
			imageBackgroundResize : function(background) {
				var bgImg = background;		
				var imgwidth = bgImg.width();
				var imgheight = bgImg.height();
				var winwidth = $(window).width();
				var winheight = $(window).height();
				var widthratio = winwidth / imgwidth;
				var heightratio = winheight / imgheight;
				var widthdiff = heightratio * imgwidth;
				var heightdiff = widthratio * imgheight;
				if(heightdiff>winheight) {
					bgImg.css({
						width: winwidth+'px',
						height: heightdiff+'px'
					});
				} else {
					bgImg.css({
						width: widthdiff+'px',
						height: winheight+'px'
					});
				}
			},
			/* =======================
			   Run Content Height Checker On Tab Click
			   ==================== */
			checkContentHeightOnTabClick : function() {
				var instance = this;
				instance.checkContentHeight();
			},			
			/* =======================
			   Conent Height Checker (If Content Height Is Bigger Than Design Frame, Give The Page A Scroll Bar)
			   ==================== */
			checkContentHeight : function() {
				var instance = this;
				var wrapperHeight = $('html').height();
				var content = $('#main');						
				//Check If There Is Tabbed Navigation On The Page (We Need To Calculate Content Block Heights Manually As They Are Hidden By The Plugin)
				if ($('.tab-navigation').length > 0) {
					var contentHeight = $('.generic #main .content:visible').height();
				}
				else {
					var contentHeight = content.height();
				}	
				var contentHeightPercentage = Math.round(contentHeight / wrapperHeight * 100);
				if (contentHeightPercentage > 60) {
					//Set Wrapper To Content Size Plus Padding (Breathing Room) At Page Bottom
					$('#wrapper').css({ 'height' : contentHeight+390+"px" });
				}
				else {
					$('#wrapper').css({ 'height' : '100%' });
				}
			},
			/* =======================
			   Resize Fonts Based On Browser Width And Height
			   ==================== */				
			fontResize : function(fontElements) {
				var instance = this;
				var settings = {
					'minFontSize' : Number.NEGATIVE_INFINITY,
					'maxFontSize' : Number.POSITIVE_INFINITY
				};
				var wrapper = $('#wrapper');
				var browserMinMax = {
					'minHeight' : parseInt(wrapper.css('min-height')),
					'minWidth' : parseInt(wrapper.css('min-width'))
				};
				var compressor = .3; // set the compressor	
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				
				var measurement = (windowHeight > windowWidth) ? windowWidth : windowHeight;				
				$.each(fontElements, function() {
					if (measurement > browserMinMax.minWidth || measurement > browserMinMax.minHeight) {					
						this.element.css('font-size', Math.max(Math.min(measurement / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize))/this.values.ratio);
						if (this.values.lineHeight == true) {
							this.element.css('line-height', Math.max(Math.min(measurement / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize))/this.values.ratio-10+'px');
						}
					}
					else {
						this.element.css('font-size', this.values.defaultSize+'px');
						if (this.values.lineHeight == true) {
							this.element.css('line-height', (this.values.defaultSize-10)+'px');	
						}				
					}
				});			
			},
			/* =======================
			   Display Sub Navigation When Main Navigation Item Is Clicked
			   ==================== */
			displaySubNavigation : function(event) {
				var subNavigation = $(this).parent().find('.sub-menu');
				
				if (subNavigation.length > 0) {
					var navigationElements = $('#main-menu ul li');			
					//If There Is A Submenu Already Open
					if ($('.active-subnavigation').length > 0) {
						var clickNavigation = $(this).siblings('.active-subnavigation');
						//If The Clicked Submenu Was The One That Was Clicked
						if (clickNavigation.length > 0) {
							var subMenus = $('#main-menu .navigation #main-navigation').find('.sub-menu');
							clickNavigation.removeClass('active-subnavigation');
							clickNavigation.css({ 'visibility' : 'hidden' }).slideUp('slow', function() {
								$(this).css({ 'visibility' : 'visible' });
							});
							event.preventDefault();
						}
						else {
							var activeSubNav = $('.active-subnavigation');
							activeSubNav.removeClass('active-subnavigation');
							activeSubNav.slideUp('slow', function() {
								$(this).parent().addClass('hover-parent');
								subNavigation.css({ 'visibility' : 'hidden' }).slideDown('slow', function() {
									subNavigation.css({ 'visibility' : 'visible' });
									subNavigation.fadeIn();
									subNavigation.addClass('active-subnavigation');
								});							
							});
							event.preventDefault();
						}
					}
					else {
						$(this).siblings('.sub-menu').css({ 'visibility' : 'hidden' }).slideDown('slow', function() {
							$(this).css({ 'visibility' : 'visible' });
							subNavigation.fadeIn();
							subNavigation.addClass('active-subnavigation');
						});						
						event.preventDefault();
					}
				}
			},
			/* =======================
			   Apply Class To Hover Element Parent
			   ==================== */
			addHoverElementParentClass : function(event) {
				$.each($('#main-menu ul li .active-subnavigation'), function() {
					$(this).parent().addClass('active-subnavigation-parent');
				});
			}		
		},
	/* ============================================
	   Front Page Script Methods
	   ========================================== */		
		Front : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				$(window).load(function(){ instance.adjustFooterImageWrappers(); });
				$(window).resize(function(){ instance.adjustFooterImageWrappers(); });				
			},
			/* =======================
			   Adjust Footer Image Wrappers To Reflet Dynamic Images
			   ==================== */
			 adjustFooterImageWrappers : function() {
				$.each($('#home-footer header'), function() {
					var image = $(this).find('img');
					var imageHeight = image.height();
					$(this).css({ 'height' : imageHeight });
				});
			}			
		},
	/* ============================================
	   Scroller Script Methods
	   ========================================== */		
		Scroller : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				instance.containerWidth = 0;
				$.each($('body.menu .scrollable .items div'), function(key, value) {
					instance.containerWidth = instance.containerWidth + $(this).outerWidth(true);
				});
				$('body.menu .scrollable .items').css({ 'width' : instance.containerWidth });
				instance.scrollable = $(".scrollable").scrollable({ 
					mousewheel: true, 
					speed : 800,
					easing : 'swing',
					//Run The Swinging Animation On Slide Finish
					onBeforeSeek: function(event, tabIndex) {
						//Swing Effect Of The Boards (Disabled)
						/*$.each($('.menu .scrollable .items div'), function(key, value) {
							instance.previousMultiplier = 10;
							$(this).stop(true, true).delay(200)
								   .animate({rotate: instance.previousMultiplier+'deg'}, 0)
								   .delay(300)
								   .animate({rotate: instance.randomNumber(9, 5)+'deg'}, 0)
								   .delay(200)
								   .animate({rotate: '0deg'}, 0)							   						   
						});	*/					
					}
				}).navigator({ history: true });
				$(window).load(function(){ instance.checkContentHeight(); });
			},	
			/* =======================
			   Return A Random Number Between A Set Range
			   ==================== */
			randomNumber : function(min, max) {
				/*var instance = this;
				if (negative) {
					return Math.random() * (-min - -max) + -min;
				}
				else {
					return Math.random() * (min - max) + min;
				}*/
				var instance = this;
				
				var newMultiplier = Math.random() * (min - max) + min;
				tempMultipler = 0-(instance.previousMultiplier- -newMultiplier);
				instance.previousMultiplier = tempMultipler;
				return tempMultipler;
				
			},			 
			/* =======================
			   Conent Height Checker (If Content Height Is Bigger Than Design Frame, Give The Page A Scroll Bar)
			   ==================== */
			checkContentHeight : function() {
				var wrapperHeight = $('#wrapper').height();
				var content = $('.scrollable .items');
				var contentHeight = content.height();
				var contentHeightPercentage = Math.round(contentHeight / wrapperHeight * 100);
				if (contentHeightPercentage > 90) {
					$('#wrapper').css({ 'height' : contentHeight+190+"px" }); //Set Wrapper To Content Size Plus Padding (Breathing Room) At Page Bottom
				}
				else {
					$('#wrapper').css({ 'height' : '100%' });
				}
			}			
		},
	/* ============================================
	   Full Page Video Script Methods
	   ========================================== */		
		Video : {

			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				var videoSize = instance.getVideoSize()
                                
				$('video').mediaelementplayer({
					defaultVideoWidth: videoSize.origWidth,
					defaultVideoHeight: videoSize.origHeight,
					videoWidth: videoSize.width,
					videoHeight: videoSize.height,
					audioWidth: 400,
					audioHeight: 30,
					startVolume: 0.8,
					loop: false,
					enableAutosize: false,
					features: ['playpause','volume','progress','current','duration','tracks','fullscreen'],
					alwaysShowControls: true,
					iPadUseNativeControls: false,
					iPhoneUseNativeControls: false,
					AndroidUseNativeControls: false,
					alwaysShowHours: false,
					showTimecodeFrameCount: false,
					framesPerSecond: 25,
					enableKeyboard: true,
					pauseOtherPlayers: true,
					keyActions: [],
					success: function (mediaElement, domObject) {
						instance.rescaleVideo();
					}
				});
								
				$('.icons .icon').on("click", this, $.proxy(this.onIconClick, this));
				instance.rescaleVideo();
				$(window).resize(function(){ instance.rescaleVideo(); });
                                $(window).load(function(){ 
                                    $('#slideshow').cycle({
					fx:     'turnDown',
					speed:  'fast',
					timeout: 0,
					pager:  '#nav',
					pagerAnchorBuilder: function(idx, slide) {
						return '<li><a href="#"><img src="' + slide.src + '" width="90"" /></a></li>';
					}
                                    });	 
                                });
				instance.loadYoutubePlaylist();
				$(document).on("click", '.video .thumbnails .image-wrap', $.proxy(this.onVideoThumbnailClick, this) );
			},
			/* =======================
			   Rescale Video To Be Full Screen
			   ==================== */
			getVideoSize : function() {
				var windowWidth = (window.innerWidth); var windowHeight = (window.innerHeight);
				var windowProportion = windowWidth / windowHeight;					
				var origWidth = 512; var origHeight = 288; // Video size
				var origProportion = origWidth / origHeight;
				var proportion = windowHeight / origHeight;
				if (windowProportion >= origProportion) {
						proportion = windowWidth / origWidth;
				}
				return {
					width: proportion * origWidth,
					height: proportion * origHeight,
					origWidth: origWidth,
					origHeight: origHeight
				}
			},
			rescaleVideo : function() {
				var videoSize = this.getVideoSize();
				$('#video_background, .mejs-video').css({ 'width': videoSize.width + "px", 'height': videoSize.height + "px" });
			},
			/* =======================
			   Icon Buttons Click Event
			   ==================== */			
			onIconClick : function(event) {
				var instance = this;
				event.preventDefault();
				$('.video .block').hide();
				var event = $(event.target);
				var tab = event.attr('href');
				$(tab).fadeToggle();
				instance.rescaleVideo();
			},
			/* =======================
			   Load Grill'd Youtube Playlist
			   ==================== */		
                        
                        /* Using php CURL request */
			loadYoutubePlaylist : function() {
				var instance = this;
				//URL For Grill'd Youtube Playlist JSON Feed
				var url = '';				
                instance.request = jQuery.ajax({
					type : "POST",
                    url : "/wp-admin/admin-ajax.php",
                    data : {action: "grilld_youtube_videos"}
				});
				instance.request.done(function(response) {
					response = jQuery.parseJSON(response);
					instance.data = response.data;
					//Loop Through Each Video Element
					$.each(instance.data.items, function(key, value) {
						//Create A Wrapper For Each Thumbnail
						var thumbnailWrap = $('<div />', {
							'class':  'image-wrap'
						});						
						var thumbnail = '<div class="play-icon"></div><img src="'+value.video.thumbnail.sqDefault+'" alt="'+value.video.title+'" title="'+value.video.title+'" />';
						thumbnailWrap.append(thumbnail);
						//Bind The Video ID To Each Video Element
						thumbnailWrap.data('id', value.video.id);
						$('.video .thumbnails').append(thumbnailWrap);
					});
					var initialFrame = '<iframe width="500" height="310" src="http://www.youtube.com/embed/'+instance.data.items[0].video.id+'?rel=0" frameborder="0" allowfullscreen></iframe>';
					$('.video .block article.video').prepend(initialFrame);
				});	


                                /* NO CURL METHOD, works on SOME browsers */
                                /*
				var url = "https://gdata.youtube.com/feeds/api/playlists/7C1138D6125EE9C7?v=2&alt=jsonc&max-results=10";
				var title;
				var description;
				$.getJSON(url,
					function(response){
						// console.log(response);
						instance.data = response.data;
						//Loop Through Each Video Element
						$.each(instance.data.items, function(key, value) {
							//Create A Wrapper For Each Thumbnail
							var thumbnailWrap = $('<div />', {
								'class':  'image-wrap'
							});						
							var thumbnail = '<div class="play-icon"></div><img src="'+value.video.thumbnail.sqDefault+'" alt="'+value.video.title+'" title="'+value.video.title+'" />';
							thumbnailWrap.append(thumbnail);
							//Bind The Video ID To Each Video Element
							thumbnailWrap.data('id', value.video.id);
							$('.video .thumbnails').append(thumbnailWrap);
						});
						var initialFrame = '<iframe width="500" height="310" src="http://www.youtube.com/embed/'+instance.data.items[0].video.id+'?rel=0" frameborder="0" allowfullscreen></iframe>';
						$('.video .block article.video').prepend(initialFrame);
				});
                            */
				
			},
			/* =======================
			   Swap Youtube Video On Click
			   ==================== */
			onVideoThumbnailClick : function(event) {
				var instance = this;
				var event = $(event.target);
				var videoID = event.parent().data('id');
				//Remove The Current Iframe
				var currentFrame = $('.video .block article.video iframe');
				currentFrame.hide();
				currentFrame.replaceWith('<iframe width="500" height="310" src="http://www.youtube.com/embed/'+videoID+'?rel=0" frameborder="0" allowfullscreen></iframe>');
				currentFrame.show();
			}		
		},
	/* ============================================
	   Stories Page Script Methods
	   ========================================== */		
		Stories : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				$('.stories #main .sidebar a').on("click", this, instance.swapStoriesBlock);
			},
			/* =======================
			   On Click Of The Thumbnails Swap The Content Area
			   ==================== */			
			swapStoriesBlock : function() {
				var clicked = $(this).attr('href');
				$('.stories #main .story-tab').hide();
				$(clicked).fadeIn();
                                return false;
			}			
		},
	/* ============================================
	   Contact Page Script Methods
	   ========================================== */		
		Contact : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				instance.showFirstForm();
				$('.contact #main .sidebar > .select-menu').on("change", this, instance.swapContactForm);
			},
			/* =======================
			   Show The First Form On Load
			   ==================== */			
			showFirstForm : function() {
				var globalObject = grilld.Global;
				$('.contact #main .sidebar .form:first').show();
				//Run The Height Checker Function To Check If We Need Scroll Bars
				globalObject.checkContentHeight();					
			},					
			/* =======================
			   On Click Of The Dropdown Swap The Forms
			   ==================== */			
			swapContactForm : function() {
				var globalObject = grilld.Global;
				var value = $(this).children().find('option:selected').val();
				$('.contact #main .sidebar .form').hide();
				$('#'+value).fadeIn();
				//Run The Height Checker Function To Check If We Need Scroll Bars
				globalObject.checkContentHeight();				
			}			
		}		
			
	};