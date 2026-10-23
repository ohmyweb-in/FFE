// SIAW BroaderImpact (siaw/BroaderImpact.tsx): mint panel with an xl collage, copy, and a stacked photo below xl. No data-trim.
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, AUTO, mtAuto, gap, image, w, attrs, media, at, FILL, reveal, mix, grad, layers } = require("../../lib.js");
const { NARROW, EB, LEAD, MINTG, rad, dv, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const ARIA = attrs([["aria-hidden", "true"]]);
const fill = (id, key) => w(id, "e-image", { image: image(M[key].id) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover" }]);

const collage = dv("si-bi-collage", { ...at(px(0), px(0), px(0), null), width: px(527), "min-width": px(0), display: "block" }, { tablet_extra: { display: "none" } }, [
  dv("si-bi-accent", { ...at(px(0), px(0), null, null), width: px(380.525), height: px(321.983), "min-width": px(0), background: { color: T.accent }, "border-radius": rad(292.711, 0, 0, 0) }),
  dv("si-bi-frame", { ...at(px(64), px(0), null, null), width: px(526.88), height: px(424.431), "min-width": px(0), overflow: "hidden", ...MINTG, "border-radius": rad(46.834, 263.44, 0, 292.711) }, {}, [fill("si-bi-frame-img", "g3-venue-xl")]),
  dv("si-bi-tint", { ...at(px(399.55), px(271.85), null, null), width: px(175.627), height: px(102.449), "min-width": px(0), background: { color: "rgba(40,174,61,0.9)" }, "border-radius": rad(102.449, 102.449, 0, 0) }),
], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) });

const copy = dv("si-bi-copy", {
  position: "relative", display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16), padding: pad(83, 565, 48, 78),
}, { tablet_extra: { padding: pad(48, 52, 48, 52) }, tablet: { padding: pad(36, 24, 36, 24) } }, [
  pg("si-bi-eyebrow", "Broader impact", EB),
  hd("si-bi-title", "h2", "Where Industry,<br> Innovation &amp; Trade<br> Connect.", [
    { "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(46), "line-height": px(52), margin: P0, "max-width": px(540), width: AUTO },
    { tablet_extra: { "font-size": px(40), "line-height": px(46) }, mobile: { "font-size": px(30), "line-height": px(36) } },
  ], { attributes: attrs([["data-br-md", ""]]) }),
  pg("si-bi-p", "Together, Fresh Food Expo APAC and Singapore International Agri-Food Week bring business, trade, innovation and the wider agri-food ecosystem together, creating opportunities for knowledge exchange, industry collaboration and new partnerships across Asia Pacific.", mix(LEAD, [{ "max-width": px(637) }, {}])),
], { attributes: attrs(reveal(0)) });

const photo = dv("si-bi-photo", { position: "relative", height: px(280), display: "none" }, { tablet_extra: { display: "block" }, mobile: { height: px(200) } }, [
  fill("si-bi-photo-img", "g3-venue"),
  dv("si-bi-photo-fade", { ...at(px(0), px(0), null, px(0)), height: pct(50), "min-width": px(0), background: layers(grad(180, [[T.mint, 0], ["rgba(226,240,228,0)", 100]])) }),
], { attributes: attrs([["aria-hidden", "true"], ...reveal(1)]) });

const [d, m] = mix(NARROW, [{ margin: mtAuto(65) }, { tablet: { margin: mtAuto(48) } }]);
module.exports = [dv("si-bi", d, m, [
  dv("si-bi-panel", {
    position: "relative", overflow: "hidden", "border-radius": rad(32, 32, 32, 32), background: layers(grad(90, [[T.mint, 0], [T.page, 100]])), "min-height": px(488),
  }, { tablet_extra: { "min-height": px(0) }, tablet: { "border-radius": rad(24, 24, 24, 24) } }, [collage, copy, photo]),
], { tag: "section" })];
