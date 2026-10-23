const { joinBanner, DATE } = require("../../lib.js");

module.exports = [joinBanner("os", {
  mt: [48, 48, 80],
  h: [880, 499],
  img: { top: -8.03, left: 23.85, w: 78.64, h: 119.84 },
  pad: { top: 56, bottom: 0, left: 14.5 },
  eyebrow: "Connecting Asia Pacific’s fresh food future",
  eyebrowMb: [16, 19], eyebrowMl: 2.5,
  title: "Be part of a stronger, <br>more connected fresh food future.",
  titleMax: 751, titleMl: 5,
  lead: "Fresh Food Expo APAC begins in Singapore in 2027 with a long-term ambition to build a leading regional platform connecting the businesses, technologies and markets shaping the fresh food future across Asia Pacific.",
  leadMt: 27.21, leadMl: 1, leadMax: 679,
  date: DATE,
  dateMt: [25, 34, 25.83], dateMl: 0,
  ctas: { mt: [23, 25], ml: 0 },
})];
