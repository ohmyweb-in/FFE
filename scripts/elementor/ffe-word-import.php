<?php
/**
 * Plugin Name: FFE Word import
 * Description: Posts > Import from Word: an editor turns a finished .docx press release into a draft post, formatted like any other:
 * title, headings, paragraphs, bold/italic, links, lists, quotes (Word's Quote style, with the speaker as the citation), photos uploaded
 * to the Media Library (the first is the Featured image with its caption), and the "About…"/media-contact sections left out because
 * the article template already shows them. The conversion runs in the editor's browser (mammoth.js 1.13.0, BSD-2, hosted here) and
 * WordPress's own paste conversion (wp.blocks.rawHandler); nothing is sent anywhere else. Deployed to wp-content/mu-plugins/ with
 * ffe-word-import.js and mammoth.browser.min.js; this copy in scripts/elementor/ is the record.
 */

if (!defined('ABSPATH')) exit;

// Posts > Import from Word: a new post that opens the import window.
add_action('admin_menu', function () {
  add_submenu_page('edit.php', 'Import from Word', 'Import from Word', 'edit_posts', 'post-new.php?ffe_import=1', '', 2);
});

add_action('enqueue_block_editor_assets', function () {
  $screen = function_exists('get_current_screen') ? get_current_screen() : null;
  if (!$screen || $screen->post_type !== 'post' || !current_user_can('upload_files')) return;
  $v = fn($f) => file_exists(WPMU_PLUGIN_DIR . "/$f") ? filemtime(WPMU_PLUGIN_DIR . "/$f") : null;
  wp_register_script('ffe-mammoth', WPMU_PLUGIN_URL . '/mammoth.browser.min.js', [], $v('mammoth.browser.min.js'), true);
  wp_enqueue_script('ffe-word-import', WPMU_PLUGIN_URL . '/ffe-word-import.js',
    ['ffe-mammoth', 'react', 'wp-plugins', 'wp-editor', 'wp-components', 'wp-element', 'wp-data', 'wp-blocks', 'wp-api-fetch', 'wp-notices'], $v('ffe-word-import.js'), true);
  wp_add_inline_script('ffe-word-import', 'window.ffeWordImport = ' . wp_json_encode(['open' => !empty($_GET['ffe_import'])]) . ';', 'before');
});
