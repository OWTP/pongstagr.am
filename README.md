Pongstagr.am
==============================================
by Pongstr [twiz.tickler@gmail.com | www.pongstr.com ]

Pongstagr.am is a jquery plugin that lets you display your instagram media to your website.


---------

#### Plugin Requirements

1. Instagram account, User ID and Access Token.
2. jQuery 1.10.2 (or jQuery 1.9.1 will also do).
3. Bootstrap JS, actually Bootstrap Modal and its dependancies.


---------

#### Usage:

1. User ID - If you have zero idea what your user id is, you may head to this 
   [link](http://jelled.com/instagram/lookup-user-id).

2. Access Token - If you have zero idea what your access token is, you may head to this
   [link](http://jelled.com/instagram/access-token) make sure you follow the instructions 
   on the ***How do I get my client id?*** link. 

3. **jquery** must be initialised first and so as **bootstrap.js** plugins:

```html
<script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
<script src='path/to/js/bootstrap.min.js'></script>  
<script src='path/to/js/pongstagr.am.js'></script>  
```



Display recently uploaded media (displays 8 images):
  
```javascript
$('div#selector').pongstgrm({
    accessId     : YourAccessID,
    accessToken  : YourAccessToken
});
  ```

---------

#### Other options:
  
  
```javascript
show       : null,    // string,  options: 'recent', 'feed', 'liked', 'user'
count      : null,    // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
likes      : null,    // boolean, options: true or false (enable/disable like icon and count)
comments   : null     // boolean, options: true or false (enable/disable comments icon and count)
```


---------

#### Usage Example:

```html
<script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
<script src='//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc2/js/bootstrap.min.js'></script>
<script src='path/to/js/pongstagr.am.js'></script>

<script>
$(document).ready(function(){
  
  $('selector').pongstgrm({
    accessId    : YourAccessID,
    accessToken : YourAccessToken,
    show        : 'liked',
    count       : 8,
    pager       : true,
    likes       : true,
    comments    : true
  });
  
});
</script>
```

---------

#### Acknowledgements 
  
  - **[Bootstrap](http://twitter.github.io/bootstrap/)** is created by [@mdo](http://twitter.com/mdo) &amp; [@fat](http://twitter.com/fat)
  - **[Bootstrap-Sass](https://github.com/thomas-mcdonald/bootstrap-sass)** is created by [Thomas McDonald](https://github.com/thomas-mcdonald)
  - **[Font Awesome](http://fontawesome.io/)** is created and maintain by [@davegandy](http://twitter.com/davegandy)

---------

**Free to use, Code license under [Apache v2.0](http://www.apache.org/licenses/LICENSE-2.0).**

```
Copyright 2013 (c) Pongstr Ordillo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
