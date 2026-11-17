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
// A post saved before a category is ticked lands in the default one (News); if the editor then ticks Press Release, show that.
add_shortcode('ffe_post_category', function () {
  $c = get_the_category();
  if (count($c) > 1) $c = array_values(array_filter($c, fn($t) => $t->term_id !== (int) get_option('default_category'))) ?: $c;
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
  // Key facts panel (approved by Ruben 7 Nov): a Group (class na-facts) with a heading and a two-column Table, so editors change a fact by
  // clicking its cell (it was a raw HTML block until 17 Nov 2026). Markup as the block editor serializes it, so it opens without warnings.
  register_block_pattern('ffe/key-facts', [
    'title' => 'Key facts panel', 'categories' => ['ffe'], 'postTypes' => ['post'],
    'description' => 'The mint "Key facts" card: what, when, where, organiser, sectors. Click a cell to change it.',
    'content' => '<!-- wp:group {"className":"na-facts","layout":{"type":"default"}} -->
<div class="wp-block-group na-facts"><!-- wp:heading -->
<h2 class="wp-block-heading">Key facts</h2>
<!-- /wp:heading -->

<!-- wp:table {"hasFixedLayout":false,"className":"na-facts-table"} -->
<figure class="wp-block-table na-facts-table"><table><tbody><tr><td>What</td><td>Fresh Food Expo Asia Pacific (FFE APAC), a B2B trade fair for the fresh food value chain</td></tr><tr><td>When</td><td>16–18 November 2027</td></tr><tr><td>Where</td><td>Sands Expo &amp; Convention Centre, Singapore</td></tr><tr><td>Organiser</td><td>Messe Berlin Asia Pacific</td></tr><tr><td>Part of</td><td>Singapore International Agri-Food Week (SIAW) 2027</td></tr><tr><td>Sectors</td><td>Fresh Food, Agri &amp; Fresh Technology, Logistics &amp; Distribution</td></tr><tr><td>For</td><td>Producers, suppliers, buyers, technology providers and logistics specialists</td></tr></tbody></table></figure>
<!-- /wp:table --></div>
<!-- /wp:group -->',
  ]);
  // Link to a gallery album: mint box with a line of text and a green button.
  register_block_pattern('ffe/photos-link', [
    'title' => 'Link to photos', 'categories' => ['ffe'], 'postTypes' => ['post'],
    'description' => 'Mint box with a sentence and a "View the photos" button. Change the text and the button link.',
    'content' => '<!-- wp:group {"className":"na-cta","layout":{"type":"default"}} --><div class="wp-block-group na-cta"><!-- wp:paragraph --><p>Photos of this event are in our gallery, for editorial use.</p><!-- /wp:paragraph --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/gallery/">View the photos</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:group -->',
  ]);
});

/* 5. Albums (/gallery/<slug>/): title, Excerpt (the line under the title), and a Gallery block whose photos (with their captions) make the
 * album. The first photo is the cover unless a Featured image is set. */
add_action('init', function () {
  register_post_type('ffe_album', [
    'labels' => ['name' => 'Albums', 'singular_name' => 'Album', 'add_new' => 'Add New Album', 'add_new_item' => 'Add New Album', 'edit_item' => 'Edit Album', 'new_item' => 'New Album',
      'view_item' => 'View Album', 'all_items' => 'All Albums', 'search_items' => 'Search Albums', 'not_found' => 'No albums yet', 'menu_name' => 'Albums', 'item_published' => 'Album published.', 'item_updated' => 'Album updated.'],
    'public' => true, 'show_in_rest' => true, 'menu_icon' => 'dashicons-format-gallery', 'menu_position' => 6, 'has_archive' => false,
    'rewrite' => ['slug' => 'gallery', 'with_front' => false], // with_front false: posts use /news/%postname%/, albums must not land under /news/
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
    'template' => [['core/gallery', ['linkTo' => 'none']]], // a new album opens with an empty Gallery block: drop the photos in
  ]);
});

// The album's photos, in Gallery-block order: [attachment id, caption (or alt), full-size URL, download URL].
function ffe_album_photos($post): array {
  $out = [];
  $walk = function ($blocks) use (&$walk, &$out) {
    foreach ($blocks as $b) {
      if ($b['blockName'] === 'core/image' && !empty($b['attrs']['id'])) {
        $id = (int) $b['attrs']['id'];
        preg_match('#<figcaption[^>]*>(.*?)</figcaption>#s', $b['innerHTML'], $m);
        $cap = trim(wp_strip_all_tags($m[1] ?? '')) ?: (string) get_post_meta($id, '_wp_attachment_image_alt', true);
        // A photo's download: its original upload, or a separate full-resolution file (meta _ffe_download, the launch album's originals).
        $dl = get_post_meta($id, '_ffe_download', true) ?: (wp_get_original_image_url($id) ?: wp_get_attachment_url($id));
        $out[] = ['id' => $id, 'caption' => $cap, 'big' => wp_get_attachment_image_url($id, '1536x1536') ?: wp_get_attachment_url($id), 'download' => $dl];
      }
      if (!empty($b['innerBlocks'])) $walk($b['innerBlocks']);
    }
  };
  $walk(parse_blocks((string) get_post_field('post_content', $post)));
  return $out;
}

