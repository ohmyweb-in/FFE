// Ecosystem Intro (ecosystem/Intro.tsx): 472×360 % collage + copy. No data-trim (the source section is .untrim).
const { T, px, pct, custom, AUTO, mtAuto, flex, gap, image, w, attrs, media, at, FILL, svg, reveal, mix, P0 } = require("../../lib.js");
const { NARROW, EB, H2, BODY, MINTG, rad, dv } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");

const media_ = dv("es-in-media", {
  position: "relative", "aspect-ratio": "472/360", width: pct(100), "max-width": NONE, "min-width": px(0), flex: flex(1, 1, pct(0)), margin: P0,
}, { tablet_extra: { "max-width": px(472), margin: mtAuto(0), flex: flex(0, 1, AUTO) } }, [
  dv("es-in-shape", {
    ...at(pct(6.6667), null, null, pct(25.8475)), width: pct(55.2966), height: pct(46.1111), "min-width": px(0),
    background: { color: T.accent }, "border-radius": rad(140, 40, 20, 140),
  }),
  dv("es-in-frame", {
    ...at(pct(11.1111), null, null, pct(0)), width: pct(76.6949), height: pct(83.3333), overflow: "hidden", ...MINTG, "border-radius": rad(40, 40, 40, 0),
  }, {}, [
    w("es-in-img", "e-image", { image: image(M["g3-fruit-cups"].id), attributes: attrs([["data-zoom", ""]]) },
      [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover" }]),
  ], { attributes: attrs([["data-group", ""]]) }),
  svg("es-in-dots", "g3-dots", [{ ...at(pct(63.3333), null, null, pct(70.1271)), width: pct(12.9237), height: pct(16.9444), "max-width": NONE }, {}],
    { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
], { attributes: attrs(reveal(0)) });

const copy = dv("es-in-copy", {
  display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(25), width: px(760), flex: flex(0, 0, AUTO),
}, { tablet_extra: { width: pct(100) } }, [
  w("es-in-title", "e-heading", { tag: "h2", title: "The <em>fresh food industry</em> depends on more than the product itself" }, mix(H2(42, 48), [{ width: AUTO }, {}])),
  dv("es-in-body", { display: "flex", "flex-direction": "column", gap: gap(12), width: AUTO }, {}, [
    w("es-in-p1", "e-paragraph", { paragraph: "Maintaining freshness, quality and availability requires <b>technologies, cold chain infrastructure, logistics networks, packaging, storage and efficient distribution.</b>" },
      mix(BODY, [{ "max-width": px(684) }, {}])),
    w("es-in-p2", "e-paragraph", { paragraph: "Fresh Food Expo APAC brings these interconnected parts of the value chain together within one dedicated B2B platform, creating opportunities for businesses to discover solutions, meet partners and build commercial relationships across Asia Pacific." },
      mix(BODY, [{ "max-width": px(715) }, {}])),
  ]),
], { attributes: attrs(reveal(1)) });

const [d, m] = mix(NARROW, [{ margin: mtAuto(40.32), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(48) },
  { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32) }, tablet: { margin: mtAuto(40) } }]);
module.exports = [dv("es-in", d, m, [media_, copy], { tag: "section" })];
