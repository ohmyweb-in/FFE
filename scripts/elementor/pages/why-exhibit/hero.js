// Why Exhibit hero (PageHero size exhibit + HeroVenue + HeroCtas).
const { pad, pageHero, heroVenue, heroCtas } = require("../../lib.js");

module.exports = [
  pageHero("we", {
    size: "exhibit", title: "Why Exhibit",
    desc: "Put your business in front of the buyers, partners and decision-makers shaping Asia Pacific’s fresh food ecosystem.",
    img: "ph-exhibit", imgBox: { top: -60.26, left: 16.63, w: 109.89, h: 226.9 }, curveLeft: 4.37,
    cta: [
      heroVenue("we-ph"),
      heroCtas("we-ph", { stayHref: "/subscribe", styles: [{ margin: pad(29, 0, 0, 0) }, { mobile: { margin: pad(24, 0, 0, 0) } }] }),
    ],
  }),
];
