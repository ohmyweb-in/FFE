const { joinBanner } = require("../../lib.js");

module.exports = [
  joinBanner("sv", {
    mt: [48, 48, 24], h: [600, 329],
    img: { top: -26.21, left: 23.73, w: 76.29, h: 176.74 },
    pad: { top: 53, bottom: 0, left: 14.5 },
    eyebrow: "Connect with the fresh food ecosystem", eyebrowMb: [16, 23],
    title: "16–18 November 2027", titleMax: 730, titleMl: -7,
    lead: false, date: false,
    dateMt: [25, 30, 29.41], dateMl: 0,
    ctas: { mt: [23, 32] },
  }),
];
