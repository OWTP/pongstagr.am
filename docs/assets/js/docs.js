/* ==========================================================================
 * jQuery Pongstagr.am Plugin v2.0.8 docs.js
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo
 *
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.10.1 and Bootstrap 3.0
 * ========================================================================= */

$(window).load(function () { "use strict";
  
  // Make example code pretty
  if ($('.prettyprint').length > 0) {
    window.prettyPrint && prettyPrint()
  }

    // Sticky Menu
    // ==========================================
    var headerHeight = $('header').outerHeight()
   
    $(window).scroll(function (){ 
      if ($(window).scrollTop() > headerHeight){
          $('.substitute-btn').addClass('stick')        
        } else {
          $('.substitute-btn').removeClass('stick')
      }
    })


  // Smooth scroll for internal links
  // ============================================
  $('#sidebar a[href^="#"]').on('click', function (e) {
    e.preventDefault()
    
    var  target = this.hash
    var $target = $(target)
               
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top  - 65
    }, function () {
      window.location.hash = target
      return false
    })


    // Sub-Pages Navigation
    // ==========================================
    if ($('#sidebar a').length > 0) {
      $('#sidebar a').removeClass('active')
      $(this).addClass('active')
    }
    
  })


  // Enable Tooltip for Substitue Nav
  // ============================================
  $('.substitute-btn a').each(function () {
    $(this).hover(function () {
      $(this).tooltip('show');
    })
  })
  
  
  // Load Instagram Stuff
  // ============================================
  function loadGram (target, show) {
    var usr = '39666111'
    var tkn = '39666111.1fb234f.c3901000b4944a549fd5fd2310c63780'
    var tgt = '#' + target
    
    if ($(tgt).length > 0){
      $(tgt).pongstgrm({
          accessId    : usr
        , accessToken : tkn
        , show        : target
        , count       : show
        , pager       : true
      })
    }
  }
  
  loadGram('recent', 4);
  loadGram('liked' , 4);
  loadGram('feed'  , 4);


}); /*! end window.load */

  
// Hide iOS/Android address bar after page loads
// =============================================
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) { 
  window.addEventListener('load', function () {
    setTimeout( function() { window.scrollTo(0, 0) }, 0)
  })
}