<?php
/**
 * Plugin Name: FFE — security
 * Description: Keeps login names out of public responses (the REST user list and oEmbed author fields), so a password-guessing bot has to guess the username too. Logged-in editors (Elementor, Novamira) still get the user list. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

add_filter('rest_endpoints', function ($endpoints) {
  if (is_user_logged_in()) return $endpoints;
  unset($endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)']);
  return $endpoints;
});

add_filter('oembed_response_data', function ($data) {
  unset($data['author_name'], $data['author_url']);
  return $data;
});
