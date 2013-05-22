$(function() {

//Static constants
var ROOT_URL = document.location.protocol + '//' + document.location.host;

// Label Hide on click
$('.overlabel').overlabel();

// Navigation hover slide
if ($(window).width() >= 768) {
  var $el, leftPos, newWidth,
      $mainNav = $("#main-nav");

  $mainNav.append("<li id='main-nav-slider'></li>");
  var $slider = $("#main-nav-slider");

  $slider
      .width($(".current_page_item").width())
      .css("left", $(".current_page_item a").position().left)
      .data("origLeft", $slider.position().left)
      .data("origWidth", $slider.width());
      
  $("#main-nav li").find("a").hover(function() {
      $el = $(this);
      leftPos = $el.position().left;
      newWidth = $el.parent().width();
      $slider.stop().animate({
          left: leftPos,
          width: newWidth
      });
  }, function() {
      $slider.stop().animate({
          left: $slider.data("origLeft"),
          width: $slider.data("origWidth")
      });
  });
} else {
  
}

// Orbit
$("#slideshow").orbit({
  animation: 'fade',                  // fade, horizontal-slide, vertical-slide, horizontal-push
  animationSpeed: 800,                // how fast animtions are
  timer: true,
  resetTimerOnClick: true,           // true resets the timer instead of pausing slideshow progress
  advanceSpeed: 4000,                 // if timer is enabled, time between transitions
  directionalNav: false,
  bullets: true,                     // true or false to activate the bullet navigation
  bulletThumbLocation: '#featuredBullets',
  afterSlideChange: function(){},     // empty function
  fluid: true                         // or set a aspect ratio for content slides (ex: '4x3')
});

// Instgram Carousel
if($('body').is('#gallery')){
  $('.instagram-feed').carouFredSel({
        responsive: true,
        width: '100%',
        scroll: 3,
        pagination : {
          container : "#pagination-container",
          keys    : true,
          duration  : 1000
        },
        items: {
          width: 260,
          height: '100%', //  optionally resize item-height
          visible: {
            min: 2,
            max: 3
          }
        }
    });
}

// Gallery thumb hover
  $("#gallery-container .block-grid a").hover(function() {
    $(this).find("div").toggleClass("vignette");
});

});


function resizeImg() {

  // Assign height to amentities block
  if ($(window).width() >= 900) {
    var $this = $('.amenities').prev('.room-block');
    var roomImageHeight= $this.find('img').innerHeight();
    $('.text').height(roomImageHeight);
  } else {
    $('.text').css("height","auto");
  }

  // Equal Height to promos
  if ($(window).width() >= 767) {
    $("#promo-container li a").syncHeight();
  } else {
 
  }

  // Homepage supersized responsiveness
  if ($(window).width() <= 767) {

    var headerHeight = $("header").height();

    //We need the width of the browser to dynamically set the height of the supersized images
    var browserWidth = $(window).width();

    //Create the new css object for the supersized images that will generate our new height
    var imgCSS = {
      'width' : browserWidth,
      'height' : 'auto'
    };
    //Assign the new css to the supersized images
    $("#supersized li img").css(imgCSS);

    //Now get the new int value of the height for use in the supersized container
    var updatedImgHeight = $("#supersized img").height();

    //Assign the new int value to supersized container
    $("#supersized").css({
        "height": updatedImgHeight,
        "top": headerHeight
      });

    //Set the new position of the info box
    $("#home.booking-container").css("margin-top", updatedImgHeight + 'px');
    $("#slide-list").css("top", updatedImgHeight + 'px');

    } else {

      $("#supersized").css({
        'height': '100%',
        "top": 0
      });
      $("#home.booking-container").css("margin-top", "0");
      $("#slide-list").css("top", 'auto');
  }
}

$(window).resize(function() {
  resizeImg();
});
$(window).load(function() {
  resizeImg();
});