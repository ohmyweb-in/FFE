// apply/Enquiry.tsx + ApplyForm.tsx: the enquiry card (form) beside the Why Exhibit aside.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, box, div, w, attrs, svg, text, grad, layers, at, mix, reveal, ease } = require("../../lib.js");
const { form, input, textarea, select, phone } = require("../../forms.js");
const S = require("../g5-shared.js");
const { check } = S;

const T0 = "minmax(0, 1fr)", T2 = "repeat(2, minmax(0, 1fr))", T3 = "171px 291px minmax(0, 1fr)";
const rd = (ss, se, es, ee) => ({ "start-start": px(ss), "start-end": px(se), "end-start": px(es), "end-end": px(ee) });
const aF = (name, label, control, o) => S.applyField("ax", name, label, control, o);
const inp = (name, ph, o = {}) => input(name, { p: "ax", required: true, v: "apply", placeholder: ph, ...o });

const actCol = (c, items) =>
  div(`ax-act${c}`, [{ display: "block", padding: c === 3 ? pad(0, 0, 0, 41) : P0 }, c === 3 ? { laptop: { padding: P0 }, tablet_extra: { padding: pad(0, 0, 0, 41) }, tablet: { padding: P0 } } : {}],
    items.map((a, k) => S.li(`ax-act${c}-li${k + 1}`, check("activity", S.esc(a), { p: "ax", value: a, ...S.BOX }), k === items.length - 1)),
    { attributes: attrs([["role", "list"], ["data-g5-cols", ""]]) });

const act = div("ax-act", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(8, 0), "min-width": px(0) }, {}], [
  w("ax-act-label", "e-paragraph", { paragraph: "Company Business Activity", _cssid: "activity-label" }, [S.label15, {}]),
  div("ax-act-cols", [
    { padding: pad(8, 0, 0, 0), display: "grid", "grid-template-columns": T3, gap: gap(0, 0) },
    { laptop: { display: "flex", "flex-direction": "column", gap: gap(14, 0) }, tablet_extra: { display: "grid", gap: gap(0, 0) }, tablet: { display: "flex", "flex-direction": "column", gap: gap(14, 0) } },
  ], S.APPLY_ACTIVITY.map((items, k) => actCol(k + 1, items))),
], { attributes: attrs([["role", "group"], ["aria-labelledby", "activity-label"], ["data-span", ""]]) });

const grid = div("ax-f-grid", [
  { padding: P0, display: "grid", "grid-template-columns": T2, gap: gap(20, 24) },
  { mobile: { "grid-template-columns": T0, gap: gap(20, 20) } },
], [
  aF("firstName", "First Name", inp("firstName", "Enter your first name", { ac: "given-name" }), { required: true }),
  aF("lastName", "Last Name", inp("lastName", "Enter your last name", { ac: "family-name" }), { required: true }),
  aF("email", "Business Email Address", inp("email", "Enter your business email", { type: "email", ac: "email" }), { required: true }),
  aF("phone", "Phone Number (with country code)", phone({ p: "ax", split: true, required: true, placeholder: "Enter your phone number" }), { required: true }),
  aF("jobTitle", "Job Title", inp("jobTitle", "Enter your job title", { ac: "organization-title" }), { required: true }),
  aF("company", "Company Name", inp("company", "Enter your company name", { ac: "organization" }), { required: true }),
  aF("companyWebsite", "Company Website", input("companyWebsite", { p: "ax", type: "url", ac: "url", placeholder: "https://", v: "apply" })),
  aF("country", "Country", select("country", { p: "ax", placeholder: "Select your country", options: S.COUNTRIES_14.map((c) => [c]), required: true, v: "apply" }), { required: true }),
  aF("participation", "Participation Interest", select("participation", { p: "ax", placeholder: "Select an option", options: S.PARTICIPATION.map((c) => [c]), required: true, v: "apply" }), { required: true, span: true }),
  act,
  aF("goals", "Tell Us About Your Participation Goals", textarea("goals", {
    p: "ax", placeholder: "Please share your goals, products or solutions you would like to showcase, and any specific requirements.", v: "apply", h: [120, 96, 96],
  }), { span: true }),
]);

