// G2 shared modules (why-exhibit, why-visit, who-should-exhibit, who-should-visit): widths, type, page CSS, Intro, SectorCard, why/Sections Photo/Body/Items.
// Breakpoint notes: variants cascade downward, so `desktop` carries D,L (and X unless overridden), then tablet_extra (X), tablet (T), mobile (M).
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, div, box, w, attrs, media, text, svg, at, FILL, grad, layers, mix, reveal, sz, ease } = require("../lib.js");

const M = media();
const wrap = (max) => [{ width: custom(`min(${max}px, 100% - 64px)`), "max-width": custom("none") }, { mobile: { width: custom(`min(${max}px, 100% - 52px)`) } }];
const NARROW = wrap(1280), W1360 = wrap(1360), ROW = wrap(1334);
const PHOTO_BG = layers(grad(180, [[T.mint, 0], ["#c2e3c3", 100]]));
const STR = (v) => ({ $$type: "string", value: v });
const COLS = (n) => STR(n === 1 ? "minmax(0, 1fr)" : `repeat(${n}, minmax(0, 1fr))`);
const pos = (s) => {
  const [x, y] = s.split(" ").map((v) => (v === "center" ? 50 : v === "top" ? 0 : parseFloat(v)));
  return { $$type: "object-position", value: { x: sz(x, "%"), y: sz(y, "%") } };
};
const COVER = { "object-fit": "cover" };
const fillImg = (id, key, o = {}) =>
  w(id, "e-image", { image: image(M[key].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), ...COVER, ...(o.pos && { "object-position": pos(o.pos) }) }, {}]);
const ico = (id, key, size, more = {}) => svg(id, key, [{ width: px(size), height: px(size), flex: flex(0, 0, AUTO), ...more }, {}], { attributes: attrs([["aria-hidden", "true"]]) });

