// G3 shared styles (ecosystem / siaw / messe-berlin). Tailwind → Elementor variants per home plan §1.2.
const { T, FREDOKA, px, custom, P0, text, grad, layers, div, box, w } = require("../lib.js");
// .container-narrow (1280 column) and the 1360 panel width (w-[min(1360px,100%-2*var(--gutter))]); gutter 32 md+ / 26 phones.
const NARROW = [{ width: custom("min(1280px, 100% - 64px)"), "max-width": custom("none") }, { mobile: { width: custom("min(1280px, 100% - 52px)") } }];
const PANEL = [{ width: custom("min(1360px, 100% - 64px)"), "max-width": custom("none") }, { mobile: { width: custom("min(1360px, 100% - 52px)") } }];
// 15/19 uppercase eyebrow (text-[15px] leading-[19px] font-medium tracking-[0.02em] uppercase text-accent).
const EB = [{ ...text(15, 500, T.accent, { "line-height": px(19), "letter-spacing": px(0.3), "text-transform": "uppercase" }), margin: P0 }, {}];
// Section h2s: 30/36 phones, 40/46 md, then lg: 42/48 (ecosystem) or 44/50 (siaw), forest.
const H2 = (size, lh) => [{ "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(size), "line-height": px(lh), margin: P0 },
  { tablet: { "font-size": px(40), "line-height": px(46) }, mobile: { "font-size": px(30), "line-height": px(36) } }];
// Body copy: 15/23 medium body; lead: 17/23 phones, 18/23 md+.
const BODY = [{ ...text(15, 500, T.body, { "line-height": px(23) }), margin: P0 }, {}];
const LEAD = [{ ...text(18, 500, T.body, { "line-height": px(23) }), margin: P0 }, { mobile: { "font-size": px(17) } }];
// bg-linear-to-b from-mint to-[#c2e3c3] (photo frames: shows while the image loads).
const MINTG = { background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) };

// Node shorthands: padding 0 by default (atomic boxes default to 10), per-corner radius.
const rad = (ss, se, ee, es) => ({ "start-start": px(ss), "start-end": px(se), "end-end": px(ee), "end-start": px(es) });
const dv = (id, d = {}, m = {}, kids = [], s = {}) => div(id, [{ padding: P0, ...d }, m], kids, s);
const fx = (id, d = {}, m = {}, kids = [], s = {}) => box(id, [{ padding: P0, ...d }, m], kids, s);
const hd = (id, tag, html, st, s = {}) => w(id, "e-heading", { tag, title: html, ...s }, st);
const pg = (id, html, st, s = {}) => w(id, "e-paragraph", { paragraph: html, ...s }, st);
module.exports = { NARROW, PANEL, EB, H2, BODY, LEAD, MINTG, rad, dv, fx, hd, pg };
