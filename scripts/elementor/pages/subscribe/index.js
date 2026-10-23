module.exports = {
  slug: "subscribe", parent: null, title: "Subscribe", prefix: "sb",
  footer: [84, 48, 48],
  css: [
    "/* S1 SubscribeSection benefits ul sm:grid-cols-4 (640–767) */",
    '@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id="sb-benefits"] { grid-template-columns: repeat(4, minmax(0, 1fr)); } }',
    "/* S2 SubscribeForm leaf hidden sm:block (640–767) */",
    '@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id="sb-leaf"] { display: flex; } }',
  ],
  sections: ["hero", "subscribe"],
};
