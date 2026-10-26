// Newsletter (Newsletter.tsx): copy + Subscribe pill to /subscribe (no form, decision D1) beside the photo collage.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, image, box, div, w, attrs, media, text, svg, NORMAL, at, FILL,
  mix, PAGE, reveal, scale, btn, HIDE } = require("../lib.js");

const M = media();
const cover = (id, key) =>
  w(id, "e-image", { image: image(M[key].id) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }]);
const r = (a, bl = 0) => ({ "start-start": px(a), "start-end": px(a), "end-start": px(bl), "end-end": px(a) });
const hide = attrs([["aria-hidden", "true"]]);

const nl = div("nl", [
  { position: "relative", width: pct(100), margin: pad(176, 0, 0, 0), padding: pad(0, 0, 16, 0), display: "block" },
  { tablet_extra: { margin: pad(133, 0, 0, 0) }, tablet: { margin: pad(64, 0, 0, 0), padding: P0 }, mobile: { margin: pad(47, 0, 0, 0) } },
], [
  svg("nl-leaf", "leaf-outline", [
    { ...at(px(-185), null, null, px(-7)), width: px(303.766), height: px(165), "max-width": custom("none"), transform: scale(-1, 1) },
    { tablet_extra: { "inset-block-start": px(-165) }, tablet: { display: "none" } },
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  div("nl-sec", mix(PAGE(), [
    { position: "relative", margin: mtAuto(0), padding: P0, display: "block", "min-height": px(304) },
    { tablet_extra: { "min-height": AUTO } },
  ]), [
    div("nl-copy", [{ padding: P0, "max-width": px(662) }, { tablet_extra: { "max-width": custom("none") } }], [
      w("nl-eyebrow", "e-paragraph", { paragraph: "Newsletter" }, [
        { ...text(15, 500, T.accent, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: pad(0, 0, 0, 2) },
      ]),
      w("nl-title", "e-heading", { tag: "h2", title: "Stay Connected" }, [
        { "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(48), "line-height": px(52.2), margin: pad(23, 0, 0, 2) },
        { tablet: { "font-size": px(40), "line-height": pct(109), margin: pad(20, 0, 0, 0) }, mobile: { "font-size": px(30), "line-height": NORMAL, margin: pad(18, 0, 0, 2) } },
      ]),
      w("nl-lede", "e-paragraph", { paragraph: "Get the latest Fresh Food Expo APAC news, programme announcements and event updates delivered to your inbox." }, [
        { ...text(18, 500, T.body, { "line-height": NORMAL }), "max-width": px(567), margin: pad(24, 0, 0, 1) },
        { tablet: { margin: pad(24, 0, 0, 0) }, mobile: { margin: pad(20, 0, 0, 2) } },
      ]),
      box("nl-cta-row", [
        { margin: pad(25, 0, 0, 1), padding: P0, display: "flex", "flex-direction": "row" },
        { tablet: { margin: pad(25, 0, 0, 0) }, mobile: { margin: pad(24, 0, 0, 0) } },
      ], [
        btn("nl-subscribe", "Subscribe", "/subscribe", { w: 181, h: 56, pl: 41, gap: 18.66, chev: "chevron-white", color: T.white, bg: T.brand }),
      ]),
    ], { attributes: attrs(reveal(0)) }),
    // Collage (Figma 359:340, 644×400) in %: absolute beside the copy at xl, stacked below it under that.
    div("nl-collage", [
      { ...at(px(-96), px(4), null, null), width: px(644), "aspect-ratio": "644/400", margin: P0, padding: P0 },
      { tablet_extra: { position: "relative", "inset-block-start": px(0), "inset-inline-end": px(0), margin: mtAuto(48), width: pct(100), "max-width": px(644) },
        mobile: { margin: pad(21, 0, 0, -16), width: custom("calc(100% + 15px)"), "max-width": custom("none") } },
    ], [
      div("nl-main", [
        { ...at(pct(6.75), null, null, pct(4.3478)), width: pct(74.8447), height: pct(79.75), overflow: "hidden", padding: P0, background: { color: "#d9d9d9" }, "border-radius": r(31) },
        { mobile: { "border-radius": r(19.4) } },
      ], [cover("nl-main-img", "newsletter-main")]),
      div("nl-tint", [
        { ...at(pct(82.25), null, null, pct(56.5217)), width: pct(10.559), height: pct(17.75), padding: P0, background: { color: "rgba(40,174,61,0.47)" }, "border-radius": r(13, 13) },
        { mobile: { "border-radius": r(8.14, 8.14) } },
      ]),
      div("nl-small", [
        { ...at(pct(52.5), null, null, pct(63.6646)), width: pct(36.3354), height: pct(42.5), overflow: "hidden", padding: P0, "border-radius": r(25) },
        { mobile: { "border-radius": r(15.64) } },
      ], [cover("nl-small-img", "newsletter-small")]),
      svg("nl-dots1", "dots", [{ ...at(px(0), null, null, pct(81.9876)), width: pct(14.1304), height: pct(19.75), "max-width": custom("none") }, {}], { attributes: hide }),
      svg("nl-dots2", "dots", [{ ...at(pct(78.25), null, null, px(0)), width: pct(14.1304), height: pct(19.75), "max-width": custom("none") }, {}], { attributes: hide }),
    ], { attributes: attrs(reveal(1)) }),
  ], { tag: "section", _cssid: "newsletter", attributes: attrs([["data-trim", ""]]) }),
]);

module.exports = [nl];
