// Single: News article (Theme Builder, every post). Back link, date + category, title, summary, featured photo + its caption (dynamic tags),
// the post's own body (Post Content widget, wrapped in .na-body by ffe-content.php), then tail.html: the closing blocks of every release.
const fs = require("fs");
const path = require("path");
const { T, FREDOKA, px, pad, P0, AUTO, mtAuto, radius, gap, div, box, w, text, mix, pct, custom } = require("../../lib.js");
const { CW } = require("../../pages/g4-shared.js");

const TAIL = fs.readFileSync(path.join(__dirname, "tail.html"), "utf8").replace(/^<!--.*-->\n/, "");
// A dynamic tag as Elementor 4 stores it (read back from a tag bound in the editor, 17 Nov 2026). settings: { key: string }.
const dyn = (name, group, settings = {}) => ({
  $$type: "dynamic",
  value: { name, group, settings: Object.fromEntries(Object.entries(settings).map(([k, v]) => [k, { $$type: "string", value: v }])) },
});

module.exports = [div("na-article", mix(CW(880), [{ padding: pad(48, 0, 0, 0), margin: mtAuto(0), display: "block" }, { tablet: { padding: pad(32, 0, 0, 0) } }]), [
  w("na-back", "e-paragraph", { paragraph: '<a href="/news/">‹&nbsp; News &amp; Press</a>' }, [{ ...text(15, 600, T.forest, { "line-height": px(20) }), margin: P0 }, {}]),
  box("na-meta", [
    { padding: P0, margin: pad(36, 0, 0, 0), display: "flex", "flex-direction": "row", "flex-wrap": "wrap", "align-items": "center", gap: gap(8, 12), width: AUTO },
    { tablet: { margin: pad(28, 0, 0, 0) } },
  ], [
    w("na-date", "e-paragraph", { tag: "span", paragraph: dyn("post-date", "post", { format: "custom", custom_format: "j M Y" }) }, [
      { ...text(13, 500, T.accent, { "line-height": px(24), "letter-spacing": px(0.52) }), margin: P0 }, {},
    ]),
    w("na-cat", "e-paragraph", { tag: "span", paragraph: dyn("shortcode", "site", { shortcode: "[ffe_post_category]" }) }, [
      { ...text(11, 600, T.forest, { "line-height": px(14), "letter-spacing": px(0.44) }), margin: P0, padding: pad(5, 12), "border-radius": radius(999), background: { color: T.mint } }, {},
    ]),
  ]),
  w("na-title", "e-heading", { tag: "h1", title: dyn("post-title", "post") }, [
    { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", "line-height": px(56), color: T.forest, margin: pad(18, 0, 0, 0) },
    { tablet: { "font-size": px(42), "line-height": px(50) }, mobile: { "font-size": px(32), "line-height": px(38) } },
  ]),
  w("na-standfirst", "e-paragraph", { paragraph: dyn("post-excerpt", "post") }, [
    { ...text(21, 500, T.body, { "line-height": px(31) }), margin: pad(16, 0, 0, 0) }, { mobile: { "font-size": px(19), "line-height": px(28) } },
  ]),
  w("na-photo", "e-image", { image: { $$type: "image", value: { src: dyn("post-featured-image", "post"), size: { $$type: "string", value: "full" } } } }, [
    { width: pct(100), height: custom("auto"), "max-width": custom("none"), "border-radius": radius(28), margin: pad(40, 0, 0, 0) },
    { tablet: { "border-radius": radius(20), margin: pad(32, 0, 0, 0) } },
  ]),
  w("na-caption", "e-paragraph", { paragraph: dyn("featured-image-data", "media", { attachment_data: "caption" }) }, [
    { ...text(14, 400, T.body, { "line-height": px(21) }), margin: pad(14, 0, 0, 0) }, {},
  ]),
  { id: "na-content", elType: "widget", widgetType: "theme-post-content", settings: {}, elements: [], styles: {} },
  { id: "na-tail", elType: "widget", widgetType: "html", settings: { html: TAIL }, elements: [], styles: {} },
], { tag: "article" })];
