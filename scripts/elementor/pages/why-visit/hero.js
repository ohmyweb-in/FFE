// Why Visit hero (PageHero size why + HeroVenue + HeroCtas).
const { pad, pageHero, heroVenue, heroCtas } = require("../../lib.js");

module.exports = [
  pageHero("wv", {
    size: "why", title: "Why Visit", img: "ph-about",
    imgBox: { top: -31.52, left: 17.42, w: 82.6, h: 207.73 }, curveLeft: 3.89,
    cta: [heroVenue("wv-ph"), heroCtas("wv-ph", { stayHref: "/subscribe", styles: [{ margin: pad(29, 0, 0, 0) }, { mobile: { margin: pad(24, 0, 0, 0) } }] })],
  }),
];
