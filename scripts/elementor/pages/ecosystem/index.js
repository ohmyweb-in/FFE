module.exports = {
  slug: "ecosystem", parent: null, title: "Fresh Food Ecosystem", prefix: "es",
  footer: [67, 48, 48],
  css: [
    // ring.svg's 5% drop shadow (dy 4, blur 2): the e-svg sanitizer drops <filter> primitives, so the file carries none.
    'body .elementor :is([data-id="es-op-c1-ring"],[data-id="es-op-c2-ring"],[data-id="es-op-c3-ring"]) { filter: drop-shadow(0 4px 4px rgb(0 0 0 / 0.05)); }',
    // Sectors article + Connects step pill: drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)] (filter, not in the atomic schema as a drop-shadow).
    'body .elementor :is([data-id="es-sec-c1-card"],[data-id="es-sec-c2-card"],[data-id="es-sec-c3-card"],[data-id="es-cn-s1"],[data-id="es-cn-s2"],[data-id="es-cn-s3"],[data-id="es-cn-s4"],[data-id="es-cn-s5"]) { filter: drop-shadow(0 12px 16px rgb(3 41 26 / 0.1)); }',
    // Connects p1: <b className="font-semibold">; Intro p1: <b className="font-bold">.
    'body .elementor [data-id="es-cn-p1"] b { font-weight: 600; } body .elementor [data-id="es-in-p1"] b { font-weight: 700; }',
  ],
  sections: ["hero", "intro", "one-platform", "sectors", "connects", "who-for", "join-banner"],
};
