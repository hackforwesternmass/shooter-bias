<html>

  <!-- /sites/all/themes/bootstrap/hackathon = drupal asset root -->
  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="/sites/all/themes/bootstrap/hackathon/shooter_bias.js"></script>
  <script src="../bower_components/tock/tock.js"></script>
  <script src="../bower_components/underscore/underscore.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  <script src="../bower_components/jquery.imgpreload/jquery.imgpreload.js"></script>
  <script src="../bower_components/mousetrap/mousetrap.js"></script>
  
   <script>
    ShooterBias.getAndShowSlides();
  </script>

  
  <link href="/sites/all/themes/bootstrap/hackathon/shooter_bias.css" rel="stylesheet" type="text/css"/>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

  <div id="shooter_container" class="container">
    <div id="photo_container">

     </div>

      <h3 class="text-center">Hit Key</h3>

      <div id="key_values" class="text-center">
      </div>

      <h4 id="countdown_time" class="text-center">
      </h4>

  </div>

  <div id="score_template" class="center-block">
    <h1 class="text-center">Score: </h1>

    <h2 class="text-center">
      {{score}}
    </h2>

    <h2 class="text-center">
      YOU {{winlose}}
    </h2>
  </div>
</html>