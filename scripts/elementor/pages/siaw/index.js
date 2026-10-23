module.exports = {
  slug: "siaw", parent: null, title: "SIAW", prefix: "si",
  footer: [65, 48, 48],
  css: [
    // ring.svg's 5% drop shadow (dy 4, blur 2): the e-svg sanitizer drops <filter> primitives, so the file carries none.
    'body .elementor :is([data-id="si-or-c1-ring"],[data-id="si-or-c2-ring"],[data-id="si-or-c3-ring"]) { filter: drop-shadow(0 4px 4px rgb(0 0 0 / 0.05)); }',
    // Hero phone pill (page.tsx MOB): max-md:text-balance (leading-22 is in the pill's styles).
    '@media (max-width: 767px) { body .elementor [data-id="si-ph-pill-t"] { text-wrap: balance; } }',
    // Hero phone pill: max-[389px]:px-[16px]! max-[389px]:text-[15px]! (Tailwind v4 max-[389px] is width < 389px).
    '@media (max-width: 388.98px) { body .elementor [data-id="si-ph-pill"] { padding-left: 16px; padding-right: 16px; } body .elementor :is([data-id="si-ph-pill"], [data-id="si-ph-pill-t"]) { font-size: 15px; } }',
  ],
  sections: ["hero", "bigger-picture", "our-role", "broader-impact", "join-banner"],
};
