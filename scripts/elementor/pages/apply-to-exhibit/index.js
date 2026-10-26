// /apply-to-exhibit (G5): PageHero applyLong · intro (page.tsx) · apply/Enquiry.tsx + ApplyForm.tsx.
const AX_CSS = [
  '/* page.tsx intro: strong.font-semibold */',
  'body .elementor [data-id="ax-intro-p2"] strong { font-weight: 600; }',
  '/* ApplyForm activity ul: two-column GRID (rows line up) from sm, except where the three lists sit side by side (1025-1279, 1440+) */',
  '@media (min-width: 640px) and (max-width: 1024px), (min-width: 1280px) and (max-width: 1439px) { body .elementor [data-g5-cols] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 24px; row-gap: 14px; } body .elementor [data-g5-cols] > * { margin: 0; } }',
  '/* 320px: card padding 16 and page gutter 16, so fields and the Turnstile box have room */',
  '@media (max-width: 359px) { body .elementor [data-id="ax-enq"] { width: min(1360px, 100% - 32px); } body .elementor [data-id="ax-card"] { padding-left: 16px; padding-right: 16px; } }',
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
