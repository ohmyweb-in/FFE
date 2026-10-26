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
// media.json plus every media-<group>.json (written by `media.py g<n>`), merged once per process. A key in two files is an error.
let mediaMap;
const media = () => {
  if (mediaMap) return mediaMap;
  const files = ["media.json", ...fs.readdirSync(__dirname).filter((f) => /^media-.+\.json$/.test(f)).sort()];
  mediaMap = {};
  for (const f of files)
    for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(path.join(__dirname, f), "utf8")))) {
      if (k in mediaMap) throw new Error(`duplicate media key ${k} (${f})`);
      mediaMap[k] = v;
    }
  return mediaMap;
};

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


// ════ Inner pages (pages plan 2): shared components ═════════════════════════════════════════════════════════════
const DATE_LONG = "16–18 November 2027";
const SIAW_SITE = "https://sginternationalagrifoodweek.com.sg/";
const BRAND85 = "rgba(44,166,47,0.85)";
const WASH = grad(180, [[T.brand, 35], [BRAND85, 50], ["rgba(44,166,47,0.65)", 100]]); // PageHero below-lg wash
const lsp = (fs) => px(+(fs * 0.02).toFixed(3)); // tracking-[0.02em] in px

// PageHero SIZES, transcribed from PageHero.tsx (Tailwind classes -> numbers). Per size:
//   panel: lg+ height; radius: lg+ radius (default 25); curve: { top | bottom, w, h, key? } (key = media key of an svg, else the about png crop);
//   pt / pl / left: lg+ content padding-top / padding-left / relative left; title: { mt (lg+), all (mt at every width), fs, lh };
//   descType: { max, fs: [phone, md+], lh: [phone, md+] (null = normal), weight, ml, untrim, ls } (absent = DESC_TYPE); desc: lg+ margin-top;
//   date / ctas: [md+, lg+] margin-top (absent = 22 / 24 everywhere); fades: [{ left, w, xlHide }].
const F2 = [{ left: 16.7, w: 38.57 }, { left: 36.63, w: 38.57 }];
const F3 = [{ left: 16.34, w: 72.83 }, { left: 16.34, w: 38.57 }];
const MEDIUM = (max, lh, ml) => ({ max, fs: [17, 18], lh: [23, lh], weight: 500, ml, untrim: true }); // "text-[17px] leading-[23px] font-medium [text-box:normal]!"
const CURVE_EXHIBIT = { w: 196.841, h: 157.316, key: "ph-curve-exhibit" };
const HERO_SIZES = {
  default: { panel: 501, curve: { bottom: 0, w: 213, h: 181 }, pt: 80, pl: 6.5, desc: 31, date: [28], ctas: [34], fades: F2 },
  compact: { panel: 426, curve: { bottom: 5, w: 195, h: 165 }, pt: 77, pl: 12.5, desc: 39, date: [28], ctas: [34, 39.6], fades: F2 },
  tall: { panel: 371, curve: { bottom: 0, w: 194.586, h: 165.352 }, pt: 53, pl: 15, desc: 20, date: [28, 24], fades: F2 },
  siaw: {
    panel: 516, curve: { bottom: 0.88, w: 197.477, h: 167.809 }, pt: 88, pl: 19, title: { mt: 31.93 },
    descType: { max: 694, fs: [17, 18], lh: [22, 23], weight: 400, untrim: true }, desc: 30.88, ctas: [28.71], fades: [{ left: 34.16, w: 42.72 }],
  },
  eco: {
    panel: 351, curve: { top: 171, w: 230.623, h: 184.316, key: "ph-curve-eco" }, pt: 64.37, pl: 1.52, title: { mt: 30.86 },
    descType: MEDIUM(625, 25, 4), desc: 26, ctas: [30], fades: [{ left: 16.35, w: 48.46 }, { left: 16.35, w: 35.56 }],
  },
  story: {
    panel: 342, curve: { top: 161, w: 230.623, h: 184.316, key: "ph-curve-eco" }, pt: 59, pl: 0.51, title: { mt: 0, all: true },
    descType: MEDIUM(625, 25, 4), desc: 24, ctas: [28], fades: [{ left: 16.35, w: 72.83 }, { left: 16.34, w: 38.57 }],
  },
  exhibit: {
    panel: 380, curve: { top: 212, ...CURVE_EXHIBIT }, pt: 59, pl: 0.99, title: { mt: 0, all: true },
    descType: MEDIUM(620, 26, 4), desc: 23, ctas: [22], fades: [{ left: 16.42, w: 72.83 }, { left: 16.34, w: 38.57 }],
  },
  apply: { panel: 246, radius: 30, curve: { top: 93, ...CURVE_EXHIBIT }, pt: 59, pl: 13, title: { mt: 0, all: true, fs: 45, lh: 48 }, fades: F3 },
  applyLong: { panel: 294, radius: 30, curve: { top: 141, ...CURVE_EXHIBIT }, pt: 59, pl: 13, title: { mt: 0, all: true, fs: 45, lh: 48 }, fades: F3 },
  plan: {
    panel: 338, radius: 30, curve: { top: 174, ...CURVE_EXHIBIT }, pt: 54, left: -0.5, title: { mt: 0, all: true },
    descType: MEDIUM(620, 26), desc: 23, ctas: [18], fades: [{ left: 34.95, w: 23.3 }, { left: 34.95, w: 30, xlHide: true }],
  },
  register: {
    panel: 360, radius: 30, curve: { top: 171.98, w: 196.842, h: 207.848, key: "ph-curve-register" }, pt: 71, pl: 0.5, title: { mt: 0, all: true },
    ctas: [26], fades: F3.map((f, i) => (i ? f : { left: 16.42, w: 72.83 })),
  },
  why: { panel: 316, radius: 30, curve: { top: 142, ...CURVE_EXHIBIT }, pt: 59, pl: 0.5, title: { mt: 0, all: true }, ctas: [26], fades: F3 },
  contact: { panel: 298, curve: { top: 118, w: 213, h: 181 }, pt: 111, pl: 0.13, fades: [{ left: 16.72, w: 38.57 }, { left: 16.75, w: 38.57 }] },
  gallery: { panel: 316, radius: 30, curve: { top: 162, ...CURVE_EXHIBIT }, pt: 77, pl: 0.5, title: { mt: 0, all: true }, descType: MEDIUM(448, 26), desc: 22, ctas: [29], fades: F3 },
};

