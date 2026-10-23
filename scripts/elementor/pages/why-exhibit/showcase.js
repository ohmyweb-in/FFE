// Showcase (exhibit/Showcase.tsx): leaf, head, 3 area cards, closing copy and two pills. untrim. Cards reveal and only gain a shadow on hover.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, div, box, w, attrs, media, text, at, FILL, mix, reveal, shadow, ease, rotate, svg, pill } = require("../../lib.js");
const { NARROW, PHOTO_BG, H2X, LEADX, SMALL, COVER, ico, h2, para, pos, STR } = require("../g2-shared.js");

const M = media();
const OUTLINE = { color: "#000000", bg: "rgba(0,0,0,0)", border: [1.5, "#000000"], hoverBg: "rgba(0,0,0,0.05)" };
const CARDS = [
  ["Fresh Food", "Fruit &amp; Vegetables  ·  Meat &amp; Poultry  ·  Seafood  ·  <br>Eggs &amp; Dairy", "g2-card-fresh", "center center", "g2-eco-icon-sprout"],
  ["Agri &amp; Fresh Technology", "Post-Harvest Technologies  ·  Cooling  ·  Preservation · Storage  ·  Packaging  ·  Freshness-Extension Solutions", "g2-card-agri", "center center", "g2-eco-icon-gear"],
  ["Logistics &amp; Distribution", "Transportation – Air, Sea, Land &amp; Rail  ·  Cold Chain  · Warehousing  ·  Supply Chain Solutions", "g2-eco-logistics", "50% 25%", "g2-eco-icon-truck"],
];
const card = ([title, desc, img, op, icon], k) => {
  const id = `we-show-c${k + 1}`;
  return div(id, [
    { position: "relative", overflow: "hidden", padding: P0, height: px(268), "border-radius": radius(20), background: { color: T.white }, transition: ease(250) },
    { hover: { "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") }, tablet_extra: { height: AUTO } },
  ], [
    div(`${id}-media`, [{ position: "relative", height: px(130), overflow: "hidden", padding: P0, background: PHOTO_BG }, {}], [
      w(`${id}-img`, "e-image", { image: image(M[img].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), ...COVER, "object-position": pos(op) }, {}]),
    ]),
    div(`${id}-icon`, [
      { ...at(px(104), null, null, px(18)), width: px(52), height: px(52), padding: P0, "border-radius": radius(999), background: { color: T.white }, display: "flex", "align-items": "center", "justify-content": "center", "box-shadow": shadow(0, 12, 16, 0, "rgba(3,41,26,0.1)") }, {},
    ], [ico(`${id}-icon-i`, icon, 24)]),
    box(`${id}-body`, [{ padding: pad(38, 24, 24, 24), display: "flex", "flex-direction": "column", gap: gap(8, 0) }, {}], [
      w(`${id}-title`, "e-heading", { tag: "h3", title }, [{ "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(20), "line-height": px(26), margin: P0 }, {}]),
      para(`${id}-text`, desc, [{ ...text(14, 500, T.body, { "line-height": px(21) }), margin: P0 }, {}], [["data-prewrap-lg", ""], ...(k === 0 ? [["data-br-lg", ""]] : [])]),
    ]),
  ], { tag: "article", attributes: attrs([["data-group", ""], ...reveal(k)]) });
};

module.exports = [
  box("we-show", mix(NARROW, [
    { margin: mtAuto(72), padding: P0, position: "relative", display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(22, 0) },
    { tablet: { margin: mtAuto(48) } },
  ]), [
    div("we-show-leaf", [
      { ...at(px(-40), px(25.09), null, null), width: px(175.971), height: px(169.192), padding: P0, display: "block" },
      { tablet_extra: { display: "none" } },
    ], [
      svg("we-show-leaf-i", "g2-ex-leaf", [{ ...at(px(37.096), null, null, px(12.986)), width: px(150), height: px(95), "max-width": custom("none"), transform: rotate(40) }, {}]),
    ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    box("we-show-head", [{ position: "relative", padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(22, 0) }, {}], [
      h2("we-show-title", "Showcase your products and solutions", H2X),
      para("we-show-lede", "Fresh Food Expo APAC brings together three key areas of the fresh food ecosystem:", LEADX("#000000")),
    ], { attributes: attrs(reveal(0)) }),
    div("we-show-grid", [
      { padding: pad(6, 0), display: "grid", width: pct(100), gap: gap(22), "grid-template-columns": STR("repeat(3, minmax(0, 1fr))") },
      { tablet_extra: { "grid-template-columns": STR("repeat(2, minmax(0, 1fr))") }, mobile: { "grid-template-columns": STR("minmax(0, 1fr)") } },
    ], CARDS.map(card)),
    para("we-show-close", "Whether you are supplying fresh food, providing technologies that preserve quality and freshness, or delivering logistics solutions that keep products moving, Fresh Food Expo APAC gives your business a platform to connect with the wider ecosystem.", SMALL, [...reveal(0)]),
    box("we-show-ctas", [
      { padding: pad(4, 0, 0, 0), width: AUTO, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", "align-items": "flex-start", gap: gap(14) },
      { mobile: { "flex-direction": "column", "flex-wrap": "nowrap", "align-items": "stretch" } },
    ], [
      pill("we-show-exhibit", "Who Should Exhibit", "/who-should-exhibit"),
      pill("we-show-eco", "Explore the Fresh Food Ecosystem", "/ecosystem", { ...OUTLINE, styles: [{}, { mobile: { padding: pad(10, 18) } }] }),
    ], { attributes: attrs(reveal(0)) }),
  ], { tag: "section" }),
];