// ---- type -------------------------------------------------------------------
const H2X = [{ "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(38), "line-height": px(46), margin: P0 }, { tablet: { "font-size": px(36), "line-height": px(44) }, mobile: { "font-size": px(30), "line-height": px(36) } }];
const LEADX = (color = T.body) => [{ ...text(18, 500, color, { "line-height": px(26) }), margin: P0 }, { mobile: { "font-size": px(17), "line-height": px(24) } }];
const SMALL = [{ ...text(15, 500, T.body, { "line-height": px(24) }), margin: P0 }, {}];
const H2W = [{ ...text(30, 600, T.forest, { "line-height": px(34) }), margin: P0 }, { mobile: { "font-size": px(26), "line-height": px(32) } }];
const PW = [{ ...text(16, 500, "#000000", { "line-height": px(25) }), margin: P0 }, { mobile: { "font-size": px(15), "line-height": px(24) } }];
const h2 = (id, html, styles = H2X, attributes = []) => w(id, "e-heading", { tag: "h2", title: html, ...(attributes.length && { attributes: attrs(attributes) }) }, styles);
const para = (id, html, styles, attributes = []) => w(id, "e-paragraph", { paragraph: html, ...(attributes.length && { attributes: attrs(attributes) }) }, styles);

// ---- page CSS (plan 1.4; selectors use Foundation's `body .elementor` form so they beat the local-style classes) -----------------
const B = "body .elementor";
const CSS = {
  brXl: `@media (max-width: 1279px) { ${B} [data-br-xl] br { display: none; } } /* <br className="max-xl:hidden">: exhibit/Grow BR, visit/VisitorGroups tags */`,
  brSm: `@media (max-width: 639px) { ${B} [data-br-sm] br { display: none; } } /* whitespace-pre-line max-sm:whitespace-normal: exhibit/Buyers, who/SectorCard row tiles */`,
  prewrap: `${B} [data-prewrap] { white-space: pre-wrap; } /* visit/VisitorGroups tags whitespace-pre-wrap */`,
  prewrapLg: `@media (min-width: 1025px) { ${B} [data-prewrap-lg] { white-space: pre-wrap; } } /* exhibit/Showcase card text lg:whitespace-pre-wrap */`,
  groupLift: `@media (hover: hover) { ${B} [data-group]:hover [data-group-lift] { transform: translateY(-3px); } } /* group-hover:-translate-y-[3px]: why/Sections Items icon, visit/VisitorGroups icon */`,
  hyphens: `${B} [data-hyphens] { -webkit-hyphens: auto; hyphens: auto; } /* who/SectorCard row tile label hyphens-auto */`,
  sc: `@media (min-width: 640px) and (max-width: 767px) { /* who/SectorCard sm: */ ${B} [data-sc="head"] { flex-direction: row; align-items: center; gap: 24px; } ${B} [data-sc="body"] { padding-left: 4px; padding-right: 4px; } ${B} [data-sc="tiles-row"] { grid-template-columns: repeat(2, minmax(0, 1fr)); } ${B} [data-sc="tiles-stack"] { grid-template-columns: repeat(3, minmax(0, 1fr)); } ${B} [data-sc="tile-row"] { gap: 12px; padding-left: 14px; padding-right: 14px; } ${B} [data-sc-h="62"] { min-height: 62px; } ${B} [data-sc-h="79"] { min-height: 79px; } }`,
  buyers400: `@media (min-width: 400px) and (max-width: 767px) { ${B} [data-id="we-buy-grid"] { grid-template-columns: repeat(2, minmax(0, 1fr)); } } /* exhibit/Buyers min-[400px]:grid-cols-2 */`,
  growSm: `@media (min-width: 640px) and (max-width: 767px) { ${B} [data-id="we-grow-grid"] { grid-template-columns: repeat(2, minmax(0, 1fr)); } } /* exhibit/Grow sm:grid-cols-2 */`,
  showSm: `@media (min-width: 640px) and (max-width: 767px) { ${B} [data-id="we-show-ctas"] { flex-direction: row; flex-wrap: wrap; align-items: flex-start; } } /* exhibit/Showcase CTAs sm:flex-row sm:flex-wrap sm:items-start */`,
  vg480: `@media (min-width: 480px) and (max-width: 767px) { ${B} [data-vg="head"] { flex-direction: row; gap: 24px; } } /* visit/VisitorGroups min-[480px]:flex-row min-[480px]:gap-[24px] */`,
  sc2Scale: `${B} [data-id="se-sc2-img"] { scale: 1.14; transform-origin: 50% 0; } /* who/SectorCard Agri pos "object-top scale-[1.14] origin-top" */`,
};

// ---- why/Sections Intro -------------------------------------------------------
const intro = (p, copy) =>
  div(`${p}-intro`, mix(ROW, [{ margin: mtAuto(42), padding: P0 }, { tablet: { margin: mtAuto(32) } }]), [
    div(`${p}-intro-p`, [{ position: "relative", "max-width": px(1285), padding: pad(0, 0, 0, 19) }, {}], [
      div(`${p}-intro-rule`, [{ ...at(px(-5), null, px(-5), px(6)), width: px(5), "min-width": px(5), height: AUTO, padding: P0, background: { color: T.accent } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
      para(`${p}-intro-t`, copy, [{ ...text(15, 500, T.body, { "line-height": px(23) }), margin: P0 }, {}]),
    ]),
  ], { tag: "section", attributes: attrs(reveal(0)) });

// ---- who/SectorCard -----------------------------------------------------------
const sectorCard = (p, n, o) => {
  const id = `${p}-sc${n}`, row = o.tiles === "row";
  const tiles = o.items.map((it, k) => {
    const tid = `${id}-t${k + 1}`;
    return row
      ? box(tid, [
          { padding: pad(13, 14), "align-items": "center", display: "flex", "flex-direction": "row", gap: gap(0, 12), "min-height": px(o.tileH), "border-width": pad(1), "border-style": "solid", "border-color": T.accent, "border-radius": radius(14), background: { color: T.mint } },
          { mobile: { gap: gap(0, 10), padding: pad(13, 10), "min-height": px(0) } },
        ], [
          ico(`${tid}-i`, it.icon, it.iconSize),
          para(`${tid}-t`, it.label, [{ ...text(13, 500, T.accent, { "line-height": px(17) }), margin: P0, flex: flex(1, 1, pct(0)), "min-width": px(0) }, {}], [["data-br-sm", ""], ["data-hyphens", ""]]),
        ], { attributes: attrs([["role", "listitem"], ["data-sc", "tile-row"], ["data-sc-h", String(o.tileH)]]) })
      : box(tid, [
          { padding: pad(16, 10, 14, 10), "align-items": "center", display: "flex", "flex-direction": "column", gap: gap(10, 0), "min-height": px(123), "text-align": "center", "border-width": pad(1), "border-style": "solid", "border-color": T.accent, "border-radius": radius(14), background: { color: T.mint } },
          {},
        ], [
          ico(`${tid}-i`, it.icon, it.iconSize),
          para(`${tid}-t`, it.label, [{ ...text(13, 500, T.accent, { "line-height": px(17) }), margin: P0, "text-align": "center" }, {}]),
        ], { attributes: attrs([["role", "listitem"]]) });
  });
  const photo = div(`${id}-photo`, [
    { position: "relative", overflow: "hidden", padding: P0, flex: flex(0, 0, AUTO), width: px(560), height: AUTO, "border-radius": radius(22), background: PHOTO_BG },
    { tablet_extra: { width: pct(40) }, tablet: { width: pct(100), "aspect-ratio": "560/300" }, mobile: { "border-radius": radius(18) } },
  ], [fillImg(`${id}-img`, o.img, { pos: o.pos })], { attributes: attrs([["data-group", ""], ...reveal(0)]) });
  const body = box(`${id}-body`, [
    { padding: o.flip ? pad(16, 0, 16, 24) : pad(16, 24, 16, 0), display: "flex", "flex-direction": "column", "align-items": "flex-start", flex: flex(1, 1, pct(0)), "min-width": px(0), gap: gap(20, 0) },
    { tablet: { padding: pad(0, 8, 8, 8) }, mobile: { padding: pad(0, 0, 8, 0) } },
  ], [
    box(`${id}-head`, [
      { padding: P0, width: pct(100), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 24) },
      { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0) } },
    ], [
      div(`${id}-icon`, [
        { width: px(76), height: px(76), padding: P0, "border-radius": radius(999), background: { color: T.mint }, display: "flex", "align-items": "center", "justify-content": "center", flex: flex(0, 0, AUTO) },
        { mobile: { width: px(64), height: px(64) } },
      ], [ico(`${id}-icon-i`, o.icon, 36)]),
      box(`${id}-titles`, [{ padding: P0, width: AUTO, display: "flex", "flex-direction": "column", gap: gap(8, 0), flex: flex(1, 1, pct(0)), "min-width": px(0) }, {}], [
        h2(`${id}-title`, o.title, [{ "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(36), "line-height": px(42), margin: P0 }, { mobile: { "font-size": px(28), "line-height": px(34) } }]),
        para(`${id}-lead`, o.lead, [{ ...text(15, 500, T.body, { "line-height": px(23) }), margin: P0 }, {}]),
      ]),
    ], { attributes: attrs([["data-sc", "head"]]) }),
    div(`${id}-tiles`, [
      { padding: P0, display: "grid", width: pct(100), gap: gap(8), "grid-template-columns": COLS(row ? 4 : 5) },
      row ? { laptop: { "grid-template-columns": COLS(2) }, tablet: { "grid-template-columns": COLS(4) }, mobile: { "grid-template-columns": COLS(1) } } : { mobile: { "grid-template-columns": COLS(2) } },
    ], tiles, { attributes: attrs([["role", "list"], ["data-sc", "tiles-" + o.tiles]]) }),
    para(`${id}-text`, o.text, [{ ...text(16, 500, T.body, { "line-height": px(25) }), margin: P0 }, {}]),
  ], { attributes: attrs([...reveal(1), ["data-sc", "body"]]) });
  return div(id, mix(W1360, [{ margin: mtAuto(24), padding: P0 }, {}]), [
    box(`${id}-card`, [
      {
        padding: pad(20), display: "flex", "flex-direction": o.flip ? "row-reverse" : "row", "align-items": "stretch", gap: gap(0, 40), "border-radius": radius(28),
        background: layers(grad(90, [["#eef6ef", 0], [T.page, 100]])),
      },
      { tablet_extra: { gap: gap(0, 32) }, tablet: { "flex-direction": "column", gap: gap(24, 0), "border-radius": radius(24) }, mobile: { padding: pad(16) } },
    ], [photo, body]),
  ], { tag: "section" });
};

// ---- why/Sections Photo / Body / Items ---------------------------------------------
const whyPhoto = (id, o) =>
  div(id, [
    { position: "relative", overflow: "hidden", padding: P0, flex: flex(0, 0, AUTO), width: px(o.lgW), "aspect-ratio": o.aspect, "border-radius": radius(18), background: PHOTO_BG },
    { tablet: { width: pct(100) } },
  ], [
    div(`${id}-zoom`, [{ ...FILL, padding: P0 }, {}], [
      o.box
        ? w(`${id}-img`, "e-image", { image: image(M[o.img].id) }, [{ ...at(pct(o.box.t), null, null, pct(o.box.l)), width: pct(o.box.w), height: pct(o.box.h), "max-width": custom("none"), ...COVER }, {}])
        : w(`${id}-img`, "e-image", { image: image(M[o.img].id) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), ...COVER }, {}]),
    ], { attributes: attrs([["data-zoom", ""]]) }),
  ], { attributes: attrs([["data-group", ""], ...reveal(0)]) });

const whyItems = (id, list) =>
  div(id, [
    { padding: pad(16, 10), display: "grid", width: pct(100), "border-radius": radius(16), background: { color: "rgba(226,240,228,0.7)" }, gap: gap(16, 4), "grid-template-columns": COLS(6) },
    { mobile: { "grid-template-columns": COLS(3) } },
  ], list.map(([label, icon], k) =>
    box(`${id}-${k + 1}`, [{ padding: P0, display: "flex", "flex-direction": "column", "align-items": "center", gap: gap(8, 0), "text-align": "center" }, {}], [
      svg(`${id}-${k + 1}-i`, icon, [{ width: px(30), height: px(30), transition: ease(250) }, {}], { attributes: attrs([["aria-hidden", "true"], ["data-group-lift", ""]]) }),
      para(`${id}-${k + 1}-t`, label, [{ ...text(12, 500, T.dark, { "line-height": px(16) }), margin: P0, "text-align": "center" }, {}]),
    ], { attributes: attrs([["role", "listitem"], ["data-group", ""]]) }),
  ), { attributes: attrs([["role", "list"]]) });

const whyBody = (id, o) =>
  box(id, [
    { padding: pad(...o.pad), display: "flex", "flex-direction": "column", "align-items": "flex-start", flex: flex(1, 1, pct(0)), "min-width": px(0), gap: gap(14, 0) },
    { tablet: { padding: P0 } },
  ], [h2(`${id}-title`, o.title, H2W), para(`${id}-lead`, o.lead, PW), whyItems(`${id}-items`, o.items), para(`${id}-close`, o.close, PW)], { attributes: attrs(reveal(1)) });

module.exports = { NARROW, W1360, ROW, PHOTO_BG, CSS, STR, COLS, pos, COVER, fillImg, ico, H2X, LEADX, SMALL, H2W, PW, h2, para, intro, sectorCard, whyPhoto, whyBody, whyItems };
