// page.tsx: div.mt-[32px].flex.justify-center.px-(--gutter) > Pill.
const { T, pct, pad, box, attrs, mix, reveal, pill } = require("../../lib.js");

module.exports = [
  box("rv-cta", [
    { width: pct(100), margin: pad(32, 0, 0, 0), padding: pad(0, 32, 0, 32), display: "flex", "flex-direction": "row", "justify-content": "center" },
    { mobile: { padding: pad(0, 26, 0, 26) } },
  ], [pill("rv-cta-pill", "Register Your Interest", "/register-to-visit/form", { bg: T.brand, color: T.white })], { attributes: attrs(reveal(0)) }),
];
