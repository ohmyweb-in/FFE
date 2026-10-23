// Ecosystem OnePlatform (ecosystem/OnePlatform.tsx): mint panel, heading, three pillar cards with flow arrows.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, flex, gap, image, w, attrs, media, at, FILL, svg, reveal, mix, grad, layers, lift, shadow, ease, rotate, sz } = require("../../lib.js");
const { PANEL, EB, H2, LEAD, MINTG, rad, dv, fx, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const radius = (r) => rad(r, r, r, r);
const POS = (v) => ({ $$type: "object-position", value: { x: sz(50, "%"), y: sz(v === "center" ? 50 : 11, "%") } });

const PILLARS = [
  { key: "fresh", img: "g3-card-fresh", icon: "icon-fresh", pos: "center", h: 536, title: "Fresh Food", lead: "Where fresh food begins.",
    desc: "Fresh food products supplied by growers, producers, farms, fisheries, exporters and suppliers from across Asia Pacific and global markets.",
    tags: ["Fruit &amp; Vegetables", "Meat &amp; Poultry", "Seafood", "Eggs &amp; Dairy"] },
  { key: "agri", img: "g3-card-agri", icon: "icon-agri", pos: "center", h: 536, title: "Agri &amp; Fresh Technology", lead: "Protecting quality and extending freshness.",
    desc: "Technologies and solutions that support the handling, cooling, preservation, storage and packaging of fresh food.",
    tags: ["AgriTech", "Cooling", "Preservation", "Packaging"] },
  { key: "logistics", img: "g3-card-logistics", icon: "icon-logistics", pos: "50% 11%", h: 537, title: "Logistics &amp; Distribution", lead: "Connecting fresh food with markets.",
    desc: "Transportation, cold chain, warehousing and supply chain solutions that enable fresh food to move safely and efficiently from source to buyers and markets.",
    tags: ["Transportation – Air, Sea, Land &amp; Rail", "Cold Chain", "Warehousing", "Supply Chain"] },
];
const ARIA = attrs([["aria-hidden", "true"]]);

const card = (p, i) => {
  const id = `es-op-c${i + 1}`;
  return dv(id, { width: pct(100), "max-width": NONE, "min-width": px(0), flex: flex(1, 1, pct(0)) },
    { tablet_extra: { "max-width": px(520), flex: flex(0, 1, AUTO) } }, [
    dv(`${id}-card`, {
      position: "relative", display: "flex", "flex-direction": "column", overflow: "hidden", "border-radius": radius(26), background: { color: T.white },
      height: px(p.h), transition: ease(250),
    }, { hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") }, tablet_extra: { height: AUTO } }, [
      dv(`${id}-media`, { position: "relative", height: px(180), "flex-shrink": 0, overflow: "hidden", ...MINTG }, {}, [
        w(`${id}-img`, "e-image", { image: image(M[p.img].id), attributes: attrs([["data-zoom", ""]]) },
          [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover", "object-position": POS(p.pos) }]),
      ]),
      dv(`${id}-body`, { display: "flex", "flex-direction": "column", gap: gap(10), padding: pad(46, 26, 28, 26) }, {}, [
        hd(`${id}-title`, "h3", p.title, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(26), "line-height": px(32), color: T.accent, margin: P0 }, {}]),
        pg(`${id}-lead`, p.lead, [{ "font-family": { $$type: "font-family", value: "Outfit" }, "font-weight": "600", "font-size": px(15), "line-height": px(20), color: "#000000", margin: P0 }, {}]),
        pg(`${id}-desc`, p.desc, [{ "font-family": { $$type: "font-family", value: "Outfit" }, "font-weight": "500", "font-size": px(15), "line-height": px(22), color: T.body, margin: P0 }, {}]),
        fx(`${id}-tags`, { display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(8), padding: pad(8, 0, 0, 0) }, {},
          p.tags.map((t, k) => fx(`${id}-tag${k + 1}`, {
            display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(5), "border-radius": radius(999), background: { color: "rgba(226,240,228,0.5)" },
            padding: pad(7, 14), width: AUTO,
          }, {}, [
            svg(`${id}-tag${k + 1}-ic`, "check", [{ width: px(14), height: px(14), "flex-shrink": 0 }, {}], { attributes: ARIA }),
            pg(`${id}-tag${k + 1}-t`, t, [{ "font-family": { $$type: "font-family", value: "Outfit" }, "font-weight": "600", "font-size": px(12), "line-height": px(16), color: T.forest, margin: P0 }, {}], { tag: "span" }),
          ], { attributes: attrs([["role", "listitem"]]) })),
          { attributes: attrs([["role", "list"]]) }),
      ]),
      // ring + icon come after the body so they paint over it (atomic boxes are position:relative, later siblings win)
      svg(`${id}-ring`, "g3-ring", [{ ...at(px(144), null, null, px(18)), width: px(68.7125), height: px(68.7125), "max-width": NONE }, {}], { attributes: ARIA }),
      w(`${id}-icon`, "e-image", { image: image(M[p.icon].id), attributes: ARIA },
        [{ ...at(px(157.5), null, null, px(36.09)), width: px(32.52), height: px(32.52), "max-width": NONE }]),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(i)) });
};

const arrow = (n) =>
  fx(`es-op-arrow${n}`, { display: "flex", "align-items": "center", "justify-content": "center", width: AUTO, "min-width": px(0), height: AUTO }, { tablet_extra: { height: px(44) } }, [
    svg(`es-op-arrow${n}-i`, "g3-arrow", [{ width: px(18), height: px(18) }, { tablet_extra: { transform: rotate(90) } }]),
  ], { attributes: ARIA });

const row = fx("es-op-row", { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(12) },
  { tablet_extra: { "flex-direction": "column", gap: gap(0) } },
  PILLARS.flatMap((p, i) => (i ? [arrow(i + 1), card(p, i)] : [card(p, i)])));

const [d, m] = mix(PANEL, [{ margin: mtAuto(20.63) }, { tablet: { margin: mtAuto(24) } }]);
module.exports = [dv("es-op", d, m, [
  dv("es-op-panel", {
    position: "relative", display: "flex", "flex-direction": "column", gap: gap(32), "border-radius": radius(36),
    ...{ background: layers(grad(180, [[T.mint, 0], ["#eef6ef", 100]])) }, padding: pad(48, 40, 48, 40),
  }, { tablet: { "border-radius": radius(24) }, mobile: { padding: pad(36, 20, 36, 20) } }, [
    svg("es-op-leaf", "g3-leaf", [{ ...at(px(-0.32), px(0), null, null), width: px(270.04), height: px(146.681), "max-width": NONE, display: "flex" }, { tablet_extra: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    dv("es-op-head", { position: "relative", display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(12) }, {}, [
      pg("es-op-eyebrow", "The fresh food ecosystem", EB),
      hd("es-op-title", "h2", "One platform.<br> Connecting <em>fresh food</em> from source to market", mix(H2(42, 48), [{ "max-width": px(882), width: AUTO }, {}])),
      pg("es-op-lede", "Fresh Food Expo APAC is built around three interconnected pillars of the fresh food value chain.", LEAD),
    ], { attributes: attrs(reveal(0)) }),
    row,
  ]),
], { tag: "section" })];
