// JoinCommunity + CommunityForm (about/JoinCommunity.tsx, CommunityForm.tsx): mint intro panel + newsletter form (Mailchimp only, no email).
const { T, OUTFIT, px, pct, custom, pad, P0, AUTO, radius, gap, flex, image, box, div, w, attrs, media, text, at, mix, reveal, layers, grad, svg, rotate, FREDOKA } = require("../../lib.js");
const { form, field, input, select, phone, check, honeypot, turnstileSlot, pillSubmit } = require("../../forms.js");
const { NARROW, EYB, H44, B15 } = require("../g1-shared.js");

const M = media();
const COUNTRIES = ["Singapore", "Australia", "China", "Hong Kong", "India", "Indonesia", "Japan", "Malaysia", "New Zealand", "Philippines", "South Korea", "Thailand", "Vietnam", "Other"];
const CONSENT = "By registering for Fresh Food Expo APAC, you agree to receive event-related communications, including important updates, programme information, exhibitor announcements, registration notices and other information relating to the event.";
const NOTE = [{ ...text(12, 500, T.body, { "line-height": px(17) }), margin: P0 }, {}];
const AUTOS = { "inset-block-start": AUTO, "inset-inline-end": AUTO, "inset-block-end": AUTO, "inset-inline-start": AUTO };

