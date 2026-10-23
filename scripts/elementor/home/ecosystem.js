// Ecosystem (Ecosystem.tsx): head, three pillar cards with flow arrows, CTA. Tailwind margins map 1:1 under data-trim.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, image, box, div, w, attrs, media, text, svg, NORMAL, at, FILL,
  mix, WIDE, PAGE, reveal, rotate, lift, shadow, ease, btn, flex } = require("../lib.js");

const M = media();
const H = { "font-family": FREDOKA, "font-weight": "600", color: T.forest };
const PILLARS = [
  { key: "fresh", title: "Fresh Food", desc: "The products at the heart of the ecosystem.", items: ["Fruit &amp; Vegetables", "Meat &amp; Poultry", "Seafood", "Eggs &amp; Dairy"] },
  { key: "agri", title: "Agri &amp; Fresh Technology", desc: "Protecting quality and extending freshness.", items: ["Agri-Tech", "Digital Solutions", "Preservation", "Packaging"] },
  { key: "logistics", title: "Logistic &amp; Distribution", desc: "Solutions that move, store and distribute fresh food efficiently across markets.", items: ["Distribution &amp; Supply Chain", "Cold Chain", "Freight &amp; Transportation", "Storage &amp; Warehousing"] },
];

const cardImg = (id, key) =>
  w(id, "e-image", { image: image(M[key].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }]);

