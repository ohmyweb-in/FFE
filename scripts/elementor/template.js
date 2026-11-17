// Theme Builder template pusher: node scripts/elementor/template.js <name> [--dry]
// templates/<name>/index.js is the manifest (key, title, type, conditions, prefix, footer, css, sections), one module per section,
// as for page.js. Finds the template by meta _ffe_template (or creates it through Elementor's document API), refuses one edited in
// WordPress since the last push (guard; FFE_FORCE=1 overrides), writes it, names and stamps it, sets its display conditions and its
// Custom CSS, rebuilds its CSS file and purges LiteSpeed (a template shows on every page it applies to).
const path = require("path");
const fs = require("fs");
const { call, php, guard, stamp } = require("./lib.js");

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const [name] = args.filter((a) => a !== "--dry");
if (!/^[a-z0-9-]+$/.test(name || "")) throw new Error("usage: node scripts/elementor/template.js <name> [--dry]");
const dir = path.join(__dirname, "templates", name);
if (!fs.existsSync(path.join(dir, "index.js"))) throw new Error(`templates/${name}/index.js not found`);
const { key, title, type, conditions, prefix, footer, css = [], sections } = require(path.join(dir, "index.js"));
const content = sections.flatMap((s) => require(path.join(dir, `${s}.js`)));

const ids = new Set();
let count = 0;
(function walk(nodes) {
  for (const n of nodes) {
    count++;
    if (!/^[a-z0-9-]+$/.test(n.id || "")) throw new Error(`id ${n.id}: lowercase a-z 0-9 - only`);
    if (ids.has(n.id)) throw new Error(`duplicate id ${n.id}`);
    if (!n.id.startsWith(prefix + "-")) throw new Error(`id ${n.id} must start with ${prefix}-`);
    ids.add(n.id);
    walk(n.elements || []);
  }
})(content);
console.log(`${name}: ${content.length} top-level nodes, ${count} elements`);
if (dry) process.exit(0);

const b64 = (s) => Buffer.from(s).toString("base64");
let { return_value: ID } = php(`$q = get_posts(['post_type' => 'elementor_library', 'post_status' => 'any', 'meta_key' => '_ffe_template', 'meta_value' => '${key}', 'fields' => 'ids', 'numberposts' => 1]);
return $q ? (int) $q[0] : 0;`);
if (!ID) {
  ID = call("novamira/elementor-create-template", { title, type, status: "publish" }).id;
  php(`update_post_meta(${ID}, '_ffe_template', '${key}'); return true;`);
  console.log("created template", ID);
}
guard(ID);
call("novamira/elementor-set-content", { post_id: ID, template_type: type, content });
stamp(ID);
call("novamira/elementor-set-template-conditions", { template_id: ID, conditions });

const [L, T, M] = footer || [];
const pageCss = [
  ...(footer ? [
    `body .elementor [data-id="partners"] { margin-top: ${L}px; }`,
    `@media (max-width: 1024px) { body .elementor [data-id="partners"] { margin-top: ${T}px; } }`,
    `@media (max-width: 767px) { body .elementor [data-id="partners"] { margin-top: ${M}px; } }`,
  ] : []),
  ...css,
].join("\n");
php(`
$id = ${ID};
wp_update_post(['ID' => $id, 'post_title' => base64_decode('${b64(title)}'), 'post_status' => 'publish']);
$s = get_post_meta($id, '_elementor_page_settings', true); if (!is_array($s)) $s = [];
$s['custom_css'] = base64_decode('${b64(pageCss)}');
update_post_meta($id, '_elementor_page_settings', wp_slash($s)); // wp_slash: update_post_meta unslashes
\\Elementor\\Core\\Files\\CSS\\Post::create($id)->update();
do_action('litespeed_purge_all');
return true;
`);
console.log(`template ${ID} (${type}) elements: ${call("novamira/elementor-get-content", { post_id: ID }).element_count}`);
