// BePartOf (about/BePartOf.tsx): mint panel with a green collage on the right (desktop) and the copy, date, venue and CTAs.
const { T, px, pct, custom, pad, P0, AUTO, radius, gap, flex, image, box, div, w, attrs, media, text, at, FILL, mix, reveal, layers, grad, svg, pill, VENUE, DATE_LONG, FREDOKA } = require("../../lib.js");
const { NARROW, EYB, B15 } = require("../g1-shared.js");

const M = media();
const rad = (ss, se, ee, es) => ({ "start-start": px(ss), "start-end": px(se), "end-end": px(ee), "end-start": px(es) });
const row = (id, icon, label) =>
  box(id, [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 12), width: AUTO }, {}], [
    svg(`${id}-i`, icon, [{ width: px(24), height: px(24), "min-width": px(24), flex: flex(0, 0, AUTO) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
    w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: label, attributes: attrs([["data-untrim", ""]]) }, [
      { ...text(18, 500, T.body, { "line-height": px(23) }), margin: P0 }, { mobile: { "font-size": px(17) } },
    ]),
  ], { attributes: attrs([["role", "listitem"]]) });

module.exports = [div("au-bp", mix([{ padding: P0, display: "block" }, {}], NARROW([46])), [
  div("au-bp-panel", [
    { position: "relative", overflow: "hidden", padding: P0, "min-height": px(488), "border-radius": radius(32), background: layers(grad(90, [[T.mint, 0], [T.page, 100]])) },
    { tablet_extra: { "min-height": px(0) }, tablet: { "border-radius": radius(24) } },
  ], [
    div("au-bp-collage", [{ ...at(px(0), px(0), px(0), null), width: px(527), padding: P0, display: "block" }, { tablet_extra: { display: "none" } }], [
      div("au-bp-c1", [{ ...at(px(0), px(0), null, null), width: px(380.525), height: px(321.983), padding: P0, "border-radius": rad(292.711, 0, 0, 0), background: { color: T.accent } }, {}]),
      div("au-bp-c2", [{ ...at(px(64), px(0), null, null), width: px(526.88), height: px(424.431), overflow: "hidden", padding: P0, "border-radius": rad(46.834, 263.44, 0, 292.711), background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) }, {}], [
        w("au-bp-c2-img", "e-image", { image: image(M.join.id) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      ]),
      div("au-bp-c3", [{ ...at(px(399.55), px(271.85), null, null), width: px(175.627), height: px(102.449), padding: P0, "border-radius": rad(102.449, 102.449, 0, 0), background: { color: "rgba(40,174,61,0.9)" } }, {}]),
    ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    svg("au-bp-leaf", "g1-leaf-join", [{ ...at(px(307), null, null, px(496)), width: px(343.222), height: px(186.432), "max-width": custom("none") }, { tablet_extra: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    div("au-bp-copy", [
      { position: "relative", padding: pad(48, 0, 48, 52), "max-width": px(620) },
      { tablet_extra: { padding: pad(48, 52, 48, 52), "max-width": custom("none") }, tablet: { padding: pad(36, 24, 36, 24) } },
    ], [
      w("au-bp-eyebrow", "e-paragraph", { paragraph: "Join us" }, EYB()),
      w("au-bp-title", "e-heading", { tag: "h2", title: "Be part of <em>Fresh Food Expo APAC</em>" }, [
        { "font-family": FREDOKA, "font-weight": "600", "font-size": px(34), "line-height": px(40), color: T.forest, margin: pad(12, 0, 0, 0) }, { tablet: { "font-size": px(30), "line-height": px(36) } },
      ]),
      box("au-bp-body", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(10, 0), margin: pad(12, 0, 0, 0), width: AUTO }, {}], [
        w("au-bp-p1", "e-paragraph", { paragraph: "Connect with the businesses, technologies and decision-makers shaping the future of fresh food across Asia Pacific." }, B15(21)),
        w("au-bp-p2", "e-paragraph", { paragraph: "Whether you are looking to showcase your solutions, source new products, enter new markets or build regional partnerships, Fresh Food Expo APAC brings the fresh food ecosystem together in Singapore." }, B15(21)),
      ]),
      box("au-bp-list", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(16, 0), margin: pad(33, 0, 0, 0), width: AUTO }, {}], [
        row("au-bp-date", "g1-cal", DATE_LONG),
        row("au-bp-venue", "g1-pin", VENUE),
      ], { attributes: attrs([["role", "list"]]) }),
      box("au-bp-ctas", [
        { padding: P0, margin: pad(24, 0, 0, 0), display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(14, 14), width: AUTO },
        { mobile: { "flex-direction": "column", "align-items": "stretch", gap: gap(12, 12) } },
      ], [
        pill("au-bp-apply", "Apply to Exhibit", "/apply-to-exhibit", { color: T.white, bg: T.accent, styles: [{}, { mobile: { padding: pad(10, 12), "font-size": px(15) } }] }),
        pill("au-bp-register", "Register Your Interest", "/register-to-visit", { color: T.accent, bg: "rgba(0,0,0,0)", border: [1.5, T.accent], hoverBg: T.mint, styles: [{}, { mobile: { padding: pad(10, 12), "font-size": px(15) } }] }),
      ]),
    ], { attributes: attrs(reveal(0)) }),
    div("au-bp-photo", [
      { position: "relative", padding: P0, display: "none", height: px(280) }, { tablet_extra: { display: "block" }, mobile: { height: px(200) } },
    ], [
      w("au-bp-photo-img", "e-image", { image: image(M.join.id), attributes: attrs([["aria-hidden", "true"]]) }, [{ width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      div("au-bp-photo-wash", [{ ...at(px(0), px(0), null, px(0)), height: pct(50), padding: P0, background: layers(grad(180, [[T.mint, 0], ["rgba(226,240,228,0)", 100]])) }, {}]),
    ], { attributes: attrs(reveal(1)) }),
  ]),
], { tag: "section" })];
