// NewsList (news/NewsList.tsx): every post (News & Press), newest first, in Elementor's Loop: one card design, filled per post by dynamic
// tags. 3 columns (2 on tablets, 1 on phones); the first card is the full-width lead card on desktop (photo 54% left) by page CSS
// (index.js), as NewsList.tsx does with one markup and conditional classes. Editors add a post; it appears here.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, box, div, w, attrs, svg, text, mix, reveal, at } = require("../../lib.js");
const { LIFT } = require("../g4-shared.js");
// The Loop elements, like the e-form, only take fully typed style values (the server types them for ordinary containers only).
const { typedStyles } = require("../../forms.js");

// Dynamic tag values as Elementor 4 stores them (see templates/news-article/article.js).
const dyn = (name, group, settings = {}) => ({
  $$type: "dynamic",
  value: { name, group, settings: Object.fromEntries(Object.entries(settings).map(([k, v]) => [k, { $$type: "string", value: v }])) },
});
const s = (v) => ({ $$type: "string", value: v });

const card = box("nw-card", mix(LIFT, [
  { padding: P0, display: "flex", "flex-direction": "column", overflow: "hidden", "border-radius": radius(22), background: { color: T.white }, width: pct(100), height: pct(100) },
  {},
]), [
  div("nw-card-photo", [
    { position: "relative", overflow: "hidden", padding: P0, width: pct(100), height: px(210), flex: flex(0, 0, AUTO), background: { color: T.mint } }, {},
  ], [
    w("nw-card-img", "e-image", { image: { $$type: "image", value: { src: dyn("post-featured-image", "post"), size: s("large") } }, attributes: attrs([["data-zoom", ""]]) }, [
      { ...at(px(0), null, null, px(0)), width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {},
    ]),
  ]),
  box("nw-card-txt", [
    { padding: pad(22, 26, 26, 26), display: "flex", "flex-direction": "column", "justify-content": "space-between", gap: gap(22, 0), flex: flex(1, 1, AUTO), "min-width": px(0), width: AUTO }, {},
  ], [
    box("nw-card-top", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO }, {}], [
      box("nw-card-meta", [{ padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", "align-items": "center", gap: gap(8, 12), width: AUTO }, {}], [
        w("nw-card-date", "e-paragraph", { tag: "span", paragraph: dyn("post-date", "post", { format: "custom", custom_format: "j M Y" }) }, [
          { ...text(13, 500, T.accent, { "line-height": px(16), "letter-spacing": px(0.52) }), margin: P0 }, {},
        ]),
        w("nw-card-cat", "e-paragraph", { tag: "span", paragraph: dyn("shortcode", "site", { shortcode: "[ffe_post_category]" }) }, [
          { ...text(11, 600, T.forest, { "line-height": px(14), "letter-spacing": px(0.44) }), margin: P0, padding: pad(5, 12), "border-radius": radius(999), background: { color: T.mint } }, {},
        ]),
      ]),
      w("nw-card-title", "e-heading", { tag: "h3", title: dyn("post-title", "post") }, [
        { "font-family": FREDOKA, "font-size": px(23), "font-weight": "600", "line-height": px(29), color: T.forest, margin: P0 }, {},
      ]),
      w("nw-card-excerpt", "e-paragraph", { paragraph: dyn("post-excerpt", "post") }, [{ ...text(15, 500, T.body, { "line-height": px(23) }), margin: P0 }, {}]),
    ]),
    box("nw-card-more", [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 14), width: AUTO }, {}], [
      w("nw-card-more-t", "e-paragraph", { tag: "span", paragraph: "Read More" }, [{ ...text(15, 600, T.forest, { "line-height": px(20) }), margin: P0 }, {}]),
      box("nw-card-arrow", [{ width: px(40), height: px(40), "min-width": px(40), padding: P0, "border-radius": radius(999), "border-width": pad(1.5), "border-style": "solid", "border-color": T.accent, display: "flex", "justify-content": "center", "align-items": "center" }, {}], [
        svg("nw-card-chev", "g4-icon-chevron-right", [{ width: px(18), height: px(18) }, {}], { attributes: attrs([["data-group-nudge", ""]]) }),
      ]),
    ], { attributes: attrs([["aria-hidden", "true"]]) }),
  ]),
], { tag: "a", link: { $$type: "link", value: { destination: dyn("post-url", "post"), isTargetBlank: { $$type: "boolean", value: false } } }, attributes: attrs([["data-group", ""]]) });

const loop = {
  id: "nw-loop", elType: "e-collection-loop",
  settings: {
    query: { $$type: "loop-query", value: { template_type: s("post"), source: s("post"), posts_per_page: { $$type: "number", value: 12 }, orderby: s("post_date"), order: s("desc") } },
  },
  styles: typedStyles("nw-loop", { padding: P0, display: "block", width: pct(100) }),
  elements: [{
    id: "nw-loop-grid", elType: "e-collection-loop-layout", settings: {},
    styles: typedStyles("nw-loop-grid", { padding: P0, display: "grid", "grid-template-columns": "repeat(3, minmax(0, 1fr))", gap: gap(24, 24) },
      { tablet: { "grid-template-columns": "repeat(2, minmax(0, 1fr))" }, mobile: { "grid-template-columns": "minmax(0, 1fr)" } }),
    elements: [{ id: "nw-loop-item", elType: "e-collection-loop-item", settings: {}, styles: typedStyles("nw-loop-item", { padding: P0, display: "flex", "min-width": px(0) }), elements: [card] }],
  }],
};

module.exports = [div("nw-list", mix([{ width: custom("min(1280px, 100% - 64px)"), "max-width": custom("none") }, { mobile: { width: custom("min(1280px, 100% - 52px)") } }], [
  { padding: pad(48, 0, 8, 0), margin: mtAuto(0), display: "block" }, { tablet: { padding: pad(40, 0, 8, 0) } },
]), [loop], { tag: "section", attributes: attrs([["aria-label", "Latest news"], ...reveal(0)]) })];
