// G5-internal shared data and builders for ApplyForm (ax) and VisitorForm (rf). Pure: no side effects.
const fs = require("fs");
const path = require("path");
const { T, FREDOKA, px, pct, pad, P0, AUTO, radius, gap, flex, box, div, w, attrs, svg, text } = require("../lib.js");
const F = require("../forms.js");
const { turnstileSlot, honeypot, pillSubmit, field, slug } = F;

const { check, radio } = F;

const src = (f) => fs.readFileSync(path.join(__dirname, "../../../src/components", f), "utf8");
const list = (s, name) => JSON.parse(s.match(new RegExp(`const ${name}\\s*=\\s*(\\[[\\s\\S]*?\\n?\\]);`))[1].replace(/,\s*\]/g, "]"));
const AF = src("apply/ApplyForm.tsx"), VF = src("register/VisitorForm.tsx");
const esc = (s) => s.replace(/&/g, "&amp;");

const PARTICIPATION = list(AF, "PARTICIPATION");
const APPLY_ACTIVITY = list(AF, "ACTIVITY");
const COUNTRIES_14 = ["Singapore", "Australia", "China", "Hong Kong", "India", "Indonesia", "Japan", "Malaysia", "New Zealand", "Philippines", "South Korea", "Thailand", "Vietnam", "Other"];
const SALUTATION = list(VF, "SALUTATION"), VISIT_ACTIVITY = list(VF, "ACTIVITY"), PRODUCTS = list(VF, "PRODUCTS");
const PRIVACY_APPLY = "https://www.messe-berlin.de/en/extra-pages/data-protection";
const PRIVACY_VISIT = "https://www.messe-berlin.asia/en/additional-pages/privacy-policy";
const BOX = { size: 20, radius: 4, border: "#8a8a8a", bw: 1.5 };

const MKT = "By submitting this form, I consent to the organisers of Fresh Food Expo Asia Pacific";
const MKT_TAIL = " collecting, using, processing and/or disclosing my personal information for communications and activities relating to its affiliates, partners and related events, including event updates, industry news, products and services, promotions, and other marketing communications.";
const MKT_APPLY = `${MKT} (FFE&nbsp;APAC)${MKT_TAIL}`; // the source has a literal U+00A0 here
const MKT_VISIT = MKT + MKT_TAIL;
const TERMS_APPLY = `I have read, understood, and agree to the <a href="${PRIVACY_APPLY}" target="_blank">Terms of Service</a>. I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal data for the purpose of processing my registration and managing my account.`;
const TERMS_VISIT = `I have read, understood, and agree to the Terms of Service. I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal data for the purpose of processing my registration and managing my account. <a href="${PRIVACY_VISIT}" target="_blank">${PRIVACY_VISIT}</a>`;

const applyField = (p, name, label, control, { required, span } = {}) =>
  field(`${p}-fld-${slug(name)}`, label, control, { for: name, label: [15, 19], required, span });

// RuleHeading: row `id` holding the h2 `${base}-title` and the 36x2 rule `${base}-rule`. o = { color, font: [desk, more] /* h2 */, row: [desk, more], attrs }.
const ruleHeading = (id, base, title, o = {}) => {
  const { color = T.accent, font = [{}, {}], row = [{}, {}], attrs: ex = [] } = o;
  return box(id, [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 16), ...row[0] }, row[1]], [
    w(`${base}-title`, "e-heading", { tag: "h2", title }, [{ "font-family": FREDOKA, "font-weight": "600", color, margin: P0, ...font[0] }, font[1]]),
    div(`${base}-rule`, [{ width: px(36), "min-width": px(36), height: px(2), padding: P0, "border-radius": radius(1), background: { color: T.accent }, "flex-shrink": 0 }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
  ], ex.length ? { attributes: attrs(ex) } : {});
};

const li = (id, child, last, auto) => div(id, [{ display: "block", padding: P0, margin: pad(0, 0, last ? 0 : 14, 0), ...(auto && { width: AUTO }) }, {}], [child], { attributes: attrs([["role", "listitem"]]) });
// optionList(id, liPrefix, nodes, { cols, allLast }): block list of li()s; `cols` adds data-g5-cols (columns come from page CSS).
const optionList = (id, liPrefix, nodes, { cols, allLast } = {}) =>
  div(id, [{ display: "block", padding: P0 }, {}], nodes.map((n, k) => li(`${liPrefix}${k + 1}`, n, allLast || k === nodes.length - 1)), { attributes: attrs([["role", "list"], ...(cols ? [["data-g5-cols", ""]] : [])]) });

