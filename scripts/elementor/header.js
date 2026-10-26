// Site header (Theme Builder "Header"): port of src/components/Header.tsx + nav.ts.
// Green utility bar that scrolls away, then the sticky bar: logo, mega menu, "Register Your Interest".
// Sticky / scrolled behaviour lives in ffe-header.php (mu-plugin). Run: node header.js
const { call, guard, stamp, T, OUTFIT, FREDOKA, px, pct, pad, P0, radius, gap, link, image, box, div, w, media, sz, shadow, ease, lift, text, HIDE, svg, attrs } = require("./lib.js");

const M = media();
const DATE_LINE = "16-18 November 2027 | Sands Expo &amp; Convention Centre, Singapore";

// nav.ts, verbatim. `img` = media key of the section photo.
const NAV = [
  {
    key: "about", label: "About", href: "/about", img: "nav-about",
    blurb: "Asia Pacific’s premier trade fair for fresh food, 16–18 November 2027 in Singapore.",
    cta: ["Contact Us", "/contact"],
    links: [
      ["Overview", "/about", "The event at a glance"],
      ["Our Story", "/our-story", "Why Fresh Food Expo exists"],
      ["Fresh Food Ecosystem", "/ecosystem", "The sectors we bring together"],
      ["SIAW", "/siaw", "Singapore International Agri-Food Week"],
      ["Messe Berlin", "/messe-berlin", "Meet the organiser"],
      ["Contact Us", "/contact", "Talk to our team"],
    ],
  },
  {
    key: "exhibit", label: "Exhibit", href: "/why-exhibit", img: "nav-exhibit",
    blurb: "Put your brand in front of fresh food buyers from across Asia Pacific.",
    cta: ["Apply to Exhibit", "/apply-to-exhibit"],
    links: [
      ["Why Exhibit", "/why-exhibit", "Grow your business in the region"],
      ["Who Should Exhibit", "/who-should-exhibit", "Sectors and exhibitor profiles"],
      ["Apply to Exhibit", "/apply-to-exhibit", "Secure your stand"],
    ],
  },
  {
    key: "visit", label: "Visit", href: "/why-visit", img: "nav-visit",
    blurb: "Source, connect and discover what’s next in fresh food.",
    cta: ["Register to Visit", "/register-to-visit"],
    links: [
      ["Why Visit", "/why-visit", "What’s waiting on the show floor"],
      ["Who Should Visit", "/who-should-visit", "Buyers, retailers and more"],
      ["Plan Your Visit", "/plan-your-visit", "Venue, travel and stay"],
      ["Register to Visit", "/register-to-visit", "Get your trade pass"],
    ],
  },
  {
    key: "news", label: "News & Media", href: "/news", img: "nav-news",
    blurb: "The latest announcements and stories from Fresh Food Expo APAC.",
    cta: ["Subscribe", "/subscribe"],
    links: [
      ["News & Press Release", "/news", "Announcements and media"],
      ["Gallery", "/gallery", "Photos from our events"],
      ["Subscribe Newsletter", "/subscribe", "Updates in your inbox"],
    ],
  },
];
const UTIL = [
  ["Newsletter", "/subscribe"],
  ["Press", "/news"],
];

// Section photo under the green gradient (bg-linear-to-t from-forest via-forest/70 to-brand/10).
const photo = (id) => ({
  $$type: "background",
  value: {
    "background-overlay": {
      $$type: "background-overlay",
      value: [
        {
          $$type: "background-gradient-overlay",
          value: {
            type: { $$type: "string", value: "linear" },
            angle: { $$type: "number", value: 0 },
            stops: {
              $$type: "gradient-color-stop",
              value: [
                [T.forest, 0],
                ["rgba(2,93,3,0.7)", 50],
                ["rgba(44,166,47,0.1)", 100],
              ].map(([c, o]) => ({ $$type: "color-stop", value: { color: { $$type: "color", value: c }, offset: { $$type: "number", value: o } } })),
            },
          },
        },
        {
          $$type: "background-image-overlay",
          value: {
            image: { $$type: "image", value: { src: { $$type: "image-src", value: { id: { $$type: "image-attachment-id", value: id } } }, size: { $$type: "string", value: "full" } } },
            size: { $$type: "string", value: "cover" },
            position: { $$type: "string", value: "center center" },
            repeat: { $$type: "string", value: "no-repeat" },
          },
        },
      ],
    },
  },
});
/* ── 1. Utility bar (Figma 736:1498): scrolls away; desktop 49px / below lg 44px ─────────── */
const utilLink = ([label, href]) => w("util-" + label.toLowerCase(), "e-paragraph", { tag: "span", paragraph: label, link: link(href) }, [
  { ...text(15, 500, T.white, { "letter-spacing": px(0.3) }), transition: ease(250) },
  { hover: { color: "rgba(255,255,255,0.7)" }, tablet: HIDE },
]);
const rule = (id) => div(id, [{ width: px(1), "min-width": px(1), height: px(22), padding: P0, background: { color: T.white } }, { tablet: HIDE }]);

