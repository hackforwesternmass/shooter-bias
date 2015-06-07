<?php
/**
 * @file
 * json_endpoint.services.inc
 */

/**
 * Implements hook_default_services_endpoint().
 */
function json_endpoint_default_services_endpoint() {
  $export = array();

  $endpoint = new stdClass();
  $endpoint->disabled = FALSE; /* Edit this to true to make a default endpoint disabled initially */
  $endpoint->api_version = 3;
  $endpoint->name = 'json_output';
  $endpoint->server = 'rest_server';
  $endpoint->path = 'api';
  $endpoint->authentication = array(
    'services' => 'services',
  );
  $endpoint->server_settings = array();
  $endpoint->resources = array(
    'node' => array(
      'operations' => array(
        'create' => array(
          'enabled' => '1',
        ),
      ),
    ),
    'tests' => array(
      'operations' => array(
        'retrieve' => array(
          'enabled' => '1',
        ),
        'create' => array(
          'enabled' => '1',
        ),
      ),
    ),
  );
  $endpoint->debug = 0;
  $export['json_output'] = $endpoint;

  return $export;
}
