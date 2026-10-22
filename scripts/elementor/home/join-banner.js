// JoinBanner (JoinBanner.tsx, defaults). Ids prefixed jb-. Near twin of the hero card: photo box + per-breakpoint washes.
const { T, FREDOKA, px, pct, custom, pad, P0, mtAuto, radius, gap, image, div, box, w, attrs, media, text, NORMAL, BRAND0, grad, layers, at, FILL,
  toLeft, btn, dateVenue, mix, WIDE, PAGE, reveal, DATE } = require("../lib.js");

const M = media();
const HIDE = { display: "none" };

const jb = div("jb", mix(WIDE, [
  { position: "relative", overflow: "hidden", padding: P0, height: px(495), margin: mtAuto(62), "border-radius": radius(30), background: { color: T.brand } },
  { tablet: { height: { size: "", unit: "auto" }, margin: mtAuto(64), "border-radius": radius(24) },
    mobile: { height: px(760), margin: mtAuto(53), "border-radius": radius(20), background: { color: T.dark } } },
]), [
  w("jb-photo", "e-image", { image: image(M.join.id), attributes: attrs([["aria-hidden", "true"]]) }, [
    { ...at(pct(-20.74), null, null, pct(23.7)), width: pct(78.64), height: pct(141.71), "max-width": custom("none"), "object-fit": "cover" },
    { tablet: { ...FILL, width: pct(100), height: pct(100) } },
  ]),
  // Phones (318:2032 / 318:2033): pale then brand green, opaque at the top.
  div("jb-wash-m1", [{ ...FILL, padding: P0, display: "none", background: layers(grad(180, [["#e5f4da", 0], ["rgba(229,244,218,0)", 100]])) }, { mobile: { display: "block" } }]),
  div("jb-wash-m2", [{ ...FILL, padding: P0, display: "none", background: layers(grad(180, [[T.brand, 0], [BRAND0, 100]])) }, { mobile: { display: "block" } }]),
  // Tablet.
  div("jb-wash-t", [{ ...FILL, padding: P0, display: "none", background: layers(grad(180, [[T.brand, 40], ["rgba(44,166,47,0.85)", 50], ["rgba(44,166,47,0.5)", 100]])) },
    { tablet: { display: "block" }, mobile: HIDE }]),
  // Desktop (359:481): green fade over the photo's left edge.
  div("jb-fade", [{ ...at(px(0), null, px(0), custom("calc(23.66% - 3px)")), width: pct(51.9), padding: P0, background: layers(toLeft(BRAND0, T.brand)) }, { tablet: HIDE }]),
  div("jb-inner", mix(PAGE(32, 18), [
    { position: "relative", padding: pad(63, 0, 62, 0), margin: mtAuto(0) },
    { tablet: { padding: pad(48, 0, 48, 0) }, mobile: { padding: pad(48, 0, 0, 0) } },
  ]), [
    div("jb-copy", [{ padding: P0 }, {}], [
      w("jb-title", "e-heading", { tag: "h2", title: "Join Asia Pacific’s <br>Fresh Food Ecosystem", attributes: attrs([["data-br-md", ""]]) }, [
        { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", "line-height": px(52.2), color: T.white, "max-width": px(566), margin: P0 },
        { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": px(38.2), "max-width": px(354) } },
      ]),
      w("jb-lede", "e-paragraph", { paragraph: "Connect with the fresh food suppliers, technologies, logistics solutions and decision-makers shaping how fresh food is preserved, moved and brought to market across Asia Pacific." }, [
        { ...text(18, 500, T.white, { "line-height": NORMAL }), "max-width": px(579), margin: pad(37, 0, 0, 0) },
        { tablet: { margin: pad(28, 0, 0, 0) }, mobile: { "font-size": px(17), "line-height": px(24), "max-width": px(330), margin: pad(26, 0, 0, 0) } },
      ]),
    ], { attributes: attrs(reveal(0)) }),
    div("jb-actions", [{ padding: P0 }, {}], [
      dateVenue("jb", DATE, [{ margin: pad(34, 0, 0, 2) }, { tablet: { margin: pad(34, 0, 0, 0) }, mobile: { margin: pad(25, 0, 0, 0) } }]),
      box("jb-ctas", [
        { padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(10), margin: pad(26, 0, 0, 0), width: { size: "", unit: "auto" } },
        { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap(11), margin: pad(23, 0, 0, 0) } },
      ], [
        btn("jb-apply", "Apply To Exhibit", "/apply-to-exhibit", { w: 220, h: 52, pl: 34, gap: 17.66, chev: "chevron-brand", color: T.brand, mColor: "#31a834", bg: T.white,
          m: { w: 178, h: 43, pl: 25, gap: 7, fs: 15, chev: 0.828 } }),
        btn("jb-register", "Register Your Interest", "/register-to-visit", { w: 255, h: 52, pl: 31, gap: 13.66, chev: "chevron-white", color: T.white, border: [1, T.white],
          hoverBg: "rgba(255,255,255,0.1)", m: { w: 202, h: 43, pl: 25, gap: 9, fs: 15, chev: 0.828 } }),
      ]),
    ], { attributes: attrs(reveal(1)) }),
  ]),
], { tag: "section", attributes: attrs([["data-trim", ""]]) });

module.exports = [jb];