const consents = div("ax-consents", [{ padding: pad(8, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(14, 0) }, {}], [
  check("marketingConsent", S.MKT_APPLY, { p: "ax", value: "on", ...S.BOX }),
  check("termsConsent", S.TERMS_APPLY, { p: "ax", value: "on", required: true, link: "accent", ...S.BOX }),
]);

const card = div("ax-card", [
  { padding: pad(40), display: "block", "min-width": px(0), flex: flex(1, 1, "0%"), background: { color: T.white }, "border-radius": radius(28) },
  { mobile: { padding: pad(32, 22, 32, 22), "border-radius": radius(24) } },
], [
  S.ruleHeading("ax-enq-h", "ax-enq", "Enquiry Form", {
    font: [{ "font-size": px(34), "line-height": px(40) }, { mobile: { "font-size": px(28), "line-height": px(34) } }],
    row: [{ margin: pad(0, 0, 20, 0) }, {}],
  }),
  form("ax-form", {
    name: "Apply to exhibit", actions: ["email", "ffe-mailchimp"], to: ["exhibitor@freshfoodexpoapac.com"], subject: "Apply to exhibit",
    success: [S.applySuccess("ax")], error: [S.sendError("ax")],
    styles: [{ display: "flex", "flex-direction": "column", gap: gap(20, 0) }, {}],
  }, [grid, consents, S.tsSlot("ax"), S.submitRow("ax", "Submit Enquiry"), S.honeypot("ax")]),
], { attributes: attrs(reveal(0)) });

// ── Aside: Why Exhibit, Event Details, dots, collage ──
const WHY = [
  ["g5-i-users", "Meet new buyers", "Connect with importers, distributors, retailers and sourcing professionals."],
  ["g5-i-chart", "Generate quality leads", "Build face-to-face relationships and explore new business opportunities."],
  ["g5-i-globe", "Expand into new markets", "Connect with partners across Asia Pacific and global markets."],
  ["g5-i-megaphone", "Increase brand visibility", "Showcase your products and solutions to a highly targeted audience."],
];
const hide = [["aria-hidden", "true"]];
const whyLi = ([icon, title, desc], k) => {
  const id = `ax-why-li${k + 1}`;
  return box(id, [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 18) }, {}], [
    box(`${id}-ic`, [{ padding: P0, width: px(68), height: px(68), "min-width": px(68), "border-radius": radius(999), background: { color: T.mint }, "justify-content": "center", "align-items": "center", "flex-shrink": 0, transition: ease(250) }, {}], [
      svg(`${id}-i`, icon, [{ width: px(34), height: px(34) }, {}], { attributes: attrs(hide) }),
    ], { attributes: attrs([["data-g5-lift-t", ""]]) }),
    div(`${id}-tx`, [{ padding: pad(2, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(6, 0), flex: flex(1, 1, "0%"), "min-width": px(0) }, {}], [
      w(`${id}-tx-t`, "e-paragraph", { paragraph: title }, [{ ...text(17, 600, "#032919", { "line-height": px(22) }), margin: P0 }, {}]),
      w(`${id}-tx-d`, "e-paragraph", { paragraph: desc }, [{ ...text(15, 500, T.body, { "line-height": px(22) }), margin: P0 }, {}]),
    ]),
  ], { attributes: attrs([["role", "listitem"], ["data-g5-lift", ""]]) });
};
const aside = div("ax-aside", [
  {
    position: "relative", overflow: "hidden", display: "flex", "flex-direction": "column", gap: gap(26, 0), "border-radius": radius(28),
    background: layers(grad(180, [[T.mint, 0], ["#eef6ef", 100]])), width: px(420), "flex-shrink": 0, padding: pad(36, 30, 489, 30),
  },
  { tablet_extra: { width: pct(100), padding: pad(36, 30, 190, 30) }, tablet: { padding: pad(36, 30, 489, 30) }, mobile: { padding: pad(32, 22, 489, 22), "border-radius": radius(24) } },
], [
  S.ruleHeading("ax-why-h", "ax-why", "Why Exhibit?", { font: [{ "font-size": px(24), "line-height": px(30) }, {}] }),
  div("ax-why", [
    { padding: P0, display: "grid", "grid-template-columns": T0, gap: gap(26, 26) },
    { tablet_extra: { "grid-template-columns": T2, gap: gap(26, 32) }, mobile: { "grid-template-columns": T0, gap: gap(26, 26) } },
  ], WHY.map(whyLi), { attributes: attrs([["role", "list"]]) }),
  div("ax-why-hr", [{ height: px(1), width: pct(100), padding: P0, background: { color: "#c2e3c3" } }, {}]),
  w("ax-det-title", "e-heading", { tag: "h3", title: "Event Details" }, [{ ...text(22, 600, T.accent, { "line-height": px(28) }), margin: P0 }, {}]),
  box("ax-det", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(14, 0) }, {}], [
    S.detRow("ax-det-date", "g5-icon-cal", "16–18 November 2027"),
    S.detRow("ax-det-place", "g5-icon-pin", "Sands Expo &amp; Convention <br>Centre, Singapore"),
    div("ax-det-mail", [{ padding: P0 }, {}], [
      box("ax-mail", [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 12) }, {}], [
        svg("ax-mail-i", "g5-icon-pin", [{ width: px(24), height: px(24), "min-width": px(24), "flex-shrink": 0 }, {}], { attributes: attrs(hide) }),
        w("ax-mail-t", "e-paragraph", { tag: "span", paragraph: "exhibitor@freshfoodexpoapac.com" }, [
          { ...text(18, 500, "#000", { "line-height": px(23) }), margin: P0, "min-width": px(0), transition: ease(250) }, { mobile: { "font-size": px(15) } },
        ]),
      ], { tag: "a", link: link("mailto:exhibitor@freshfoodexpoapac.com") }),
    ], { attributes: attrs([["role", "listitem"]]) }),
  ], { attributes: attrs([["role", "list"]]) }),
  svg("ax-dots", "g5-dots", [
    { ...at(null, null, px(372.32), px(-3)), width: px(75), height: px(75) },
    { tablet_extra: { "inset-inline-start": AUTO, "inset-inline-end": px(348), "inset-block-end": px(300) }, tablet: { "inset-inline-start": px(-3), "inset-inline-end": AUTO, "inset-block-end": px(372.32) } },
  ], { attributes: attrs([...hide, ["data-noevents", ""]]) }),
  div("ax-col", [
    { ...at(null, px(0), px(0.32), null), width: px(360), height: px(343), "max-width": pct(100), padding: P0 }, {},
  ], [
    div("ax-col-a", [{ ...at(px(0), px(0), null, null), width: px(260), height: px(220), padding: P0, background: { color: T.accent }, "border-radius": rd(200, 0, 0, 0) }, {}]),
    div("ax-col-photo", [
      { ...at(px(40), px(0), null, null), width: px(360), height: px(290), overflow: "hidden", padding: P0, "border-radius": rd(32, 180, 200, 0), background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) }, {},
    ], [
      w("ax-col-img", "e-image", { image: require("../../lib.js").image(require("../../lib.js").media()["g5-produce"].id) }, [{ ...at(px(0), px(0), px(0), px(0)), width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
    ]),
    div("ax-col-b", [{ ...at(px(273), null, null, px(44)), width: px(120), height: px(70), padding: P0, background: { color: "rgba(40,174,61,0.9)" }, "border-radius": rd(70, 70, 0, 0) }, {}]),
  ], { attributes: attrs([...reveal(0, "fade"), ["aria-hidden", "true"], ["data-noevents", ""]]) }),
], { tag: "aside", attributes: attrs(reveal(1)) });

module.exports = [
  box("ax-enq", mix([
    {
      width: custom("min(1360px, 100% - 64px)"), "max-width": custom("none"), margin: mtAuto(45), padding: P0,
      display: "flex", "flex-direction": "row", "align-items": "stretch", gap: gap(24, 24),
    },
    { tablet_extra: { "flex-direction": "column" }, tablet: { margin: mtAuto(40) }, mobile: { width: custom("min(1360px, 100% - 52px)"), margin: mtAuto(32) } },
  ]), [card, aside], { tag: "section", _cssid: "enquiry" }),
];
