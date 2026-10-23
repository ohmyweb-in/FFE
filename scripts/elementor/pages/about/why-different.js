// WhyDifferent (about/WhyDifferent.tsx): five points; on hover-capable desktops the descriptions fold away until hovered (page CSS).
const { T, OUTFIT, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, box, div, w, attrs, media, text, at, mix, reveal, svg, shadow, layers, grad, rotate } = require("../../lib.js");
const { NARROW, H44, B15, BORDER_L } = require("../g1-shared.js");

const M = media();
const POINTS = [
  { title: ["Source-to-market", "by design"], desc: "A dedicated platform connecting fresh food with the technologies that preserve quality and freshness and the logistics and distribution solutions that move products efficiently through the supply chain." },
  { title: ["Built for", "Asia Pacific"], desc: "Focused on the opportunities and priorities shaping the region, including food security, supply chain resilience, sustainability, innovation and cross-border trade." },
  { title: ["Built for", "business partnerships"], desc: "Designed to enable sourcing, supplier discovery, buyer connections, market entry and long-term commercial partnerships." },
  { title: ["Connecting industry", "and innovation"], desc: "Bringing together fresh food suppliers, technology and solution providers, logistics and supply chain specialists, buyers, industry organisations and other public and private sector stakeholders." },
  { title: ["Strategically located", "in Singapore"], desc: "A strategic gateway connecting Southeast Asia, the wider Asia Pacific region and global markets." },
];

const point = (p, i) => {
  const id = `au-wd-pt${i + 1}`;
  return box(id, [
    { padding: pad(0, 28, 0, i ? 28 : 0), display: "flex", "flex-direction": "column", gap: gap(16, 0), flex: flex(1, 0, px(0)), ...(i && BORDER_L) },
    { tablet: { "flex-direction": "row", gap: gap(0, 16), padding: P0, "border-width": pad(0), flex: flex(0, 1, AUTO) } },
  ], [
    box(`${id}-ic`, [
      { width: px(72), height: px(72), padding: P0, display: "flex", "justify-content": "center", "align-items": "center", flex: flex(0, 0, AUTO), "border-radius": radius(999), background: { color: "#ffffff" }, "box-shadow": shadow(0, 12, 16, 0, "rgba(3,41,26,0.1)") },
      { tablet: { width: px(56), height: px(56) } },
    ], [
      w(`${id}-icon`, "e-image", { image: image(M[`g1-pt${i + 1}`].id) }, [{ width: px(31), height: px(31) }, { tablet: { width: px(26), height: px(26) } }]),
    ], { attributes: attrs([["data-pt-ic", ""]]) }),
    box(`${id}-tx`, [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(16, 0), "min-width": px(0) }, { tablet: { gap: gap(6, 0) } }], [
      w(`${id}-title`, "e-heading", { tag: "h3", title: `${p.title[0]} <br>${p.title[1]}`, attributes: attrs([["data-br-lg", ""]]) }, [
        { "font-family": OUTFIT, "font-weight": "600", "font-size": px(19), "line-height": px(24), color: T.forest, margin: P0 }, {},
      ]),
      div(`${id}-dw`, [{ padding: P0, display: "grid" }, {}], [
        w(`${id}-desc`, "e-paragraph", { paragraph: p.desc }, mix(B15(21), [{ "min-height": px(0), overflow: "hidden" }, {}])),
      ], { attributes: attrs([["data-pt-desc", ""]]) }),
    ]),
  ], { attributes: attrs([["role", "listitem"], ...reveal(i), ["data-pt", ""]]) });
};

module.exports = [div("au-wd", [
  { position: "relative", width: pct(100), overflow: "hidden", padding: P0, margin: mtAuto(46), background: layers(grad(180, [[T.mint, 0], [T.page, 100]])) }, {},
], [
  svg("au-wd-leaf", "g1-leaf-deco", [
    { ...at(px(-28), null, null, custom("calc(50% + 588px)")), width: px(200), height: px(130), "max-width": custom("none"), transform: rotate(-25) },
    { tablet_extra: { display: "none" } },
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  div("au-wd-inner", mix([{ padding: P0 }, {}], NARROW([0]), [
    { position: "relative", padding: pad(72, 0, 53, 0) }, { tablet: { padding: pad(48, 0, 48, 0) } },
  ]), [
    w("au-wd-title", "e-heading", { tag: "h2", title: "Why <em>Fresh Food Expo APAC</em> is different", attributes: attrs(reveal(0)) }, H44),
    div("au-wd-points", [
      { padding: P0, margin: pad(44, 0, 0, 0), display: "flex", "flex-direction": "row", "align-items": "stretch", gap: gap(0, 0) },
      { tablet: { display: "grid", "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(28, 28), margin: pad(32, 0, 0, 0) }, mobile: { "grid-template-columns": "minmax(0, 1fr)" } },
    ], POINTS.map(point), { attributes: attrs([["role", "list"]]) }),
  ]),
], { tag: "section" })];
