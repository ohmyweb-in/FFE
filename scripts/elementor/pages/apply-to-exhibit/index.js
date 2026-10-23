// /apply-to-exhibit (G5): PageHero applyLong · intro (page.tsx) · apply/Enquiry.tsx + ApplyForm.tsx.
const AX_CSS = [
  '/* page.tsx intro: strong.font-semibold */',
  'body .elementor [data-id="ax-intro-p2"] strong { font-weight: 600; }',
  '/* ApplyForm activity ul: gap-x-[24px] sm:columns-2 lg:max-xl:columns-1 3xl:columns-1; li break-inside-avoid */',
  '@media (min-width: 640px) { body .elementor [data-g5-cols] { columns: 2; column-gap: 24px; } }',
  '@media (min-width: 1025px) and (max-width: 1279px), (min-width: 1440px) { body .elementor [data-g5-cols] { columns: auto; } }',
  'body .elementor [data-g5-cols] > * { break-inside: avoid; }',
  '/* Enquiry Why Exhibit li.group: group-hover:-translate-y-[3px] on the 68px circle */',
  '@media (hover: hover) { body .elementor [data-g5-lift]:hover [data-g5-lift-t] { transform: translateY(-3px); } }',
  '/* Event Details mail a: hover:text-accent; span [overflow-wrap:anywhere]; max-[389px]:gap-[8px], max-[389px]:text-[14px]! */',
  'body .elementor [data-id="ax-mail"]:hover [data-id="ax-mail-t"] { color: #28ae3d; }',
  'body .elementor [data-id="ax-mail-t"] { overflow-wrap: anywhere; }',
  '@media (width < 389px) { body .elementor [data-id="ax-mail"] { gap: 8px; } body .elementor [data-id="ax-mail-t"] { font-size: 14px; } }',
];
module.exports = {
  slug: "apply-to-exhibit", parent: null, title: "Apply to Exhibit", prefix: "ax",
  footer: [112, 64, 64],
  css: AX_CSS,
  sections: ["hero", "intro", "enquiry"],
};
