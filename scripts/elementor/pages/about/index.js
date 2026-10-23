// Page manifest for /about/ (Build G1). Page CSS lines port the reference's Tailwind-only rules (spec A-CSS).
const ABOUT_CSS = [
  "/* 1  WhyDifferent .points (globals.css .points .pt-desc): desktop + mouse fold the descriptions; hover/focus opens them. Reference uses min-width 1024; 1025 keeps it with Elementor's X layout. */",
  "@media (hover: hover) and (min-width: 1025px) { body .elementor [data-pt-desc] { grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 700ms cubic-bezier(.22,1,.36,1), opacity 700ms cubic-bezier(.22,1,.36,1); } body .elementor [data-id=\"au-wd-points\"]:is(:hover, :focus-within) [data-pt-desc] { grid-template-rows: 1fr; opacity: 1; } }",
  "/* 2  .points li:hover .pt-icon lift */",
  "@media (prefers-reduced-motion: no-preference) and (hover: hover) { body .elementor [data-pt-ic] { transition: transform 250ms cubic-bezier(.22,1,.36,1); } body .elementor [data-pt]:hover [data-pt-ic] { transform: translateY(-3px); } }",
  "/* 3  AboutSiaw MOB: max-md:text-balance on the long pill */",
  "@media (max-width: 767px) { body .elementor [data-id=\"au-sv-pill-t\"] { text-wrap: balance; } }",
  "/* 4  AboutSiaw lg:max-xl:h-auto/min-h-[52px]/py-[12px]/whitespace-normal */",
  "@media (min-width: 1025px) and (max-width: 1279px) { body .elementor [data-id=\"au-sv-pill\"] { height: auto; min-height: 52px; padding-top: 12px; padding-bottom: 12px; } body .elementor [data-id=\"au-sv-pill-t\"] { white-space: normal; } }",
  "/* 5  EventIntro <b className=\"font-semibold\"> */",
  "body .elementor [data-id^=\"au-ei-c\"] b { font-weight: 600; }",
  "/* 6  SourceToMarket lg:[zoom:0.9487] around PillarRow */",
  "@media (min-width: 1025px) { body .elementor [data-id=\"au-stm-zoom\"] { zoom: 0.9487; } }",
  "/* 7  BackedBy min-[1344px]:w-[636px] min-[1344px]:max-w-none */",
  "@media (min-width: 1344px) { body .elementor [data-id=\"au-bb-title\"] { width: 636px; max-width: none; } }",
  "/* 8  BePartOf sm:flex-row sm:items-start sm:gap-[14px] */",
  "@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id=\"au-bp-ctas\"] { flex-direction: row; align-items: flex-start; gap: 14px; } }",
  "/* 10 CommunityForm Privacy Policy link: text-accent underline underline-offset-2 hover:text-forest */",
  "body .elementor [data-id=\"au-cm-note1\"] a { color: #28ae3d; text-decoration: underline; text-underline-offset: 2px; transition: color 250ms cubic-bezier(.22,1,.36,1); } body .elementor [data-id=\"au-cm-note1\"] a:hover { color: #025d03; }",
  "/* 11 CommunityForm country chevron right-[14px] (select() base = 16) */",
  "body .elementor [data-id=\"au-cm-f6\"] [data-noevents] { inset-inline-end: 14px; }",
  "/* 12 CommunityForm checkbox mt-px */",
  "body .elementor [data-id=\"au-cm-consent\"] [data-ffe-check] { margin-top: 1px; }"
];

module.exports = {
  slug: "about", parent: null, title: "About", prefix: "au",
  footer: [56, 56, 56],
  css: ABOUT_CSS,
  sections: ["hero", "event-intro", "siaw", "why-different", "source-to-market", "fruit-logistica", "gruene-woche", "who-for", "backed-by", "be-part-of", "community"],
};
