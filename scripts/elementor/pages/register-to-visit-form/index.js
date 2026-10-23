// /register-to-visit/form (G5): PageHero size apply · page.tsx section.untrim > register/VisitorForm.tsx (+ CountrySelect.tsx).
const RF_CSS = [
  '/* VisitorForm h2 > span.ml-[16px] inline-block h-[2px] w-[36px] rounded-[1px] bg-accent align-middle (rule follows the last word) */',
  'body .elementor [data-id="rf-h2"]::after { content: ""; display: inline-block; width: 36px; height: 2px; margin-left: 16px; border-radius: 1px; background: #28ae3d; vertical-align: middle; }',
  '/* VisitorForm Options ul: gap-x-[24px] sm:columns-2 xl:columns-3; li break-inside-avoid */',
  '@media (min-width: 640px) { body .elementor [data-g5-cols] { columns: 2; column-gap: 24px; } }',
  '@media (min-width: 1280px) { body .elementor [data-g5-cols] { columns: 3; } }',
  'body .elementor [data-g5-cols] > * { break-inside: avoid; }',
  '/* VisitorForm Other input: md:max-w-[calc(50%-12px)] */',
  '@media (min-width: 768px) { body .elementor #activityOtherText { max-width: calc(50% - 12px); } }',
  '/* Consent link: a.[overflow-wrap:anywhere] text-accent underline decoration-from-font underline-offset-2 hover:text-forest */',
  'body .elementor [data-id="rf-c-termsconsent-p"] a { color: #28ae3d; overflow-wrap: anywhere; text-decoration: underline; text-decoration-thickness: from-font; text-underline-offset: 2px; transition: color 250ms cubic-bezier(.22,1,.36,1); }',
  'body .elementor [data-id="rf-c-termsconsent-p"] a:hover { color: #025d03; }',
  '/* Success panel: strong.font-semibold.text-forest */',
  'body .elementor [data-id^="rf-ok"] strong { font-weight: 600; color: #025d03; }',
];
module.exports = {
  slug: "form", parent: "register-to-visit", title: "Visitor Registration", prefix: "rf",
  footer: [112, 64, 64],
  css: RF_CSS,
  sections: ["hero", "form"],
};
