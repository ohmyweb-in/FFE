// Ecosystem Connects (ecosystem/Connects.tsx): copy + 472×360 collage (xl row) and the five-step value-chain pills (lg row).
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, AUTO, mtAuto, flex, gap, image, w, attrs, media, at, FILL, svg, reveal, mix, rotate } = require("../../lib.js");
const { NARROW, EB, H2, BODY, MINTG, rad, dv, fx, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const radius = (r) => rad(r, r, r, r);
const ARIA = attrs([["aria-hidden", "true"]]);
const STEPS = [["sprout", "Grow &amp; Produce"], ["factory", "Process &amp; Preserve"], ["box", "Package"], ["warehouse", "Move &amp; Distribute"], ["cart", "Market &amp; Consume"]];
const fill = (id, key) => w(id, "e-image", { image: image(M[key].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover" }]);

const step = (s, i) => [
  ...(i ? [svg(`es-cn-arrow${i + 1}`, "g3-arrow-sm", [{ width: px(14), height: px(14), "flex-shrink": 0 }, { tablet: { transform: rotate(90) } }], { attributes: ARIA })] : []),
  fx(`es-cn-s${i + 1}`, {
    display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(12), "border-radius": radius(999), background: { color: T.white }, padding: pad(10, 16, 10, 10),
    "max-width": NONE, "min-width": px(0), flex: flex(1, 1, pct(0)),
  }, { tablet: { width: pct(100), "max-width": px(320), flex: flex(0, 1, AUTO) } }, [
    fx(`es-cn-s${i + 1}-badge`, {
      width: px(48), height: px(48), "flex-shrink": 0, "align-items": "center", "justify-content": "center", "border-radius": radius(999),
      "border-width": pad(1.5), "border-style": "solid", "border-color": T.accent, background: { color: T.page },
    }, {}, [svg(`es-cn-s${i + 1}-badge-i`, "g3-step-" + s[0], [{ width: px(22), height: px(22) }, {}], { attributes: ARIA })]),
    pg(`es-cn-s${i + 1}-t`, s[1], [{ "font-family": OUTFIT, "font-weight": "600", "font-size": px(15), "line-height": px(20), color: T.forest, margin: P0, "min-width": px(0), flex: flex(1, 1, pct(0)) }, {}],
      { tag: "span", attributes: attrs([["data-untrim", ""]]) }),
  ], { attributes: attrs([["role", "listitem"], ...reveal(i)]) }),
];

const copy = dv("es-cn-copy", { display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(14), width: px(760), flex: flex(0, 0, AUTO) }, { tablet_extra: { width: pct(100) } }, [
  pg("es-cn-eyebrow", "The bigger picture", EB),
  hd("es-cn-title", "h2", "Where the ecosystem connects", mix(H2(42, 48), [{ width: AUTO }, {}])),
  dv("es-cn-body", { display: "flex", "flex-direction": "column", gap: gap(12), width: AUTO }, {}, [
    pg("es-cn-p1", "Fresh food quality depends on every <b>interconnected industries</b> that follows the product from source to market.", BODY),
    pg("es-cn-p2", "Fresh Food Expo APAC brings these interconnected industries together — providing a platform where fresh food suppliers, technology providers, logistics operators, distributors and buyers can discover new opportunities across the wider ecosystem.", mix(BODY, [{ "max-width": px(715) }, {}])),
  ]),
], { attributes: attrs(reveal(0)) });

const mediaBox = dv("es-cn-media", { position: "relative", "aspect-ratio": "472/360", width: pct(100), "max-width": NONE, "min-width": px(0), flex: flex(1, 1, pct(0)), margin: P0 },
  { tablet_extra: { "max-width": px(472), margin: mtAuto(10), flex: flex(0, 1, AUTO) } }, [
  dv("es-cn-shape", { ...at(pct(-2.7778), null, null, pct(44.9153)), width: pct(59.322), height: pct(55.5556), "min-width": px(0), background: { color: T.accent }, "border-radius": rad(140, 140, 20, 140) }),
  svg("es-cn-dots", "g3-dots", [{ ...at(pct(63.8889), null, null, pct(4.2373)), width: pct(12.9237), height: pct(16.9444), "max-width": NONE }, {}], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  dv("es-cn-frame1", { ...at(pct(11.1111), null, null, pct(23.3051)), width: pct(76.6949), height: pct(83.3333), overflow: "hidden", "border-radius": rad(40, 40, 40, 0), ...MINTG }, {}, [fill("es-cn-img1", "g3-robotics")], { attributes: attrs([["data-group", ""]]) }),
  dv("es-cn-frame2", { ...at(pct(8.2444), null, null, pct(8.2627)), width: pct(44.4915), height: pct(52.7778), overflow: "hidden", "border-radius": rad(40, 40, 40, 0), ...MINTG }, {}, [fill("es-cn-img2", "g3-robot-arm")], { attributes: attrs([["data-group", ""]]) }),
], { attributes: attrs(reveal(1)) });

const [d, m] = mix(NARROW, [{ margin: mtAuto(67), display: "flex", "flex-direction": "column", gap: gap(40) }, { tablet: { margin: mtAuto(48) } }]);
module.exports = [dv("es-cn", d, m, [
  dv("es-cn-top", { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(48) }, { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32) } }, [copy, mediaBox]),
  fx("es-cn-steps", { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(10) }, { tablet: { "flex-direction": "column" } }, STEPS.flatMap(step), { attributes: attrs([["role", "list"]]) }),
], { tag: "section" })];
