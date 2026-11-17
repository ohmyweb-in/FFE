<?php
/**
 * Plugin Name: FFE content
 * Description: What lets editors publish without Elementor: News & Press are WordPress posts (Posts > Add New, block editor) shown through the
 * Theme Builder template "Single: News article" and the Loop on /news/ (scripts/elementor/template.js, pages/news). Here: the article body
 * wrapper the template's CSS styles, the category pill the template prints, two block patterns, and the blog bits the site doesn't use
 * (comments, category/tag archives). Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

if (!defined('ABSPATH')) exit;

/* 1. A post's body sits in <div class="na-body">, which the article template's CSS styles (headings, lists, quotes, photos). */
add_filter('the_content', function ($html) {
  // Elementor's Post Content widget renders outside the main loop, so test the post itself rather than in_the_loop().
  if (!is_singular('post') || get_the_ID() !== get_queried_object_id() || str_contains($html, 'class="na-body"')) return $html;
  return '<div class="na-body">' . $html . '</div>';
}, 20);

/* 2. [ffe_post_category]: the post's first category, for the template's pill (atomic text takes the "Shortcode" dynamic tag, not "Post Terms"). */
add_shortcode('ffe_post_category', function () {
  $c = get_the_category();
  return $c ? esc_html($c[0]->name) : '';
});

/* 3. No comments or pingbacks on a press site; category and tag archives (unstyled theme pages) go to /news/. Date and author archives are
 * already off in Rank Math. */
add_filter('comments_open', '__return_false');
add_filter('pings_open', '__return_false');
add_action('template_redirect', function () {
  if (is_category() || is_tag()) { wp_safe_redirect(home_url('/news/'), 301); exit; }
});

/* 4. Block patterns for articles: Insert (+) > Patterns > FFE. */
add_action('init', function () {
  register_block_pattern_category('ffe', ['label' => 'FFE']);
  // Key facts panel (approved by Ruben 7 Nov): the event's facts, styled as the mint card. Edit the text in the HTML block if a fact changes.
  register_block_pattern('ffe/key-facts', [
    'title' => 'Key facts panel', 'categories' => ['ffe'], 'postTypes' => ['post'],
    'description' => 'The mint "Key facts" card: what, when, where, organiser, sectors.',
    'content' => '<!-- wp:html --><aside class="na-facts" aria-labelledby="na-facts-h"><h2 id="na-facts-h">Key facts</h2><dl><div><dt>What</dt><dd>Fresh Food Expo Asia Pacific (FFE APAC), a B2B trade fair for the fresh food value chain</dd></div><div><dt>When</dt><dd>16–18 November 2027</dd></div><div><dt>Where</dt><dd>Sands Expo &amp; Convention Centre, Singapore</dd></div><div><dt>Organiser</dt><dd>Messe Berlin Asia Pacific</dd></div><div><dt>Part of</dt><dd>Singapore International Agri-Food Week (SIAW) 2027</dd></div><div><dt>Sectors</dt><dd>Fresh Food, Agri &amp; Fresh Technology, Logistics &amp; Distribution</dd></div><div><dt>For</dt><dd>Producers, suppliers, buyers, technology providers and logistics specialists</dd></div></dl></aside><!-- /wp:html -->',
  ]);
  // Link to a gallery album: mint box with a line of text and a green button.
  register_block_pattern('ffe/photos-link', [
    'title' => 'Link to photos', 'categories' => ['ffe'], 'postTypes' => ['post'],
    'description' => 'Mint box with a sentence and a "View the photos" button. Change the text and the button link.',
    'content' => '<!-- wp:group {"className":"na-cta","layout":{"type":"default"}} --><div class="wp-block-group na-cta"><!-- wp:paragraph --><p>Photos of this event are in our gallery, for editorial use.</p><!-- /wp:paragraph --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/gallery/">View the photos</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:group -->',
  ]);
});