// HeroCtas (PageHero.tsx): Register / Apply / Stay Connected, 200/162/162 x 40 white pills. o = { stayHref, registerHref, styles, attributes /* extra attr pairs */ }.
const heroCtas = (p, o = {}) => {
  const { stayHref = "/subscribe", registerHref = "/register-to-visit", styles = [{}, {}], attributes = [] } = o;
  const HB = { h: 40, fs: 15, border: [1, T.white] };
  const GHOST = { color: T.white, bg: "rgba(255,255,255,0)", hoverBg: "rgba(255,255,255,0.1)", chev: "chevron-sm-white" };
  return box(
    `${p}-ctas`,
    mix([
      { padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", "align-items": "flex-start", gap: gap(13), width: AUTO },
      { mobile: { "flex-direction": "column", gap: gap(11) } },
    ], styles),
    [
      btn(`${p}-ctas-register`, "Register Your Interest", registerHref, { ...HB, w: 200, pl: 19, gap: 12, color: T.brand, bg: T.white, chev: "chevron-sm-brand", m: { w: 202, h: 43, pl: 25, gap: 7, fs: 15 } }),
      btn(`${p}-ctas-apply`, "Apply To Exhibit", "/apply-to-exhibit", { ...HB, w: 162, pl: 19, gap: 12, ...GHOST, m: { w: 178, h: 43, pl: 25, gap: 9, fs: 15 } }),
      btn(`${p}-ctas-stay`, "Stay Connected", stayHref, { ...HB, w: 162, pl: 19, gap: 14, ...GHOST, m: { w: 178, h: 43, pl: 25, gap: 9, fs: 15 } }),
    ],
    attributes.length ? { attributes: attrs(attributes) } : {},
  );
};

// HeroVenue (PageHero.tsx): date + venue list for `cta` heroes. styles = [desktop, more] overrides for the list (default margin-left 4 at lg+).
const heroVenue = (p, styles = [{}, {}]) => {
  const row = (id, icon, label) =>
    box(id, [{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 12), width: AUTO }], [
      svg(`${id}-i`, icon, [{ width: px(24), height: px(24), "min-width": px(24) }, {}], { attributes: attrs([["aria-hidden", "true"]]) }),
      w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: label, attributes: attrs([["data-untrim", ""]]) }, [
        { ...text(18, 600, T.white, { "line-height": px(23) }), margin: P0 },
        { mobile: { "font-size": px(17) } },
      ]),
    ], { attributes: attrs([["role", "listitem"]]) });
  return box(
    `${p}-venue`,
    mix([
      { padding: pad(4, 0), margin: pad(0, 0, 0, 4), display: "flex", "flex-direction": "column", gap: gap(10, 0), width: AUTO },
      { tablet: { margin: P0 } },
    ], styles),
    [row(`${p}-venue-date`, "icon-cal-24", DATE_LONG), row(`${p}-venue-place`, "icon-pin-24", VENUE)],
    { attributes: attrs([["role", "list"]]) },
  );
};

