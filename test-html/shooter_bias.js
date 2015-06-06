var ShooterBias = window.ShooterBias || {};


ShooterBias.get_and_show_slides = function() {
     ShooterBias.get_slides(ShooterBias.show_slides);
},

ShooterBias.get_slides = function(after) {

  $.ajax('/test-json//test.json').done(function( data ) {
    after(data);
  });

},

ShooterBias.show_slides = function(data) {

  console.log("waaaa");

  // todo do we get an array here or not?


  $.each(data[0].trials, function(){

      $.each(this.photos, function(){
        console.log(this.image_url);
        $('#photo_container').html("<img class='center-block' src='" +  this.image_url + "' />" );
      });

  });

}