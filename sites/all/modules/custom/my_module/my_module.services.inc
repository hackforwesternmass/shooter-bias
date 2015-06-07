<?php

function my_module_services_resources() {
 $api = array(
   'tests' => array(
     'operations' => array(
       'retrieve' => array(
         'help' => 'Drupal 7 Services 3 test',
         'callback' => '_my_module_test',
         'access callback' => 'user_access',
         'access arguments' => array('access content'),
         'access arguments append' => FALSE,
         'args' => array(
           array(
             'name' => 'fn',
             'type' => 'string',
             'description' => 'Function to perform',
             'source' => array('path' => '0'),
             'optional' => TRUE,
             'default' => '0',
           ),
         ),
       ),
     ),
   ),
 );
  return $api;
}

function _my_module_test($fn) {

	$node = db_select('node', 'n')
    ->fields('n')
    // ->condition('type', 'test','=')
    ->condition('status', 0,'>')
    ->orderBy('created', 'DESC')
    ->execute()
    ->fetchAssoc();


  return node_load($node['nid']);

}
