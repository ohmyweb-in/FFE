// Who Should Exhibit hero (PageHero size why + HeroVenue + HeroCtas).
const { pad, pageHero, heroVenue, heroCtas } = require("../../lib.js");

module.exports = [
  pageHero("se", {
    size: "why", title: "Who Should Exhibit", img: "ph-who",
    imgBox: { top: -54.32, left: 16.31, w: 83.72, h: 208.36 }, curveLeft: 3.89,
    cta: [heroVenue("se-ph"), heroCtas("se-ph", { stayHref: "/subscribe", styles: [{ margin: pad(29, 0, 0, 0) }, { mobile: { margin: pad(24, 0, 0, 0) } }] })],
  }),
];
