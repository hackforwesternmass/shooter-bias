var ShooterBias = window.ShooterBias || {};

ShooterBias.CURRENT_TEST = {},

ShooterBias.CAN_STILL_HIT_KEY = false,

ShooterBias.CURRENT_SCORE = 0,

ShooterBias.HIT_KEY = false,

ShooterBias.SCORE_TEXT = "",

ShooterBias.TEST_RESULTS = [],

ShooterBias.CURRENT_TIMER = {},

ShooterBias.CURRENT_TIME = {},

ShooterBias.CURRENT_REACTION_ID = 0,

ShooterBias.KEY_PRESSED = '',

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

// utility function to get reactions from a key
ShooterBias.getReactionFromKey = function(reactions, key) {
    console.log("getReactionFromKey");
    for (i = 0; i < reactions.length; i++) {
        var reaction = reactions[i];
        if(reaction.key == key){
            return reaction;
        }
    }
    return null;
},

ShooterBias.showSlides = function(data) {

    console.log("showing slides");

    // TODO do we get an array of tests here or not?

    // render our reaction keys on screen:
    // TODO description of those keys?
    var possibleReactions = data[0].reactions;

    for (i = 0; i < possibleReactions.length; i++) {
        $('#key_values').append("<b> " + possibleReactions[i].key + "</b> ");
        if (i != possibleReactions.length - 1) {
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
                            ShooterBias.HIT_KEY = false;
                            ShooterBias.SCORE_TEXT = "ARE TOO SLOW";
                            var currentPhoto = ShooterBias.getPhotoFromUrl(trialPhotos, $(img).attr('src'));
                            ShooterBias.watchKeys(possibleReactions, currentPhoto);
                        }


                        // calls complete after 600ms
                        ShooterBias.CURRENT_TIMER = new Tock({
                            countdown: true,
                            interval: 10,
                            complete: function() {

                                ShooterBias.CAN_STILL_HIT_KEY = false;

                                // actually show next image 
                                ShooterBias.showSlide(img);


                                // if there are more images to show, call showNextImage
                                if (cached_imgs.length > 0) {
                                    showNextImage();
                                } else {


                                    // // if a key wasn't pressed, say too slow
                                    // if (ShooterBias.CAN_STILL_HIT_KEY && !ShooterBias.HIT_KEY) {
                                    //     console.log("didnt hit a key at all");
                                    //     ShooterBias.SCORE_TEXT = "ARE TOO SLOW";
                                    // }

                                    // show score
                                    ShooterBias.showScore();

                                    var performedReaction = ShooterBias.getReactionFromKey(possibleReactions, ShooterBias.KEY_PRESSED);

                                    ShooterBias.saveResult(trial.id, (performedReaction ? performedReaction.id : "0") , ShooterBias.CURRENT_TIME);

                                    // otherwise start another trial here    
                                    if (allTrials.length > 0) {
                                        runNextTrial();
                                    }


                                }
                            },
                            callback: function() {
                                // the timer in ui is updated at an increment via this callback
                                var current_time = ShooterBias.CURRENT_TIMER.msToTime(ShooterBias.CURRENT_TIMER.lap());
                                $('#countdown_time').html(current_time);
                            },
                        });
                    }

                    ShooterBias.CURRENT_TIMER.start(600);
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

// watch the keystrokes using mousetrap 
ShooterBias.watchKeys = function(reactions, photo) {


    // iterate through all of the possible reaction keys
    for (i = 0; i < reactions.length; i++) {

        var currentReaction = reactions[i];

        // iterate through the values for our reactions and bind a positive or negative outcome to the key
        for (rvindex = 0; rvindex < photo.reactions_values.length; rvindex++) {
            var reactionValue = photo.reactions_values[rvindex];
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


// increment or decrement the score and show it
ShooterBias.positiveKey = function(e) {

    console.log("KEY " + e);

    if (ShooterBias.CAN_STILL_HIT_KEY) {
        // only allow a key hit once 
        ShooterBias.CURRENT_TIME = ShooterBias.CURRENT_TIMER.msToTime(ShooterBias.CURRENT_TIMER.lap());
        ShooterBias.CAN_STILL_HIT_KEY = false;
        ShooterBias.HIT_KEY = true;
        ShooterBias.CURRENT_SCORE = ShooterBias.CURRENT_SCORE + 1;
        ShooterBias.SCORE_TEXT = "WON";
    }
    console.log("positiveKey");
},

ShooterBias.negativeKey = function(e) {

     console.log("KEY " + e);

    if (ShooterBias.CAN_STILL_HIT_KEY) {
        // only allow a key hit once 
        ShooterBias.CURRENT_TIME = ShooterBias.CURRENT_TIMER.msToTime(ShooterBias.CURRENT_TIMER.lap());
        ShooterBias.CAN_STILL_HIT_KEY = false;
        ShooterBias.HIT_KEY = true;
        ShooterBias.SCORE_TEXT = "LOST";
    }

    console.log("negativeKey");

},

ShooterBias.showScore = function() {
    score = $('#score_template').clone();
    score_html = $(score).html();
    score_html = score_html.replace("{{score}}", ShooterBias.CURRENT_SCORE);
    score_html = score_html.replace("{{winlose}}", ShooterBias.SCORE_TEXT);
    $('#photo_container').html(score_html);
},

ShooterBias.saveResult = function(trialId, reactionId, totalTime) {

    console.log("trial = " + trialId + "react = " + reactionId + "total= " +  totalTime);
    // put our results into drupal names:
    ShooterBias.TEST_RESULTS.push({
        "field_reaction_id": reactionId,
        "field_trial_id": trialId,
        "field_reaction_time" : totalTime
    });
}


// between trials show score

// only catch keys on last photo 

// between screens tell if timed out

// editable milliseconds TODO