// EventIntro (about/EventIntro.tsx): heading + three mint cards with a photo pinned top-right.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, gap, image, box, div, w, attrs, media, text, NORMAL, at, FILL, mix, reveal, ease, layers, grad } = require("../../lib.js");
const { EYB, HSEC, CARD_HOVER } = require("../g1-shared.js");

const M = media();
const rad = (ss, se, ee, es) => ({ "start-start": px(ss), "start-end": px(se), "end-end": px(ee), "end-start": px(es) });
const CARDS = [
  { title: "The Event", lead: "Connecting the Fresh Food Industry", body: "Fresh Food Expo APAC connects the fresh food ecosystem across the source-to-market value chain, bringing businesses and decision-makers together in Singapore.", textW: 254, ml: 12, imgH: 203 },
  { title: "The Ecosystem", lead: "From Source to Market", body: "Discover fresh food, post-harvest technologies, cooling, packaging, cold chain, logistics, distribution and market access—all within one platform.", textW: 264, ml: 12, imgH: 203 },
  { title: "The Opportunity", lead: "Connect. Source. Grow.", body: "Meet growers, producers, exporters, suppliers, technology providers, buyers and industry partners from Asia Pacific and global markets.", textW: 250, ml: 14, imgH: 187 },
];

const AUTOS = { "inset-block-start": AUTO, "inset-inline-end": AUTO, "inset-block-end": AUTO, "inset-inline-start": AUTO };
const card = (c, i) => {
  const id = `au-ei-c${i + 1}`;
  return div(id, [{ padding: P0 }, {}], [
    div(`${id}-card`, [
      {
        position: "relative", height: pct(100), "min-height": px(203), overflow: "hidden", padding: pad(25, 131, 24, 22), "border-radius": rad(15, 15, 75, 15),
        background: layers(grad(90, [[T.mint, 0], [T.page, 100]])), transition: ease(250),
      },
      { hover: CARD_HOVER, mobile: { padding: pad(0, 22, 24, 22) } },
    ], [
      div(`${id}-media`, [{ ...at(px(0), px(0), null, null), width: px(119), height: px(c.imgH), overflow: "hidden", padding: P0, "border-radius": rad(75, 15, 75, 0), background: { color: "#d9d9d9" } },
        { mobile: { position: "relative", ...AUTOS, width: custom("calc(100% + 44px)"), height: px(170), margin: pad(0, -22, 12, -22), "border-radius": rad(0, 0, 0, 0) } }], [
        w(`${id}-img`, "e-image", { image: image(M[`g1-event${i + 1}`].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      ]),
      div(`${id}-bar`, [{ position: "relative", "min-height": px(37), padding: pad(8, 0, 0, 0) }, {}], [
        div(`${id}-rule`, [{ ...at(px(0), null, px(0), px(0)), width: px(4), "min-width": px(0), padding: P0, "border-radius": { "start-start": px(999), "start-end": px(999), "end-end": px(999), "end-start": px(999) }, background: { color: T.accent } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
        w(`${id}-title`, "e-heading", { tag: "h3", title: c.title }, [
          { "font-family": FREDOKA, "font-weight": "600", "font-size": px(25), "line-height": NORMAL, color: T.accent, margin: pad(0, 0, 0, c.ml) },
          { mobile: { "font-size": px(22), "line-height": pct(120) } },
        ]),
      ], { attributes: attrs([["data-trim", ""]]) }),
      w(`${id}-text`, "e-paragraph", { paragraph: `<b>${c.lead}</b><br>${c.body}` }, [
        { ...text(13, 500, T.body, { "line-height": px(20) }), margin: pad(12, 0, 0, 0), "max-width": px(c.textW) },
        { tablet_extra: { "max-width": custom("none") } },
      ]),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs([["role", "listitem"], ...reveal(i)]) });
};

module.exports = [div("au-ei", mix([{ position: "relative", padding: P0, display: "block", width: custom("min(1263px, 100% - 64px)"), "max-width": custom("none"), margin: mtAuto(46) }, { mobile: { width: custom("min(1263px, 100% - 52px)") } }]), [
  box("au-ei-head", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "center", gap: gap(16, 0), "text-align": "center" }, {}], [
    w("au-ei-eyebrow", "e-paragraph", { paragraph: "About the event", attributes: attrs([["data-untrim", ""]]) }, EYB()),
    w("au-ei-title", "e-heading", { tag: "h2", title: "Fresh Food Expo APAC" }, mix(HSEC, [{ color: T.accent }, { tablet: { "line-height": NORMAL } }])),
  ], { attributes: attrs([["data-trim", ""], ...reveal(0)]) }),
  div("au-ei-list", [
    { display: "grid", padding: P0, margin: mtAuto(36), "max-width": custom("none"), "grid-template-columns": "repeat(3, minmax(0, 1fr))", gap: gap(15, 15) },
    { tablet_extra: { "max-width": custom("none"), "grid-template-columns": "repeat(2, minmax(0, 1fr))" }, mobile: { "max-width": px(600), "grid-template-columns": "minmax(0, 1fr)" } },
  ], CARDS.map(card), { attributes: attrs([["role", "list"]]) }),
], { tag: "section" })];
