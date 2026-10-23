// SourceToMarket (about/SourceToMarket.tsx): green panel with the ecosystem pillar row (home Ecosystem PillarRow) and a CTA.
const { T, px, pct, custom, pad, P0, mtAuto, radius, flex, box, div, w, attrs, text, at, mix, reveal, svg, pill, NORMAL } = require("../../lib.js");
const { EYB, HSEC, pillarRow } = require("../g1-shared.js");

module.exports = [div("au-stm", [
  {
    position: "relative", overflow: "hidden", padding: P0, width: custom("min(1329px, 100% - 32px)"), "max-width": custom("none"), margin: mtAuto(46), background: { color: "#c2e3c3" }, "border-radius": radius(36),
  },
  { tablet: { "border-radius": radius(24) }, mobile: { width: custom("min(1329px, 100% - 24px)") } },
], [
  svg("au-stm-leaf", "leaf-outline", [
    { ...at(px(2.68), px(49), null, null), width: px(440), height: px(239), "max-width": custom("none") },
    { tablet: { ...at(px(0), px(0), null, null), width: px(260), height: px(141) }, mobile: { width: px(180), height: px(98) } },
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  div("au-stm-head", [
    { position: "relative", padding: pad(56, 56, 0, 56) },
    { tablet: { padding: pad(48, 32, 0, 32) }, mobile: { padding: pad(36, 20, 0, 20) } },
  ], [
    w("au-stm-eyebrow", "e-paragraph", { paragraph: "From source to market" }, EYB()),
    w("au-stm-title", "e-heading", { tag: "h2", title: "From <em>Fresh Food</em> to Market" }, mix(HSEC, [{ "line-height": px(52), "max-width": px(780), margin: pad(14, 0, 0, 0) }, { tablet: { "line-height": pct(109) }, mobile: { "line-height": NORMAL } }])),
    w("au-stm-lede", "e-paragraph", { paragraph: "Fresh Food Expo APAC connects fresh food with the technologies and logistics solutions that help maintain quality, preserve freshness and move products efficiently through the supply chain." }, [
      { ...text(18, 500, T.body, { "line-height": px(23) }), "max-width": px(780), margin: pad(14, 0, 0, 0) }, { mobile: { "font-size": px(17) } },
    ]),
  ], { attributes: attrs(reveal(0)) }),
  div("au-stm-rw", [
    { position: "relative", margin: pad(41, 0, 0, 0), padding: pad(0, 50.5, 0, 50.5) },
    { tablet: { margin: pad(33, 0, 0, 0), padding: pad(0, 32, 0, 32) }, mobile: { padding: pad(0, 20, 0, 20) } },
  ], [
    div("au-stm-zoom", [{ padding: P0, display: "block" }, {}], [pillarRow("au-stm")]),
  ]),
  box("au-stm-cta-row", [
    { position: "relative", padding: pad(43, 32, 26, 32), display: "flex", "flex-direction": "row", "justify-content": "center" },
    { tablet: { padding: pad(36, 32, 36, 32) }, mobile: { padding: pad(36, 20, 36, 20) } },
  ], [pill("au-stm-cta", "Explore the Full Fresh Food Ecosystem", "/ecosystem", { color: T.white, bg: T.accent })], { attributes: attrs(reveal(0)) }),
], { tag: "section" })];