const REQ = "<span> *</span>";
const label15 = { ...text(15, 500, "#000", { "line-height": px(19) }), margin: P0 };
const group = (p, key, label, children, { radio = false, required = true, gap: g = 16 } = {}) =>
  div(`${p}-g-${slug(key)}`, [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(g, 0), "min-width": px(0) }, {}], [
    w(`${p}-g-${slug(key)}-label`, "e-paragraph", { paragraph: label + (required ? REQ : ""), _cssid: `${key}-label`, ...(required && { attributes: attrs([["data-req", ""]]) }) }, [label15, {}]),
    ...children,
  ], { attributes: attrs([["role", radio ? "radiogroup" : "group"], ["aria-labelledby", `${key}-label`], ...(radio ? [["aria-required", "true"]] : []), ["data-span", ""]]) });

const consent = (p, name, html) =>
  div(`${p}-c-${slug(name)}`, [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0) }, {}], [
    w(`${p}-c-${slug(name)}-p`, "e-paragraph", { paragraph: html + REQ, _cssid: `${name}-label`, attributes: attrs([["data-req", ""]]) }, [{ ...text(13, 500, T.body, { "line-height": px(19) }), margin: P0 }, {}]),
    check(name, "I agree", { p, value: "I agree", required: true, ...BOX }),
  ], { attributes: attrs([["role", "group"], ["aria-labelledby", `${name}-label`], ["data-span", ""]]) });

// Event-detail row: 24px icon + text (ax Event Details, rf venue). fs = [md+, phone].
const detRow = (id, icon, html, fs = [18, 17]) =>
  box(id, [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 12) }, {}], [
    svg(`${id}-i`, icon, [{ width: px(24), height: px(24), "min-width": px(24), "flex-shrink": 0 }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
    w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: html }, [{ ...text(fs[0], 500, "#000", { "line-height": px(23) }), margin: P0 }, { mobile: { "font-size": px(fs[1]) } }]),
  ], { attributes: attrs([["role", "listitem"]]) });

const tsSlot = (p) => turnstileSlot(p);
const submitRow = (p, label) => div(`${p}-submit-row`, [{ padding: P0 }, {}], [pillSubmit(`${p}-submit`, label, { w: 300, color: T.white, bg: T.accent })]);
const sendError = (p) => w(`${p}-err`, "e-paragraph", { paragraph: "Sorry, this couldn’t be sent. Please wait for the security check to finish and try again." }, [{ ...text(14, 500, "#c0392b", { "line-height": px(20) }), margin: P0 }, {}]);
const applySuccess = (p) =>
  box(`${p}-ok`, [{ padding: pad(0, 24), "min-height": px(240), display: "flex", "justify-content": "center", "align-items": "center", "border-radius": radius(20), background: { color: T.mint } }, {}], [
    w(`${p}-ok-t`, "e-paragraph", { paragraph: "Thank you — your enquiry has been sent. A member of our sales team will contact you within three business days." }, [{ ...text(18, 500, T.forest, { "line-height": px(24), "text-align": "center" }), margin: P0 }, {}]),
  ]);
const visitSuccess = (p) => {
  const pr = (id, html, desk, more = {}, extra = {}) => w(`${p}-ok-${id}`, "e-paragraph", { paragraph: html, ...extra }, [{ margin: P0, ...desk }, more]);
  return box(`${p}-ok`, [
    { padding: pad(64, 40), display: "flex", "flex-direction": "column", "align-items": "center", gap: gap(14, 0), "border-radius": radius(20), background: { color: T.mint }, "text-align": "center" },
    { mobile: { padding: pad(48, 22) } },
  ], [
    pr("eyebrow", "Submission Confirmation", text(15, 600, T.accent, { "line-height": px(19), "letter-spacing": px(0.3), "text-transform": "uppercase" })),
    pr("title", "Thank you for registering your interest!", { "font-family": FREDOKA, "font-size": px(32), "font-weight": "600", "line-height": px(40), color: T.forest }, { mobile: { "font-size": px(26), "line-height": px(32) } }),
    pr("body", "Your interest in <strong>Fresh Food Expo APAC 2027</strong> has been received. Our team will keep you updated on event developments, registration announcements and relevant participation opportunities.", { ...text(17, 500, T.body, { "line-height": px(25) }), "max-width": px(640) }),
    pr("when", "<strong>Fresh Food Expo APAC 2027</strong><br>16–18 November 2027<br>Sands Expo &amp; Convention Centre, Singapore", { ...text(16, 500, T.body, { "line-height": px(24) }), margin: pad(10, 0, 0, 0) }),
    pr("tag", "Connecting Fresh Food, Technology, Logistics and Distribution — From Farm to Fork.", text(16, 600, T.forest, { "line-height": px(24) })),
  ]);
};

module.exports = { PARTICIPATION, APPLY_ACTIVITY, COUNTRIES_14, SALUTATION, VISIT_ACTIVITY, PRODUCTS, PRIVACY_APPLY, PRIVACY_VISIT, BOX, MKT_APPLY, MKT_VISIT, TERMS_APPLY, TERMS_VISIT,
  esc, check, radio, detRow, applyField, ruleHeading, li, optionList, group, consent, tsSlot, honeypot, submitRow, sendError, applySuccess, visitSuccess, label15 };
