/* ==========================================================================
 * jQuery Pongstagr.am Plugin v2.0.8
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo
 *
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.10.1 and Bootstrap 3.0
 * ========================================================================= */

;(function ($, window, document, undefined){ "use strict";
  

  // PONGSTAGR.AM PLUGIN DEFINITON
  // =============================
  $.fn.pongstgrm = function (option) {
    var $this   = $(this)
      , options = $.extend({}, $.fn.pongstgrm.defaults, option);
    
    
    return this.each( function (i, element) {});
  };  
  
  
  
  // PONGSTAGR.AM DEFAULT OPTIONS
  // ============================  
  $.fn.pongstgrm.defaults = {
  
    // USER AUTHENTICATION
      accessId:     null    // user id
    , accessToken:  null    // acccess token
    
    // PROFILE OPTIONS
    , profile:      null    // display profile information
    , profilediv:   null    // profile information container

    // DISPLAY OPTIONS
    , show:         null    // options: 'recent', 'feed', 'liked', 'user'
    , count:        null    // options: 1(min) - 40(max), instagram limits the maximum number of media to 40
    , resolution:   null    // options: 'low_resolution' or 'standard_resolution'
    , pager:        null    // options: true or false (enables/disable load more button)
    , likes:        null    // options: true or false (enable/disable like count)
    , comments:     null    // options: true or false (enable/disable comment count)
  
  };  
  




  
  // PONGSTAGR.AM DATA-API
  // =====================
  // $(document).on('load', photostream.prototype.access );

})(jQuery, window, document);