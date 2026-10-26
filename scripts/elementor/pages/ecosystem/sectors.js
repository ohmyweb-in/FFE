// Ecosystem Sectors (ecosystem/Sectors.tsx): heading, leaf sprig, three 619px sector columns. Reveal sits on the grid cell, the lift on the article.
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, AUTO, mtAuto, flex, gap, image, w, attrs, media, at, svg, reveal, mix, lift, shadow, ease, rotate } = require("../../lib.js");
const { NARROW, EB, H2, LEAD, MINTG, rad, dv, fx, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const radius = (r) => rad(r, r, r, r);
const COLS = (n) => ({ $$type: "string", value: n === 1 ? "minmax(0, 1fr)" : `repeat(${n}, minmax(0, 1fr))` });
const ARIA = attrs([["aria-hidden", "true"]]);

const COLUMNS = [
  { key: "sprout", title: "Fresh Food", desc: "The ingredients at the heart of the fresh food ecosystem.", icon: "g3-icon-sprout", items: [
    ["fruit-veg", "Fruit &amp; Vegetables", "Fresh fruits  ·  Fresh vegetables  ·  Tropical and exotic produce"],
    ["meat", "Meat &amp; Poultry", "Beef  ·  Pork  ·  Poultry  ·  Other fresh meat products"],
    ["seafood", "Seafood", "Fish  ·  Shellfish  ·  Crustaceans  ·  Other fresh and chilled seafood"],
    ["eggs", "Eggs &amp; Dairy", "Eggs  ·  Milk  ·  Cheese  ·  Other fresh dairy products"],
  ] },
  { key: "gear", title: "Agri &amp; Fresh Technology", icon: "g3-icon-gear", desc: "Technologies and solutions that help maintain freshness, protect product quality, extend shelf life and improve efficiency.", items: [
    ["agritech", "AgriTech", "Technologies supporting greater efficiency, visibility and control across fresh food operations."],
    ["cooling", "Cooling", "Refrigeration  ·  Temperature control  ·  Pre-cooling  ·  Cooling systems"],
    ["preservation", "Preservation", "Post-harvest solutions  ·  Freshness extension  ·  Storage technologies  ·  Quality preservation"],
    ["packaging", "Packaging", "Fresh food packaging  ·  Sustainable packaging  ·  Modified-atmosphere solutions  ·  Smart packaging  ·  Labelling"],
  ] },
  { key: "truck", title: "Logistics &amp; Distribution", icon: "g3-icon-truck", wide: true, desc: "Infrastructure, services and technologies that enable fresh food to move efficiently across local, regional and international markets while maintaining product quality.", items: [
    ["transport", "Transportation", "Air  ·  Sea  ·  Land  ·  Rail"],
    ["cold-chain", "Cold Chain", "Temperature-controlled transportation · Refrigerated storage  ·  Cold chain monitoring"],
    ["warehousing", "Warehousing", "Cold storage  ·  Distribution centres  · Inventory management  ·  Fulfilment"],
    ["supply-chain", "Supply Chain", "Supply chain infrastructure  ·  Traceability  · Digital solutions  ·  Distribution networks  · Supply chain technology"],
  ] },
];

const item = (id, [slug, name, text]) =>
  fx(id, { display: "flex", "flex-direction": "row", "align-items": "flex-start", gap: gap(16) }, {}, [
    dv(`${id}-thumb`, { position: "relative", width: px(96), height: px(78), "flex-shrink": 0, overflow: "hidden", "border-radius": radius(14), ...MINTG }, {}, [
      w(`${id}-img`, "e-image", { image: image(M["g3-sec-" + slug].id), attributes: attrs([["data-zoom", ""]]) },
        [{ ...at(px(0), px(0), px(0), px(0)), width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover" }]),
    ]),
    dv(`${id}-text`, { display: "flex", "flex-direction": "column", gap: gap(5), padding: pad(4, 0, 0, 0), "min-width": px(0), flex: flex(1, 1, pct(0)) }, {}, [
      hd(`${id}-name`, "h4", name, [{ "font-family": OUTFIT, "font-weight": "600", "font-size": px(16), "line-height": px(20), color: T.accent, margin: P0 }, {}]),
      pg(`${id}-desc`, text, [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(13), "line-height": px(18), color: T.body, margin: P0 }, {}], { attributes: attrs([["data-prewrap-lg", ""]]) }),
    ]),
  ], { attributes: attrs([["role", "listitem"], ["data-group", ""]]) });

const column = (c, i) => {
  const id = `es-sec-c${i + 1}`;
  return dv(id, {}, {}, [
    dv(`${id}-card`, {
      display: "flex", "flex-direction": "column", gap: gap(16), "border-radius": radius(28), background: { color: T.white }, padding: pad(28, 26, 30, 26),
      height: px(619), transition: ease(250),
    }, { hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") }, tablet_extra: { height: pct(100) }, mobile: { padding: pad(28, 20, 30, 20) } }, [
      fx(`${id}-head`, { display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(14) }, {}, [
        fx(`${id}-badge`, { width: px(52), height: px(52), "flex-shrink": 0, "align-items": "center", "justify-content": "center", "border-radius": radius(999),
          "border-width": pad(1.5), "border-style": "solid", "border-color": T.accent, background: { color: T.white } }, {}, [
          svg(`${id}-badge-i`, c.icon, [{ width: px(24), height: px(24) }, {}], { attributes: ARIA }),
        ]),
        hd(`${id}-title`, "h3", c.title, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(24), "line-height": px(30), color: T.accent, margin: P0, "min-width": px(0), flex: flex(1, 1, pct(0)) }, {}]),
      ]),
      pg(`${id}-desc`, c.desc, [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(15), "line-height": px(22), color: T.body, margin: P0, ...(c.wide && { "max-width": px(348) }) },
        c.wide ? { tablet_extra: { "max-width": NONE } } : {}]),
      fx(`${id}-list`, { display: "flex", "flex-direction": "column", gap: gap(18), padding: pad(8, 0, 0, 0) }, {}, c.items.map((it, k) => item(`${id}-i${k + 1}`, it)), { attributes: attrs([["role", "list"]]) }),
    ], { tag: "article" }),
  ], { attributes: attrs(reveal(i)) });
};

