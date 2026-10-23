const { joinBanner, DATE } = require("../../lib.js");

module.exports = [joinBanner("mb", {
  mt: [48, 48, 53.06], h: [780, 522],
  img: { top: -18.62, left: 23.7, w: 78.64, h: 127.23 },
  pad: { top: 56, bottom: 0, left: 14.5 },
  eyebrow: "Be part of the fresh food ecosystem",
  eyebrowMb: [16, 19], eyebrowMl: 2.5,
  title: "Join us at <br>Fresh Food Expo Asia Pacific (FFE&nbsp;APAC) 2027",
  titleMax: 730, titleMl: 4.5,
  lead: "Connect with the region’s leading fresh food businesses, technologies and decision-makers.",
  leadMt: 27, leadMl: 0.5, leadMax: 591,
  date: DATE,
  dateMt: [25, 34, 31], dateMl: 0,
  ctas: { mt: [23, 25] },
})];
