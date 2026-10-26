// Same hero photo as /gallery (an album cover would put faces under the title); the title breaks after "Launch" at lg+.
const { pageHero } = require("../../lib.js");
const { ALBUMS } = require("../g8-shared.js");
module.exports = [pageHero("ga", {
  size: "gallery", title: "Partner Event Launch <br>Signing Ceremony", desc: ALBUMS[0].desc,
  img: "hero", imgBox: { top: 0, left: 16.31, w: 83.72 }, curveLeft: 3.89,
})];
