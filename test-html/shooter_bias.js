var ShooterBias = window.ShooterBias || {};

// underscores. because i normally write coffeescript.

ShooterBias.get_and_show_slides = function() {
    ShooterBias.get_slides(ShooterBias.show_slides);
},

ShooterBias.get_slides = function(after) {
    console.log("getting slides");
    $.ajax('/test-json//test.json').error(function() {
        alert("An error occurred when getting test json");
    }).done(function(data) {
        after(data);
    });


},

ShooterBias.show_slides = function(data) {

    console.log("showing slides");

    // TODO do we get an array of tests here or not?

    // render our reaction keys 
        // TODO description of those keys?
    var reactions = data[0].reactions;

    for( i = 0; i < reactions.length; i++){
  
      $('#key_values').append("<b> " + reactions[i].key + "</b> ");
      if(i != reactions.length -1){
         $('#key_values').append("  OR "); 
      }
      // console.log("key = " + this.key);
    }

    // for each trial 
    $.each(data[0].trials, function() {

        // get an array of just the photo urls
        var just_urls = [];
        $.each(this.photos, function() {
            just_urls.push(this.image_url);
        });

        // reverse the array because we pop
        just_urls = just_urls.reverse();


        // preload the images
        $.imgpreload(just_urls, {

            // called when all are loaded 
            all: function() {

                // "this" is an an array of IMG tags after precaching
                 var cached_imgs = this;

              
                // this function calls itself between 600ms intervals
                var show_next_image = function() {

                    var img = cached_imgs.pop();


                    // calls complete after 600ms
                    var timer = new Tock({
                        countdown: true,
                        interval: 10,
                        complete: function() {

                            // if is last image capture keys
                            if (cached_imgs.length == 1) {
                                ShooterBias.watch_keys();
                            }

                            // show next image 
                            ShooterBias.show_slide(img);
                            console.log(img);


                            // start another trial here TOOD



                            // show score here TOOD



                            // 
                            if (cached_imgs.length > 0) {
                                show_next_image();
                            }

                        },

                        callback: function() {
                            var current_time = timer.msToTime(timer.lap());
                            $('#countdown_time').html(current_time);
                        },
                    });
                    timer.start(600);
                }

                show_next_image();
            }
        });
    });

},



ShooterBias.show_slide = function(image) {

    
    $(image).addClass('center-block');   
    $('#photo_container').html(image);
     console.log("showing " + image);
},

ShooterBias.watch_keys = function() {


    Mousetrap.bind('s', function() {
        console.log("ima keybinding")
    });
    Mousetrap.bind('k', function() {
        console.log("ima keybinding")
    });

}


// between trials show score


// only catch keys on last photo 

// between screens tell if timed out


// editable milliseconds