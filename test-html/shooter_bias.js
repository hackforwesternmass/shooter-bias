var ShooterBias = window.ShooterBias || {};

// underscores. because i normally write coffeescript.

ShooterBias.current_test = function(){}, 

ShooterBias.get_and_show_slides = function() {
     ShooterBias.get_slides(ShooterBias.show_slides);
},

ShooterBias.get_slides = function(after) {

  $.ajax('/test-json//test.json').done(function( data ) {
    after(data);
  });

},

ShooterBias.show_slides = function(data) {

  // todo do we get an array of tests here or not?

  $.each(data[0].trials, function(){


    // get an array of the urls
    var just_urls = [];
    $.each(this.photos, function(){
      just_urls.push(this.image_url);
    });

    // preload the images
    $.imgpreload(just_urls,
    {
        each: function()
        {

        },
        all: function()
        {
          console.log("All images have beem preloaded!");
        }
    });


  });

}, 

ShooterBias.show_slide = function(image_url) {
   $('#photo_container').html("<img class='center-block' src='" +  image_url + "' />" ); 
},

ShooterBias.watch_keys = function() {


  Mousetrap.bind('s', function() { console.log("ima keybinding") });
  Mousetrap.bind('k', function() { alert.log("ima keybinding") });



}


// between screens show score


// between screens tell if timed out


// editable milliseconds 






