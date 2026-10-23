// Venue (plan/Sections.tsx Venue). The map is a classic html widget inside the atomic pv-map box.
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, box, div, w, attrs, text, svg, layers, grad, mix, reveal, ruleEyebrow, pill } = require("../../lib.js");
const { CW, H } = require("../g4-shared.js");

const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Sands+Expo+and+Convention+Centre+Singapore";
const MAP_IFRAME = '<iframe src="https://www.google.com/maps?q=Sands+Expo+and+Convention+Centre,+10+Bayfront+Avenue,+Singapore+018956&amp;z=16&amp;output=embed" title="Map: Sands Expo &amp; Convention Centre, 10 Bayfront Avenue, Singapore" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen style="display:block;width:100%;height:100%;border:0"></iframe>';

module.exports = [div("pv-venue", [
  { position: "relative", width: pct(100), padding: P0, margin: pad(40.32, 0, 0, 0), display: "block" },
  { tablet: { margin: pad(32, 0, 0, 0) } },
], [
  box("pv-venue-in", mix(CW(1300), [
    { position: "relative", "inset-inline-start": px(-10), padding: pad(8, 0), margin: mtAuto(0), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 48) },
    { tablet_extra: { "inset-inline-start": px(0) }, tablet: { "flex-direction": "column", "align-items": "stretch", padding: P0, gap: gap(28, 0) } },
  ]), [
    div("pv-map", [
      {
        position: "relative", overflow: "hidden", padding: P0, width: px(600), flex: flex(0, 0, AUTO), "aspect-ratio": "600/320", "border-radius": radius(22),
        background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])),
      },
      { tablet_extra: { width: pct(46) }, tablet: { width: pct(100) }, mobile: { "aspect-ratio": "4/3" } },
    ], [
      { id: "pv-map-embed", elType: "widget", widgetType: "html", settings: { html: MAP_IFRAME }, elements: [] },
    ], { attributes: attrs(reveal(0)) }),
    box("pv-venue-copy", [
      { padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), flex: flex(1, 1, pct(0)), "min-width": px(0) }, {},
    ], [
      ruleEyebrow("pv-venue-eyebrow", "Getting to the venue"),
      w("pv-venue-title", "e-heading", { tag: "h2", title: "Sands Expo &amp; Convention Centre (Hall&nbsp;F)" }, [H(32, 40), { mobile: { "font-size": px(28), "line-height": px(34) } }]),
      w("pv-venue-p", "e-paragraph", { paragraph: "Located in the heart of Singapore’s Marina Bay precinct, Sands Expo &amp; Convention Centre is one of Asia’s premier venues for international exhibitions, conferences and business events." }, [
        { ...text(16, 500, "#000", { "line-height": px(25) }), margin: P0 }, { mobile: { "font-size": px(15), "line-height": px(24) } },
      ]),
      box("pv-venue-addr", [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 12), width: AUTO }, {}], [
        svg("pv-venue-pin", "g4-pin", [{ width: px(24), height: px(24), "min-width": px(24) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
        w("pv-venue-addr-t", "e-paragraph", { tag: "span", paragraph: "10 Bayfront Avenue, Singapore 018956" }, [
          { ...text(17, 600, "#032919", { "line-height": px(22) }), margin: P0 }, { mobile: { "font-size": px(16) } },
        ]),
      ]),
      div("pv-venue-cta", [{ padding: pad(6, 0, 0, 0) }, {}], [
        pill("pv-venue-pill", "Get Directions", DIRECTIONS, { color: "#000", bg: "rgba(0,0,0,0)", border: [1.5, "#000"], hoverBg: "rgba(0,0,0,0.05)" }),
      ]),
    ], { attributes: attrs(reveal(1)) }),
  ]),
  svg("pv-venue-leaf", "g4-plan-leaf", [
    { position: "absolute", "inset-block-start": px(218.68), "inset-inline-end": custom("max(19.07px, calc(50% - 700.93px))"), width: px(253.929), height: px(137.93), "max-width": custom("none") },
    { tablet_extra: { display: "none" } },
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
])];
