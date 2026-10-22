// Shared helpers for the Elementor rebuild of this site on WordPress staging.
// Port of /Volumes/ohmyweb/github/fruitlogistica/scripts/elementor/lib.js, pinned to the
// ffe-staging profile: never point this at another site (see CLAUDE.md).
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const SITE = "ffe-staging";
const ORIGIN = "https://ffe-staging.ohmyweb.in";

// Ability payloads are written to a file and passed as @file; they are far too big for argv.
const SP = path.join(__dirname, ".tmp");
fs.mkdirSync(SP, { recursive: true });
let n = 0;
function call(ability, input) {
  const f = `${SP}/call-${process.pid}-${++n}.json`; // pid: parallel workers must not share payload files
  fs.writeFileSync(f, JSON.stringify(input));
  const r = execFileSync("novamira", ["--site", SITE, "run", ability, "--yes", "--input", `@${f}`, "--json"], {
    encoding: "utf8",
    maxBuffer: 1 << 26,
  });
  const j = JSON.parse(r);
  if (!j.ok || j.data.success === false) throw new Error(ability + " -> " + JSON.stringify(j.error || j.data).slice(0, 1500));
  return j.data;
}
const php = (code) => call("novamira/execute-php", { code });

// ---- design tokens, from src/app/globals.css ------------------------------
const T = {
  page: "#f4f8f4",
  brand: "#2ca62f",
  accent: "#28ae3d",
  forest: "#025d03",
  mint: "#e2f0e4",
  body: "#4f4f4f",
  ink: "rgba(0,0,0,0.78)",
  white: "#FFFFFF",
  sun: "#fff001",
  dark: "#032919",
  ink78: "rgba(0,0,0,0.78)",
  maxw: 1286, // .container-page
};
const OUTFIT = { $$type: "font-family", value: "Outfit" };
const FREDOKA = { $$type: "font-family", value: "Fredoka" };

const px = (v) => ({ size: v, unit: "px" });
const em = (v) => ({ size: v, unit: "em" });
const pct = (v) => ({ size: v, unit: "%" });
const custom = (v) => ({ $$type: "size", value: { size: v, unit: "custom" } });
const pad = (bs, ie = bs, be = bs, is = ie) => ({ "block-start": px(bs), "inline-end": px(ie), "block-end": px(be), "inline-start": px(is) });
// Atomic containers default to padding:10px and width:100%; pure layout boxes zero the padding.
const P0 = pad(0);
// Centred box with a top margin (margin-inline: auto).
const AUTO = { size: "", unit: "auto" };
const mtAuto = (top) => ({ "block-start": px(top), "inline-end": AUTO, "block-end": px(0), "inline-start": AUTO });
const radius = (r) => ({ "start-start": px(r), "start-end": px(r), "end-start": px(r), "end-end": px(r) });
const gap = (row, column = row) => ({ row: px(row), column: px(column) });
const flex = (grow, shrink, basis) => ({ flexGrow: grow, flexShrink: shrink, flexBasis: basis });
const link = (dest, blank) => ({ $$type: "link", value: { destination: dest, isTargetBlank: { $$type: "boolean", value: !!blank } } });
const image = (id) => ({ $$type: "image", value: { src: { $$type: "image-src", value: { id: { $$type: "image-attachment-id", value: id } } }, size: "full" } });

// Local styles: one class per element, variants per breakpoint / state.
// Elementor's breakpoints (desktop-first): desktop (base), laptop (<=1439), tablet_extra (<=1279), tablet (<=1024), mobile (<=767).
const V = (id, desktop, more = {}) => ({
  ["s-" + id]: {
    id: "s-" + id,
    type: "class",
    label: "local",
    variants: [
      { meta: { breakpoint: "desktop", state: null }, props: desktop },
      ...(more.hover ? [{ meta: { breakpoint: "desktop", state: "hover" }, props: more.hover }] : []),
      ...(more.laptop ? [{ meta: { breakpoint: "laptop", state: null }, props: more.laptop }] : []),
      ...(more.tablet_extra ? [{ meta: { breakpoint: "tablet_extra", state: null }, props: more.tablet_extra }] : []),
      ...(more.tablet ? [{ meta: { breakpoint: "tablet", state: null }, props: more.tablet }] : []),
      ...(more.mobile ? [{ meta: { breakpoint: "mobile", state: null }, props: more.mobile }] : []),
    ],
  },
});