const utility = box("util-bar", [{ width: pct(100), padding: P0, background: { color: T.forest }, display: "flex", "flex-direction": "column", "align-items": "center" }], [
  box("util-inner", [
    { width: pct(100), "max-width": px(T.maxw + 64), height: px(49), padding: pad(0, 32), display: "flex", "flex-direction": "row", "justify-content": "flex-end", "align-items": "center", gap: gap(0, 18) },
    { tablet: { height: px(44), gap: gap(0, 0), padding: pad(0, 20, 0, 32) }, mobile: { padding: pad(0, 14, 0, 26) } },
  ], [
    utilLink(UTIL[0]), rule("util-rule-1"), utilLink(UTIL[1]), rule("util-rule-2"),
    // Language is a placeholder on the reference build too (href="#"). Search: ffe-header.php opens the overlay; /?s= is the no-JS fallback.
    box("util-lang", [
      { padding: P0, width: "auto", display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 5) },
      { tablet: { padding: pad(0, 8), height: px(44) } },
    ], [
      w("util-lang-label", "e-paragraph", { tag: "span", paragraph: "EN" }, [text(15, 500, "rgba(255,255,255,0.5)", { "text-transform": "uppercase", "letter-spacing": px(0.3) }), { tablet: { "font-size": px(14) } }]),
      svg("util-lang-chev", "chevron-lang", [{ width: px(8), height: px(4), transform: { $$type: "transform", value: { "transform-functions": { $$type: "transform-functions", value: [{ $$type: "transform-rotate", value: { x: sz(0, "deg"), y: sz(0, "deg"), z: sz(180, "deg") } }] } } } }]),
    ], { tag: "a", link: link("#") }),
    w("util-search", "e-image", { image: image(M["icon-search"].id), link: link("/?s=") }, [
      { width: px(18), height: px(18), "margin": pad(0, 0, 0, -4) },
      { tablet: { width: px(44), height: px(44), padding: pad(13), margin: P0 } },
    ]),
  ]),
]);

