// StoryIntro (story/StoryIntro.tsx): copy on the left, peppers photo on the right (desktop).
const { T, px, pct, custom, pad, P0, AUTO, radius, gap, flex, image, box, div, w, attrs, media, text, FILL, mix, reveal, layers, grad, ruleEyebrow } = require("../../lib.js");
const { pos, NARROW, H38, B15 } = require("../g1-shared.js");

const M = media();
module.exports = [box("os-si", mix([{ padding: P0 }, {}], NARROW([48, 48, 83.32]), [
  { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 64) },
  { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0) } },
]), [
  box("os-si-copy", [
    { padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), width: px(640), flex: flex(0, 0, AUTO) },
    { tablet_extra: { width: pct(100), flex: flex(0, 1, AUTO) } },
  ], [
    ruleEyebrow("os-si-eb", "Our story"),
    w("os-si-title", "e-heading", { tag: "h2", title: "The future of fresh food depends <br>on a more connected ecosystem.", attributes: attrs([["data-br-md", ""]]) }, H38),
    w("os-si-p1", "e-paragraph", { paragraph: "Across Asia Pacific, the fresh food industry is evolving as food security, sustainability, technology, supply chain resilience and cross-border trade reshape how food moves from source to market." }, B15(24)),
    w("os-si-p2", "e-paragraph", { paragraph: "Yet the value chain remains fragmented, with producers, suppliers, technology providers, logistics operators, distributors, retailers and buyers often working across separate parts of the ecosystem." }, B15(24)),
    w("os-si-p3", "e-paragraph", { paragraph: "Fresh Food Expo APAC was created to connect the ecosystem." }, [{ ...text(15, 700, T.body, { "line-height": px(24) }), margin: P0 }, {}]),
  ], { attributes: attrs(reveal(0)) }),
  div("os-si-photo", [
    {
      position: "relative", overflow: "hidden", padding: P0, width: AUTO, height: px(319), "aspect-ratio": "auto", "min-width": px(0), "max-width": custom("none"), flex: flex(1, 1, pct(0)),
      "border-radius": radius(30), background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])),
    },
    { tablet_extra: { width: pct(100), height: AUTO, "aspect-ratio": "576/319", "max-width": px(576), flex: flex(0, 1, AUTO) }, tablet: { "border-radius": radius(24) }, mobile: { "max-width": custom("none") } },
  ], [
    w("os-si-img", "e-image", { image: image(M["g1-peppers"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover", "object-position": pos(50, 1.3) }, {}]),
  ], { attributes: attrs([["data-group", ""], ...reveal(1)]) }),
], { tag: "section" })];
