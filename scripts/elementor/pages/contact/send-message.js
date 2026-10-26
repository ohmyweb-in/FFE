// SendMessage (contact/SendMessage.tsx + EnquiryForm.tsx). _cssid "enquiry" is the anchor G2 links to.
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, box, div, w, attrs, media, text, svg, layers, grad, at, FILL, mix, reveal, image } = require("../../lib.js");
const { form, field, input, textarea, select, phone, check, honeypot, turnstileSlot, pillSubmit } = require("../../forms.js");
const { CW, H, GRID, GRIDC } = require("../g4-shared.js");
const M = media();

const COUNTRIES = ["Singapore", "Australia", "China", "Hong Kong", "India", "Indonesia", "Japan", "Malaysia", "New Zealand", "Philippines", "South Korea", "Thailand", "Vietnam", "Other"];
const CONSENT_MKT = "By submitting this form, I consent to the organisers of Fresh Food Expo Asia Pacific (FFE&nbsp;APAC) collecting, using, processing and/or disclosing my personal information for communications and activities relating to its affiliates, partners and related events, including event updates, industry news, products and services, promotions, and other marketing communications.";
const CONSENT_TERMS = 'I have read, understood, and agree to the <a href="https://www.messe-berlin.de/en/extra-pages/data-protection" target="_blank" rel="noopener">Terms of Service</a>. I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal data for the purpose of processing my registration and managing my account.';

const OK = box("ct-ok-p", [{ "min-height": px(240), "border-radius": radius(20), background: { color: T.mint }, padding: pad(0, 24), margin: pad(18, 0, 0, 0), display: "flex", "align-items": "center", "justify-content": "center" }, {}], [
  w("ct-ok-t", "e-paragraph", { paragraph: "Thank you — your enquiry has been sent. Our team will get back to you within three business days.", attributes: attrs([["role", "status"]]) }, [
    { ...text(18, 500, T.forest, { "line-height": px(24), "text-align": "center" }), margin: P0 }, {},
  ]),
]);
const ERR = w("ct-err-t", "e-paragraph", { paragraph: "Sorry, this couldn’t be sent. Please wait for the security check to finish and try again.", attributes: attrs([["role", "alert"]]) }, [
  { ...text(14, 500, "#c0392b", { "line-height": px(20) }), margin: P0 }, {},
]);

const f = (name, label, ctl, o = {}) => field(`ct-fd-${name.toLowerCase()}`, label, ctl, { for: name, required: true, ...o });
const SPAN = [{ "grid-column": "1 / -1" }, { mobile: { "grid-column": "auto" } }];