/* ── 2. Mega menu panels (desktop 800px card; below lg the links only) ─────────────────── */
const panel = (s) => {
  const linkRow = ([label, href, desc], i) =>
    box(`${s.key}-link-${i}`, [
      // Right padding = 16px + the reference's 16px hover arrow and 12px gap (arrow not ported), so copy wraps the same.
      { padding: pad(10, 44, 10, 16), width: pct(100), display: "flex", "flex-direction": "column", gap: gap(2, 0), "border-radius": radius(14), transition: ease(250) },
      { hover: { background: { color: T.mint } }, tablet: { padding: pad(0, 12), "min-height": px(44), "justify-content": "center" } },
    ], [
      w(`${s.key}-link-${i}-t`, "e-paragraph", { tag: "span", paragraph: label }, [
        { "font-family": FREDOKA, "font-size": px(17), "font-weight": "500", color: T.ink, "line-height": pct(150) },
        { tablet: { "font-family": OUTFIT, "font-size": px(16), color: T.body } },
      ]),
      w(`${s.key}-link-${i}-d`, "e-paragraph", { tag: "span", paragraph: desc }, [text(13, 400, "rgba(79,79,79,0.8)", { "line-height": pct(150) }), { tablet: HIDE }]),
    ], { tag: "a", link: link(href) });

  const card = box(`${s.key}-card`, [
    {
      width: px(800), padding: pad(8), display: "grid", "grid-template-columns": { $$type: "string", value: "200px 1fr" }, gap: gap(8),
      background: { color: T.white }, "border-radius": radius(24), "border-width": pad(1), "border-style": "solid", "border-color": "rgba(2,93,3,0.05)",
      "box-shadow": shadow(0, 32, 64, -28, "rgba(2,93,3,0.4)"),
    },
    { tablet: { width: pct(100), display: "flex", "flex-direction": "column", padding: P0, background: { color: "transparent" }, "border-width": pad(0), "box-shadow": { $$type: "box-shadow", value: [] }, "border-radius": radius(0) } },
  ], [
    box(`${s.key}-photo`, [
      { "min-height": px(200), padding: pad(20), "border-radius": radius(18), display: "flex", "flex-direction": "column", "justify-content": "flex-end", gap: gap(8, 0), background: photo(M[s.img].id) },
      { tablet: HIDE },
    ], [
      w(`${s.key}-photo-t`, "e-paragraph", { tag: "span", paragraph: s.label }, [{ "font-family": FREDOKA, "font-size": px(20), "font-weight": "600", "text-transform": "uppercase", "letter-spacing": px(0.4), "line-height": pct(100), color: T.white }]),
      w(`${s.key}-photo-d`, "e-paragraph", { tag: "span", paragraph: s.blurb }, [text(13, 400, "rgba(255,255,255,0.85)", { "line-height": pct(140) })]),
    ], { tag: "a", link: link(s.href) }),
    box(`${s.key}-right`, [
      { padding: pad(8, 8, 12, 8), display: "flex", "flex-direction": "column", gap: gap(0) },
      { tablet: { padding: pad(0, 0, 8, 8), margin: pad(0, 0, 0, 16), "border-width": pad(0, 0, 0, 2), "border-style": "solid", "border-color": T.mint } },
    ], [
      box(`${s.key}-links`, [
        { padding: P0, display: "grid", "grid-template-columns": { $$type: "string", value: "1fr 1fr" }, gap: gap(4) },
        { tablet: { display: "flex", "flex-direction": "column", gap: gap(0) } },
      ], s.links.map(linkRow)),
      box(`${s.key}-foot`, [
        { margin: { "block-start": { $$type: "size", value: { size: "", unit: "auto" } } }, padding: pad(12, 16, 0, 16), display: "flex", "flex-direction": "row", "justify-content": "space-between", "align-items": "center", gap: gap(0, 12),
          "border-width": pad(1, 0, 0, 0), "border-style": "solid", "border-color": "rgba(2,93,3,0.1)" },
        { tablet: HIDE },
      ], [
        box(`${s.key}-date`, [{ padding: P0, width: "auto", display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 6), "min-width": px(0), flex: { flexGrow: 0, flexShrink: 1, flexBasis: "auto" } }], [
          div(`${s.key}-dot`, [{ width: px(7), height: px(7), "min-width": px(7), padding: P0, "border-radius": radius(999), background: { color: T.accent } }]),
          w(`${s.key}-date-t`, "e-paragraph", { tag: "span", paragraph: DATE_LINE }, [text(12, 500, "#727272", { "letter-spacing": px(0.24), "line-height": pct(130) })]),
        ]),
        w(`${s.key}-cta`, "e-button", { text: `${s.cta[0]}<span class="pill-chev">›</span>`, link: link(s.cta[1]), attributes: attrs([["data-nowrap", ""]]) }, [
          { ...text(15, 500, T.white, { "letter-spacing": px(0.3) }), background: { color: T.brand }, height: px(44), padding: pad(0, 18), "border-radius": radius(999), display: "flex", "align-items": "center", gap: gap(0, 10), transition: ease(250), flex: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" } },
          { hover: { transform: lift, "box-shadow": shadow(0, 10, 24, -10, "rgba(2,93,3,0.45)") } },
        ]),
      ]),
    ]),
  ]);

  // Nested-element child of the mega menu: a (v3) container per menu item.
  return {
    id: `${s.key}-panel`,
    elType: "container",
    // The dropdown spans the viewport; boxing it to the content column puts the card under the nav's right edge.
    settings: {
      content_width: "boxed",
      boxed_width: { unit: "px", size: T.maxw, sizes: [] },
      flex_direction: "row",
      flex_justify_content: "flex-end",
      // Header.tsx drops the card 8px below the whole bar, not below the menu row: 41px more, kept inside the
      // dropdown (transparent) so the pointer never leaves it on the way down.
      padding: { unit: "px", top: "49", right: "32", bottom: "0", left: "32", isLinked: false },
      padding_tablet: { unit: "px", top: "0", right: "0", bottom: "4", left: "0", isLinked: false },
      flex_direction_tablet: "column",
    },
    elements: [card],
  };
};

