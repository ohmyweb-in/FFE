const { pageHero, DATE_LONG } = require("../../lib.js");
module.exports = [pageHero("sb", {
  size: "tall", eyebrow: "Stay connected",
  title: "Join the Fresh Food Expo <br>Asia Pacific <span>(FFE APAC)</span> community",
  titleAttrs: [["data-nowrap-lg", ""], ["data-nowrap-span", ""]],
  desc: "Subscribe to stay connected",
  img: "ph-subscribe", imgBox: { top: -21.54, left: 36.67, w: 63.35, h: 143.09 },
  date: DATE_LONG,
})];
