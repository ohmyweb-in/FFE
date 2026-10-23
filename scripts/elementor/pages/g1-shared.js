// Shared by the About and Our Story modules (Build G1): the spec's local constants, globalExpertise() and pillarRow().
const L = require("../lib.js");
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, image, box, div, w, attrs, media, text, NORMAL, at, FILL,
  mix, reveal, lift, shadow, ease, layers, grad, count } = L;

// .container-narrow, mt = [M, T, X+]
const NARROW = (mt) =>
  mix([{ width: custom("min(1280px, 100% - 64px)"), "max-width": custom("none"), margin: mtAuto(mt[2] ?? mt[0]) }, { tablet: { margin: mtAuto(mt[1] ?? mt[0]) }, mobile: { width: custom("min(1280px, 100% - 52px)"), margin: mtAuto(mt[0]) } }]);
const EYB = (color = T.accent) => [{ ...text(15, 500, color, { "line-height": px(19), "letter-spacing": px(0.3), "text-transform": "uppercase" }), margin: P0 }, {}];
const H44 = [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(44), "line-height": px(50), color: T.forest, margin: P0 }, { tablet: { "font-size": px(40), "line-height": px(46) }, mobile: { "font-size": px(30), "line-height": px(36) } }];
const HSEC = [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(48), "line-height": px(52.2), color: T.forest, margin: P0 }, { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": NORMAL } }];
const H38 = [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(38), "line-height": px(46), color: T.forest, margin: P0 }, { tablet: { "font-size": px(36), "line-height": px(44) }, mobile: { "font-size": px(30), "line-height": px(36) } }];
const B15 = (lh = 22) => [{ ...text(15, 500, T.body, { "line-height": px(lh) }), margin: P0 }, {}];
// Hover on cards (.lift): rise 3px + soft shadow.
const CARD_HOVER = { transform: lift, "box-shadow": shadow(0, 22, 44, -24, "rgba(2,93,3,0.45)") };
const pos = (x, y) => ({ $$type: "object-position", value: { x: L.sz(x, "%"), y: L.sz(y, "%") } });
const BORDER_L = { "border-width": pad(0, 0, 0, 1), "border-style": "solid", "border-color": "#c2e3c3" };

