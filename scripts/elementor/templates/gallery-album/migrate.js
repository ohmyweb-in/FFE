// One-off (17 Nov 2026): the signing-ceremony album page (post 375, /gallery/partner-event-launch-signing-ceremony/) becomes an Albums
// post at the same address, its photos in a Gallery block so editors can change them. Kept as the record of what moved.
//   node scripts/elementor/templates/gallery-album/migrate.js            create or refresh the album as a draft (no visible change)
//   node scripts/elementor/templates/gallery-album/migrate.js --cutover  publish it, rebuild the address rules, trash page 375, purge
const { php, media } = require("../../lib.js");
const { ALBUMS, DOWNLOADS } = require("../../pages/g8-shared.js");

const A = ALBUMS[0], M = media();
const b64 = (s) => Buffer.from(s).toString("base64");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
// The Gallery block as the block editor saves it: each photo an Image block with its alt text and caption.
const photos = A.photos.map(([key, alt, dl]) => ({ id: M[`g8-${key}`].id, url: M[`g8-${key}`].url, alt, download: DOWNLOADS + dl }));
const CONTENT = `<!-- wp:gallery {"linkTo":"none"} --><figure class="wp-block-gallery has-nested-images columns-default is-cropped">${photos.map((p) =>
  `<!-- wp:image {"id":${p.id},"sizeSlug":"large","linkDestination":"none"} --><figure class="wp-block-image size-large"><img src="${p.url}" alt="${esc(p.alt)}" class="wp-image-${p.id}"/><figcaption class="wp-element-caption">${esc(p.alt)}</figcaption></figure><!-- /wp:image -->`).join("")}</figure><!-- /wp:gallery -->`;
const cutover = process.argv.includes("--cutover");

console.log(JSON.stringify(php(`
$slug = '${A.slug}';
if (!post_type_exists('ffe_album')) throw new Exception('deploy ffe-content.php first (Albums post type)');
$found = get_posts(['post_type' => 'ffe_album', 'name' => $slug, 'post_status' => 'any', 'numberposts' => 1]);
$page = get_page_by_path('gallery/' . $slug);
$arr = [
  'post_type' => 'ffe_album', 'post_name' => $slug, 'post_title' => base64_decode('${b64(A.title)}'), 'post_excerpt' => base64_decode('${b64(A.desc)}'),
  'post_content' => base64_decode('${b64(CONTENT)}'), 'post_status' => 'draft',
  'post_date' => $page ? $page->post_date : current_time('mysql'), 'post_date_gmt' => $page ? $page->post_date_gmt : current_time('mysql', true), 'edit_date' => true,
];
if ($found) { $arr['ID'] = $found[0]->ID; if ($found[0]->post_status === 'publish') unset($arr['post_status']); }
$id = wp_insert_post(wp_slash($arr), true);
if (is_wp_error($id)) throw new Exception($id->get_error_message());
set_post_thumbnail($id, ${photos[0].id});
// The launch photos' full-resolution originals are separate files (metadata stripped), not the 1600px media items.
foreach (json_decode(base64_decode('${b64(JSON.stringify(photos.map((p) => [p.id, p.download])))}'), true) as [$aid, $dl]) update_post_meta($aid, '_ffe_download', $dl);
if ($page) foreach (['rank_math_title', 'rank_math_description', 'rank_math_facebook_image', 'rank_math_facebook_image_id', 'rank_math_twitter_use_facebook'] as $k) { $v = get_post_meta($page->ID, $k, true); if ($v !== '') update_post_meta($id, $k, wp_slash($v)); }
$out = ['album' => $id, 'status' => get_post_status($id), 'preview' => get_preview_post_link($id), 'photos' => count(ffe_album_photos($id))];
if (${cutover ? "true" : "false"}) {
  if (!$page) throw new Exception('page gallery/' . $slug . ' not found');
  wp_update_post(['ID' => $id, 'post_status' => 'publish', 'post_date' => $arr['post_date'], 'post_date_gmt' => $arr['post_date_gmt'], 'edit_date' => true]);
  wp_trash_post($page->ID); // restorable from Pages > Trash
  flush_rewrite_rules(false); // adds the Albums rules (gallery/<slug>/); the permalink structure itself is unchanged
  do_action('litespeed_purge_all');
  $r = get_option('rewrite_rules');
  $out += ['url' => get_permalink($id), 'album_rule' => isset($r['gallery/([^/]+)/?$']) ? $r['gallery/([^/]+)/?$'] : null, 'page_status' => get_post_status($page->ID)];
}
return $out;
`).return_value, null, 1));
