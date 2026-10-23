// WhyNow (story/WhyNow.tsx): mint panel with a heading, two fact cards (FAO sources) and a callout.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, box, div, w, attrs, media, text, NORMAL, at, FILL, mix, reveal, ease, layers, grad, rotate, svg, shadow, btn, ruleEyebrow } = require("../../lib.js");
const { B15, CARD_HOVER } = require("../g1-shared.js");

const M = media();
const FACTS = [
  {
    title: "50% more", text: "Food, feed and fibre will need to be produced globally by 2050 <b>compared with 2012 levels</b>.",
    src: "Source: FAO — The State of the World’s Land and Water Resources for Food and Agriculture 2025", href: "https://doi.org/10.4060/cd7488en",
    img: "g1-broccoli", srcTop: 193.68, mt: 0,
  },
  {
    title: "13.3% of food", text: "Is lost globally after harvest and before reaching retail, including during transport, storage, wholesale and processing.",
    src: "Source: UNEP &amp; FAO — Sustainable Food Cold Chains: Opportunities, Challenges and the Way Forward", href: "https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/1231-global-food-losses",
    img: "g1-tomatoes", srcTop: 204.68, mt: 0.32,
  },
];

const fact = (f, i) => {
  const id = `os-wn-f${i + 1}`;
  return div(id, [
    { position: "relative", padding: pad(24, 24, 0, 24), height: px(236), margin: pad(f.mt, 0, 0, 0), "border-radius": radius(22), background: { color: "#ffffff" }, transition: ease(250) },
    { hover: CARD_HOVER, tablet_extra: { padding: pad(24, 24, 24, 24), height: AUTO, margin: P0 }, mobile: { padding: pad(20, 20, 20, 20) } },
  ], [
    box(`${id}-row`, [
      { padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 22) },
      { mobile: { "flex-direction": "column", "align-items": "stretch", gap: gap(20, 0) } },
    ], [
      div(`${id}-ph`, [
        { position: "relative", width: px(160), height: px(160), "min-width": px(0), padding: P0, flex: flex(0, 0, AUTO), overflow: "hidden", "border-radius": radius(18), background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) }, {},
      ], [
        w(`${id}-img`, "e-image", { image: image(M[f.img].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      ]),
      box(`${id}-tx`, [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(10, 0), width: px(398) }, { tablet_extra: { width: AUTO } }], [
        w(`${id}-title`, "e-heading", { tag: "h3", title: f.title }, [
          { "font-family": FREDOKA, "font-weight": "600", "font-size": px(34), "line-height": px(40), color: T.accent, margin: P0 }, { mobile: { "font-size": px(30), "line-height": px(36) } },
        ]),
        w(`${id}-text`, "e-paragraph", { paragraph: f.text }, B15(24)),
        btn(`${id}-cta`, "Read the report", f.href, { w: 160, h: 40, pl: 19, gap: 5.28, fs: 15, chev: "chevron-sm-white", color: T.white, bg: T.accent, border: [1, T.accent] }),
      ]),
    ]),
    w(`${id}-src`, "e-paragraph", { paragraph: f.src }, [
      { "font-family": { $$type: "font-family", value: "Inter" }, "font-style": "italic", "font-weight": "600", "font-size": px(10), "line-height": px(18), color: T.accent, margin: P0, "max-width": custom("none"), ...at(px(f.srcTop), null, null, px(33)) },
      { tablet_extra: { position: "relative", "inset-block-start": AUTO, "inset-inline-start": AUTO, margin: pad(14, 0, 0, 0), "max-width": px(496) } },
    ]),
  ], { tag: "article", attributes: attrs([["data-group", ""], ...reveal(i)]) });
};

module.exports = [div("os-wn", mix([{ padding: P0, width: custom("min(1360px, 100% - 64px)"), "max-width": custom("none"), margin: mtAuto(80) }, { tablet: { margin: mtAuto(48) }, mobile: { width: custom("min(1360px, 100% - 52px)") } }]), [
  box("os-wn-panel", [
    { padding: pad(40, 40, 40, 40), display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(22, 0), "border-radius": radius(32), background: layers(grad(180, [[T.mint, 0], ["#eef6ef", 100]])) },
    { tablet: { "border-radius": radius(24) }, mobile: { padding: pad(20, 20, 20, 20) } },
  ], [
    box("os-wn-head", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(22, 0), width: AUTO }, {}], [
      ruleEyebrow("os-wn-eb", "Why this matters now"),
      w("os-wn-title", "e-heading", { tag: "h2", title: "The <em>Global Food System</em> is under increasing pressure <br>to produce more while making better <em>use of limited resources.</em>", attributes: attrs([["data-br-lg", ""]]) }, [
        { "font-family": FREDOKA, "font-weight": "600", "font-size": px(34), "line-height": px(42), color: T.forest, margin: P0 },
        { tablet: { "font-size": px(30), "line-height": px(38) }, mobile: { "font-size": px(26), "line-height": px(32) } },
      ]),
    ], { attributes: attrs(reveal(0)) }),
    div("os-wn-grid", [
      { padding: pad(7.68, 0, 0, 0), display: "grid", width: pct(100), height: px(250), "align-items": "start", "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(24, 24) },
      { tablet_extra: { height: AUTO, padding: P0, "align-items": "stretch", "grid-template-columns": "minmax(0, 1fr)" } },
    ], FACTS.map(fact)),
    box("os-wn-callout", [
      { padding: pad(24, 32, 24, 28), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 24), width: pct(100), "border-radius": radius(22), background: { color: "#ffffff" } },
      { mobile: { padding: pad(20, 20, 20, 20), gap: gap(0, 16) } },
    ], [
      div("os-wn-leaf", [{ position: "relative", width: px(64.641), height: px(71.962), padding: P0, display: "flex", flex: flex(0, 0, AUTO) }, { mobile: { display: "none" } }], [
        svg("os-wn-leaf-i", "g1-leaf-sm", [{ ...at(px(15.981), null, null, px(2.3205)), width: px(60), height: px(40), "max-width": custom("none"), transform: rotate(60) }, {}]),
      ], { attributes: attrs([["aria-hidden", "true"]]) }),
      w("os-wn-callout-t", "e-paragraph", { paragraph: "For the fresh food sector, this reinforces the need for <b>better post-harvest technology, cooling, preservation, cold chain, logistics and distribution</b>, <b>to preserve more of what is produced, move it efficiently and connect supply with the markets that need it.</b>" }, [
        { ...text(18, 500, "#000000", { "line-height": px(26) }), margin: P0, "min-width": px(0), flex: flex(1, 1, pct(0)) }, { mobile: { "font-size": px(16), "line-height": px(24) } },
      ]),
    ], { attributes: attrs(reveal(0)) }),
  ]),
], { tag: "section" })];