// Tree nodes for set-content.
const box = (id, styles, children = [], settings = {}) => ({ id, elType: "e-flexbox", settings, styles: V(id, ...styles), elements: children });
const div = (id, styles, children = [], settings = {}) => ({ id, elType: "e-div-block", settings, styles: V(id, ...styles), elements: children });
const w = (id, widgetType, settings, styles) => ({ id, elType: "widget", widgetType, settings, styles: styles ? V(id, ...styles) : {}, elements: [] });

// HTML attributes on an atomic element, e.g. attrs([["aria-label", "Home"]]).
// Elementor drops attributes whose value is "", so a flag like ["data-trim", ""] is stored as "1" (the kit CSS and snippet match on presence).
const attrs = (pairs) => ({ $$type: "attributes", value: pairs.map(([k, v]) => ({ $$type: "key-value", value: { key: { $$type: "string", value: k }, value: { $$type: "string", value: v === "" ? "1" : v } } })) });
const media = () => JSON.parse(fs.readFileSync(path.join(__dirname, "media.json"), "utf8"));

// ---- fully wrapped style values the server can't infer from scalars -------
const sz = (size, unit = "px") => ({ $$type: "size", value: { size, unit } });
const shadow = (h, v, blur, spread, color) => ({
  $$type: "box-shadow",
  value: [{ $$type: "shadow", value: { hOffset: sz(h), vOffset: sz(v), blur: sz(blur), spread: sz(spread), color: { $$type: "color", value: color } } }],
});
const ease = (ms) => ({
  $$type: "transition",
  value: [{ $$type: "selection-size", value: { selection: { $$type: "key-value", value: { key: { $$type: "string", value: "All properties" }, value: { $$type: "string", value: "all" } } }, size: sz(ms, "ms") } }],
});
// Buttons and cards rise 3px on hover (globals.css --lift).
const lift = { $$type: "transform", value: { "transform-functions": { $$type: "transform-functions", value: [{ $$type: "transform-move", value: { x: sz(0), y: sz(-3), z: sz(0) } }] } } };
const text = (size, weight, color, more = {}) => ({ "font-family": OUTFIT, "font-size": px(size), "font-weight": String(weight), color, ...more });
const HIDE = { display: "none" };
// e-svg draws its <svg> inline (on the text baseline); flex centres it in its box.
const svg = (id, key, [desktop, more], settings = {}) =>
  w(id, "e-svg", { svg: { $$type: "svg-src", value: { id: { $$type: "image-attachment-id", value: media()[key].id }, url: null } }, ...settings }, [{ display: "flex", ...desktop }, more]);

// ---- shared by the home sections ------------------------------------------
const DATE = "16-18 Nov. 2027";
const VENUE = "Sands Expo &amp; Convention Centre, Singapore";
const NORMAL = custom("normal"); // line-height: normal (Hello Elementor's body is 1.5)

