// Elevate (exhibit/Elevate.tsx): sponsorship panel with a 600x310 photo. untrim.
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, div, box, w, attrs, media, mix, reveal, grad, layers, pill } = require("../../lib.js");
const { W1360, PHOTO_BG, H2X, LEADX, SMALL, COVER, h2, para } = require("../g2-shared.js");
const { FILL } = require("../../lib.js");

const M = media();
module.exports = [
  div("we-elev", mix(W1360, [{ margin: mtAuto(72), padding: P0 }, { tablet: { margin: mtAuto(48) } }]), [
    box("we-elev-panel", [
      {
        padding: pad(40, 32, 40, 48), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 48), "border-radius": radius(32),
        background: layers(grad(90, [[T.mint, 0], [T.page, 100]])),
      },
      { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0), padding: pad(40) }, tablet: { "border-radius": radius(24) }, mobile: { padding: pad(20) } },
    ], [
      box("we-elev-copy", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(14, 0), flex: flex(1, 1, pct(0)), "min-width": px(0) }, {}], [
        h2("we-elev-title", "Elevate your presence", H2X),
        para("we-elev-lede", "Looking to go beyond your exhibition stand?", LEADX("#000000")),
        para("we-elev-text", "From high-impact branding to tailored sponsorship opportunities, position your business more prominently within the Fresh Food Expo APAC experience.", SMALL),
        div("we-elev-cta", [{ padding: pad(8, 0, 0, 0) }, {}], [
          pill("we-elev-pill", "Explore Sponsorship &amp; Branding Opportunities", "/contact#enquiry", {
            color: "#000000", bg: "rgba(0,0,0,0)", border: [1.5, "#000000"], hoverBg: "rgba(0,0,0,0.05)", styles: [{}, { mobile: { padding: pad(10, 18) } }],
          }),
        ]),
      ], { attributes: attrs(reveal(0)) }),
      div("we-elev-photo", [
        { position: "relative", overflow: "hidden", padding: P0, flex: flex(0, 0, AUTO), width: px(600), "aspect-ratio": "600/310", "border-radius": radius(24), background: PHOTO_BG },
        { tablet_extra: { width: pct(100), "max-width": px(600) } },
      ], [
        w("we-elev-img", "e-image", { image: image(M["g2-ex-branding"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), ...COVER }, {}]),
      ], { attributes: attrs([["data-group", ""], ...reveal(1)]) }),
    ]),
  ], { tag: "section" }),
];
