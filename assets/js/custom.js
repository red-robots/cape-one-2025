"use strict";

/**
 *	Custom jQuery Scripts
 *	
 *	Developed by: Mindy Amante
 */
jQuery(document).ready(function ($) {
  var params = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
    params[k] = v;
  });
  $('.loop').owlCarousel({
    center: true,
    items: 2,
    nav: true,
    loop: true,
    margin: 15,
    autoplay: true,
    smartSpeed: 1000,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    responsive: {
      600: {
        items: 1
      },
      400: {
        items: 1
      }
    }
  });
  /*** Homepage Animation ***/

  if ($(".main-content").length > 0) {
    setTimeout(function () {
      $(".section_home").removeClass("hide");
      $("#site-logo").addClass("show");
      $(".main-content, .bottom-content, .footer-social-media").addClass("show");
      setTimeout(function () {
        $(".section_home").addClass("show-bg");
      }, 500);
    }, 1);
  }
  /*** END Homepage Animation ***/

  /*** Fix on mobile view to fix all content on screen ***/


  var vhHeight = $("body").height();
  var chromeNavbarHeight = vhHeight - window.innerHeight;
  $('body').css({
    height: window.innerHeight,
    marginTop: chromeNavbarHeight
  });
  /*
  *
  *     Subnaviagation Animation
  *
  *
  */

  $('li.menu-item').hover(function () {
    $(this).toggleClass('active');
    $(this).find('.mega-menu .mega-menu-content .menu-col').toggleClass('is-hovered');
  });
  var subMenus = $(".mega-menu");
  $.each($(".menu-item"), function (index, element) {
    var subMenu = $(element).children('.mega-menu'),
        tl;
    var subMenuItems = $(subMenu).children('li');

    if (subMenu.length != 0) {
      tl = new gsap.timeline({
        paused: true
      });
      tl.from(subMenu, .05, {
        height: 0
      }); // tl.staggerTo(subMenuItems, 0.6, {
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


  var navbar = document.getElementById("masthead"); // Initialize the previous scroll position

  var prevScrollPosition = window.pageYOffset;
  window.addEventListener("scroll", function () {
    // Get the current scroll position
    var currentScrollPosition = window.pageYOffset; // Check if the user has scrolled up

    if (currentScrollPosition < prevScrollPosition) {
      // Set the navbar's position to fixed
      navbar.classList.add("fixed");
      navbar.classList.remove("scrolling");
    } else {
      // Optionally, you can unfix the navbar if the user scrolls down
      // Uncomment the following line if you want this behavior
      navbar.classList.remove("fixed");
      navbar.classList.add("scrolling"); // navbar.classList.remove("start-position");
    } // Check if the user is at the top of the page


    if (currentScrollPosition === 0) {
      navbar.classList.add("start-position");
      navbar.classList.remove("fixed");
    } else {
      navbar.classList.remove("start-position");
    } // Update the previous scroll position


    prevScrollPosition = currentScrollPosition;
  });
  /*
  *
  *     Mobile Navigation
  *
  *
  */

  $(document).on('click', '#mobile-menu-toggle', function () {
    $('body').toggleClass('mobile-menu-open');
    $(this).toggleClass('active');
    $('.mobile-navigation').toggleClass('active');
  });
  $(document).on('click', '#overlay', function () {
    $(this).removeClass('active');
    $('body').removeClass('mobile-menu-open');
    $('#mobile-menu-toggle').removeClass('active');
    $('.mobile-navigation').removeClass('active');
  });
  /*** ***/

  var windowHeight = $(window).scrollTop();

  if (windowHeight > 200) {
    $("body").addClass('scrolled');
  }

  $(window).scroll(function () {
    var wHeight = $(window).scrollTop();

    if (wHeight > 200) {
      $("body").addClass('scrolled');
    } else {
      $("body").removeClass('scrolled'); //$('body').removeClass('subnav-clicked');
    }
  });
  $('a[href*="#"]:not([href="#"])').click(function () {
    var headHeight = $("#masthead").height();
    var offset = headHeight + 80;

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - offset
        }, 1000);
        return false;
      }
    }
  });
  /* Ajax Load More */

  $('a[href*="#"]:not([href="#"])').click(function () {
    var headHeight = $("#masthead").height();
    var offset = headHeight + 80;

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - offset
        }, 1000);
        return false;
      }
    }
  });
}); // END #####################################    END
"use strict";

(function ($) {
  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *       the user visible viewport of a web browser.
   *       can accounts for vertical position, horizontal, or both
   */
  var $w = $(window);

  $.fn.visible = function (partial, hidden, direction, container) {
    if (this.length < 1) return; // Set direction default to 'both'.

    direction = direction || 'both';
    var $t = this.length > 1 ? this.eq(0) : this,
        isContained = typeof container !== 'undefined' && container !== null,
        $c = isContained ? $(container) : $w,
        wPosition = isContained ? $c.position() : 0,
        t = $t.get(0),
        vpWidth = $c.outerWidth(),
        vpHeight = $c.outerHeight(),
        clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

    if (typeof t.getBoundingClientRect === 'function') {
      // Use this native browser method, if available.
      var rec = t.getBoundingClientRect(),
          tViz = isContained ? rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top : rec.top >= 0 && rec.top < vpHeight,
          bViz = isContained ? rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top : rec.bottom > 0 && rec.bottom <= vpHeight,
          lViz = isContained ? rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left : rec.left >= 0 && rec.left < vpWidth,
          rViz = isContained ? rec.right - wPosition.left > 0 && rec.right < vpWidth + wPosition.left : rec.right > 0 && rec.right <= vpWidth,
          vVisible = partial ? tViz || bViz : tViz && bViz,
          hVisible = partial ? lViz || rViz : lViz && rViz,
          vVisible = rec.top < 0 && rec.bottom > vpHeight ? true : vVisible,
          hVisible = rec.left < 0 && rec.right > vpWidth ? true : hVisible;
      if (direction === 'both') return clientSize && vVisible && hVisible;else if (direction === 'vertical') return clientSize && vVisible;else if (direction === 'horizontal') return clientSize && hVisible;
    } else {
      var viewTop = isContained ? 0 : wPosition,
          viewBottom = viewTop + vpHeight,
          viewLeft = $c.scrollLeft(),
          viewRight = viewLeft + vpWidth,
          position = $t.position(),
          _top = position.top,
          _bottom = _top + $t.height(),
          _left = position.left,
          _right = _left + $t.width(),
          compareTop = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom,
          compareLeft = partial === true ? _right : _left,
          compareRight = partial === true ? _left : _right;

      if (direction === 'both') return !!clientSize && compareBottom <= viewBottom && compareTop >= viewTop && compareRight <= viewRight && compareLeft >= viewLeft;else if (direction === 'vertical') return !!clientSize && compareBottom <= viewBottom && compareTop >= viewTop;else if (direction === 'horizontal') return !!clientSize && compareRight <= viewRight && compareLeft >= viewLeft;
    }
  };
})(jQuery);