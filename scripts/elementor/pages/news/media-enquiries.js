// MediaEnquiries (news/MediaEnquiries.tsx). The section root carries the reveal.
const { T, px, pct, pad, P0, mtAuto, radius, flex, box, div, w, attrs, media, text, mix, reveal, image } = require("../../lib.js");
const { CW } = require("../g4-shared.js");
const M = media();

module.exports = [div("nw-media", mix(CW(1290), [
  { padding: P0, margin: { ...mtAuto(37), "block-end": px(3) }, display: "block" },
  { tablet: { margin: mtAuto(24) } },
]), [
  box("nw-media-bar", [
    {
      padding: pad(29, 32, 29, 38), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap20(), "border-radius": { "start-start": px(22), "start-end": px(22), "end-start": px(0), "end-end": px(22) },
      background: { color: T.mint }, width: pct(100),
    },
    { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap16(), padding: pad(20) } },
  ], [
    box("nw-media-ic", [
      { width: px(76), height: px(76), "min-width": px(76), padding: P0, "border-radius": radius(999), background: { color: T.white }, display: "flex", "justify-content": "center", "align-items": "center", flex: flex(0, 0, { size: "", unit: "auto" }) },
      { mobile: { width: px(56), height: px(56), "min-width": px(56) } },
    ], [
      w("nw-media-icon", "e-image", { image: image(M["g4-point-2"].id) }, [{ width: px(31), height: px(31) }, { mobile: { width: px(24), height: px(24) } }]),
    ], { attributes: attrs([["aria-hidden", "true"]]) }),
    w("nw-media-p", "e-paragraph", {
      paragraph: 'Fresh Food Expo APAC Media Enquiries<br>For press accreditation, media partnerships or enquiries, please contact <a href="mailto:media@freshfoodexpoapac.com">media@freshfoodexpoapac.com</a>',
    }, [
      { ...text(15, 500, T.body, { "line-height": px(23) }), "border-width": pad(0, 0, 0, 5), "border-style": "solid", "border-color": T.accent, padding: pad(5, 0, 5, 11), margin: P0, "min-width": px(0) }, {},
    ]),
  ]),
], { tag: "section", attributes: attrs(reveal(0)) })];

function gap20() { return require("../../lib.js").gap(0, 20); }
function gap16() { return require("../../lib.js").gap(16, 16); }
