// BuiltForApac (story/BuiltForApac.tsx): copy on the left, exclusive native-<details> accordion on the right (first item open).
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, radius, gap, flex, V, box, w, attrs, text, mix, reveal, SIAW_SITE, btn, svg, ruleEyebrow } = require("../../lib.js");
const { NARROW, H38, B15 } = require("../g1-shared.js");

// Atomic accordion parts: { id, elType, settings, styles, elements } like div()/box(), with the part's own elType.
// The server does not type style values on the accordion parts (they print as "Array"), so `typed` wraps them like forms.js does for the e-form.
const sizeT = (v) => ({ $$type: "size", value: { size: v.size, unit: v.unit } });
const COLOR_KEYS = ["color", "border-color", "background-color"];
const typedProp = (k, v) => {
  if (v && v.$$type) return v;
  if (COLOR_KEYS.includes(k)) return { $$type: "color", value: v };
  if (typeof v === "string") return { $$type: "string", value: v };
  if (typeof v === "number") return { $$type: "number", value: v };
  if (k === "background" && v.color) return { $$type: "background", value: { color: { $$type: "color", value: v.color } } };
  if (k === "flex") return { $$type: "flex", value: { flexGrow: { $$type: "number", value: v.flexGrow }, flexShrink: { $$type: "number", value: v.flexShrink }, flexBasis: sizeT(v.flexBasis) } };
  if (k === "border-radius") return { $$type: "border-radius-v2", value: Object.fromEntries(Object.entries(v).map(([e, x]) => [e, sizeT(x)])) };
  if (k === "border-width") return { $$type: "border-width-v2", value: Object.fromEntries(Object.entries(v).map(([e, x]) => [e, sizeT(x)])) };
  if (v["block-start"]) return { $$type: "dimensions", value: Object.fromEntries(Object.entries(v).map(([e, x]) => [e, sizeT(x)])) };
  if (k === "gap" && v.row) return { $$type: "layout-direction", value: { row: sizeT(v.row), column: sizeT(v.column) } };
  if (v.size !== undefined && v.unit) return sizeT(v);
  throw new Error(`accordion: cannot type style prop ${k}`);
};
const typedAll = (props = {}) => Object.fromEntries(Object.entries(props).map(([k, v]) => [k, typedProp(k, v)]));
const el = (id, elType, [desktop, more = {}], children = [], settings = {}) =>
  ({ id, elType, settings, styles: V(id, typedAll(desktop), Object.fromEntries(Object.entries(more).map(([bp, p]) => [bp, typedAll(p)]))), elements: children });
const ITEMS = [
  { title: "Part of Singapore International Agri-Food Week", body: "Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW), Singapore’s premier agri-food convention and flagship platform for advancing sustainable and resilient food systems in Asia.", label: "SIAW 2027", href: SIAW_SITE, w: 135 },
  { title: "Built on Global Industry Expertise", body: "Fresh Food Expo APAC is brought to you by Messe Berlin Asia Pacific, the organiser behind FRUIT LOGISTICA and Grüne Woche.", label: "Organiser", href: "/messe-berlin", w: 128 },
  { title: "Our Strategic Priorities", body: "Fresh Food Expo APAC is built around strategic priorities that guide the development of the platform and its role within Asia Pacific’s fresh food ecosystem.", label: "Fresh Food Ecosystem", href: "/ecosystem", w: 215 },
];

const item = (it, i) => {
  const id = `os-ba-i${i + 1}`;
  return el(id, "e-accordion-item", [{ padding: pad(22, 0, i === 0 ? 14 : 22, 0), ...(i < 2 && { "border-width": pad(0, 0, 1, 0), "border-style": "solid", "border-color": "#e6e6e6" }) }, {}], [
    el(`${id}-h`, "e-accordion-item-header", [{ display: "flex", "align-items": "center", "justify-content": "space-between", gap: gap(0, 16), padding: P0, cursor: "pointer" }, {}], [
      el(`${id}-tt`, "e-accordion-item-title", [{ padding: P0, display: "flex" }, {}], [
        w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: it.title, attributes: attrs([["data-acc-t", ""]]) }, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(18), "line-height": px(24), color: T.dark, margin: P0 }, {}]),
      ]),
      el(`${id}-ic`, "e-accordion-item-icon", [{ width: px(20), height: px(20), flex: flex(0, 0, AUTO), padding: P0 }, {}], [
        svg(`${id}-ic-s`, "g1-acc-chev", [{ width: px(20), height: px(20) }, {}]),
      ], { attributes: attrs([["data-acc-ic", ""]]) }),
    ], { show_icon: true }),
    el(`${id}-c`, "e-accordion-item-content", [
      { display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(10, 0), padding: pad(10, 0, 0, 0), "min-width": px(0) }, {},
    ], [
      w(`${id}-p`, "e-paragraph", { paragraph: it.body }, [{ ...text(14, 500, T.body, { "line-height": px(22) }), margin: P0 }, {}]),
      btn(`${id}-cta`, it.label, it.href, { w: it.w, h: 40, pl: 22, gap: 9.39, fs: 15, chev: "chevron-sm-white", color: T.white, bg: T.accent, border: [1, T.accent] }),
    ]),
  ]);
};

module.exports = [box("os-ba", mix([{ padding: P0 }, {}], NARROW([48, 48, 80]), [
  { display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(0, 56) },
  { tablet_extra: { "flex-direction": "column", "align-items": "stretch", gap: gap(32, 0) } },
]), [
  box("os-ba-copy", [
    { padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), width: px(640), flex: flex(0, 0, AUTO) },
    { tablet_extra: { width: pct(100), flex: flex(0, 1, AUTO) } },
  ], [
    ruleEyebrow("os-ba-eb", "Built for Asia Pacific"),
    w("os-ba-title", "e-heading", { tag: "h2", title: "Asia Pacific’s diverse markets.<br><em>A stronger fresh food future.</em>" }, H38),
    w("os-ba-p1", "e-paragraph", { paragraph: "Asia Pacific is home to highly diverse food-producing economies, major consumer markets and increasingly interconnected supply chains." }, B15(24)),
    w("os-ba-p2", "e-paragraph", { paragraph: "Across the region, businesses are navigating priorities around food security, supply chain resilience, sustainability, efficiency, innovation and access to markets." }, B15(24)),
    w("os-ba-p3", "e-paragraph", { paragraph: "Hosted in Singapore, Fresh Food Expo APAC creates a regional meeting point where businesses from across Asia Pacific can connect with international suppliers, buyers, technologies, expertise and commercial partners." }, B15(24)),
  ], { attributes: attrs(reveal(0)) }),
  el("os-ba-acc", "e-accordion", [
    { display: "flex", "flex-direction": "column", padding: pad(8, 28, 8, 28), "min-height": px(343), "min-width": px(0), flex: flex(1, 1, pct(0)), "border-radius": radius(22), background: { color: "#ffffff" } },
    { tablet_extra: { "min-height": px(0), flex: flex(0, 1, AUTO) }, mobile: { padding: pad(8, 20, 8, 20) } },
  ], ITEMS.map(item), { default_state: "first_expanded", max_expanded: "one", show_icon: true, faq_schema: false, attributes: attrs(reveal(1)) }),
], { tag: "section" })];
