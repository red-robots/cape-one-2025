/**
 *	Custom jQuery Scripts
 *	
 *	Developed by: Mindy Amante
 */

jQuery(document).ready(function ($) {

	var params = {}; location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) { params[k] = v });

	$('.loop').owlCarousel({
		center: true,
		items:2,
		nav: true,
		loop:true,
		margin:15,
		autoplay:true,
		smartSpeed: 1000,
		autoplayTimeout:10000,
		autoplayHoverPause:true,
		responsive:{
			600:{
				items:1
			},
			400:{
				items:1
			}
		}
	});

	/*** Homepage Animation ***/
	if( $(".main-content").length > 0 ) {		
		setTimeout(function(){
			$(".section_home").removeClass("hide");
			$("#site-logo").addClass("show");
			$(".main-content, .bottom-content, .footer-social-media").addClass("show");

			setTimeout(function(){
				$(".section_home").addClass("show-bg");
			},500);

		},1);	
	}
	/*** END Homepage Animation ***/

	/*
	*
	*     Subnaviagation Animation
	*
	*
	*/
	$('li.menu-item').hover(function() {
		$(this).toggleClass('active');
		$(this).find('.mega-menu .mega-menu-content .menu-col').toggleClass('is-hovered');
	
	});


	var subMenus = $(".mega-menu");

	$.each($(".menu-item"), function(index, element) {
	let subMenu = $(element).children('.mega-menu'), tl;
	let subMenuItems = $(subMenu).children('li');
	
	if(subMenu.length != 0) {
		tl = new gsap.timeline({paused:true});
		
		tl.from(subMenu, .05, {height:0});
		// tl.staggerTo(subMenuItems, 0.6, {
		//   top: "0px",
		//   ease: Expo.easeInOut,
		// }, 0.1, "-=0.8");
		
		element.subMenuAnimation = tl;
		
		$(element).hover(menuItemOver, menuItemOut);
	} 
	});

	function menuItemOver(e) {
	this.subMenuAnimation.play();
	}

	function menuItemOut() {
	this.subMenuAnimation.reverse();
	}

	/*
	*
	*     Fixed Navigation on Scroll up
	*
	*
	*/
	// Get the navigation bar element
	const navbar = document.getElementById("masthead");

	// Initialize the previous scroll position
	let prevScrollPosition = window.pageYOffset;

	window.addEventListener("scroll", () => {
	// Get the current scroll position
	const currentScrollPosition = window.pageYOffset;

	// Check if the user has scrolled up
	if (currentScrollPosition < prevScrollPosition) {
		// Set the navbar's position to fixed
		navbar.classList.add("fixed");
		navbar.classList.remove("scrolling");
	} else {
		// Optionally, you can unfix the navbar if the user scrolls down
		// Uncomment the following line if you want this behavior
		navbar.classList.remove("fixed");
		navbar.classList.add("scrolling");
		// navbar.classList.remove("start-position");
	}

	// Check if the user is at the top of the page
	if (currentScrollPosition === 0) {
		navbar.classList.add("start-position");
		navbar.classList.remove("fixed");
	} else {
		navbar.classList.remove("start-position");
	}

	// Update the previous scroll position
	prevScrollPosition = currentScrollPosition;
	});

	/*
	*
	*     Mobile Navigation
	*
	*
	*/
	$(document).on('click','#mobile-menu-toggle',function(){
	$('body').toggleClass('mobile-menu-open');
	$(this).toggleClass('active');
	$('.mobile-navigation').toggleClass('active');
	});

	$(document).on('click','#overlay',function(){
	$(this).removeClass('active');
	$('body').removeClass('mobile-menu-open');
	$('#mobile-menu-toggle').removeClass('active');
	$('.mobile-navigation').removeClass('active');
	});

	/*** ***/
	var windowHeight = $(window).scrollTop();
	if(windowHeight  > 200) {
		$("body").addClass('scrolled');
	}

	$(window).scroll(function() {    
		var wHeight = $(window).scrollTop();
		if(wHeight  > 200) {
			$("body").addClass('scrolled');
		} else{
			$("body").removeClass('scrolled');
			//$('body').removeClass('subnav-clicked');
		}
	});
  

	$('a[href*="#"]:not([href="#"])').click(function() {
    var headHeight = $("#masthead").height();
		var offset = headHeight + 80;

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top - offset
          }, 1000);
          return false;
        }
    }
	});

	/* Ajax Load More */
	$('a[href*="#"]:not([href="#"])').click(function() {
	    var headHeight = $("#masthead").height();
			var offset = headHeight + 80;

	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	        if (target.length) {
	          $('html, body').animate({
	              scrollTop: target.offset().top - offset
	          }, 1000);
	          return false;
	        }
	    }
	});

});// END #####################################    END