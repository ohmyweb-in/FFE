// Ecosystem WhoFor (ecosystem/WhoFor.tsx): Visit / Exhibit photo cards. The source section is .trim, so data-trim stays.
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, mtAuto, gap, image, attrs, media, FILL, reveal, mix, PAGE, grad, layers, lift, shadow, ease, btn, NORMAL, w } = require("../../lib.js");
const { rad, dv, fx, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const radius = (r) => rad(r, r, r, r);
const COLS = (n) => ({ $$type: "string", value: n === 1 ? "minmax(0, 1fr)" : `repeat(${n}, minmax(0, 1fr))` });
const WHITE = T.white;
const type = (size, color) => [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(size), "line-height": NORMAL, color, margin: P0 }, { mobile: { "font-size": px(17) } }];
const OB = { border: [1.5, WHITE], hoverBg: "rgba(255,255,255,0.1)" };

const CARDS = [
  { c: "v", title: "Looking to Visit?", img: "visit", pl: 42, textW: 534, rolesW: 391, textMt: [25.41, 23], rolesMt: [18.83, 18], ctaMt: [22.83, 22], ctaGap: 9,
    text: "Discover fresh food suppliers, technologies and supply chain solutions while connecting with businesses from across regional and global markets.",
    roles: "Wholesalers | Importers | Exporters | Retailers | Food Service Operators...",
    ctas: (c) => [
      btn(`${c}-why`, "Why Visit", "/why-visit", { w: 162, h: 52, pl: 33, gap: 16.39, chev: "chevron-black", color: "#000000", bg: WHITE, border: [1.5, WHITE] }),
      btn(`${c}-register`, "Register Your Interest", "/register-to-visit", { w: 248, h: 52, pl: 27, gap: 13.66, chev: "chevron-white", color: WHITE, ...OB }),
    ] },
  { c: "e", title: "Looking to Exhibit?", img: "exhibit", pl: 36, textW: 532, rolesW: 549, textMt: [28.41, 26], rolesMt: [28.83, 28], ctaMt: [36.83, 36], ctaGap: 11,
    text: "Showcase your fresh food products, technologies or logistics and distribution solutions to buyers, partners and industry stakeholders from across Asia Pacific.",
    roles: "Producer | Packaging Companies | Cold Chain Operators...",
    ctas: (c) => [
      btn(`${c}-why`, "Why Exhibit", "/why-exhibit", { w: 172, h: 52, pl: 27, gap: 16.8, chev: "chevron-white", color: WHITE, bg: T.accent, border: [1.5, T.accent] }),
      btn(`${c}-who`, "Who Should Exhibit", "/who-should-exhibit", { w: 240, h: 52, pl: 33, gap: 15.49, chev: "chevron-white", color: WHITE, ...OB }),
    ] },
];

const card = (k, i) => {
  const id = `es-wf-${k.c}`;
  const imgStyle = k.c === "e"
    ? [{ position: "absolute", "inset-block-start": pct(-17.34), "inset-inline-start": pct(-13.26), width: pct(167.77), height: pct(117.34), "max-width": NONE, "object-fit": "cover" },
       { tablet_extra: { "inset-block-start": px(0), "inset-inline-start": px(0), "inset-inline-end": px(0), "inset-block-end": px(0), width: pct(100), height: pct(100) } }]
    : [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover" }, {}];
  const text = (key, color, mt, maxW, content) => pg(`${id}-${key}`, content,
    mix(type(18, color), [{ "max-width": px(maxW), margin: pad(mt[0], 0, 0, 0) }, { mobile: { margin: pad(mt[1], 0, 0, 0) } }]));
  return dv(id, {}, {}, [
    dv(`${id}-card`, {
      position: "relative", display: "flex", "flex-direction": "column", "justify-content": "flex-end", overflow: "hidden", background: { color: "#d9d9d9" }, height: pct(100),
      "aspect-ratio": "622/467", "min-height": px(0), "border-radius": radius(30), padding: pad(0, 36, 39, k.pl), transition: ease(250),
    }, {
      hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") },
      tablet_extra: { "aspect-ratio": "auto", "min-height": px(540) },
      tablet: { "aspect-ratio": "622/467", "min-height": px(0), "border-radius": radius(24), padding: pad(0, 32, 39, 32) },
      mobile: { "min-height": px(460), padding: pad(0, 20, 28, 20) },
    }, [
      w(`${id}-img`, "e-image", { image: image(M[k.img].id), attributes: attrs([["data-zoom", ""]]) }, imgStyle),
      dv(`${id}-shade`, { ...FILL, "min-width": px(0), position: "absolute", background: layers(grad(180, [["rgba(0,0,0,0)", 0], ["#000000", 100]])) }),
      dv(`${id}-copy`, { position: "relative", width: pct(100) }, {}, [
        hd(`${id}-title`, "h3", k.title, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(48), "line-height": px(52.2), color: WHITE, margin: P0 }, { mobile: { "font-size": px(30), "line-height": px(32.4) } }]),
        text("text", WHITE, k.textMt, k.textW, k.text),
        text("roles", "rgba(255,255,255,0.6)", k.rolesMt, k.rolesW, k.roles),
        fx(`${id}-ctas`, { display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(k.ctaGap), margin: pad(k.ctaMt[0], 0, 0, 0) }, { mobile: { margin: pad(k.ctaMt[1], 0, 0, 0) } }, k.ctas(id)),
      ]),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(i)) });
};

const [d, m] = mix(PAGE(), [
  { margin: mtAuto(67), display: "grid", "grid-template-columns": COLS(2), gap: gap(42), position: "relative", "inset-inline-start": px(3) },
  { tablet_extra: { position: "static", "inset-inline-start": px(0) }, tablet: { margin: mtAuto(48), "grid-template-columns": COLS(1), gap: gap(24) }, mobile: { gap: gap(20) } },
]);
module.exports = [dv("es-wf", d, m, CARDS.map(card), { tag: "section", attributes: attrs([["data-trim", ""]]) })];
