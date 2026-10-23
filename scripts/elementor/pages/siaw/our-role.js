// SIAW OurRole (siaw/OurRole.tsx): header, three 332px cards with arrows, closing line, CTA pill. No data-trim.
const { T, FREDOKA, OUTFIT, px, pct, custom, pad, P0, AUTO, mtAuto, flex, gap, image, w, attrs, media, at, FILL, svg, reveal, mix, lift, shadow, ease, rotate, sz, pill } = require("../../lib.js");
const { NARROW, EB, H2, LEAD, MINTG, rad, dv, fx, hd, pg } = require("../g3-shared.js");
const M = media();
const NONE = custom("none");
const ARIA = attrs([["aria-hidden", "true"]]);
const pos = (y) => ({ $$type: "object-position", value: { x: sz(50, "%"), y: sz(y, "%") } });
const CARDS = [
  { img: "g3-card-fresh", icon: "icon-fresh", y: 50, ring: [142, 26], title: "Fresh Food", items: "Fruit &amp; Vegetables  ·  Meat &amp; Poultry  ·  Seafood  · Eggs &amp; Dairy" },
  { img: "g3-card-agri", icon: "icon-agri", y: 50, ring: [136, 22], title: "Agri &amp; Fresh Technology", items: "Agri-Tech  ·  Digital Solutions  ·  Preservation  · Packaging" },
  { img: "g3-card-logistics", icon: "icon-logistics", y: 11, ring: [136, 22], title: "Logistics &amp; Distribution", items: "Distribution &amp; Supply Chain  ·  Cold Chain  ·  \nFreight &amp; Transportation  ·  Storage &amp; Warehousing" },
];

const card = (c, i) => {
  const id = `si-or-c${i + 1}`;
  return dv(id, { width: pct(100), "max-width": NONE, "min-width": px(0), flex: flex(1, 1, pct(0)) }, { tablet: { "max-width": px(520), flex: flex(0, 1, AUTO) } }, [
    dv(`${id}-card`, {
      position: "relative", display: "flex", "flex-direction": "column", overflow: "hidden", "min-height": px(332), height: pct(100), "border-radius": rad(24, 24, 24, 24),
      background: { color: T.white }, transition: ease(250),
    }, { hover: { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") } }, [
      dv(`${id}-media`, { position: "relative", height: px(170), "flex-shrink": 0, overflow: "hidden", ...MINTG }, {}, [
        w(`${id}-img`, "e-image", { image: image(M[c.img].id), attributes: attrs([["data-zoom", ""]]) },
          [{ ...FILL, width: pct(100), height: pct(100), "max-width": NONE, "object-fit": "cover", "object-position": pos(c.y) }]),
      ]),
      dv(`${id}-body`, { display: "flex", "flex-direction": "column", gap: gap(12), padding: pad(44, 26, 28, 26) }, {}, [
        hd(`${id}-title`, "h3", c.title, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(26), "line-height": px(32), color: T.accent, margin: P0 }, {}]),
        pg(`${id}-items`, c.items, [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(15), "line-height": px(23), color: T.body, margin: P0 }, {}], { attributes: attrs([["data-prewrap-lg", ""]]) }),
      ]),
      // ring + icon come after the body so they paint over it (atomic boxes are position:relative, later siblings win)
      svg(`${id}-ring`, "g3-ring", [{ ...at(px(c.ring[0]), null, null, px(c.ring[1] - 4)), width: px(68.7125), height: px(68.7125), "max-width": NONE }, {}], { attributes: ARIA }),
      w(`${id}-icon`, "e-image", { image: image(M[c.icon].id), attributes: ARIA },
        [{ ...at(px(c.ring[0] + 13.5), null, null, px(c.ring[1] + 14.09)), width: px(32.52), height: px(32.52), "max-width": NONE }]),
    ], { tag: "article", attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(i)) });
};

const arrow = (n) =>
  fx(`si-or-arrow${n}`, { display: "flex", "align-items": "center", "justify-content": "center", width: AUTO, "min-width": px(0), height: AUTO }, { tablet: { height: px(44) } }, [
    svg(`si-or-arrow${n}-i`, "g3-arrow", [{ width: px(18), height: px(18) }, { tablet: { transform: rotate(90) } }]),
  ], { attributes: ARIA });

const [d, m] = mix(NARROW, [{ margin: mtAuto(65), display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16) }, { tablet: { margin: mtAuto(48) } }]);
module.exports = [dv("si-or", d, m, [
  dv("si-or-head", { display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16), width: AUTO }, {}, [
    pg("si-or-eyebrow", "Our role", EB),
    hd("si-or-title", "h2", "<em>Fresh Food Expo APAC</em> at SIAW 2027", H2(44, 50)),
    pg("si-or-lede", "Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B trade platform for the fresh food ecosystem, connecting", mix(LEAD, [{ "max-width": px(1046) }, {}])),
  ], { attributes: attrs(reveal(0)) }),
  fx("si-or-row", { display: "flex", "flex-direction": "row", "align-items": "stretch", gap: gap(12), width: pct(100), padding: pad(16, 0, 8, 0) },
    { tablet: { "flex-direction": "column", "align-items": "center", gap: gap(0) } }, CARDS.flatMap((c, i) => (i ? [arrow(i + 1), card(c, i)] : [card(c, i)]))),
  pg("si-or-close", "By bringing these sectors together, Fresh Food Expo APAC creates a one-stop platform for suppliers, solution providers, buyers and industry stakeholders to source, discover, connect and build new partnerships.",
    mix(LEAD, [{ width: AUTO }, {}]), { attributes: attrs(reveal(0)) }),
  dv("si-or-cta", { padding: pad(8, 0, 0, 0), width: AUTO }, {}, [
    pill("si-or-pill", "Explore the Fresh Food Ecosystem", "/ecosystem", { color: T.white, bg: T.accent, styles: [{}, { mobile: { padding: pad(10, 18) } }] }),
  ], { attributes: attrs(reveal(0)) }),
], { tag: "section", _cssid: "our-role" })];
