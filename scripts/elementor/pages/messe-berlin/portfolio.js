// Messe Berlin portfolio strip (messe/Sections.tsx Portfolio): six logo circles, flex row from 1024, 3-col grid below.
const { T, px, pct, custom, pad, P0, mtAuto, gap, image, w, attrs, media, at, FILL, reveal, mix, PAGE } = require("../../lib.js");
const { dv, fx, rad } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const COLS3 = { $$type: "string", value: "repeat(3, minmax(0, 1fr))" };
const FULL = { ...FILL, width: pct(100), height: pct(100), "max-width": NONE };
const LOGOS = [
  ["smart-health", "Smart Health Asia", { ...at(pct(-1.73), null, null, pct(-1.37)), width: pct(103.09), height: pct(103.81), "max-width": NONE, "object-fit": "fill" }],
  ["itb-asia", "ITB Asia", { ...FULL, "object-fit": "cover" }],
  ["itb-india", "ITB India", { ...at(pct(21.17), null, null, pct(-18.88)), width: pct(130.58), height: pct(57.53), "max-width": NONE }],
  ["mice", "MICE Show Asia", { ...FULL, "object-fit": "contain" }],
  ["travel-tech", "Travel Tech Asia", { ...FULL, "object-fit": "cover" }],
  ["travel-meet", "Travel Meet Asia", { ...FULL, "object-fit": "contain" }],
];

const logo = ([slug], i) => {
  const id = `mb-pf-l${i + 1}`;
  return [
    ...(i ? [dv(`mb-pf-sep${i + 1}`, {
      width: px(3), "min-width": px(0), "flex-shrink": 0, "align-self": "stretch", "border-radius": rad(999, 999, 999, 999), background: { color: "#e6e6e6" },
      margin: pad(0, -1.5, 0, -1.5), display: "block",
    }, { tablet: { display: "none" } }, [], { attributes: attrs([["aria-hidden", "true"]]) })] : []),
    dv(id, {
      position: "relative", overflow: "hidden", "border-radius": rad(999, 999, 999, 999), background: { color: T.white }, "flex-shrink": 0, "min-width": px(0),
      width: px(i === 0 ? 126 : 125), height: px(125), margin: P0,
    }, { tablet_extra: { width: px(110), height: px(110) }, tablet: { margin: mtAuto(0) }, mobile: { width: px(88), height: px(88) } }, [
      w(`${id}-img`, "e-image", { image: image(M["g3-pf-" + slug].id) }, [LOGOS[i][2], {}]),
    ], { attributes: attrs([["role", "listitem"], ...reveal(i, "scale")]) }),
  ];
};

const [d, m] = mix(PAGE(), [
  { margin: mtAuto(0), display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "center", gap: gap(0, 50) },
  { laptop: { gap: gap(0, 40) }, tablet_extra: { gap: gap(0, 28) }, tablet: { display: "grid", "grid-template-columns": COLS3, gap: gap(20, 0) } },
]);
module.exports = [dv("mb-pf", {
  width: pct(100), "max-width": NONE, margin: P0, background: { color: T.white }, padding: pad(28, 0, 28, 0),
}, { tablet: { padding: pad(24, 0, 24, 0) } }, [
  dv("mb-pf-list", d, m, LOGOS.flatMap(logo), { attributes: attrs([["role", "list"]]) }),
], { tag: "section", attributes: attrs([["aria-label", "Messe Berlin Asia Pacific portfolio"]]) })];
