<?php

function my_module_services_resources() {
 $api = array(
   'tests' => array(
     'operations' => array(
       'retrieve' => array(
         'help' => 'JSON tests endpoint',
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
       'create' => array(
         'help' => 'JSON test result save',
         'callback' => '_my_module_test_save',
         'access callback' => 'user_access',
         'access arguments' => array('create result content'),
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

function _my_module_test_save($fn) {

	return 'hello';
}


function _my_module_test($fn) {

	$node = db_select('node', 'n')
    ->fields('n')
    ->condition('type', 'test','=')
    ->condition('status', 0,'>')
    ->orderBy('created', 'DESC')
    ->execute()
    ->fetchAssoc();

    $test = node_load($node['nid']);
    // each response option
    $response_options = [];
    foreach ($test->field_response_options['und'] as $tid){
		$response_options[] = taxonomy_term_load($tid['target_id']);
	}

    // each trial node
    $trials = [];
    foreach ($test->field_trials['und'] as $nid){
		$trials[] = node_load($nid['target_id']);
	}

	$returnable = [
		'test' => $test,
		'response_options' => $response_options,
		'trials' => $trials
	];
  
	return $returnable;

}
