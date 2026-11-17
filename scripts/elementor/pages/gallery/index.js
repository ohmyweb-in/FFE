// /gallery (G8): gallery/page.tsx. PageHero size gallery · album tiles · JoinBanner (as Who Should Exhibit).
module.exports = {
  slug: "gallery", parent: null, title: "Gallery", prefix: "gl", footer: [64, 48, 48],
  // The Loop's layout makes every row as tall as the tallest (1fr): rows size to their tiles instead.
  css: ["body .elementor .s-gl-loop-grid { grid-auto-rows: auto; }"],
  sections: ["hero", "albums", "join-banner"],
};
