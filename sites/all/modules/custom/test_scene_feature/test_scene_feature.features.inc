<?php
/**
 * @file
 * test_scene_feature.features.inc
 */

/**
 * Implements hook_node_info().
 */
function test_scene_feature_node_info() {
  $items = array(
    'test_scene' => array(
      'name' => t('test_scene'),
      'base' => 'node_content',
      'description' => t('Base content type for Shooter Bias. '),
      'has_title' => '1',
      'title_label' => t('Stimulus'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
