// BeInvolved (BeInvolved.tsx). Ids prefixed inv-; Tailwind lg+/md+ values map to desktop/tablet, the base to mobile.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, image, div, box, w, attrs, media, text, sz, shadow, ease, lift,
  NORMAL, grad, layers, at, FILL, btn, mix, PAGE, reveal } = require("../lib.js");

const M = media();
const HIDE = { display: "none" };
const pos = (x, y) => ({ $$type: "object-position", value: { x: sz(x, "%"), y: sz(y, "%") } });
const CARD_SHADOW = shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)");

// .h-section / .text-lead (globals.css)
const H2 = (color, more = {}) => [
  { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", "line-height": px(52.2), color, margin: P0, ...more },
  { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": NORMAL } },
];
const lead = (color, mobileSize) => ({ ...text(18, 500, color, { "line-height": NORMAL }), margin: P0 });

const cards = [
  {
    k: "ex", title: "Exhibit", img: "exhibit", alt: "Exhibitors in conversation at a trade fair stand",
    desc: "Build new commercial relationships, strengthen your regional presence and connect your business with new opportunities.",
    // Figma fill crops: desktop 359:226, phones 318:2002 (tablet: plain cover, anchored bottom-left-ish).
    photo: [
      { ...at(pct(-17.34), null, null, pct(-13.26)), width: pct(167.77), height: pct(117.34), "object-position": pos(10, 100) },
      { tablet: { ...FILL, width: pct(100), height: pct(100) }, mobile: { ...at(pct(-2.35), null, null, pct(-13.55)), width: pct(167.77), height: pct(102.43) } },
    ],
    box: [{ right: 36, bottom: 39, left: 36 }, { tablet: { right: 32, bottom: 24, left: 32 }, mobile: { right: 20, bottom: 32.7, left: 19.3 } }],
    descStyle: [{ "margin-top": 28.4, "max-width": 532 }, { tablet: { "margin-top": 20 }, mobile: { "margin-top": 18.7, "max-width": 336 } }],
    ctaMt: [23, 25],
    cta: (id) => btn(id, "Apply to Exhibit", "/apply-to-exhibit", { w: 220, h: 52, pl: 33, gap: 21.66, chev: "chevron-white", color: T.white, bg: T.accent,
      border: [1.5, T.accent], m: { w: 136.5, h: 32.3, pl: 20.5, gap: 8.6, fs: 11.17, chev: 0.617 } }),
  },
  {
    k: "vi", title: "Visit", img: "visit", alt: "Visitors walking through a busy exhibition hall", base: true,
    desc: "Discover fresh food products, suppliers, technologies and logistics solutions from across the fresh food ecosystem.",
    // Phones (318:2016) crop the photo to 87.5% height; visit-base shows beneath.
    photo: [
      { ...FILL, width: pct(100), height: pct(100) },
      { mobile: { ...at(px(0), null, null, pct(-21.66)), width: pct(143.32), height: pct(87.52) } },
    ],
    box: [{ right: 36, bottom: 39, left: 42 }, { tablet: { right: 32, bottom: 24, left: 32 }, mobile: { right: 20, bottom: 29.6, left: 26 } }],
    descStyle: [{ "margin-top": 28.4, "max-width": 521 }, { tablet: { "margin-top": 20 }, mobile: { "margin-top": 16.1, "max-width": 324, fs: 17 } }],
    ctaMt: [23, 18.8],
    cta: (id) => btn(id, "Register Your Interest", "/register-to-visit", { w: 248, h: 52, pl: 27, gap: 13.66, chev: "chevron-black", color: "#000000", bg: T.white,
      border: [1.5, T.white], m: { w: 153, h: 32.4, pl: 16.7, gap: 8.4, fs: 11.2, chev: 0.617 } }),
  },
];

const card = (c, idx) => {
  const id = `inv-${c.k}`;
  const [bd, bm] = c.box;
  const [dd, dm] = c.descStyle;
  const mDesc = { ...dm.mobile }; const f17 = mDesc.fs; delete mDesc.fs;
  return div(id, [{ padding: P0 }, {}], [
    div(`${id}-card`, [
      { position: "relative", overflow: "hidden", padding: P0, "aspect-ratio": "622/467", "border-radius": radius(30), background: { color: "#d9d9d9" }, transition: ease(250) },
      { hover: { transform: lift, "box-shadow": CARD_SHADOW }, tablet: { "border-radius": radius(24) }, mobile: { "aspect-ratio": "auto", height: px(332), "border-radius": radius(18.6) } },
    ], [
      ...(c.base ? [w(`${id}-base`, "e-image", { image: image(M["visit-base"].id), attributes: attrs([["aria-hidden", "true"]]) }, [
        { ...FILL, "object-fit": "cover", display: "none" }, { mobile: { display: "block" } }])] : []),
      w(`${id}-img`, "e-image", { image: image(M[c.img].id), attributes: attrs([["data-zoom", ""]]) }, mix([{ "max-width": custom("none"), "object-fit": "cover" }, {}], c.photo)),
      div(`${id}-shade`, [
        { ...at(null, px(0), px(0), px(0)), height: pct(73.45), padding: P0, background: layers(grad(180, [["rgba(0,0,0,0)", 0], ["#000000", 100]])) },
        { mobile: { height: pct(76.8) } },
      ]),
      div(`${id}-text`, [
        { position: "absolute", width: AUTO, padding: P0, color: T.white, "inset-inline-end": px(bd.right), "inset-block-end": px(bd.bottom), "inset-inline-start": px(bd.left) },
        { tablet: { "inset-inline-end": px(bm.tablet.right), "inset-block-end": px(bm.tablet.bottom), "inset-inline-start": px(bm.tablet.left) },
          mobile: { "inset-inline-end": px(bm.mobile.right), "inset-block-end": px(bm.mobile.bottom), "inset-inline-start": px(bm.mobile.left) } },
      ], [
        w(`${id}-title`, "e-heading", { tag: "h3", title: c.title }, [
          { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", "line-height": px(52.2), color: T.white, margin: P0 },
          { mobile: { "font-size": px(30), "line-height": px(32.4) } },
        ]),
        w(`${id}-desc`, "e-paragraph", { paragraph: c.desc }, [
          { ...lead(T.white), "max-width": px(dd["max-width"]), margin: pad(dd["margin-top"], 0, 0, 0) },
          { tablet: { margin: pad(dm.tablet["margin-top"], 0, 0, 0) }, mobile: { "max-width": px(mDesc["max-width"]), margin: pad(mDesc["margin-top"], 0, 0, 0), ...(f17 && { "font-size": px(f17) }) } },
        ]),
        box(`${id}-cta-row`, [
          { padding: P0, display: "flex", "flex-direction": "row", margin: pad(c.ctaMt[0], 0, 0, 0), width: AUTO },
          { mobile: { margin: pad(c.ctaMt[1], 0, 0, 0) } },
        ], [c.cta(`${id}-cta`)]),
      ]),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(idx)) });
};

const inv = div("inv", mix(PAGE(), [
  { padding: P0, margin: mtAuto(71) }, { tablet: { margin: mtAuto(64) }, mobile: { margin: mtAuto(42) } },
]), [
  div("inv-head", [{ padding: P0 }, { mobile: { margin: pad(0, 0, 0, 4) } }], [
    w("inv-eyebrow", "e-paragraph", { paragraph: "BE INVOLVED" }, [
      { ...text(15, 500, T.accent, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: P0 },
    ]),
    w("inv-title", "e-heading", { tag: "h2", title: "Be part of <em>Fresh Food Expo APAC</em>" }, mix(H2(T.forest), [
      { margin: pad(28, 0, 0, 0) },
      { tablet: { margin: pad(20, 0, 0, 0) }, mobile: { color: T.dark, margin: pad(23, 0, 0, 0), "max-width": px(330) } },
    ])),
  ], { attributes: attrs(reveal(0)) }),
  div("inv-grid", [
    { padding: P0, display: "grid", "grid-template-columns": { $$type: "string", value: "repeat(2, minmax(0, 1fr))" }, gap: gap(42), margin: pad(48, 0, 0, 0) },
    { tablet: { "grid-template-columns": { $$type: "string", value: "minmax(0, 1fr)" }, gap: gap(24), margin: pad(40, 0, 0, 0) },
      mobile: { gap: gap(20), margin: pad(29, 0, 0, 3), width: AUTO } },
  ], cards.map(card)),
], { tag: "section", _cssid: "be-involved", attributes: attrs([["data-trim", ""]]) });

module.exports = [inv];
