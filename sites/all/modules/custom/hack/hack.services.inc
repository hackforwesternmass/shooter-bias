<?php

function hack_services_resources() {
  $resources = array(
    'hack_resources' => array(
      'actions' => array(
        'get_user_count' => array(
          'help' => t('Gets a count of users.'),
          'file' => array(
            'type' => 'inc',
            'module' => 'hack',
            'name' => 'hack.resource',
          ),
          'callback' => 'hack_get_user_count',
          'args' => array(),
          'access callback' => '_drupalgap_resource_access',
          'access callback file' => array(
            'type' => 'inc',
            'module' => 'drupalgap',
            'name' => 'drupalgap.resource',
          ),
          'access arguments' => array('access user profiles'),
          'access arguments append' => TRUE,
        ),
      ),
    ),
  );
  return $resources;
}