// G4-internal style helpers (contact, subscribe, news, plan-your-visit).
const { T, FREDOKA, px, custom, P0, ease, lift, shadow, text, gap } = require("../lib.js");
// w-[min(Npx,100%-2*var(--gutter))] / container-narrow: gutter 32 at md+, 26 on phones. Callers add margin mtAuto(…).
const CW = (n) => [{ width: custom(`min(${n}px, 100% - 64px)`), "max-width": custom("none") }, { mobile: { width: custom(`min(${n}px, 100% - 52px)`) } }];
// "text-[15px] leading-[19px] font-medium tracking-[0.02em] uppercase" eyebrows.
const EYE = (color = T.accent) => ({ ...text(15, 500, color, { "line-height": px(19), "letter-spacing": px(0.3), "text-transform": "uppercase" }), margin: P0 });
// Fredoka 600 heading, forest.
const H = (fs, lh, color = T.forest) => ({ "font-family": FREDOKA, "font-size": px(fs), "font-weight": "600", "line-height": px(lh), color, margin: P0 });
// globals.css .lift: hover rise + soft shadow (cards).
const LIFT = [{ transition: ease(250) }, { hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") } }];
// display:grid with equal columns.
const GRID = (cols, row, col = row) => ({ display: "grid", "grid-template-columns": `repeat(${cols}, minmax(0, 1fr))`, gap: gap(row, col) });
const GRIDC = (cols) => ({ "grid-template-columns": `repeat(${cols}, minmax(0, 1fr))` });
module.exports = { CW, EYE, H, LIFT, GRID, GRIDC };
