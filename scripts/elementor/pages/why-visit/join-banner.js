const { joinBanner } = require("../../lib.js");

module.exports = [
  joinBanner("wv", {
    mt: [48, 48, 43], h: [760, 446],
    img: { top: -8.98, left: 23.85, w: 78.64, h: 134.08 },
    pad: { top: 54, bottom: 0, left: 14.5 },
    title: "Be part of Asia Pacific’s <br>fresh food ecosystem", titleMax: 751, titleMl: 5,
    lead: "Join buyers, sourcing professionals, distributors, retailers, foodservice operators and industry stakeholders looking to connect with the businesses shaping the region’s fresh food sector.",
    leadMt: 27.21, leadMl: 1, leadMax: 679,
    dateMt: [25, 34, 25.83], dateMl: 0,
    ctas: { mt: [23, 25] },
  }),
];
