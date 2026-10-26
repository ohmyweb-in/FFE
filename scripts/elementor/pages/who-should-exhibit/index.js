const { CSS } = require("../g2-shared.js");
module.exports = {
  slug: "who-should-exhibit", parent: null, title: "Who Should Exhibit", prefix: "se",
  footer: [64, 48, 48],
  css: [CSS.brSm, CSS.hyphens, CSS.sc, CSS.sc2Scale,
    '/* SectorCard row tiles: 2 columns at md (768-1024) so labels do not wrap in 80px chips; mirrors md:grid-cols-2 */',
    '@media (min-width: 768px) and (max-width: 1024px) { body .elementor [data-sc="tiles-row"] { grid-template-columns: repeat(2, minmax(0, 1fr)); } }'],
  sections: ["hero", "intro", "fresh", "tech", "logistics", "join-banner"],
};
