// SubscribeSection (subscribe/SubscribeSection.tsx + SubscribeForm.tsx).
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, box, div, w, attrs, media, text, svg, layers, grad, at, mix, reveal, image } = require("../../lib.js");
const { form, field, input, select, phone, check, turnstileSlot, pillSubmit } = require("../../forms.js");
const { CW, H, GRID, GRIDC } = require("../g4-shared.js");
const M = media();

const COUNTRIES = ["Singapore", "Australia", "China", "Hong Kong", "India", "Indonesia", "Japan", "Malaysia", "New Zealand", "Philippines", "South Korea", "Thailand", "Vietnam", "Other"];
const CONSENT_SB = "By submitting this form, I consent to the organisers of <b>Fresh Food Expo Asia Pacific (FFE&nbsp;APAC)</b> collecting, using, processing and/or disclosing my personal information for communications and activities relating to its affiliates, partners and related events, including event updates, industry news, products and services, promotions, and other marketing communications.";

const OK = box("sb-ok-p", [{ "min-height": px(280), "border-radius": radius(20), background: { color: T.mint }, padding: pad(0, 24), margin: pad(18, 0, 0, 0), display: "flex", "align-items": "center", "justify-content": "center" }, {}], [
  w("sb-ok-t", "e-paragraph", { paragraph: "Thanks for subscribing — you’re now part of the FFE APAC community.", attributes: attrs([["role", "status"]]) }, [
    { ...text(18, 500, T.forest, { "line-height": px(24), "text-align": "center" }), margin: P0 }, {},
  ]),
]);
const ERR = w("sb-err-t", "e-paragraph", { paragraph: "Sorry, this couldn’t be sent. Please wait for the security check to finish and try again.", attributes: attrs([["role", "alert"]]) }, [
  { ...text(14, 500, "#c0392b", { "line-height": px(20) }), margin: P0 }, {},
]);
const f = (name, label, ctl, o = {}) => field(`sb-fd-${name.toLowerCase()}`, label, ctl, { for: name, required: true, ...o });

const BENEFITS = [
  ["g4-point-2", [31, 31], "New exhibitors<br>and products"],
  ["g4-b-programme", [32, 32], "Programme<br>announcements"],
  ["g4-point-3", [36, 36], "Networking<br>opportunities"],
  ["g4-point-4", [36, 36], "Industry news<br>and insights"],
];
const benefits = BENEFITS.map(([key, [iw, ih], label], k) => {
  const id = `sb-b${k + 1}`;
  return box(id, [
    {
      padding: pad(24, 12), "min-height": px(182), display: "flex", "flex-direction": "column", "align-items": "center", gap: gap(16, 0),
      "border-radius": { "start-start": px(22), "start-end": px(22), "end-start": px(0), "end-end": px(22) }, background: { color: T.mint }, "text-align": "center",
      transition: require("../../lib.js").ease(250), width: AUTO,
    },
    { hover: { "box-shadow": require("../../lib.js").shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") } },
  ], [
    box(`${id}-ring`, [{ width: px(76), height: px(76), "min-width": px(76), padding: P0, "border-radius": radius(999), background: { color: T.white }, display: "flex", "justify-content": "center", "align-items": "center", flex: flex(0, 0, AUTO) }, {}], [
      w(`${id}-icon`, "e-image", { image: image(M[key].id) }, [{ width: px(iw), height: px(ih), "max-width": custom("none") }, {}]),
    ]),
    w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: label }, [{ ...text(16, 500, "#000", { "line-height": px(21) }), margin: P0 }, {}]),
  ], { tag: "div", attributes: attrs(reveal(k)) });
});

