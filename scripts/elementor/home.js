// Home page: port of src/app/page.tsx, one module per section in home/.
// Creates the "Home" page (Elementor full width, header + footer) on first run and makes it the front page.
// Run: node home.js
const { call, php } = require("./lib.js");

const SECTIONS = ["hero", "about", "siaw", "ecosystem", "be-involved", "organiser", "join-banner", "newsletter"];
const content = SECTIONS.flatMap((s) => require(`./home/${s}.js`));

/* ── Write ─────────────────────────────────────────────────────────────────────────────── */
// Find or create the page, full width between the theme header and footer, as the front page.
const { return_value: ID } = php(`
$p = get_page_by_path('home');
$id = $p ? $p->ID : wp_insert_post(['post_type' => 'page', 'post_title' => 'Home', 'post_name' => 'home', 'post_status' => 'publish']);
update_post_meta($id, '_wp_page_template', 'elementor_header_footer');
update_option('show_on_front', 'page');
update_option('page_on_front', $id);
return $id;
`);
call("novamira/elementor-set-content", { post_id: ID, content });
const back = call("novamira/elementor-get-content", { post_id: ID });
console.log("home", ID, "elements:", back.element_count);
