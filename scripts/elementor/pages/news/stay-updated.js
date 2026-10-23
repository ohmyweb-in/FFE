// StayUpdated (news/StayUpdated.tsx, News copy).
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, image, box, div, w, attrs, media, text, svg, layers, grad, at, FILL, rotate, mix, reveal, pill } = require("../../lib.js");
const { CW, EYE, H } = require("../g4-shared.js");
const M = media();

module.exports = [div("nw-stay", mix(CW(1360), [{ padding: P0, margin: mtAuto(41), display: "block" }, { tablet: { margin: mtAuto(40) } }]), [
  div("nw-stay-card", [
    { position: "relative", overflow: "hidden", padding: P0, display: "block", "min-height": px(327), "border-radius": radius(32), background: layers(grad(90, [[T.mint, 0], [T.page, 100]])), width: pct(100) },
    { tablet: { display: "flex", "flex-direction": "column", "border-radius": radius(24), "min-height": px(0) } },
  ], [
    div("nw-stay-copy", [
      { position: "relative", width: px(760), "max-width": custom("calc(100% - 600px)"), padding: pad(52, 40, 48, 56) },
      { tablet_extra: { "max-width": custom("calc(100% - 440px)") }, tablet: { width: pct(100), "max-width": custom("none"), padding: pad(36, 24, 32, 24) } },
    ], [
      w("nw-stay-eyebrow", "e-paragraph", { paragraph: "Stay updated" }, [EYE(), {}]),
      w("nw-stay-title", "e-heading", { tag: "h2", title: "Join the <em>FFE APAC</em> community" }, [
        { ...H(44, 50), margin: pad(16, 0, 0, 0) }, { tablet: { "font-size": px(40), "line-height": px(46) }, mobile: { "font-size": px(30), "line-height": px(36) } },
      ]),
      w("nw-stay-lede", "e-paragraph", { paragraph: "Subscribe to receive the latest news, programme announcements, industry insights and opportunities." }, [
        { ...text(18, 500, T.body, { "line-height": px(23) }), margin: pad(16, 0, 0, 0) }, { mobile: { "font-size": px(17) } },
      ]),
      div("nw-stay-cta", [{ padding: P0, margin: pad(24, 0, 0, 0) }, {}], [pill("nw-stay-pill", "Subscribe Now", "/subscribe")]),
      box("nw-stay-sprig", [
        { ...at(px(8.31), null, null, px(705.1)), width: px(126.885), height: px(125.81), padding: P0, display: "flex", "justify-content": "center", "align-items": "center" },
        { laptop: { display: "none" } },
      ], [
        w("nw-stay-sprig-i", "e-image", { image: image(M["g4-sprig"].id) }, [{ width: px(93), height: px(89), "max-width": custom("none"), "object-fit": "cover", transform: rotate(-34.04) }, {}]),
      ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    ]),
    div("nw-stay-media", [
      { ...at(px(0), px(0), px(0), null), position: "absolute", overflow: "hidden", padding: P0, width: px(600), "border-radius": { "start-start": px(200), "start-end": px(0), "end-start": px(0), "end-end": px(0) } },
      { tablet_extra: { width: px(440) }, tablet: { position: "relative", "inset-block-start": AUTO, "inset-inline-end": AUTO, "inset-block-end": AUTO, width: pct(100), height: px(300), "border-radius": radius(0) }, mobile: { height: px(220) } },
    ], [
      div("nw-stay-media-bg", [{ ...FILL, padding: P0, background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) }, {}]),
      w("nw-stay-img", "e-image", { image: image(M.join.id), attributes: attrs([["data-zoom", ""], ["aria-hidden", "true"]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
    ]),
    svg("nw-stay-dots", "g4-news-dots", [{ ...at(px(247), px(585), null, null), width: px(75), height: px(47), "max-width": custom("none") }, { tablet_extra: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  ], { attributes: attrs([["data-group", ""], ...reveal(0)]) }),
], { tag: "section" })];
