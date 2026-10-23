// Buyers (exhibit/Buyers.tsx): copy + panel of 8 buyer tiles beside a two-photo collage. untrim.
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, div, box, w, attrs, media, text, at, FILL, grad, layers, mix, reveal, shadow, ease } = require("../../lib.js");
const { NARROW, PHOTO_BG, H2X, LEADX, SMALL, COVER, ico, h2, para } = require("../g2-shared.js");
const { pill } = require("../../lib.js");

const M = media();
const TILES = [
  ["Importers", "ship"], ["Distributors", "truck"], ["Wholesalers", "store"], ["Retailers", "cart"],
  ["Foodservice <br>Operators", "utensils"], ["Procurement &amp; <br>Sourcing", "users"], ["Traders", "globe"], ["E-commerce &amp; <br>Grocery", "monitor"],
];
const OUTLINE = { color: "#000000", bg: "rgba(0,0,0,0)", border: [1.5, "#000000"], hoverBg: "rgba(0,0,0,0.05)" };

const tile = ([label, icon], k) =>
  box(`we-buy-t${k + 1}`, [
    { padding: pad(12, 14), height: px(64), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 12), "border-radius": radius(14), background: { color: T.white } }, {},
  ], [
    ico(`we-buy-t${k + 1}-i`, "g2-ex-b-" + icon, 26),
    para(`we-buy-t${k + 1}-t`, label, [
      { ...text(14, 500, "#000000", { "line-height": px(18) }), margin: P0, flex: flex(1, 1, pct(0)), "min-width": px(0), ...(k === 5 && { "max-width": px(101) }) },
      k === 5 ? { mobile: { "max-width": custom("none") } } : {},
    ], [["data-br-sm", ""]]),
  ], { attributes: attrs([["role", "listitem"]]) });

const copy = box("we-buy-copy", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), flex: flex(1, 1, pct(0)), "min-width": px(0) }, {}], [
  h2("we-buy-title", "Connect with the buyers that matter", mix(H2X, [{ height: px(37) }, { tablet_extra: { height: AUTO } }])),
  para("we-buy-lede", "Meet professionals responsible for sourcing, procurement, distribution and purchasing across the fresh food industry.", LEADX()),
  box("we-buy-panel", [
    { padding: pad(20, 16), display: "flex", "flex-direction": "column", gap: gap(14, 0), width: pct(100), "border-radius": radius(22), background: layers(grad(90, [[T.mint, 0], ["#eef6ef", 100]])) }, {},
  ], [
    para("we-buy-panel-t", "Fresh Food Expo Asia Pacific (FFE&nbsp;APAC) brings together:", [{ ...text(17, 600, T.accent, { "line-height": px(22) }), margin: P0 }, {}]),
    div("we-buy-grid", [
      { padding: P0, display: "grid", width: pct(100), gap: gap(14, 10), "grid-template-columns": { $$type: "string", value: "repeat(4, minmax(0, 1fr))" } },
      { mobile: { "grid-template-columns": { $$type: "string", value: "minmax(0, 1fr)" } } },
    ], TILES.map(tile), { attributes: attrs([["role", "list"]]) }),
  ]),
  para("we-buy-close", "Build new relationships, reconnect with existing customers and put your business in front of prospective buyers from across Asia Pacific and global markets.", SMALL),
  pill("we-buy-pill", "Who Should Visit", "/who-should-visit", OUTLINE),
], { attributes: attrs(reveal(0)) });

const media_ = box("we-buy-media", [
  { position: "relative", padding: P0, "aspect-ratio": "440/520", flex: flex(0, 0, AUTO), width: px(440), margin: pad(0) },
  { tablet_extra: { width: pct(100), "max-width": px(440), margin: mtAuto(0) } },
], [
  div("we-buy-p1", [
    { ...at(pct(5), null, null, pct(5)), width: pct(81.6432), height: pct(69.0827), overflow: "hidden", padding: P0, "border-radius": radius(23.35), background: PHOTO_BG }, {},
  ], [
    w("we-buy-p1-img", "e-image", { image: image(M["g2-ex-buyer-meeting"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), ...COVER }, {}]),
  ], { attributes: attrs([["data-group", ""]]) }),
  div("we-buy-p2", [
    { ...at(pct(56.8115), null, null, pct(45.8227)), width: pct(48.9864), height: pct(37.9962), overflow: "hidden", padding: P0, "border-radius": radius(21.55), "border-width": pad(7.185), "border-style": "solid", "border-color": T.page, background: PHOTO_BG }, {},
  ], [
    w("we-buy-p2-img", "e-image", { image: image(M["g2-ex-stand-chat"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...at(pct(-2.81), null, null, pct(0.37)), width: pct(172.69), height: pct(107.84), "max-width": custom("none") }, {}]),
  ], { attributes: attrs([["data-group", ""]]) }),
], { attributes: attrs(reveal(1)) });

module.exports = [
  box("we-buy", mix(NARROW, [
    { margin: mtAuto(72), padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 40) },
    { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(40, 0) }, tablet: { margin: mtAuto(48) } },
  ]), [copy, media_], { tag: "section" }),
];
