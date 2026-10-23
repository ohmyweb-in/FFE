const { sectorCard } = require("../g2-shared.js");

module.exports = [
  sectorCard("se", 1, {
    title: "Fresh Food", lead: "For growers, producers, exporters and suppliers of:", icon: "g2-who-f-basket",
    tiles: "row", tileH: 62,
    items: [
      { label: "Fruit &amp; <br>Vegetables", icon: "g2-who-f-apple", iconSize: 26 },
      { label: "Meat &amp; <br>Poultry", icon: "g2-who-f-meat", iconSize: 26 },
      { label: "Seafood", icon: "g2-who-f-fish", iconSize: 26 },
      { label: "Eggs &amp; <br>Dairy", icon: "g2-who-f-milk", iconSize: 26 },
    ],
    text: "Connect with importers, distributors, retailers, wholesalers, foodservice operators and sourcing professionals looking for new products and suppliers.",
    img: "g2-card-fresh", pos: "50% 22.9%",
  }),
];
