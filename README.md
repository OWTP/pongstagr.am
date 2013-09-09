Pongstagr.am
==============================================
Pongstagr.am is a jquery plugin that lets you display your instagram media to your website.

---------

#### Plugin Requirements

1. Instagram Account.
2. Latest version of [jquery](http://jquery.com).
3. [Bootstrap](http://getbootstrap.com) front-end framework.

---------

#### How to Use:

1. Get your Instagram **[User ID](http://jelled.com/instagram/lookup-user-id)**.
2. Get your Instagram **[Access Token](http://jelled.com/instagram/access-token)**.
3. Then, Initialize **jquery** and **bootstrap js** + **css**

```html
<!doctype html>
<html lang="en">
<head>

  ...

  <!-- Stylesheets: Bootstrap CSS | Pongstagr.am CSS -->
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="/path/to/css/pongstagr.am.css">

</head>
<body>

  ...

  <!-- Plugin Dependancies: jQuery | Bootstrap JS -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>  

  <!-- Load the plugin first before calling it -->
  <script src="/path/to/js/pongstagr.am.js"></script>
  <script>
     $(document).ready(function () {

         $('.your-selector-here').pongstgrm({
            accessId:    'your-user-id'
            accessToken: 'your-access-token'
         });

     });
  </script>

</body>
</html>
```
---------

#### Plugin Options:

```javascript
{
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
  , likeico:    'glyphicon glyphicon-heart'
  , videoico:   'glyphicon glyphicon-play'
  , commentico: 'glyphicon glyphicon-comment'
  , preload:    'spinner'
  , button:     'btn btn-lg btn-success'
  , buttontext: 'Load more'
}
```
---------

### Examples:

- [Recent Media](http://pongstr.github.io/pongstagr.am/examples/bootstrap-recent/)
- [Liked Media](http://pongstr.github.io/pongstagr.am/examples/bootstrap-liked/)
- [User Feed Media](http://pongstr.github.io/pongstagr.am/examples/bootstrap-feed/)

---------

### Acknowledgements 
- **[Bootstrap](http://twitter.github.io/bootstrap/)** is created by [@mdo](http://twitter.com/mdo) &amp; [@fat](http://twitter.com/fat)

---------

### Pongstagr.am Plugin License 

Free to use under [MIT License](http://opensource.org/licenses/MIT).

```
Copyright (c) 2013 Pongstr Ordillo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```