// PageHero (PageHero.tsx). One section `${p}-ph` (_cssid "top"); sizes in HERO_SIZES. See the plan 2.1 for `o`.
const pageHero = (p, o = {}) => {
  const { size = "default", eyebrow, title, titleBr = "lg", titleAttrs = [], desc, img, imgBox, curveLeft = 0, date, stayHref, cta, cssid = "top" } = o;
  const z = HERO_SIZES[size];
  if (!z) throw new Error(`pageHero: unknown size ${size}`);
  const id = `${p}-ph`, M = media();
  const tm = z.title ?? {}, dt = z.descType;

  const photo = w(`${id}-photo`, "e-image", { image: image(M[img].id), attributes: attrs([["loading", "eager"], ["fetchpriority", "high"], ["aria-hidden", "true"]]) }, [
    { ...at(pct(imgBox.top), null, null, pct(imgBox.left)), width: pct(imgBox.w), height: pct(imgBox.h ?? 100), "max-width": custom("none"), "object-fit": "cover" },
    { tablet: { ...at(px(0), null, null, px(0)), width: pct(100), height: pct(100) } },
  ]);
  const wash = div(`${id}-wash`, [{ ...FILL, padding: P0, display: "none", background: layers(WASH) }, { tablet: { display: "block" } }]);
  const fades = z.fades.map((f, k) =>
    div(`${id}-fade${k + 1}`, [
      { ...at(px(0), null, px(0), custom(`calc(${f.left}% - 3px)`)), width: pct(f.w), padding: P0, background: layers(toLeft(BRAND0, T.brand)), ...(f.xlHide && HIDE) },
      { ...(f.xlHide && { tablet_extra: { display: "block" } }), tablet: HIDE },
    ]),
  );
  const c = z.curve;
  const curve = div(`${id}-curve-box`, [
    { position: "absolute", overflow: "hidden", padding: P0, width: px(c.w), height: px(c.h), "inset-inline-start": px(curveLeft), ...(c.top !== undefined ? { "inset-block-start": px(c.top) } : { "inset-block-end": px(c.bottom) }) },
    { tablet: HIDE },
  ], [
    c.key
      ? svg(`${id}-curve`, c.key, [{ width: px(c.w), height: px(c.h) }, {}])
      : w(`${id}-curve`, "e-image", { image: image(M["ph-curve"].id) }, [{ ...at(pct(0), null, null, pct(-8.45)), width: pct(108.45), height: pct(101.93), "max-width": custom("none") }, {}]),
  ], { attributes: attrs([["aria-hidden", "true"], ["data-noevents", ""]]) });

  const kids = [];
  if (eyebrow)
    kids.push(w(`${id}-eyebrow`, "e-paragraph", { paragraph: eyebrow, attributes: step(0) }, [
      { ...text(15, 500, T.white, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: P0 }, {},
    ]));
  const tfs = tm.fs ?? 50, tmt = tm.all ? [0, 0, 0] : [22, 22, tm.mt ?? 31];
  kids.push(w(`${id}-title`, "e-heading", { tag: "h1", title, attributes: attrs([...(title.includes("<br") ? [[titleBr === "md" ? "data-br-md" : "data-br-lg", ""]] : []), ...titleAttrs, ["data-load-in", "1"]]) }, [
    { "font-family": FREDOKA, "font-size": px(tfs), "font-weight": "600", "line-height": px(tm.lh ?? 53), "letter-spacing": lsp(tfs), "text-transform": "uppercase", color: T.white, margin: pad(tmt[2], 0, 0, 0) },
    { tablet: { "font-size": px(44), "letter-spacing": px(0.88), "line-height": pct(108), margin: pad(tmt[1], 0, 0, 0) },
      mobile: { "font-size": px(30), "letter-spacing": px(0.6), "line-height": px(35), margin: pad(tmt[0], 0, 0, 0) } },
  ]));
  if (desc) {
    const fs = dt ? dt.fs : [17, 22], lh = dt ? dt.lh : [null, 31];
    kids.push(w(`${id}-desc`, "e-paragraph", { paragraph: desc, attributes: attrs([["data-load-in", "2"], ...(dt?.untrim ? [["data-untrim", ""]] : [])]) }, [
      { ...text(fs[1], dt ? dt.weight : 400, T.white, { "line-height": px(lh[1]), ...(!dt && { "letter-spacing": lsp(fs[1]) }) }), "max-width": px(dt ? dt.max : 535), margin: pad(z.desc ?? 22, 0, 0, dt?.ml ?? 0) },
      { tablet: { margin: pad(22, 0, 0, 0) },
        mobile: { "font-size": px(fs[0]), "line-height": lh[0] ? px(lh[0]) : NORMAL, ...(!dt && { "letter-spacing": lsp(fs[0]) }), margin: pad(23, 0, 0, 0) } },
    ]));
  }
  if (date) {
    const [dm, dl = dm] = z.date ?? [22];
    kids.push(dateVenue(id, date, [{ margin: pad(dl, 0, 0, 0) }, { tablet: { margin: pad(dm, 0, 0, 0) }, mobile: { margin: pad(22, 0, 0, 0) } }], { attributes: step(3) }));
  }
  const [cm, cl = cm] = z.ctas ?? [24];
  const ctaMargin = [{ margin: pad(cl, 0, 0, 0) }, { tablet: { margin: pad(cm, 0, 0, 0) }, mobile: { margin: pad(24, 0, 0, 0) } }];
  if (cta) kids.push(div(`${id}-cta`, mix([{ padding: P0 }, {}], ctaMargin), cta, { attributes: step(4) }));
  else if (stayHref) kids.push(heroCtas(id, { stayHref, styles: ctaMargin, attributes: [["data-load-in", "4"]] }));

  const content = div(`${id}-content`, mix(PAGE(32, 26), [
    { position: "relative", padding: pad(z.pt, 0, 0, z.pl ?? 0), margin: mtAuto(0), ...(z.left && { "inset-inline-start": px(z.left) }) },
    { tablet: { padding: pad(48, 0, 64, 0), ...(z.left && { "inset-inline-start": px(0) }) }, mobile: { padding: pad(48, 0, 56, 0) } },
  ]), kids, { attributes: attrs([["data-trim", ""]]) });

  const panel = div(`${id}-panel`, [
    { position: "relative", overflow: "hidden", padding: P0, height: px(z.panel), "border-radius": radius(z.radius ?? 25), background: { color: T.brand } },
    { tablet: { height: AUTO, "border-radius": radius(24) }, mobile: { "border-radius": radius(20) } },
  ], [photo, wash, ...fades, curve, content]);
  return div(id, mix(WIDE, [{ position: "relative", padding: P0, margin: mtAuto(0) }, { mobile: { margin: mtAuto(10) } }]), [panel], { tag: "section", _cssid: cssid });
};

// RuleEyebrow (story/RuleEyebrow.tsx): label + 36x1.5 rule. o = { light, styles }. Ids: id, ${id}-t, ${id}-rule.
const ruleEyebrow = (id, label, o = {}) => {
  const { light = false, styles = [{}, {}] } = o, c = light ? T.white : T.accent;
  return box(id, mix([{ padding: P0, display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 14), width: AUTO }, {}], styles), [
    w(`${id}-t`, "e-paragraph", { paragraph: label, attributes: attrs([["data-untrim", ""]]) }, [
      { ...text(15, 500, c, { "line-height": px(19), "letter-spacing": px(0.3), "text-transform": "uppercase" }), margin: P0 }, {},
    ]),
    div(`${id}-rule`, [{ width: px(36), "min-width": px(36), height: px(1.5), padding: P0, "border-radius": radius(1), background: { color: c }, flex: flex(0, 0, AUTO) }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
  ]);
};

// Pill (ui.tsx <Pill> link, .pill in globals.css). o = { color = white, bg = accent, border /* [w, color] */, hoverBg, w /* fixed width */, styles }.
const pill = (id, label, href, o = {}) => {
  const { color = T.white, bg = T.accent, border = null, hoverBg, w: width, styles = [{}, {}] } = o;
  return box(
    id,
    mix([
      {
        ...text(18, 500, color, { "line-height": px(24), "letter-spacing": px(0.36), "text-align": "center" }),
        position: "relative", display: "inline-flex", "align-items": "center", "justify-content": "center", gap: gap(0, 10), width: width ? px(width) : AUTO, ...(width && { "max-width": pct(100) }),
        height: px(52), padding: pad(0, 28), "border-radius": radius(999), background: { color: bg }, transition: ease(250),
        ...(border && { "border-width": pad(border[0]), "border-style": "solid", "border-color": border[1] }),
      },
      {
        hover: { transform: lift, "box-shadow": shadow(0, 10, 24, -10, "rgba(2,93,3,0.45)"), ...(hoverBg && { background: { color: hoverBg } }) },
        mobile: { height: AUTO, "min-height": px(44), padding: pad(10, 22), "font-size": px(16), "letter-spacing": px(0.32) },
      },
    ], styles),
    [w(`${id}-t`, "e-paragraph", { tag: "span", paragraph: `${label}⁠<span>›</span>`, attributes: attrs([["data-untrim", ""], ["data-pill", ""], ["data-nowrap-md", ""]]) }, [{ color, margin: P0 }, {}])],
    { tag: "a", link: link(href), attributes: attrs([["data-btn", ""]]) },
  );
};

// CountUp (CountUp.tsx): attribute pairs for the number's paragraph, whose text must be the formatted final value ("2,500+").
const count = (to, o = {}) => {
  const { decimals = 0, suffix = "", group = false } = o;
  return [["data-count", String(to)], ...(decimals ? [["data-decimals", String(decimals)]] : []), ...(suffix ? [["data-suffix", suffix]] : []), ...(group ? [["data-sep", ""]] : [])];
};

// SiawVideo (about/SiawVideo.tsx): a box the "FFE motion" snippet fills with a muted looping <video> and a mute button. o = { poster, label, styles }.
const video = (id, key, o = {}) => {
  const { poster, label = "Video", styles = [{}, {}] } = o, M = media();
  return div(id, mix([{ position: "relative", overflow: "hidden", padding: P0 }, {}], styles), [], {
    attributes: attrs([["data-ffe-video", M[key].url], ...(poster ? [["data-poster", M[poster].url]] : []), ["aria-label", label]]),
  });
};

// JoinBanner (home/JoinBanner.tsx), every option defaulting to the homepage values. Ids ${p}-jb-*. See the plan 2.1 for `o`.
const joinBanner = (p, o = {}) => {
  const {
    mt = [53, 64, 62], h = [760, 495], img = { top: -20.74, left: 23.7, w: 78.64, h: 141.71 }, pad: ip = { top: 63, bottom: 62, left: 0 },
    eyebrow = null, eyebrowMb = [16, 19], eyebrowMl = 2.5, title = null, titleMax = 566, titleMl = 0,
    lead, leadMt = 37, leadMl = 0, leadMax = 579, date = DATE, dateMt = [25, 34, 34], dateMl = 2, ctas = null,
  } = o;
  const id = `${p}-jb`, M = media(), HIDE_ = { display: "none" };
  const heading = title ?? "Join Asia Pacific’s <br>Fresh Food Ecosystem";
  const leadText = lead === undefined ? "Connect with the fresh food suppliers, technologies, logistics solutions and decision-makers shaping how fresh food is preserved, moved and brought to market across Asia Pacific." : lead;
  const dateStyles = [{ margin: pad(dateMt[2], 0, 0, dateMl), ...(date === false && { padding: pad(12, 0, 11, 11) }) }, { tablet: { margin: pad(dateMt[1], 0, 0, 0) }, mobile: { margin: pad(dateMt[0], 0, 0, 0) } }];
  return div(id, mix(WIDE, [
    { position: "relative", overflow: "hidden", padding: P0, height: px(h[1]), margin: mtAuto(mt[2]), "border-radius": radius(30), background: { color: T.brand } },
    { tablet: { height: AUTO, margin: mtAuto(mt[1]), "border-radius": radius(24) }, mobile: { height: px(h[0]), margin: mtAuto(mt[0]), "border-radius": radius(20), background: { color: T.dark } } },
  ]), [
    w(`${id}-photo`, "e-image", { image: image(M.join.id), attributes: attrs([["aria-hidden", "true"]]) }, [
      { ...at(pct(img.top), null, null, pct(img.left)), width: pct(img.w), height: pct(img.h), "max-width": custom("none"), "object-fit": "cover" },
      { tablet: { ...FILL, width: pct(100), height: pct(100) } },
    ]),
    div(`${id}-wash-m1`, [{ ...FILL, padding: P0, display: "none", background: layers(grad(180, [["#e5f4da", 0], ["rgba(229,244,218,0)", 100]])) }, { mobile: { display: "block" } }]),
    div(`${id}-wash-m2`, [{ ...FILL, padding: P0, display: "none", background: layers(grad(180, [[T.brand, 0], [BRAND0, 100]])) }, { mobile: { display: "block" } }]),
    div(`${id}-wash-t`, [{ ...FILL, padding: P0, display: "none", background: layers(grad(180, [[T.brand, 40], [BRAND85, 50], ["rgba(44,166,47,0.5)", 100]])) }, { tablet: { display: "block" }, mobile: HIDE_ }]),
    div(`${id}-fade`, [{ ...at(px(0), null, px(0), custom("calc(23.66% - 3px)")), width: pct(51.9), padding: P0, background: layers(toLeft(BRAND0, T.brand)) }, { tablet: HIDE_ }]),
    div(`${id}-inner`, mix(PAGE(32, 18), [
      { position: "relative", padding: pad(ip.top, 0, ip.bottom, ip.left), margin: mtAuto(0) },
      { tablet: { padding: pad(48, 0, 48, 0) }, mobile: { padding: pad(48, 0, 0, 0) } },
    ]), [
      div(`${id}-copy`, [{ padding: P0 }, {}], [
        ...(eyebrow ? [div(`${id}-eyebrow-wrap`, [{ padding: P0, margin: pad(0, 0, eyebrowMb[1], eyebrowMl) }, { tablet: { margin: pad(0, 0, eyebrowMb[0], 0) } }], [ruleEyebrow(`${id}-eyebrow`, eyebrow, { light: true })])] : []),
        w(`${id}-title`, "e-heading", { tag: "h2", title: heading, attributes: attrs(heading.includes("<br") ? [["data-br-md", ""]] : []) }, [
          { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", "line-height": px(52.2), color: T.white, "max-width": px(titleMax), margin: pad(0, 0, 0, titleMl) },
          { tablet: { "font-size": px(40), "line-height": pct(109), margin: P0 }, mobile: { "font-size": px(30), "line-height": px(38.2), "max-width": px(354) } },
        ]),
        ...(leadText === false ? [] : [w(`${id}-lede`, "e-paragraph", { paragraph: leadText }, [
          { ...text(18, 500, T.white, { "line-height": NORMAL }), "max-width": px(leadMax), margin: pad(leadMt, 0, 0, leadMl) },
          { tablet: { margin: pad(28, 0, 0, 0) }, mobile: { "font-size": px(17), "line-height": px(24), "max-width": px(330), margin: pad(26, 0, 0, 0) } },
        ])]),
      ], { attributes: attrs(reveal(0)) }),
      div(`${id}-actions`, [{ padding: P0 }, {}], [
        dateVenue(id, date, dateStyles),
        ctas
          ? heroCtas(id, { styles: [{ margin: pad(ctas.mt[1], 0, 0, ctas.ml ?? 0) }, { tablet: { margin: pad(ctas.mt[1], 0, 0, 0) }, mobile: { margin: pad(ctas.mt[0], 0, 0, 0) } }] })
          : box(`${id}-ctas`, [
              { padding: P0, display: "flex", "flex-direction": "row", "flex-wrap": "wrap", gap: gap(10), margin: pad(26, 0, 0, 0), width: AUTO },
              { mobile: { "flex-direction": "column", "align-items": "flex-start", gap: gap(11), margin: pad(23, 0, 0, 0) } },
            ], [
              btn(`${id}-apply`, "Apply To Exhibit", "/apply-to-exhibit", { w: 220, h: 52, pl: 34, gap: 17.66, chev: "chevron-brand", color: T.brand, mColor: "#31a834", bg: T.white, m: { w: 178, h: 43, pl: 25, gap: 7, fs: 15, chev: 0.828 } }),
              btn(`${id}-register`, "Register Your Interest", "/register-to-visit", { w: 255, h: 52, pl: 31, gap: 13.66, chev: "chevron-white", color: T.white, border: [1, T.white], hoverBg: "rgba(255,255,255,0.1)", m: { w: 202, h: 43, pl: 25, gap: 9, fs: 15, chev: 0.828 } }),
            ]),
      ], { attributes: attrs(reveal(1)) }),
    ]),
  ], { tag: "section", attributes: attrs([["data-trim", ""]]) });
};

module.exports = { call, php, SITE, ORIGIN, SP, T, OUTFIT, FREDOKA, px, em, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, image, V, box, div, w, attrs, media, sz, shadow, ease, lift, text, HIDE, svg , DATE, VENUE, NORMAL, stop, grad, layers, at, FILL, BRAND0, step, toLeft, rotate, scale, mix, PAGE, WIDE, reveal, btn, dateVenue,
  DATE_LONG, SIAW_SITE, HERO_SIZES, pageHero, heroCtas, heroVenue, joinBanner, ruleEyebrow, pill, count, video };
