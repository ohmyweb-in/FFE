<?php
/**
 * Plugin Name: FFE — SEO
 * Description: Structured data and head tidy-ups. Adds to Rank Math's JSON-LD: the trade fair as a schema.org ExhibitionEvent and the organiser on the homepage (dates confirmed 16–18 Nov 2027); on every other page a full @graph (Organization, WebSite, WebPage, BreadcrumbList), a NewsArticle for each child of /news/ (so duplicated press-release pages get it automatically) and an ImageGallery with an ImageObject per photo for each child of /gallery/ (photo list read from the page's Elementor data). Rank Math's own graph is empty there because pages are set to no default rich snippet. Also removes the duplicate generator meta tags (WordPress + Elementor) and 301s the origin hostname to www. All facts come from site copy and the footer; the Google Analytics tag is in ffe-consent.php. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

// Since the switch (26 Oct 2026) the staging hostname is only Bunny's origin address (Bunny forwards Host: www), so a
// visitor or crawler arriving on it directly is sent to www. wp-admin, wp-login and the REST API (Novamira) still answer there.
add_action('template_redirect', function () {
  if (strtolower($_SERVER['HTTP_HOST'] ?? '') !== 'ffe-staging.ohmyweb.in' || wp_parse_url(home_url(), PHP_URL_HOST) === 'ffe-staging.ohmyweb.in') return;
  wp_redirect(home_url($_SERVER['REQUEST_URI'] ?? '/'), 301, 'FFE');
  exit;
}, 0);

// One generator tag is enough, and none is better: it only tells scrapers which WordPress/Elementor versions to attack. WordPress's is
// removed at the source; Elementor prints its own inline, so the page output is also stripped of any <meta name="generator">.
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');
add_action('template_redirect', function () {
  if (is_admin() || wp_doing_ajax() || is_feed() || is_robots() || is_embed()) return;
  ob_start(fn($html) => preg_replace('~<meta\s+name=["\']generator["\'][^>]*>\s*~i', '', $html));
}, 1);

// ---- Structured data -------------------------------------------------------------------------------------------------------
// Rank Math is set to "no default rich snippet" for pages (seo.js: landing pages must not claim to be Articles), and with that its
// graph is empty on every inner page, so we build the whole @graph here. Facts only from site content: the footer's social profiles
// (footer.js), the organiser (Messe Berlin Asia Pacific, as on the event), the page's own title/description/dates/photos.

function ffe_seo_social() {
  return [
    'https://www.linkedin.com/showcase/freshfoodexpoapac/',
    'https://www.facebook.com/profile.php?id=61595410562693',
    'https://www.youtube.com/@FreshFoodExpoAPAC',
    'https://www.instagram.com/freshfoodexpo_apac',
  ];
}

function ffe_seo_organiser() {
  return ['@type' => 'Organization', 'name' => 'Messe Berlin Asia Pacific', 'url' => 'https://www.messe-berlin.asia/'];
}

function ffe_seo_image($id) {
  $s = $id ? wp_get_attachment_image_src($id, 'full') : false;
  return $s ? ['@type' => 'ImageObject', 'url' => $s[0], 'contentUrl' => $s[0], 'width' => (int) $s[1], 'height' => (int) $s[2]] : null;
}

function ffe_seo_event($home) {
  return [
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
    'organizer' => ffe_seo_organiser(),
  ];
}

// The Organization node; $org = Rank Math's own node on the homepage, which keeps what it has and gains what it lacks.
function ffe_seo_org($home, $org = []) {
  $t = get_option('rank-math-options-titles', []);
  $logo = ffe_seo_image((int) ($t['knowledgegraph_logo_id'] ?? 0)) ?: ['@type' => 'ImageObject', 'url' => $t['knowledgegraph_logo'] ?? $home . 'wp-content/uploads/2026/10/ffe-logo.png'];
  $logo['@id'] = $home . '#logo';
  $logo['caption'] = 'Fresh Food Expo Asia Pacific';
  $org += [
    '@type' => 'Organization', '@id' => $home . '#organization',
    'name' => $t['knowledgegraph_name'] ?? 'Fresh Food Expo Asia Pacific', 'alternateName' => 'FFE APAC',
    'url' => $home, 'logo' => $logo, 'parentOrganization' => ffe_seo_organiser(),
  ];
  $org['sameAs'] = array_values(array_unique(array_merge((array) ($org['sameAs'] ?? []), ffe_seo_social())));
  return $org;
}

function ffe_seo_website($home) {
  $t = get_option('rank-math-options-titles', []);
  return [
    '@type' => 'WebSite', '@id' => $home . '#website', 'url' => $home,
    'name' => $t['website_name'] ?? 'Fresh Food Expo Asia Pacific', 'alternateName' => $t['website_alternate_name'] ?? 'FFE APAC',
    'publisher' => ['@id' => $home . '#organization'], 'inLanguage' => 'en',
  ];
}

// Title and description exactly as Rank Math prints them in <title> and the meta tag.
function ffe_seo_meta($p) {
  $t = $d = '';
  try {
    if (class_exists('\RankMath\Paper\Paper')) { $pp = \RankMath\Paper\Paper::get(); $t = (string) $pp->get_title(); $d = (string) $pp->get_description(); }
  } catch (\Throwable $e) {}
  return [$t ?: (get_post_meta($p->ID, 'rank_math_title', true) ?: get_the_title($p)), $d ?: (string) get_post_meta($p->ID, 'rank_math_description', true)];
}

// The album's photos from its Elementor data: every tile link carries data-lb and wraps the thumbnail image
// (g8-shared.js grid()); href = the 1600px file, data-caption = its alt text.
function ffe_seo_photos($p) {
  $tree = json_decode((string) get_post_meta($p->ID, '_elementor_data', true), true) ?: [];
  $attr = function ($s) {
    $o = [];
    foreach ($s['attributes']['value'] ?? [] as $kv) $o[$kv['value']['key']['value'] ?? ''] = $kv['value']['value']['value'] ?? '';
    return $o;
  };
  $thumb = function ($els) use (&$thumb) {
    foreach ($els as $el) {
      if ($id = $el['settings']['image']['value']['src']['value']['id']['value'] ?? 0) return (int) $id;
      if ($id = $thumb($el['elements'] ?? [])) return $id;
    }
    return 0;
  };
  $out = [];
  $walk = function ($els) use (&$walk, &$out, $attr, $thumb) {
    foreach ($els as $el) {
      $s = $el['settings'] ?? [];
      $a = $attr($s);
      $dest = $s['link']['value']['destination'] ?? '';
      if (is_array($dest)) $dest = $dest['value']['url'] ?? ($dest['value'] ?? '');
      if (isset($a['data-lb']) && is_string($dest) && $dest !== '') $out[] = ['href' => $dest, 'caption' => $a['data-caption'] ?? '', 'thumb' => $thumb($el['elements'] ?? [])];
      else $walk($el['elements'] ?? []);
    }
  };
  $walk($tree);
  return $out;
}

add_filter('rank_math/json_ld', function ($data) {
  $home = home_url('/');
  if (is_front_page()) {
    // Rank Math builds the homepage graph itself; keep it, enrich its Organization, add the event.
    foreach ($data as $k => $n) if (is_array($n) && ($n['@id'] ?? '') === $home . '#organization') $data[$k] = ffe_seo_org($home, $n);
    $data['ffe_event'] = ffe_seo_event($home);
    return $data;
  }
  $p = get_queried_object();
  if (!is_singular('page') || !($p instanceof WP_Post)) return $data;

  $url = get_permalink($p);
  [$title, $desc] = ffe_seo_meta($p);
  $parent = $p->post_parent ? get_post($p->post_parent) : null;
  $under = $parent ? $parent->post_name : '';
  $pageRef = ['@id' => $url . '#webpage'];
  $published = get_post_time('c', false, $p);
  $modified = get_post_modified_time('c', false, $p);
  $imgId = (int) (get_post_thumbnail_id($p) ?: get_post_meta($p->ID, 'rank_math_facebook_image_id', true) ?: (get_option('rank-math-options-titles', [])['open_graph_image_id'] ?? 0));
  $img = ffe_seo_image($imgId);

  $type = $under === 'gallery' ? 'ImageGallery' : ['about' => 'AboutPage', 'contact' => 'ContactPage', 'news' => 'CollectionPage', 'gallery' => 'CollectionPage'][$p->post_name] ?? 'WebPage';
  $web = array_filter([
    '@type' => $type, '@id' => $url . '#webpage', 'url' => $url, 'name' => $title, 'description' => $desc,
    'isPartOf' => ['@id' => $home . '#website'], 'inLanguage' => 'en',
    'primaryImageOfPage' => $img ? ['@id' => $url . '#primaryimage'] : null,
    'datePublished' => $published, 'dateModified' => $modified,
    'breadcrumb' => ['@id' => $url . '#breadcrumb'],
  ]);

  // Home → ancestors → this page.
  $crumbs = [['Home', $home]];
  foreach (array_reverse(get_post_ancestors($p)) as $aid) $crumbs[] = [get_the_title($aid), get_permalink($aid)];
  $crumbs[] = [get_the_title($p), $url];
  $crumb = ['@type' => 'BreadcrumbList', '@id' => $url . '#breadcrumb', 'itemListElement' => array_map(
    fn($c, $i) => ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $c[0], 'item' => $c[1]], $crumbs, array_keys($crumbs))];

  $g = ['ffe_org' => ffe_seo_org($home), 'ffe_website' => ffe_seo_website($home), 'ffe_webpage' => $web, 'ffe_breadcrumb' => $crumb];
  if ($img) $g['ffe_primaryimage'] = ['@id' => $url . '#primaryimage'] + $img;

  if ($under === 'news') {
    // A press release (any child of /news/): duplicated article pages get this automatically.
    $head = get_the_title($p);
    $g['ffe_article'] = array_filter([
      '@type' => 'NewsArticle', '@id' => $url . '#article', 'headline' => mb_strlen($head) > 110 ? mb_substr($head, 0, 109) . '…' : $head,
      'description' => $desc, 'image' => $img ? [$img] : null,
      'datePublished' => $published, 'dateModified' => $modified,
      'author' => ffe_seo_organiser(), 'publisher' => ['@id' => $home . '#organization'],
      'mainEntityOfPage' => $pageRef, 'isPartOf' => $pageRef, 'url' => $url,
      'articleSection' => 'Press Release', 'inLanguage' => 'en', 'isAccessibleForFree' => true,
      'about' => ['@id' => $home . '#event'],
    ]);
    $g['ffe_event'] = ffe_seo_event($home);
  }

  if ($under === 'gallery') {
    // An album (any child of /gallery/): each photo as an ImageObject with credit and licence (the page states editorial use).
    $parts = [];
    foreach (ffe_seo_photos($p) as $i => $ph) {
      $aid = attachment_url_to_postid($ph['href']);
      $cap = ($aid ? (get_post_field('post_excerpt', $aid) ?: get_post_meta($aid, '_wp_attachment_image_alt', true)) : '') ?: $ph['caption'];
      $id = $url . '#photo-' . ($i + 1);
      $parts[] = ['@id' => $id];
      $im = ffe_seo_image($aid);
      $g['ffe_photo_' . ($i + 1)] = array_filter([
        '@type' => 'ImageObject', '@id' => $id, 'url' => $ph['href'], 'contentUrl' => $ph['href'],
        'thumbnailUrl' => $ph['thumb'] ? wp_get_attachment_url($ph['thumb']) : null,
        'width' => $im['width'] ?? null, 'height' => $im['height'] ?? null,
        'name' => $cap, 'caption' => $cap, 'isPartOf' => $pageRef, 'inLanguage' => 'en',
        'creator' => ffe_seo_organiser(), 'creditText' => 'Messe Berlin Asia Pacific', 'copyrightNotice' => '© Messe Berlin Asia Pacific',
        'license' => $url, 'acquireLicensePage' => $url,
      ], fn($v) => $v !== null && $v !== '');
    }
    if ($parts) $g['ffe_webpage']['hasPart'] = $parts;
  }
  return $data + $g;
}, 99);
