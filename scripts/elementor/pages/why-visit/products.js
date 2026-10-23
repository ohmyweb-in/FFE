// Products (why/Sections Products): photo left, body right at lg+. untrim.
const { pad, P0, mtAuto, gap, flex, box, mix } = require("../../lib.js");
const { ROW, whyPhoto, whyBody } = require("../g2-shared.js");

const PRODUCTS = [
  ["Fruits &amp;<br>Vegetables", "g2-why-i-apple"], ["Meat &amp;<br>Poultry", "g2-why-i-meat"], ["Seafood", "g2-why-i-fish"],
  ["Eggs &amp; Dairy", "g2-why-i-milk"], ["Technologies Provider", "g2-why-i-network"], ["Logistic &amp; Distribution<br>Provider", "g2-why-i-truck"],
];

module.exports = [
  box("wv-prod", mix(ROW, [
    { margin: mtAuto(44), padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 15) },
    { tablet: { margin: mtAuto(40), "flex-direction": "column", gap: gap(24, 0) } },
  ]), [
    whyPhoto("wv-prod-photo", { aspect: "322/246", lgW: 322, img: "g2-card-fresh" }),
    whyBody("wv-prod-body", {
      pad: [0, 19, 0, 16], title: "Discover new products and suppliers",
      lead: "Connect directly with growers, producers, exporters and suppliers offering:", items: PRODUCTS,
      close: "Identify new sourcing opportunities, compare suppliers and build relationships that support your business.",
    }),
  ], { tag: "section" }),
];
