const { joinBanner } = require("../../lib.js");

module.exports = [
  joinBanner("se", {
    mt: [48, 48, 24], h: [760, 412],
    img: { top: -21.24, left: 23.7, w: 78.64, h: 145.14 },
    pad: { top: 56, bottom: 0, left: 14.5 },
    eyebrow: "Put your business at the centre of",
    title: "Asia Pacific’s fresh food industry", titleMax: 730, titleMl: 5,
    lead: "Showcase your products and solutions, meet prospective buyers and partners, and build new commercial opportunities across the region.",
    leadMt: 28.41, leadMl: 0.5, leadMax: 591,
    dateMt: [25, 34, 30.83], dateMl: 0,
    ctas: { mt: [23, 25] },
  }),
];
