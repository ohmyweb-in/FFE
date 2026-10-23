// Connections (why/Sections Connections): cropped photo left, copy right. untrim.
const { T, px, pct, pad, P0, mtAuto, gap, flex, box, mix, reveal, attrs } = require("../../lib.js");
const { ROW, whyPhoto, H2W, PW, h2, para } = require("../g2-shared.js");

module.exports = [
  box("wv-conn", mix(ROW, [
    { margin: mtAuto(60), padding: pad(0, 0, 0, 13), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 35) },
    { tablet: { margin: mtAuto(48), padding: P0, "flex-direction": "column", "align-items": "stretch", gap: gap(24, 0) } },
  ]), [
    whyPhoto("wv-conn-photo", { aspect: "322/187", lgW: 322, img: "g2-why-networking", box: { w: 135.4, h: 137.17, l: -6.21, t: -9.94 } }),
    box("wv-conn-body", [
      { padding: pad(0, 16), display: "flex", "flex-direction": "column", gap: gap(14, 0), flex: flex(1, 1, pct(0)), "min-width": px(0), "max-width": px(794) },
      { tablet: { padding: P0 } },
    ], [
      h2("wv-conn-title", "Build valuable business connections", H2W),
      para("wv-conn-lead", "Meet suppliers, partners and industry decision-makers from across the fresh food ecosystem.", PW),
      para("wv-conn-text", "Use Fresh Food Expo APAC to source new products, discover new solutions, exchange market insights and build commercial relationships across Asia Pacific.", PW),
    ], { attributes: attrs(reveal(1)) }),
  ], { tag: "section" }),
];
