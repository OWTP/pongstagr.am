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
    , button:     'btn btn-lg btn-success'
    , buttontext: 'Load more'
    
  }


  Pongstgrm.prototype.tag = function (options) {
    var element = document.createElement(options.tag)
    
    if (options.attr) { $(element).attr(options.attr) }
    if (options.html) { $(element).html(options.html) }
    if (options.text) { $(element).text(options.text) }
    if (options.parent === true) { 
      $(element).append(options.children) 
    }
    
    switch (options.append) {
      case 'before':
        $(options.target).before(element)
      break
      
      case 'after':
        $(options.target).after(element)
      break
      
      case 'append':
        $(options.target).append(element)
      break
      
      case 'prepend':
        $(options.target).prepend(element)
      break
    }

    return element
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
            
            var image = { 
                tag: 'img'
              , attr: {
                    id: b.id+'-thmb'
                  , src: b.images.low_resolution.url 
                  , alt: caption
                }
            }

            var loader = { 
                tag: 'div'
              , attr: {id: b.id+'-thmb-ldr', class: o.preload}
            }

            var link = {
                tag: 'a'
              , attr: {id: b.id+'-trigger', href: '#'+b.id+'-modal', 'data-toggle': 'modal' }
              , parent: true
              , children: Pongstgrm.prototype.tag(image)
            }

            var thumbnail = { 
                  tag: 'div'
                , attr: {class: 'thumbnail' }
                , parent: true
                , children: [Pongstgrm.prototype.tag(link), Pongstgrm.prototype.tag(loader)]
            }

            var column = {
                tag: 'div'
              , attr: { 'class': o.column }
              , append: 'append'
              , target: element
              , parent: true
              , children: Pongstgrm.prototype.tag(thumbnail)
            }

            Pongstgrm.prototype.tag(column)
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
    var newbtn = {
        tag: 'button'
      , attr: { 'data-paginate': options.show, 'class': options.button }
      , append: 'after'
      , target: $(element)
      , text: options.buttontext
    }
    
    $(element)
      .attr('data-type', options.show)
      .addClass('pongstgrm row')
      
    Pongstgrm.prototype.tag(newbtn)
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