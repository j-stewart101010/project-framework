
	var health = {
	
	/* ============================================
	   Global Script Methods
	   ========================================== */
		Global : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				
				instance.imageBackgroundResize();
				$(window).resize(function(){ instance.imageBackgroundResize() });
				instance.buttonSwap();		
				instance.restyleDropdown();
				instance.restyleRadioBox();
				instance.restyleCheckbox();
				instance.restyleTextinput();
				instance.addArrowsStylesInput();	
				instance.wrapFormSubmitButtons();	
				instance.moveFormErrors();	
				instance.formFocusStyle();	
				instance.fixWizardStepStyles();	
				instance.highlightInvalidInputs();
				instance.fixQABoxes();
				instance.watermarkLogin();
				
				instance.addHoverStyle();
				
				$('input:radio').live("click", this, this.onRadioClick);
				
				
				$('#header .search .search-trigger').on("click", this, this.searchWidgetDropDown);

                var loginButton = $('#header .ef-login #dnn_dnnLOGIN_cmdLogin');
                // Stop the logout button click event
                loginButton.click(function(e) {
                    if ($("#dnn_dnnLOGIN_cmdLogin").html().indexOf("Sign in") == -1) {
                        e.preventDefault();
                    }
                });

                // Demo the user instructions on dropdown menu once if logged in.
                instance.conditionalMenuInstructions();


                // Bind dropdown menu events
                loginButton.add("#menu-widget").on("mouseover", this, $.proxy(this.menuWidgetDropDown, instance)).on("mouseout", this, $.proxy(this.menuWidgetClose, instance));
                				
				$('.scrollup-arrow .button').on("click", this, this.landingScrollUp);							
							
				$('select[name="material"]').on("change", this, this.buttonSwap);
				
				$('#footerLiveChat').on("click", this, this.liveChatClick);

				$('#dnn_chatBox a').on("click", this, this.liveChatClick); // Contact us page txt link
					
				$('#header-chat-button').on("click", this, this.liveChatClick); // Contact us page txt link

				$('#sidebar .block-phone-us .call-to-action a.button').on("click", this, this.liveChatClick); // quote page sidebar
	
				$('#overlay-timeout .call-to-action .button ').on("click", this, this.liveChatClick); // Overlay timeout on quote
				
				
				
				health.Analytics.init();
			},
			/* =======================
			Add Hover styles to elements with add-hover
			   ==================== */
			addHoverStyle : function(){	
				$(".add-hover").each( function(){
					$(this).hover(
					  function () {
						$(this).addClass("custom-hover");
					  },
					  function () {
						$(this).removeClass("custom-hover");
					  }
					);
				});
			},
			/* =======================
			   Login watermark
			   ==================== */
			   watermarkLogin : function(){
					var defaultVal = 'search';
					$("#dnn_siteSearch_txtSearch").addClass("lightText")
						// set default value
					.val(defaultVal)
						// onfocus action
					.focus(function(){
						if($(this).val() == defaultVal){
							$(this).removeClass("lightText").val("");
						}
						// focus lost action
					}).blur(function(){
						if($(this).val() == ""){
							$(this).val(defaultVal).addClass("lightText");
						}
					});	
			   },
			/* =======================
			   Fix Question / Answer icons in forms
			   ==================== */
			fixQABoxes : function(){
				$('.row .memberAppQuestion').each( function(){ 
					if( ! $(this).data('clickable') ){
						$(this).data('clickable',true);
						$(this).click( function(){
							$(this).next('.answer').slideToggle();
							$(this).toggleClass( 'open' );
						});
					}
				});
			},
			/* =======================
			   Fix steps container
			   ==================== */
			fixWizardStepStyles : function(){
				// Need to fix, on ajax it's re-adding the width on each span
				$claimSteps = $("#dnn_ctr465_ClaimOnline_ctl00");
				
				if( $claimSteps.length && !$claimSteps.children('span').data("reset")  ){
				
					$claimSteps.children('span').each( function(){
						$(this).css('width','');
						$(this).data("reset", true);
					});
					
				}
			},
			/* =======================
			   Make invalid items obvious [ Now just using CSS, instead of adding class to the parent row ]
			   ==================== */
			highlightInvalidInputs : function(){
				// Need to fix, on ajax it's re-adding the width on each span
				/*
				$invalid = $("div.invalid");
				
				$invalid.each( function(){
					$parent =  $(this).parent();
					if( $parent.get(0).tagName == 'SPAN' && $parent.is(":visible") == true && !$parent.data("reset")) {
						$parent.data("reset", true);
						$(this).closest('div.row').addClass('invalid');
						console.log( $parent + " "  + $parent.is(":visible"));
					}
				});
				*/
			},
			
			/* =======================
			   OMS missing functionality [ fix with jquery lov'n ] [ Now just adding extra classes when buttons disabled ]
			   ==================== */
			omsMiscFixes : function(){
				// Need to fix, on ajax it's re-adding the width on each span
				/*
				var $nextBtn = $('#dnn_ctr531_MembershipApplication_uxNextButton[disabled="disabled"]');
				var $getQuote = $('#dnn_ctr531_MembershipApplication_Step2_ctl00_uxCoverSubmitButton');
				if( $(".membership  div.step.one.active").length && $('dnn_ctr531_MembershipApplication_uxNextButton[disabled="disabled"]') ){
					$nextBtn.removeAttr('disabled');
					$nextBtn.click( function({
						if( $getQuote.length ) {
							$getQuote.click();
						}
					});
				}
				*/
			},
			/* =======================
			   Focus Styles
			   ==================== */
			formFocusStyle : function(){
			
					var $input = $('input[type="text"]');
					var $select = $(".select-menu select");
					
					if ( ! $input.data("focusHandlerInput")) {
						
						// Add a flag indicating the events have been bound
						$input.data("focusHandlerInput", true);
						
						$input.focus(function() {
							$(this).addClass("curFocus");
							// console.log( ' focus on text input ' );
						});
						
						$input.blur(function() {
							$(this).removeClass("curFocus");
							//console.log( 'leave focus on text input ' );
						});
					}
					
					if ( ! $select.data("focusHandler")) {
					
						// Add a flag indicating the events have been bound
						$select.data("focusHandler", true);
						
						$select.focus(function() {
							$(this).closest('.select-menu').addClass("curFocus");
						});
						
						$select.blur(function() {
							$(this).closest('.select-menu').removeClass("curFocus");
						});
					}
			},
			/* =======================
			   Image Background Resize
			   ==================== */				
			imageBackgroundResize : function() {	
				var startwidth = 1500;
				var startheight = 830;
				var minWidth = 990;
				var minHeight = 560;
				
				var imageSliderWrap = $('#image-slider-wrap');
				var slideImageContainer = $('.slide-image');
				var slideImage = $('img', slideImageContainer);
				
				var ratio = startheight/startwidth;	
				var browserwidth = $(window).width();
				var browserheight = $(window).height();

				if ( browserwidth < minWidth ) {
					//Do Nothing
				}
				else {
					if ((browserheight/browserwidth) > ratio) {
						slideImage.height(browserheight);
						slideImageContainer.width(browserheight / ratio);
						slideImage.width(browserheight / ratio);
					} 
					else {
						slideImageContainer.width(browserwidth);
						slideImage.width(browserwidth);
						slideImage.height(browserwidth * ratio);
					}					
				}
			},			
			/* =======================
			   live Chat Click
			   Footer chat button clicks the one in the header
			   ==================== */
			liveChatClick : function() {

				$('.ef-live-chat a.a-desk-widget-chat').click();
				return false;
			},	
			/* =======================
			   Button Swap
			   ==================== */
			buttonSwap : function() {
				
				// don't allow any action on a disabled button
				if( $(this).hasClass('.disabled') ){
					return false;
				}
				
				$(this).parents('.steps').find('.active-button').removeClass('active-button');
				$(this).addClass('active-button');	
				$("input[type='radio'], input[type='checkbox']", this).attr("checked", "checked");
				
				// If homepage, disable / reselect cover level if parent or family
				if( $('#dnn_btnGetQuote').length ) {
					
					// Re-select cover level
					var type = $('#landing-slider-sales-funnel select[name="material"]').val();
					
					if( type == 'single-parent' || type == 'family' ) {
						
						// Disable basic cover
						//$('select[name="cover"] option[value="basic"]').attr('disabled', 'disabled').siblings().eq(0).attr('selected', 'selected').parent().change();

						// Remove the option
						$('select[name="cover"] option[value="basic"]').remove();
						$('select[name="cover"]').change();

					} else {
						// Re-append instead of enabling
						if( ! $('select[name="cover"] option[value="basic"]').length ){
							$('select[name="cover"]').prepend('<option value="basic">Basic</option>').parent().change();
							$('select[name="cover"]').change();
						}
						 // Disable
						 //$('select[name="cover"] option[value="basic"]').removeAttr('disabled').parent().change();
					}
					
				} 
			},			
			/* =======================
			   Search Widget Dropdown
			   ==================== */
			searchWidgetDropDown : function() {
				$('#search-widget').slideToggle();
			},

           /* =======================
			   Menu Widget Dropdown
			   ==================== */

			conditionalMenuInstructions : function() {
				var instance = this;			   
				if ($("#dnn_dnnLOGIN_cmdLogin").html().indexOf("Sign in") == -1) {
		            // Logged in & cookie plugin loaded 
		            if( typeof $.cookie != 'undefined' ){
		            	// If no cookie exists bring up the user menu to show it to the user
						if( ! $.cookie("menu-instructions") ){

							// Set the cookie so it doesn't do it again ( session cookie)
							$.cookie('menu-instructions', true, { path: '/' });

							// Show the menu
							instance.menuWidgetDropDown();

							// Set timeout for menu
							var $menu = $('#menu-widget');

							$menu.data("hoverTimeout", setTimeout(function() {
								instance.menuWidgetClose();
							}, 10000));

							// Show the instructions
							$("#menu-instructions").show().find('a').on('click', function(event){
								event.preventDefault();
								instance.menuWidgetClose(0);
							});

						} else {
							$('#menu-instructions').remove();
						}
		            } else {
		            	$('#menu-instructions').remove();
		            }
	        	}
        	},


            menuWidgetDropDown : function() {
                var $menu = $('#menu-widget');
                if ($("#dnn_dnnLOGIN_cmdLogin").html().indexOf("Sign in") == -1) {
                	if (!$menu.data("hover")) {

                		$("#dnn_dnnLOGIN_cmdLogin").closest('.ef-login').addClass('menu-open');
                		$menu.css("height", "auto");
                		var _height = $menu.height();
                		$menu.data("hover", true).css("height", "0px").show().stop(true, false).animate({
                			height: _height + "px"
                		}, 500);
                	}
                    clearTimeout($menu.data("hoverTimeout"));
                }
			},
            menuWidgetClose : function(delay) {
            	var timeDelay = 1000;
            	if (typeof delay === 'number' && isFinite(delay)) timeDelay = delay;
                var $menu = $('#menu-widget');
                if ($("#dnn_dnnLOGIN_cmdLogin").html().indexOf("Sign in") == -1) {
                    $menu.data("hoverTimeout", setTimeout(function() {

             			// Remove Demo HTML if exists
            			var $demo = $menu.find('#menu-instructions');
            			if( $demo .length ){
            				$demo.fadeOut();
            			}

            			

                        $menu.data("hover", false).stop(true, false).animate({
                			height: "0px"
                		}, 500, function() {
                			$(this).hide();
                			$("#dnn_dnnLOGIN_cmdLogin").closest('.ef-login').removeClass('menu-open');
                		});
                    }, timeDelay));
				    
                }
			},
			
			/* =======================
			   Arrows For Input Buttons
			   ==================== */
			addArrowsStylesInput : function() {
				$('.generic #content-area input[type="submit"]:visible, .login input[type="submit"]:visible').each(function(){
					var submit = $(this); 
					if(!submit.hasClass('styled') && submit.parents('.DataGrid_Item').length == 0) {
						var classname = '';
						var value = submit.val().toLowerCase();
						var values = ['submit', 'save', 'next', 'log in', 'cancel claim', 'cancel', 'begin'];
						if($.inArray(value, values) > -1) {
							// classname = 'submit';
							classname = value.replace(" ", "-");
							
							if( classname == 'cancel-claim'){
								classname = 'cancel';
							}
							
							if( classname == 'begin'){
								classname = 'next';
							}
							if( classname == 'submit'){
								classname = 'next';
							}
							
						}
						
						submit.wrap('<div class="call-to-action '+classname+' '+submit.attr('id')+'" />');
						
						// Add parent disable class if disabled
						if( $(this).is(":disabled") == true ){
									$(this).parent().addClass('disabled');
								} else {
									$(this).parent().removeClass('disabled');
						}
						switch(classname) {
						
							case 'cancel':
								//submit.parent().append('<div class="arrow-right arrow-blue" />');
								break;
							case 'next':
								//console.log( $(this) );
								// fade it out if disabled
								submit.parent().append('<div class="arrow-right arrow-pink" />');
								break;
							case 'submit':
								submit.parent().append('<div class="arrow-right arrow-gray" />');
								break;
							case 'back':
								submit.parent().append('<div class="arrow-left arrow-gray" />');
								break;
							case 'log-in':
								submit.parent().append('<div class="arrow-right arrow-pink" />');
								break;							
						}
						submit.addClass('styled');
					}
				});
			},
			
			
			/* =======================
				Shift the form errors into parent wrapper if available 
			==================== */
			moveFormErrors : function() {
				// check for validation errors
				$("div.validation_Summary").each(function(){
					// check if there is a wrapper avaialble to shift into, then move if there is
					if( $(this).parents('div.submit_buttons_wrap:visible').length && ! $(this).parent().hasClass('submit_buttons_wrap') ){
						$(this).prependTo($(this).closest('div.submit_buttons_wrap:visible'));
					}
				});
			},
			/* =======================
				Wrap submit buttons with extra markup for border
			==================== */
			wrapFormSubmitButtons : function() {
				var $lastSubmitButtons = $('.submit_buttons:visible:last');
				if( $lastSubmitButtons.length && ! $lastSubmitButtons.parent().hasClass('submit_buttons_wrap') ){
					$lastSubmitButtons.wrap('<div class="submit_buttons_wrap" />');
					//console.log( $lastSubmitButtons.attr('id') );
				}
			},
			/* =======================
				Landing Scroll Up To
			==================== */		
			landingScrollUp : function(event) {			   
				$('html, body').animate({scrollTop: $("#header").offset().top}, 500);
				return false;
			},				
			restyleTextinput: function(){
				$('input[type="text"], input[type="password"]').parents().addClass('input');
			},			
			/* =======================
			   Restyle Radiobox
			   ==================== */
			restyleRadioBox : function() {
				var $radioInput = $('input:radio');
				
				$radioInput.each(function(){
					var radio = $(this);
					if(!radio.hasClass('styled') && radio.parents('.ControlPanel').length == 0 && !radio.data("styled") ) {
						radio.siblings('label[for="'+radio.attr('id')+'"]').addClass('radio ' + radio.attr('id'));
						radio.wrap('<div class="radio '+radio.attr('id')+'" />');
						radio.parent().prepend('<span />');
						if(radio.is(':checked')){
							radio.siblings('span').addClass('checked');
						}
						//$('.radio').first().children('span').addClass('checked');
						radio.addClass('styled');
						radio.data("styled", true);
						
						
					}
				});
				
				// prevent multiple event handler attachment
				//if( $radioInput && !$radioInput.data('hasAction') ) {

					//$radioInput.data('hasAction', true);
				//}				
			},
			onRadioClick : function(){
						var radioType = $(this).attr('name');
						$('input[name='+radioType+']:radio').each(function(){
							$(this).parent().children('span').removeClass('checked');
						});
						$(this).parent().children('span').addClass('checked');
			},
			/* =======================
				Restyle Dropdown
			==================== */
			restyleDropdown : function() {
				$('select').each(function () {
					var select = $(this);
					if(!select.hasClass('styled') && select.parents('.ControlPanel').length == 0 && !select.data("styled") ) {
						if(typeof select.attr('name') == 'undefined') {
							select.wrap('<div class="select-menu" />');							
						}
						else {
							select.wrap('<div class="select-menu '+(select.attr('name').replace(/\$/g, ''))+'" />');
						}
						select.parent().prepend('<span />');
						select.addClass('styled');
						select.data("styled", true);
					}
				});
				
				var $select =  $('.select-menu select');
				
				// prevent multiple event handler attachment
				if( $select && !$select.data("hasAction")){   
					
					$select.each(function () {
						$(this).parent().find('span').html($(this).find('option').eq(this.selectedIndex).html());
					});
					
					$select.on('change reSelect', function () {
						$(this).parent().find('span').html($(this).find('option').eq(this.selectedIndex).html());
						$(this).parent().find('span').removeClass().addClass($(this).find('option').eq(this.selectedIndex).attr('class'));
					});
					$select.parent().click(function () {
						$(this).find('span').html($("select", this).find('option').eq($("select", this).get(0).selectedIndex).html());
						$(this).find('span').removeClass().addClass($("select", this).find('option').eq($("select", this).get(0).selectedIndex).attr('class'));
					});
					$select.data("hasAction",true);
				}
			},
			/* =======================
				Restyle Checkbox
			==================== */
			restyleCheckbox : function() {
				$('form input:checkbox').each(function() {
					var checkbox = $(this);
					
					// only apply the event to each element once
					if( !checkbox.data("hasAction")){  
					
						if(!checkbox.hasClass('styled') && checkbox.parents('.ControlPanel').length == 0  ) {
						
							checkbox.siblings('label[for="'+checkbox.attr('id')+'"]').addClass('checkbox ' + checkbox.attr('id'));
							checkbox.wrap('<div class="checkbox '+checkbox.attr('id')+'" />');
							checkbox.parent().prepend('<span />');
							if(checkbox.is(':checked')){
								checkbox.siblings('span').addClass('checked');
							}
							checkbox.addClass('styled');
							
						}
						checkbox.change(function() {
							if(!checkbox.hasClass('hospital-only')) {
								checkbox.parent().children('span').toggleClass('checked');
							}
						});
						
						checkbox.data("hasAction", true);
					}					
				});
			},
			/* =======================
				Adjust Header Width
			==================== */
			adjustHeaderWidth : function() {
				var headerWidth = $('#header').width();
				var logoWidth = $('#logo').width();
				var headerContentWidth = headerWidth - logoWidth;
				var minWidth = 714;	
				$('#header-content').css({"width" : headerContentWidth - 10 }); //Minus Padding	
			}			
		},

	/* ============================================
	   Social Media Script Methods
	   ========================================== */
		SocialMedia : {
			/* =======================
			   Init
			   ==================== */			
			init : function() {
				var instance = this;
				instance.socialMedia();
			},
			/* =======================
				Social Media
			==================== */
			socialMedia : function() {
				var windowSrc = window.location.href;
				var windowSrc = windowSrc.replace(/.+\\.+/,"%3A%2F%2F");
				$('<iframe />', {
					src:         "http://www.facebook.com/plugins/like.php?href="+windowSrc+"&send=false&layout=standard&width=450&layout=button_count&show_faces=false&action=like&font=arial&height=21",
					width:       '77px',
					frameborder: '0',
					allowTransparency: 'true',
					height:      '21px'
				}).appendTo('.social-buttons');
			}			
		},
		
	/* ============================================
	   Google Analytics Event Tracking Script Methods
	   ========================================== */
		Analytics : {
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				$('#sales-funnel-submit input').on("click", this, this.getQuoteSubmit);
				$('#landing-slider .call-to-action .button').on("click", this, this.heroImageCTA);
				$('.landing #content #page-links ul li a').on("click", this, this.whyUsCTAClick);
				$('#quote-button').on("click", this, this.getQuotePromoTiles);
				$('#quote-sidebar .call-to-action input').on("click", this, this.joinNowClick);
				$('#buy-quote input').on("click", this, this.buyThisCoverClick);
				$('.quote #header ul.extra-features li.ef-live-chat img').on("click", this, this.onQuoteSidewaysAbandonment);
				$('#buy-quote input').on("click", this, this.sessionsWithQuoteToolInteraction);
				
				$('#quote-details .table.tabbed .tabs-nav li.first a').on("click", this, this.onQuoteTabClick);
				$('#header ul.extra-features li.ef-live-chat img').on("click", this, this.onAccessOfOnlineChat);
				
				
				// Adwords Conversion
				$('.quote  #state select[name="state"]').on("change", this, $.proxy(instance.adwordSelectTrack, instance));
				$('.quote  select#type-dropdown').on("change", this, $.proxy(instance.adwordSelectTrack, instance));
				
				$('.addthis_toolbox a').live("click", this, $.proxy(instance.adwordsShareThis, instance));
				 
				$('.section-contact-us a[href^="mailto:"]').on("click", this, $.proxy(instance.adwordsContactEmail, instance));
				
				// quote buttons [ Contact us, Homepage x 2 ], PolicyGuide 
				$(".section-contact-us .button.pink, #dnn_btnGetQuote, #contactGetQuoteImg a.button.pink, #dnn_btnJoinNow").on("click", this, $.proxy(instance.adwordsQuoteBtn, instance));
				
				$('.ef-live-chat a.a-desk-widget-chat').on("click", this, $.proxy(instance.adwordsChatTrack, instance));
				
				// individual page conversions
				instance.adwordsSpecificPageConversions();

				// Slider quote analytics
				instance.quoteSliderTracking();
				
				instance.quoteExcessSliderTracking();

			},
			/* =======================
			Slider quote analytics
			==================== */	
			quoteSliderTracking  : function(){
			
				var instance = this;
				//var quotetype = instance.quotetype;
				var $slider = $('.quote #quote .slider');
				$slider.bind( "slidestop", function(event, ui) {
					//console.log('make conversion as:');
					
					clearTimeout($slider.data("seoEventTimeout"));
					$slider.data("seoEventTimeout", setTimeout(function() {
						
						var selectedType = $slider.data("covertype");
						// adwords conversion
						instance.adWordsConversion("slider_"+selectedType);
						
						//
						instance.sessionsWithQuoteToolInteraction();
						
					}, 2000));
				});
			},
			/* =======================
			Excess quote analytics
			==================== */	
			quoteExcessSliderTracking  : function(){
				var instance = this;
				//var quotetype = instance.quotetype;
				var $slider = $('.quote #excess .slider');
				$slider.bind( "slidestop", function(event, ui) {
					//console.log('make conversion as:');
					
					clearTimeout($slider.data("seoEventTimeout"));
					$slider.data("seoEventTimeout", setTimeout(function() {
						
						// adwords conversion
						//instance.adWordsConversion("slider_"+selectedType);
						$slider.data('excessValue',ui.value);
						
						instance.sessionsWithQuoteToolInteraction();
						
					}, 2000));
				});
			},
			/* =======================
			Specific page conversions that must be done via JS checks
			==================== */	
			adwordsSpecificPageConversions : function(){
				var instance = this;
				
				// Privacy Policy Page
				if( $("html.section-privacy-policy").length ){
					instance.adWordsConversion('policypage');
				}
				
				// Is Logged in, if so add conversion img
				if( $(".ef-login #userloged-in").length ){
					instance.adWordsConversion('isloggedin');
				}
				
			},
				
			/* =======================
			Tracking live chat click
			==================== */	
			adwordsChatTrack : function(event){
				var instance = this;
				// just hard code the label to pass
				instance.adWordsConversion('livechat');
			},
			/* =======================
			Tracking quote buttons on site
			==================== */	
			adwordsQuoteBtn : function(event){
				var instance = this;
				// just hard code the label to pass
				instance.adWordsConversion('quotebtnlink');
			},
			/* =======================
			Tracking mailto links on contact page
			==================== */	
			adwordsContactEmail : function(event){
				var instance = this;
				// just hard code the label to pass
				instance.adWordsConversion('mailtolink');
			},
			/* =======================
			Tracking adThis
			==================== */	
			adwordsShareThis : function(event){
				var instance = this;
				// just hard code the label to pass
				instance.adWordsConversion('sharethis');
			},
			/* =======================
			select box track adword tracking
			==================== */	
			adwordSelectTrack : function(event){
				var instance = this;
				var event = $(event.target);
				var label = event.find('option:selected').val();
				instance.adWordsConversion(label);
				
				// call the other tracking code too
				instance.sessionsWithQuoteToolInteraction();
			},
			/* =======================
				Get Quote Submit Tracking
				==================== */
			getQuoteSubmit : function() {
				var material = $('input[name=material]:checked').val();
				_gaq.push(['_trackEvent', 'Quick Quote Use', 'Help Me Choose Click', material]);
			},
			/* =======================
				Hero Image CTA Tracking
				==================== */
			heroImageCTA : function() {
				_gaq.push(['_trackEvent', 'Homepage Hero Click', 'View Our Family Plans', 'Health Link CTA']);
			},
			/* =======================
				Why Us CTA Click Tracking
				==================== */
			whyUsCTAClick : function() {
				var destination = $(this).attr('href');
				_gaq.push(['_trackEvent', 'Why Us CTA Click', destination, 'Hero Image CTA']);
			},
			/* =======================
				Get Quote Promo Tiles
				==================== */
			getQuotePromoTiles : function() {
				var destination = window.location.href;
				_gaq.push(['_trackEvent', 'Quick Quote Promo Tile', 'Get a Free Quote Click', destination]);
			},			
			/* =======================
				Quote Submit Tracking
				==================== */
			joinNowClick : function() {			
				_gaq.push(['_trackEvent', 'Quote Submit', 'Join Now Click']);
			},
			/* =======================
				Quote Submit Tracking
				==================== */
			buyThisCoverClick : function() {
				_gaq.push(['_trackEvent', 'Quote Submit', 'Buy This Cover Click']);
			},
			/* =======================
				Quote Sideways Abandonment
				==================== */
			onQuoteSidewaysAbandonment : function() {
				_gaq.push(['_trackEvent', 'Quote Abandonment', 'Questions Click']);
			},
			/* =======================
				Quote Sideways Abandonment
				==================== */
			sessionsWithQuoteToolInteraction : function() {
				var data = $('#cover').val();
				data = data + " " + $('#product').val();
				data = data + " " + $('#productType').val();
				data = data + " " + $('#excessid').val();
				
				// add slider datas
				data = data + " " + $('.quote #quote .slider').data('covertype');
				data = data + " " + $('.quote #excess .slider').data('excessValue');
				
				_gaq.push(['_trackEvent', 'Quote Interaction', 'Option Selection', data]);
			},
			/* =======================
				Quote Tab Click
				==================== */
			onQuoteTabClick : function() {
				var label = $(this).text();
				_gaq.push(['_trackEvent', 'Quote Interaction', 'Tab Interaction', label]);
			},
			/* =======================
				Access Of Online Chat
				==================== */
			onAccessOfOnlineChat : function() {
				var location = window.location.href;
				_gaq.push(['_trackEvent', 'Live Chat Access', 'Click', location]);
			},			
			/* =======================
			Adwords Converion Tracking method
			==================== */
			adWordsConversion: function(label){
				
				// debug
				// console.log('add tracking IMG with ' + label);
				
				// check for a tracker img, create one if not
				if( ! $("img#adWordsConversionImg").length) {
					$("body").append('<img id="adWordsConversionImg" />');
				}
				
				// Setup converion labels for easy reference
				var conversionLabels = {
					
				  // random individual elements
				  'sharethis' 		: "eBk-CJ6I3AIQ2uCg3wM",
				  'mailtolink' 		: '9lP4CN6P3AIQ2uCg3wM',
				  'quotebtnlink' 	: "lbLxCL6E3AIQ2uCg3wM",
				  'livechat' 		: 'jzqKCJaJ3AIQ2uCg3wM',
				  'policypage'		: 'UBi4CO6N3AIQ2uCg3wM',
				  'isloggedin'		: '37esCOaO3AIQ2uCg3wM',
				  
				  // person type labels
				  'slider_basic'		: "R7RlCJb62wIQ2uCg3wM",
				  'slider_heartplus'	: "6bYhCIaT-QIQ2uCg3wM",
				  'slider_middle'		: "FkoaCI772wIQ2uCg3wM",
				  'slider_high'			: "4z3LCIb82wIQ2uCg3wM",
				  
				  // person type labels
				  'single'			: "m5zaCLb22wIQ2uCg3wM",
				  'couple'			: "KKZ5CK732wIQ2uCg3wM",
				  'family'			: "_4anCKb42wIQ2uCg3wM",
				  'single-parent'	: "1WcHCJ752wIQ2uCg3wM",
				  
				  // insurance types 
			//	  'insure_basic'		: "R7RlCJb62wIQ2uCg3wM",
			//	  'insure_middle_medium': "FkoaCI772wIQ2uCg3wM",
			//	  'insure_high'			: "4z3LCIb82wIQ2uCg3wM",
				  
				  // Sate changes
				  'vic'		: "FBU7CP782wIQ2uCg3wM",
				  'nsw'		: "Iek3CPb92wIQ2uCg3wM",
				  'qld'		: "_vrOCO7-2wIQ2uCg3wM",
				  'sa'		: "QJvjCN6A3AIQ2uCg3wM",
				  'wa'		: "HZRQCNaB3AIQ2uCg3wM",
				  'act'		: "7tMjCM6C3AIQ2uCg3wM", 
				  'nt'		: "C3veCMaD3AIQ2uCg3wM "
				  
				};
				

				var google_conversion_id = 1005072474;
				var google_conversion_language = "en";
				var google_conversion_format = "3";
				var google_conversion_color = "ffffff";
				var google_conversion_label = "";
				var google_conversion_value = 0;
				
				google_conversion_label = conversionLabels[label];
				
				var protocol = location.protocol;
				if (typeof protocol == "undefined" && protocol == "") protocol = "http:";
				if (protocol.indexOf(":") == -1) protocol += ":";
				
				var srcURL = protocol + "//www.googleadservices.com/pagead/conversion/"+google_conversion_id+"/?label="+google_conversion_label +"&script=0"; 
				
				// TODO:: Review adding back in for Chrome Mac
				$("img#adWordsConversionImg").attr('src',srcURL);

			}
			
		},

	/* ============================================
	   Blog Template Methods
	   ========================================== */
		Blog : {
			/* =======================
			   Init
			   ==================== */			
			init : function() {
				var instance = this;
				instance.resizeComment();
				$(window).resize(function(){ instance.resizeComment() });
			},
			resizeComment : function() {
				$('.blog-post').each(function() {
					var contentAreaHeight = $(this).find('.content-area').height();
					$(this).find('.meta').css({
						"height" : contentAreaHeight
					});
				});
			},
			addFirstClass : function() {
				$('.blog-post').each(function() {
					var contentAreaHeight = $(this).find('.content-area').height();
					$(this).find('.meta').css({
						"height" : contentAreaHeight
					});
				});
			}
		},

	/* ============================================
	   JSON Product Data Access Methods
	   ========================================== */
		ProductData : {
			/* =======================
			   Init
			   ==================== */			
			init : function() {
				var instance = this;
			},	
		
			getProduct: function(quotetype){
				var instance = this;
				/*
				console.log(quotetype.material);
				console.log(quotetype.cover);
				console.log(quotetype.product);
				console.log(quotetype.productType);
				console.log(quotetype.excess);


				console.log(  instance.data[quotetype.state] );
				console.log(  instance.data[quotetype.state][quotetype.material] );
				console.log(  instance.data[quotetype.state][quotetype.material][quotetype.cover] );
				console.log(  instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product] );
				console.log(  instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product].items[quotetype.productType][quotetype.excess] );
				*/
					   return instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product].items[quotetype.productType][quotetype.excess];
			},
			
			getProductExtras: function(quotetype){
				
				switch (quotetype.product) {
				    case 'basic':
				        return 'Basic';
				        break;
				    case 'heartplus':
				    case 'middle':
				        return 'Medium';
				        break;
				    case 'high':
				        return 'Highest';
				        break;
				}
				
				//var instance = this;
				//return instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product].extras;
			},
			
			getProducts: function(quotetype){
				var instance = this;				
				return instance.data[quotetype.state][quotetype.material][quotetype.cover];
			},
			
			getProductExcesses: function(quotetype){
				var instance = this;
				
				/*
				console.log(quotetype.material);
				console.log(quotetype.cover);
				console.log(quotetype.product);
				console.log(quotetype.productType);


				console.log(  instance.data[quotetype.state] );
				console.log(  instance.data[quotetype.state][quotetype.material] );
				console.log(  instance.data[quotetype.state][quotetype.material][quotetype.cover] );
				console.log(  instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product] );
				console.log(  instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product].items[quotetype.productType] );
				*/
				
				var product = instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product].items[quotetype.productType];
				var excesses = [];
				for(var x in instance.data[quotetype.state][quotetype.material][quotetype.cover][quotetype.product].items[quotetype.productType]) {
					excesses.push(parseInt(x));
				}
				return excesses;
			},
			
			//Product Comparison Initial Setup Method
			getLowestPrices: function(quotetype){
				var instance = this;
			
				var lowestPrices = [];
				$.each(instance.data[quotetype.state][quotetype.material][quotetype.cover], function(productKey, productValue) {
					instance.productInformation = [];
					$.each(this.items, function(key, value) {
						
						if (this[quotetype.excess] == undefined) { var price = 'undefined';	}
						else { var price = this[quotetype.excess].price; }
						
						// Fresh: monthlyPrice
						if (this[quotetype.excess] == undefined) { var monthlyPrice = 'undefined';	}
						else { var monthlyPrice = this[quotetype.excess].monthlyPrice; }
						
						// Fresh: extrasValue
						if (this[quotetype.excess] == undefined) { var extrasValue = 'undefined';	}
						else { var extrasValue = this[quotetype.excess].extrasValue; }
						
						instance.productInformation = {
							'product': productKey,
							'productType': key
						};
						
						
					
						//If Hospital Only
						if(key == '0') {
							var className = '.'+productKey;
						}
						else {
							var className = '.'+productKey+'-'+key;
						}
						var obj = {
							'productInformation': instance.productInformation,
							'className': className,
							'price': price,
							'monthlyPrice': monthlyPrice,
							'extrasValue': extrasValue
						};
						lowestPrices.push(obj);
					});
				});
				return lowestPrices;
			},			
			
			formatQuery: function(quotetype){
				var instance = this;	
				return $.param(quotetype);
			},
			
			parseQuery: function(){
				var qs = window.location.hash.split('#').pop();
				var query = {};
				if(qs) {
					$(qs.split('&')).each(function(){
						var tmp = this.split('=');
						if(tmp[1]) query[tmp.shift()] = tmp.pop();
					});
				}
				return query;
			},
			
			setQuery: function(quotetype){
				var instance = this;
				window.location.hash = '#' + instance.formatQuery(quotetype);
			}
		},
		
	/* ============================================
	   Quoting Page Template Methods
	   ========================================== */
		Quote : {
		
			// Default quote values
			quotetype: {
				material: 'single',
				state: $('#state').val(),
				cover: 'normal',
				product: 'basic',
				productType: 65,
				excess: 500,
				period: 'weekly',
				age: 'under-65',
				income: 'tier1'
			},
			
			// All available products
			allproducts: {
				'normal': ['basic', 'heartplus', 'middle', 'high'],
				'hospital-only': ['basic', 'middle', 'high']
			},
			
			/* =======================
			   Init
			   ==================== */
			init : function() {
				var instance = this;
				var productData = health.ProductData;

				
				
				// Override defaults with querystring
				var query = productData.parseQuery();
				
				for(var key in query) {
					if(typeof(instance.quotetype[key] != 'undefined')) {
						instance.quotetype[key] = query[key];
					}
				}
				
				instance.setContentTableHeaderHeights();
				
				// Update form elements with defaults
				// Event bindings
				
				$('#state option.' + instance.quotetype.state).attr('selected', true);
				$('#state select').change();
				
				// More / less not being used atm
				$('.more-cover').on("click", this, $.proxy(instance.sliderMoreCover, instance));
				$('.less-cover').on("click", this, $.proxy(instance.sliderLessCover, instance));	
				
				// Help me choose rules
				$('#help-me-choose .dropdown-button').on("click", this, $.proxy(instance.helpMeChooseButton, instance));
				
				// Selectors within Help me choose
				$('.priority select, select#age-dropdown').on("change", this, $.proxy(instance.selectOptionsPresets, instance));
				
				// Upgrade links in quote tables
				$('.quote-table a.upgrade-quote').on("click", this, $.proxy(instance.upgradeCover, instance));	
				
				// Hospital Only Checkbox
				$('.hospital-switch-checkbox').on("click", this, $.proxy(instance.hospitalOnlyPlaceholderToggle, instance));
				
				// Hospital overlay button action
				$('.hospital-only-overlay .call-to-action a').on("click", this, $.proxy(instance.hospitalOnlyPlaceholderToggle, instance));
				
				// Cover type
				$('#material-dropdown select').on("change", this, $.proxy(instance.coverTypeSelectBoxChange, instance));	
				
				// Sidebar become a memmber action
				$('.become-a-member .join-up-link').on("click", this, $.proxy(instance.submitQuoteForm, instance));	
				
				// Change period checkbox
				$('input[name="period"]').on("click", this, $.proxy(instance.onPeriodButtonClick, instance));
				
				// Rebate Change these details button
				$('#rebate-settings-display input').on('click', this, $.proxy(instance.onChangeTheseDetailsClick, instance));

				// Rebate Update details button
				$('#update-rebate-details').on('click', this, $.proxy(instance.onRebateUpdateButton, instance));
				
				// Need to add and remove rebate income options
				instance.rebateIncomeOptions = {};
				instance.rebateIncomeOptions.single = $('#rebate-income option.single').clone();
				instance.rebateIncomeOptions.multiple = $('#rebate-income option.multiple').clone();

				// On load setup the default rebate
				instance.setRebatePrice();
				instance.updateRebateText(); // update household / personal
				
				// Rebate option (age/income) change
				$('#rebate-settings select').on('change', this, $.proxy(instance.onRebateOptionChange, instance));
				
				// Inits
				instance.buttonsInit(instance.quotetype.material);
				instance.helpMeChooseInit();
				instance.stateSelectInit();
				instance.createHospitalCoverSlider();
				instance.createQuoteSlider(false);			
				instance.periodInit(instance.quotetype.period);
				instance.updateForm();
				instance.updateQuote();
				instance.hospitalOnlyInit(instance.quotetype.cover);				
				instance.quoteAnimationInit();
				instance.detailsInit();
				instance.coverTypeSelectBoxUpdate();
				
				// show 5min timeout overlay after 10 minutes - springloops ticket 586
				setTimeout( function(){ instance.timeoutOverlayInit(); }, 600000); // 600,000 miliseconds is 10 minutes

			    /* =======================
			    Redirect action of the signup instead of submitting form
			    ==================== */	
				$("#dnn_btnBuy,.dnn_btnJoinNow").add("#dnn_btnJoinNow").click(function(e) {
					location.href = "/SignUp/?" + location.href.replace(/[^#]*#/, "");
					e.preventDefault();
				});



				// 
				// **** POP & LOCK  ****
				// 
				instance.setUpTabs();
				
				// swap tabs actions
				$('div.quote-tab-container ul.tabs-nav li a').on("click", this, this.swapTabs);
				
				var popAndLockScroller = $('.quote #content #quote #animation-elements-slider');
				var popAndLockSidebar = $('.quote #main #sidebar #quote-sidebar');
				instance.popAndLockSliderTopPosition = popAndLockScroller.offset().top - parseFloat(popAndLockScroller.css('marginTop').replace(/auto/, 0));
				instance.popAndLockSidebarTopPosition = popAndLockSidebar.offset().top;
				instance.sidebarSet = true;		
				$(window).scroll(function(event) {
					// Locking the sliderbar & the blurb
					var slider = $('.quote #content #quote #animation-elements-slider');
					var tableHeader = $('.quote-table-header');
					var sidebar = $('.quote #main #sidebar');
					var quotebox = $('.quote #sidebar #quote-sidebar');
					//What The Y Position Of The Scroll Is
					var y = $(this).scrollTop();
					//Whether That's Below The Fold
					if (y >= instance.popAndLockSliderTopPosition) {
						//If So, Add The Fixed Class
						slider.addClass('fixed');
						tableHeader.addClass('fixed');
					} else {
						//Otherwise Remove It
						slider.removeClass('fixed');
						tableHeader.removeClass('fixed');
					}
					if (y >= instance.popAndLockSidebarTopPosition) {
						var totalScrollableArea = $(".quote #content").height();
						var remainingScrollableArea = totalScrollableArea - (y - $(".quote #content").offset().top);
						if (remainingScrollableArea >= sidebar.height()) {
							if (y >= instance.popAndLockSidebarTopPosition + (sidebar.height() - quotebox.height())) {
								if (!sidebar.hasClass('fixed') && parseInt(sidebar.css('marginTop')) == 0) {
									sidebar.children(':visible').not('#quote-sidebar-wrapper').css({ opacity: 0 }).animate({ opacity: 1 }, 500);
								}
								sidebar.addClass('fixed');
								quotebox.removeClass('fixed');
							} else if (!sidebar.hasClass('fixed')) {
								sidebar.removeClass('fixed');
								quotebox.addClass('fixed');
							}
							sidebar.css({ marginTop: 0 });
						} else {
							sidebar.removeClass('fixed');
							quotebox.removeClass('fixed');
							sidebar.css({ marginTop: (totalScrollableArea - sidebar.height()) + 'px' });
						}
					} else {
						sidebar.removeClass('fixed');
						quotebox.removeClass('fixed');
					}
				});
				
				// Remove extras that aren't valid for cover type, ticker #637
				$('div.extras:not(.hospital-only-extras) table.quote-extras td.tbl-col-2 div.tool-tip-cross').parent('td').parent('tr').remove();
				
			},
			/* =======================
			   Overlay Timeout and Actions
			   ==================== */			
			timeoutOverlayInit: function(){

					$('#overlay-container').fadeIn();
					$('#overlay-timeout a.close-button').click( function(){
						$('#overlay-container').hide();
						return false;
					});
					$('#overlay-timeout a.button').click( function(){
						$('#overlay-container').hide();
						return false;
					});
			},		
			/* =======================
			   submitQuoteForm Form action
			   ==================== */			
			submitQuoteForm: function(){
				$('.dnn_btnJoinNow').click();
				return false;
			},	
				
			/* =======================
			   Set Content Table Header Heights
			   ==================== */			
			setContentTableHeaderHeights: function(){
				$('.quote-table-header').each(function(index){		
					var height = $(this).height(); 
					$(this).parent().css({ 'height' : height+1 });
				});
			},			
			/* =======================
			   Setup Hospital And Extras Tabs
			   ==================== */			
			setUpTabs: function(){
				$('.extras-table-head, #tab-0-1').hide();				
			},
			/* =======================
			   Swap Hospital And Extras Tabs On Click Tabs
			   ==================== */			
			swapTabs: function(event){
				event.preventDefault();
				
				// Remove all active states
				$('.details div.quote-tab-container ul.tabs-nav li').removeClass('active');
				
				// get correct "index"
				var order = $(this).parent().index();
				
				// Set all the active states.
				$(".quote-tab-container ul.tabs-nav li:nth-child(" +  (order + 1) + ")").addClass('active');
				
				$('table.table-head.active-tab, div.content-tab.active-tab').removeClass('active-tab').hide();
				
				var clicked = $(this).attr('href').substring(1);
				var closest = $(this).closest('.quote-table-container');
				$('.'+clicked).show().addClass('active-tab');
			},
			/* [ BACKUP of Individual tab swapping ]
			
				// Beta
				event.preventDefault();
				$('.details:visible div.quote-tab-container ul.tabs-nav li.active').removeClass('active');
				
				$(this).parent().addClass('active');
				$('table.table-head.active-tab, div.content-tab.active-tab').removeClass('active-tab').hide();
				var clicked = $(this).attr('href').substring(1);
				var closest = $(this).closest('.quote-table-container');
				$('.'+clicked).show().addClass('active-tab');
			
				// Alpha
				swapTabs: function(event){
				event.preventDefault();
				$('.details:visible div.quote-tab-container ul.tabs-nav li.active').removeClass('active');
				$(this).parent().addClass('active');
				$('table.table-head.active-tab, div.content-tab.active-tab').removeClass('active-tab').hide();
				var clicked = $(this).attr('href').substring(1);
				var closest = $(this).closest('.quote-table-container');
				$('.'+clicked).show().addClass('active-tab');
			},
			*/

			/* =======================
			   Reset The rebate to default
			   ==================== */
			resetRebateDefault: function(){
				var instance = this;

				$("#rebate-settings select").each( function(){
					$(this).val( $(this).find("option:first").val() );
				});
				
				instance.setRebatePrice();
				instance.updateRebateText();

    			$('#rebate-settings-display').show();
    			$('#rebate-settings').hide();

				instance.updateOptions();	
				instance.updateQuote();

    			return false;
			},
			/* =======================
			   Button/Link to commit the update the rebate price
			   ==================== */
			onRebateUpdateButton: function(){
				var instance = this;

				// get correct rebate
				instance.setRebatePrice();

				// updat the text, including % ones
				instance.updateRebateText();

				// show the correct box
    			$('#rebate-settings-display').show();
    			$('#rebate-settings').hide();

    			// push the updates on price
				instance.updateOptions();	
				instance.updateQuote();

    			return false;
			},
			/* =======================
			   Rebate Option Change
			   ==================== */
			onRebateOptionChange: function(){
				var instance = this;
				
				instance.quotetype.income = $('#rebate-income').val();
				
				instance.quotetype.age =
				    ($('#rebate-age-partner option:selected').data('order') > $('#rebate-age option:selected').data('order')) &&
				    (instance.quotetype.material == 'couple' || instance.quotetype.material == 'family') ?
				        $('#rebate-age-partner').val() :
				        $('#rebate-age').val();
				
				//instance.setRebatePrice();
				//instance.updateOptions();	
				//instance.updateQuote();	
			},
			/* =======================
			   Set Rebate Price
			   ==================== */
			setRebatePrice: function(){

				var instance = this;

				// Which parts to show of the rebate
				$('#rebate-age-partner').parents('.select-wrapper').toggle(instance.quotetype.material != 'single' && instance.quotetype.material != 'single-parent');
				
				var incomeOptionsType = (instance.quotetype.material == 'single' ? 'single' : 'multiple')
				if (instance.rebateIncomeOptions[incomeOptionsType][0] != $('#rebate-income option')[0]) {
				    $('#rebate-income').html(instance.rebateIncomeOptions[incomeOptionsType]).find('option').eq(0).attr('selected', 'selected');
				    instance.onRebateOptionChange();
				}

				$('#rebate-income').trigger('reSelect');
				
				$('.rebate-display-income').text(instance.quotetype.material == 'single' ? '84,000' : '168,000');
				
				var rebate_scheme = {
				    base: {
				        tier1: 30,
				        tier2: 20,
				        tier3: 10,
				        tier4: 0
				    },
				    age_variation: {
				        'under-65': 0,
				        '65-69': 5,
				        'over-70': 10
				    }
				}
				
				var rebate_percent = rebate_scheme.base[instance.quotetype.income] + rebate_scheme.age_variation[instance.quotetype.age];
				
				

				instance.rebatePercent = rebate_percent;
				
			},
			/* =======================
			   Update price to include rebate
			   ==================== */
			getRebatePrice: function(price){
				var instance = this;

				return (price * (100 - instance.rebatePercent ) / 100).toFixed(2);
			},

			updateRebateText: function(){
				var instance = this;
				$('.rebate-display-percent').text(instance.rebatePercent); // update the text fields
				$('.rebate-display-personal-household').text((instance.quotetype.material == 'single' ? 'personal' : 'household'));
				$('.rebate-personal-household').text((instance.quotetype.material == 'single' ? 'Personal' : 'Household'));
			},
			/* =======================
			   Period Init
			   ==================== */
			periodInit: function(period){
				var instance = this;
				// only allow weekly/monthly
				$("#quote-sidebar input[name=period]").removeAttr('checked');
				
				//console.log( "period Init " + period );
				if( period == "monthly"){
					instance.quotetype.period = period;
				} else {
					instance.quotetype.period = "weekly";
				}
				$("#period-" + instance.quotetype.period ).click();
			},
			/* =======================
			     Change these details
			 ======================== */
			onChangeTheseDetailsClick: function() {
    			$('#rebate-settings-display').hide();
    			$('#rebate-settings').show();
			},
			/* =======================
			   Period Button Press
			   ==================== */			
			onPeriodButtonClick: function(event){
				var instance = this;
				var event = $(event.target);

				instance.quotetype.period = event.val();
				
				//console.log( instance.quotetype.period );
				//console.log(event.val());
				// should update the period text/html from within updateQuote
				instance.updateOptions();	
				instance.updateQuote();	
			},	


			/* =======================
			   Help Me Choose Initi
			   ==================== */
			helpMeChooseInit: function(){
				var instance = this;
				// Hide the help me choose button if single parent
				if( instance.quotetype.material == "single-parent" ){
					$("#help-me-choose").hide();
				}
			},

			/* =======================
			   On Help Me Choose Button Click
			   ==================== */			
			helpMeChooseButton: function(event){
				var event = $(event.target);
				$('#help-me-choose-tab').toggle();
				$('#help-me-choose').toggleClass('active');
			},	
			/* =======================
			   Help Me Choose Reset
			   ==================== */
			helpMeChooseReset: function(event){
				// reset "help me choose "
				
				// Reset Help me choose on close button 
				$('#help-me-choose-tab').hide();
				$('#help-me-choose').removeClass('active');
				$('#priority-dropdown option:first').attr("selected", "selected");
				$('.quote #content #help-me-choose-tab-information .content-tab').removeClass('active');
				if (this.quotetype.material != 'single-parent') {
    				$('#priority-dropdown').change();
				}
				
				// Reset slider buffer
				$('#help-me-choose').data('preventHide',false);
			},
			/* =======================
			   Change Options To Presets On Dropdown Selection
			   ==================== */			
			selectOptionsPresets: function(){
				var instance = this;
				
				// Set slider buffer
				$('#help-me-choose').data('preventHide',true);
				
				var selectedOption = $('#priority-dropdown option:selected').val();
				
				var selectedAge = $('#age-dropdown').val();
				
				$('.quote #content #help-me-choose-tab-information .content-tab').removeClass('active');

				if( instance.quotetype.material == "single-parent" ){
					instance.helpMeChooseReset();
				}
				// Find any div that has the right ruleset within it
				$("#help-me-choose-tab-information div.content-tab[data-priority*='" + selectedOption + "']").each( function(){
					
					// Ref 
					// data-priority='save-on-tax' data-agerange="18-31" data-cover="normal" data-material='["family"]' data-product="high" data-producttype="65" data-excess="500"
					
					// If age and correct & material ( check array position not for 0 !!! )
					if(   $(this).data("agerange") == selectedAge &&  $(this).data("priority") == selectedOption && ( jQuery.inArray(instance.quotetype.material, $(this).data("material"))  !== -1 )  ){
						
						//console.log("Found correct element " + $(this) );
						//console.log( "Material: " + $(this).data("material") );
						$('#help-me-choose').data('preventHide',true);
						
						//console.log( "Set new Rule ---" + " Age: " +  $(this).data("agerange") + " Priority " +  $(this).data("priority") + " Material " + $(this).data("material") + " productType = " + $(this).data("producttype") );
						//console.log( "Age: " +  $(this).data("agerange") + " Priority " +  $(this).data("priority") + " Material " + $(this).data("material") + " productType = " + $(this).data("producttype")  );
						
						$(this).addClass('active');
						
						instance.quotetype.cover = 'normal';
						//instance.quotetype.material = 'single';
						
						
						
						//instance.quotetype.product = $(this).data("product");
						//instance.quotetype.productType = $(this).data("producttype");
						//instance.quotetype.excess = $(this).data("excess");
						
						health.Quote.quotetype.product = $(this).data("product");
						health.Quote.quotetype.productType = $(this).data("producttype");
						health.Quote.quotetype.excess = $(this).data("excess");
						
						// Ste slider buffer
						$('#help-me-choose').data('preventHide',true);
						
						//console.log( "just before updated: data: " + $('#help-me-choose').data('preventHide') );
						
						instance.updateOptions();		
						instance.updateQuote();		
						
						// Force next run of updateQuote to hide the helpmechoose
						
						
						//if( $('#help-me-choose').hasClass('active') ) {
						//	$('#help-me-choose').data('preventHide',true);
						//}
						foundMatch = true;
						//console.log( "updated rule ");
						return false;
					}
					
					// If we haven't found a match from the above loop, reset the select box to the first option
					// $('#priority-dropdown option:first-child').attr("selected", "selected");
					
					// Un-Buffer the help me choose slider
					$('#help-me-choose').data('preventHide',false);
					// $('#line1').data("options").color //black
				});
					
				
				// Modify Elements
				/*
				switch(selectedOption) {
					case 'save-on-tax':
						instance.quotetype.material = 'single';
						instance.quotetype.cover = 'normal';
						instance.quotetype.product = 'middle';
						instance.quotetype.productType = 85;
						instance.quotetype.excess = 250;
				
						instance.updateOptions();		
						instance.updateQuote();						
						break;
					case 'my-family':
						instance.quotetype.material = 'family';
						instance.quotetype.cover = 'hospital-only';
						instance.quotetype.product = 'middle';
						instance.quotetype.productType = 0;
						instance.quotetype.excess = 500;
						
						instance.updateOptions();
						instance.updateQuote();	
						break;
				}
				*/
		
			},
			/* =======================
			   Change Options To Presets On Dropdown Selection
			   ==================== */			
			updateOptions: function(){
				var instance = this;
				instance.hospitalOnlyInit(instance.quotetype.cover);
				//instance.hospitalOnlyToggle($(this).is(':checked'));
				instance.createHospitalCoverSlider();
				instance.coverTypeSelectBoxUpdate();
				instance.updateForm();
				
				// console.log(" Update Options Run:  "  + instance.quotetype.cover );
			},
			/* =======================
			   Setup Tooltip Functionality
			   ==================== */					
			detailsInit: function(){
				//$('.quote-table-container').tabs();
				
				// Must run over each tip and apply method, can seem to do it on all at once eg $('.tool-tipper').miniTip({
				$('.tool-tipper').each( function(index){
					var $tip = $(this);
					$tip.miniTip({
						title: '',
						content: $tip.find('span').html(),
						maxW: 200
					});
				});
				
				/*
				$('.table.tabbed').each(function(i, table){
					var count = 0;
					$(table).attr('id', 'tabs-' + i);
					$(table).find('.tabs-content').each(function(ii, div){
						var div = $(div);
						div.attr('id', 'tab-' + i + '-' + ii);
						div.addClass((ii == 0 ? 'active' : ''));
						count++;
					});
					$(table).find('.tabs-nav a').each(function(ii, link){
						var link = $(link);
						link.attr('href', '#tab-' + i + '-' + ii);
						link.parent().addClass((ii == 0 ? 'first active' : ''));
						link.parent().css('z-index', count - ii);
						link.click(function(){
							var link = $(this);
							var id = link.attr('href').split('#').pop();
							link.parents('.tabbed').find('.active').removeClass('active');
							link.parent().addClass('active');
							$('#' + id).addClass('active');
							return false;
						});
					});
				});
				*/
			},
			// Update the cover type dropdown label ( data handled by object )	
			coverTypeSelectBoxUpdate: function(){
				var instance = this;
				var $type = $('#material-dropdown');
				
				// get correct value
				currentTypeVal = instance.quotetype.material;
				
				// Update the label with the correct text based on value form params
				var label = $type.find('option[value="' + currentTypeVal + '"]').text();
				
				// update the span text
				$type.find('span').text(label);

				// console.log("coverTypeSelectBoxUpdate","currentTypeVal: " + currentTypeVal, " Label: " + label,  $type );
			},
			// On select box change, click the correct button to action the quote stuff ( sneaky sneaky )	
			coverTypeSelectBoxChange: function(){
				var instance = this;	
				
				if( $("#help-me-choose").hasClass("active") ){
					$('#help-me-choose').data('preventHide',true); // don't move the slider encause 
				}
				
				instance.quotetype.material = $('#material-dropdown select option:selected').val();
				instance.updateForm();
				instance.updateQuote();

				$('#help-me-choose').toggle(instance.quotetype.material != 'single-parent');

				// reset rebate box
				instance.resetRebateDefault();
				
				// update the "help me choose encase its open ";
				if( $("#help-me-choose").hasClass("active") ){
					instance.selectOptionsPresets();
					$('#help-me-choose').data('preventHide',false); // don't move the slider encause 
				}
				
				
				// console.log( $('#priority-dropdown option:selected') );
				
				// TODO: add analytics below back
				// instance.adWordConverion();
				

				// Get the current select box value
				//var newTypeVal = $('#material-dropdown option:selected').val();
				
				// console.log("coverTypeSelectBoxChange","NewTypeVal: " + newTypeVal,  $(".button").hasClass(newTypeVal) );
				
				// find the selected input value, then click the parent button, to make the quote do it's thaaang
				//$('#step-one input[name="material"][value="' + newTypeVal + '"]').closest('.button').click();
				
				//console.log("coverTypeSelectBoxChange","NewTypeVal: " + newTypeVal,  $(".button").hasClass(newTypeVal) );
			},
			updateForm: function(){
				var instance = this;
				instance.createQuoteSlider();
			},
			
			buttonsInit: function(checkedVal){
				$('#step-one .button.active-button').removeClass('active-button');
				$('#step-one .button span.checked').removeClass('checked');
				var radio = $('#step-one input[value=' + checkedVal + ']');
				radio.attr('checked', 'checked');
				radio.parents('.button').addClass('active-button');
				radio.parents('.button').find('span').addClass('checked');
			},
			
			// Cover setup calls this	
			hospitalOnlyInit: function(coverType){ // passed in hospital-only OR normal
				
				var instance = this;
				var checkbox = $('#hospital-only');
				
				// pass toggle on or off based on loaded cover
				if(coverType == 'hospital-only') {
					instance.hospitalOnlyToggle(true);
				}
				else {
					instance.hospitalOnlyToggle(false);
				}
				//console.log(checkbox);
				//console.log(checkbox.attr('checked'));
			},
			/* =======================
			   [NOT BEING USED] Running Click Event On Hospital Only Button
			   ==================== */
			onHospitalOnlyClick: function(){
				var instance = this;
				var checkbox = $('#hospital-only');
				// console.log( "onHospitalOnlyClick run passing through is checked: " + checkbox.is(':checked') );
				instance.hospitalOnlyToggle(checkbox.is(':checked'));
			},	
			/* =======================
			   Toggle Hospital-Only ON/OFF
			   ==================== */
			hospitalOnlyToggle: function(on){ // receives true or false
				// Pass true to turn hospital-only ON
				// Pass false to turn hospital-only OFF
				var instance = this;
				
				$('div.banner').toggle(!on);
				
				var $notesExtra = $(".quote #quote-animation .notes .normal-cover-includes ");
				// console.log("hospitalOnlyToggle started, passed in: " + on);
			
				// Turn Hospital On / Off
				if(on) {
					instance.quotetype.cover = 'hospital-only';
					instance.quotetype.productType = 0;
					
					$('#quote-options, .cover-type-options .hospital-switch-checkbox, #quote').addClass('hospital-only');
					$('#hospital-only-label,.cover-type-options .hospital-switch-checkbox').text('I want hospital & extras');
					$('#hospital-only').attr('checked', true);
					
					$notesExtra.hide();
					
				}
				else {
					instance.quotetype.cover = 'normal';
					$('#quote-options,  #quote').removeClass('hospital-only');
					$('#hospital-only-label, .cover-type-options .hospital-switch-checkbox').text('I want hospital only');
					$('#hospital-only').attr('checked', false);
					
					$notesExtra.show();
					/* TODO */
					value = false; // fallback ( new )
					switch(instance.quotetype.product) {
						case 'basic': var value = 65; break;
						case 'middle': var value = 75; break;
						case 'high': var value = 85; break;
					}
					// fallback catch to stop error ( new )
					if( value && !instance.quotetype.productType ){ 
						instance.quotetype.productType = value;
					}
					
				}
			},
			/* =======================
			   Placeholder buttons to call the Hospital only Toggle
			   ==================== */
			hospitalOnlyPlaceholderToggle: function(){
				var instance = this;
				
				// if hospital-only is checked, then switch cover
				if( $('#hospital-only').is(":checked") ) {
					instance.hospitalOnlyToggle(false);
				} else {
					// else turn hospital only ON
					instance.hospitalOnlyToggle(true);
				}
				
				// trigger the changes 
				instance.updateForm();
				instance.updateQuote();
				instance.quoteAnimationRun();
				instance.helpMeChooseReset();
				
				$('body,html').animate({
					scrollTop: 0
				}, 800);
			
				return false;
			},
			updateQuote: function() {
				var instance = this;
				var quotetype = instance.quotetype;
				var productData = health.ProductData;
				
				// Get product details
				//console.log("UpdateQuote:");
				//console.log( instance.quotetype);
				var product = productData.getProduct(instance.quotetype);
				var extras = productData.getProductExtras(instance.quotetype);
				
				// Update quote display elements
				switch(quotetype.cover) {
					case 'normal':
						$('#we-pay .data').html(quotetype.productType);
						$('#you-pay .data').html(100 - quotetype.productType);
						$('#information .banner .quote-extras-data').html(extras);
						$('#information .banner .quote-extras-price-data').html(product.extrasValue);
						$('#information .banner h4').html(product.name);
						$('#quote-type').html(product.name);
						break;
					case 'hospital-only':
						$('#we-pay .data').html(quotetype.productType);
						$('#you-pay .data').html(100 - quotetype.productType);						
						$('#information .banner .quote-excess-data').html(quotetype.excess);
						$('#information .banner .quote-extras-price-data').html(product.extrasValue);
						$('#information .banner h4').html(product.name);
						break;
				}
				
				// Show weekly or monthly prices
				//console.log( "update interval " +  quotetype.period );
				if( quotetype.period == 'weekly'){
					// Get correct rebate cost
					var rebatePrice =  instance.getRebatePrice(product.price);
					$("#quote-price span.interval").text('per wk');  
					$('#quote-price .data').html(rebatePrice);
					
				} else if( quotetype.period == 'monthly' ){
					// Get correct rebate cost
					 var rebatePrice =  instance.getRebatePrice(product.monthlyPrice);
					$("#quote-price span.interval").text('per mth');  
					$('#quote-price .data').html(rebatePrice);
				}
				
				
				// Hide excess label if required
				if (instance.quotetype.product == "high") {
					$('.quote #content-area #excess span.tooltip').addClass('hide');
				}
				else {
					$('.quote #content-area #excess span.tooltip').removeClass('hide');
				}

				// Update banner to show the product
				$('.quote #quote-animation .banner span.subtext span').text(quotetype.product);
				
				// Build comparison table
				var comptable = $('#quote-compare');
				comptable.empty();
				if(product.compare){
					comptable.css('display', 'block');
					$(product.compare).each(function(){
						$('<tr><td class="name">'+this.name+'</td><td class="price">'+this.price+'</td></tr>').appendTo(comptable);
					});
				}
				else {
					comptable.css('display', 'none');
				}
				
				// Show details pane
				$('#quote-details .details').css('display', 'none');
				$('#quote-details .details'+'.'+quotetype.cover+'-'+quotetype.product+'-'+quotetype.productType).css('display', 'block');			

				// Set the hidden fields the are used for the form submit to HAMBS			
				$("#cover").val(quotetype.cover);
				$("#product").val(quotetype.product);
				$("#productType").val(quotetype.productType);
				$("#excessid").val(quotetype.excess);
				
				instance.quoteAnimationRun();
				productData.setQuery(quotetype);
				
				
				//Set The Color Mode Theme
				var main = $('.quote #main');
				//console.log(" Should change colour now, to:  "  + instance.quotetype.product );
				switch(instance.quotetype.product) {
					case 'basic': main.removeClass('heartplus-theme middle-theme high-theme').addClass('basic-theme'); break;
					case 'heartplus': main.removeClass('basic-theme middle-theme high-theme').addClass('heartplus-theme'); break;
					case 'middle': main.removeClass('basic-theme heartplus-theme high-theme').addClass('middle-theme'); break;
					case 'high': main.removeClass('basic-theme heartplus-theme middle-theme').addClass('high-theme'); break;
				}	
						
				// if the last action on the helpmechoose element was to show, don't hide, else do
				//console.log( $('#help-me-choose').data('preventHide')  );
				var tmp = $('#help-me-choose').data('preventHide');
				if( $('#help-me-choose').data('preventHide') == true ){
					$('#help-me-choose').data('preventHide',false);
					} else {
					instance.helpMeChooseReset(); 
				}
			},

			/* =======================
			   Apply Correct Classes For The Map Dropdown
			   ==================== */				
			stateSelectInit : function(event) {
				var instance = this;
				var select = $('.quote #state select');
				/*
				var value = select.find('option:selected').attr('class');			
				$('.quote #content-area div.select-menu').prepend('<div class="map '+value+'" />');
				*/
				instance.stateSelectUpdate();
				select.change(function(){
					instance.stateSelectUpdate();
				});
			},
			
			stateSelectUpdate: function(){
				var instance = this;
				
				var selected = $('.quote #state select option:selected');
				instance.quotetype.state = selected.val();
				/*
				selected.parents('.select-menu').find('span').html(selected.html());
				$('.quote #content-area div.select-menu div.map').removeClass().addClass('map '+selected.attr('class'));
				*/
				instance.updateForm();
				instance.updateQuote();
			},
			
			/* =======================
			   Create The Quote Slider
			   ==================== */
			createQuoteSlider : function(coverTypeChanged) {
				var instance = this;
				var quotetype = instance.quotetype;
				var products = instance.allproducts[quotetype.cover];
				var productscount = products.length;
				var productData = health.ProductData;
				
				//$('.quote #quote .slider').on("slide", this, $.proxy(instance.runSliderElem, instance));
				
				// Build slider titles
				var titlewrap = $('#quote-slider-titles');
				titlewrap.empty().attr('class', '').addClass('columns-' + productscount);
				var titles = products;
				$(titles).each(function(){
					titlewrap.append('<div class="title ' + this + '"><span>' + (this == 'heartplus' ? 'heartPlus' : this) + '</span><span class="blocker"></span></div>');
				});
				titlewrap.find('.title:first-child').addClass('first');
				titlewrap.find('.title:last-child').addClass('last');
				
				// Set number of options
				switch(quotetype.cover) {
					case 'normal':
						var min = 1;
						var max = productscount * 3;
						instance.max = max;
						break;
					case 'hospital-only':
						var min = 1;
						var max = productscount;
						instance.max = max;
						break;
				}
				instance.min = min;
				
				// Products not available for Hospital-only
				if(quotetype.cover == 'hospital-only') {
					if(quotetype.product == 'heartplus') {
						instance.quotetype.product = 'basic';
					}
				}
								
				// Disabled options
				$('#quote-slider-titles .title.disabled').removeClass('disabled');
				switch(quotetype.material) {
					case 'family':
					case 'single-parent':
						$('#quote-slider-titles .title.basic').addClass('disabled');
						// Update slider if unavailable product is selected
						if(quotetype.product == 'basic') {
							switch(quotetype.cover) {
								case 'normal':
									instance.quotetype.product = 'heartplus';
									break;
								case 'hospital-only':
									instance.quotetype.product = 'middle';
									break;
							}
						}
						break;
				}
				
				// Reload the quote to get updated values
				var quotetype = instance.quotetype;
				
				// Calculate slider offset
				var value = 0;
				switch(parseInt(quotetype.productType)) {
					case 65: value+= 1; break;
					case 75: value+= 2; break;
					case 85: value+= 3; break;
				}
				switch(quotetype.cover) {
					case 'normal':
						switch(quotetype.product) {
							case 'low':    value+= 0; break;
							case 'heartplus': value+= 3; break;
							case 'middle': value+= 6; break;
							case 'high':   value+= 9; break;
						}
						break;
					case 'hospital-only':
						switch(quotetype.product) {
							case 'low':    value+= 1; break;
							case 'middle': value+= 2; break;
							case 'high':   value+= 3; break;
						}
						break;
				}

				// Build the slider UI
				instance.sliderElem = $('.quote #quote .slider');
				instance.sliderElem.slider({
					min:  min,
					max:  max,
					step: 1,
					create: function() {
					},					
					slide: function(event, ui) {
						var sliderValue = (typeof ui != "undefined" ? ui.value : instance.sliderElem.slider("value"));
						switch(quotetype.material) {
							case 'family':
							case 'single-parent':
								switch(quotetype.cover) {
									case 'normal':
										if(sliderValue <= 3) return false;
										break;
									case 'hospital-only':
										if(sliderValue <= 1) return false;
										break;
								}
								break;
						}
						switch(quotetype.cover) {
							case 'normal':
								if     (sliderValue >= 1 && sliderValue <= 3) instance.quotetype.product = 'basic'; 
								else if(sliderValue >= 4 && sliderValue <= 6) instance.quotetype.product = 'heartplus';
								else if(sliderValue >= 7 && sliderValue <= 9) instance.quotetype.product = 'middle';
								else if(sliderValue >= 10 && sliderValue <= 12) instance.quotetype.product = 'high';
								if     (sliderValue == 1 || sliderValue == 4 || sliderValue == 7 || sliderValue == 10) instance.quotetype.productType = 65;
								else if(sliderValue == 2 || sliderValue == 5 || sliderValue == 8 || sliderValue == 11) instance.quotetype.productType = 75;
								else if(sliderValue == 3 || sliderValue == 6 || sliderValue == 9 || sliderValue == 12) instance.quotetype.productType = 85;
								
								// Store the word value of the cover
								instance.sliderElem.data('covertype',instance.quotetype.product);
								
								break;								
							case 'hospital-only':
								switch(sliderValue) {
									case 1: instance.quotetype.product = 'basic'; break;
									case 2: instance.quotetype.product = 'middle'; break;
									case 3: instance.quotetype.product = 'high'; break;
								}
								instance.quotetype.productType = 0;
								break;
						}
						
						instance.createHospitalCoverSlider();
						instance.updateQuote();
						
					}
				});	
					
				// Set the slider UI offset 
				$('.quote #quote .slider').slider('value', value);
			},

			sliderMoreCover : function() {
				var instance = this;
				var sliderPos = instance.sliderElem.slider("value");
				instance.sliderElem.slider("value", (sliderPos < instance.max ? sliderPos + 1 : instance.max));
				instance.sliderElem.slider('option', 'slide').call();
				instance.updateQuote();
			},
				
			upgradeCover : function(event) {
				var instance = this;
				
				var upgrade_clicked = event.target;
				var col_pos = $(upgrade_clicked).closest('td').index();
				var row_pos = $(upgrade_clicked).closest('tr').index();
				var wrapper = $(upgrade_clicked).closest('div.details');
				
				while(1) {
				    if (wrapper.hasClass('hospital-only')) {
				        var wrapper_next = $(wrapper).next('.hospital-only');
				    } else {
				        var wrapper_next = $(wrapper).next('.details').not('.hospital-only');
				    }
				    
				    // kill the loop if theres no next matching wrapper
				    if (wrapper_next.length == 0) {
				        break;
				    }
				    
				    wrapper = wrapper_next;
				    if (wrapper.find('.quote-table tr').eq(row_pos).find('td').eq(col_pos).text().trim().length == 0) {
				        break;
				    }
				}
				
				if (wrapper.hasClass('hospital-only')) {
				    var new_position = $('#quote-details').children('.hospital-only').index(wrapper) + 1;
				} else {
				    var new_position = $('#quote-details').children('.details').not('.hospital-only').index(wrapper) + 1;
				}
				
				instance.sliderElem.slider("value", new_position);
				instance.sliderElem.slider('option', 'slide').call();
				instance.updateQuote();
				return false;
			},

			sliderLessCover : function() {
				var instance = this;
				var sliderPos = instance.sliderElem.slider("value");
				switch(instance.quotetype.material) {
					case 'family':
					case 'single-parent':
						switch(instance.quotetype.cover) {
							case 'normal':
								if(sliderPos <= 4) return false;
								break;
							case 'hospital-only':
								if(sliderPos <= 2) return false;
								break;
						}
						break;
				}
				instance.sliderElem.slider("value", (sliderPos > instance.min ? sliderPos - 1 : instance.min));
				instance.sliderElem.slider('option', 'slide').call();
				instance.updateQuote();
			},
			
			/* =======================
			   Create The Excess Slider
			   ==================== */				
			createHospitalCoverSlider : function() {
				var instance = this;			
				var quotetype = instance.quotetype;
				var productData = health.ProductData;
				var excesses = productData.getProductExcesses(instance.quotetype);				
				var value = parseInt(quotetype.excess);
				if($.inArray(value, excesses) < 0) {
					value = 250;
				}
				$('.quote #excess .slider').slider({
					min: 0,
					max: 500,
					step: 250,
					create: function() {
						instance.excess = 250;
					},
					slide: function(event, ui) {	
						var excesses = productData.getProductExcesses(instance.quotetype);
						if($.inArray(ui.value, excesses) < 0) {
							return false;
						}
						instance.quotetype.excess = ui.value;
						instance.updateQuote();
					}
				});
				$('.quote #excess .slider').slider('value', value);		
				// Disabled items
				if($.inArray(0, excesses) < 0) {	
					$('#excess .excess-0').addClass('disabled');
					// Update quote if disabled value is selected
					if(instance.quotetype.excess == 0) {
						instance.quotetype.excess = excesses.shift();
						$('.quote #excess .slider').slider('value', instance.quotetype.excess);
					}
				}
				else {
					$('#excess .excess-0').removeClass('disabled');
				}
			},
			
			/* =======================
			   Run The Quote Animation
			   ==================== */	
			quoteAnimationInit: function(){
				var instance = this;
				/*
				$('#animation-elements .image-wrap').each(function(){
					$(this).data({
						top: $(this).css('top'),
						left: $(this).css('left')
					});
				});
				*/
				instance.quoteAnimationRun();
			},
			
			quoteAnimationRun : function() {
				var instance = this;
				var quotetype = instance.quotetype;
				var duration = 1000;
				var images = $('#animation-elements .image-wrap');
				var imageLoadedPromises = new Array();
				$("img", images).each(function() {
					imageLoadedPromises.push($(this).load);
				});
								
				// Check if CSS transitions work, if so just add / remove shown classes
				//if ($("body").hasClass("csstransitions")) {
				if (Modernizr.csstransitions) {
					var shownImages = $('#animation-elements .image-wrap.' + quotetype.product).add("#animation-elements .customer." + quotetype.material);
					images.not(shownImages).removeClass("shown");
					// Add the product class to the animation (this moves things around)
					$("#quote-animation").removeClass("basic").removeClass("heartplus").removeClass("middle").removeClass("high").addClass(quotetype.product);
					// Add the material class to the animation (this also moves things around)
					$("#quote-animation").removeClass("single").removeClass("single-parent").removeClass("couple").removeClass("family").addClass(quotetype.material);
					shownImages.addClass("shown");
				} else {
					// **** MIMIC THE CSS3 Transition functionality ****
					// Only run if the material or product type has changed (makes it run better when slider is firing events)
					if (!$("#quote-animation").hasClass(quotetype.product) || !$("#quote-animation").hasClass(quotetype.material)) {
						// Store the current position of all the images
						images.each(function() {
							$(this).add($("img", this)).each(function() {
								var image = $(this);
								// Store the original inline styles
								if (typeof image.data("originalInlineStyles") == "undefined") {
									image.data("originalInlineStyles", (typeof image.attr("style") != "undefined" ? image.attr("style") : ""));						
								}
								// Stop the current animation
								image.stop(true, false);
								// Store the current position of the image
								image.data({
									top: image.css('top'),
									left: image.css('left'),
									width: image.width(),
									height: image.height(),
									opacity: image.css('opacity')
								});
							})
						});
						// Add the product class to the animation (this moves things around)
						$("#quote-animation").removeClass("basic").removeClass("heartplus").removeClass("middle").removeClass("high").addClass(quotetype.product);
						// Add the material class to the animation (this also moves things around)
						$("#quote-animation").removeClass("single").removeClass("single-parent").removeClass("couple").removeClass("family").addClass(quotetype.material);
						// Animate the images to their new positions
						images.each(function() {
							$(this).add($("img", this)).each(function() {
								var image = $(this);
								// Remove the inline CSS (i.e. reset to the base state)
								image.attr("style", image.data("originalInlineStyles"));
								// Check if this is a customer image
								if (image.hasClass("customer")) {
									// Add / remove the shown class (this moves the image)
									if (image.hasClass(quotetype.material)) {
										image.addClass("shown");
									} else {
										image.removeClass("shown");					
									}
								} else {
									// Add / remove the shown class (this moves the image)
									if (image.hasClass(quotetype.product)) {
										image.addClass("shown");
									} else {
										image.removeClass("shown");					
									}
								}
								// Store the new position
								var newPos = {
									top: (image.css("top") == "auto" ? 0 : image.css("top")),
									left: (image.css("left") == "auto" ? 0 : image.css("left")),
									width: image.width(),
									height: image.height(),
									opacity: image.css('opacity')
								};
								// Reset to the position when the animation stopped
								image.css({
									top: image.data('top'),
									left: image.data('left'),
									width: image.data('width'),
									height: image.data('height'),
									opacity: image.data('opacity')
								});
								// Animate to the new position
								image.animate({
									top: newPos.top,
									left: newPos.left,
									width: newPos.width,
									height: newPos.height,
									opacity: newPos.opacity
								}, duration);
							});
						});
					}
				}
			}	
		},
		
	/* ============================================
	   Login Template Methods
	   ========================================== */
		MemberLogin: {
			init: function(loginSuccessUrl){
				var instance = this;
				instance.updateForm(loginSuccessUrl);
				//instance.positionForm();
				//$(window).resize(function(){ instance.positionForm() });
			},
			updateForm: function(loginSuccessUrl) {				
				// Change the redirect page to the homepage
				var $form = $("form");
				var action = $form.attr("action");
				if (action.indexOf("returnurl=") == -1) {
					action = action + (action.indexOf("?") == -1 ? "?" : "&") + "returnurl="
				} else {
					action = action.replace(/returnurl=.*$/i, "returnurl=");
				}
				$form.attr("action", action + loginSuccessUrl);
				// Bind the click event on the register link
				$("#intro .register").attr("href", $("#dnn_ctr706_Login_Login_HAMBS_uxRegistrationButton").attr("href"));
			},
			positionForm: function(){
				var form = $('#login-form');
				var x = $(window).width() / 2;
				x-= form.outerWidth() / 2;
				var y = $(window).height() / 2;
				y-= form.outerHeight() / 2;
				y-= $('#footer-wrap').outerHeight() / 2;
				form.css({
					left: x,
					top: y
				});
			}
		},
			
	/* ============================================
	   OMS Script Methods
	   ========================================== */
		OMS : {
			/* =======================
			   Init
			   ==================== */			
			init : function() {
				var instance = this;
				instance.runRefreshLoops();
				//$('#sidebar .oms-accordion > li a')("click", this, this.sidebarDropDown);
			},
			/* =======================
			   Create Dropdown Sidebar Menu For OMS
			   ==================== */			
			sidebarDropDown : function() {
				if ($(this).parent().parent().children('ul').length == 0) {
					return true;
				}
				if (!$(this).parent().hasClass('active')) {
					$('.oms-sidebar ul li.active').parent().children('ul').slideToggle();
					$('.oms-sidebar ul li').removeClass('active');
					$(this).parent().parent().children('ul').slideToggle();
					$(this).parent().addClass('active');
					return false;
				}
			},
			/* =======================
			   Start The Loops To Catch HAMS Ajax Data And Restyle
			   ==================== */					
			runRefreshLoops : function() {
				var global = health.Global;

				setInterval(function(){
					global.restyleDropdown();
					global.restyleRadioBox();
					global.restyleCheckbox();
					global.restyleTextinput();
					global.addArrowsStylesInput();

					// Newish
					global.wrapFormSubmitButtons();	
					global.formFocusStyle();	
					global.moveFormErrors();
					global.fixWizardStepStyles();
					
					global.highlightInvalidInputs();
					global.fixQABoxes();
					
					
				}, 250);
				
				/*setInterval(function(){		
					var formWatcher = $('#__LASTFOCUS').attr('form-watcher');
					if (typeof formWatcher !== 'undefined' && attr !== false) {
					
						global.restyleDropdown();
						global.restyleRadioBox();
						global.restyleCheckbox();
						global.restyleTextinput();
						global.addArrowsStylesInput();

						// Newish
						global.wrapFormSubmitButtons();	
						global.formFocusStyle();	
						global.moveFormErrors();
						global.fixWizardStepStyles();

						$('#__LASTFOCUS').attr('form-watcher', 'set');					
						
					}
				}, 300);*/				
				
			}
		},			
				
	/* ============================================
	   Landing Template Methods
	   ========================================== */
		Landing : {
			/* =======================
			   Init
			   ==================== */			
			init : function() {
				var instance = this;
				instance.imageBackgroundSetup();
				instance.autoScrollInterval = setInterval(function(){
					instance.imageBackgroundScrollAuto();
				}, 20000);
				this.homeTheme('orange');
				instance.counter = 0;
				instance.isAnimating = false;
				$('#landing-slider-controls ul li').on("click", this, $.proxy(instance.imageBackgroundButtonClick, instance));
				$('.scrolldown-arrow .button').on("click", this, this.landingScrollDown);
				$('#landing-slider .call-to-action .button.pink').on("click", this, this.onCallToActionClick);
				
				$('div.landing-slider-tagline a.button').on("click", this, this.promoButtonClick);

				$('#landing-slider-sales-funnel select[name="state"]').on("change", this, this.onStateChange);
				
				$('#family-plans').click(function(e) {
					$("#rdFamily").parents(".button").click();
					$('#dnn_btnGetQuote').click();
					e.preventDefault();
				});

				// Pre-select state based on cookie
				this.checkSelectedStateCookie();

			},

			/* =======================
			   Check Cookie
			   ==================== */
			checkSelectedStateCookie : function(event) {
				var instance = this;
				
				// Check cookie with cookie plugin
				if( $.cookie("user_state_js") ){

					$select = $('#landing-slider-sales-funnel select[name="state"]');
					$select.find('option').removeAttr('selected');
					$select.find('option[value="' + $.cookie('user_state_js') + '"]').prop('selected', true);

					// Run change so the custom dropdown updates
					$select.change();
				}
			},	

			/* =======================
			   Set Cookie for state
			   ==================== */
			onStateChange : function(event) {
				var instance = this;

				// Set cookie with jQuery cookie plugin
				$.cookie('user_state_js', $(this).find('option:selected').val(), { expires: 100, path: '/' });
			},	

			/* =======================
			   Call To Action Click
			   ==================== */
			onCallToActionClick : function(event) {
				var instance = this;	
				if ($(this).attr('href') == "" || $(this).attr('href') == '/') {
					
					$('html, body').animate({scrollTop: $("#main").offset().top}, 500);
					event.preventDefault();
				}
			},			
			/* =======================
			   Image Background Auto Scroll
			   ==================== */
			imageBackgroundScrollAuto : function() {
				var instance = this;	
				$.proxy($('#image-slider div.slide-image').each(function() {
					if ($(this).hasClass('active')) {
						instance.active = $(this);
						instance.next = $(this).next(".slide-image");
						if (instance.next.length == 0) {
							instance.next = $('#image-slider div.slide-image').first();
						}
						var offset = instance.next.width();
						instance.next.css({ "left" : offset });
						instance.next.animate({ "left" : 0 }, { "duration": 1500, "easing": "swing" });
						instance.active.animate({ "left" : -offset  }, { "duration": 1500, "easing": "swing" });
						instance.active.css({ "left" : 0 });
					}
					else {
						var imageWidth = $(this).width();
						$(this).css({ "left" : imageWidth });
					}
				}), instance);
				instance.next.addClass('active');
				instance.active.removeClass('active');
				var sliderIndex = $('#image-slider div.slide-image').index(instance.next);
				sliderIndex++;
				$('#landing-slider-controls ul li.active').removeClass('active').css({
					"backgroundPosition" : ""
				});
				var activeControl = $('#landing-slider-controls ul li:nth-child('+sliderIndex+')');
				activeControl.addClass('active');
				var position = activeControl.position();
				var heartRotate = $('.heart-rotate');
				heartRotate.css({
					"left" : position.left-2
				});
				instance.imageBackgroundMoveText(instance.next);

				//this.homeTheme(instance.next.find('img').data('theme'));			
			},	
			/* =======================
			   Image Background Move Text
			   ==================== */
			imageBackgroundMoveText : function(index) {
				var textIndex = $('#image-slider div.slide-image.active').index();
				var controlWidth = $('#landing-slider-controls').outerWidth();
				var activeText = $('#landing-slider-controls #landing-slider-text p.current');
				var nextText = $('#landing-slider-controls #landing-slider-text p:nth-child('+textIndex+')').next();				
				// ~Sam - Rolls through each tagline info div, doesn't order to images at all, just next, next next..
				var allPromo  = $('.landing-slider-tagline'); // ~Sam				
				var activePromo = $('.landing-slider-tagline.active');
				var nextPromo = activePromo.next();
				
				if (nextText.length == 0) {
					nextText = $('#landing-slider-controls #landing-slider-text p').first();
				}
				if (nextPromo.length == 0) {
					allPromo.removeClass('active');
					nextPromo = $('.landing-slider-tagline').first().addClass('active');
				}
				activeText.delay(400).animate({
					"left" : controlWidth,
					"opacity" : 0
				}, 1500).removeClass('current');
				nextText.addClass('current').css({
					"left" : controlWidth,
					"opacity" : 0
				}).delay(400).animate({
					"left" : 0,
					"opacity" : 1
				}, 1500);
				activePromo.animate({
					"opacity" : 0
				}, 750, function() {
					$(this).hide();
					allPromo.removeClass('active');
					nextPromo.addClass('active');
					nextPromo.css({
						"opacity" : 0
					}).show().animate({
						"opacity" : 1
					}, 750);
					health.Landing.homeTheme($('#image-slider .slide-image').eq(nextPromo.index()).find('img').data('theme'));
				});
				
				/* ORIGINAL::::
				if (nextText.length == 0) {
					nextText = $('#landing-slider-controls #landing-slider-text p').first();
				}
				if (nextPromo.length == 0) {
					nextPromo = $('.landing-slider-tagline').first();
				}
				activeText.delay(400).animate({
					"left" : controlWidth,
					"opacity" : 0
				}, 1500).removeClass('current');
				nextText.css({
					"left" : controlWidth,
					"opacity" : 0
				});
				nextText.delay(400).animate({
					"left" : 0,
					"opacity" : 1
				}, 1500).addClass('current');
				activePromo.animate({
					"opacity" : 0
				}, 750, function() {
					$(this).hide();
					nextPromo.css({
						"opacity" : 0
					}).show().animate({
						"opacity" : 1
					}, 750);
				});
				*/
			},
			/* =======================
			   Image Background Setup
			   ==================== */	
			imageBackgroundSetup : function() {
				var instance = this;
				$('#image-slider div.slide-image').each(function() {
					var landingSlider = $('#landing-slider-controls ul');
					var node = "<li />";
					landingSlider.append(node);
				});
				var landingSliderFirstControl = $('#landing-slider-controls ul li:first');
				landingSliderFirstControl.addClass('active');
				var landingSliderFirstText = $('#landing-slider-text p:first');
				landingSliderFirstText.addClass('current');
				var activePromo = $('.landing-slider-tagline').first();
				activePromo.addClass('active');		   
			},
			/* =======================
			   Image Background Button Click
			   ==================== */
			imageBackgroundButtonClick : function(event) {
				var instance = this;
				if (instance.isAnimating == false) {
					var event = $(event.target);
					var controlIndex = $('#landing-slider-controls ul li').index(event);
					var clicked = $('#image-slider div.slide-image:nth-child('+controlIndex+')');
					instance.active = $('#image-slider .active, #landing-slider-controls .active');
					event.addClass('active');
					clearInterval(instance.autoScrollInterval);
					instance.autoScrollInterval = setInterval(function(){
						instance.imageBackgroundScrollAuto();
					}, 20000);
					instance.clicked = clicked;
					instance.next = instance.clicked.next();
					if (instance.next.length == 0) {
						instance.next = $('#image-slider div.slide-image').first();
					}
					instance.next.addClass('active');
					instance.active.removeClass('active');
					
					var offset = instance.next.width();
					instance.next.css({ "left" : offset });
					instance.isAnimating = true;
					instance.next.animate({ "left" : 0 }, 1500);
					instance.active.animate({ "left" : -offset  }, 1500, function() {
						instance.isAnimating = false;
					});
					instance.active.css({ "left" : 0 });
					instance.imageBackgroundMoveText(instance.next);
					
					//this.homeTheme(instance.next.find('img').data('theme'));
				}
			},
			/* ==============================
			     Change homepage theme colour
			   ============================== */
			homeTheme: function(colour) {
                var classes = $('body').attr('class').split(' ');
                for (bodyclass in classes) {
                    if ((/^theme-.*/).test(classes[bodyclass])) {
                        $('body').removeClass(classes[bodyclass]);
                    }
                }
                $('body').addClass('theme-' + colour);
			},
			/* =======================
				Landing Scroll Down To
			==================== */
			landingScrollDown : function(event) {			   
				$('html, body').animate({scrollTop: $("#main").offset().top}, 500);
				return false;
			},	
			/* =======================
				Promo Button click
			==================== */
			promoButtonClick : function(event) {			   
				if( $(this).attr('href') == "" || $(this).attr('href') == "#" ){
					// Slide down
					$('html, body').animate({scrollTop: $("#main").offset().top}, 500);
					return false;
				}
			}
			
		}
			
	};
	
	health.Comparison = {
	
		// Default quote values
		quotetype: {
			material: 'single',
			state: 'vic',
			cover: 'normal',
			product: 'basic',
			productType: 65,
			excess: 500,
			period: 'weekly'
		},	
		
		// All available products
		allproducts: {
			'normal': ['basic', 'heartplus', 'middle', 'high'],
			'hospital-only': ['basic', 'middle', 'high']
		},	
		init: function(){
			var instance = this;
			var productData = health.ProductData;
			var query = productData.parseQuery();
			for(var key in query) {
				if(typeof(instance.quotetype[key] != 'undefined')) {
					instance.quotetype[key] = query[key];
				}
			}
			instance.setPeriodExcessCheckboxs();					
			//$('input#hospital-only').prop('checked', false);
			$('#state option.' + instance.quotetype.state).attr('selected', true);
			var quoteInstance = health.Quote;
			quoteInstance.buttonsInit(instance.quotetype.material);
			instance.stateSelectInit();
			instance.updateComparisonInit();
			instance.productToggleInit();
			instance.extrasInit();
			instance.resizeItems();
			instance.resizeWrappers();
			instance.update();
			$(window).load(function(){ instance.resizeExtrasColumns() });
			instance.onExcessButtonClick();
			instance.onMaterialformButtonClick();
			$('input[name="excess"]').on("click", this, $.proxy(instance.onExcessButtonClick, instance));
			$('#material-form .button').on("click", this, $.proxy(instance.onMaterialformButtonClick, instance));
			$('input[name="period"]').on("click", this, $.proxy(instance.onPeriodButtonClick, instance));		
			$('#hospital-only').on("click", this, $.proxy(instance.hospitalOnlyToggle, instance));
			$('.test').on("click", this, $.proxy(instance.updateInputsAndRedirect, instance));
			$('#comparison .product.hospital-only .item div.cost a.button-action').on("click", this, $.proxy(instance.displayHospPrompt, instance));
			$('.comparison-callout .call-to-action .yes').on("click", this, $.proxy(instance.updateInputsAndRedirect, instance));
			$('.comparison-callout .no').on("click", this, $.proxy(instance.hideHospPrompt, instance));
			$('#comparison .product.normal .item div.cost a.button-action').on("click", this, $.proxy(instance.onQuoteMeClickNormal, instance));
		},
		
		// Set the period and excess checkboxs
		setPeriodExcessCheckboxs: function() {
			var instance = this;
			var period = $('input[name="period"]:checked');
			period.siblings('span').removeClass('checked').attr('checked', false);
			var setPeriod = $('#period-'+instance.quotetype.period);
			setPeriod.attr('checked', 'checked').siblings('span').addClass('checked');		
			var excess = $('input[name="excess"]:checked');
			excess.siblings('span').removeClass('checked').attr('checked', false);						
			var setExcess = $('#excess-'+instance.quotetype.excess);
			setExcess.attr('checked', 'checked').siblings('span').addClass('checked');
		},
		
		// Check if the hospital only check box is checked
		checkHospitalOnly: function() {
			var instance = this;		
			var checkbox = $('#hospital-only');
			var checkedVal = checkbox.val();
			if(checkedVal == 'hospital-only') {
				$('#quote-options, #quote').addClass('hospital-only');
				// checkbox-hospital-switch
			}
			if(checkbox.is(':checked')) {
				instance.quotetype.cover = 'hospital-only';
				$('#hospital-only-label').text('I want hospital only');
			}
			else {
				instance.quotetype.cover = 'normal';
				$('.comparison .hostpital-only-cover .hospital-only.comparison-callout').hide();
				$('#hospital-only-label').text('I want hospital & extras');
			}
			//checkbox.siblings('span').removeClass('checked');
		},
		
		// Update the values and the hash string
		update: function() {
			var instance = this;
			var quotetype = instance.quotetype;
			var productData = health.ProductData;
			var data = {
				state:    quotetype.state,
				material: quotetype.material,
				period:   quotetype.period,
				excess:   quotetype.excess 
			};
			instance.checkHospitalOnly();
			if(quotetype.cover == 'hospital-only') {
				quotetype.productType = '0';
			}
			instance.lowestPrices = productData.getLowestPrices(quotetype);
			$.each(instance.lowestPrices, function(key, value) {
				var current = $('.cost p span.cost', this.className);
				current.html('$'+this.price);
				$(this.className).data('productInformation', { product: this.productInformation.product, productType: this.productInformation.productType });
			});			
			window.location.hash = '#' + $.param(data);
		},
		
		// Create product inputs when the quote button is clicked and redirect to quote funnel
		updateInputsAndRedirect: function(event){
			var instance = this;
			var quotetype = instance.quotetype;
			instance.update();
			quotetype.product = instance.quoteButtonClicked.data('productInformation').product;
			quotetype.productType = instance.quoteButtonClicked.data('productInformation').productType;
			// Get the current quote funnel link and assign append parameters
			var quoteFunnel = $('#nav li.quote a').attr('href') + '#' + $.param(quotetype);
			window.location = quoteFunnel;
		},
		
		// Click event for normal product quote me button and send analytics request
		onQuoteMeClickNormal: function(event){
			var instance = this;
			var quotetype = instance.quotetype;
			event.preventDefault();
			var event = $(event.target);
			if (instance.quotetype.cover == 'hospital-only') { instance.quoteButtonClicked = event.parent().parent().parent().parent(); }
			else { instance.quoteButtonClicked = event.parent().parent(); }
			
			//Analytics Request
			var data = event.parent().find('span').text();
			data = data.replace(/\$/g, '');
			data = parseInt(data);
			_gaq.push(['_trackEvent', 'Product Compare Submit', 'Basic, Medium or High', 'Buy Now', data ]);		
			var dataTwo = quotetype.material + " " + instance.quoteButtonClicked.data('productInformation').product + " " + instance.quoteButtonClicked.data('productInformation').productType + " " + quotetype.period + " " + quotetype.excess;
			_gaq.push(['_trackEvent', 'Product Compare Submit', 'Submit Conditions', dataTwo]);			
			
			instance.updateInputsAndRedirect();
		},
		
		// Create product inputs when the quote button is clicked and redirect to quote funnel
		setButtonClicked: function(){
			var instance = this;
			var quotetype = instance.quotetype;
			instance.update();
			quotetype.product = instance.quoteButtonClicked.data('productInformation').product;
			quotetype.productType = instance.quoteButtonClicked.data('productInformation').productType;
			// Get the current quote funnel link and assign append parameters
			var quoteFunnel = $('#nav li.quote a').attr('href') + '#' + $.param(quotetype);
			window.location = quoteFunnel;
		},		
		
		// Display the quote prompt and position it correctly
		displayHospPrompt: function(event){
			var instance = this;
			var quotetype = instance.quotetype;
			event.preventDefault();
			var event = $(event.target);
			if (instance.quotetype.cover == 'hospital-only') { instance.quoteButtonClicked = event.parent().parent().parent().parent(); }
			else { instance.quoteButtonClicked = event.parent().parent(); }
			var hospPrompt = $('.comparison .hostpital-only-cover .hospital-only.comparison-callout');
			var buttonPosition = event.offset();
			hospPrompt.show().animate({ 'left' : buttonPosition.left });
			
			//Analytics Request
			var data = event.parent().find('span').text();
			data = data.replace(/\$/g, '');
			data = parseInt(data);
			_gaq.push(['_trackEvent', 'Product Compare Submit', 'Basic, Medium or High', 'Quote Me', data]);
			var dataTwo = quotetype.material + " " + quotetype.productType + " " + quotetype.period + " " + quotetype.excess;
			_gaq.push(['_trackEvent', 'Product Compare Submit', 'Submit Conditions', dataTwo]);
		},		

		// Display the quote prompt and position it correctly
		hideHospPrompt: function(event){
			var instance = this;
			var event = $(event.target);
			var hospPrompt = $('.comparison .hostpital-only-cover .hospital-only.comparison-callout');
			hospPrompt.hide();
			return false;
		},		
		
		// Hospital only toggle for product comparison pages
		hospitalOnlyToggle: function() {
			var instance = this;			
			instance.checkHospitalOnly();		
			$('.comparison #comparison').toggleClass('hostpital-only-cover');
			instance.resizeWrappers();
			instance.resizeItems();			
			instance.update();			
			$('body,html').animate({
				scrollTop: 0
			}, 800);
		},
		
		// Trigger url hash rewrite on options change
		updateComparisonInit: function(){
			var instance = this;
			var quotetype = instance.quotetype;			
			$('#state select').change(function(e){
				instance.quotetype.state = $('#state option:selected').val();
				instance.update();
			});	
		},
		
		// Update hidden input fields
		updateProductFields: function(){
			var instance = this;
			var quotetype = instance.quotetype;		
			$("#cover").val(quotetype.cover);
			$("#excessid").val(quotetype.excess);			
		},
		
		// Update values on period buton click
		onPeriodButtonClick: function(){
			var instance = this;
			var quotetype = instance.quotetype;
				quotetype.period = $('input[name="period"]:checked').val();
				instance.update();
				
				
				//Analytics Request
				var data = quotetype.material + " " + quotetype.period + " " + quotetype.excess;
				_gaq.push(['_trackEvent', 'Product Compare Interaction', 'Option Selection', data ]);
				
				$('.product .item div.cost p span.period').text(quotetype.period);
				//Done because of inconsistent html between hosp only and normal col containers
				var clone = $('.product .item div.cost p span').text();
				$('.product .item div.cost p').html('<span class="cost">'+clone+'</span>'+quotetype.period);
				$.each(instance.lowestPrices, function(key, value) {
					var price = this.price.replace(/\,/g, '');
					switch(quotetype.period) {
						case 'weekly':
							price = Math.round(price*1);
						break;
						case 'monthly':
							price = Math.round(price*52/12);
						break;
						case 'annually':
							price = Math.round(price*52);
						break;
					}										
					$('.cost p span.cost', this.className).html('$'+price);
				});
				
				instance.updateProductFields();
		},

		onExcessButtonClick: function(disableProducts){
			var instance = this;
			var quotetype = instance.quotetype;		
			//If excess 0 is seleced hide basic, heartplus and middle products
			quotetype.material = $('input[name="material"]:checked').val();
			quotetype.excess = $('input[name="excess"]:checked').val();

			
			//Analytics Request
			var data = quotetype.material + " " + quotetype.period + " " + quotetype.excess;
			_gaq.push(['_trackEvent', 'Product Compare Interaction', 'Option Selection', data ]);
			
			var disableProductsExcess = [$('.basic'), $('.heartplus'), $('.middle')];			
			switch(quotetype.excess) {
				case '0': instance.disableProducts(disableProductsExcess); break;
				default: disableProductsExcess[1].removeClass('disabled');
						 disableProductsExcess[2].removeClass('disabled');
			}
			if (quotetype.material == 'couple' || quotetype.material == 'single') {
				if (quotetype.excess == '0') {
					disableProductsExcess[0].addClass('disabled');
				}
				else {
					disableProductsExcess[0].removeClass('disabled');
				}
			}
			instance.onPeriodButtonClick();
			instance.updateProductFields();			
		},		

		onMaterialformButtonClick: function(disableProducts){
			var instance = this;
			var quotetype = instance.quotetype;
			// If family or single-parent are selected hide basic product
			quotetype.material = $('input[name="material"]:checked').val();
			quotetype.excess = $('input[name="excess"]:checked').val();

			//Analytics Request
			var data = quotetype.material + " " + quotetype.period + " " + quotetype.excess;
			_gaq.push(['_trackEvent', 'Product Compare Interaction', 'Option Selection', data ]);			
			
			var disableProductsMaterial = [$('.basic')];
			switch(quotetype.material) {
				case 'family': instance.disableProducts(disableProductsMaterial); break;
				case 'single-parent': instance.disableProducts(disableProductsMaterial); break;
				default: disableProductsMaterial[0].removeClass('disabled');
			}
			if (quotetype.material == 'couple' || quotetype.material == 'single') {
				if (quotetype.excess == '0') {
					disableProductsMaterial[0].addClass('disabled');
				}
			}
			instance.updateProductFields();
		},

		// Disable products when required
		disableProducts: function(disableProducts){
			var instance = this;
			$.each(disableProducts, function(key, elements) {
				$(elements).each(function () {
					var item = $(this);
					if (item.hasClass('hospital-only')) {
						item.addClass('disabled');
					}
					else {
						item.addClass('disabled');
						item.find('.item').addClass('closed');
					}
				});
			});
			instance.resizeWrappers();
		},

		// Extras lists
		extrasInit: function(){
			
			$('#comparison ul.extras li').wrapInner($('<span />'));
			$('#comparison ul.extras li span').each(function(){
				var span = $(this);
				var spanHeight = span.height();
				if( spanHeight > 20 ){
					span.addClass( 'double');
				} else if( spanHeight > 40 ) {
					span.addClass( 'triple');
				} else {
					span.addClass( 'single');
				}
				
			});
			
		},

		// State selector
		stateSelectInit : function(event) {
			var instance = this;
			var select = $('.quote #state select');
			var value = select.find('option:selected').attr('class');
			$('.quote #content-area div.select-menu').prepend('<div class="map '+value+'" />');
			instance.stateSelectUpdate();
			select.on('change', function(){
				instance.stateSelectUpdate();
			});
		},
		
		// State update		
		stateSelectUpdate: function(){
			var instance = this;
			var selected = $('.quote #state select option:selected');
			instance.quotetype.state = selected.val();
			selected.parents('.select-menu').find('span').html(selected.html());
			$('.quote #content-area div.select-menu div.map').removeClass().addClass('map '+selected.attr('class'));
			instance.update();
		},
		
		// Init toggle buttons
		productToggleInit: function(){
			var instance = this;
			$('#comparison a.toggle').click(function(e){
				e.preventDefault();
				if (!$(this).parents('.product').hasClass('disabled')) {
					$(this).parents('.item').toggleClass('closed');
					instance.resizeWrappers();
				}
			});
		},
	
		// Resize product wrappers
		resizeWrappers: function(){
			var instance = this;
			var total = 0;
			var products = 0;		
			$('#comparison .col:visible').each(function(){
				var col = $(this);
				width = 0;			
				// get margin right
				if (!isNaN(parseInt(col.css('margin-right')))) {
					 width+=parseInt(col.css('margin-right'),10);
				}			
				// get item element
				var items = col.find('.items');				
				// get padding left
				if (!isNaN(parseInt(items.css('padding-left')))) {
					 width+=parseInt(items.css('padding-left'),10);
				}
				// Loop through item element
				$(this).find('.item').each(function(){ 
					var subwidth = $(this).outerWidth(true);
					width+=subwidth;
				});
				// Calculate the border
				borderLeft = parseInt(items.css('borderLeftWidth'),10);
				borderRight = parseInt(items.css('borderRightWidth'),10);
				
				if (isNaN(borderLeft)) { borderLeft = 0; }
				if (isNaN(borderRight)) { borderRight = 0; }
				
				width = width + borderLeft + borderRight; // plus the borders
				total += width;	
				
				if(col.hasClass('product')) {
					products+= width;
				}
			});

			// Update ribbon & width
			$('#comparison').css('width', total);
			$('.ribbon').css('width', products);
		},

		// Match icon column heights
		resizeExtrasColumns: function(){
			var instance = this;
			$('ul.extras').each(function (index, list) {
				
				$(this).find('li').each(function(index, listItem){					
					// get first column LI on correct row ( index )
					var firstItem = $('ul.extras:first li').get(index);					
					
					// Get it's height and apply to the current element
					var firstItemHeight = $(firstItem).height();
					$(this).css({ 'height' : firstItemHeight });
					
					var borderLineTop = '<div class="borderLineTop" />';
					var borderLineBottom = '<div class="borderLineBottom" />';
					
					
					
					// Look for a border classes, add if they exist, add the new elements to the heading column if it doesn't have the line
					if( $(firstItem).hasClass('borderTop') ){ 
						$(this).append(borderLineTop); 
						if( ! $(firstItem).find('borderLineTop') ){
							$(firstItem).append(borderLineTop); 
						}
					}
					if( $(firstItem).hasClass('borderBottom') ) {
						$(this).append(borderLineBottom);
						if( ! $(firstItem).find('borderLineBottom') ){
							$(firstItem).append(borderLineBottom); 
						}
					}
					
				});
			});
		},
	
		// Match product column heights
		resizeItems: function(){
			var height = 0;
			height = $('#comparison .col:visible').height() - 5;
			$('#comparison .product .items, #comparison .product .item').css('height', height);			
		}
		
	};