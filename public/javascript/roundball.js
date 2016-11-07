$(document).ready(function(){

   var scroll_start = 0;
   var startchange = $('.container-content');
   var offset = startchange.offset() + 40;

    if (startchange.length){
     $(document).scroll(function() {
        scrollPostion = $(window).scrollTop();
        if(scrollPostion > 300) {
            $(".logo-overlay-").css('display', 'none')
         } else {
            $(".navbar-nav > li > a")
              .css('padding-top', '30px')
              .css('padding-bottom', '30px');
            $('.navbar-brand img').attr('src','images/RoundballLogo-New.svg').addClass('animated fadeOut').removeClass('animated fadeIn');;
            $('.navbar-brand').css('padding-top', '5px');
         }
     });
    }

});


$(document).ready(function () {

  var toggleMenu = function() {
	  $('header').toggleClass('toggle');
	  $('.main').toggleClass('push');
	  $('.overlay').toggleClass('block');
	  $('#social, .logo').toggleClass('reveal');
  };

	//Nav
	$('.navBtn').click(function() {
    toggleMenu();
	});

  $('.overlay').click(function() {
    toggleMenu();
	});

});
