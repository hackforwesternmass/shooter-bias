<?php
/**
 * @file
 * json_endpoint.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function json_endpoint_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "services" && $api == "services") {
    return array("version" => "3");
  }
}
