// UsefulResources (contact/UsefulResources.tsx).
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, box, div, w, attrs, svg, text, layers, grad, mix, reveal } = require("../../lib.js");
const { CW, EYE, H, LIFT, GRID, GRIDC } = require("../g4-shared.js");

const LINKS = [
  ["/about", "Event Overview", "Key dates, venue and<br> what to expect", "g4-icon-calendar-26"],
  ["/why-exhibit", "Why Exhibit", "Reasons to exhibit and<br> key benefits", "g4-icon-users"],
  ["/why-visit", "Why Visit", "Who should attend and<br> what you’ll discover", "g4-icon-users"],
  ["/register-to-visit", "Register Your Interest", "Join Asia Pacific Fresh Food Ecosystem", "g4-icon-file"],
];

const items = LINKS.map(([href, title, desc, icon], k) => {
  const id = `ct-ur-l${k + 1}`;
  return div(id, [{ padding: P0, "min-width": px(0) }, {}], [
    box(`${id}-a`, mix(LIFT, [
      { padding: pad(11, 20), height: pct(100), "min-height": px(108), "border-radius": radius(22), background: { color: T.white }, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 16), width: AUTO },
      { laptop: { padding: pad(16, 20) } },
    ]), [
      box(`${id}-ic`, [{ width: px(56), height: px(56), "min-width": px(56), padding: P0, "border-radius": radius(999), background: { color: T.mint }, display: "flex", "justify-content": "center", "align-items": "center" }, {}], [
        svg(`${id}-i`, icon, [{ width: px(26), height: px(26) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
      ]),
      box(`${id}-txt`, [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(6, 0), flex: flex(1, 1, pct(0)), "min-width": px(0), width: AUTO }, {}], [
        w(`${id}-title`, "e-paragraph", { tag: "span", paragraph: title }, [{ ...text(17, 600, T.forest, { "line-height": px(22) }), margin: P0 }, {}]),
        w(`${id}-desc`, "e-paragraph", { tag: "span", paragraph: desc }, [{ ...text(13, 500, T.body, { "line-height": px(18) }), margin: P0 }, {}]),
      ]),
      box(`${id}-arrow`, [{ width: px(36), height: px(36), "min-width": px(36), padding: P0, "border-radius": radius(999), "border-width": pad(1.5), "border-style": "solid", "border-color": T.accent, display: "flex", "justify-content": "center", "align-items": "center" }, {}], [
        svg(`${id}-chev`, "g4-icon-chevron-right", [{ width: px(18), height: px(18) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
      ]),
    ], { tag: "a", link: link(href), attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(k)) });
});

module.exports = [div("ct-ur", mix(CW(1360), [{ padding: P0, margin: mtAuto(50), display: "block" }, { tablet: { margin: mtAuto(48) } }]), [
  box("ct-ur-panel", [
    { padding: pad(48, 40), display: "flex", "flex-direction": "column", gap: gap(24, 0), "border-radius": radius(36), background: layers(grad(180, [[T.mint, 0], ["#eef6ef", 100]])), width: pct(100) },
    { tablet: { "border-radius": radius(24) }, mobile: { padding: pad(36, 20) } },
  ], [
    box("ct-ur-head", [{ padding: pad(0, 0, 0, 16), display: "flex", "flex-direction": "column", gap: gap(10, 0), width: AUTO }, { mobile: { padding: P0 } }], [
      w("ct-ur-eyebrow", "e-paragraph", { paragraph: "Need more information?" }, [EYE(), {}]),
      w("ct-ur-title", "e-heading", { tag: "h2", title: "Useful Resources" }, [H(40, 46), { mobile: { "font-size": px(30), "line-height": px(36) } }]),
    ], { attributes: attrs(reveal(0)) }),
    div("ct-ur-grid", [
      { padding: P0, ...GRID(4, 20) },
      { laptop: { ...GRIDC(2) }, mobile: { ...GRIDC(1), gap: gap(16, 16) } },
    ], items),
  ]),
], { tag: "section" })];
