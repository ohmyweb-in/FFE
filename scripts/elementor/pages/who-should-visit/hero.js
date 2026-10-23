// Who Should Visit hero (PageHero size why + HeroVenue + HeroCtas).
const { pad, pageHero, heroVenue, heroCtas } = require("../../lib.js");

module.exports = [
  pageHero("sv", {
    size: "why", title: "Who Should Visit", img: "ph-visit",
    imgBox: { top: -73.02, left: 18.76, w: 81.25, h: 201.76 }, curveLeft: 3.89,
    cta: [heroVenue("sv-ph"), heroCtas("sv-ph", { stayHref: "/subscribe", styles: [{ margin: pad(29, 0, 0, 0) }, { mobile: { margin: pad(24, 0, 0, 0) } }] })],
  }),
];
