        (function() {
    
            window.BackgroundImageApp = {
                Models: {},
                Collections: {},
                Views: {},
                Options: {},
                Data: {}
            }

            BackgroundImageApp.Data.urls = [
				'http://farm7.static.flickr.com/6089/6059010802_436cefa521_z.jpg',
				'http://farm7.static.flickr.com/6088/6065742147_3d62b32deb_z.jpg',
				'http://farm7.static.flickr.com/6197/6065590914_ab1acccf87_z.jpg'
            ];

            BackgroundImageApp.Options.resizeOptions = {
                min_width : 0,
                min_height : 0,
                vertical_center : 1,
                horizontal_center : 1,
                fit_always : 0,
                fit_portrait : 1,
                fit_landscape : 0
            }
            
            BackgroundImageApp.Models.BackgroundImage = Backbone.Model.extend({
                defaults: {
                    uri: ''
                }
            });

            BackgroundImageApp.Collections.BackgroundImages = Backbone.Collection.extend({
                model: BackgroundImageApp.Models.BackgroundImage,
                fetch: function(){
                    return _.map(BackgroundImageApp.Data.urls, function(url){ return new BackgroundImageApp.Models.BackgroundImage({uri: url})});
                }
            });

            BackgroundImageApp.Views.BackgroundImage = Backbone.View.extend({
                tagName: 'img',
                initialize: function(){
                    this.render();
                },
                render: function() {
                    this.$el.attr({
                        src: this.model.get('uri')
                    });
                    return this;
                },
                setOrigDimensions: function(){
                    console.log($(this.$el).width());
                    this.$el.data('origWidth', this.$el.width()).data('origHeight', this.$el.height()).css('visibility','visible');
                    //console.log(this.$el.data());
                }                              
            });

            BackgroundImageApp.Views.BackgroundImages = Backbone.View.extend({
                el: $("#full-page-background"),
                initialize: function() {
                    this.render();
                    this.resizeImages();
                    $(window).on("resize", this.resizeImages);                    
                },
                render: function(){
                    _.each(new BackgroundImageApp.Collections.BackgroundImages().fetch(), 
                    function(t){
                        //console.log(this); 
                        var backgroundImageView = new BackgroundImageApp.Views.BackgroundImage({model: t});
                        this.$el.append(backgroundImageView.el); 
                        backgroundImageView.setOrigDimensions(this.el);
                        //this.$el.append( new BackgroundImageApp.Views.BackgroundImage({model: t}).el)
                    }, this);
                    return this;
                },
                resizeImages: function() {
                    resizeNow();
                },                        
                remove: function() {
                    $(window).off("resize", this.resizeImages);
                    //call the superclass remove method
                    Backbone.View.prototype.remove.apply(this, arguments);
                }                
            });

        resizeNow = function(){
                return $('#full-page-background').each(function() {
                $('img', '#full-page-background').each(function(){
                    base = {};
                    base.$el = $('#full-page-background');
                    thisSlide = $(this);
                    var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);  // Define image ratio
                    
                    // Gather browser size
                    var browserwidth = base.$el.width(),
                        browserheight = base.$el.height(),
                        offset;

                    if (BackgroundImageApp.Options.resizeOptions.fit_always){   // Fit always is enabled
                        if ((browserheight/browserwidth) > ratio){
                            resizeWidth();
                        } else {
                            resizeHeight();
                        }
                    } else {  // Normal Resize
                        if ((browserheight <= BackgroundImageApp.Options.resizeOptions.min_height) && (browserwidth <= BackgroundImageApp.Options.resizeOptions.min_width)){    // If window smaller than minimum width and height
                            if ((browserheight/browserwidth) > ratio){
                                BackgroundImageApp.Options.resizeOptions.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);   // If landscapes are set to fit
                                
                            } else {
                                BackgroundImageApp.Options.resizeOptions.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);       // If portraits are set to fit
                            }
                        
                        } else if (browserwidth <= BackgroundImageApp.Options.resizeOptions.min_width){     // If window only smaller than minimum width
                            if ((browserheight/browserwidth) > ratio){
                                BackgroundImageApp.Options.resizeOptions.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();   // If landscapes are set to fit
                            } else {
                                BackgroundImageApp.Options.resizeOptions.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);       // If portraits are set to fit
                            }
                            
                        } else if (browserheight <= BackgroundImageApp.Options.resizeOptions.min_height){   // If window only smaller than minimum height
                            if ((browserheight/browserwidth) > ratio){
                                BackgroundImageApp.Options.resizeOptions.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);   // If landscapes are set to fit
                            } else {
                                BackgroundImageApp.Options.resizeOptions.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();       // If portraits are set to fit
                            }
                        
                        } else {    // If larger than minimums
                            console.log(ratio);
                            if ((browserheight/browserwidth) > ratio){
                                BackgroundImageApp.Options.resizeOptions.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();   // If landscapes are set to fit
                                console.log('test 1');
                            } else {
                                BackgroundImageApp.Options.resizeOptions.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();       // If portraits are set to fit
                                console.log('test 2');
                            }
                            
                        }
                    }
                    
                    function resizeWidth(minimum){
                        if (minimum){   // If minimum height needs to be considered
                            if(thisSlide.width() < browserwidth || thisSlide.width() < BackgroundImageApp.Options.resizeOptions.min_width ){
                                if (thisSlide.width() * ratio >= BackgroundImageApp.Options.resizeOptions.min_height){
                                    thisSlide.width(BackgroundImageApp.Options.resizeOptions.min_width);
                                    thisSlide.height(thisSlide.width() * ratio);
                                } else {
                                    resizeHeight();
                                }
                            }
                        } else {
                            if (BackgroundImageApp.Options.resizeOptions.min_height >= browserheight && !BackgroundImageApp.Options.resizeOptions.fit_landscape){   // If minimum height needs to be considered
                                if (browserwidth * ratio >= BackgroundImageApp.Options.resizeOptions.min_height || (browserwidth * ratio >= BackgroundImageApp.Options.resizeOptions.min_height && ratio <= 1)){    // If resizing would push below minimum height or image is a landscape
                                    thisSlide.width(browserwidth);
                                    thisSlide.height(browserwidth * ratio);
                                } else if (ratio > 1){      // Else the image is portrait
                                    thisSlide.height(BackgroundImageApp.Options.resizeOptions.min_height);
                                    thisSlide.width(thisSlide.height() / ratio);
                                } else if (thisSlide.width() < browserwidth) {
                                    thisSlide.width(browserwidth);
                                    thisSlide.height(thisSlide.width() * ratio);
                                }
                            } else {  // Otherwise, resize as normal
                                thisSlide.width(browserwidth);
                                thisSlide.height(browserwidth * ratio);
                            }
                        }
                    };
                    
                    function resizeHeight(minimum){
                        if (minimum){   // If minimum height needs to be considered
                            if(thisSlide.height() < browserheight){
                                if (thisSlide.height() / ratio >= BackgroundImageApp.Options.resizeOptions.min_width){
                                    thisSlide.height(BackgroundImageApp.Options.resizeOptions.min_height);
                                    thisSlide.width(thisSlide.height() / ratio);
                                } else {
                                    resizeWidth(true);
                                }
                            }
                        } else {  // Otherwise, resized as normal
                            if (BackgroundImageApp.Options.resizeOptions.min_width >= browserwidth){    // If minimum width needs to be considered
                                if (browserheight / ratio >= BackgroundImageApp.Options.resizeOptions.min_width || ratio > 1){  // If resizing would push below minimum width or image is a portrait
                                    thisSlide.height(browserheight);
                                    thisSlide.width(browserheight / ratio);
                                } else if (ratio <= 1){     // Else the image is landscape
                                    thisSlide.width(BackgroundImageApp.Options.resizeOptions.min_width);
                                    thisSlide.height(thisSlide.width() * ratio);
                                }
                            } else {  // Otherwise, resize as normal
                                thisSlide.height(browserheight);
                                thisSlide.width(browserheight / ratio);
                            }
                        }
                    };
                    
                    if (thisSlide.parent().hasClass('image-loading')){
                        $('.image-loading').removeClass('image-loading');
                    }
                    
                    // Horizontally Center
                    if (BackgroundImageApp.Options.resizeOptions.horizontal_center){
                        $(this).css('left', (browserwidth - $(this).width())/2);
                    }
                    
                    // Vertically Center
                    if (BackgroundImageApp.Options.resizeOptions.vertical_center){
                        $(this).css('top', (browserheight - $(this).height())/2);
                    }
                    
                });
                
                return false;
                
            });
            
        };

        $(window).on('load', function() {
            var backgroundImagesView = new BackgroundImageApp.Views.BackgroundImages();
        });                  
        
        })();