// VisitorGroups (visit/VisitorGroups.tsx): 2x2 audience cards. untrim. Tags keep their literal double spaces (pre-wrap, page CSS).
const { T, FREDOKA, px, pct, pad, P0, AUTO, mtAuto, radius, gap, flex, div, box, w, attrs, text, grad, layers, mix, reveal, ease } = require("../../lib.js");
const { W1360, PHOTO_BG, fillImg, ico, para, STR } = require("../g2-shared.js");

const GROUPS = [
  { title: "Buyers &amp; Procurement<br>Professionals", icon: "g2-prog-s-users", photo: "buyers", pos: "50% 80.3%",
    tags: "Importers  ·  Exporters  ·  Sourcing Professionals  ·  Procurement Teams  ·  <br>Purchasing Managers  ·  Traders  ·  Buying Offices",
    text: "Discover new suppliers, compare products and identify new sourcing opportunities across the fresh food ecosystem." },
  { title: "Distributors, Wholesalers<br>&amp; Retailers", icon: "g2-visit-i-store", photo: "retail", pos: "50% 73.3%",
    tags: "Distributors  ·  Wholesalers  ·  Supermarkets  ·  Grocery Retailers  ·  <br>E‑commerce Platforms  ·  Regional Distribution Networks",
    text: "Meet suppliers, expand your product portfolio and build new commercial relationships across regional and international markets." },
  { title: "Foodservice &amp; <br>Hospitality", icon: "g2-visit-i-chef", photo: "foodservice", pos: "50% 61.3%",
    tags: "Hotels  ·  Restaurants  ·  Catering Companies  ·  Foodservice Operators  · Institutional Buyers",
    text: "Source fresh food products, discover new suppliers and explore solutions that support quality, consistency and supply reliability." },
  { title: "Supply Chain &amp; Industry<br>Professionals", icon: "g2-visit-i-box", photo: "logistics", pos: "50% 85.2%",
    tags: "Logistics Operators  ·  Cold Chain Professionals  ·  Warehousing Specialists  · Supply Chain Managers  ·  Quality &amp; Operations Teams  ·  Industry Organisations",
    text: "Explore technologies, services and partnerships that improve how fresh food is handled, stored, transported and distributed." },
];

const card = (g, k) => {
  const id = `sv-g${k + 1}`;
  return box(id, [
    {
      padding: pad(24, 22, 22, 22), display: "flex", "flex-direction": "column", "justify-content": "space-between", gap: gap(24, 0), "min-height": px(488), "border-radius": radius(26),
      background: layers(grad(180, [["#eef6ef", 0], [T.page, 100]])),
    },
    { tablet_extra: { "min-height": px(0) }, mobile: { padding: pad(22, 18, 18, 18), "border-radius": radius(22) } },
  ], [
    box(`${id}-head`, [
      { padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 24) },
      { mobile: { "flex-direction": "column", gap: gap(16, 0) } },
    ], [
      div(`${id}-icon`, [
        { width: px(72), height: px(72), padding: P0, "border-radius": radius(999), background: { color: T.mint }, display: "flex", "align-items": "center", "justify-content": "center", flex: flex(0, 0, AUTO), transition: ease(250) },
        { mobile: { width: px(60), height: px(60) } },
      ], [ico(`${id}-icon-i`, g.icon, 36)], { attributes: attrs([["data-group-lift", ""]]) }),
      box(`${id}-copy`, [{ padding: P0, width: AUTO, display: "flex", "flex-direction": "column", gap: gap(12, 0), flex: flex(1, 1, pct(0)), "min-width": px(0) }, {}], [
        w(`${id}-title`, "e-heading", { tag: "h2", title: g.title }, [
          { "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(30), "line-height": px(34), margin: P0 },
          { mobile: { "font-size": px(26), "line-height": px(30) } },
        ]),
        para(`${id}-tags`, g.tags, [{ ...text(15, 500, "#000000", { "line-height": px(23) }), margin: P0 }, {}], [["data-prewrap", ""], ...(k < 2 ? [["data-br-xl", ""]] : [])]),
        para(`${id}-text`, g.text, [{ ...text(16, 500, T.body, { "line-height": px(25) }), margin: P0 }, { mobile: { "font-size": px(15), "line-height": px(24) } }]),
      ]),
    ], { attributes: attrs([["data-vg", "head"]]) }),
    div(`${id}-photo`, [
      { position: "relative", overflow: "hidden", padding: P0, flex: flex(0, 0, AUTO), height: px(230), "border-radius": radius(18), background: PHOTO_BG },
      { mobile: { height: px(200) } },
    ], [fillImg(`${id}-img`, "g2-visit-" + g.photo, { pos: g.pos })]),
  ], { tag: "article", attributes: attrs([["data-group", ""], ...reveal(k % 2)]) });
};

module.exports = [
  div("sv-groups", mix(W1360, [
    { margin: mtAuto(24), padding: P0, display: "grid", gap: gap(24), "grid-template-columns": STR("repeat(2, minmax(0, 1fr))") },
    { tablet: { "grid-template-columns": STR("minmax(0, 1fr)") } },
  ]), GROUPS.map(card), { tag: "section" }),
];