/* ── 3. The sticky bar ─────────────────────────────────────────────────────────────────── */
const C = (s) => ({ unit: "px", size: s, sizes: [] });
const menu = {
  id: "site-menu",
  elType: "widget",
  widgetType: "mega-menu",
  settings: {
    menu_name: "Primary",
    menu_items: NAV.map((s) => ({ _id: s.key, item_title: s.label, item_link: { url: s.href }, item_dropdown_content: "yes" })),
    item_layout: "horizontal",
    item_position_horizontal: "end",
    content_width: "full_width",
    open_on: "hover",
    open_animation: "fadeIn",
    open_animation_duration: C(250),
    breakpoint_selector: "tablet",
    menu_item_icon: { value: "fas fa-chevron-down", library: "fa-solid" },
    menu_item_icon_active: { value: "fas fa-chevron-up", library: "fa-solid" },
    // Items: Fredoka 19 / 500, uppercase, 0.02em, ink → forest.
    menu_item_title_typography_typography: "custom",
    menu_item_title_typography_font_family: "Fredoka",
    menu_item_title_typography_font_size: C(19),
    menu_item_title_typography_font_weight: "500",
    menu_item_title_typography_text_transform: "uppercase",
    menu_item_title_typography_letter_spacing: C(0.38),
    menu_item_title_typography_line_height: { unit: "em", size: 1.2, sizes: [] },
    menu_item_title_text_color_normal: T.ink,
    menu_item_title_text_color_hover: T.forest,
    menu_item_title_text_color_active: T.forest,
    // Header.tsx: label, 6px, then the caret centred in a 24px button, 22px to the next item (measured against the reference).
    menu_item_title_space_between: C(23.5),
    menu_item_title_padding: { unit: "px", top: "6", right: "0", bottom: "6", left: "0", isLinked: false },
    menu_item_title_distance_from_content: C(0),
    style_dropdown_indicator_size: C(11),
    style_dropdown_indicator_space: C(12.5),
    menu_dropdown_indicator_color_normal: T.ink,
    menu_dropdown_indicator_color_hover: T.forest,
    menu_dropdown_indicator_color_active: T.forest,
    content_background_color_background: "classic",
    content_background_color_color: "rgba(0,0,0,0)",
    content_padding: { unit: "px", top: "0", right: "0", bottom: "0", left: "0", isLinked: true },
    // Below lg: the dropdown is the white rounded sheet (Header.tsx #mobile-menu).
    menu_item_title_typography_font_size_tablet: C(19),
    menu_item_title_padding_tablet: { unit: "px", top: "0", right: "16", bottom: "0", left: "16", isLinked: false },
    menu_item_title_border_radius_tablet: { unit: "px", top: "16", right: "16", bottom: "16", left: "16", isLinked: true },
    menu_item_title_background_color_hover_background: "classic",
    menu_item_title_background_color_hover_color: "rgba(0,0,0,0)",
    menu_toggle_icon_distance_from_dropdown: C(16),
    item_position_horizontal_tablet: "stretch",
    menu_item_title_space_between_tablet: C(0),
    // The 47px ringed menu button.
    style_menu_toggle_icon_size: C(21),
    menu_toggle_icon_color_normal: "#032919",
    menu_toggle_icon_color_hover: "#032919",
    menu_toggle_icon_color_active: "#032919",
    menu_toggle_icon_background_color_normal_background: "classic",
    menu_toggle_icon_background_color_normal_color: "rgba(0,0,0,0)",
    menu_toggle_icon_background_color_hover_background: "classic",
    menu_toggle_icon_background_color_hover_color: T.mint,
    menu_toggle_icon_border_normal_border: "solid",
    menu_toggle_icon_border_normal_width: { unit: "px", top: "2", right: "2", bottom: "2", left: "2", isLinked: true },
    menu_toggle_icon_border_normal_color: "#032919",
    menu_toggle_icon_border_hover_border: "solid",
    menu_toggle_icon_border_hover_width: { unit: "px", top: "2", right: "2", bottom: "2", left: "2", isLinked: true },
    menu_toggle_icon_border_hover_color: "#032919",
    menu_toggle_icon_border_active_border: "solid",
    menu_toggle_icon_border_active_width: { unit: "px", top: "2", right: "2", bottom: "2", left: "2", isLinked: true },
    menu_toggle_icon_border_active_color: "#032919",
    menu_toggle_icon_border_radius: { unit: "%", top: "50", right: "50", bottom: "50", left: "50", isLinked: true },
    menu_toggle_icon__padding: { unit: "px", top: "11", right: "11", bottom: "11", left: "11", isLinked: true },
    // Grows to fill the row on desktop, so its dropdowns span the content column.
    _flex_size: "custom",
    _flex_grow: 1,
    _flex_size_tablet: "none",
    _flex_order_tablet: "end",
  },
  elements: NAV.map(panel),
};

