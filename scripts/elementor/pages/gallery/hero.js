const { pageHero } = require("../../lib.js");
module.exports = [pageHero("gl", {
  size: "gallery", title: "Gallery",
  desc: "Please note that these photos are intended solely for editorial use.",
  img: "hero", imgBox: { top: 0, left: 16.31, w: 83.72 }, curveLeft: 3.89, stayHref: "/subscribe",
})];
