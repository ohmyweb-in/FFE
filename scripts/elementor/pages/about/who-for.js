// WhoFor (about/WhoFor.tsx): Visitors and Exhibitors photo cards with CTAs.
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, mtAuto, radius, gap, image, box, div, w, attrs, media, text, NORMAL, at, FILL, mix, reveal, ease, layers, grad, btn } = require("../../lib.js");
const { NARROW, HSEC, CARD_HOVER } = require("../g1-shared.js");

const M = media();
const CARDS = [
  {
    c: "v", key: "visit", title: "Visitors", pl: 42, tagW: 391, btnGap: 9,
    desc: "For buyers and industry professionals seeking new fresh food products, suppliers, technologies, solutions and business partners.",
    tags: "Wholesalers | Importers | Exporters | Retailers | Food Service Operators...",
    btns: (c) => [
      btn(`${c}-why`, "Why Visit", "/why-visit", { w: 162, h: 52, pl: 33, gap: 9.73, chev: "chevron-black", color: "#000000", bg: T.white, border: [1.5, T.white], m: { w: 125, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 } }),
      btn(`${c}-reg`, "Register Your Interest", "/register-to-visit", { w: 248, h: 52, pl: 27, gap: 13.66, chev: "chevron-white", color: T.white, border: [1.5, T.white], hoverBg: "rgba(255,255,255,0.1)", m: { w: 200, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 } }),
    ],
  },
  {
    c: "x", key: "exhibit", title: "Exhibitors", pl: 36, tagW: 549, btnGap: 11,
    desc: "For companies looking to showcase fresh food products, technologies and logistics solutions, enter new markets and build commercial relationships across Asia Pacific's fresh food ecosystem",
    tags: "Producer | Packaging Companies | Cold Chain Operators...",
    btns: (c) => [
      btn(`${c}-why`, "Why Exhibit", "/why-exhibit", { w: 172, h: 52, pl: 27, gap: 10.14, chev: "chevron-white", color: T.white, bg: T.accent, border: [1.5, T.accent], m: { w: 142, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 } }),
      btn(`${c}-who`, "Who Should Exhibit", "/who-should-exhibit", { w: 241, h: 52, pl: 33, gap: 8.83, chev: "chevron-white", color: T.white, border: [1.5, T.white], hoverBg: "rgba(255,255,255,0.1)", m: { w: 197, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 } }),
    ],
  },
];

const card = (k, i) => {
  const id = `au-wf-${k.c}`;
  const img = k.c === "v"
    ? { ...FILL, width: pct(100), height: pct(100) }
    : { ...at(pct(-17.34), null, null, pct(-13.26)), width: pct(167.77), height: pct(117.34) };
  return div(id, [{ padding: P0 }, {}], [
    box(`${id}-card`, [
      {
        position: "relative", overflow: "hidden", "aspect-ratio": "622/467", "min-height": px(0), display: "flex", "flex-direction": "column", "justify-content": "flex-end",
        padding: pad(0, 36, 39, k.pl), "border-radius": radius(30), background: { color: "#d9d9d9" }, color: T.white, transition: ease(250),
      },
      { hover: CARD_HOVER, tablet_extra: { "aspect-ratio": "auto", "min-height": px(440) }, tablet: { padding: pad(0, 22, 28, 22), "border-radius": radius(24) }, mobile: { "border-radius": radius(18.6) } },
    ], [
      w(`${id}-img`, "e-image", { image: image(M[k.key].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...img, "max-width": custom("none"), "object-fit": "cover" }, {}]),
      div(`${id}-shade`, [{ ...FILL, padding: P0, background: layers(grad(180, [["rgba(0,0,0,0)", 0], ["#000000", 100]])) }, {}]),
      div(`${id}-copy`, [{ position: "relative", padding: P0 }, {}], [
        w(`${id}-title`, "e-heading", { tag: "h3", title: k.title }, [
          { "font-family": FREDOKA, "font-weight": "600", "font-size": px(48), "line-height": px(52.2), color: T.white, margin: P0 }, { mobile: { "font-size": px(30), "line-height": NORMAL } },
        ]),
        w(`${id}-desc`, "e-paragraph", { paragraph: k.desc }, [
          { ...text(18, 500, T.white, { "line-height": NORMAL }), "max-width": px(534), margin: pad(26, 0, 0, 0) }, { mobile: { "font-size": px(17), margin: pad(20, 0, 0, 0) } },
        ]),
        w(`${id}-tags`, "e-paragraph", { paragraph: k.tags }, [
          { ...text(18, 500, "rgba(255,255,255,0.6)", { "line-height": NORMAL }), "max-width": px(k.tagW), margin: pad(30, 0, 0, 0) }, { mobile: { "font-size": px(17), margin: pad(24, 0, 0, 0) } },
        ]),
        box(`${id}-btns`, [
          { padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(k.btnGap, k.btnGap), margin: pad(36, 0, 0, 0) }, { mobile: { gap: gap(10, 10), margin: pad(28, 0, 0, 0) } },
        ], k.btns(id)),
      ], { attributes: attrs([["data-trim", ""]]) }),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(i)) });
};

module.exports = [div("au-wf", mix([{ padding: P0, display: "block" }, {}], NARROW([46])), [
  div("au-wf-tw", [{ padding: P0 }, {}], [
    w("au-wf-title", "e-heading", { tag: "h2", title: "Who is this <em>event </em>for?" }, mix(HSEC, [{ "line-height": px(52) }, { tablet: { "line-height": pct(109) }, mobile: { "line-height": NORMAL } }])),
  ], { attributes: attrs(reveal(0)) }),
  div("au-wf-grid", [
    { padding: P0, display: "grid", margin: pad(28, 0, 0, 0), "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(42, 42), width: custom("calc(100% + 6px)"), "max-width": custom("none") },
    { tablet_extra: { "grid-template-columns": "minmax(0, 1fr)", gap: gap(24, 24), width: pct(100) }, tablet: { margin: pad(24, 0, 0, 0) }, mobile: { gap: gap(20, 20) } },
  ], CARDS.map(card)),
], { tag: "section" })];