const stop = ([color, offset]) => ({ $$type: "color-stop", value: { color: { $$type: "color", value: color }, offset: { $$type: "number", value: offset } } });
const grad = (angle, stops) => ({
  $$type: "background-gradient-overlay",
  value: { type: { $$type: "string", value: "linear" }, angle: { $$type: "number", value: angle }, stops: { $$type: "gradient-color-stop", value: stops.map(stop) } },
});
const layers = (...l) => ({ $$type: "background", value: { "background-overlay": { $$type: "background-overlay", value: l } } });
const at = (top, right, bottom, left) => ({
  position: "absolute",
  ...(top !== null && { "inset-block-start": top }),
  ...(right !== null && { "inset-inline-end": right }),
  ...(bottom !== null && { "inset-block-end": bottom }),
  ...(left !== null && { "inset-inline-start": left }),
});
const FILL = { ...at(px(0), px(0), px(0), px(0)), width: AUTO, height: AUTO };
const BRAND0 = "rgba(44,166,47,0)";
// Page-load rise (globals.css .load-in, keyframes in site.js): n = step in the sequence.
const step = (n) => attrs([["data-load-in", String(n)]]);
const toLeft = (c0, c1) => grad(270, [[c0, 0], [c1, 100]]); // bg-linear-to-l from-X/0 to-X

const tf = (type, value) => ({ $$type: "transform", value: { "transform-functions": { $$type: "transform-functions", value: [{ $$type: type, value }] } } });
const rotate = (deg) => tf("transform-rotate", { x: sz(0, "deg"), y: sz(0, "deg"), z: sz(deg, "deg") });
const scale = (x, y = x) => tf("transform-scale", { x: { $$type: "number", value: x }, y: { $$type: "number", value: y }, z: { $$type: "number", value: 1 } });

// Merge [desktop, more] style pairs: later pairs win per property, per breakpoint.
const mix = (...pairs) => {
  const desktop = {}, more = {};
  for (const [d = {}, m = {}] of pairs) {
    Object.assign(desktop, d);
    for (const [bp, props] of Object.entries(m)) more[bp] = { ...more[bp], ...props };
  }
  return [desktop, more];
};
// .container-page / .container-wide (globals.css). Margins stay the caller's (mtAuto per variant).
const PAGE = (g = 32, gm = 26) => [{ width: custom(`min(1286px, 100% - ${2 * g}px)`), "max-width": custom("none") }, { mobile: { width: custom(`min(1286px, 100% - ${2 * gm}px)`) } }];
const WIDE = [{ width: custom("min(1395px, 100% - 32px)"), "max-width": custom("none") }, { mobile: { width: custom("min(1395px, 100% - 52px)") } }];
// Scroll reveal attribute pairs (RevealObserver.tsx); i = the source --i stagger step. Combine: attrs([...reveal(1), ["aria-hidden","true"]]).
const reveal = (i = 0, kind = "") => [["data-reveal", kind], ...(i ? [["data-reveal-i", String(i)]] : [])];

// Pill button (ui.tsx <Button>). o = { w, h, pl, gap, fs = 18, color, bg = null, border = null /* [width, color] */, hoverBg,
// chev /* media key */, m /* phone box, see below */, mColor, mBg }. Without `m` the pill is fluid on phones.
// m = { w, h, pl = 0, gap = 0, fs, chev = 1, lh, tw, center }.
const btn = (id, label, href, o) => {
  const { w: width, h, pl, gap: g, fs = 18, color, bg = null, border = null, hoverBg, chev, m, mColor, mBg } = o;
  const cw = chev.includes("-sm-") ? 6 : 7.656, ch = chev.includes("-sm-") ? 11 : 13.288; // rotated asset size
  const mobile = m
    ? {
        width: px(m.w), height: AUTO, "min-height": px(m.h), padding: pad(0, 0, 0, m.pl ?? 0), gap: gap(0, m.gap ?? 0), "font-size": px(m.fs),
        "line-height": m.lh ? px(m.lh) : pct(120), "letter-spacing": px(+(m.fs * 0.02).toFixed(3)),
        ...(m.center && { "justify-content": "center", padding: P0, "text-align": "center" }),
        ...(mBg && { background: { color: mBg } }),
      }
    : { width: AUTO, height: AUTO, "min-height": px(Math.max(h, 44)), padding: pad(10, pl, 10, pl), "justify-content": "center", ...(mBg && { background: { color: mBg } }) };
  return box(
    id,
    [
      {
        ...text(fs, 500, color, { "letter-spacing": px(+(fs * 0.02).toFixed(3)), "line-height": pct(120) }),
        position: "relative", width: px(width), height: px(h), padding: pad(0, 0, 0, pl), "border-radius": radius(999),
        ...(border && { "border-width": pad(border[0]), "border-style": "solid", "border-color": border[1] }),
        ...(bg && { background: { color: bg } }),
        display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, g), transition: ease(250),
      },
      { hover: { transform: lift, "box-shadow": shadow(0, 10, 24, -10, "rgba(2,93,3,0.45)"), ...(hoverBg && { background: { color: hoverBg } }) }, mobile },
    ],
    [
      w(id + "-t", "e-paragraph", { tag: "span", paragraph: label, attributes: attrs([["data-untrim", ""], [m?.tw ? "data-nowrap-md" : "data-nowrap", ""]]) }, [
        { color, margin: P0 },
        { mobile: { ...(mColor && { color: mColor }), ...(m?.tw && { "max-width": px(m.tw) }) } },
      ]),
      svg(id + "-chev", chev, [
        { width: px(cw), height: px(ch) },
        { mobile: m ? { ...(m.chev && m.chev !== 1 && { width: px(+(cw * m.chev).toFixed(3)), height: px(+(ch * m.chev).toFixed(3)) }), ...(m.center && HIDE) } : {} },
      ], { attributes: attrs([["data-nudge", ""]]) }),
    ],
    { tag: "a", link: link(href), attributes: attrs([["data-btn", ""], ...(m ? [["data-m", ""]] : [])]) },
  );
};