const intro = box("au-cm-intro", [
  { position: "relative", overflow: "hidden", padding: P0, display: "block", width: px(600), flex: flex(0, 0, AUTO), "border-radius": radius(32), background: layers(grad(180, [[T.mint, 0], [T.page, 100]])) },
  { tablet_extra: { display: "flex", "flex-direction": "column", width: pct(100), flex: flex(0, 1, AUTO) }, tablet: { "border-radius": radius(24) } },
], [
  div("au-cm-copy", [
    { ...at(px(48), px(48), null, px(48)), width: AUTO, padding: P0 },
    { tablet_extra: { position: "relative", ...AUTOS, padding: pad(40, 40, 0, 40) }, mobile: { padding: pad(32, 24, 0, 24) } },
  ], [
    w("au-cm-eyebrow", "e-paragraph", { paragraph: "Stay connected" }, EYB()),
    w("au-cm-title", "e-heading", { tag: "h2", title: "Join the <em>FFE APAC</em><br>community" }, mix(H44, [{ margin: pad(16, 0, 0, 0) }, { tablet: { margin: pad(14, 0, 0, 0) } }])),
    w("au-cm-lede", "e-paragraph", { paragraph: "Subscribe to stay connected — be the first to know about new exhibitors, programme announcements and opportunities at Asia’s premier trade show connecting the fresh food ecosystem across the source-to-market value chain." }, mix(B15(), [{ margin: pad(16, 0, 0, 0), "max-width": px(440) }, { tablet: { margin: pad(14, 0, 0, 0) } }])),
  ]),
  div("au-cm-leaf", [{ ...at(px(283.68), null, null, px(48)), width: px(244.796), height: px(443.121), padding: P0, display: "block" }, { tablet_extra: { display: "none" } }], [
    svg("au-cm-leaf-i", "g1-leaf-community", [{ ...at(px(102.06), null, null, px(-97.6)), width: px(440), height: px(239), "max-width": custom("none"), transform: rotate(-89.24) }, {}]),
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  div("au-cm-photo", [
    { ...at(px(336.68), null, null, px(221)), overflow: "hidden", padding: P0, width: px(379), height: px(384), margin: P0, "border-radius": { "start-start": px(240), "start-end": px(0), "end-end": px(0), "end-start": px(0) }, background: layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]])) },
    { tablet_extra: { position: "relative", ...AUTOS, height: px(280), margin: { "block-start": px(24), "inline-end": px(0), "block-end": px(0), "inline-start": AUTO } }, mobile: { width: pct(72), height: px(200), "border-radius": { "start-start": px(160), "start-end": px(0), "end-end": px(0), "end-start": px(0) } } },
  ], [
    w("au-cm-photo-img", "e-image", { image: image(M["g1-produce"].id) }, [{ width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
  ]),
], { attributes: attrs(reveal(0)) });

const fld = (n, label, name, control, req) => field(`au-cm-f${n}`, label, control, { for: name, required: req, gap: 7 });

const SUCCESS = box("au-cm-ok", [
  { display: "flex", "justify-content": "center", "align-items": "center", "min-height": px(200), height: pct(100), "border-radius": radius(20), background: { color: T.mint }, padding: pad(0, 24), "text-align": "center" }, {},
], [
  w("au-cm-ok-t", "e-paragraph", { paragraph: "Thanks for subscribing — you’re now part of the FFE APAC community.", attributes: attrs([["role", "status"]]) }, [{ ...text(18, 500, T.forest, { "line-height": px(24) }), margin: P0 }, {}]),
]);
const ERR = box("au-cm-err-b", [{ padding: P0 }, {}], [
  w("au-cm-err-t", "e-paragraph", { paragraph: "Sorry, this couldn’t be sent. Please wait for the security check to finish and try again." }, [{ ...text(14, 500, "#c0392b", { "line-height": px(20) }), margin: P0 }, {}]),
]);

const card = div("au-cm-card", [
  { padding: pad(36, 40, 36, 40), "min-width": px(0), flex: flex(1, 1, pct(0)), "border-radius": radius(32), background: { color: "#ffffff" } },
  { tablet: { "border-radius": radius(24) }, mobile: { padding: pad(28, 22, 28, 22) } },
], [
  form("au-cm-form", { name: "Community", actions: ["ffe-mailchimp"], to: ["marketing@freshfoodexpoapac.com"], subject: "Newsletter sign-up", success: [SUCCESS], error: [ERR], styles: [{ gap: gap(18, 0) }, {}] }, [
    div("au-cm-grid", [
      { padding: P0, display: "grid", "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(18, 24) },
      { mobile: { "grid-template-columns": "minmax(0, 1fr)", gap: gap(16, 16) } },
    ], [
      fld(1, "First Name", "firstName", input("firstName", { p: "au", required: true, ac: "given-name", placeholder: "Enter first name" }), true),
      fld(2, "Last Name", "lastName", input("lastName", { p: "au", required: true, ac: "family-name", placeholder: "Enter last name" }), true),
      fld(3, "Email Address", "email", input("email", { p: "au", type: "email", required: true, ac: "email", placeholder: "Enter email address" }), true),
      fld(4, "Company Name", "company", input("company", { p: "au", ac: "organization", placeholder: "Enter company name" })),
      fld(5, "Job Title", "jobTitle", input("jobTitle", { p: "au", ac: "organization-title", placeholder: "Enter job title" })),
      fld(6, "Country", "country", select("country", { p: "au", placeholder: "Select Country", options: COUNTRIES.map((c) => [c]), v: "base", ac: "country-name" })),
      fld(7, "Contact Number", "phone", phone({ p: "au", required: false, placeholder: "Enter contact number" })),
      div("au-cm-spacer", [{ height: px(100), padding: P0, display: "block" }, { mobile: { display: "none" } }], [], { attributes: attrs([["aria-hidden", "true"]]) }),
    ]),
    div("au-cm-consent", [{ padding: P0 }, {}], [
      check("marketingConsent", CONSENT, { p: "au", value: "on", required: true, size: 18, radius: 4, border: T.accent, bw: 1.5, fs: [12, 17], gap: 12 }),
    ]),
    box("au-cm-bottom", [
      { padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 28) },
      { mobile: { "flex-direction": "column", gap: gap(16, 0) } },
    ], [
      box("au-cm-left", [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), width: AUTO, "min-width": px(0) }, { mobile: { width: pct(100), "align-items": "stretch" } }], [
        div("au-cm-ts", [{ padding: P0, width: px(300), "max-width": pct(100) }, { mobile: { width: pct(100) } }], [turnstileSlot("au")]),
        pillSubmit("au-cm-submit", "Subscribe"),
      ]),
      box("au-cm-notes", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(8, 0), "min-width": px(0), flex: flex(1, 1, pct(0)), width: AUTO }, {}], [
        w("au-cm-note1", "e-paragraph", { paragraph: "You can unsubscribe from our marketing communications at any time. For more information on how we collect, use and protect your personal data, please refer to our <a href=\"https://www.messe-berlin.asia/en/additional-pages/privacy-policy\">Privacy Policy</a>." }, NOTE),
        w("au-cm-note2", "e-paragraph", { paragraph: "We use Mailchimp as our marketing platform. By clicking below to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. Learn more about Mailchimp’s privacy practices." }, NOTE),
      ]),
    ]),
    honeypot("au"),
  ]),
], { attributes: attrs(reveal(1)) });

module.exports = [box("au-cm", mix([{ padding: P0 }, {}], NARROW([46]), [
  { display: "flex", "flex-direction": "row", "align-items": "stretch", gap: gap(0, 24) },
  { tablet_extra: { "flex-direction": "column", gap: gap(16, 0) } },
]), [intro, card], { tag: "section", _cssid: "community" })];
