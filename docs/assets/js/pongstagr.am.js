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
  
  var html = {
    
    gallery: function (element, pager) {
      var tgt = $(element);
      var btn = '<div class="row text-center"><button class="btn btn-success btn-lg col-xs-12 col-md-6 col-lg-2 col-lg-offset-5">more</button>';
      
      $(element).addClass('pongstagram row');

      if (pager === null || pager === true) {
        $(element).after(btn);
      }
      
      return true;
    }
    
    
    , modal: function (id,src,cpt) {
      var mdlhdr = '<div class="modal-header"></div>';
      var mdlbdy = '<div class="modal-body"><div id="'+id+'-lg-ldr" class="spinner"></div><img src="'+src+'" alt="'+cpt+'" id="'+id+'-lg"></div>';
      var mdlftr = '<div class="modal-footer"><button type="button" class="btn btn-small btn-primary" data-dismiss="modal">Close</button></div>';
      
      var modal  = '<div id="'+ id +'" class="modal fade" tabindex="-1" role="dialog">';
          modal += '<div class="modal-dialog">';
          modal += '<div class="modal-content">';
          modal += mdlbdy + mdlftr;
      
      $('body').append(modal);
      
      html.preload('#'+id+'-lg');
      
      $('#'+id).on('hidden.bs.modal', function () {
        $(this).remove();
      });
      
      return true;
    }
    
    
    , preload: function (imgid) {
      var $img = $(imgid);
      var  ttl = $img.length;
      var  spn = imgid+'-ldr';
      var  pre = 0;
      
      $img.hide();
      
      $img.load( function () {
        if ( ++pre === ttl ) {
          
          $img.fadeIn('normal');
          
          $(spn)
            .fadeOut('fast')
            .remove();
        }
      });
      
      return true;
    }
  }; 
  
  
  var instagram = {
    
      ajx: function (apiurl,target) {
        $.ajax({
            method   : "GET"   
          , url      : apiurl
          , cache    : true    
          , dataType : "jsonp" 
          , success  : function(data){
            
            $.each(data.data, function (a,b) {
              // MEDIA VARIABLES
              var mVideo     = (b.videos !== undefined ) ? b.videos.standard_resolution.url : ''
                , mLikes     = (b.likes.count !== null) ? b.likes.count : '0'
                , mComments  = (b.comments.count !== null) ? b.comments.count : '0'
                , mCaption   = (b.caption !== null) ? (b.caption.text !== null) ? 
                                   b.caption.text : '' : b.user.username;
              // THUMBNAIL BLOCK
              var thmbnail  = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">';
                  thmbnail += '<div class="thumbnail">';
                  thmbnail += '<div id="'+ b.id +'-thmb-ldr" class="spinner"></div>';
                  thmbnail += (b.type === 'video') ? '<i class="icon-play"></i>' : '';
                  thmbnail += '<img src="'+ b.images.low_resolution.url +'" alt="" id="'+ b.id +'-thmb" data-target="'+ b.id +'">';
                  thmbnail += '</div>';
                  thmbnail += '</div>';
              
              $(target).append(thmbnail);
              
              html.preload('#'+ b.id +'-thmb');
              
              $('[data-target="'+ b.id +'"]').on('click', function (e) {
                
                html.modal(b.id,b.images.standard_resolution.url,mCaption);
                
                $('#'+b.id).modal('show');
                
              });
            });
            instagram.pagr(data.pagination.next_url,target);
          }
        });

        return true;
      }


    , pagr: function (next,target) {
        if (next === undefined || next === null) {
          
          $('.btn').on('click', function (e) {
            
            e.preventDefault();
            
            $(this)
              .attr('disabled','disabled')
              .unbind(e);
            
          });
          
          return false;
          
        } else {
          
          $('.btn').on('click', function (e) {
            
            e.preventDefault();
            
            instagram.ajx(next,target);
            
            $(this).unbind(e);
          
          });
          
          return true;
        }
    }


    , rqst: function (request,count,id,token,target,pager) {
        var apiurl  = 'https://api.instagram.com/v1/users/';
        var more    = (request === null) ? 'recent' : request;
        var rcount  = (count !== null) ? 
          '?count=' +  count + '&access_token=' + token :
          '?count=' +    4   + '&access_token=' + token ;

        switch (request) {
          case "liked":
            var liked = apiurl + 'self/media/liked' + rcount;
            instagram.ajx(liked,target);
            break;
            
          case "feed":
            var feed = apiurl + 'self/feed' + rcount;
            instagram.ajax(feed,target);
            break;
            
          case "profile":
            break;
            
          case null:
          case "recent":
            var recent = apiurl + id + '/media/recent' + rcount;
            instagram.ajx(recent,target);
            break;
          
        }
        html.gallery(target,pager);
      }
  };
  
  
  function access (id, token) {
    if ( id !== null || token !== null ) {
      return true;
    } else {
      // console.log('Please check whether your Access ID and Access Token if it\'s valid.' );
      // console.log('You may visit http://instagram.com/developer/authentication/ for more info.');      
      return false;
    }
  }
  
  

  // PONGSTAGR.AM PLUGIN DEFINITON
  // =============================
  $.fn.pongstgrm = function (option) {
    var $this   = $(this)
      , options = $.extend({}, $.fn.pongstgrm.defaults, option);
    
    
    return this.each( function (i, element) {

      if ( access(options.accessId, options.accessToken) !== false ) {
        instagram.rqst(options.show,options.count,options.accessId,options.accessToken,element,options.pager);
      }
    });
  };  
  
  
  
  // PONGSTAGR.AM DEFAULT OPTIONS
  // ============================  
  $.fn.pongstgrm.defaults = {
  
    // USER AUTHENTICATION
      accessId:     null    // user id
    , accessToken:  null    // acccess token
    
    // DISPLAY OPTIONS
    , show:         null    // options: 'recent', 'feed', 'liked', 'user'
    , count:        null    // options: 1(min) - 40(max), instagram limits the maximum number of media to 40
    , pager:        null    // options: true or false (enables/disable load more button)
    , likes:        null    // options: true or false (enable/disable like count)
    , comments:     null    // options: true or false (enable/disable comment count)
  
  };


})(jQuery, window, document);