// [ffe_album_photos]: the album page's photo grid (GalleryGrid.tsx; same tiles as before), opened by the lightbox in the album template.
add_shortcode('ffe_album_photos', function () {
  $photos = ffe_album_photos(get_the_ID());
  if (!$photos) return '';
  $html = '<section class="ffe-alb" aria-label="Photos">';
  foreach ($photos as $k => $p) {
    $cap = esc_attr($p['caption']);
    $html .= sprintf('<a class="ffe-alb-t" href="%s" data-group data-lb data-caption="%s" data-download="%s" data-elementor-open-lightbox="no" aria-label="View photo %d: %s" data-reveal%s><span class="ffe-alb-f">%s</span></a>',
      esc_url($p['big']), $cap, esc_url($p['download']), $k + 1, $cap, $k % 4 ? ' data-reveal-i="' . ($k % 4) . '"' : '',
      wp_get_attachment_image($p['id'], 'medium_large', false, ['alt' => $p['caption'], 'data-zoom' => '', 'loading' => $k < 4 ? 'eager' : 'lazy', 'sizes' => '(min-width: 1024px) 300px, 50vw']));
  }
  return $html . '</section>';
});

// Cover: the first photo, unless the editor set a Featured image.
add_action('save_post_ffe_album', function ($id) {
  if (wp_is_post_revision($id) || has_post_thumbnail($id)) return;
  $p = ffe_album_photos($id);
  if ($p) set_post_thumbnail($id, $p[0]['id']);
});

// The Loop on /gallery/ (Query ID "ffe_albums") lists albums: Elementor's Loop offers posts and pages only, so its query is pointed here.
add_action('elementor/query/ffe_albums', function ($q) {
  $q->set('post_type', 'ffe_album');
  $q->set('posts_per_page', -1);
});

/* 6. Photos people upload are published as press photos: their camera and location data (EXIF, GPS) is removed from the original on
 * upload, as jpegtran -copy none did for the launch album. Upright first (cameras store rotation in EXIF), colour profile kept. */
$ffe_clean_upload = function ($u) {
  if (($u['type'] ?? '') !== 'image/jpeg' || !class_exists('Imagick')) return $u;
  try {
    $im = new Imagick($u['file']);
    $rot = [Imagick::ORIENTATION_BOTTOMRIGHT => 180, Imagick::ORIENTATION_RIGHTTOP => 90, Imagick::ORIENTATION_LEFTBOTTOM => -90][$im->getImageOrientation()] ?? 0;
    if ($rot) $im->rotateImage('#000', $rot);
    $icc = in_array('icc', $im->getImageProfiles('icc', false), true) ? $im->getImageProfile('icc') : null;
    $im->stripImage();
    if ($icc) $im->profileImage('icc', $icc);
    $im->setImageOrientation(Imagick::ORIENTATION_TOPLEFT);
    $im->setImageCompressionQuality(max(92, (int) $im->getImageCompressionQuality()));
    $im->writeImage($u['file']);
  } catch (\Throwable $e) {
    error_log('FFE upload clean-up: ' . $e->getMessage());
  }
  return $u;
};
add_filter('wp_handle_upload', $ffe_clean_upload); // Media Library and the block editor's file uploads
add_filter('wp_handle_sideload', $ffe_clean_upload); // REST uploads of raw data and media_handle_sideload()

/* 7. Who can do what. "Content manager" (for the person after Ruben): News & Press, Albums, Media, the Launch popup and Registration form
 * screens (capability ffe_manage_content, which administrators get too), and nothing else: no pages, Elementor, plugins or settings, so
 * the design can't be changed by accident. Posts are written in the block editor only: Elementor editing is for pages (an article turned
 * into an Elementor page would skip the article template). Applied once per version. */
