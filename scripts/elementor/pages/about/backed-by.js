// BackedBy (about/BackedBy.tsx): Messe Berlin photo collage + copy.
const { T, px, pct, custom, pad, P0, AUTO, gap, flex, image, box, div, w, attrs, media, at, FILL, mix, reveal, layers, grad, pill } = require("../../lib.js");
const { NARROW, EYB, H44, B15 } = require("../g1-shared.js");

const M = media();
module.exports = [box("au-bb", mix([{ padding: P0 }, {}], NARROW([46, 46, 61]), [
  { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 48) },
  { tablet_extra: { gap: gap(0, 40) }, tablet: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0) } },
]), [
  div("au-bb-media", [
    { position: "relative", "aspect-ratio": "600/380", width: px(600), "max-width": px(600), padding: P0, flex: flex(0, 0, AUTO) },
    { tablet_extra: { width: pct(48) }, tablet: { width: pct(100), flex: flex(0, 1, AUTO) } },
  ], [
    div("au-bb-sh", [{ ...at(px(0), null, null, px(0)), width: pct(49.6667), height: pct(60.5263), padding: P0, background: { color: T.accent }, "border-radius": { "start-start": px(30), "start-end": px(30), "end-end": px(30), "end-start": px(120) } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
    div("au-bb-photo", [
      { ...at(pct(6.8421), null, null, pct(5)), width: pct(95), height: pct(89.4737), overflow: "hidden", padding: P0, "border-radius": { "start-start": px(30), "start-end": px(0), "end-end": px(30), "end-start": px(30) }, background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) }, {},
    ], [
      w("au-bb-img", "e-image", { image: image(M["g1-messe"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      w("au-bb-logo", "e-image", { image: image(M["g1-messe-logo"].id) }, [{ ...at(pct(6.96), null, null, pct(4.21)), width: pct(19.47), height: AUTO, "max-width": custom("none") }, {}]),
    ], { attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(0)) }),
  box("au-bb-text", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), "min-width": px(0), flex: flex(1, 1, pct(0)) }, {}], [
    w("au-bb-eyebrow", "e-paragraph", { paragraph: "Organiser" }, EYB()),
    w("au-bb-title", "e-heading", { tag: "h2", title: "Led by <em>Messe Berlin Asia Pacific</em>" }, H44),
    box("au-bb-copy", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO }, {}], [
      w("au-bb-p1", "e-paragraph", { paragraph: "Messe Berlin Asia Pacific is the regional headquarters of Messe Berlin GmbH for the Asia Pacific region, headquartered in Singapore with a growing presence in key markets including India. It leads the development and expansion of Messe Berlin’s business across Asia, connecting global industries with high-growth regional opportunities." }, B15()),
      w("au-bb-p2", "e-paragraph", { paragraph: "Messe Berlin Asia Pacific develops and delivers leading platforms including ITB Asia, InnoTrans Asia, CMS Asia, Smart Health Asia, ITB India, MICE Show Asia, Travel Tech Asia and Travel Meet Asia. The organisation also oversees Messe Berlin India, supporting the group’s growth in the Indian market." }, B15()),
    ]),
    div("au-bb-cta", [{ padding: pad(6, 0, 0, 0) }, {}], [pill("au-bb-pill", "Discover Messe Berlin", "/messe-berlin", { color: T.accent, bg: T.mint, border: [1.5, T.accent] })]),
  ], { attributes: attrs(reveal(1)) }),
], { tag: "section" })];
