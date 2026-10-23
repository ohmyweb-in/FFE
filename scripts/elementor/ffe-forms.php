<?php
/**
 * Plugin Name: FFE — form routing
 * Description: The contact form's "Enquiry Type" picks the inbox, as bunny/contact-form.ts TEAMS does. Only whitelisted keys route; anything else keeps the form's own "to". Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

// The select's option values are these keys, never addresses, so the site can't be used to mail anyone else.
const FFE_TEAMS = [
  'marketing' => 'marketing@freshfoodexpoapac.com', 'exhibitor' => 'exhibitor@freshfoodexpoapac.com',
  'visitor' => 'visitor@freshfoodexpoapac.com', 'conference' => 'conference@freshfoodexpoapac.com',
  'buyers' => 'buyers@freshfoodexpoapac.com', 'media' => 'media@freshfoodexpoapac.com',
];

// $form_data is keyed by the posted field's ELEMENT id, not its name: the Enquiry Type select is element ct-f-team (forms.js select("team", { p: "ct" })).
// Route on the field whose key is "team" or ends in "-team", and only when its value is a whitelisted key; anything else keeps the form's own "to".
add_filter('elementor_pro/atomic_forms/email_headers', function ($headers, $form_data, $settings) {
  $to = null;
  foreach ((array) $form_data as $key => $value) {
    $key = (string) $key;
    if (($key === 'team' || str_ends_with($key, '-team')) && is_string($value) && isset(FFE_TEAMS[$value])) { $to = FFE_TEAMS[$value]; break; }
  }
  $GLOBALS['ffe_team_to'] = $to;
  return $headers;
}, 10, 3);

// Runs right after, in the same email action: swap the recipient once, then forget it.
add_filter('wp_mail', function ($args) {
  if (!empty($GLOBALS['ffe_team_to'])) { $args['to'] = $GLOBALS['ffe_team_to']; $GLOBALS['ffe_team_to'] = null; }
  return $args;
});
