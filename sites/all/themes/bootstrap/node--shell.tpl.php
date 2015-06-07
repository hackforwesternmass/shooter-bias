<?php

drupal_add_js(array(
  'myModule' => array(
    'csrfToken' => drupal_get_token(),
    )
  ), 
  'setting'
);

?>

<p>Drop the JS app HTML in here, sites/all/themes/bootstrap/node--shell.tpl.php</p>

<p>Add any assets to sites/all/themes/bootstrap/hackathon</p>

<p>Change asset URLs to /sites/all/themes/bootstrap/hackathon/[asset]</p>

<p>Otherwise all of our work will be completely destroyed if someone tries to update Drupal without us there to tell them how to save it :(</p>

<p>API auth token can be loaded from GET /services/session/token and used for session auth (https://groups.drupal.org/node/358308)</p>

<p>POST request to results create endpoint example:</p>

<pre>
  // Psuedocode - This needs to have the correct callback to actually set the var
  token = jQuery.get('/services/session/token');

  jQuery.ajax({
    type: "POST",
    url: '/api/tests/create',
    data: {
      "node": {
        "type":"page",
        "title":"Page submitted via entity JSON REST",
        "body": {
            "value": "<p>test</p>\n",
            "format": "filtered_html"
        }
      }
    },
    contentType: 'application/json',
    beforeSend: function(xhr, settings){
      xhr.setRequestHeader("X-CSRF-Token", token);
    }
  });
</pre>