const fs = require("fs"), path = require("path");
// messe/icon-external.svg as a data URI (18px "opens in a new tab" icon after the two MoreInfo links); no upload needed.
const EXT = "data:image/svg+xml," + encodeURIComponent(fs.readFileSync(path.join(__dirname, "../../../../src/assets/messe/icon-external.svg"), "utf8"));
const MORE = '[data-id="mb-ma-more"], [data-id="mb-mbl-more"]';
const LINKS = 'body .elementor :is([data-id="mb-ma-p2"], [data-id="mb-mbl-p"], [data-id="mb-ma-more"], [data-id="mb-mbl-more"]) a';
module.exports = {
  slug: "messe-berlin", parent: null, title: "Messe Berlin", prefix: "mb",
  footer: [30, 48, 48],
  css: [
    // The reference's <main className="overflow-x-clip"> hides the Messe curve that runs past the right edge on phones.
    'body .elementor [data-id="mb-mbl"] { overflow-x: clip; }',
    // Sections.tsx LINK: font-semibold text-accent underline decoration-from-font underline-offset-2 transition-colors hover:text-forest.
    `${LINKS} { color: #28ae3d; font-weight: 600; text-decoration: underline; text-decoration-thickness: from-font; text-underline-offset: 2px; transition: color 250ms cubic-bezier(0.22, 1, 0.36, 1); }`,
    `${LINKS}:hover { color: #025d03; }`,
    // MoreInfo <a className="group inline-flex items-center gap-[8px]"> + 18px external icon that nudges (2px, -2px) on hover.
    `body .elementor :is(${MORE}) a { display: inline-flex; align-items: center; gap: 8px; }`,
    `body .elementor :is(${MORE}) a::after { content: ""; flex-shrink: 0; width: 18px; height: 18px; background: url("${EXT}") center / 18px 18px no-repeat; transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1); }`,
    `@media (hover: hover) { body .elementor :is(${MORE}) a:hover::after { transform: translate(2px, -2px); } }`,
    // Portfolio list: min-[1370px]:gap-[50px]! (laptop variant is 40; desktop 50).
    '@media (min-width: 1370px) and (max-width: 1439px) { body .elementor [data-id="mb-pf-list"] { column-gap: 50px; } }',
  ],
  sections: ["messe-asia", "portfolio", "messe-berlin", "trade-shows", "join-banner"],
};
