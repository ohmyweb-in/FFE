const { globalExpertise } = require("../g1-shared.js");
const { count } = require("../../lib.js");

module.exports = [globalExpertise("au-fl", {
  title: "FRUIT LOGISTICA",
  copy: [
    "Fresh Food Expo APAC draws on the international fresh produce expertise behind FRUIT LOGISTICA in Berlin, the leading trade show for the global fresh produce business.",
    "Bringing together the international fresh produce industry across the entire value chain, FRUIT LOGISTICA demonstrates the global reach, industry connections and trade fair expertise that Messe Berlin has built over decades.",
  ],
  note: "*Figures below refer to FRUIT LOGISTICA in Berlin and not to Fresh Food Expo APAC.",
  stats: [
    ["Exhibitors", "2,500+", count(2500, { suffix: "+", group: true })],
    ["Trade visitors", "90,000+", count(90000, { suffix: "+", group: true })],
    ["Countries<br>represented", "150+", count(150, { suffix: "+" })],
    ["Organised by<br>Messe Berlin", "Since 1993", null],
  ],
  photo: "g1-fl-photo",
  logo: true,
  flip: false,
  mt: [46, 46, 74],
})];
