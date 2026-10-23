const { sectorCard } = require("../g2-shared.js");

module.exports = [
  sectorCard("se", 3, {
    title: "Logistics &amp; Distribution",
    lead: "For companies providing the infrastructure, services and technologies that move fresh food safely and efficiently.", icon: "g2-who-l-truck",
    tiles: "row", tileH: 79,
    items: [
      { label: "Transportation <br>– Air, Sea, Land <br>&amp; Rail", icon: "g2-who-l-plane", iconSize: 26 },
      { label: "Cold Chain", icon: "g2-who-l-snow", iconSize: 26 },
      { label: "Warehousing", icon: "g2-who-t-warehouse", iconSize: 26 },
      { label: "Supply Chain <br>Solutions", icon: "g2-who-l-network", iconSize: 26 },
    ],
    text: "Connect with fresh food suppliers, distributors and buyers looking for reliable logistics and supply chain partners.",
    img: "g2-eco-logistics", pos: "50% 41%",
  }),
];
