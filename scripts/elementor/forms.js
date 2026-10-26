// Atomic-form helpers (pages plan 3.3): the e-form family, styled like globals.css .input / .checkbox / .pill.
// Variants: v "base" = .input (46px, radius 12, 14px; contact, subscribe, community); "apply" = 48px, radius 10, 15px (apply, visit).
// The element id of every control is `${p}-f-${name}` (the posted $form_data is keyed by it); `_cssid` is the field name (the DOM id and the label's `for`).
const fs = require("fs");
const path = require("path");
const L = require("./lib.js");
const { T, OUTFIT, px, pct, custom, pad, P0, AUTO, radius, gap, flex, link, V, box, div, w, attrs, svg, text, NORMAL, HIDE, ease, lift, shadow, mix, at, FILL } = L;

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const str = (v) => ({ $$type: "string", value: v });
const strs = (a) => ({ $$type: "string-array", value: a.map(str) });
// Element ids must be lowercase: Elementor lowercases a style's id, so a capital in the id (…-firstName) orphans every local style. _cssid keeps the field name.
const fid = (p, name) => `${p}-f-${slug(name)}`;
const kv = (k, v) => ({ $$type: "key-value", value: { key: str(k), value: str(v) } });

// Variant boxes: [height, radius, font-size, padding-inline, select padding-right, chevron top/right].
const VARIANT = {
  base: { h: 46, r: 12, fs: 14, pi: 16, sel: 44, chev: [14, 16] },
  apply: { h: 48, r: 10, fs: 15, pi: 16, sel: 48, chev: [15, 18] },
};
const FIELD = (v) => ({
  ...text(VARIANT[v].fs, 500, "#000", { "line-height": px(23) }),
  width: pct(100), height: px(VARIANT[v].h), padding: pad(0, VARIANT[v].pi), margin: P0, "border-radius": radius(VARIANT[v].r),
  "border-width": pad(1), "border-style": "solid", "border-color": "#cdcdcd", background: { color: T.white }, transition: ease(250), "box-sizing": "border-box",
});

// The server types style values for ordinary containers and widgets, but not for the e-form element or its message containers: their props must arrive fully typed.
const sizeT = (v) => ({ $$type: "size", value: { size: v.size, unit: v.unit } });
const typedProp = (k, v) => {
  if (v && v.$$type) return v;
  if (typeof v === "string") return { $$type: "string", value: v };
  if (typeof v === "number") return { $$type: "number", value: v };
  if ((k === "padding" || k === "margin") && v["block-start"]) return { $$type: "dimensions", value: Object.fromEntries(Object.entries(v).map(([e, s]) => [e, sizeT(s)])) };
  if (k === "gap" && v.row) return { $$type: "layout-direction", value: { row: sizeT(v.row), column: sizeT(v.column) } };
  if (v.size !== undefined && v.unit) return sizeT(v);
  throw new Error(`form(): cannot type style prop ${k}; pass it as {$$type, value}`);
};
const typedStyles = (id, desktop, more = {}) => {
  const t = (props) => Object.fromEntries(Object.entries(props).map(([k, v]) => [k, typedProp(k, v)]));
  return V(id, t(desktop), Object.fromEntries(Object.entries(more).map(([bp, props]) => [bp, t(props)])));
};

// form(id, o, children): the e-form. o = { name, to: string[], subject, success: node[], error: node[], styles: [desktop, more], replyTo = "[email]" }.
// The form's own box defaults to padding 0 and the group's column layout (Elementor's base is padding 20, gap 10). success / error nodes go into the message containers.
const form = (id, o, children) => {
  const { name, to, subject, success = [], error = [], styles = [{}, {}], replyTo = "[email]" } = o;
  // Elementor prints x-data="eForm<element id>", an Alpine expression: a hyphen in the id reads as a subtraction ("eFormct - form": Undefined variable, no submit handler). So the e-form's own id has none ("ct-form" -> "ctform"); its children keep ${id}-… ids.
  const eid = id.replace(/-/g, "");
  const email = { $$type: "emails", value: { to: strs(to), subject: str(subject), message: str("[all-fields]"), ...(replyTo && { "reply-to": str(replyTo) }) } };
  const msg = (type, kids) => { const mid = `${id}-${type === "e-form-success-message" ? "ok" : "err"}`; return { id: mid, elType: type, settings: {}, styles: typedStyles(mid, { padding: P0 }), elements: kids }; };
  const [d, more] = mix([{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(0, 0) }, {}], styles);
  return {
    id: eid, elType: "e-form",
    settings: { "form-name": str(name), "actions-after-submit": strs(["email"]), email },
    styles: typedStyles(eid, d, more),
    elements: [...children, ...(success.length ? [msg("e-form-success-message", success)] : []), ...(error.length ? [msg("e-form-error-message", error)] : [])],
  };
};

