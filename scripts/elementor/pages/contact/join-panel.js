// JoinPanel (contact/JoinPanel.tsx). DOM order is copy then media (see spec H7).
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, box, div, w, attrs, media, text, svg, at, FILL, mix, reveal, btn, image } = require("../../lib.js");
const { CW, H } = require("../g4-shared.js");
const M = media();

module.exports = [div("ct-jp", mix(CW(1337), [{ padding: P0, margin: mtAuto(50), display: "block" }, { tablet: { margin: mtAuto(48) } }]), [
  div("ct-jp-card", [
    { position: "relative", overflow: "hidden", padding: P0, display: "block", background: { color: T.white }, "border-radius": radius(33.425), "min-height": px(326), width: pct(100) },
    { tablet: { display: "flex", "flex-direction": "column", "border-radius": radius(24), "min-height": px(0) } },
  ], [
    div("ct-jp-copy", [
      { position: "relative", "z-index": 1, padding: pad(58, 0, 80, 55), "max-width": custom("calc(51.36% - 20px)") },
      { tablet: { padding: pad(36, 24, 32, 24), "max-width": custom("none") } },
    ], [
      w("ct-jp-eyebrow", "e-paragraph", { paragraph: "Join the event" }, [{ ...text(15.668, 500, T.accent, { "line-height": px(19.846), "letter-spacing": px(0.313), "text-transform": "uppercase" }), margin: P0 }, {}]),
      w("ct-jp-title", "e-heading", { tag: "h2", title: "Be part of <em>Fresh Food Expo APAC</em>" }, [{ ...H(35.514, 41.781), margin: pad(12.53, 0, 0, 0) }, { mobile: { "font-size": px(28), "line-height": px(34) } }]),
      w("ct-jp-lede", "e-paragraph", { paragraph: "Connect with the businesses, technologies and decision-makers shaping the future of fresh food across Asia Pacific." }, [
        { ...text(15.668, 500, T.body, { "line-height": px(21.935) }), "max-width": px(593), margin: pad(12.54, 0, 0, 0) }, {},
      ]),
      box("ct-jp-ctas", [
        { padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(13), margin: pad(17.38, 0, 0, 0), width: AUTO },
        { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap(11), margin: pad(20, 0, 0, 0) } },
      ], [
        btn("ct-jp-register", "Register Your Interest", "/register-to-visit", { w: 203, h: 40, pl: 21, gap: 6, fs: 15, chev: "chevron-sm-white", color: T.white, bg: T.accent, border: [1, T.accent], m: { w: 202, h: 43, pl: 25, gap: 7, fs: 15 } }),
        btn("ct-jp-apply", "Apply To Exhibit", "/apply-to-exhibit", { w: 162, h: 40, pl: 19, gap: 12, fs: 15, chev: "g4-chevron-sm-accent", color: T.accent, border: [1, T.accent], hoverBg: T.mint, m: { w: 178, h: 43, pl: 25, gap: 9, fs: 15 } }),
        btn("ct-jp-stay", "Stay Connected", "/subscribe", { w: 162, h: 40, pl: 19, gap: 14, fs: 15, chev: "g4-chevron-sm-accent", color: T.accent, border: [1, T.accent], hoverBg: T.mint, m: { w: 178, h: 43, pl: 25, gap: 9, fs: 15 } }),
      ]),
      svg("ct-jp-leaf", "g4-leaf-contact", [{ ...at(px(245), null, null, px(550.5)), width: px(148.829), height: px(80.841), "max-width": custom("none") }, { laptop: {}, tablet_extra: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    ]),
    div("ct-jp-media", [
      { ...FILL, padding: P0, overflow: "hidden", "z-index": 0 },
      { tablet: { position: "relative", "inset-block-start": AUTO, "inset-inline-end": AUTO, "inset-block-end": AUTO, "inset-inline-start": AUTO, height: px(300) }, mobile: { height: px(220) } },
    ], [
      w("ct-jp-img", "e-image", { image: image(M.join.id) }, [
        { ...at(pct(-8.57), null, null, pct(51.36)), width: pct(57.75), height: pct(137.37), "max-width": custom("none"), "object-fit": "cover" },
        { tablet: { ...FILL, width: pct(100), height: pct(100) } },
      ]),
    ], { attributes: attrs([["aria-hidden", "true"]]) }),
  ], { attributes: attrs(reveal(0)) }),
], { tag: "section" })];
