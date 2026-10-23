// WhereToStay (plan/Sections.tsx).
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, box, div, w, attrs, media, text, layers, grad, mix, reveal, ease, lift, shadow, OUTFIT } = require("../../lib.js");
const { CW, EYE, H, GRID, GRIDC } = require("../g4-shared.js");
const M = media();

const HOTELS = [["g4-hotel-mbs", "Marina Bay Sands", "(Connected to Venue)"], ["g4-hotel-cbd", "Central Business District", "(In Marina Bay)"]];
const items = HOTELS.map(([key, title, sub], k) => {
  const id = `pv-stay-h${k + 1}`;
  return div(id, [{ padding: P0, "min-width": px(0) }, {}], [
    div(`${id}-card`, [
      { overflow: "hidden", padding: P0, "border-radius": radius(20), background: { color: T.white }, "box-shadow": shadow(0, 12, 32, 0, "rgba(3,41,26,0.1)"), transition: ease(250), width: pct(100) },
      { hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") } },
    ], [
      div(`${id}-media`, [{ position: "relative", overflow: "hidden", padding: P0, height: px(220), background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) }, { mobile: { height: px(200) } }], [
        w(`${id}-img`, "e-image", { image: image(M[key].id), attributes: attrs([["data-zoom", ""]]) }, [{ position: "absolute", "inset-block-start": px(0), "inset-inline-start": px(0), width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      ]),
      box(`${id}-body`, [{ padding: pad(16, 16, 18, 18), display: "flex", "flex-direction": "column", gap: gap(3, 0), width: AUTO }, {}], [
        w(`${id}-title`, "e-heading", { tag: "h3", title }, [{ ...H(16, 20), "font-family": OUTFIT }, {}]),
        w(`${id}-sub`, "e-paragraph", { paragraph: sub }, [{ ...text(13, 500, T.body, { "line-height": px(17) }), margin: P0 }, {}]),
      ]),
    ], { attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(k + 1)) });
});

module.exports = [box("pv-stay", mix(CW(1280), [
  { position: "relative", "inset-inline-start": px(-2), padding: P0, margin: mtAuto(59), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 40) },
  { tablet_extra: { "inset-inline-start": px(0) }, tablet: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0), margin: mtAuto(48) } },
]), [
  box("pv-stay-copy", [
    { padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), width: px(560), flex: flex(0, 0, AUTO) },
    { tablet_extra: { width: pct(44) }, tablet: { width: pct(100) } },
  ], [
    w("pv-stay-eyebrow", "e-paragraph", { paragraph: "Accommodation" }, [EYE(), {}]),
    w("pv-stay-title", "e-heading", { tag: "h2", title: "Where to Stay" }, [H(44, 50), { mobile: { "font-size": px(34), "line-height": px(40) } }]),
    box("pv-stay-text", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO }, {}], [
      w("pv-stay-p1", "e-paragraph", { paragraph: "Singapore offers a wide range of accommodation options within and around Marina Bay, as well as convenient connections from other parts of the city." }, [{ ...text(15, 500, T.body, { "line-height": px(24) }), margin: P0 }, {}]),
      w("pv-stay-p2", "e-paragraph", { paragraph: "Visitors can choose from hotels across Marina Bay, the Central Business District and surrounding neighbourhoods, with easy access to Sands Expo &amp; Convention Centre by public transport, taxi or private-hire services." }, [{ ...text(15, 500, T.body, { "line-height": px(24) }), margin: P0 }, {}]),
    ]),
  ], { attributes: attrs(reveal(0)) }),
  div("pv-stay-grid", [
    { padding: P0, "min-width": px(0), flex: flex(1, 1, pct(0)), ...GRID(2, 18) },
    { mobile: { ...GRIDC(1) } },
  ], items),
], { tag: "section" })];
