// /register-to-visit (G5): PageHero size register (+ cta) · register/Sections.tsx StayUpToDate · news/MediaEnquiries · page.tsx Pill row.
const RV_CSS = [
  '/* StayUpToDate ul: sm:grid-cols-2 (640–767) */',
  '@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id="rv-stay-grid"] { grid-template-columns: repeat(2, minmax(0, 1fr)); } }',
  '/* StayUpToDate 2-col (640–1024): 5th item spans both columns; leaf hidden below 1280 so it never runs under text */',
  '@media (min-width: 640px) and (max-width: 1024px) { body .elementor [data-id="rv-stay-b5"] { grid-column: 1 / -1; } }',
  '@media (max-width: 1279px) { body .elementor [data-id="rv-stay-leaf"] { display: none; } }',
  '/* StayUpToDate Lines: <br className="max-xl:hidden"> */',
  '@media (max-width: 1279px) { body .elementor [data-br-xl] br { display: none; } }',
  '/* StayUpToDate li.group: group-hover:-translate-y-[3px] on the 56px circle */',
  '@media (hover: hover) { body .elementor [data-g5-lift]:hover [data-g5-lift-t] { transform: translateY(-3px); } }',
];
module.exports = {
  slug: "register-to-visit", parent: null, title: "Register to Visit", prefix: "rv",
  footer: [78, 48, 48],
  css: [...RV_CSS, ...require("../news/media-enquiries.js").MEDIA_CSS("rv")],
  sections: ["hero", "stay", "media", "cta"],
};
