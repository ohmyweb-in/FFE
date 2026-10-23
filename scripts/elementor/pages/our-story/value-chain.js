// ValueChain (story/ValueChain.tsx): intro + hall photo, three pillar cards, objective bar.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, radius, gap, flex, image, box, div, w, attrs, media, text, at, FILL, mix, reveal, ease, layers, grad, svg, shadow, pill, ruleEyebrow } = require("../../lib.js");
const { pos, NARROW, H38, B15, CARD_HOVER } = require("../g1-shared.js");

const M = media();
const AUTOS = { "inset-block-start": AUTO, "inset-inline-end": AUTO, "inset-block-end": AUTO, "inset-inline-start": AUTO };
const MINT_GREEN = layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]]));
const CARDS = [
  { title: "Fresh Food", text: "Fruit &amp; Vegetables, Meat &amp; Poultry, Seafood, Eggs &amp; Dairy, supplied by growers, producers, exporters and fresh food suppliers from across regional and global markets.", img: "g1-vc-fresh", pos: [50, 50], icon: "g1-ic-sprout" },
  { title: "Agri &amp; Fresh Technology", text: "Post-harvest technologies, cooling, preservation, storage, packaging and other solutions that help maintain quality, extend freshness, improve efficiency and reduce losses throughout the fresh food journey.", img: "g1-vc-agri", pos: [50, 50], icon: "g1-ic-gear" },
  { title: "Logistics &amp; Distribution", text: "Transportation, cold chain, warehousing, supply chain infrastructure and distribution solutions that enable fresh food to move safely and efficiently across local, regional and international markets.", img: "g1-vc-logistics", pos: [50, 25], icon: "g1-ic-truck" },
];

const card = (c, i) => {
  const id = `os-vc-c${i + 1}`;
  return div(id, [
    { position: "relative", overflow: "hidden", padding: P0, height: px(348), "border-radius": radius(22), background: { color: "#ffffff" }, transition: ease(250) },
    { hover: CARD_HOVER, tablet_extra: { height: AUTO } },
  ], [
    div(`${id}-media`, [{ position: "relative", height: px(150), overflow: "hidden", padding: P0, background: MINT_GREEN }, {}], [
      w(`${id}-img`, "e-image", { image: image(M[c.img].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover", "object-position": pos(...c.pos) }, {}]),
    ]),
    box(`${id}-ic`, [
      { ...at(px(122), null, null, px(22)), width: px(56), height: px(56), padding: P0, display: "flex", "justify-content": "center", "align-items": "center", "border-radius": radius(999), background: { color: "#ffffff" }, "box-shadow": shadow(0, 12, 16, 0, "rgba(3,41,26,0.1)") }, {},
    ], [svg(`${id}-ic-i`, c.icon, [{ width: px(26), height: px(26) }, {}], { attributes: attrs([["aria-hidden", "true"]]) })]),
    box(`${id}-body`, [{ padding: pad(40, 26, 28, 26), display: "flex", "flex-direction": "column", gap: gap(10, 0), width: AUTO }, {}], [
      w(`${id}-title`, "e-heading", { tag: "h3", title: c.title }, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(22), "line-height": px(28), color: T.accent, margin: P0 }, {}]),
      w(`${id}-text`, "e-paragraph", { paragraph: c.text }, [{ ...text(15, 500, T.body, { "line-height": px(23) }), margin: P0 }, {}]),
    ]),
  ], { tag: "article", attributes: attrs([["data-group", ""], ...reveal(i)]) });
};

module.exports = [box("os-vc", mix([{ padding: P0 }, {}], NARROW([48, 48, 80]), [{ display: "flex", "flex-direction": "column", gap: gap(32, 0) }, {}]), [
  box("os-vc-top", [
    { padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 56), width: AUTO },
    { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0), width: pct(100) } },
  ], [
    box("os-vc-copy", [
      { padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), width: px(740), flex: flex(0, 0, AUTO) },
      { tablet_extra: { width: pct(100), flex: flex(0, 1, AUTO) } },
    ], [
      ruleEyebrow("os-vc-eb", "Connecting the fresh food value chain"),
      w("os-vc-title", "e-heading", { tag: "h2", title: "Fresh food depends on more than the product itself." }, H38),
      w("os-vc-p1", "e-paragraph", { paragraph: "From post-harvest handling and preservation to cold chain, logistics, distribution and market access, every stage plays a role in maintaining freshness, quality, safety and availability." }, B15(24)),
      w("os-vc-p2", "e-paragraph", { paragraph: "Fresh Food Expo APAC brings these interconnected parts of the value chain together on one dedicated business platform." }, B15(24)),
    ], { attributes: attrs(reveal(0)) }),
    div("os-vc-media", [
      { position: "relative", padding: P0, height: px(300), "min-width": px(0), flex: flex(1, 1, pct(0)) },
      { tablet_extra: { height: AUTO, flex: flex(0, 1, AUTO) } },
    ], [
      div("os-vc-frame", [
        {
          ...at(px(0), null, null, px(40)), overflow: "hidden", padding: P0, width: px(444), height: px(290), "aspect-ratio": "auto", "max-width": px(444),
          "border-radius": { "start-start": px(30), "start-end": px(30), "end-end": px(30), "end-start": px(0) }, background: MINT_GREEN,
        },
        { tablet_extra: { position: "relative", ...AUTOS, width: pct(100), height: AUTO, "aspect-ratio": "444/290" } },
      ], [
        w("os-vc-img", "e-image", { image: image(M["g1-hall"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover", "object-position": pos(0, 50) }, {}]),
      ], { attributes: attrs([["data-group", ""]]) }),
    ], { attributes: attrs(reveal(1)) }),
  ]),
  div("os-vc-cards", [
    { padding: P0, display: "grid", "grid-template-columns": "repeat(3, minmax(0, 1fr))", gap: gap(24, 24) },
    { tablet_extra: { "grid-template-columns": "repeat(2, minmax(0, 1fr))" }, mobile: { "grid-template-columns": "minmax(0, 1fr)" } },
  ], CARDS.map(card)),
  box("os-vc-obj", [
    { padding: pad(20, 22, 20, 28), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 32), "border-radius": radius(22), background: layers(grad(90, [[T.mint, 0], ["#eef6ef", 100]])) },
    { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap(20, 0), padding: pad(20, 20, 20, 20) } },
  ], [
    w("os-vc-obj-t", "e-paragraph", { paragraph: "The objective is to create stronger connections between those who produce fresh food, those who provide the technologies and solutions that preserve it, those who move and distribute it, and the buyers and markets that ultimately need it." }, mix(B15(), [{ "min-width": px(0), flex: flex(1, 1, pct(0)) }, {}])),
    pill("os-vc-cta", "Explore the Fresh Food Ecosystem", "/ecosystem", { color: T.white, bg: T.accent, styles: [{ flex: flex(0, 0, AUTO) }, { mobile: { padding: pad(10, 18) } }] }),
  ], { attributes: attrs(reveal(0)) }),
], { tag: "section" })];
