// Organiser (Organiser.tsx): intro, stats row with count-up, world map + tagline, "Explore our trade shows" cards.
// Section root is data-trim, so every Tailwind margin below maps 1:1 (plan §1.3 / D3).
const { T, FREDOKA, px, pct, em, custom, pad, P0, AUTO, mtAuto, radius, flex, link, image, div, box, w, attrs, text, svg, NORMAL,
  at, ease, lift, mix, PAGE, reveal, sz } = require("../lib.js");
const { media } = require("../lib.js");

const M = media();
const ml = (left) => pad(0, 0, 0, left);
const mt = (top, left = 0) => pad(top, 0, 0, left);
const COLS = (n) => ({ $$type: "string", value: `repeat(${n}, minmax(0, 1fr))` });
const rowGap = (row, column) => ({ row: typeof row === "number" ? px(row) : row, column: typeof column === "number" ? px(column) : column });

// .h-section: 48/52.2 (lg+), 40/1.09 (tablet), 30/normal (phones).
const H2 = [
  { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", color: T.forest, "line-height": px(52.2) },
  { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": NORMAL } },
];
// .text-lead: Outfit 500, 18px (md+) / 17px (phones), line-height normal, body colour.
const LEAD = [text(18, 500, T.body, { "line-height": NORMAL }), { mobile: { "font-size": px(17) } }];

const STATS = [
  { n: "1822", label: "ORGANISING TRADE FAIRS SINCE", w: [74, "19.22cqw"], count: [["data-count", "1822"]] },
  { n: "100+", label: "EVENTS A YEAR, IN-HOUSE AND GUEST", w: [94, "24.42cqw"], count: [["data-count", "100"], ["data-suffix", "+"]] },
  {
    n: "2.8 MILLION", label: "GATHERED MORE THAN ATTENDEES AROUND THE WORLD", w: [157, "40.78cqw"], labelW: 144,
    count: [["data-count", "2.8"], ["data-decimals", "1"], ["data-suffix", " MILLION"]],
  },
];

const stat = (s, i) => {
  const n = i + 1, id = `org-s${n}`;
  return [
    ...(n > 1
      ? [div(`org-sep${n}`, [
          { width: px(1), "min-width": px(0), height: px(93), padding: P0, margin: pad(0, n === 2 ? -1 : 1, 0, 0), flex: flex(0, 0, AUTO), background: { color: "rgba(40,174,61,0.47)" } },
          { mobile: { margin: pad(0) } },
        ], [], { attributes: attrs([["aria-hidden", "true"]]) })]
      : []),
    box(id, [
      { display: "flex", "flex-direction": "column-reverse", padding: pad(6, 0, 0, 0), width: px(s.w[0]), flex: flex(0, 0, AUTO) },
      { tablet: { padding: pad(9, 0, 0, 0) }, mobile: { width: custom(s.w[1]) } },
    ], [
      w(`${id}-label`, "e-paragraph", { paragraph: s.label }, [
        { ...text(12, 500, T.body, { "line-height": NORMAL }), margin: mt(17), ...(s.labelW && { width: px(s.labelW) }) },
        { mobile: { "font-size": custom("3.117cqw"), ...(s.labelW && { width: AUTO }) } },
      ]),
      w(`${id}-num`, "e-paragraph", { paragraph: s.n, attributes: attrs([...s.count, ["data-nowrap", ""]]) }, [
        { "font-family": FREDOKA, "font-size": px(28), "font-weight": "600", color: T.accent, "line-height": NORMAL, "letter-spacing": em(0.02), "text-transform": "uppercase", margin: P0 },
        { mobile: { "font-size": custom("7.27cqw") } },
      ]),
    ]),
  ];
};

const head = div("org-head", [
  { padding: P0, width: AUTO, margin: ml(0) },
  { mobile: { margin: ml(3) } },
], [
  w("org-eyebrow", "e-paragraph", { paragraph: "ORGANISER" }, [
    { ...text(15, 500, T.accent, { "letter-spacing": px(0.3), "line-height": NORMAL, "text-transform": "uppercase" }), margin: ml(1) },
    { mobile: { margin: ml(0) } },
  ]),
  w("org-title", "e-heading", { tag: "h2", title: "Led by <br><em>Messe Berlin Asia Pacific</em>", attributes: attrs([["data-br-md", ""]]) }, mix(H2, [{ margin: mt(20) }, { mobile: { margin: mt(18) } }])),
  w("org-lede", "e-paragraph", {
    paragraph:
      "Messe Berlin Asia Pacific is the regional headquarters of Messe Berlin GmbH for the Asia Pacific region, headquartered in Singapore with a growing presence in key markets including India. It leads the development and expansion of Messe Berlin’s business across Asia, connecting global industries with high-growth regional opportunities.",
  }, mix(LEAD, [{ "max-width": px(697), margin: mt(22, 1) }, { tablet: { margin: mt(24) }, mobile: { margin: mt(21) } }])),
], { attributes: attrs(reveal(0)) });

const stats = div("org-stats-wrap", [
  { padding: P0, width: AUTO, margin: ml(0) },
  { mobile: { margin: ml(3) } },
], [
  box("org-stats", [
    { display: "flex", "flex-direction": "row", "align-items": "flex-start", padding: P0, width: AUTO, gap: rowGap(0, 25), margin: mt(32, 2) },
    { tablet: { margin: mt(40) }, mobile: { gap: rowGap(0, custom("3.9cqw")), margin: mt(27) } },
  ], STATS.flatMap(stat), { attributes: attrs(reveal(1)) }),
], { attributes: attrs([["data-cq-m", ""]]) });

const map = div("org-map-wrap", [
  { position: "static", padding: P0, width: AUTO, margin: mt(0) },
  { laptop: { position: "relative", margin: mt(32) }, mobile: { margin: mt(36, -26), width: custom("100vw") } },
], [
  div("org-map", [
    { ...at(px(17), custom("calc((100% - 100vw) / 2 + 2px)"), null, null), width: px(718), padding: P0 },
    { laptop: { position: "static", width: pct(100) } },
  ], [
    w("org-map-img", "e-image", { image: image(M["world-map"].id), attributes: attrs([["aria-hidden", "true"]]) }, [
      { width: pct(100), height: AUTO, "object-fit": "cover", "aspect-ratio": "718/240", display: "block" },
      { mobile: { "aspect-ratio": "440/146" } },
    ]),
  ], { attributes: attrs(reveal(0, "fade")) }),
  w("org-tagline", "e-paragraph", { paragraph: "Global Platforms.<br>Stronger Industries.<br>Brighter Tomorrows.", attributes: attrs(reveal(0)) }, mix(LEAD, [
    { ...at(px(231), px(-2), null, null), width: px(172), "text-align": "end", margin: P0 },
    { laptop: { position: "static", width: AUTO, margin: mt(16) },
      mobile: { ...at(px(95), px(22), null, null), width: px(172), "font-size": px(12), margin: P0 } },
  ])),
]);

const rule = div("org-rule", [
  { width: pct(100), height: px(1), padding: P0, margin: mt(8.88), background: { color: "rgba(40,174,61,0.37)" } },
  { laptop: { margin: mt(40) }, mobile: { width: AUTO, margin: mt(25, 2) } },
]);

const showsTitle = w("org-shows-title", "e-heading", { tag: "h2", title: "Explore our <em>trade shows</em>", attributes: attrs(reveal(0)) },
  mix(H2, [{ width: AUTO, margin: mt(29.12, 3) }, { tablet_extra: { margin: mt(29.12) }, tablet: { margin: mt(40) }, mobile: { margin: mt(21, 1) } }]));

const SHOWS = [
  { name: "Grüne Woche", href: "https://www.gruenewoche.de/en", img: "show-gw", x: 20,
    logo: () => svg("org-c1-logo", "logo-gw", [{ width: px(94), height: px(30) }, {}]) },
  { name: "Fruit Logistica", href: "https://www.fruitlogistica.com/en", img: "show-fl", x: 21,
    logo: () => svg("org-c2-logo", "logo-fl", [{ width: px(84), height: px(28.7813) }, {}]) },
  { name: "Asia Fruit Logistica", href: "http://www.asiafruitlogistica.com/", img: "show-afl", x: 14,
    logo: () => w("org-c3-logo", "e-image", { image: image(M["logo-afl"].id) }, [
      { width: px(106), height: px(48), "object-fit": "cover", "object-position": { $$type: "string", value: "center left" } },
      { mobile: { width: px(88.9), height: px(40.4) } },
    ]) },
  { name: "Fruit Logistica Connect India", href: "https://www.fruitlogisticaindia.com/", img: "show-fli", x: 23,
    logo: () => w("org-c4-logo", "e-image", { image: image(M["logo-fli"].id) }, [
      { width: px(70), height: px(39), "object-fit": "cover" },
      { mobile: { width: px(63.8), height: px(35.1) } },
    ]) },
];

const card = (s, i) => {
  const id = `org-c${i + 1}`;
  return div(id, [{ padding: P0, width: AUTO }, {}], [
    div(`${id}-link`, [
      { display: "block", padding: P0, "border-radius": radius(18), transition: ease(250) },
      { hover: { transform: lift } },
    ], [
      div(`${id}-media`, [
        { position: "relative", overflow: "hidden", padding: P0, "aspect-ratio": "305/175", "border-radius": radius(18), background: { color: "#d9d9d9" } },
        {},
      ], [
        w(`${id}-img`, "e-image", { image: image(M[s.img].id), attributes: attrs([["data-zoom", ""]]) }, [
          { ...at(px(0), px(0), px(0), px(0)), width: pct(100), height: pct(100), "object-fit": "cover" },
          {},
        ]),
      ]),
      box(`${id}-bar`, [
        { position: "relative", display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "space-between",
          width: pct(88.2), height: px(62), padding: pad(0, 12, 0, s.x), margin: { "block-start": px(-31), "inline-end": AUTO, "block-end": px(0), "inline-start": AUTO },
          "border-radius": radius(18), background: { color: T.sun } },
        { mobile: { margin: pad(-31, 0, 0, 13.1) } },
      ], [
        s.logo(),
        svg(`${id}-arrow`, "arrow-circle", [{ width: px(28), height: px(28), "flex-shrink": 0 }, {}], { attributes: attrs([["aria-hidden", "true"], ["data-group-nudge", ""]]) }),
      ]),
    ], { tag: "a", link: link(s.href, true), attributes: attrs([["rel", "noopener"], ["aria-label", `${s.name} (opens in a new tab)`], ["data-group", ""]]) }),
  ], { attributes: attrs([["role", "listitem"], ...reveal(i), ["data-zoom-m", "619"]]) });
};

const shows = div("org-shows", [
  { display: "grid", "grid-template-columns": COLS(4), gap: rowGap(22, 22), width: AUTO, padding: P0, margin: mt(41, 3) },
  { tablet_extra: { margin: mt(41) }, tablet: { "grid-template-columns": COLS(2), gap: rowGap(24, 24), margin: mt(32) },
    mobile: { gap: rowGap(12.4, 8.2), margin: mt(26, 1) } },
], SHOWS.map(card), { attributes: attrs([["role", "list"]]) });

const org = div("org", mix(PAGE(), [
  { position: "relative", padding: P0, margin: mtAuto(75) },
  { tablet: { margin: mtAuto(64) }, mobile: { margin: mtAuto(55) } },
]), [head, stats, map, rule, showsTitle, shows], { tag: "section", _cssid: "organiser", attributes: attrs([["data-trim", ""]]) });

module.exports = [org];
