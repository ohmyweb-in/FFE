// The /gallery hero photo (an album cover would put faces under the title), with the album's title and Excerpt (dynamic tags).
const { pageHero } = require("../../lib.js");
const dyn = (name) => ({ $$type: "dynamic", value: { name, group: "post", settings: [] } });
const hero = pageHero("ga", {
  size: "gallery", title: "Album title", desc: "Album summary",
  img: "hero", imgBox: { top: 0, left: 16.31, w: 83.72 }, curveLeft: 3.89, curveLaptopHide: true,
});
let found = 0;
(function walk(nodes) {
  for (const n of nodes) {
    if (n.widgetType === "e-heading" && n.id.endsWith("-title")) { n.settings.title = dyn("post-title"); found++; }
    if (n.widgetType === "e-paragraph" && n.id.endsWith("-desc")) { n.settings.paragraph = dyn("post-excerpt"); found++; }
    walk(n.elements || []);
  }
})([hero]);
if (found !== 2) throw new Error(`gallery-album hero: expected the title and desc widgets, found ${found}`);
module.exports = [hero];