const pillar = (p, i) => {
  const id = `eco-p${i + 1}`;
  return div(id, [
    { width: px(392), "max-width": custom("none"), flex: flex(0, 1, AUTO), padding: P0 },
    { tablet: { width: pct(100), "max-width": px(392) } },
  ], [
    div(`${id}-card`, [
      { height: pct(100), "min-height": px(426), overflow: "hidden", padding: P0, "border-radius": radius(25), background: { color: T.white }, transition: ease(250) },
      { hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") }, mobile: { "min-height": px(410) } },
    ], [
      div(`${id}-media`, [{ position: "relative", "aspect-ratio": "392/171", overflow: "hidden", padding: P0 }], [cardImg(`${id}-img`, "eco-" + p.key)]),
      div(`${id}-body`, [
        { position: "relative", padding: pad(0, 27, 32, 27) },
        { mobile: { padding: pad(0, 27, 13, 27) } },
      ], [
        // icon-ring.svg drawn with CSS: the e-svg sanitizer drops its <filter> (the 5% drop shadow, dy 4, blur 2)
        div(`${id}-ring`, [{ ...at(px(-31), null, null, px(23)), width: px(70), height: px(70), padding: P0 }], [
          div(`${id}-ring-c`, [{ ...at(px(0), null, null, px(4)), width: px(62), height: px(62), "min-width": px(0), padding: P0, "border-radius": radius(999), "box-sizing": "border-box", "border-width": pad(1), "border-style": "solid", "border-color": T.accent, background: { color: T.white }, "box-shadow": shadow(0, 4, 4, 0, "rgba(0,0,0,0.05)") }]),
        ], { attributes: attrs([["aria-hidden", "true"]]) }),
        w(`${id}-icon`, "e-image", { image: image(M["icon-" + p.key].id), attributes: attrs([["aria-hidden", "true"]]) }, [
          { ...at(px(-16.61), null, null, px(41.39)), width: px(33.21), height: px(33.21), "max-width": custom("none") },
        ]),
        w(`${id}-title`, "e-heading", { tag: "h3", title: p.title }, [
          { "font-family": FREDOKA, "font-weight": "600", "font-size": px(26), "line-height": pct(120), color: T.accent, margin: P0, padding: pad(57, 0, 0, 0) },
        ]),
        w(`${id}-desc`, "e-paragraph", { paragraph: p.desc }, [{ ...text(15, 500, "#000000", { "line-height": px(23) }), "max-width": px(332), margin: pad(17, 0, 0, 0) }]),
        box(`${id}-list`, [{ margin: pad(22, 0, 0, 0), padding: P0, display: "flex", "flex-direction": "column" }], p.items.map((it, k) =>
          box(`${id}-li${k + 1}`, [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 5) }], [
            svg(`${id}-li${k + 1}-ic`, "check", [{ width: px(14), height: px(14), flex: flex(0, 0, AUTO) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
            w(`${id}-li${k + 1}-t`, "e-paragraph", { tag: "span", paragraph: it, attributes: attrs([["data-untrim", ""]]) }, [{ ...text(15, 500, "#000000", { "line-height": NORMAL }), margin: P0 }]),
          ], { attributes: attrs([["role", "listitem"]]) })
        ), { attributes: attrs([["role", "list"]]) }),
      ]),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs([...reveal(i), ["data-zoom-m", "903"]]) });
};

const arrow = (n) =>
  box(`eco-arrow${n}`, [
    { width: px(55), flex: flex(0, 0, AUTO), height: AUTO, padding: pad(198, 0, 0, 0), display: "flex", "justify-content": "center", "align-items": "flex-start" },
    { tablet: { width: pct(100), height: px(55), padding: P0, "align-items": "center" }, mobile: { height: px(71) } },
  ], [
    w(`eco-arrow${n}-i`, "e-image", { image: image(M["flow-arrow"].id) }, [{ width: px(31), height: px(31), "max-width": custom("none") }, { tablet: { transform: rotate(90) } }]),
  ], { attributes: attrs([["aria-hidden", "true"]]) });

const eco = div("eco", mix(WIDE, [
  { position: "relative", overflow: "hidden", margin: mtAuto(54), padding: P0, "border-radius": radius(30), background: { color: "rgba(44,166,47,0.25)" }, display: "block" },
  { tablet: { margin: mtAuto(64), "border-radius": radius(24) }, mobile: { margin: mtAuto(29), "border-radius": radius(20) } },
]), [
  svg("eco-leaf", "leaf-outline", [
    { ...at(px(0), px(0), null, null), width: px(440), height: px(239), "max-width": custom("none") },
    { tablet_extra: { width: px(300), height: px(163) }, tablet: { width: px(260), height: px(141) }, mobile: { width: px(180), height: px(98) } },
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  div("eco-inner", mix(PAGE(32, 18), [
    { position: "relative", margin: mtAuto(0), padding: pad(69, 0, 54, 0), display: "block" },
    { tablet: { padding: pad(48, 0, 48, 0) }, mobile: { padding: pad(55, 0, 60, 0) } },
  ]), [
    div("eco-head", [
      { padding: pad(0, 0, 0, 6) },
      { tablet: { padding: P0 }, mobile: { padding: pad(0, 0, 0, 2) } },
    ], [
      w("eco-eyebrow", "e-paragraph", { paragraph: "About fresh food expo apac" }, [
        { ...text(15, 500, T.brand, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: P0 },
        { mobile: { color: T.accent } },
      ]),
      w("eco-title", "e-heading", { tag: "h2", title: "Connecting the fresh food ecosystem" }, [
        { ...H, "font-size": px(48), "line-height": px(52.2), "max-width": px(825), margin: pad(28, 0, 0, 0) },
        { tablet: { "font-size": px(40), "line-height": pct(109), margin: pad(20, 0, 0, 0) }, mobile: { "font-size": px(30), "line-height": px(38.2), "max-width": px(354), margin: pad(28, 0, 0, 0) } },
      ]),
      w("eco-lede", "e-paragraph", { paragraph: "One Platform. Fresh Food, Agri &amp; Fresh Technology, Logistics &amp; Distribution." }, [
        { ...text(18, 500, T.forest, { "line-height": NORMAL }), "max-width": px(615), margin: pad(32, 0, 0, 0) },
        { tablet: { margin: pad(24, 0, 0, 0) }, mobile: { "max-width": px(354), margin: pad(28, 0, 0, 0) } },
      ]),
    ], { attributes: attrs(reveal(0)) }),
    box("eco-row", [
      { margin: pad(54, 0, 0, 0), padding: P0, display: "flex", "flex-direction": "row", "align-items": "stretch" },
      { tablet: { "flex-direction": "column", "align-items": "center", margin: pad(40, 0, 0, 0) }, mobile: { margin: pad(33, 0, 0, 0) } },
    ], PILLARS.flatMap((p, i) => (i ? [arrow(i + 1), pillar(p, i)] : [pillar(p, i)]))),
    box("eco-cta-row", [
      { margin: pad(42, 0, 0, 0), padding: P0, display: "flex", "flex-direction": "row", "justify-content": "center" },
      { tablet: { margin: pad(40, 0, 0, 0) }, mobile: { margin: pad(44, 0, 0, 0) } },
    ], [
      btn("eco-cta", "Explore the Full Fresh Food Ecosystem", "/ecosystem", {
        w: 398, h: 52, pl: 35, gap: 18.66, chev: "chevron-white", color: T.white, bg: T.brand, border: [1.5, T.brand],
        m: { w: 294, h: 87, fs: 18, lh: 25, tw: 210, center: true },
      }),
    ], { attributes: attrs(reveal(0)) }),
  ]),
], { tag: "section", _cssid: "ecosystem", attributes: attrs([["data-trim", ""]]) });

module.exports = [eco];
