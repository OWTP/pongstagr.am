/* ==========================================================================
 * jQuery Pongstagr.am Plugin v2.0.8 docs.js
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo
 *
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.10.1 and Bootstrap 3.0
 * ========================================================================= */

$(window).load(function(){ "use strict";
  
  // Make example code pretty
  if ( $('.prettyprint').length > 0 ) {
    window.prettyPrint && prettyPrint();
  }

  /* Sticky Menu
   * ============================================ */
    var headerHeight = $('header').outerHeight();
   
    $(window).scroll(function(){
      //if scrolled down more than the header's height
      if ($(window).scrollTop() > headerHeight ){
          $('.substitute-btn').addClass('stick');          
        } else {
          $('.substitute-btn').removeClass('stick');
      }
    });   


  /* Smooth scroll for internal links
   * ============================================ */
  $('#sidebar a[href^="#"]').on('click', function (e) {
    
    e.preventDefault();
    
    var target = this.hash,
       $target = $(target);
       
    $('html, body').stop().animate({
      
        'scrollTop': $target.offset().top  - 10
        
    }, { duration: 1250, easing: 'easeInOutExpo'}, function () {
      
        window.location.hash = target;
        
        return false;
    });


    /* Sub-Pages Navigation
     * ============================================ */
    if ( $('#sidebar a').length > 0 ) {
      
      $('#sidebar a').removeClass('active');
      
      $(this).addClass('active');
      
    }
    
  });
  
  /* Enable Tooltip for Substitue Nav
   * ============================================ */
  $('.substitute-btn a').each(function(){
    
    $(this).hover(function(){
      
      $(this).tooltip('show');
      
    });
    
  });
  
  
  /* Load Instagram Stuff
   * ============================================
   * To use this function, the variable target should be the same
   * as your selector i.e., <div id="<target>"> and the variable
   * showValue is the number of media you would like to show i.e., 8
   *
   */
  // function loadGram( target, showValue ){
  //   var usr = '39666111',
  //       tkn = usr + '.1fb234f.c3901000b4944a549fd5fd2310c63780',
  //       tgt = '#' + target;
    
  //   if ( $(tgt).length > 0 ){
  //     $(tgt).pongstgrm({
  //       accessId    : usr,
  //       accessToken : tkn,
  //       show        : target,
  //       count       : showValue,
  //       pager       : true
  //     });
  //   }
    
  //   $('[data-paginate="' + target + '"]')
  //     .removeClass('btn-success')
  //     .addClass('btn-danger text-center');
  // }
  
  // loadGram( 'recent', 4 );
  // loadGram( 'liked',  8 );
  // loadGram( 'feed',   8 );

    var usr = '39666111',
        tkn = usr + '.1fb234f.c3901000b4944a549fd5fd2310c63780';

    $('.recent').pongstgrm({
      accessId: usr,
      accessToken: tkn
    });

}); /*! end window.load */

  
// Hide iOS/Android address bar after page loads
// =============================================

if (navigator.userAgent.match( /(iPod|iPhone|iPad)/ )) { 
  window.addEventListener( 'load', function() {
    setTimeout( function() { window.scrollTo(0, 0); }, 0);
  });
}