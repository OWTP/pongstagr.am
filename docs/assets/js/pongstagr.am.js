/* ==========================================================================
 * jQuery Pongstagr.am Plugin v3.0.0
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo
 *
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.10.1 and Bootstrap 3.0
 * ========================================================================= */

+function ($) { "use strict";


  // PONGSTAGR.AM CLASS DEFINITION
  // =============================

  var Pongstgrm = function (element) {
    var self = this
    var $el  = $(element).on('load', self.access)    
  }


  Pongstgrm.defaults = {

    // USER AUTHENTICATION
    // ===========================

      accessId:     null
    , accessToken:  null


    // DISPLAY OPTIONS
    // ===========================

    , show:    'recent'
    , count:    8
    , likes:    true
    , comments: true


    // HTML OPTIONS
    // ===========================
    
    , col:        'col-xs-6 col-sm-6 col-md-3 col-lg-3'
    , like:       'glyphicon glyphicon-heart'
    , video:      'glyphicon glyphicon-play'
    , comment:    'glyphicon glyphicon-comment'
    , preload:    'spinner'
    , button:     'btn btn-success'
    , buttontext: 'Load more'
    
  }


  Pongstgrm.prototype.tag = function (tag,id,css) {
    var element = document.createElement(tag)
    
    if (id)  { element.id = id }
    if (css) { element.className = css }
    
    return element
  }


  Pongstgrm.prototype.data = function (options,element) {
    
    function preloader (id) {      
      var $img = $('#'+id)
      var  spn = '#'+id+'-ldr'
      var  ttl = $img.length
      var  pre = 0

      $img.hide().load(function () {
        if (++pre === ttl) {
          $img.fadeIn()
          $(spn).fadeOut().remove()
        }          
      })
    }
    
    function ajaxdata (url) {
      var p = Pongstgrm
      var o = options
      var t = element
      var n = ''

      $.ajax({
          url      : url
        , cache    : true    
        , method   : 'GET'
        , dataType : 'jsonp' 
        , success  : function(data){
          
          $.each(data.data, function (a,b) {
            
            var caption = (b.caption !== null) ? (b.caption.text !== null) ? b.caption.text : '' : b.user.username
            var comment = (o.comment !== null) ? (b.comments.count !== null) ? b.comments.count : '0' : ''
            var likes   = (o.likes   !== null) ? (b.likes.count !== null) ? b.likes.count : '0' : ''
            
            var ldr = p.prototype.tag('div', b.id+'-thmb-ldr',o.preload)
            var img = p.prototype.tag('img', b.id, n)
            var blk = p.prototype.tag('div', n, o.col)
            var tmb = p.prototype.tag('div', n, 'thumbnail')
            var lnk = p.prototype.tag('a', n, n)

            $(t).append(blk)
            
            $(tmb).appendTo(blk)
            $(ldr).appendTo(tmb)
            
            $(lnk)
              .appendTo(tmb)
              .attr({
                  'data-toggle': 'modal'
                , 'href': '#'+b.id
              })
            
              $(img).attr({
                  'src': b.images.low_resolution.url
                , 'id' : b.id+'-thmb'
                , 'alt': caption
              }).appendTo(lnk)
              
              preloader(b.id+'-thmb')
              
          })

        }  
      })
      
      return
    }


    var apiurl = 'https://api.instagram.com/v1/users/'
    var rcount = '?count=' +  options.count + '&access_token=' + options.accessToken  
       
    switch (options.show) {
      case "liked":
      var liked = apiurl + 'self/media/liked' + rcount
      ajaxdata(liked)
      break
      
      case "feed":
      var feed = apiurl + 'self/feed' + rcount
      ajaxdata(feed)
      break
      
      case "profile":
      var profile = apiurl + options.accessId + '?access_token=' + token
      ajaxdata(profile)
      break
      
      case "recent":
      var recent = apiurl + options.accessId + '/media/recent' + rcount
      ajaxdata(recent)
      break
    }
  }


  Pongstgrm.prototype.html = function (options,element) {
    var newbtn = Pongstgrm.prototype.tag('button','',options.button)
    var button = $(newbtn).attr('data-paginate',options.show).text(options.buttontext)

    $(element)
      .attr('data-type',options.show)
      .addClass('pongstgrm row')
      .after(button)
    
    Pongstgrm.prototype.data(options,element)
  }


  Pongstgrm.prototype.access = function (options,element) {
    if (options.accessId !== null || options.accessToken !== null) {
      
      Pongstgrm.prototype.html(options,element)
      
      return true 
    } else {
     
      console.log('Please check whether your Access ID and Access Token if it\'s valid.' )
      console.log('You may visit http://instagram.com/developer/authentication/ for more info.')      
     
      return false
    }
  }





  // PONGSTAGR.AM PLUGIN DEFINITON
  // =============================
  
  $.fn.pongstgrm = function (option) {
    var options  = $.extend({}, Pongstgrm.defaults, option)

    return this.each(function () {
      var element = $(this)[0]
      Pongstgrm.prototype.access(options, element)
      
      return
    })
  }




  // PONGSTAGR.AM DEFAULT OPTIONS
  // =============================
  
  $.fn.pongstgrm.defaults = Pongstgrm.options;

}(window.jQuery);