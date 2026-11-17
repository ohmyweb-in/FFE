// One-off (17 Nov 2026): the launch press release page (post 378, /news/messe-berlin-launches-fresh-food-expo-asia-pacific/) becomes a
// WordPress post at the same address, written in blocks so editors can change it in the block editor. Kept as the record of what moved.
//   node scripts/elementor/templates/news-article/migrate.js            create or refresh the post as a draft (no visible change)
//   node scripts/elementor/templates/news-article/migrate.js --cutover  publish it, permalinks /news/%postname%/, trash page 378, purge
const fs = require("fs");
const path = require("path");
const { php, media } = require("../../lib.js");

const SLUG = "messe-berlin-launches-fresh-food-expo-asia-pacific";
const TITLE = "Messe Berlin launches Fresh Food Expo Asia Pacific in Singapore";
const EXCERPT = "New international B2B trade show for the fresh food industry to join Singapore International Agri-Food Week from 2027";
// The photo caption, as the article showed it: on the featured image's Caption (Media Library), which the template prints under the photo.
const CAPTION =
  "<strong>Seated, from left:</strong> Katrina Leung, Managing Director and Vice President Asia Pacific, Messe Berlin; and Poh Chi Chuan, Executive Director, Exhibitions and Conferences, Singapore Tourism Board. <strong>Standing, from left:</strong> Leong Der Yao, Deputy Chief Executive Officer (Corporate, Industry &amp; Technology), Singapore Food Agency; Ralph Graichen, Corporate Advisor, Temasek; and Jeannie Lim, Assistant Managing Director, Services &amp; Growth Enterprises, Enterprise Singapore.";

// body.html (the Next.js article) -> block markup, element by element (it is flat: aside, p, h2, ul, figure, then the photos box).
const src = fs.readFileSync(path.join(__dirname, "body.html"), "utf8").replace(/^<!--.*-->\n/, "").replace(/^<div class="na-body">/, "");
const blocks = [];
for (const [el, tag, inner] of src.matchAll(/<(aside|p|h2|ul|figure)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
  if (tag === "aside" && el.includes("na-facts")) blocks.push(`<!-- wp:html -->${el}<!-- /wp:html -->`);
  else if (tag === "aside") {
    const [, text] = el.match(/<p>([\s\S]*?)<\/p>/);
    const [, href, label] = el.match(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)/);
    blocks.push(`<!-- wp:group {"className":"na-cta","layout":{"type":"default"}} --><div class="wp-block-group na-cta"><!-- wp:paragraph --><p>${text}</p><!-- /wp:paragraph --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="${href}">${label.trim()}</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:group -->`);
  } else if (tag === "p") blocks.push(`<!-- wp:paragraph --><p>${inner}</p><!-- /wp:paragraph -->`);
  else if (tag === "h2") blocks.push(`<!-- wp:heading --><h2 class="wp-block-heading">${inner}</h2><!-- /wp:heading -->`);
  else if (tag === "ul") blocks.push(`<!-- wp:list --><ul class="wp-block-list">${[...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, li]) => `<!-- wp:list-item --><li>${li}</li><!-- /wp:list-item -->`).join("")}</ul><!-- /wp:list -->`);
  else if (tag === "figure") {
    const [, q] = inner.match(/<blockquote>([\s\S]*?)<\/blockquote>/);
    const cite = inner.match(/<figcaption>([\s\S]*?)<\/figcaption>/)[1].replace(/<span>([\s\S]*?)<\/span>/, "<strong>$1</strong>");
    blocks.push(`<!-- wp:quote --><blockquote class="wp-block-quote"><!-- wp:paragraph --><p>${q}</p><!-- /wp:paragraph --><cite>${cite}</cite></blockquote><!-- /wp:quote -->`);
  }
}
const CONTENT = blocks.join("\n\n");
const b64 = (s) => Buffer.from(s).toString("base64");
const photo = media()["g8-signing-2"].id;
const cutover = process.argv.includes("--cutover");

console.log(`${blocks.length} blocks`);
console.log(JSON.stringify(php(`
$slug = '${SLUG}';
$found = get_posts(['post_type' => 'post', 'name' => $slug, 'post_status' => 'any', 'numberposts' => 1]);
$cat = term_exists('Press Release', 'category') ?: wp_insert_term('Press Release', 'category', ['slug' => 'press-release']);
wp_insert_term('News', 'category', ['slug' => 'news']); // the other category editors pick from (fails quietly if it exists)
$page = get_page_by_path('news/' . $slug);
$arr = [
  'post_type' => 'post', 'post_name' => $slug, 'post_title' => base64_decode('${b64(TITLE)}'), 'post_excerpt' => base64_decode('${b64(EXCERPT)}'),
  'post_content' => base64_decode('${b64(CONTENT)}'), 'post_status' => 'draft', 'comment_status' => 'closed', 'ping_status' => 'closed',
  // The page's own publication date (27 Oct 2026, Singapore), so the article's date and its JSON-LD stay the same.
  'post_date' => $page ? $page->post_date : '2026-10-27 00:00:00', 'post_date_gmt' => $page ? $page->post_date_gmt : '2026-10-26 16:00:00',
  'post_category' => [(int) (is_array($cat) ? $cat['term_id'] : $cat)],
  'edit_date' => true, // keep that date on a draft (WordPress otherwise floats a draft's date to now)
];
if ($found) { $arr['ID'] = $found[0]->ID; if ($found[0]->post_status === 'publish') unset($arr['post_status']); }
kses_remove_filters(); // the Key facts HTML block (aside, dl) as written
$id = wp_insert_post(wp_slash($arr), true);
kses_init_filters();
if (is_wp_error($id)) throw new Exception($id->get_error_message());
set_post_thumbnail($id, ${photo});
wp_update_post(['ID' => ${photo}, 'post_excerpt' => base64_decode('${b64(CAPTION)}')]);
if ($page) foreach (['rank_math_title', 'rank_math_description'] as $k) { $v = get_post_meta($page->ID, $k, true); if ($v !== '') update_post_meta($id, $k, wp_slash($v)); }
$out = ['post' => $id, 'status' => get_post_status($id), 'preview' => get_preview_post_link($id)];
if (${cutover ? "true" : "false"}) {
  if (!$page) throw new Exception('page news/' . $slug . ' not found');
  $before = get_option('rewrite_rules');
  wp_update_post(['ID' => $id, 'post_status' => 'publish', 'post_date' => $arr['post_date'], 'post_date_gmt' => $arr['post_date_gmt'], 'edit_date' => true]);
  update_option('permalink_structure', '/news/%postname%/'); // posts at /news/<slug>/; pages keep their addresses
  flush_rewrite_rules(false);
  wp_trash_post($page->ID); // restorable from Pages > Trash
  do_action('litespeed_purge_all');
  $after = get_option('rewrite_rules');
  $out += ['url' => get_permalink($id), 'rules_added' => array_slice(array_diff_key($after, $before), 0, 12), 'rules_removed' => count(array_diff_key($before, $after)), 'page_status' => get_post_status($page->ID)];
}
return $out;
`).return_value, null, 1));
