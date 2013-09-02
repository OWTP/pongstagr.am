/* ==========================================================================
 * jQuery Pongstagr.am Plugin v2.0.8
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo
 *
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.10.1 and Bootstrap 3.0
 * ========================================================================= */

+function ($) { "use strict";
  

  // PRIVATE METHODS
  // =============================


  var Pongstgrm = {

    defaults: {
      
        // USER AUTHENTICATION
          accessId:     null    // user id
        , accessToken:  null    // acccess token
        
        // DISPLAY OPTIONS
        , show:         null    // options: 'profile', 'recent', 'feed', 'liked', 'user'
        , count:        null    // options: 1(min) - 40(max), instagram limits the maximum number of media to 40
        , likes:        null    // options: true or false (enable/disable like count)
        , comments:     null    // options: true or false (enable/disable comment count)
      
      }    
    
    , container: function (element,show) {
        var btn = $('<button />').attr({
            'data-paginate': show
          , 'class': 'btn btn-block btn-success'
        }).text('Load more')
        
        $(element)
          .attr('data-type', show)
          .addClass('pongstgrm row')
          .append(btn)
        
        return
      }


      /* Authentication */
    , access: function (id1,id2) {
        var access = (id1 !== null || id2 !== null) ? true : false
        return access
      }


      /* Request */
    , request: function (request,count,id,token,target) {
        var apiurl = 'https://api.instagram.com/v1/users/'
        var rcount = (count !== null) ? 
          '?count=' +  count + '&access_token=' + token :
          '?count=' +    4   + '&access_token=' + token
        
        switch (request) {
          case "liked":
          var liked = apiurl + 'self/media/liked' + rcount
          break
          
          case "feed":
          var feed = apiurl + 'self/feed' + rcount
          break
          
          case "profile":
          var profile = apiurl + id + '?access_token=' + token
          break
          
          case "recent":
          case null:
          var recent = apiurl + id + '/media/recent' + rcount
          this.ajx(recent,target)
          break
        }
        
        this.container(target,request)
        return
      }


      /* Ajax */
    , ajx: function (apiurl,target) {
        var self = this
        
        $.ajax({
            method   : "GET"   
          , url      : apiurl
          , cache    : true    
          , dataType : "jsonp" 
          , success  : function(data){
            
            $.each(data.data, function (a,b) {
              
            })
            
          }
        })
        
        return
      }


      /* Load more */
    , more: function (next,target) {
        var btn = 'test'
        
        if (next === undefined || next === null) {
          $(btn).on('click', function (e) {
            e.preventDefault()
            
            $(this)
              .attr('disabled','disabled')
              .unbind(e)
          })
          
          return false
        } else {
          $(btn).on('click', function (e) {
            e.preventDefault()
            
            $(this).unbind(e)
          })
          
          return true
        }
        
      }


      /* Preload image */
    , preload: function (imgid) {
        var $img = $(imgid)
        var  ttl = $img.length
        var  spn = imgid+'-ldr'
        var  pre = 0
        
        $img.hide().load(function () {
          if (++pre === ttl) {
            $img.fadeIn()
            $spn.fadeOut().remove()
          }
        })
        
        return      
      }
  }



  // PONGSTAGR.AM PLUGIN DEFINITON
  // =============================
  
  $.fn.pongstgrm = function (option) {
    var opt = $.extend({}, Pongstgrm.defaults, option)

    return this.each(function () {
      var subj = $(this)[0]

      if(Pongstgrm.access(opt.accessId,opt.accessToken) !== null) {
        Pongstgrm.request(opt.show,opt.count,opt.accessId,opt.accessToken,subj)
      }
    })
  }




  // PONGSTAGR.AM DEFAULT OPTIONS
  // ============================  
  
  // $.fn.pongstgrm.defaults = {
  
  //   // USER AUTHENTICATION
  //     accessId:     null    // user id
  //   , accessToken:  null    // acccess token
    
  //   // DISPLAY OPTIONS
  //   , show:         null    // options: 'profile', 'recent', 'feed', 'liked', 'user'
  //   , count:        null    // options: 1(min) - 40(max), instagram limits the maximum number of media to 40
  //   , likes:        null    // options: true or false (enable/disable like count)
  //   , comments:     null    // options: true or false (enable/disable comment count)
  
  // }


}(window.jQuery);