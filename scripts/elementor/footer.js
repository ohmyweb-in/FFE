// Site footer (Theme Builder "Footer"): port of src/components/home/{Partners,Footer,FooterNav}.tsx.
// Partners strip, then logo + tagline + socials, the four link columns (an accordion on phones), copyright.
// Run: node footer.js   (FOOTER_ID=33 rebuilds the existing template)
const { call, php, guard, stamp, T, OUTFIT, px, pct, pad, P0, gap, link, image, box, div, w, media, HIDE, mtAuto, attrs } = require("./lib.js");

const M = media();
const PRIVACY = "https://www.messe-berlin.asia/en/additional-pages/privacy-policy";

// Partners.tsx
const SUPPORTED = ["partner-sfa", "partner-temasek", "partner-esg", "partner-secb"];
const ROLES = [
  ["Organising Partner", "partner-messe", 395],
  ["Held In", "partner-sg", 315],
  ["Participating Event Of", "partner-siaw", 365],
];
// Footer.tsx
const SOCIAL = [
  ["LinkedIn", "social-linkedin", "https://www.linkedin.com/showcase/freshfoodexpoapac/"],
  ["Facebook", "social-facebook", "https://www.facebook.com/profile.php?id=61595410562693"],
  ["YouTube", "social-youtube", "https://www.youtube.com/@FreshFoodExpoAPAC"],
  ["Instagram", "social-instagram", "https://www.instagram.com/freshfoodexpo_apac"],
];
// FooterNav.tsx: `grow` = desktop column flex-grow (0 = sized to content), `max` = width where links wrap.
const COLS = [
  { key: "about", title: "About", grow: 225, max: 201, links: [["Overview", "/about"], ["Our Story", "/our-story"], ["Fresh Food Ecosystem", "/ecosystem"], ["Singapore International Agri-Food Week", "/siaw"], ["Messe Berlin", "/messe-berlin"], ["Contact Us", "/contact"]] },
  { key: "exhibit", title: "Exhibit", grow: 230, max: 190, links: [["Why Exhibit", "/why-exhibit"], ["Who Should Exhibit", "/who-should-exhibit"], ["Apply to Exhibit", "/apply-to-exhibit"]] },
  { key: "visit", title: "Visit", grow: 185, links: [["Why Visit", "/why-visit"], ["Who Should Visit", "/who-should-visit"], ["Plan Your Visit", "/plan-your-visit"], ["Register Your Interest", "/register-to-visit"]] },
  { key: "news", title: "News & Media", grow: 0, links: [["News & Press Release", "/news"], ["Gallery", "/gallery"], ["Subscribe Newsletter", "/subscribe"]] },
];

// The reference trims every text box to its cap height, so its 25px list gap measures 37px line to line.
// Elementor keeps full line boxes (126% of 18px), hence the smaller gaps and margins here.
const LINK_GAP = 14.5;
const lead = (more = {}) => ({ "font-family": OUTFIT, "font-size": px(18), "font-weight": "500", color: T.body, "line-height": pct(126), ...more });
const ease = { $$type: "transition", value: [{ $$type: "selection-size", value: { selection: { $$type: "key-value", value: { key: { $$type: "string", value: "Color" }, value: { $$type: "string", value: "color" } } }, size: { $$type: "size", value: { size: 250, unit: "ms" } } } }] };
const footerLink = (id, label, href) => w(id, "e-paragraph", { tag: "span", paragraph: label, link: link(href) }, [{ ...lead(), transition: ease }, { hover: { color: T.accent }, mobile: { "font-size": px(17) } }]);

/* ── Partners strip ───────────────────────────────────────────────────────────────────── */
// Green label with a rule either side (Figma 1269:412).
const label = (id, text, more = {}) =>
  box(id, [{ width: pct(100), height: px(25), padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 4), ...more }], [
    div(`${id}-l`, [{ height: px(1), "min-width": px(0), padding: P0, background: { color: T.accent }, flex: { flexGrow: 1, flexShrink: 1, flexBasis: px(0) } }]),
    w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: text }, [
      { "font-family": OUTFIT, "font-size": px(20), "font-weight": "600", "letter-spacing": { size: 0.02, unit: "em" }, "text-transform": "uppercase", color: T.accent, "line-height": pct(125), flex: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" } },
      { tablet: { "font-size": px(16) } },
    ]),
    div(`${id}-r`, [{ height: px(1), "min-width": px(0), padding: P0, background: { color: T.accent }, flex: { flexGrow: 1, flexShrink: 1, flexBasis: px(0) } }]),
  ]);
