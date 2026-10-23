// HelpCards (contact/HelpCards.tsx).
const { flex, OUTFIT, T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, image, box, div, w, attrs, media, text, mix, reveal } = require("../../lib.js");
const { CW, EYE, H, LIFT, GRID, GRIDC } = require("../g4-shared.js");
const M = media();

const CARDS = [
  ["General Enquiries", "Have a question about the event? Our team is happy to help.", "g4-help-general", [42, 42]],
  ["Exhibition Enquiries", "Find out more about exhibiting opportunities and showcase your products and solutions.", "g4-help-exhibition", [42, 43]],
  ["Sponsorship Enquiries", "Discover sponsorship opportunities to increase your brand visibility.", "g4-help-sponsorship", [42, 42]],
  ["Partnership Opportunities", "Explore strategic partnerships, industry collaborations and supporting organisations.", "g4-point-3", [42, 42]],
];

const cards = CARDS.map(([title, desc, icon, [iw, ih]], k) => {
  const id = `ct-help-c${k + 1}`;
  return div(id, [{ padding: P0, "min-width": px(0) }, {}], [
    box(`${id}-card`, mix(LIFT, [
      {
        padding: pad(36, 28, 30, 28), height: px(299), width: pct(100), "border-radius": { "start-start": px(28), "start-end": px(28), "end-end": px(28), "end-start": px(0) }, background: { color: T.white },
        display: "flex", "flex-direction": "column", "align-items": "center", "justify-content": "space-between", gap: gap(16, 0), "text-align": "center",
      },
      { tablet_extra: { height: pct(100) } },
    ]), [
      box(`${id}-ring`, [{ width: px(96), height: px(96), "min-width": px(96), flex: flex(0, 0, AUTO), padding: P0, "border-radius": radius(999), background: { color: T.mint }, display: "flex", "justify-content": "center", "align-items": "center" }, {}], [
        w(`${id}-icon`, "e-image", { image: image(M[icon].id) }, [{ width: px(iw), height: px(ih), "max-width": custom("none") }, {}]),
      ]),
      w(`${id}-title`, "e-heading", { tag: "h3", title }, [{ "font-family": OUTFIT, "font-size": px(18), "font-weight": "600", "line-height": px(24), color: T.accent, margin: P0 }, {}]),
      w(`${id}-desc`, "e-paragraph", { paragraph: desc }, [{ ...text(15, 500, T.body, { "line-height": px(22) }), margin: P0 }, {}]),
      div(`${id}-rule`, [{ width: px(40), "min-width": px(40), flex: flex(0, 0, AUTO), height: px(3), padding: P0, "border-radius": radius(2), background: { color: T.accent } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
    ], { tag: "article" }),
  ], { attributes: attrs(reveal(k)) });
});

module.exports = [div("ct-help", mix(CW(1280), [{ padding: P0, margin: mtAuto(50), display: "block" }, { tablet: { margin: mtAuto(48) } }]), [
  box("ct-help-head", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(14, 0), width: AUTO }, {}], [
    w("ct-help-eyebrow", "e-paragraph", { paragraph: "How can we help?" }, [EYE(), {}]),
    w("ct-help-title", "e-heading", { tag: "h2", title: "Our Team is Here for You", attributes: attrs([["data-nowrap", ""]]) }, [
      H(48, 54),
      { tablet: { ...H(40, 46) }, mobile: { "font-size": custom("clamp(24px, calc((100vw - 52px) / 11.6), 30px)"), "line-height": pct(120) } },
    ]),
    w("ct-help-lede", "e-paragraph", { paragraph: "Get in touch with the right team for your enquiry or simply fill in the form and we’ll connect you with the right person." }, [
      { ...text(18, 500, T.body, { "line-height": px(23) }), margin: P0 }, { mobile: { "font-size": px(17) } },
    ]),
  ], { attributes: attrs(reveal(0)) }),
  div("ct-help-grid", [
    { padding: P0, ...GRID(4, 24), margin: pad(36, 0, 0, 0) },
    { tablet_extra: { ...GRIDC(2) }, tablet: { margin: pad(28, 0, 0, 0) }, mobile: { ...GRIDC(1), gap: gap(16, 16) } },
  ], cards),
], { tag: "section", attributes: attrs([]) })];
