var ShooterBias = window.ShooterBias || {};


ShooterBias.CURRENT_TEST = {},

ShooterBias.CAN_STILL_HIT_KEY = false,

ShooterBias.getAndShowSlides = function() {
    ShooterBias.getSlides(ShooterBias.showSlides);
},

ShooterBias.getSlides = function(after) {
    console.log("getting slides");
    $.ajax('/test-json//test.json').error(function() {
        alert("An error occurred when getting test json");
    }).done(function(data) {
        after(data);
    });


},

// utility function to get a photo froom an array of photos based on it's url 
ShooterBias.getPhotoFromUrl = function(photos, url) {
    for (i = 0; i < photos.length; i++) {
        var photo = photos[i];
        if (photo.image_url == url) {
            return photo;
        }
    }
    return null;
},

ShooterBias.showSlides = function(data) {

    console.log("showing slides");

    // TODO do we get an array of tests here or not?


    // render our reaction keys on screen:
    // TODO description of those keys?
    var reactions = data[0].reactions;

    for (i = 0; i < reactions.length; i++) {
        $('#key_values').append("<b> " + reactions[i].key + "</b> ");
        if (i != reactions.length - 1) {
            $('#key_values').append("  OR ");
        }
    }


    var allTrials = data[0].trials;

    // this function gets called recursively until there are no trials to be run
    var runNextTrial = function() {

        var trial = allTrials.pop();
        var trialPhotos = trial.photos;

        // get an array of just the photo urls
        var just_urls = [];
        $.each(trialPhotos, function() {
            just_urls.push(this.image_url);
        });


        // reverse the array because we pop
        just_urls = just_urls.reverse();


        // preload the images
        $.imgpreload(just_urls, {

            // called when all images are preloaded 
            all: function() {

                // "this" is an an array of IMG tags after preloading
                var cached_imgs = this;


                // this function calls itself between 600ms intervals
                var showNextImage = function() {


                    // pop next image off of the array
                    var img = cached_imgs.pop();
                    if (img != undefined) {


                        // if this is the last image in array, capture key strokes:
                        if (cached_imgs.length == 0) {
                            showLast = true;
                            ShooterBias.CAN_STILL_HIT_KEY = true;
                            var currentPhoto = ShooterBias.getPhotoFromUrl(trialPhotos, $(img).attr('src'));
                            ShooterBias.watchKeys(reactions, currentPhoto);
                        }


                        // calls complete after 600ms
                        var timer = new Tock({
                            countdown: true,
                            interval: 10,
                            complete: function() {

                                console.log("timer complete");
                                ShooterBias.CAN_STILL_HIT_KEY = false;

                                // show next image 
                                ShooterBias.showSlide(img);


                                // if there are more images to show, call showNextImage
                                if (cached_imgs.length > 0) {
                                    showNextImage();
                                } else {

                                    // otherwise start another trial here    
                                    if (allTrials.length > 0) {
                                        runNextTrial();
                                    }
                                }
                            },
                            callback: function() {
                                // the timer in ui is updated at an increment via this callback
                                var current_time = timer.msToTime(timer.lap());
                                $('#countdown_time').html(current_time);
                            },
                        });
                    }

                    timer.start(600);
                }
                showNextImage(); // show first images
            }
        });
    }

    runNextTrial(); // run first trial
},


ShooterBias.showSlide = function(image) {
    $(image).addClass('center-block');
    $('#photo_container').html(image);
},


// here we watch the keystrokes using mousetrap 
ShooterBias.watchKeys = function(reactions, photo) {

    console.log("watchKeys");

    // iterate through all of the possible reaction keys
    for (i = 0; i < reactions.length; i++) {


        var currentReaction = reactions[i];

        // iterate through the values for our reactions and bind a positive or negative outcome to the key
        for (x = 0; x < photo.reaction_values; x++) {

            var reactionValue = photo.reaction_values[x];
            if (reactionValue.reaction_id == currentReaction.id) {
                if (reactionValue.is_positive) {
                    Mousetrap.bind(currentReaction.key, ShooterBias.positiveKey);
                } else {
                    Mousetrap.bind(currentReaction.key, ShooterBias.negativeKey);
                }
            }
        }
    }

},


// here we will increment or decrement the score and show it
ShooterBias.positiveKey = function() {

    if (ShooterBias.CAN_STILL_HIT_KEY) {

        // only allow a key hit once 
        ShooterBias.CAN_STILL_HIT_KEY = false;


        console.log("show score!");

        // TODO add to score here...

    } else {


        // TODO show too slow 

        console.log("showing too slow");

    }
    console.log("positiveKey");
},

ShooterBias.negativeKey = function() {
    console.log("positiveKey");
}


// between trials show score


// only catch keys on last photo 

// between screens tell if timed out


// editable milliseconds TODO