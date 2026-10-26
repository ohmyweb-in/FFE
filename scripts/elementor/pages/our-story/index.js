// Page manifest for /our-story/ (Build G1). Page CSS lines port the reference's Tailwind-only rules (spec S-CSS).
const STORY_CSS = [
  "/* 1  WhyNow sm:flex-row sm:items-start sm:gap-[22px] + leaf sm:block */",
  "@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id=\"os-wn-f1-row\"], body .elementor [data-id=\"os-wn-f2-row\"] { flex-direction: row; align-items: flex-start; gap: 22px; } body .elementor [data-id=\"os-wn-leaf\"] { display: flex; } }",
  "/* 2  WhyNow source xl:whitespace-nowrap */",
  "@media (min-width: 1280px) { body .elementor [data-id=\"os-wn-f1-src\"], body .elementor [data-id=\"os-wn-f2-src\"] { white-space: nowrap; } }",
  "/* 3  WhyNow <b className=\"font-semibold text-black\"> and the callout's two <b> (accent, then inherit) */",
  "body .elementor [data-id=\"os-wn-f1-text\"] b { font-weight: 600; color: #000; } body .elementor [data-id=\"os-wn-callout-t\"] b { font-weight: 600; } body .elementor [data-id=\"os-wn-callout-t\"] b:first-of-type { color: #28ae3d; }",
  "/* 4a phones: BuiltForApac CTA pills and the closing banner eyebrow may wrap (no fixed height/width, the rule drops below the text when they do not fit one line) */",
  "@media (max-width: 767px) { body .elementor [data-id^=\"os-ba-i\"][data-id$=\"-cta\"] { height: auto; min-height: 40px; width: auto; max-width: 100%; padding-top: 8px; padding-bottom: 8px; padding-right: 18px; } body .elementor [data-id^=\"os-ba-i\"][data-id$=\"-cta-t\"] { white-space: normal; text-align: left; } body .elementor [data-id=\"os-jb-eyebrow\"] { flex-wrap: wrap; row-gap: 10px; } }",
  "/* 4  BuiltForApac accordion: list-none, marker hidden, group-open:text-accent / hover:text-accent, group-open:rotate-180, fade-up 300ms */",
  "body .elementor [data-id=\"os-ba-acc\"] summary { list-style: none; } body .elementor [data-id=\"os-ba-acc\"] summary::-webkit-details-marker { display: none; }",
  "body .elementor [data-acc-t] { transition: color 250ms cubic-bezier(.22,1,.36,1); } body .elementor details[open] > summary [data-acc-t], body .elementor [data-acc-t]:hover { color: #28ae3d; }",
  "@keyframes os-acc-in { from { opacity: 0; transform: translate3d(0, 8px, 0); } }",
  "@media (prefers-reduced-motion: no-preference) { body .elementor [data-id=\"os-ba-acc\"] details[open] > summary + * { animation: os-acc-in 300ms cubic-bezier(.22,1,.36,1) both; } }"
];

module.exports = {
  slug: "our-story", parent: null, title: "Our Story", prefix: "os",
  footer: [80, 48, 48],
  css: STORY_CSS,
  sections: ["hero", "intro", "why-now", "value-chain", "built-for-apac", "join-banner"],
};
