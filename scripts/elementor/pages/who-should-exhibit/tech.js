const { sectorCard } = require("../g2-shared.js");

module.exports = [
  sectorCard("se", 2, {
    flip: true, title: "Agri &amp; Fresh Technology",
    lead: "For companies providing technologies and solutions that help maintain quality, extend shelf life and reduce losses.", icon: "g2-who-t-gear",
    tiles: "stack", tileH: 123,
    items: [
      { label: "Agricultural<br>Technologies", icon: "g2-who-t-thermo", iconSize: 30 },
      { label: "Cooling &amp;<br>Refrigeration", icon: "g2-who-t-snow", iconSize: 30 },
      { label: "Preservation &amp;<br>Storage", icon: "g2-who-t-box", iconSize: 30 },
      { label: "Packaging", icon: "g2-who-t-warehouse", iconSize: 26 },
      { label: "Freshness-<br>Extension<br>Solutions", icon: "g2-who-t-leaf", iconSize: 30 },
    ],
    text: "Showcase solutions to businesses looking to improve how fresh food is handled, protected and prepared for the market.",
    img: "g2-who-tech", pos: "center top", // + page CSS sc2Scale (scale 1.14 from the top centre)
  }),
];
