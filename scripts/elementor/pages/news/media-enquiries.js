// MediaEnquiries (news/MediaEnquiries.tsx). The section root carries the reveal.
// make(p, width, outer) is reused by register-to-visit (ids <p>-media*; the page needs the N1/N2 page CSS for its ids).
const { T, px, pct, pad, P0, mtAuto, radius, flex, gap, box, div, w, attrs, media, text, mix, reveal, image } = require("../../lib.js");
const { CW } = require("../g4-shared.js");
const M = media();

const make = (p, width, outer) => [div(`${p}-media`, mix(CW(width), outer), [
  box(`${p}-media-bar`, [
    {
      padding: pad(29, 32, 29, 38), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 20), "border-radius": { "start-start": px(22), "start-end": px(22), "end-start": px(0), "end-end": px(22) },
      background: { color: T.mint }, width: pct(100),
    },
    { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 16), padding: pad(20) } },
  ], [
    box(`${p}-media-ic`, [
      { width: px(76), height: px(76), "min-width": px(76), padding: P0, "border-radius": radius(999), background: { color: T.white }, display: "flex", "justify-content": "center", "align-items": "center", flex: flex(0, 0, { size: "", unit: "auto" }) },
      { mobile: { width: px(56), height: px(56), "min-width": px(56) } },
    ], [
      w(`${p}-media-icon`, "e-image", { image: image(M["g4-point-2"].id) }, [{ width: px(31), height: px(31) }, { mobile: { width: px(24), height: px(24) } }]),
    ], { attributes: attrs([["aria-hidden", "true"]]) }),
    w(`${p}-media-p`, "e-paragraph", {
      paragraph: 'Fresh Food Expo APAC Media Enquiries<br>For press accreditation, media partnerships or enquiries, please contact <a href="mailto:media@freshfoodexpoapac.com">media@freshfoodexpoapac.com</a>',
    }, [
      { ...text(15, 500, T.body, { "line-height": px(23) }), "border-width": pad(0, 0, 0, 5), "border-style": "solid", "border-color": T.accent, padding: pad(5, 0, 5, 11), margin: P0, "min-width": px(0) }, {},
    ]),
  ]),
], { tag: "section", attributes: attrs(reveal(0)) })];

// News: mt-[24px] lg:mt-[37px] lg:mb-[3px], 1290 wide.
module.exports = make("nw", 1290, [
  { padding: P0, margin: { ...mtAuto(37), "block-end": px(3) }, display: "block" },
  { tablet: { margin: mtAuto(24) } },
]);
module.exports.make = make;

// MEDIA_CSS(p): the N1/N2 page CSS for a page that uses make(p, …).
module.exports.MEDIA_CSS = (p) => [
  "/* N1 MediaEnquiries bar sm:flex-row sm:items-center (640–767) */",
  `@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id="${p}-media-bar"] { flex-direction: row; align-items: center; } }`,
  "/* N2 MediaEnquiries mailto: text-accent underline underline-offset-2 [overflow-wrap:anywhere] hover:text-forest */",
  `body .elementor [data-id="${p}-media-p"] a { color: #28ae3d; text-decoration: underline; text-underline-offset: 2px; overflow-wrap: anywhere; transition: color 250ms cubic-bezier(.22,1,.36,1); }`,
  `body .elementor [data-id="${p}-media-p"] a:hover { color: #025d03; }`,
];