// field(id, label, control, o): FormField. A column holding the label and the control. o = { for /* control _cssid */, required, span /* grid-column: 1 / -1, via kit CSS */, label = [14, 18] /* [font-size, line-height] */, gap = 8, styles }.
// required: the label gets a real " *" run (kit CSS colours it; the reference has it as text, so line widths match) and the control gets aria-label = the plain label,
// which the form handler prefers over the label's text, so the emailed field names stay clean.
const plain = (h) => h.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
const findByCssid = (n, id) => (n.settings?._cssid === id ? n : (n.elements || []).map((c) => findByCssid(c, id)).find(Boolean));
const field = (id, label, control, o = {}) => {
  const { for: forId, required, span, label: lab = [14, 18], gap: g = 8, styles = [{}, {}] } = o;
  if (required) {
    const c = findByCssid(control, forId);
    if (!c) throw new Error(`field ${id}: no control with _cssid ${forId}`);
    (c.settings.attributes ??= attrs([])).value.push(...attrs([["aria-label", plain(label)]]).value);
  }
  return div(id, mix([{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(g, 0), "min-width": px(0) }, {}], styles), [
    w(`${id}-l`, "e-form-label", { text: required ? `${label}<span> *</span>` : label, "input-id": forId, ...(required && { attributes: attrs([["data-req", ""]]) }) }, [
      { ...text(lab[0], 500, "#000", { "line-height": px(lab[1]) }), margin: P0, display: "block" }, {},
    ]),
    control,
  ], span ? { attributes: attrs([["data-span", ""]]) } : {});
};

// input(name, o): e-form-input.
const input = (name, o = {}) => {
  const { p, type = "text", placeholder, required, v = "base", attrs: extra = [], id: eid } = o;
  return w(eid ?? fid(p, name), "e-form-input", {
    type, ...(placeholder && { placeholder }), ...(required && { required: true }), _cssid: name,
    attributes: attrs([["data-ffe-input", ""], ...(o.ac ? [["data-ac", o.ac]] : []), ...extra]),
  }, [FIELD(v), {}]);
};

// textarea(name, o): o.h = [mobile, tablet, desktop] height.
const textarea = (name, o = {}) => {
  const { p, placeholder, required, v = "base", h = [120, 120, 120], attrs: extra = [] } = o;
  return w(fid(p, name), "e-form-textarea", {
    ...(placeholder && { placeholder }), ...(required && { required: true }), resizable: true, _cssid: name, attributes: attrs([["data-ffe-input", ""], ...extra]),
  }, [
    { ...FIELD(v), height: px(h[2]), "min-height": px(96), padding: pad(14, VARIANT[v].pi, 0, VARIANT[v].pi), display: "block", "align-items": "flex-start" },
    { tablet: { height: px(h[1]) }, mobile: { height: px(h[0]) } },
  ]);
};