const logo = (id, key, more = {}, tablet = {}) => w(id, "e-image", { image: image(M[key].id) }, [{ height: px(90), width: "auto", ...more }, { tablet: { height: px(60), ...tablet }, mobile: { height: px(56) } }]);

const partners = box("partners", [
  { width: pct(100), "max-width": px(T.maxw + 64), padding: pad(0, 32), margin: mtAuto(96), display: "flex", "flex-direction": "column", "align-items": "center" },
  { tablet: { margin: mtAuto(80) }, mobile: { padding: pad(0, 26), margin: mtAuto(47) } },
], [
  label("supported", "Supported By", { "max-width": px(755) }),
  box("supported-logos", [
    { width: pct(100), padding: P0, margin: pad(26, 0, 0, 0), display: "flex", "flex-direction": "row", "flex-wrap": "wrap", "justify-content": "center", "align-items": "center", gap: gap(20, 78) },
    { tablet: { margin: pad(20, 0, 0, 0), gap: gap(20, 40) }, mobile: { gap: gap(20, 32) } },
  ], SUPPORTED.map((k) => logo(`logo-${k.slice(8)}`, k))),
  // Figma 1268:222: 395 / 315 / 365 wide, 9.3% apart; stacked below lg.
  box("roles", [
    { width: pct(100), padding: P0, margin: pad(76, 0, 0, 0), display: "flex", "flex-direction": "row", gap: { row: px(36), column: pct(9.3) } },
    { tablet: { "flex-direction": "column", "align-items": "center", margin: pad(40, 0, 0, 0) } },
  ], ROLES.map(([text, key, grow]) =>
    box(`role-${key.slice(8)}`, [
      { padding: P0, display: "flex", "flex-direction": "column", "align-items": "center", flex: { flexGrow: grow, flexShrink: 1, flexBasis: px(0) } },
      { tablet: { width: pct(100), "max-width": px(395), flex: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" } } },
    ], [label(`role-${key.slice(8)}-label`, text), logo(`logo-${key.slice(8)}`, key, { margin: pad(34, 0, 0, 0) }, { margin: pad(20, 0, 0, 0) })]),
  )),
], { tag: "section", attributes: attrs([["aria-label", "Partners"]]) });

/* ── Footer ───────────────────────────────────────────────────────────────────────────── */
const brand = box("footer-brand", [
  { width: px(225), "min-width": px(225), padding: pad(8, 0, 0, 0), display: "flex", "flex-direction": "column", "align-items": "flex-start" },
  { tablet: { width: pct(100), padding: P0 } },
], [
  w("footer-logo", "e-image", { image: image(M.logo.id), link: link("/") }, [{ width: px(131), height: px(90) }]),
  w("footer-tagline", "e-paragraph", { tag: "p", paragraph: "Asia Pacific’s Premier Trade Fair for Fresh Food" }, [lead({ "max-width": px(208), margin: pad(16, 0, 0, 0) }), { tablet: { "max-width": px(245) } }]),
  box("footer-social", [{ width: "auto", padding: P0, margin: pad(18, 0, 0, 0), display: "flex", "flex-direction": "row", gap: gap(0, 7) }],
    SOCIAL.map(([name, key, href]) => {
      const st = [{ width: px(29), height: px(29) }];
      const set = { link: link(href, true), attributes: attrs([["aria-label", name]]) };
      return key.endsWith("facebook")
        ? w(`social-${name.toLowerCase()}`, "e-svg", { svg: { $$type: "svg-src", value: { id: { $$type: "image-attachment-id", value: M[key].id }, url: null } }, ...set }, st)
        : w(`social-${name.toLowerCase()}`, "e-image", { image: image(M[key].id), ...set }, st);
    })),
]);

const head = (c, prefix) =>
  box(`${prefix}-${c.key}-head`, [{ width: "auto", padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 9) }], [
    div(`${prefix}-${c.key}-bar`, [{ width: px(3), "min-width": px(3), height: px(33), padding: P0, background: { color: T.accent } }]),
    w(`${prefix}-${c.key}-title`, "e-heading", { tag: "h3", title: c.title }, [{ "font-family": OUTFIT, "font-size": px(25), "font-weight": "600", color: "#000000", "line-height": pct(126) }]),
  ]);
const linkList = (c, prefix, styles) =>
  box(`${prefix}-${c.key}-links`, styles, c.links.map(([l, href], i) => footerLink(`${prefix}-${c.key}-${i}`, l, href)));

// Tablet and up: always-open columns (desktop: ruled columns in a row; tablet: 3-column grid).
const columns = box("footer-cols", [
  { padding: P0, display: "flex", "flex-direction": "row", flex: { flexGrow: 1, flexShrink: 1, flexBasis: px(0) } },
  { tablet: { display: "grid", "grid-template-columns": { $$type: "string", value: "1fr 1fr 1fr" }, gap: gap(34, 24), width: pct(100), margin: pad(48, 0, 0, 0) }, mobile: HIDE },
], COLS.map((c) =>
  box(`col-${c.key}`, [
    { padding: pad(0, 0, 0, 20), "min-height": px(322), display: "flex", "flex-direction": "column", "border-width": pad(0, 0, 0, 1), "border-style": "solid", "border-color": "rgba(0,0,0,0.2)",
      ...(c.grow ? { flex: { flexGrow: c.grow, flexShrink: 1, flexBasis: px(0) } } : { flex: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" }, width: "auto" }) },
    { tablet: { padding: P0, "min-height": px(0), "border-width": pad(0) } },
  ], [head(c, "col"), linkList(c, "col", [{ padding: P0, margin: pad(21, 0, 0, 0), display: "flex", "flex-direction": "column", gap: gap(LINK_GAP, 0), ...(c.max ? { "max-width": px(c.max) } : {}) }])]),
));

// Phones: an accordion with a plus icon, every section closed (Figma 318:2070–318:2085).
const accordion = {
  id: "footer-acc",
  elType: "widget",
  widgetType: "nested-accordion",
  settings: {
    items: COLS.map((c) => ({ _id: c.key, item_title: c.title })),
    title_tag: "h3",
    default_state: "all_collapsed",
    max_items_expended: "multiple",
    n_accordion_animation_duration: { unit: "ms", size: 250, sizes: [] },
    accordion_item_title_position_horizontal: "stretch",
    accordion_item_title_icon_position: "end",
    accordion_item_title_icon: { value: "fas fa-plus", library: "fa-solid" },
    accordion_item_title_icon_active: { value: "fas fa-times", library: "fa-solid" },
    accordion_item_title_space_between: { unit: "px", size: 0, sizes: [] },
    accordion_border_normal_border: "solid",
    accordion_border_normal_width: { unit: "px", top: "1", right: "0", bottom: "0", left: "0", isLinked: false },
    accordion_border_normal_color: "rgba(0,0,0,0.3)",
    accordion_border_hover_border: "solid",
    accordion_border_hover_width: { unit: "px", top: "1", right: "0", bottom: "0", left: "0", isLinked: false },
    accordion_border_hover_color: "rgba(0,0,0,0.3)",
    accordion_border_active_border: "solid",
    accordion_border_active_width: { unit: "px", top: "1", right: "0", bottom: "0", left: "0", isLinked: false },
    accordion_border_active_color: "rgba(0,0,0,0.3)",
    accordion_border_radius: { unit: "px", top: "0", right: "0", bottom: "0", left: "0", isLinked: true },
    accordion_padding: { unit: "px", top: "15", right: "11", bottom: "15", left: "3", isLinked: false },
    // The 3×33px green bar before each title (no control for it; Pro per-widget CSS travels with the widget).
    custom_css: "selector .e-n-accordion-item-title-text { display: flex; align-items: center; gap: 7px; min-height: 33px; }\nselector .e-n-accordion-item-title-text::before { content: \"\"; width: 3px; height: 33px; background: #28ae3d; flex: none; }",
    title_typography_typography: "custom",
    title_typography_font_family: "Outfit",
    title_typography_font_size: { unit: "px", size: 20, sizes: [] },
    title_typography_font_weight: "600",
    normal_title_color: "#000000",
    hover_title_color: "#000000",
    active_title_color: "#000000",
    _border_border: "solid",
    _border_width: { unit: "px", top: "0", right: "0", bottom: "1", left: "0", isLinked: false },
    _border_color: "rgba(0,0,0,0.3)",
    _margin: { unit: "px", top: "27", right: "0", bottom: "0", left: "0", isLinked: false },
    // active breakpoints: mobile 767, tablet 1024, tablet_extra 1279, laptop 1439: hide_desktop alone only hides from 1440 up
    hide_desktop: "hidden-desktop",
    hide_laptop: "hidden-laptop",
    hide_tablet_extra: "hidden-tablet_extra",
    hide_tablet: "hidden-tablet",
  },
  elements: COLS.map((c) => ({
    id: `acc-${c.key}`,
    elType: "container",
    settings: { content_width: "full", padding: { unit: "px", top: "0", right: "0", bottom: "20", left: "10", isLinked: false } },
    elements: [linkList(c, "acc", [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(LINK_GAP, 0) }])],
  })),
};

const footer = box("site-footer", [
  { width: pct(100), "max-width": px(T.maxw + 64), padding: pad(0, 32, 30, 32), margin: mtAuto(115), display: "flex", "flex-direction": "column" },
  { tablet: { padding: pad(0, 32, 40, 32), margin: mtAuto(80) }, mobile: { padding: pad(0, 26, 38, 26), margin: mtAuto(56) } },
], [
  box("footer-top", [
    { width: pct(100), padding: P0, display: "flex", "flex-direction": "row", "align-items": "flex-start" },
    { tablet: { "flex-direction": "column" } },
  ], [brand, columns, accordion]),
  div("footer-rule", [{ width: pct(100), height: px(1), padding: P0, margin: pad(36, 0, 0, 0), background: { color: "rgba(0,0,0,0.5)" } }, { tablet: { margin: pad(35, 0, 0, 0) }, mobile: HIDE }]),
  // Desktop: copyright left, policy right. Tablet: centred, stacked. Phones: policy first, left-aligned.
  box("footer-bottom", [
    { width: pct(100), padding: P0, margin: pad(22, 0, 0, 0), display: "flex", "flex-direction": "row", "justify-content": "space-between", "align-items": "center", gap: gap(16, 16) },
    { tablet: { "flex-direction": "column", gap: gap(5, 0), margin: pad(21, 0, 0, 0) }, mobile: { "align-items": "flex-start", gap: gap(23, 0), margin: pad(30, 0, 0, 0) } },
  ], [
    w("footer-copyright", "e-paragraph", { tag: "p", paragraph: "© 2027 Fresh Food Expo APAC. All rights reserved" }, [lead(), { mobile: { "font-size": px(17), order: 2 } }]),
    // Cookie Settings reopens the consent banner (ffe-consent.php).
    box("footer-policy", [{ padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(0, 24) }], [
      footerLink("footer-privacy", "Privacy Policy", PRIVACY),
      footerLink("footer-cookies", "Cookie Settings", "#cookie-settings"),
    ]),
  ]),
], { tag: "footer" });

/* ── Write ─────────────────────────────────────────────────────────────────────────────── */
let ID = Number(process.env.FOOTER_ID || 33);
if (!ID) ID = call("novamira/elementor-create-template", { title: "Footer", type: "footer", status: "draft" }).id;
guard(ID);
call("novamira/elementor-set-content", { post_id: ID, template_type: "footer", content: [partners, footer] });
stamp(ID);
// Tailwind lg (1024–1279) differs from xl (1280+): smaller partner type and logos, and the footer stacks the brand above the columns (xl:flex-row).
// Elementor has no variant for 1025–1279, so it is template CSS; `body .elementor …` (0,2,1) beats the local `.elementor .s-<id>` (0,2,0).
const CSS = `@media (min-width: 1025px) and (max-width: 1279.98px) {
body .elementor [data-id="supported-t"], body .elementor [data-id^="role-"][data-id$="-label-t"] { font-size: 18px; }
body .elementor [data-id^="logo-"] { height: 70px; }
body .elementor [data-id="supported-logos"] { column-gap: 56px; }
body .elementor [data-id="footer-top"] { flex-direction: column; row-gap: 48px; }
body .elementor [data-id="footer-brand"] { width: 100%; padding-top: 0; }
body .elementor [data-id="footer-cols"] { flex: none; width: 100%; }
body .elementor :is([data-id="col-about"], [data-id="col-exhibit"], [data-id="col-visit"], [data-id="col-news"]) { padding-left: 16px; }
}`;
php(`
$s = get_post_meta(${ID}, '_elementor_page_settings', true); if (!is_array($s)) $s = [];
$s['custom_css'] = base64_decode('${Buffer.from(CSS).toString("base64")}');
update_post_meta(${ID}, '_elementor_page_settings', wp_slash($s));
\\Elementor\\Core\\Files\\CSS\\Post::create(${ID})->update();
return true;
`);
console.log("footer", ID, "elements:", call("novamira/elementor-get-content", { post_id: ID }).element_count);
