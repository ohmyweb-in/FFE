// SIAW BiggerPicture (siaw/BiggerPicture.tsx): gradient panel, copy + photo frame. No data-trim (.untrim source).
const { T, px, pct, custom, pad, AUTO, mtAuto, flex, gap, image, w, attrs, media, FILL, reveal, mix, grad, layers, sz } = require("../../lib.js");
const { PANEL, EB, H2, MINTG, rad, dv, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const OBJ = { $$type: "object-position", value: { x: sz(50, "%"), y: sz(74, "%") } };
const P = mix([{ "font-family": { $$type: "font-family", value: "Outfit" }, "font-weight": "500", "font-size": px(15), "line-height": px(24), color: T.body, margin: pad(0) }, {}]);

const copy = dv("si-bp-copy", { display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16), width: px(560), flex: flex(0, 0, AUTO) },
  { tablet_extra: { width: pct(100) } }, [
  w("si-bp-eyebrow", "e-paragraph", { paragraph: "The bigger picture" }, EB),
  hd("si-bp-title", "h2", "Bringing the <em>Agri-Food</em><br> <em>Ecosystem</em> Together.", mix(H2(44, 50), [{ width: AUTO }, {}]), { attributes: attrs([["data-br-md", ""]]) }),
  dv("si-bp-body", { display: "flex", "flex-direction": "column", gap: gap(14), width: pct(100) }, {}, [
    pg("si-bp-p1", "Singapore International Agri-Food Week brings together stakeholders from across the agri-food ecosystem to address shared priorities including food security, climate resilience, innovation and stronger regional supply chains.", P),
    pg("si-bp-p2", "Through its programme of events and activities, SIAW creates opportunities for government, industry, researchers, investors and innovators to exchange ideas, build partnerships and explore new opportunities for collaboration.",
      mix(P, [{ "max-width": px(550) }, { tablet_extra: { "max-width": NONE } }])),
  ]),
], { attributes: attrs(reveal(0)) });

const frame = dv("si-bp-frame", {
  position: "relative", overflow: "hidden", width: pct(100), "border-radius": rad(30, 30, 30, 30), ...MINTG,
  "aspect-ratio": "auto", height: px(398), "min-width": px(0), flex: flex(1, 1, pct(0)),
}, { tablet_extra: { "aspect-ratio": "664/398", height: AUTO, flex: flex(0, 1, AUTO) }, tablet: { "border-radius": rad(20, 20, 20, 20) } }, [
  w("si-bp-img", "e-image", { image: image(M["g3-tomatoes"].id), attributes: attrs([["data-zoom", ""]]) },
    [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover", "object-position": OBJ }]),
], { attributes: attrs([["data-group", ""], ...reveal(1)]) });

const [d, m] = mix(PANEL, [{ margin: mtAuto(65) }, { tablet: { margin: mtAuto(48) } }]);
module.exports = [dv("si-bp", d, m, [
  dv("si-bp-panel", {
    display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(48), "border-radius": rad(36, 36, 36, 36),
    background: layers(grad(90, [["#ffffff", 0], ["#eef6ef", 100]])), padding: pad(40, 40, 40, 48),
  }, { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32), padding: pad(40) }, tablet: { "border-radius": rad(24, 24, 24, 24) }, mobile: { padding: pad(32, 24, 32, 24) } }, [copy, frame]),
], { tag: "section" })];