// GlobalExpertise (FruitLogistica.tsx). o = { title, copy: [c1, c2], note, stats: [[label, num, countAttrs|null] x4], photo, alt, logo, flip, mt: [M, T, X+] }.
const globalExpertise = (p, o) => {
  const { title, copy, note, stats, photo, logo, flip, mt } = o, M = media();
  const stat = (n, [label, num, cnt]) => {
    const id = `${p}-s${n}`;
    const base = { width: AUTO, padding: pad(0, 16, 0, n >= 2 ? 18 : 0), display: "flex", "flex-direction": "column-reverse", "justify-content": "flex-end", gap: gap(6, 0), ...(n >= 2 && BORDER_L), ...(n === 4 && { flex: flex(1, 1, pct(0)) }) };
    const mobile = n === 3 ? { "border-width": pad(0), padding: pad(0, 16, 0, 0) } : n === 4 ? { flex: flex(0, 1, AUTO) } : {};
    return box(id, [base, { mobile }], [
      w(`${id}-label`, "e-paragraph", { paragraph: label, attributes: attrs([["data-nowrap", ""]]) }, [{ ...text(13, 500, T.body, { "line-height": px(17) }), margin: P0 }, {}]),
      w(`${id}-num`, "e-paragraph", { paragraph: num, attributes: attrs([["data-nowrap", ""], ...(cnt ?? [])]) }, [{ "font-family": FREDOKA, "font-weight": "600", "font-size": px(28), "line-height": px(34), color: T.accent, margin: P0 }, {}]),
    ]);
  };
  const text_ = box(`${p}-text`, [
    { padding: P0, display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(16, 0), width: px(600), flex: flex(0, 0, AUTO) },
    { tablet_extra: { width: pct(54) }, tablet: { width: pct(100), flex: flex(0, 1, AUTO) } },
  ], [
    w(`${p}-eyebrow`, "e-paragraph", { paragraph: "Global expertise" }, EYB()),
    w(`${p}-title`, "e-heading", { tag: "h2", title }, H44),
    box(`${p}-copy`, [{ padding: P0, display: "flex", "flex-direction": "column", gap: gap(12, 0), width: AUTO }, {}], [
      w(`${p}-p1`, "e-paragraph", { paragraph: copy[0] }, B15()),
      w(`${p}-p2`, "e-paragraph", { paragraph: copy[1] }, B15()),
    ]),
    w(`${p}-note`, "e-paragraph", { paragraph: note }, [{ ...text(12, 500, T.body, { "line-height": px(15) }), margin: pad(flip ? -4 : 0, 0, 0, 0) }, {}]),
    div(`${p}-stats`, [
      { width: pct(100), padding: pad(10, 0, 0, 0), display: "flex", "flex-direction": "row" },
      { mobile: { display: "grid", "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(16, 0) } },
    ], stats.map((s, i) => stat(i + 1, s))),
  ], { attributes: attrs(reveal(0)) });

  const media_ = div(`${p}-media`, [
    { position: "relative", "aspect-ratio": "608/420", width: pct(100), "max-width": px(608), margin: P0, padding: P0, "min-width": px(0), flex: flex(1, 1, pct(0)) },
    { tablet: { margin: mtAuto(0), flex: flex(0, 1, AUTO) } },
  ], [
    w(`${p}-dots`, "e-image", { image: image(M["g1-dots"].id), attributes: attrs([["aria-hidden", "true"]]) }, [{ ...at(pct(38.0952), null, null, pct(-1.6447)), width: pct(10.0329), height: pct(17.8571), "max-width": custom("none") }, {}]),
    div(`${p}-sh1`, [{ ...at(pct(-5), null, null, pct(81.5789)), width: pct(21.3816), height: pct(35.7143), padding: P0, background: { color: T.accent }, "border-radius": { "start-start": px(0), "start-end": px(90), "end-end": px(0), "end-start": px(90) } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
    div(`${p}-sh2`, [{ ...at(pct(70.4762), null, null, pct(76.3158)), width: pct(27.9605), height: pct(33.3333), padding: P0, background: { color: T.sun }, "border-radius": { "start-start": px(0), "start-end": px(0), "end-end": px(110), "end-start": px(0) } }, {}], [], { attributes: attrs([["aria-hidden", "true"]]) }),
    div(`${p}-photo`, [{ ...at(pct(1.9048), null, null, pct(3.2895)), width: pct(93.4211), height: pct(95.2381), overflow: "hidden", padding: P0, "border-radius": { "start-start": px(30), "start-end": px(30), "end-end": px(30), "end-start": px(0) } }, {}], [
      w(`${p}-img`, "e-image", { image: image(M[photo].id), attributes: attrs([["data-zoom", ""]]) }, [{ ...FILL, width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
    ], { attributes: attrs([["data-group", ""]]) }),
    ...(logo ? [w(`${p}-logo`, "e-image", { image: image(M["logo-fl"].id) }, [{ ...at(pct(11.8286), null, null, pct(10.0329)), width: pct(21.5461), height: pct(10.6869), "max-width": custom("none") }, {}])] : []),
  ], { attributes: attrs(reveal(1)) });

  return box(p, mix([{ padding: P0 }, {}], NARROW(mt), [
    { display: "flex", "flex-direction": flip ? "row-reverse" : "row", "align-items": "center", gap: gap(0, 72) },
    { tablet_extra: { gap: gap(0, 40) }, tablet: { "flex-direction": "column", "align-items": "stretch", gap: gap(40, 0) } },
  ]), [text_, media_], { tag: "section" });
};

// PillarRow (home/Ecosystem.tsx) for SourceToMarket: the home `eco-row` subtree, ids eco-row/eco-pN/eco-arrowN -> ${p}-row/${p}-pN/${p}-arrowN, margins zeroed.
const pillarRow = (p) => {
  const home = require("../home/ecosystem.js")[0];
  const row = home.elements.find((e) => e.id === "eco-inner").elements.find((e) => e.id === "eco-row");
  const copy = JSON.parse(JSON.stringify(row).replace(/\beco-(row|p\d|arrow\d)/g, `${p}-$1`));
  for (const x of copy.styles[`s-${p}-row`].variants) if (x.props.margin) x.props.margin = P0;
  // The e-svg printer drops the ring svg's <filter> (its drop shadow), so the ring vanishes on staging (the home page has the same gap). Draw it with CSS: a 70x70 box (as the svg) holding the 62px circle at (4, 0).
  const ring = (n) => {
    const id = `${p}-p${n}-ring`;
    const h = JSON.parse(JSON.stringify(div(id, [{ ...at(px(-31), null, null, px(23)), width: px(70), height: px(70), padding: P0 }, {}], [
      div(`${id}-c`, [{ ...at(px(0), null, null, px(4)), width: px(62), height: px(62), padding: P0, "border-radius": radius(999), background: { color: "#ffffff" }, "border-width": pad(1), "border-style": "solid", "border-color": T.accent, "box-shadow": shadow(0, 4, 4, 0, "rgba(0,0,0,0.05)"), "box-sizing": "border-box" }, {}]),
    ], { attributes: attrs([["aria-hidden", "true"]]) })));
    return h;
  };
  for (const col of copy.elements) {
    if (!/-p\d$/.test(col.id)) continue;
    const body = col.elements[0].elements.find((e) => e.id.endsWith("-body"));
    const k = body.elements.findIndex((e) => e.id.endsWith("-ring"));
    if (k < 0) throw new Error("pillarRow: ring not found");
    body.elements[k] = ring(col.id.slice(-1));
  }
  return copy;
};

module.exports = { pos, NARROW, EYB, H44, HSEC, H38, B15, CARD_HOVER, BORDER_L, globalExpertise, pillarRow };
