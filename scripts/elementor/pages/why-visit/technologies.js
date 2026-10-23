// Technologies (why/Sections Technologies): body left, cropped photo right at lg+ (DOM order photo first, row-reverse). untrim.
const { pad, P0, mtAuto, gap, box, mix } = require("../../lib.js");
const { ROW, whyPhoto, whyBody } = require("../g2-shared.js");

const TECH = [
  ["Agricultural<br>Technologies", "g2-who-t-leaf"], ["Cold Chain", "g2-why-i-truck"], ["Transportation", "g2-why-i-ship"],
  ["Cooling &amp;<br>Refrigeration", "g2-who-t-snow"], ["Preservation<br>&amp; Storage", "g2-who-t-box"], ["Packaging", "g2-why-i-layers"],
];

module.exports = [
  box("wv-tech", mix(ROW, [
    { margin: mtAuto(67), padding: P0, display: "flex", "flex-direction": "row-reverse", "align-items": "flex-start", gap: gap(0, 30) },
    { tablet: { margin: mtAuto(48), "flex-direction": "column", gap: gap(24, 0) } },
  ]), [
    whyPhoto("wv-tech-photo", { aspect: "378/230", lgW: 378, img: "g2-why-tech", box: { w: 116.5, h: 100, l: -8.18, t: -0.15 } }),
    whyBody("wv-tech-body", {
      pad: [1, 16, 0, 16], title: "Discover technologies and supply chain solutions",
      lead: "Explore technologies and services that help maintain freshness, improve efficiency and move fresh food safely to market.", items: TECH,
      close: "Meet solution providers and discover practical ways to strengthen your operations and supply chain.",
    }),
  ], { tag: "section" }),
];