const formNode = form("ct-form", {
  name: "contact", actions: ["email", "ffe-mailchimp"], to: ["marketing@freshfoodexpoapac.com"], subject: "Website enquiry", success: [OK], error: [ERR],
  styles: [{ padding: P0, margin: pad(18, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(18, 0) }, {}],
}, [
  div("ct-form-grid", [{ padding: P0, ...GRID(2, 18, 24) }, { mobile: { ...GRIDC(1), gap: gap(16, 16) } }], [
    f("firstName", "First Name", input("firstName", { p: "ct", required: true, placeholder: "John", ac: "given-name" })),
    f("lastName", "Last Name", input("lastName", { p: "ct", required: true, placeholder: "Doe", ac: "family-name" })),
    f("phone", "Phone Number", phone({ p: "ct" })),
    f("email", "Business Email Address", input("email", { p: "ct", type: "email", required: true, placeholder: "you@company.com", ac: "email" })),
    f("jobTitle", "Job Title", input("jobTitle", { p: "ct", required: true, placeholder: "e.g. Marketing Manager", ac: "organization-title" })),
    f("company", "Company Name", input("company", { p: "ct", required: true, placeholder: "Your Company Name", ac: "organization" })),
    f("country", "Country", select("country", { p: "ct", required: true, placeholder: "Select Country", ac: "country-name", options: COUNTRIES.map((c) => [c]) })),
    f("team", "Enquiry Type", select("team", { p: "ct", required: true, placeholder: "Select Enquiry Type", options: [
      ["General Enquiry", "marketing"], ["Exhibiting & Sponsorship", "exhibitor"], ["Visitor Registration", "visitor"],
      ["Conference", "conference"], ["Buyers", "buyers"], ["Media Partnership", "media"]] })),
    f("message", "Please share details that will help the team prepare for your conversation.",
      textarea("message", { p: "ct", required: true, placeholder: "Type your message here…", h: [120, 120, 120] }), { styles: SPAN }),
  ]),
  box("ct-form-consents", [{ padding: pad(6, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(14, 0) }, {}], [
    check("marketingConsent", CONSENT_MKT, { p: "ct", value: "yes", link: "dark" }),
    check("termsConsent", CONSENT_TERMS, { p: "ct", value: "yes", required: true, link: "dark" }),
  ]),
  turnstileSlot("ct"),
  honeypot("ct"),
  div("ct-submit-row", [{ padding: pad(8, 0, 0, 0) }, {}], [pillSubmit("ct-submit", "Submit Enquiry", { color: T.white, bg: T.accent })]),
]);

const main = div("ct-sm-main", [
  { padding: pad(52), "min-width": px(0), flex: flex(1, 1, pct(0)) },
  { tablet_extra: { padding: pad(40) }, mobile: { padding: pad(32, 22, 32, 22) } },
], [
  w("ct-sm-title", "e-heading", { tag: "h2", title: "Send Us a Message" }, [H(36, 42), { mobile: { "font-size": px(28), "line-height": px(34) } }]),
  w("ct-sm-lede", "e-paragraph", { paragraph: "Fill in the form below and our team will get back to you within three business days." }, [
    { ...text(15, 500, T.body, { "line-height": px(22) }), margin: pad(18, 0, 0, 0) }, {},
  ]),
  formNode,
]);

const aside = box("ct-sm-aside", [
  { position: "relative", overflow: "hidden", padding: pad(52, 44, 352, 44), display: "flex", "flex-direction": "column", gap: gap(26, 0), width: px(440), flex: flex(0, 0, AUTO), background: layers(grad(180, [[T.mint, 0], [T.page, 100]])) },
  { tablet_extra: { width: px(360) }, tablet: { width: pct(100) }, mobile: { padding: pad(32, 18, 352, 18) } },
], [
  box("ct-sm-aside-head", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(10, 0), width: AUTO }, {}], [
    w("ct-sm-aside-title", "e-heading", { tag: "h2", title: "Other Ways to Reach Us", attributes: attrs([["data-balance", ""]]) }, [H(28, 34), { mobile: { "font-size": px(24), "line-height": px(32) } }]),
    w("ct-sm-aside-lede", "e-paragraph", { paragraph: "You can also contact us directly using the details below." }, [{ ...text(15, 500, T.body, { "line-height": px(22) }), margin: P0 }, {}]),
  ]),
  box("ct-sm-mail", [
    { padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 18), width: AUTO },
    { mobile: { "align-items": "center", gap: gap(0, 12) } },
  ], [
    box("ct-sm-mail-ic", [
      { width: px(56), height: px(56), "min-width": px(56), padding: P0, "border-radius": radius(999), background: { color: T.white }, display: "flex", "justify-content": "center", "align-items": "center" },
      { mobile: { width: px(44), height: px(44), "min-width": px(44) } },
    ], [svg("ct-sm-mail-i", "g4-icon-mail", [{ width: px(24), height: px(24) }, {}], { attributes: attrs([["aria-hidden", "true"]]) })]),
    box("ct-sm-mail-txt", [{ padding: pad(2, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(6, 0), "min-width": px(0), width: AUTO }, {}], [
      w("ct-sm-mail-label", "e-paragraph", { tag: "span", paragraph: "General Enquiries" }, [{ ...text(16, 600, T.forest, { "line-height": px(21) }), margin: P0 }, {}]),
      w("ct-sm-mail-addr", "e-paragraph", { tag: "span", paragraph: "visitor@freshfoodexpoapac.com" }, [
        { ...text(15, 500, T.body, { "line-height": px(21) }), margin: P0 }, { mobile: { "font-size": custom("clamp(12px, calc((100vw - 144px) / 16.4), 15px)") } },
      ]),
    ]),
  ], { tag: "a", link: link("mailto:visitor@freshfoodexpoapac.com"), attributes: attrs([["data-group", ""]]) }),
  div("ct-sm-collage", [{ ...at(null, px(0), px(0), null), width: px(360), "max-width": pct(100), height: px(328), padding: P0 }, {}], [
    div("ct-sm-c1", [{ ...at(px(0), px(0), null, null), width: px(260), height: px(220), padding: P0, "border-radius": { "start-start": px(200), "start-end": px(0), "end-start": px(0), "end-end": px(0) }, background: { color: T.accent } }, {}]),
    div("ct-sm-c2", [{
      ...at(px(40), px(0), null, null), width: px(360), height: px(290), padding: P0, overflow: "hidden",
      "border-radius": { "start-start": px(32), "start-end": px(180), "end-start": px(200), "end-end": px(0) }, background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])),
    }, {}], [
      w("ct-sm-c2-img", "e-image", { image: image(M["g4-produce"].id) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
    ]),
    div("ct-sm-c3", [{
      ...at(px(273), null, null, px(44)), width: px(120), height: px(70), padding: P0, "border-radius": { "start-start": px(70), "start-end": px(70), "end-start": px(0), "end-end": px(0) }, background: { color: "rgba(40,174,61,0.9)" },
    }, {}]),
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
], { tag: "aside" });

module.exports = [div("ct-sm", mix(CW(1280), [{ padding: P0, margin: mtAuto(50), display: "block" }, { tablet: { margin: mtAuto(48) } }]), [
  box("ct-sm-card", [
    { position: "relative", overflow: "hidden", padding: P0, display: "flex", "flex-direction": "row", "align-items": "stretch", background: { color: T.white }, "border-radius": radius(32), width: pct(100) },
    { tablet: { "flex-direction": "column", "border-radius": radius(24) } },
  ], [
    main,
    aside,
    svg("ct-sm-dots", "g4-dots-75", [{ ...at(px(763), px(425), null, null), width: px(75), height: px(75) }, { tablet_extra: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  ], { attributes: attrs(reveal(0)) }),
], { tag: "section", _cssid: "enquiry" })];
