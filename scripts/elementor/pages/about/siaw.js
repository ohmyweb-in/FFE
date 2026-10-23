// AboutSiaw (about/AboutSiaw.tsx + SiawVideo.tsx): trailer on the left, copy and pill on the right.
const { T, px, pct, custom, pad, P0, AUTO, gap, flex, box, div, w, attrs, text, mix, reveal, video, pill } = require("../../lib.js");
const { NARROW, EYB, HSEC, B15 } = require("../g1-shared.js");

const trailer = video("au-sv-video", "g1-siaw-video", {
  poster: "g1-siaw-poster",
  label: "Singapore International Agri-Food Week trailer",
  styles: [
    { width: px(560), "aspect-ratio": "16/9", flex: flex(0, 0, AUTO), background: { color: "#d9d9d9" }, "border-radius": { "start-start": px(30.474), "start-end": px(30.474), "end-end": px(30.474), "end-start": px(0) } },
    { tablet_extra: { width: pct(44) }, tablet: { width: pct(100), "border-radius": { "start-start": px(24), "start-end": px(24), "end-end": px(24), "end-start": px(0) } } },
  ],
});
trailer.settings.attributes.value.push(...attrs(reveal(0)).value);

module.exports = [box("au-sv", mix([{ padding: P0 }, {}], NARROW([46]), [
  { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 72) },
  { tablet_extra: { gap: gap(0, 40) }, tablet: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0) } },
]), [
  trailer,
  box("au-sv-copy", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), "min-width": px(0), flex: flex(1, 1, pct(0)) }, {}], [
    w("au-sv-eyebrow", "e-paragraph", { paragraph: "Part of" }, EYB()),
    div("au-sv-tw", [{ padding: P0, width: AUTO }, {}], [
      w("au-sv-title", "e-heading", { tag: "h2", title: "Singapore International <br>Agri-Food Week", attributes: attrs([["data-br-lg", ""]]) }, mix(HSEC, [{ "max-width": px(525), "min-height": px(98) }, { tablet: { "min-height": px(0) } }])),
    ], { attributes: attrs([["data-trim", ""]]) }),
    box("au-sv-body", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO }, {}], [
      w("au-sv-p1", "e-paragraph", { paragraph: "Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, bringing together government, industry, innovation and business to advance a more sustainable, resilient and connected food future in Asia." }, B15()),
      w("au-sv-p2", "e-paragraph", { paragraph: "Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B exhibition for the fresh food ecosystem, connecting fresh food, agri and fresh technology, logistics and distribution." }, B15()),
    ]),
    w("au-sv-note", "e-paragraph", { paragraph: "Supported by Singapore Food Agency, Enterprise Singapore, Temasek and Singapore Tourism Board.*" }, [{ ...text(15, 600, "#000000", { "line-height": px(22) }), margin: P0 }, {}]),
    div("au-sv-cta", [{ padding: pad(6, 0, 0, 0) }, {}], [
      pill("au-sv-pill", "Discover Singapore International Agri‑Week 2027", "/siaw", {
        color: T.accent, bg: T.mint, border: [1.5, T.accent],
        styles: [{}, { mobile: { width: pct(100), padding: pad(13, 20), "line-height": px(22) } }],
      }),
    ]),
  ], { attributes: attrs(reveal(1)) }),
], { tag: "section" })];