const [d, m] = mix(NARROW, [{ position: "relative", margin: mtAuto(67), display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(14) }, { tablet: { margin: mtAuto(48) } }]);
module.exports = [dv("es-sec", d, m, [
  dv("es-sec-sprig", { ...at(px(-9.32), px(48.57), null, null), width: px(240.432), height: px(238.283), "min-width": px(0), display: "block" }, { tablet_extra: { display: "none" } }, [
    w("es-sec-sprig-i", "e-image", { image: image(M["g3-sprig"].id) },
      [{ ...at(px(34.943), null, null, px(32.02)), width: px(176.392), height: px(168.397), "max-width": NONE, transform: rotate(-34.04) }]),
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) }),
  dv("es-sec-head", { position: "relative", display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(14), width: AUTO }, {}, [
    pg("es-sec-eyebrow", "Industry sectors", EB),
    hd("es-sec-title", "h2", "Explore the Industry Sectors", H2(42, 48)),
    pg("es-sec-lede", "Fresh Food Expo APAC brings together companies and organisations involved in fresh food, the technologies that preserve its quality, and the logistics and distribution systems that connect it with markets.", mix(LEAD, [{ "max-width": px(900) }, {}])),
  ], { attributes: attrs(reveal(0)) }),
  dv("es-sec-grid", { display: "grid", width: pct(100), gap: gap(24), padding: pad(22, 0, 0, 0), "grid-template-columns": COLS(3) },
    { tablet_extra: { "grid-template-columns": COLS(2) }, tablet: { "grid-template-columns": COLS(1) }, mobile: { "grid-template-columns": COLS(1) } }, COLUMNS.map(column)),
], { tag: "section" })];