// select(name, o): a relative wrapper with the e-form-select and the chevron. o = { p, placeholder, options: [label, value?][], required, v, value }.
const select = (name, o = {}) => {
  const { p, placeholder, options = [], required, v = "base", ac, id: eid } = o, vt = VARIANT[v], id = eid ?? fid(p, name);
  const opts = [...(placeholder ? [[placeholder, ""]] : []), ...options].map(([label, value = label]) => kv(label, value));
  return box(`${id}-w`, [{ position: "relative", padding: P0, display: "block", width: pct(100) }, {}], [
    w(id, "e-form-select", {
      options: { $$type: "options", value: opts }, ...(required && { required: true }), _cssid: name,
      attributes: attrs([["data-ffe-input", ""], ...(placeholder ? [["data-ph", ""]] : []), ...(ac ? [["data-ac", ac]] : [])]),
    }, [{ ...FIELD(v), padding: pad(0, vt.sel, 0, vt.pi), cursor: "pointer" }, {}]),
    svg(`${id}-chev`, "icon-chevron-down", [{ ...at(px(vt.chev[0]), px(vt.chev[1]), null, null), width: px(18), height: px(18) }, {}], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  ]);
};

// dialOptions(): the PhoneInput list from src/components/dialCodes.ts: DIAL_TOP, a disabled separator, then DIAL_ALL. Label = value = "Country (+code)".
const dialOptions = () => {
  const src = fs.readFileSync(path.join(__dirname, "../../src/components/dialCodes.ts"), "utf8");
  const cut = src.indexOf("export const DIAL_ALL");
  const rows = (s) => [...s.matchAll(/\["([^"]+)", "([^"]+)", "[a-z]{2}"\]/g)].map(([, c, d]) => `${c} (${d})`);
  const top = rows(src.slice(0, cut)), all = rows(src.slice(cut));
  return [...top.map((l) => [l, l]), ["────────", "-"], ...all.map((l) => [l, l])];
};

// phone(o): PhoneInput. o = { p, split = false, required = true, placeholder = "8123 4567" }. The snippet mirrors the chosen code into [data-dial-code] and the flag into [data-dial-flag].
const phone = (o = {}) => {
  const { p, split = false, required = true, placeholder = "8123 4567" } = o, id = `${p}-f-phone`;
  const sp = split;
  // The picked country's flag (public/flags/<iso>.svg, served at /flags/): kit CSS draws Singapore's, the snippet swaps it on change.
  const flag = div(`${id}-flag`, [{ width: px(22), height: px(15), "min-width": px(22), padding: P0, "border-radius": radius(2), "border-width": pad(1), "border-style": "solid", "border-color": "#e0e0e0", "box-sizing": "border-box" }, {}],
    [], { attributes: attrs([["aria-hidden", "true"], ["data-dial-flag", ""]]) });
  const code = w(`${id}-code`, "e-paragraph", { tag: "span", paragraph: "+65", attributes: attrs([["data-dial-code", ""], ["data-untrim", ""]]) }, [
    { ...text(sp ? VARIANT.apply.fs : 14, 500, "#000", { "line-height": px(19) }), margin: P0, "flex-shrink": 0 }, {},
  ]);
  const chev = svg(`${id}-chev`, "icon-chevron-down-sm", [{ width: px(14), height: px(14), "min-width": px(14) }, {}], { attributes: attrs([["aria-hidden", "true"]]) });
  const dial = w(`${p}-f-dial`, "e-form-select", {
    options: { $$type: "options", value: dialOptions().map(([l, v]) => kv(l, v)) }, "has-default-value": true, value: "Singapore (+65)", _cssid: "dialCode",
    attributes: attrs([["aria-label", "Country calling code"]]),
  }, [{ ...at(px(0), px(0), px(0), px(0)), width: pct(100), height: pct(100), opacity: 0, cursor: "pointer", padding: P0, margin: P0, "border-width": pad(0) }, {}]);
  const trigger = box(`${id}-trg`, [
    { position: "relative", padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 10), width: AUTO, "flex-shrink": 0,
      ...(sp && { "min-width": px(46), "justify-content": "flex-end", "align-self": "stretch" }) }, {},
  ], sp ? [flag, chev, dial] : [code, chev, dial]);
  const divider = (k) => div(`${id}-div${k}`, [{ width: px(1), "min-width": px(1), height: px(sp ? 24 : 22), padding: P0, background: { color: "#e0e0e0" } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) });
  const number = w(`${id}-n`, "e-form-input", {
    type: "tel", placeholder, ...(required && { required: true }), _cssid: "phone",
  }, [{
    ...text(sp ? VARIANT.apply.fs : 14, 500, "#000", { "line-height": px(19) }),
    flex: flex(1, 1, px(0)), "min-width": px(0), height: pct(100), padding: P0, margin: P0, "border-width": pad(0), "border-radius": radius(0), background: { color: "transparent" }, outline: "none",
  }, {}]);
  const vt = sp ? VARIANT.apply : VARIANT.base;
  return box(id, [
    { ...FIELD(sp ? "apply" : "base"), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 10), padding: pad(0, 16, 0, 14) }, {},
  ], sp ? [trigger, divider(1), code, divider(2), number] : [flag, trigger, divider(1), number], { attributes: attrs([["data-ffe-input", ""], ["data-ffe-dial", ""]]) });
};

// countrySelect(name, o): the VisitorForm CountrySelect as a text input that the snippet turns into a combobox from data-ffe-countries ("A|B|C").
const countrySelect = (name, o = {}) => {
  const { p, placeholder = "Search country / region", required = true, v = "apply" } = o, vt = VARIANT[v], id = fid(p, name);
  const src = fs.readFileSync(path.join(__dirname, "../../src/components/register/countries.ts"), "utf8");
  const list = JSON.parse(src.match(/\[[^\]]*\]/)[0]);
  return box(`${id}-w`, [{ position: "relative", padding: P0, display: "block", width: pct(100) }, {}], [
    w(id, "e-form-input", {
      type: "text", placeholder, ...(required && { required: true }), _cssid: name, autocomplete: false,
      attributes: attrs([["data-ffe-input", ""], ["data-ffe-countries", list.join("|")] /* attribute values are printed unescaped: no double quotes, so not JSON */]),
    }, [{ ...FIELD(v), padding: pad(0, vt.sel, 0, vt.pi) }, {}]),
    svg(`${id}-chev`, "icon-chevron-down", [{ ...at(px(vt.chev[0]), px(vt.chev[1]), null, null), width: px(18), height: px(18) }, {}], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  ]);
};