add_action('init', function () {
  if ((int) get_option('ffe_roles_v') >= 2) return;
  remove_role('ffe_content_manager');
  add_role('ffe_content_manager', 'Content manager', array_fill_keys([
    'read', 'upload_files', 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'edit_private_posts', 'publish_posts',
    'delete_posts', 'delete_others_posts', 'delete_published_posts', 'read_private_posts', 'manage_categories', 'ffe_manage_content',
  ], true));
  get_role('administrator')->add_cap('ffe_manage_content');
  update_option('elementor_cpt_support', ['page']);
  // Elementor > Role Manager "No access to editor" for Content managers (v2).
  update_option('elementor_exclude_user_roles', array_values(array_unique(array_merge((array) get_option('elementor_exclude_user_roles', []), ['ffe_content_manager']))));
  update_option('ffe_roles_v', 2);
});
// Elementor's templates (header, footer, the article and album templates) are posts with the ordinary post permissions: keep Content
// managers out of them, so they can't change or trash the design.
add_filter('map_meta_cap', function ($caps, $cap, $uid, $args) {
  if (!in_array($cap, ['edit_post', 'delete_post', 'publish_post'], true) || empty($args[0])) return $caps;
  if (!in_array(get_post_type($args[0]), ['elementor_library', 'e-floating-buttons'], true)) return $caps;
  $u = get_userdata($uid);
  return $u && in_array('ffe_content_manager', (array) $u->roles, true) ? ['do_not_allow'] : $caps;
}, 10, 4);

// Dashboard: how to update the site, for whoever logs in.
add_action('wp_dashboard_setup', function () {
  if (!current_user_can('ffe_manage_content')) return;
  wp_add_dashboard_widget('ffe_howto', 'Update the website', function () { ?>
    <p><strong>News or press release:</strong> Posts &gt; Add Post. Title; the article in blocks (the + button &gt; Patterns &gt; FFE has the Key facts panel and Link to photos); on the right: Set featured image (its Caption shows under the photo), Add an excerpt (the line under the title and the summary on the News page; left empty, the News page uses the first paragraph), Categories. Publish. It appears first on <a href="<?php echo esc_url(home_url('/news/')); ?>" target="_blank">News &amp; Press</a>.</p>
    <p><strong>Already written in Word?</strong> Posts &gt; Import from Word and choose the .docx: title, headings, quotes and photos come in as a draft (the first photo becomes the Featured image). Check it, tick a Category, Preview, Publish.</p>
    <p><strong>Photo album:</strong> Albums &gt; Add New Album. Title, Add an excerpt, then drop the photos into the Gallery box and give each a caption (click the photo). Drag to reorder; the first is the cover. Publish. Camera and location data are removed from uploads.</p>
    <p><strong>Registration form:</strong> Registration form (left menu). Show or hide questions, add your own.</p>
    <p><strong>Launch popup:</strong> Launch popup (left menu). Text, buttons, links, on/off.</p>
    <p>Visitors see changes within about 5 minutes.</p>
  <?php });
});

/* 8. /news/ and /gallery/ are ordinary pages holding a Loop, which LiteSpeed doesn't purge when a post or album changes (it purges the
 * post, the home page and archives). So publishing, updating or unpublishing one clears the whole page cache; Bunny follows within 5 min. */
add_action('transition_post_status', function ($new, $old, $post) {
  if (in_array($post->post_type, ['post', 'ffe_album'], true) && ($new === 'publish' || $old === 'publish')) do_action('litespeed_purge_all');
}, 10, 3);

/* 9. An article saved without an Excerpt gets its first paragraph as the Excerpt (40 words), which the editor then shows and can change.
 * Elementor's Post Excerpt tag prints only a real Excerpt, so without this the line under the title and the News card's summary stay blank.
 * Albums don't: their hero simply has no line (the template hides the empty paragraph). */
function ffe_fill_excerpt($id, $post) {
  if (wp_is_post_revision($id) || wp_is_post_autosave($id) || trim($post->post_excerpt) !== '' || $post->post_status === 'auto-draft') return;
  foreach (parse_blocks($post->post_content) as $b) {
    if ($b['blockName'] === 'core/paragraph' && ($t = trim(wp_strip_all_tags($b['innerHTML']))) !== '') {
      remove_action('save_post_post', 'ffe_fill_excerpt', 10);
      wp_update_post(['ID' => $id, 'post_excerpt' => wp_trim_words($t, 40)]);
      add_action('save_post_post', 'ffe_fill_excerpt', 10, 2);
      return;
    }
  }
}
add_action('save_post_post', 'ffe_fill_excerpt', 10, 2);
// On the article itself that summary would repeat the paragraph right below the photo, so the line under the title is left out when
// the Excerpt is just the start of the first paragraph (the News card still uses it). A summary someone wrote still shows.
add_action('wp_head', function () {
  if (!is_singular('post')) return;
  $norm = fn($t) => trim(preg_replace('/\s+/u', ' ', html_entity_decode(wp_strip_all_tags($t), ENT_QUOTES, 'UTF-8')));
  $ex = preg_replace('/[\s…]+$/u', '', $norm(get_post_field('post_excerpt', get_queried_object_id())));
  if ($ex === '') return;
  foreach (parse_blocks(get_post_field('post_content', get_queried_object_id())) as $b) {
    if ($b['blockName'] !== 'core/paragraph' || ($t = $norm($b['innerHTML'])) === '') continue;
    if (str_starts_with($t, $ex)) echo '<style>body .elementor [data-id="na-standfirst"]{display:none}</style>' . "\n";
    return;
  }
});
