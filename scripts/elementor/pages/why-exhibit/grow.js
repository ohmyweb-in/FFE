// Grow (exhibit/Grow.tsx): 4 benefit cards in a mint panel. untrim. Cards reveal and only gain a shadow on hover (no lift, spec 0).
const { T, FREDOKA, px, pct, pad, P0, AUTO, mtAuto, radius, gap, flex, div, box, w, attrs, text, grad, layers, mix, reveal, shadow, ease } = require("../../lib.js");
const { W1360, H2X, LEADX, ico, h2, para, STR } = require("../g2-shared.js");

const BENEFITS = [
  ["users", "Reach new buyers", "Connect with prospective customers actively sourcing fresh food products, technologies and supply chain solutions."],
  ["chart", "Enter new markets", "Meet importers, distributors and commercial partners that can support regional expansion."],
  ["handshake", "Generate quality <br>business leads", "Build face-to-face relationships and identify new commercial opportunities."],
  ["megaphone", "Strengthen your <br>market presence", "Increase visibility, reconnect with customers and position your brand within the regional fresh food industry."],
];
const card = ([icon, title, desc], k) => {
  const id = `we-grow-c${k + 1}`;
  return box(id, [
    {
      padding: pad(24, 22, 26, 22), display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(14, 0), "min-height": px(249), "border-radius": radius(20), background: { color: T.white }, transition: ease(250),
    },
    { hover: { "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") }, tablet_extra: { "min-height": px(0) } },
  ], [
    div(`${id}-icon`, [{ width: px(60), height: px(60), padding: P0, "border-radius": radius(999), background: { color: T.mint }, display: "flex", "align-items": "center", "justify-content": "center", flex: flex(0, 0, AUTO) }, {}], [
      ico(`${id}-icon-i`, "g2-ex-g-" + icon, 30),
    ]),
    h3(`${id}-title`, title, k),
    w(`${id}-text`, "e-paragraph", { paragraph: desc }, [{ ...text(14, 500, T.body, { "line-height": px(21) }), margin: P0 }, {}]),
  ], { attributes: attrs([["role", "listitem"], ...reveal(k)]) });
};
function h3(id, title, k) {
  return w(id, "e-heading", { tag: "h3", title, ...(k > 1 && { attributes: attrs([["data-br-xl", ""]]) }) }, [{ "font-family": FREDOKA, "font-weight": "600", color: T.dark, "font-size": px(19), "line-height": px(24), margin: P0 }, {}]);
}

module.exports = [
  div("we-grow", mix(W1360, [{ margin: mtAuto(72), padding: P0 }, { tablet: { margin: mtAuto(48) } }]), [
    box("we-grow-panel", [
      { padding: pad(40), display: "flex", "flex-direction": "column", gap: gap(24, 0), "border-radius": radius(32), background: layers(grad(180, [[T.mint, 0], ["#eef6ef", 100]])) },
      { tablet: { "border-radius": radius(24) }, mobile: { padding: pad(20) } },
    ], [
      box("we-grow-head", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(10, 0) }, {}], [
        h2("we-grow-title", "Grow your business across <em>Asia Pacific</em>", H2X),
        para("we-grow-lede", "Fresh Food Expo APAC gives exhibitors a platform to:", LEADX()),
      ], { attributes: attrs(reveal(0)) }),
      div("we-grow-grid", [
        { padding: P0, display: "grid", gap: gap(16), "grid-template-columns": STR("repeat(4, minmax(0, 1fr))") },
        { tablet_extra: { "grid-template-columns": STR("repeat(2, minmax(0, 1fr))") }, mobile: { "grid-template-columns": STR("minmax(0, 1fr)") } },
      ], BENEFITS.map(card), { attributes: attrs([["role", "list"]]) }),
    ]),
  ], { tag: "section" }),
];