// Figma 1138:191: 246×47, 24px to the label, 13px to the chevron, 18px. Phones (318:2092): 166×43, 13 / 5, 13px, accent.
const cta = box("header-cta", [
  { ...text(18, 500, T.white, { "letter-spacing": px(0.36), "line-height": pct(120) }), width: px(246), height: px(47), padding: pad(0, 0, 0, 24), "border-radius": radius(999),
    background: { color: T.brand }, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 13), flex: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" }, transition: ease(250) },
  { hover: { transform: lift, "box-shadow": shadow(0, 10, 24, -10, "rgba(2,93,3,0.45)") }, tablet: { background: { color: T.accent } }, mobile: { width: px(166), height: px(43), padding: pad(0, 0, 0, 13), gap: gap(0, 5), "font-size": px(13) } },
], [
  w("header-cta-label", "e-paragraph", { tag: "span", paragraph: "Register Your Interest" }, [{ color: T.white }]),
  svg("header-cta-chev", "chevron-contact", [{ width: px(6), height: px(12) }, { mobile: { width: px(5.5), height: px(11) } }]),
], { tag: "a", link: link("/register-to-visit") });

const bar = box("site-bar", [{ width: pct(100), padding: P0, display: "flex", "flex-direction": "column", "align-items": "center", "z-index": 50 }], [
  box("site-bar-inner", [
    { width: pct(100), "max-width": px(T.maxw + 64), height: px(117), padding: pad(17, 32, 0, 32), display: "flex", "flex-direction": "row", "align-items": "flex-start", "justify-content": "space-between", gap: gap(0, 35) },
    { tablet: { height: px(84), padding: pad(0, 32), "align-items": "center", gap: gap(0, 13) }, mobile: { padding: pad(0, 26) } },
  ], [
    // One link around both logos: a hidden image's own link would still take a flex gap.
    box("logo-link", [{ width: "auto", padding: P0, display: "flex", flex: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" } }], [
      w("logo", "e-image", { image: image(M.logo.id) }, [{ width: px(131), height: px(90) }, { tablet: HIDE }]),
      w("logo-compact", "e-image", { image: image(M["logo-compact"].id) }, [{ display: "none", width: px(79), height: px(42) }, { tablet: { display: "block" } }]),
    ], { tag: "a", link: link("/"), attributes: { $$type: "attributes", value: [{ $$type: "key-value", value: { key: { $$type: "string", value: "aria-label" }, value: { $$type: "string", value: "Fresh Food Expo Asia Pacific — home" } } }] } }),
    box("site-nav", [
      { padding: P0, margin: pad(18, 0, 0, 0), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 36.5), flex: { flexGrow: 1, flexShrink: 1, flexBasis: "auto" } },
      { tablet: { margin: P0, gap: gap(0, 13), "justify-content": "flex-end" } },
    ], [menu, cta]),
  ]),
], { tag: "div" });

/* ── Write ─────────────────────────────────────────────────────────────────────────────── */
const ID = Number(process.env.HEADER_ID || 30);
guard(ID);
call("novamira/elementor-set-content", { post_id: ID, template_type: "header", content: [utility, bar] });
stamp(ID);
const back = call("novamira/elementor-get-content", { post_id: ID });
console.log("header", ID, "elements:", back.element_count);
