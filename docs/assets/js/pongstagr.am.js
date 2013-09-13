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
  var Pongstgrm   = function (element) {}


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
    
    , column:     'col-xs-6 col-sm-3 col-md-3 col-lg-3'
    , likeico:    'glyphicon glyphicon-heart'
    , videoico:   'glyphicon glyphicon-play'
    , commentico: 'glyphicon glyphicon-comment'
    , preload:    'spinner'
    , button:     'btn btn-lg btn-success pull-right'
    , buttontext: 'Load more'
    
  }


  Pongstgrm.prototype.tagg = function (options, extend) {
    var more   = (extend) ? extend : ''
    var option   = $.extend({}, options,extend)
    var target   = option.parent
    var callback = (!option.callback) ? function(){} : option.callback
    var newtag   = document.createElement(option.tag)

    if (option.attr)  { $(newtag).attr(option.attr) }
    if (option.class) { $(newtag).addClass(option.class) }
    
    if (!option.text || option.html) {
      $(newtag).html(option.html)
    }
    
    if (!option.html || option.text) {
      $(newtag).text(option.text)
    }

    if (!option.insert) { $(target).append(newtag) }

    switch (option.insert) {      
      case 'after':
        if (target) { $(target).after(newtag) }
      break
      case 'prepend':
        if (target) { $(target).prepend(newtag) }
      break
      case 'append':
        if (target) { $(target).append(newtag) }
      break
    }
    
    callback()    
    
    return newtag
  }


  Pongstgrm.prototype.data = function (options,element) {
    
    function preloader (id) {
      var $img = $('#'+id)
      var  spn = '#'+id+'-ldr'

      var btn     = $('[data-paginate="'+options.show+'"]')
      var btnstat = document.createElement('div')

      $(btn)
        .text('Loading ')
        .append(btnstat)
      $(btnstat)
        .addClass(options.preload)

      var  ttl = $img.length
      var  pre = 0

      $img.hide().load(function () {
        if (++pre === ttl) {
          $img.fadeIn()
          $(spn).fadeOut().remove()
          $(btn).text(options.buttontext)
          $(btnstat).fadeOut().remove()
        }
      })

      return
    }

    function loadmore (url) {
      var $morebtn = $('[data-paginate="'+options.show+'"]')

      if (url === undefined || url === null) {
        $morebtn.on('click', function (e) {
          e.preventDefault()
          
          $(this)
            .removeClass()
            .addClass('btn btn-default')
            .attr('disabled','disabled')
        })
      } else {
        $morebtn.on('click', function (e) {
          e.preventDefault()

          ajaxdata(url)
          $morebtn.unbind(e)
        })
      }

      return
    }

    function ajaxdata (url) {
      var o = options      

      $.ajax({
          url      : url
        , cache    : true    
        , method   : 'GET'
        , dataType : 'jsonp' 
        , success  : function(data){
          
          $.each(data.data, function (a,b) {
            var caption = (b.caption !== null) ? (b.caption.text !== null) ? b.caption.text : '' : b.user.username
            var preload = Pongstgrm.prototype.tagg({
                tag: 'div'
              , attr: { id: b.id+'-thmb-ldr'}
              , class: o.preload 
            })
            
            var link = Pongstgrm.prototype.tagg({
                tag: 'a'
              , attr: { href: '#'+b.id+'-modal' }
              , html: '<img src="'+b.images.low_resolution.url+'" id="'+b.id+'-thmb'+'" alt="'+caption+'" />'
            })

            
            var thumbnail = Pongstgrm.prototype.tagg({
                tag: 'div'
              , class: 'thumbnail'
              , html: [preload,link]
            })
            
            Pongstgrm.prototype.tagg({
                tag: 'div'
              , class: o.column
              , parent: element
              , html: thumbnail
            })
            
            preloader(b.id+'-thmb')

          })

          loadmore(data.pagination.next_url)
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
      var profile = apiurl + options.accessId + '?access_token=' + options.token
      ajaxdata(profile)
      break

      case "recent":
      var recent = apiurl + options.accessId + '/media/recent' + rcount
      ajaxdata(recent)
      break
    }
  }


  Pongstgrm.prototype.html = function (options,element) {
    $(element)
      .attr('data-type', options.show)
      .addClass('pongstgrm row')
      
    Pongstgrm.prototype.tagg({
        tag: 'button'
      , attr: { 'data-paginate': options.show, 'class': options.button }
      , insert: 'after'
      , parent: element
      , text: options.buttontext
    })
    
    Pongstgrm.prototype.data(options,element)
    
    return
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