const left = box("sb-left", [
  { padding: P0, display: "flex", "flex-direction": "column", gap: gap(24, 0), "min-width": px(0), width: px(640), flex: flex(0, 0, AUTO) },
  { tablet_extra: { width: pct(48.5) }, tablet: { width: pct(100) } },
], [
  w("sb-left-title", "e-heading", { tag: "h2", title: "Be the first to know about", attributes: attrs(reveal(0)) }, [H(36, 42), { mobile: { "font-size": px(30), "line-height": px(36) } }]),
  div("sb-benefits", [
    { padding: P0, ...GRID(4, 14) },
    { tablet_extra: { ...GRIDC(2) }, tablet: { ...GRIDC(4) }, mobile: { ...GRIDC(2) } },
  ], benefits),
  div("sb-card", [
    { position: "relative", overflow: "hidden", padding: P0, height: px(384), "border-radius": radius(30), background: { color: "#d9d9d9" }, width: pct(100) },
    { tablet: { "border-radius": radius(24) }, mobile: { height: px(340) } },
  ], [
    w("sb-card-img", "e-image", { image: image(M["g4-card"].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...at(px(0), px(0), px(0), px(0)), width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
    div("sb-card-shade", [{ ...at(px(0), px(0), px(0), px(0)), padding: P0, background: layers(grad(180, [["rgba(40,174,61,0)", 30], [T.accent, 100]])) }, {}]),
    w("sb-card-t", "e-paragraph", { paragraph: "A connected <br>ecosystem for a <br>healthier tomorrow.", attributes: attrs([["data-br-md", ""]]) }, [
      { ...H(38, 44, T.white), "max-width": custom("min(536px, 100% - 56px)"), ...at(px(200), null, null, px(28)) },
      { mobile: { ...H(30, 36, T.white), "max-width": custom("min(536px, 100% - 48px)"),"inset-block-start": AUTO, "inset-block-end": px(60), "inset-inline-start": px(24) } },
    ]),
    div("sb-card-rule", [
      { ...at(px(348), null, null, px(28)), width: px(64), height: px(5), padding: P0, "border-radius": radius(3), background: { color: T.white } },
      { mobile: { "inset-block-start": AUTO, "inset-block-end": px(31), "inset-inline-start": px(24) } },
    ], [], { attributes: attrs([["aria-hidden", "true"]]) }),
    svg("sb-card-dots", "g4-sb-dots", [{ ...at(px(180), px(1), null, null), width: px(47), height: px(47) }, { mobile: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  ], { attributes: attrs([["data-group", ""], ...reveal(0)]) }),
]);

const formcard = div("sb-formcard", [
  { position: "relative", overflow: "hidden", "min-width": px(0), flex: flex(1, 1, pct(0)), padding: pad(40, 36), background: { color: T.white }, "border-radius": radius(28) },
  { tablet: { "border-radius": radius(24) }, mobile: { padding: pad(32, 22) } },
], [
  w("sb-form-title", "e-heading", { tag: "h2", title: "Subscribe to our updates" }, [H(32, 38), { mobile: { "font-size": px(28), "line-height": px(34) } }]),
  form("sb-form", {
    name: "subscribe", actions: ["ffe-mailchimp"], to: ["marketing@freshfoodexpoapac.com"], subject: "Newsletter sign-up", success: [OK], error: [ERR],
    styles: [{ padding: P0, position: "relative", margin: pad(18, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(18, 0) }, {}],
  }, [
    div("sb-form-grid", [{ padding: P0, ...GRID(2, 18, 20) }, { mobile: { ...GRIDC(1), gap: gap(16, 16) } }], [
      f("firstName", "First Name", input("firstName", { p: "sb", required: true, placeholder: "John", ac: "given-name" })),
      f("lastName", "Last Name", input("lastName", { p: "sb", required: true, placeholder: "Doe", ac: "family-name" })),
      f("email", "Email Address", input("email", { p: "sb", type: "email", required: true, placeholder: "you@company.com", ac: "email" })),
      f("company", "Company Name", input("company", { p: "sb", required: true, placeholder: "Your Company Name", ac: "organization" })),
      f("jobTitle", "Job Title", input("jobTitle", { p: "sb", required: true, placeholder: "e.g. Marketing Manager", ac: "organization-title" })),
      f("country", "Country", select("country", { p: "sb", required: true, placeholder: "Select Country", ac: "country-name", options: COUNTRIES.map((c) => [c]) })),
      f("phone", "Contact Number", phone({ p: "sb" }), { span: true }),
    ]),
    div("sb-consent", [{ padding: pad(6, 0, 0, 0) }, {}], [check("marketingConsent", CONSENT_SB, { p: "sb", value: "yes", required: true, size: 22, link: "dark" })]),
    turnstileSlot("sb"),
    div("sb-submit-row", [{ padding: pad(8, 0, 0, 0) }, {}], [pillSubmit("sb-submit", "Subscribe", { color: T.white, bg: T.accent })]),
  ]),
  svg("sb-leaf", "g4-sb-leaf", [{ ...at(null, px(0), px(0), null), width: px(195.818), height: px(106.365), "max-width": custom("none") }, { mobile: { display: "none" } }], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
], { attributes: attrs(reveal(1)) });

module.exports = [box("sb-sec", mix(CW(1320), [
  { padding: pad(40, 0, 0, 0), margin: mtAuto(0), display: "flex", "flex-direction": "row", "align-items": "stretch", gap: gap(0, 32) },
  { tablet: { "flex-direction": "column", gap: gap(32, 0) } },
]), [left, formcard], { tag: "section" })];
