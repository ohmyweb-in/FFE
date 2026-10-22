// About (About.tsx). Prefix ab-.
const { T, FREDOKA, px, pct, custom, pad, P0, mtAuto, gap, flex, image, box, div, w, attrs, media, text, svg, NORMAL, at, FILL, mix, PAGE, reveal, btn } = require("../lib.js");

const M = media();
const HIDE = { display: "none" };
const aria = attrs([["aria-hidden", "true"], ["data-noevents", ""]]);

// .h-section: 48/52.2 (>=1025), 40/1.09 (tablet), 30/normal (phones)
const H = [
  { "font-family": FREDOKA, "font-weight": "600", "font-size": px(48), "line-height": px(52.2), color: T.forest },
  { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": NORMAL } },
];
// .text-lead: 18px (>=768), 17px (phones), line-height normal
const LEAD = [{ ...text(18, 500, T.body), "line-height": NORMAL }, { mobile: { "font-size": px(17) } }];

const LEDE =
  "Fresh Food Expo Asia Pacific (FFE APAC) is a premier B2B trade fair connecting fresh food with the technologies, logistics and " +
  "distribution solutions that help preserve quality, maintain freshness and move products efficiently to market." +
  "<br><br>" +
  "Building on the global expertise and industry network behind FRUIT LOGISTICA and Grüne Woche, Fresh Food Expo APAC brings " +
  "together fresh food, agri and fresh technology, logistics and distribution within one regional platform";

const copy = div("ab-copy", [
  { "min-width": px(0), flex: flex(0, 1, px(586)), padding: pad(18.61, 0, 0, 0), display: "block" },
  { tablet: { flex: flex(0, 1, { size: "", unit: "auto" }), padding: P0 } },
], [
  w("ab-title", "e-heading", { tag: "h2", title: "About <br><em>Fresh Food Expo Asia Pacific (FFE APAC)</em>", attributes: attrs([["data-br-md", ""]]) }, mix(H, [
    { "max-width": px(549), margin: P0 },
    { mobile: { "max-width": px(295) } },
  ])),
  w("ab-lede", "e-paragraph", { paragraph: LEDE }, mix(LEAD, [
    { "max-width": px(586), margin: pad(38, 0, 0, 0) },
    { tablet_extra: { margin: pad(38, 0, 0, 0) }, tablet: { margin: pad(28, 0, 0, 0) }, mobile: { margin: pad(24, 0, 0, 2) } },
  ])),
  box("ab-ctas", [
    { padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(12), margin: pad(32, 0, 0, 1), width: pct(100) },
    { tablet: { margin: pad(32, 0, 0, 0) }, mobile: { gap: gap(7), margin: pad(18, 0, 0, 0) } },
  ], [
    btn("ab-discover", "Discover The Expo", "/about", {
      w: 220, h: 52, pl: 24, gap: 17.66, chev: "chevron-accent", color: T.accent, bg: T.mint, border: [1.5, T.accent],
      m: { w: 197, h: 43, pl: 27, gap: 8, fs: 15, chev: 0.828 },
    }),
    btn("ab-story", "Our Story", "/our-story", {
      w: 172, h: 52, pl: 37, gap: 17.66, chev: "chevron-ink", color: T.ink, bg: "rgba(0,0,0,0)", mBg: "#f4f6f4", border: [1.5, T.ink],
      m: { w: 129, h: 43, pl: 23, gap: 8, fs: 15, chev: 0.828 },
    }),
  ]),
], { attributes: attrs(reveal(0)) });

const media_ = div("ab-media", [
  { position: "relative", width: pct(100), "min-width": px(0), flex: flex(0, 1, px(559.7)), margin: pad(0, 1.2, 0, 0), padding: P0, display: "block" },
  { tablet: { flex: flex(0, 1, { size: "", unit: "auto" }), margin: P0 } },
], [
  // Curves come before the frame so the photo paints over them.
  svg("ab-curve-m", "about-curve-mobile", [
    { ...at(px(-6.3), null, null, px(-25.6)), width: px(441), height: px(226), "max-width": custom("none"), display: "none" },
    { mobile: { display: "flex" } },
  ], { attributes: aria }),
  svg("ab-curve", "about-curve", [
    { ...at(px(-25.38), null, null, px(-100.23)), width: px(738.005), height: px(378.245), "max-width": custom("none") },
    { tablet_extra: HIDE },
  ], { attributes: aria }),
  div("ab-frame", [
    { position: "relative", width: pct(100), padding: P0, overflow: "hidden", background: { color: "#d9d9d9" }, "aspect-ratio": "559.7/425.6",
      "border-radius": { "start-start": px(30.47), "start-end": px(30.47), "end-start": px(0), "end-end": px(30.47) } },
    { mobile: { "aspect-ratio": "388/296", "border-radius": { "start-start": px(18.2), "start-end": px(18.2), "end-start": px(18.2), "end-end": px(18.2) } } },
  ], [
    w("ab-photo", "e-image", { image: image(M.about.id) }, [{ ...FILL, width: pct(100), height: pct(100), "object-fit": "cover" }]),
  ]),
], { attributes: attrs(reveal(1)) });

const ab = box("ab", mix(PAGE(), [
  { margin: mtAuto(70.39), padding: P0, display: "flex", "flex-direction": "row", "justify-content": "space-between", "align-items": "stretch", gap: gap(0, 40) },
  { tablet: { margin: mtAuto(56), "flex-direction": "column", gap: gap(48, 0) }, mobile: { margin: mtAuto(35), gap: gap(33, 0) } },
]), [copy, media_], { tag: "section", _cssid: "about", attributes: attrs([["data-trim", ""]]) });

module.exports = [ab];