// check(name, label, o) / radio(name, label, o): a row of control + e-form-label. The label may hold <a>, <b>, <strong>.
// o = { p, value, required, size = 20, radius = 5, border = "#a8a8a8", bw = 1.5, fs = [13, 19], gap = 14, attrs, styles, labelStyles, link /* "dark" | "accent": how <a> in the label looks */ }.
const choice = (type, name, label, o = {}) => {
  const { p, value, required, size = 20, radius: r = 5, border = "#a8a8a8", bw = 1.5, fs = [13, 19], gap: g = 14, attrs: extra = [], styles = [{}, {}], labelStyles = [{}, {}], link } = o;
  const eid = `${fid(p, name)}${value ? "-" + slug(value) : ""}`;
  return box(`${eid}-row`, mix([{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, g), width: AUTO, "min-width": px(0) }, {}], styles), [
    w(eid, type === "check" ? "e-form-checkbox" : "e-form-radio-button", {
      name, ...(required && { required: true }), _cssid: eid,
      // the `value` setting is printed unquoted and escaped twice ("Eggs & Dairy" posts as "Eggs&#x20;&amp;&#x20;Dairy"): print it as a quoted attribute instead
      attributes: attrs([[type === "check" ? "data-ffe-check" : "data-ffe-radio", ""], ...(value ? [["value", value]] : []), ...extra]),
    }, [{
      width: px(size), height: px(size), "min-width": px(size), margin: P0, padding: P0, "border-radius": type === "check" ? radius(r) : radius(999),
      "border-width": pad(bw), "border-style": "solid", "border-color": border, "box-sizing": "border-box",
    }, {}]),
    w(`${eid}-l`, "e-form-label", { text: label, "input-id": eid, ...(link && { attributes: attrs([["data-link", link]]) }) }, mix([{ ...text(fs[0], 500, T.body, { "line-height": px(fs[1]) }), margin: P0, display: "block", cursor: "pointer", flex: flex(1, 1, px(0)), "min-width": px(0) }, {}], labelStyles)),
  ]);
};
const check = (name, label, o) => choice("check", name, label, o);
const radio = (name, label, o) => choice("radio", name, label, o);

// honeypot(p): a hidden text field the edge script used to reject (not checked yet, see plan 3.6).
const honeypot = (p) =>
  w(`${p}-f-website`, "e-form-input", { type: "text", _cssid: "website", autocomplete: false, attributes: attrs([["tabindex", "-1"], ["aria-hidden", "true"], ["autocomplete", "off"]]) }, [{ display: "none" }, {}]);

// turnstileSlot(p): keeps the 71px the loaded Turnstile widget takes in the reference (65px iframe + the inline line gap); the widget itself is unwired (plan 3.6).
const turnstileSlot = (p) => div(`${p}-f-turnstile`, [{ padding: P0, "min-height": px(71), width: pct(100) }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) });

// pillSubmit(id, label, o): e-form-submit-button looking like pill(). o = { color, bg, w, styles }.
const pillSubmit = (id, label, o = {}) => {
  const { color = T.white, bg = T.accent, w: width, styles = [{}, {}] } = o;
  return w(id, "e-form-submit-button", { text: `${label}⁠<span>›</span>`, attributes: attrs([["data-btn", ""], ["data-pill", ""], ["data-nowrap-md", ""]]) }, mix([
    {
      ...text(18, 500, color, { "line-height": px(24), "letter-spacing": px(0.36), "text-align": "center" }),
      position: "relative", display: "inline-flex", "align-items": "center", "justify-content": "center", gap: gap(0, 0), cursor: "pointer",
      width: width ? px(width) : AUTO, ...(width && { "max-width": pct(100) }), height: px(52), padding: pad(0, 28), margin: P0, "border-radius": radius(999), "border-width": pad(0), background: { color: bg }, transition: ease(250),
    },
    {
      hover: { transform: lift, "box-shadow": shadow(0, 10, 24, -10, "rgba(2,93,3,0.45)") },
      mobile: { height: AUTO, "min-height": px(44), padding: pad(10, 22), "font-size": px(16), "letter-spacing": px(0.32) },
    },
  ], styles));
};

module.exports = { form, field, input, textarea, select, phone, dialOptions, countrySelect, check, radio, honeypot, turnstileSlot, pillSubmit, slug };
