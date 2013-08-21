/* ==========================================================================
 * jQuery Pongstagr.am Plugin v2.0.77
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo
 *
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.10.1 and Bootstrap 3.0
 * ========================================================================= */


/* jshint undef: true, unused: true */
;(function ($, window, document, undefined){ "use strict";

  var photostream = function (element, options) {
    
    this.$this.element = $(element),
    this.options = options;
    
  };
  




  photostream.prototype.access = function (id, token) {
    
    if ( id !== null || token !== null ){
      
      return true;
      console.log(id)
      
    } else {
      
      console.log('Please check whether your Access ID and Access Token if it\'s valid.' );
      console.log('You may visit http://instagram.com/developer/authentication/ for more info.');  
      
      return false;
    }
    
  };
  

  // PONGSTAGR.AM PLUGIN DEFINITON
  // =============================
  $.fn.pongstgrm = function (option) {
    var $this   = $(this)
      , options = $.extend({}, $.fn.pongstgrm.defaults, option);
    
    
    return this.each( function (i, element) {
      
      photostream.prototype.access( options.accessId, options.accessToken );  
      
    });
  };  
  
  // PONGSTAGR.AM OPTIONS
  // =====================  
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
    , resolution:   null    // options: 'low_resolution', 'standard_resolution'
    , pager:        null    // options: true or false (enables/disable load more button)
    , likes:        null    // options: true or false (enable/disable like count)
    , comments:     null    // options: true or false (enable/disable comment count)
  
  };  
  




  
  // PONGSTAGR.AM DATA-API
  // =====================
  // $(document).on('load', photostream.prototype.access );

})(jQuery, window, document);