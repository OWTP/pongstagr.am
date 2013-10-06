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
    var more     = (extend) ? extend : ''
    var option   = $.extend({}, options,extend)
    var newtag   = document.createElement(option.tag)
    var callback = (!option.callback) ? function(){} : option.callback

    if (option.attr) { $(newtag).attr(option.attr) }
    if (option.css)  { $(newtag).addClass(option.css) }

    if (!option.text || option.html) { $(newtag).html(option.html) }
    if (!option.html || option.text) { $(newtag).text(option.text) }

    if (!option.insert) { $(option.parent).append(newtag) }
    switch (option.insert) {      
      case 'after':
        if (option.parent) { $(option.parent).after(newtag) }
      break
      case 'prepend':
        if (option.parent) { $(option.parent).prepend(newtag) }
      break
      case 'append':
        if (option.parent) { $(option.parent).append(newtag) }
      break
    }
    callback()
    return newtag
  }


  Pongstgrm.prototype.data = function (options,element) {

    function preloader (id) {
      var $img = $('#'+id)
      var  spn = '#'+id+'-preloadr'
      var  ttl = $img.length
      var  pre = 0

      var loadbtn = $('[data-paginate="'+options.show+'"]')
      var btnstat = document.createElement('div')

      $(loadbtn)
        .text('Loading ')
        .append(btnstat)
      $(btnstat)
        .addClass(options.preload)


      $img.hide().load(function () {
        if (++pre === ttl) {
          $img.fadeIn()
          $(spn).fadeOut().remove()
          $(loadbtn).text(options.buttontext)
          $(btnstat).fadeOut().remove()
        }
      })

      return
    }

    function paginate (url) {
      var loadbtn = $('[data-paginate="'+options.show+'"]')
      
      if (url !== undefined || url !== null) {
        $(loadbtn).on('click', function (e) {
          e.preventDefault()
          ajaxdata(url)
          $(this).unbind(e)
        })
      } else {
        $(loadbtn).on('click', function (e) {
          e.preventDefault()
          $(this)
            .removeClass()
            .addClass('btn btn-disabled')
        })
      }
    }


    function ajaxdata (url) {
      $.ajax({
          url      : url
        , cache    : true    
        , method   : 'GET'
        , dataType : 'jsonp' 
        , success  : function(data){
          $.each(data.data, function (a,b) {

            var spin = '<div id="'+b.id+'-thmb-preloadr" class="'+options.preload+'" />'
            var type = (b.type === 'video') ? Pongstgrm.prototype.tagg({ tag: 'i', css: options.videoico }) : ''
            var link = Pongstgrm.prototype.tagg({
                tag: 'a'
              , attr: { href: '#'+b.id+'-modal' }
              , html: '<img src="'+b.images.low_resolution.url+'" id="'+b.id+'-thmb'+'" alt="" />'
            })

            var thumbnail = Pongstgrm.prototype.tagg({
                tag: 'div'
              , css: 'thumbnail'
              , html: [spin, type, link]
            })


            Pongstgrm.prototype.tagg({
                tag: 'div'
              , css: options.column
              , parent: element
              , html: thumbnail
            })

            preloader(b.id+'-thmb')
          })
          
          paginate(data.pagination.next_url)         
        }
      })
      return     
    }

    var apiurl = 'https://api.instagram.com/v1/users/'
    var rcount = '?count='+options.count+'&access_token='+options.accessToken  

    switch (options.show) {
      case "liked":
      var liked = apiurl+'self/media/liked'+rcount
      ajaxdata(liked)
      break

      case "feed":
      var feed = apiurl+'self/feed'+rcount
      ajaxdata(feed)
      break

      case "profile":
      var profile = apiurl+options.accessId+'?access_token='+options.token
      ajaxdata(profile)
      break

      case "recent":
      var recent = apiurl+options.accessId+'/media/recent'+rcount
      ajaxdata(recent)
      break
    }
    return
  }


  Pongstgrm.prototype.render = function (options,element) {
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
      Pongstgrm.prototype.render(options,element)
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