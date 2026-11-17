// One tile per album (Albums > Add New), newest first, in Elementor's Loop: cover (the album's featured image, set to its first photo by
// ffe-content.php), title, link. The Loop's Query ID "ffe_albums" makes ffe-content.php point it at the Albums type (the Loop itself
// offers posts and pages only). Same tile as g8-shared.js grid(): 4 columns, 2 on tablets.
const { px, pct, custom, pad, P0, mtAuto, radius, gap, box, div, w, attrs, text, mix, at } = require("../../lib.js");
const { typedStyles } = require("../../forms.js");

const dyn = (name, group = "post") => ({ $$type: "dynamic", value: { name, group, settings: [] } });
const s = (v) => ({ $$type: "string", value: v });

const tile = box("gl-tile", [{ padding: P0, display: "flex", "flex-direction": "column", width: pct(100) }, {}], [
  div("gl-tile-frame", [
    { position: "relative", overflow: "hidden", "aspect-ratio": "298.85/224.14", padding: P0, "border-radius": radius(20), background: { color: "#28ae3d" } },
    { tablet: { "border-radius": radius(14) } },
  ], [
    w("gl-tile-img", "e-image", { image: { $$type: "image", value: { src: dyn("post-featured-image"), size: s("medium_large") } }, attributes: attrs([["data-zoom", ""]]) }, [
      { ...at(px(0), null, null, px(0)), width: pct(100), height: pct(98.9), "max-width": custom("none"), "object-fit": "cover" }, {},
    ]),
  ]),
  w("gl-tile-cap", "e-paragraph", { tag: "span", paragraph: dyn("post-title") }, [
    { ...text(16.39, 400, "#000000", { "line-height": px(27.32), "text-align": "center" }), padding: pad(8, 2, 2, 2), margin: P0 },
    { mobile: { "font-size": px(14), "line-height": px(20) } },
  ]),
], { tag: "a", link: { $$type: "link", value: { destination: dyn("post-url"), isTargetBlank: { $$type: "boolean", value: false } } }, attributes: attrs([["data-group", ""]]) });

const loop = {
  id: "gl-loop", elType: "e-collection-loop",
  settings: {
    query: { $$type: "loop-query", value: { template_type: s("post"), source: s("post"), posts_per_page: { $$type: "number", value: 48 }, orderby: s("post_date"), order: s("desc"), query_id: s("ffe_albums") } },
  },
  styles: typedStyles("gl-loop", { padding: P0, display: "block", width: pct(100) }),
  elements: [{
    id: "gl-loop-grid", elType: "e-collection-loop-layout", settings: {},
    styles: typedStyles("gl-loop-grid", { padding: pad(0, 6), display: "grid", "grid-template-columns": "repeat(4, minmax(0, 1fr))", gap: gap(15, 26) },
      { tablet: { padding: P0, "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(20, 20) }, mobile: { gap: gap(20, 12) } }),
    elements: [{ id: "gl-loop-item", elType: "e-collection-loop-item", settings: {}, styles: typedStyles("gl-loop-item", { padding: P0, display: "flex", "min-width": px(0) }), elements: [tile] }],
  }],
};

module.exports = [div("gl-gal", mix([{ width: custom("min(1286px, 100% - 64px)"), "max-width": custom("none") }, { mobile: { width: custom("min(1286px, 100% - 52px)") } }], [
  { padding: P0, margin: mtAuto(63), display: "block" }, { tablet: { margin: mtAuto(40) } },
]), [loop], { tag: "section", attributes: attrs([["aria-label", "Albums"]]) })];