// DateVenue (ui.tsx): white rule + icon rows. Ids: ${prefix}-when, ${prefix}-date[-i|-t], ${prefix}-venue[-i|-t].
// styles = [desktop, more] overrides for the outer box (margins). date === false -> venue row only.
const dateVenue = (prefix, date = DATE, styles = [{}, {}], settings = {}) => {
  const M = media();
  const row = (id, icon, label, phoneIcon) =>
    box(id, [
      { padding: P0, height: px(23), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 11) },
      { mobile: { height: AUTO, "align-items": "flex-start" } },
    ], [
      w(id + "-i", "e-image", { image: image(M[icon].id) }, [{ width: px(23), height: px(23), "min-width": px(23) }, { mobile: phoneIcon }]),
      w(id + "-t", "e-paragraph", { paragraph: label, attributes: attrs([["data-untrim", ""]]) }, [
        { ...text(22, 500, T.white, { "letter-spacing": px(0.32), "line-height": px(31) }), margin: P0 }, // 0.02em of the <li>'s 16px, inherited as px
        { mobile: { "font-size": px(17), "line-height": px(21), "max-width": px(239), margin: pad(-3.5, 0, -4.5, 0) } },
      ]),
    ]);
  return box(
    `${prefix}-when`,
    mix(
      [
        { margin: pad(19.5, 0, 0, 0), padding: pad(9, 0, 9, 11), "border-width": pad(0, 0, 0, 5), "border-style": "solid", "border-color": T.white,
          display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO },
        { mobile: { margin: pad(17.74, 0, 0, 0), padding: pad(8, 0, 0, 11), gap: gap(10, 0) } },
      ],
      styles,
    ),
    [
      ...(date !== false ? [row(`${prefix}-date`, "icon-calendar", date, { width: px(17), height: px(17), "min-width": px(17) })] : []),
      row(`${prefix}-venue`, "icon-location", VENUE, { width: px(16), height: px(16), "min-width": px(16), margin: pad(0, 1, 0, 0) }),
    ],
    settings,
  );
};

module.exports = { call, php, SITE, ORIGIN, SP, T, OUTFIT, FREDOKA, px, em, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, image, V, box, div, w, attrs, media, sz, shadow, ease, lift, text, HIDE, svg , DATE, VENUE, NORMAL, stop, grad, layers, at, FILL, BRAND0, step, toLeft, rotate, scale, mix, PAGE, WIDE, reveal, btn, dateVenue };
