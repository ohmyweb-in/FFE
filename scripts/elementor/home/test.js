// Scratch-page pusher: node scripts/elementor/home/test.js <section>
// Pushes home/<section>.js to the published (noindex, unlinked) page home-test-<section>. Never touches post 45.
const { call, php, ORIGIN } = require("../lib.js");

const section = process.argv[2];
if (!/^[a-z-]+$/.test(section || "")) throw new Error("usage: node scripts/elementor/home/test.js <section>  (a-z and - only)");
const content = require(`./${section}.js`);

const { return_value: ID } = php(`
$slug = 'home-test-${section}';
$p = get_page_by_path($slug);
$id = $p ? $p->ID : wp_insert_post(['post_type' => 'page', 'post_title' => 'Home test — ${section}', 'post_name' => $slug, 'post_status' => 'publish']);
if ($id == 45 || $id == (int) get_option('page_on_front')) throw new Exception('refusing to write the front page');
wp_update_post(['ID' => $id, 'post_status' => 'publish']);
update_post_meta($id, '_wp_page_template', 'elementor_header_footer');
return $id;
`);
if (ID === 45) throw new Error("refusing to write post 45");
call("novamira/elementor-set-content", { post_id: ID, content });
const back = call("novamira/elementor-get-content", { post_id: ID });
console.log(`home-test-${section}`, ID, "elements:", back.element_count);
console.log(`${ORIGIN}/home-test-${section}/`);
