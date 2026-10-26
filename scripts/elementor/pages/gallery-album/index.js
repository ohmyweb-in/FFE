// /gallery/partner-event-launch-signing-ceremony (G8): gallery/[slug]/page.tsx for the one album. A second album = a copy of this folder.
const { ALBUMS } = require("../g8-shared.js");
module.exports = {
  slug: ALBUMS[0].slug, parent: "gallery", title: ALBUMS[0].title, prefix: "ga", footer: [64, 48, 48],
  css: [
    "/* Album note: text-accent underline links, hover forest */",
    'body .elementor [data-id="ga-note"] a { color: #28ae3d; text-decoration: underline; text-underline-offset: 2px; overflow-wrap: anywhere; }',
    'body .elementor [data-id="ga-note"] a:hover { color: #025d03; }',
  ],
  sections: ["hero", "photos"],
};
