// Siaw (Siaw.tsx): leaf divider + section. Prefix sw-. Exports [swDivider, sw].
const { T, FREDOKA, px, pct, custom, pad, P0, mtAuto, gap, flex, link, image, box, div, w, attrs, media, text, svg, NORMAL, at, FILL, mix, PAGE, reveal, shadow, ease, lift, btn } = require("../lib.js");

const M = media();
const HIDE = { display: "none" };
const AUTO = { size: "", unit: "auto" };

const H = [
  { "font-family": FREDOKA, "font-weight": "600", "font-size": px(48), "line-height": px(52.2), color: T.forest },
  { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": NORMAL } },
];
const LEAD = [{ ...text(18, 500, T.body), "line-height": NORMAL }, { mobile: { "font-size": px(17) } }];

const swDivider = box("sw-divider", mix(PAGE(), [
  { position: "relative", height: px(85), padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "center", margin: mtAuto(43) },
  { tablet: { margin: mtAuto(56) }, mobile: HIDE },
]), [
  div("sw-line", [
    { position: "absolute", height: px(3), width: custom("min(760px, 100%)"), padding: P0, background: { color: T.accent } },
  ], [], { attributes: attrs(reveal(0, "fade")) }),
  div("sw-ring", [{ position: "relative", width: px(85), height: px(85), padding: P0 }], [
    svg("sw-ring-c", "divider-circle", [{ ...FILL, width: px(85), height: px(85) }]),
    w("sw-leaf", "e-image", { image: image(M.leaf.id) }, [{ ...at(px(18), null, null, px(18)), width: px(49), height: px(49), "object-fit": "cover" }]),
  ], { attributes: attrs(reveal(0, "scale")) }),
], { attributes: attrs([["aria-hidden", "true"]]) });

const head = div("sw-head", [
  { flex: flex(0, 1, px(524)), padding: P0, display: "block" },
  { tablet: { flex: flex(0, 1, AUTO) } },
], [
  // Copy differs between the phone and desktop frames.
  w("sw-eyebrow-m", "e-paragraph", { paragraph: "Our strategic platform" }, [
    { ...text(15, 500, T.accent, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: P0, display: "none" },
    { mobile: { display: "block" } },
  ]),
  w("sw-eyebrow", "e-paragraph", { paragraph: "ONE strategic platform" }, [
    { ...text(15, 500, T.brand, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: pad(0, 0, 0, 1), display: "block" },
    { mobile: HIDE },
  ]),
  w("sw-title", "e-heading", { tag: "h2", title: "Part of <br><em>Singapore International Agri-Food Week</em>", attributes: attrs([["data-br-md", ""]]) }, mix(H, [
    { margin: pad(25, 0, 0, 0), "max-width": custom("none") },
    { mobile: { "line-height": px(38.2), margin: pad(20, 0, 0, -1), "max-width": px(346) } },
  ])),
], { attributes: attrs(reveal(0)) });

const body = div("sw-body", [
  { flex: flex(0, 1, px(698)), padding: pad(16, 0, 0, 0), display: "block" },
  { tablet: { flex: flex(0, 1, AUTO), padding: P0 } },
], [
  w("sw-lede", "e-paragraph", {
    paragraph:
      "Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, bringing together government, industry, innovation and " +
      "business to advance a more sustainable, resilient and connected food future in Asia." +
      "<br><br>" +
      "Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B trade platform for the fresh food ecosystem, connecting fresh food, agri and " +
      "fresh technology, logistics and distribution.",
  }, mix(LEAD, [
    { "max-width": px(696), margin: pad(0, 0, 0, 2) },
    { tablet: { margin: P0 }, mobile: { "max-width": px(361) } },
  ])),
  box("sw-cta", [
    { padding: P0, display: "flex", "flex-direction": "row", margin: pad(39, 0, 0, 0), width: pct(100) },
    { mobile: { margin: pad(25, 0, 0, 0) } },
  ], [
    // Phones: full-width pill, two balanced lines, chevron after the last word.
    box("sw-pill-m", [
      {
        display: "none", width: pct(100), "min-height": px(44), padding: pad(13, 20, 13, 20), "justify-content": "center", "align-items": "center",
        "border-width": pad(1.5), "border-style": "solid", "border-color": T.accent, background: { color: T.mint }, "border-radius": { "start-start": px(999), "start-end": px(999), "end-start": px(999), "end-end": px(999) },
        transition: ease(250),
      },
      { hover: { transform: lift, "box-shadow": shadow(0, 10, 24, -10, "rgba(2,93,3,0.45)") }, mobile: { display: "flex" } },
    ], [
      w("sw-pill-m-t", "e-paragraph", {
        tag: "span", paragraph: "Discover Singapore International Agri‑Food Week⁠<span>›</span>",
        attributes: attrs([["data-untrim", ""], ["data-balance", ""], ["data-pill", ""]]),
      }, [{ ...text(16, 500, T.accent, { "letter-spacing": px(0.32), "line-height": px(22) }), margin: P0, "text-align": "center" }]),
    ], { tag: "a", link: link("/siaw"), attributes: attrs([["data-btn", ""]]) }),
    (() => {
      const b = btn("sw-discover", "Discover Singapore International Agri-Food Week", "/siaw", {
        w: 488, h: 52, pl: 28, gap: 16.66, chev: "chevron-accent", color: T.accent, bg: T.mint, border: [1.5, T.accent],
      });
      // hide on phones: add display none to the box's mobile variant
      const v = b.styles["s-sw-discover"].variants.find((x) => x.meta.breakpoint === "mobile");
      v.props.display = "none";
      return b;
    })(),
  ]),
], { attributes: attrs(reveal(1)) });

const sw = box("sw", mix(PAGE(), [
  { margin: mtAuto(35), padding: P0, display: "flex", "flex-direction": "row", "justify-content": "space-between", "align-items": "stretch", gap: gap(0, 40) },
  { tablet: { margin: mtAuto(40), "flex-direction": "column", gap: gap(32, 0) }, mobile: { margin: mtAuto(53), padding: pad(0, 0, 0, 5), gap: gap(30, 0) } },
]), [head, body], { tag: "section", attributes: attrs([["data-trim", ""]]) });

module.exports = [swDivider, sw];
