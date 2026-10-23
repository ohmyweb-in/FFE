// Messe Berlin band (messe/Sections.tsx MesseBerlin): photo collage + copy.
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, AUTO, mtAuto, flex, gap, image, w, attrs, media, at, FILL, svg, reveal, mix, PAGE, ruleEyebrow } = require("../../lib.js");
const { MINTG, rad, dv, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const BODY = [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(17), "line-height": px(27), color: "#000000", margin: P0 }, { mobile: { "font-size": px(16), "line-height": px(25) } }];
const MORE = [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(16), "line-height": px(24), color: "#000000", margin: P0, width: AUTO }, { mobile: { "font-size": px(15) } }];

const media_ = dv("mb-mbl-media", {
  position: "relative", "aspect-ratio": "560/420", "max-width": px(560), width: px(560), "flex-shrink": 0, margin: P0,
}, { tablet_extra: { width: pct(45) }, tablet: { width: pct(100), "flex-shrink": 1, margin: mtAuto(0) } }, [
  svg("mb-mbl-curve", "g3-messe-curve", [{ ...at(pct(-10.3548), null, null, pct(-18.0375)), width: pct(129.6254), height: pct(96.725), "max-width": NONE, display: "flex" },
    { tablet_extra: { display: "none" }, tablet: { display: "flex" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  dv("mb-mbl-frame", { ...at(pct(4.7476), null, null, pct(-0.8929)), width: pct(101.7857), height: pct(91.9048), overflow: "hidden", ...MINTG, "border-radius": rad(30, 0, 30, 30) }, {}, [
    w("mb-mbl-img", "e-image", { image: image(M["g3-messe"].id), attributes: attrs([["data-zoom", ""]]) },
      [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover" }]),
    w("mb-mbl-logo", "e-image", { image: image(M["g3-messe-logo"].id) },
      [{ ...at(pct(7.772), null, null, pct(6.1404)), width: pct(19.4737), height: pct(8.0311), "max-width": NONE, "object-fit": "cover" }]),
  ], { attributes: attrs([["data-group", ""]]) }),
], { attributes: attrs(reveal(0)) });

const copy = dv("mb-mbl-copy", {
  display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(18), "min-width": px(0), flex: flex(1, 1, pct(0)),
}, { tablet: { width: pct(100), flex: flex(0, 1, AUTO) } }, [
  ruleEyebrow("mb-mbl-eyebrow", "Messe Berlin"),
  hd("mb-mbl-title", "h2", "Messe Berlin", [
    { "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(60), "line-height": px(66), margin: P0, width: AUTO },
    { tablet_extra: { "font-size": px(48), "line-height": px(54) }, mobile: { "font-size": px(36), "line-height": px(40) } },
  ]),
  pg("mb-mbl-p", "Founded in 1822, Messe Berlin is one of the world’s leading organisers of trade fairs and congresses, hosting more than 100 regional, national, and international events annually. Its globally recognised portfolio includes flagship brands such as <a href=\"#\">Fruit Logistica</a>, <a href=\"#\">Grüne Woche</a>, <a href=\"#\">ITB</a>, and <a href=\"#\">InnoTrans</a>, covering sectors including travel and tourism, agriculture, mobility, healthcare, logistics, and technology.", BODY),
  pg("mb-mbl-more", "For more information: <a href=\"https://www.messe-berlin.de/en\" target=\"_blank\">https://www.messe-berlin.de/en</a>", MORE),
], { attributes: attrs(reveal(1)) });

const [d, m] = mix(PAGE(), [
  { margin: mtAuto(0), padding: pad(0, 3, 0, 23), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(64) },
  { tablet_extra: { padding: P0, gap: gap(40) }, tablet: { "flex-direction": "column", "align-items": "stretch" } },
]);
module.exports = [dv("mb-mbl", {
  width: pct(100), "max-width": NONE, margin: P0, padding: pad(48, 0, 48, 0),
}, { tablet: { padding: pad(40, 0, 40, 0) } }, [dv("mb-mbl-row", d, m, [media_, copy])], { tag: "section" })];
