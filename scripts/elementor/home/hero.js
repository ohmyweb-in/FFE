// Hero (Hero.tsx). Moved out of home.js; ids and measurements are unchanged.
const { T, FREDOKA, px, pct, custom, pad, P0, mtAuto, radius, gap, image, box, div, w, attrs, media, text, HIDE, svg, AUTO,
  DATE, VENUE, NORMAL, BRAND0, grad, layers, at, FILL, toLeft, step, btn, dateVenue } = require("../lib.js");

const M = media();
// Hero pills: 15px label, 1px white border; GHOST = transparent with a white wash on hover.
const HB = { h: 40, fs: 15, border: [1, T.white] };
const GHOST = { color: T.white, bg: "rgba(255,255,255,0)", hoverBg: "rgba(255,255,255,0.1)", chev: "chevron-sm-white" };

/* ── Hero (Hero.tsx) ───────────────────────────────────────────────────────────────────────
   The reference trims text to its cap height; Elementor keeps full line boxes, so the margins below
   are the reference gaps converted to line-box edges (measured at 1440 / 900 / 390). */
const content = box("hero-content", [
  { position: "relative", "z-index": 2, width: custom("calc(100% - 64px)"), "max-width": px(T.maxw), margin: mtAuto(0), padding: pad(86, 0, 0, 0),
    display: "flex", "flex-direction": "column", "align-items": "flex-start" },
  { tablet: { padding: pad(36, 0, 141, 0) }, mobile: { width: custom("calc(100% - 52px)"), padding: pad(47, 0, 125, 0) } },
], [
  w("hero-eyebrow", "e-paragraph", { paragraph: "Fresh people.  Brighter possibilities.", attributes: step(0) }, [
    { ...text(15, 500, T.white, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: P0 },
    { mobile: { "max-width": px(200) } },
  ]),
  // Desktop breaks after "Asia Pacific's" and "fair" (512px measure); tablet runs on; phones keep "fresh food" together.
  w("hero-title", "e-heading", { tag: "h1", title: "Asia Pacific’s premier trade fair for fresh food", attributes: step(1) }, [
    { "font-family": FREDOKA, "font-size": px(50), "font-weight": "600", "line-height": px(53), "letter-spacing": px(1), "text-transform": "uppercase", color: T.white,
      "max-width": px(512), margin: pad(16, 0, 0, 0) },
    { tablet: { "font-size": px(44), "letter-spacing": px(0.88), "line-height": pct(108), "max-width": custom("none"), margin: pad(8.24, 0, 0, 0) },
      mobile: { "font-size": px(30), "letter-spacing": px(0.6), "line-height": px(35), "max-width": px(285), margin: pad(10, 0, 0, 0) } },
  ]),
  // The Figma phone and desktop frames word this line differently.
  w("hero-lede", "e-paragraph", { paragraph: "Connecting Fresh Food, Technology, Logistics &amp; Distribution From Farm to Fork", attributes: step(2) }, [
    { ...text(22, 400, T.white, { "letter-spacing": px(0.44), "line-height": px(31) }), "max-width": px(610), margin: pad(15.5, 0, 0, 0) },
    { tablet: { margin: pad(6.22, 0, 0, 0) }, mobile: HIDE },
  ]),
  w("hero-lede-m", "e-paragraph", { paragraph: "Connecting fresh food technologies, logistics, and distribution from farm to fork", attributes: step(2) }, [
    { ...text(17, 400, T.white, { "letter-spacing": px(0.34), "line-height": NORMAL }), "max-width": px(239), margin: pad(11, 0, 0, 0), display: "none" },
    { mobile: { display: "block" } },
  ]),
  dateVenue("hero", DATE, [{}, {}], { attributes: step(3) }),
  box("hero-ctas", [
    { margin: pad(28, 0, 0, 0), padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(13), width: AUTO },
    { mobile: HIDE },
  ], [
    btn("hero-register", "Register Your Interest", "/register-to-visit", { ...HB, w: 200, pl: 19, gap: 12, color: T.brand, bg: T.white, chev: "chevron-sm-brand" }),
    btn("hero-apply", "Apply To Exhibit", "/apply-to-exhibit", { ...HB, w: 162, pl: 19, gap: 12, ...GHOST }),
    btn("hero-stay", "Stay Connected", "/subscribe", { ...HB, w: 162, pl: 19, gap: 14, ...GHOST }),
  ], { attributes: step(4) }),
  // Phones (318:1811): stacked, Apply first as the solid pill.
  box("hero-ctas-m", [
    { display: "none", margin: pad(19, 0, 0, 0), padding: P0, "flex-direction": "column", "align-items": "flex-start", gap: gap(11), width: AUTO },
    { mobile: { display: "flex" } },
  ], [
    btn("hero-apply-m", "Apply To Exhibit", "/apply-to-exhibit", { ...HB, w: 178, h: 43, pl: 25, gap: 7, color: "#31a834", bg: T.white, border: null, chev: "chevron-sm-brand", m: { w: 178, h: 43, pl: 25, gap: 7, fs: 15 } }),
    btn("hero-register-m", "Register Your Interest", "/register-to-visit", { ...HB, w: 202, h: 43, pl: 25, gap: 9, ...GHOST, m: { w: 202, h: 43, pl: 25, gap: 9, fs: 15 } }),
  ], { attributes: step(4) }),
]);

const card = div("hero-card", [
  { position: "relative", overflow: "hidden", height: px(622), padding: P0, "border-radius": radius(30), background: { color: T.brand } },
  { tablet: { height: AUTO, "border-radius": radius(24) }, mobile: { height: AUTO, "min-height": px(660), "border-radius": radius(20), background: { color: "#032919" } } },
], [
  // The page's largest paint: fetched first, never lazy.
  w("hero-photo", "e-image", { image: image(M.hero.id), attributes: attrs([["loading", "eager"], ["fetchpriority", "high"]]) }, [
    { ...at(pct(-0.03), null, null, pct(16.51)), width: pct(83.52), height: pct(105.31), "max-width": custom("none"), "object-fit": "cover" },
    { tablet: { ...at(px(0), null, null, px(0)), width: pct(100), height: pct(100) },
      mobile: { ...at(pct(0.035), null, null, pct(-10.03)), width: pct(294.12), height: pct(103.15) } },
  ]),
  // Desktop: two brand-green fades over the photo's left edge. Tablet: top-down wash. Phones: brand over pale green.
  div("hero-fade", [
    { ...at(px(0), null, px(0), custom("calc(16.34% - 3px)")), width: pct(38.57), padding: P0, background: layers(toLeft(BRAND0, T.brand)) },
    { tablet: { ...FILL, background: layers(grad(180, [[T.brand, 35], ["rgba(44,166,47,0.85)", 50], ["rgba(44,166,47,0.65)", 100]])) },
      mobile: { background: layers(toLeft(BRAND0, T.brand), toLeft("rgba(229,244,218,0)", "#e5f4da")) } },
  ]),
  div("hero-fade-2", [
    { ...at(px(0), null, px(0), custom("calc(16.34% - 3px)")), width: pct(65.88), padding: P0, background: layers(toLeft(BRAND0, T.brand)) },
    { tablet: HIDE },
  ]),
  content,
  // Powered by (1138:145): white tab in the card's bottom-right corner.
  box("hero-powered", [
    { ...at(null, px(0), px(0), null), "z-index": 2, width: px(266), padding: pad(22, 0, 11, 28), background: { color: T.white },
      "border-radius": { "start-start": px(30), "start-end": px(0), "end-start": px(0), "end-end": px(0) }, display: "flex", "flex-direction": "column", "align-items": "flex-start" },
  ], [
    w("hero-powered-t", "e-paragraph", { paragraph: "Powered By:" }, [
      { "font-family": FREDOKA, "font-size": px(20), "font-weight": "600", "line-height": pct(121), "text-transform": "uppercase", color: "#00966f", margin: pad(0, 0, 0, 3) },
    ]),
    box("hero-powered-logos", [{ margin: pad(5.8, 0, 0, 0), padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 9) }], [
      w("hero-powered-fl", "e-image", { image: image(M["powered-fl"].id) }, [{ height: px(47), width: AUTO }]),
      w("hero-powered-gw", "e-image", { image: image(M["powered-gw"].id) }, [{ height: px(47), width: AUTO }]),
    ]),
  ], { attributes: step(5) }),
  // Decorative slider indicator (one slide in the design; not on phones).
  svg("hero-dots", "slider-dots", [
    { ...at(null, px(0), px(34), px(0)), width: px(66.5), height: px(19), margin: mtAuto(0) },
    { tablet: { "inset-block-end": px(20) }, mobile: HIDE },
  ]),
]);

const hero = box("hero", [
  { position: "relative", width: custom("calc(100% - 32px)"), "max-width": px(1395), margin: mtAuto(0), padding: P0, display: "flex", "flex-direction": "column" },
  { mobile: { width: custom("calc(100% - 52px)"), margin: mtAuto(10) } },
], [
  card,
  // Line-art curves over the card's lower-left corner; below the copy so they never block a button.
  svg("hero-curve", "hero-curve", [{ ...at(px(441), null, null, px(-16)), "z-index": 1, width: px(230.622), height: px(184.316) }, { tablet: HIDE }]),
  svg("hero-curve-m", "hero-curve-mobile", [{ ...at(px(588), null, null, px(-3)), "z-index": 1, width: px(84), height: px(71), display: "none" }, { mobile: { display: "flex" } }]),
], { tag: "section", _cssid: "top" });


module.exports = [hero];
