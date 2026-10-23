// Inner-page pusher: node scripts/elementor/page.js <page> [section …] [--dry]
// Builds pages/<page>/index.js (manifest: slug, parent, title, prefix, footer, css, sections) from one module per section,
// validates the tree, finds or creates the page and writes it plus its page CSS. Never touches post 45, the header/footer
// templates or a page it doesn't own (meta _ffe_page). Scratch pages: page `_test/<name>` -> pages/_test/<name>/index.js, slug ffe-test*.
const path = require("path");
const fs = require("fs");
const { call, php, ORIGIN } = require("./lib.js");

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const [page, ...only] = args.filter((a) => a !== "--dry");
const scratch = /^_test\/[a-z0-9-]+$/.test(page || "");
if (!scratch && !/^[a-z0-9-]+$/.test(page || "")) throw new Error("usage: node scripts/elementor/page.js <page> [section …] [--dry]  (page: a-z 0-9 -, or _test/<name>)");
const dir = path.join(__dirname, "pages", page);
if (!fs.existsSync(path.join(dir, "index.js"))) throw new Error(`pages/${page}/index.js not found`);
const m = require(path.join(dir, "index.js"));
const { slug, parent = null, title, prefix, footer, css = [], sections } = m;

// ── Validate before any write ──────────────────────────────────────────────────────────────
for (const s of only) if (!sections.includes(s)) throw new Error(`unknown section ${s} (have: ${sections.join(", ")})`);
if (scratch && !/^ffe-test(-[a-z0-9]+)*$/.test(slug)) throw new Error("scratch pages must use a ffe-test* slug");
if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`bad slug ${slug}`);
if (!scratch && !(Array.isArray(footer) && footer.length === 3)) throw new Error("manifest needs footer: [L, T, M]");
const prefixes = [].concat(prefix);
const content = (only.length ? only : sections).flatMap((s) => require(path.join(dir, `${s}.js`)));

const RESERVED = [/^(about|exhibit|visit|news|col|acc|footer|logo|role|social|site|util|header)-/, /^hero/, /^partners$/, /^(ab|sw|eco|inv|org|jb|nl)-/];
const ids = new Set(), cssids = new Set();
let count = 0;
(function walk(nodes) {
  for (const n of nodes) {
    count++;
    if (!n.id) throw new Error("node without id: " + JSON.stringify(n).slice(0, 120));
    if (!/^[a-z0-9-]+$/.test(n.id)) throw new Error(`id ${n.id}: lowercase a-z 0-9 - only (Elementor lowercases style ids, so capitals orphan the local styles)`);
    if (ids.has(n.id)) throw new Error(`duplicate id ${n.id}`);
    ids.add(n.id);
    if (!prefixes.some((p) => n.id.startsWith(p + "-") || (n.elType === "e-form" && n.id.startsWith(p)))) throw new Error(`id ${n.id} must start with ${prefixes.map((p) => p + "-").join(" or ")}`);
    if (RESERVED.some((r) => r.test(n.id))) throw new Error(`id ${n.id} is reserved (header/footer/home)`);
    const c = n.settings?._cssid;
    if (c) {
      if (cssids.has(c)) throw new Error(`duplicate _cssid ${c}`);
      cssids.add(c);
    }
    walk(n.elements || []);
  }
})(content);
console.log(`${page}: ${content.length} top-level nodes, ${count} elements`);
if (dry) process.exit(0);

// ── Page CSS (plan 1.4): footer gap + extra lines, each selector starting with `body ` ───────
const [L, T, M] = footer || [];
const pageCss = [
  ...(footer
    ? [
        `body .elementor [data-id="partners"] { margin-top: ${L}px; }`,
        `@media (max-width: 1024px) { body .elementor [data-id="partners"] { margin-top: ${T}px; } }`,
        `@media (max-width: 767px) { body .elementor [data-id="partners"] { margin-top: ${M}px; } }`,
      ]
    : []),
  ...css,
].join("\n");

// ── One PHP round-trip: find or create ────────────────────────────────────────────────────
const b64 = (s) => Buffer.from(s).toString("base64");
const fpath = parent ? `${parent}/${slug}` : slug;
const { return_value: ID } = php(`
$path = '${fpath}'; $slug = '${slug}'; $parent = ${parent ? `'${parent}'` : "null"}; $key = '${page}';
$title = base64_decode('${b64(title)}');
$front = (int) get_option('page_on_front');
if ($slug === 'home') throw new Exception('refusing slug home');
$pp = 0;
if ($parent) { $par = get_page_by_path($parent); if (!$par) throw new Exception("push $parent first"); $pp = $par->ID; }
$p = get_page_by_path($path);
if ($p) {
  if ($p->ID == 45 || $p->ID == $front) throw new Exception('refusing to write the front page');
  $own = get_post_meta($p->ID, '_ffe_page', true);
  if ($own === '' || $own !== $key) throw new Exception("page $path exists and is not owned by $key");
  $id = $p->ID;
} else {
  $id = wp_insert_post(['post_type' => 'page', 'post_title' => $title, 'post_name' => $slug, 'post_parent' => $pp, 'post_status' => 'publish'], true);
  if (is_wp_error($id)) throw new Exception($id->get_error_message());
  update_post_meta($id, '_ffe_page', $key);
}
if ($id == 45 || $id == $front) throw new Exception('refusing to write the front page');
wp_update_post(['ID' => $id, 'post_status' => 'publish', 'post_title' => $title, 'post_parent' => $pp]);
update_post_meta($id, '_wp_page_template', 'elementor_header_footer');
return $id;
`);
if (ID === 45) throw new Error("refusing to write post 45");

call("novamira/elementor-set-content", { post_id: ID, content });
const back = call("novamira/elementor-get-content", { post_id: ID });
console.log(`post ${ID} elements: ${back.element_count}`);

// Page CSS: Elementor Pro page Custom CSS, written after set-content (which leaves it alone), then the page's CSS file is rebuilt.
php(`
$id = ${ID};
$s = get_post_meta($id, '_elementor_page_settings', true); if (!is_array($s)) $s = [];
$s['custom_css'] = base64_decode('${b64(pageCss)}');
update_post_meta($id, '_elementor_page_settings', wp_slash($s)); // wp_slash: update_post_meta unslashes, which would eat the backslashes in the CSS ("\\201C", \\[ escapes)
\\Elementor\\Core\\Files\\CSS\\Post::create($id)->update();
return true;
`);
console.log(`${ORIGIN}/${fpath}/`);
