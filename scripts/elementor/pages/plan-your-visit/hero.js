const { pageHero, heroVenue, heroCtas, pad, P0 } = require("../../lib.js");
module.exports = [pageHero("pv", {
  size: "plan", title: "Plan Your Visit",
  desc: "Make the most of your time at Fresh Food Expo Asia Pacific (FFE&nbsp;APAC).",
  img: "ph-plan", imgBox: { top: -43.35, left: 35.16, w: 64.85, h: 200.74 }, curveLeft: 3.88,
  cta: [
    heroVenue("pv-ph", [{ margin: P0 }, {}]),
    heroCtas("pv-ph", { stayHref: "/subscribe",
      styles: [{ margin: pad(29, 0, 0, -4) }, { tablet: { margin: pad(29, 0, 0, 0) }, mobile: { margin: pad(24, 0, 0, 0) } }] }),
  ],
})];
