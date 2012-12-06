
	var DataStatus = Backbone.Model.extend({
		
	});

	var DataStatuses = Backbone.Collection.extend({
		model: DataStatus
	});

	var MainView = Backbone.View.extend({
		events: {
			"click form": "addEvent"
		},

		initialize: function(options) {
			this.collection.on("add", this.clearInput, this);
		},

		addEvent: function(e) {
			e.preventDefault();

			this.collection.create({ text: this.$('div').val() });
		},

		clearInput: function() {
			
		}
	});

	var SecondaryView = Backbone.View.extend({
		initialize: function(options) {
			this.collection.on("add", this.appendStatus, this);
		},

		appendStatus: function(status) {
			
		}
	});

	$(document).ready(function() {
		var statuses = new Statuses();
		new NewStatusView({ el: $('div'), collection: statuses });
		new StatusesView({ el: $('div'), collection: statuses });
	});




	var project = {
	
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