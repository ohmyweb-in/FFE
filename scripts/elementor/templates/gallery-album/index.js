// Theme Builder template "Single: Album" (G8, gallery/[slug]/page.tsx): how every album (Albums > Add New) looks. Pushed by
// `node scripts/elementor/template.js gallery-album`. Hero with the album's title and Excerpt, the photos of its Gallery block as the
// tile grid ([ffe_album_photos], ffe-content.php) with the lightbox and "Download full resolution", and the editorial-use note.
const A = "body .elementor .ffe-alb";
module.exports = {
  key: "gallery-album", title: "Single: Album", type: "single-post",
  conditions: [{ type: "include", name: "singular", sub_name: "ffe_album" }],
  prefix: "ga", footer: [64, 48, 48],
  css: [
    "/* Hero title: the album page broke it after \"Launch\" with <br>; a dynamic title wraps in the text column instead, balanced. */",
    'body .elementor [data-id="ga-ph-title"] { max-width: 640px; text-wrap: balance; }',
    'body .elementor [data-id="ga-ph-desc"]:empty { display: none; } /* an album without an Excerpt */',
    "/* Album note: text-accent underline links, hover forest */",
    'body .elementor [data-id="ga-note"] a { color: #28ae3d; text-decoration: underline; text-underline-offset: 2px; overflow-wrap: anywhere; }',
    'body .elementor [data-id="ga-note"] a:hover { color: #025d03; }',
    "/* Photo grid (GalleryGrid.tsx, as g8-shared.js grid()): 4 columns 26x15, tablet 2 columns 20x20, phone 12x20; 298.85x224.14 accent tile. */",
    `${A} { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px 26px; width: min(1286px, 100% - 64px); margin: 63px auto 0; padding: 0 6px; box-sizing: border-box; }`,
    `${A}-t { display: flex; flex-direction: column; min-width: 0; text-decoration: none; }`,
    `${A}-f { position: relative; display: block; overflow: hidden; aspect-ratio: 298.85 / 224.14; border-radius: 20px; background: #28ae3d; }`,
    `${A}-f img { position: absolute; top: 0; left: 0; width: 100%; height: 98.9%; max-width: none; object-fit: cover; }`,
    `@media (max-width: 1024px) { ${A} { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 40px; padding: 0; } ${A}-f { border-radius: 14px; } }`,
    `@media (max-width: 767px) { ${A} { gap: 20px 12px; width: min(1286px, 100% - 52px); } }`,
  ],
  sections: ["hero", "photos"],
};
