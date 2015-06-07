<?php
/**
 * @file
 * hackathon_content_types.features.inc
 */

/**
 * Implements hook_node_info().
 */
function hackathon_content_types_node_info() {
  $items = array(
    'test' => array(
      'name' => t('Test'),
      'base' => 'node_content',
      'description' => t('Top-level test type'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'trial' => array(
      'name' => t('Trial'),
      'base' => 'node_content',
      'description' => t('Trials contain multiple images'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
