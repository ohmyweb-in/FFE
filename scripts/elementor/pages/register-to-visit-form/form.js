// register/VisitorForm.tsx: head (title, venue, intro) and the registration form, in one white section.
const { T, FREDOKA, px, custom, pad, P0, mtAuto, radius, gap, box, div, w, attrs, text, mix, reveal } = require("../../lib.js");
const { form, input, countrySelect } = require("../../forms.js");
const S = require("../g5-shared.js");
const { check, radio } = S;

const fF = (name, label, control) => S.applyField("rf", name, label, control, { required: true });
const inp = (name, ph, o = {}) => input(name, { p: "rf", required: true, v: "apply", placeholder: ph, ...o });

const head = box("rf-head", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(18, 0), margin: pad(0, 0, 32, 0) }, { mobile: { margin: pad(0, 0, 28, 0) } }], [
  w("rf-h2", "e-heading", { tag: "h2", title: "Fresh Food Expo APAC 2027 - Register Your&nbsp;Interest" }, [
    { "font-family": FREDOKA, "font-weight": "600", "font-size": px(34), "line-height": px(40), color: T.accent, margin: P0 }, { mobile: { "font-size": px(26), "line-height": px(32) } },
  ]),
  box("rf-venue", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0) }, {}], [
    S.detRow("rf-venue-date", "g5-icon-cal", "16-18 November 2027"),
    S.detRow("rf-venue-place", "g5-icon-pin", "Sands Expo &amp; Convention Centre, Singapore"),
  ], { attributes: attrs([["role", "list"]]) }),
  w("rf-intro", "e-paragraph", { paragraph: "Thank you for your interest in Fresh Food Expo APAC 2027, Asia Pacific’s premier trade fair for fresh food, technology, logistics and distribution. Complete the form below to register your interest and receive the latest event updates, registration announcements and opportunities to participate." }, [
    { ...text(16, 500, T.body, { "line-height": px(24) }), "max-width": px(900), margin: P0 }, { mobile: { "font-size": px(15) } },
  ]),
]);

const salList = box("rf-sal-list", [{ padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(14, 24) }, { mobile: { display: "grid", "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(14, 16) } }],
  S.SALUTATION.map((s, k) => S.li(`rf-sal-li${k + 1}`, radio("salutation", s, { p: "rf", value: s, required: true, ...S.BOX }), true, true)), { attributes: attrs([["role", "list"]]) });

const actIn = div("rf-act-in", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(14, 0) }, {}], [
  S.optionList("rf-act-list", "rf-act-li", [
    ...S.VISIT_ACTIVITY.map((a) => check("activity", S.esc(a), { p: "rf", value: a, ...S.BOX })),
    check("activityOther", "Other", { p: "rf", value: "Other", ...S.BOX, attrs: [["data-other", ""]] }),
  ], { cols: true }),
  input("activityOtherText", { p: "rf", placeholder: "Other", v: "apply", attrs: [["data-other-text", ""], ["aria-label", "Other company business activity"]] }),
], { attributes: attrs([["data-require-one", ""]]) });

const prodList = S.optionList("rf-prod-list", "rf-prod-li", S.PRODUCTS.map((x) => radio("products", S.esc(x), { p: "rf", value: x, required: true, ...S.BOX })), { cols: true });

const grid = div("rf-f-grid", [
  { padding: P0, display: "grid", "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(24, 24), "align-items": "end" },
  { mobile: { "grid-template-columns": "minmax(0, 1fr)", "align-items": "stretch" } },
], [
  S.group("rf", "salutation", "Salutation", [salList], { radio: true }),
  fF("firstName", "First Name", inp("firstName", "Enter your first name", { ac: "given-name" })),
  fF("lastName", "Last Name", inp("lastName", "Enter your last name", { ac: "family-name" })),
  fF("email", "Business Email", inp("email", "Enter your business email", { type: "email", ac: "email" })),
  fF("mobile", "Mobile Number (Include '+' and 'country code')", inp("mobile", "+65 8123 4567", {
    type: "tel", ac: "tel", attrs: [["pattern", "\\+[0-9][0-9 \\(\\)\\-]{6,}"], ["title", "Start with + and your country code, e.g. +65 8123 4567"]],
  })),
  fF("company", "Company Name", inp("company", "Enter your company name", { ac: "organization" })),
  fF("jobTitle", "Job Title", inp("jobTitle", "Enter your job title", { ac: "organization-title" })),
  fF("country", "Country / Region", countrySelect("country", { p: "rf", placeholder: "Search country / region", required: true })),
  S.group("rf", "activity", "Company Business Activity", [actIn]),
  S.group("rf", "products", "What are the products/services that you are interested in?", [prodList], { radio: true }),
  S.consent("rf", "marketingConsent", S.MKT_VISIT),
  S.consent("rf", "termsConsent", S.TERMS_VISIT),
]);

module.exports = [
  div("rf-sec", mix([
    {
      width: custom("min(1360px, 100% - 64px)"), "max-width": custom("none"), margin: mtAuto(45), padding: pad(48, 56, 48, 56), "border-radius": radius(28), background: { color: T.white },
    },
    { tablet_extra: { padding: pad(40) }, tablet: { margin: mtAuto(40) }, mobile: { width: custom("min(1360px, 100% - 52px)"), margin: mtAuto(32), padding: pad(32, 22, 32, 22), "border-radius": radius(24) } },
  ]), [
    head,
    form("rf-form", {
      name: "Visitor registration", actions: ["email", "ffe-mailchimp"], to: ["visitor@freshfoodexpoapac.com"], subject: "Visitor registration",
      success: [S.visitSuccess("rf")], error: [S.sendError("rf")],
      styles: [{ display: "flex", "flex-direction": "column", gap: gap(28, 0) }, {}],
    }, [grid, S.tsSlot("rf"), S.submitRow("rf", "Submit"), S.honeypot("rf")]),
  ], { tag: "section", attributes: attrs(reveal(0)) }),
];
