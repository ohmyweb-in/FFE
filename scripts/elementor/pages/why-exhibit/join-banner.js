const { joinBanner } = require("../../lib.js");

module.exports = [
  joinBanner("we", {
    mt: [48, 48, 72], h: [780, 447],
    img: { top: -19.58, left: 23.7, w: 78.64, h: 133.78 },
    pad: { top: 64, bottom: 0, left: 14.5 },
    title: "Put your business at the centre of <br>Asia Pacific’s fresh food ecosystem", titleMax: 771, titleMl: 5,
    lead: "Meet buyers. Showcase your products and solutions. Build partnerships. Explore new markets. Connect with the community.",
    leadMt: 27.2, leadMl: 0.5, leadMax: 591,
    dateMt: [25, 34, 30.84], dateMl: 0,
    ctas: { mt: [23, 25] },
  }),
];
