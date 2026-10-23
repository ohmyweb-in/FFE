// register/Sections.tsx StayUpToDate: mint panel, five benefit columns split by #c2e3c3 rules.
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, div, box, w, attrs, svg, text, grad, layers, at, mix, reveal, ease } = require("../../lib.js");
const S = require("../g5-shared.js");

const BENEFITS = [
  ["g5-r-bell", ["Priority notification", "when visitor registration", "opens"], ["Be among the first to know when visitor registration for", "Fresh Food Expo Asia Pacific (FFE&nbsp;APAC) goes live."]],
  ["g5-r-megaphone", ["Exhibitor and product", "announcements"], ["Discover the fresh food suppliers, technologies and solutions joining the event."]],
  ["g5-r-users", ["Conference and", "programme updates"], ["Stay informed about speakers, sessions, site visits and other programme highlights."]],
  ["g5-r-news", ["Event news and", "visitor opportunities"], ["Receive the latest announcements and opportunities to make the most of your visit."]],
  ["g5-r-info", ["Practical information", "to plan your visit"], ["Get useful updates on the venue, travel and other information ahead of the event."]],
];
const lines = (a) => a.map((l, k) => (k ? "<br> " : "") + l).join("");
const brxl = [["data-br-xl", ""]];

const benefit = ([icon, title, desc], k) => {
  const id = `rv-stay-b${k + 1}`;
  const col = { flex: flex(1, 1, "0%"), padding: pad(0, 22, 0, k ? 22 : 0), "border-width": k < 4 ? pad(0, 1, 0, 0) : pad(0), "border-style": "solid", "border-color": "#c2e3c3" };
  return box(id, [
    { display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(12, 0), ...col },
    { tablet_extra: { flex: flex(0, 0, AUTO), padding: P0, "border-width": pad(0) } },
  ], [
    box(`${id}-ic`, [{ padding: P0, width: px(56), height: px(56), "min-width": px(56), "border-radius": radius(999), background: { color: T.mint }, "justify-content": "center", "align-items": "center", "flex-shrink": 0, transition: ease(250) }, {}], [
      svg(`${id}-i`, icon, [{ width: px(28), height: px(28) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
    ], { attributes: attrs([["data-g5-lift-t", ""]]) }),
    w(`${id}-t`, "e-heading", { tag: "h3", title: lines(title), attributes: attrs(brxl) }, [{ ...text(17, 600, "#032919", { "line-height": px(22) }), margin: P0 }, {}]),
    w(`${id}-d`, "e-paragraph", { paragraph: lines(desc), attributes: attrs(brxl) }, [{ ...text(14, 500, T.body, { "line-height": px(21) }), margin: P0 }, {}]),
  ], { attributes: attrs([["role", "listitem"], ["data-g5-lift", ""], ...reveal(k)]) });
};

module.exports = [
  div("rv-stay", mix([
    {
      width: custom("min(1360px, 100% - 64px)"), "max-width": custom("none"), margin: mtAuto(43.83), position: "relative", overflow: "hidden",
      display: "flex", "flex-direction": "column", gap: gap(20, 0), background: layers(grad(180, [[T.mint, 0], ["#eef6ef", 100]])), "border-radius": radius(28), padding: pad(32, 40, 32, 40),
    },
    { tablet: { margin: mtAuto(32) }, mobile: { width: custom("min(1360px, 100% - 52px)"), "border-radius": radius(24), padding: pad(28, 22, 28, 22) } },
  ]), [
    svg("rv-stay-leaf", "g5-r-leaf", [{ ...at(px(10.17), px(10.26), null, null), width: px(225.736), height: px(122.616), "max-width": custom("none") }, { mobile: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
    S.ruleHeading("rv-stay-h", "rv-stay", "Stay Up to Date.", {
      color: T.forest, font: [{ "font-size": px(34), "line-height": px(40) }, { mobile: { "font-size": px(28), "line-height": px(34) } }], row: [{ position: "relative" }, {}], attrs: reveal(0),
    }),
    w("rv-stay-lede", "e-paragraph", { paragraph: "By registering your interest today, you’ll receive:" }, [{ ...text(17, 500, "#000", { "line-height": px(24) }), position: "relative", margin: P0 }, { mobile: { "font-size": px(16) } }]),
    div("rv-stay-grid", [
      { padding: pad(8, 0, 0, 0), display: "flex", "flex-direction": "row", gap: gap(0, 0) },
      { tablet_extra: { display: "grid", "grid-template-columns": "repeat(3, minmax(0, 1fr))", gap: gap(28, 22) }, tablet: { "grid-template-columns": "repeat(2, minmax(0, 1fr))" }, mobile: { "grid-template-columns": "minmax(0, 1fr)" } },
    ], BENEFITS.map(benefit), { attributes: attrs([["role", "list"]]) }),
    w("rv-stay-outro", "e-paragraph", { paragraph: "Stay informed as we build towards Fresh Food Expo APAC in November 2027." }, [{ ...text(16, 500, "#000", { "line-height": px(24) }), margin: P0 }, { mobile: { "font-size": px(15) } }]),
  ], { tag: "section" }),
];
