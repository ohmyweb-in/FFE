// NewsList (news/NewsList.tsx): the newest post as a full-width lead card (photo 54% left at lg+, stacked below).
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, box, div, w, attrs, image, media, svg, text, mix, reveal, at } = require("../../lib.js");
const { LIFT } = require("../g4-shared.js");
const M = media();

const POST = {
  href: "/news/messe-berlin-launches-fresh-food-expo-asia-pacific/",
  title: "Messe Berlin launches Fresh Food Expo Asia Pacific in Singapore",
  excerpt: "Messe Berlin today announced the launch of Fresh Food Expo Asia Pacific (FFE APAC), a new international B2B trade show bringing together the broader fresh food value chain across Asia Pacific.",
};

module.exports = [div("nw-list", mix([{ width: custom("min(1280px, 100% - 64px)"), "max-width": custom("none") }, { mobile: { width: custom("min(1280px, 100% - 52px)") } }], [
  { padding: pad(48, 0, 8, 0), margin: mtAuto(0), display: "block" }, { tablet: { padding: pad(40, 0, 8, 0) } },
]), [
  box("nw-card", mix(LIFT, [
    { padding: P0, display: "flex", "flex-direction": "row", overflow: "hidden", "border-radius": radius(28), background: { color: T.white }, width: pct(100) },
    { tablet: { "flex-direction": "column", "border-radius": radius(22) } },
  ]), [
    div("nw-card-photo", [
      { position: "relative", overflow: "hidden", padding: P0, width: pct(54), "min-height": px(360), flex: flex(0, 0, AUTO), background: { color: T.mint } },
      { tablet: { width: pct(100), "min-height": px(0), height: px(300) }, mobile: { height: px(210) } },
    ], [
      w("nw-card-img", "e-image", { image: image(M["g8-signing-2"].id), attributes: attrs([["data-zoom", ""]]) }, [
        { ...at(px(0), null, null, px(0)), width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {},
      ]),
    ]),
    box("nw-card-txt", [
      { padding: pad(40, 44), display: "flex", "flex-direction": "column", "justify-content": "space-between", gap: gap(22, 0), flex: flex(1, 1, pct(0)), "min-width": px(0), width: AUTO },
      { tablet: { padding: pad(22, 26, 26, 26) } },
    ], [
      box("nw-card-top", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO }, {}], [
        w("nw-card-meta", "e-paragraph", { paragraph: '<time datetime="2026-10-27">27 OCT 2026</time><span>Press Release</span>' }, [
          { ...text(13, 500, T.accent, { "line-height": px(24), "letter-spacing": px(0.52) }), margin: P0 }, {},
        ]),
        w("nw-card-title", "e-heading", { tag: "h3", title: POST.title }, [
          { "font-family": FREDOKA, "font-size": px(32), "font-weight": "600", "line-height": px(40), color: T.forest, margin: P0 },
          { tablet: { "font-size": px(23), "line-height": px(29) } },
        ]),
        w("nw-card-excerpt", "e-paragraph", { paragraph: POST.excerpt }, [{ ...text(15, 500, T.body, { "line-height": px(23) }), margin: P0 }, {}]),
      ]),
      box("nw-card-more", [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 14), width: AUTO }, {}], [
        w("nw-card-more-t", "e-paragraph", { tag: "span", paragraph: "Read More" }, [{ ...text(15, 600, T.forest, { "line-height": px(20) }), margin: P0 }, {}]),
        box("nw-card-arrow", [{ width: px(40), height: px(40), "min-width": px(40), padding: P0, "border-radius": radius(999), "border-width": pad(1.5), "border-style": "solid", "border-color": T.accent, display: "flex", "justify-content": "center", "align-items": "center" }, {}], [
          svg("nw-card-chev", "g4-icon-chevron-right", [{ width: px(18), height: px(18) }, {}], { attributes: attrs([["data-group-nudge", ""]]) }),
        ]),
      ], { attributes: attrs([["aria-hidden", "true"]]) }),
    ]),
  ], { tag: "a", link: link(POST.href), attributes: attrs([["data-group", ""], ["aria-label", POST.title]]) }),
], { tag: "section", attributes: attrs([["aria-label", "Latest news"], ...reveal(0)]) })];
