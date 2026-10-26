<?php
/**
 * Plugin Name: FFE — SEO
 * Description: Adds the trade fair as a schema.org ExhibitionEvent to Rank Math's JSON-LD graph on the homepage, so search engines can show its dates and venue (facts from the site copy; dates confirmed 16–18 Nov 2027). The Google Analytics tag is in ffe-consent.php (only after cookie consent). Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

// Since the switch (26 Oct 2026) the staging hostname is only Bunny's origin address (Bunny forwards Host: www), so a
// visitor or crawler arriving on it directly is sent to www. wp-admin, wp-login and the REST API (Novamira) still answer there.
add_action('template_redirect', function () {
  if (strtolower($_SERVER['HTTP_HOST'] ?? '') !== 'ffe-staging.ohmyweb.in' || wp_parse_url(home_url(), PHP_URL_HOST) === 'ffe-staging.ohmyweb.in') return;
  wp_redirect(home_url($_SERVER['REQUEST_URI'] ?? '/'), 301, 'FFE');
  exit;
}, 0);

add_filter('rank_math/json_ld', function ($data) {
  if (!is_front_page()) return $data;
  $home = home_url('/');
  $data['ffe_event'] = [
    '@type' => 'ExhibitionEvent',
    '@id' => $home . '#event',
    'name' => 'Fresh Food Expo Asia Pacific 2027',
    'alternateName' => 'FFE APAC 2027',
    'description' => "Asia Pacific's premier trade fair for fresh food, connecting fresh food, technology, logistics and distribution from farm to fork.",
    'url' => $home,
    'image' => [$home . 'wp-content/uploads/2026/10/ffe-g7-og.jpg'],
    'startDate' => '2027-11-16',
    'endDate' => '2027-11-18',
    'eventStatus' => 'https://schema.org/EventScheduled',
    'eventAttendanceMode' => 'https://schema.org/OfflineEventAttendanceMode',
    'inLanguage' => 'en',
    'location' => [
      '@type' => 'Place',
      'name' => 'Sands Expo & Convention Centre',
      'address' => ['@type' => 'PostalAddress', 'streetAddress' => '10 Bayfront Avenue', 'addressLocality' => 'Singapore', 'postalCode' => '018956', 'addressCountry' => 'SG'],
    ],
    'organizer' => ['@type' => 'Organization', 'name' => 'Messe Berlin Asia Pacific', 'url' => 'https://www.messe-berlin.asia/'],
  ];
  return $data;
}, 99);
