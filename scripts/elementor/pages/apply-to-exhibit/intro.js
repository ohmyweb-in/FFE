// page.tsx: div.container-wide > div.untrim.container-page (two paragraphs). The inner mt collapses out of container-wide, so it sits on the root.
const { T, px, pad, P0, mtAuto, div, w, text, mix, WIDE, PAGE, step } = require("../../lib.js");

const p = (id, html, lh, mt, n) =>
  w(id, "e-paragraph", { paragraph: html, attributes: step(n) }, [
    { ...text(18, 500, T.body, { "line-height": px(lh) }), "max-width": px(1101), margin: pad(mt, 0, 0, 0) },
    { mobile: { "font-size": px(16), "line-height": px(24) } },
  ]);

module.exports = [
  div("ax-intro", mix(WIDE, [{ padding: P0, margin: mtAuto(39) }, { tablet: { margin: mtAuto(28) } }]), [
    div("ax-intro-in", mix(PAGE(), [{ padding: pad(0, 0, 0, 22.5), margin: mtAuto(0) }, { tablet: { padding: P0 } }]), [
      p("ax-intro-p1", "Whether you’re ready to secure your stand or are still exploring the best participation option for your business, our team is here to help.", 26, 0, 2),
      p("ax-intro-p2", "Complete the <strong>enquiry form below</strong> and a member of our sales team will contact you within <strong>three business days</strong> to understand your objectives, recommend the most suitable participation opportunities and answer any questions you may have.", 27, 11, 3),
    ]),
  ]),
];
