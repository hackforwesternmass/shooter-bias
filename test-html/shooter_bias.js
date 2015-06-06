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

    // todo do we get an array of tests here or not?

    // render our keys 
    var reactions = data[0].reactions;

    for( i = 0; i < reactions.length; i++){
      $('#key_values').append("<b>" + this.key + " </b> ");
      if(i != reactions.length -1){
         $('#key_values').append("OR"); 
      }
      console.log("key = " + this.key);
    }


    $.each(data[0].trials, function() {

        // get an array of the urls
        var just_urls = [];
        $.each(this.photos, function() {
            just_urls.push(this.image_url);
        });

        // reversing the array because we pop
        just_urls = just_urls.reverse();

        // preload the images
        $.imgpreload(just_urls, {
            all: function() {

                // called when all are loaded 

                var do_image_show = function() {

                    var url = just_urls.pop();

                    // every 600 ms we will show an image:
                    var timer = new Tock({
                        countdown: true,
                        interval: 10,
                        complete: function() {

                            // if is last image capture keys
                            if (just_urls.length == 1) {
                                ShooterBias.watch_keys();
                            }

                            // show next image 
                            ShooterBias.show_slide(url);

                            // start another trial 

                            // show score 

                            if (just_urls.length > 0) {
                                do_image_show();
                            }

                        },

                        callback: function() {
                            var current_time = timer.msToTime(timer.lap());
                            $('#countdown_time').html(current_time);
                        },
                    });
                    timer.start(600);
                }

                do_image_show();
            }
        });
    });

},



ShooterBias.show_slide = function(image_url) {
    console.log("showing " + image_url);
    $('#photo_container').html("<img class='center-block' src='" + image_url + "' />");
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