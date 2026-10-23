const { globalExpertise } = require("../g1-shared.js");
const { count } = require("../../lib.js");

module.exports = [globalExpertise("au-gw", {
  title: "GRÜNE WOCHE",
  copy: [
    "Fresh Food Expo APAC draws on the international food and agriculture expertise behind GRÜNE WOCHE in Berlin, one of the world’s leading exhibitions for food, agriculture and horticulture, with a legacy spanning 100 years.",
    "Bringing together producers, industry leaders, policymakers and international stakeholders, GRÜNE WOCHE provides a global platform for agricultural innovation, sustainability and industry dialogue, reflecting Messe Berlin’s longstanding expertise in connecting the food and agriculture ecosystem.",
  ],
  note: "*Figures below refer to GRÜNE WOCHE in Berlin and not to Fresh Food Expo APAC.",
  stats: [
    ["Exhibitors", "1,600+", count(1600, { suffix: "+", group: true })],
    ["Trade visitors", "350,000+", count(350000, { suffix: "+", group: true })],
    ["Forums, seminars,<br>conferences", "300+", count(300, { suffix: "+" })],
    ["Organised by<br>Messe Berlin", "Since 1926", null],
  ],
  photo: "g1-gw-photo",
  logo: false,
  flip: true,
  mt: [46, 46, 46],
})];
