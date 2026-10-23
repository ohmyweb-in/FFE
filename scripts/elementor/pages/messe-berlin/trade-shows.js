// Messe Berlin trade shows: the section's own h2 + a copy of the homepage ShowCards (home/organiser.js org-shows, ids mb-ts-*).
// Margins differ from the homepage: the className replaces ShowCards' default left margin.
const { T, FREDOKA, px, pct, custom, pad, P0, AUTO, mtAuto, radius, flex, link, image, div, box, w, attrs, text, svg, NORMAL,
  at, ease, lift, mix, PAGE, reveal, media } = require("../../lib.js");

const M = media();
const mt = (top, left = 0) => pad(top, 0, 0, left);
const COLS = (n) => ({ $$type: "string", value: `repeat(${n}, minmax(0, 1fr))` });
const rowGap = (row, column) => ({ row: typeof row === "number" ? px(row) : row, column: typeof column === "number" ? px(column) : column });
// .h-section: 48/52.2 (lg+), 40/1.09 (tablet), 30/normal (phones).
const H2 = [
  { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", color: T.forest, "line-height": px(52.2) },
  { tablet: { "font-size": px(40), "line-height": pct(109) }, mobile: { "font-size": px(30), "line-height": NORMAL } },
];

const SHOWS = [
  { name: "Grüne Woche", href: "https://www.gruenewoche.de/en", img: "show-gw", x: 20,
    logo: () => svg("mb-ts-c1-logo", "logo-gw", [{ width: px(94), height: px(30) }, {}]) },
  { name: "Fruit Logistica", href: "https://www.fruitlogistica.com/en", img: "show-fl", x: 21,
    logo: () => svg("mb-ts-c2-logo", "logo-fl", [{ width: px(84), height: px(28.7813) }, {}]) },
  { name: "Asia Fruit Logistica", href: "http://www.asiafruitlogistica.com/", img: "show-afl", x: 14,
    logo: () => w("mb-ts-c3-logo", "e-image", { image: image(M["logo-afl"].id) }, [
      { width: px(106), height: px(48), "object-fit": "cover", "object-position": { $$type: "string", value: "center left" } },
      { mobile: { width: px(88.9), height: px(40.4) } },
    ]) },
  { name: "Fruit Logistica Connect India", href: "https://www.fruitlogisticaindia.com/", img: "show-fli", x: 23,
    logo: () => w("mb-ts-c4-logo", "e-image", { image: image(M["logo-fli"].id) }, [
      { width: px(70), height: px(39), "object-fit": "cover" },
      { mobile: { width: px(63.8), height: px(35.1) } },
    ]) },
];

const card = (s, i) => {
  const id = `mb-ts-c${i + 1}`;
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

const shows = div("mb-ts-shows", [
  { display: "grid", "grid-template-columns": COLS(4), gap: rowGap(22, 22), width: AUTO, padding: P0, margin: mt(41) },
  { tablet: { "grid-template-columns": COLS(2), gap: rowGap(24, 24), margin: mt(32) },
    mobile: { gap: rowGap(12.4, 8.2), margin: mt(26) } },
], SHOWS.map(card), { attributes: attrs([["role", "list"]]) });


const [d, m] = mix(PAGE(), [
  { position: "relative", padding: P0, margin: mtAuto(3.94), "inset-inline-start": px(15) },
  { tablet_extra: { position: "static", "inset-inline-start": px(0) }, tablet: { margin: mtAuto(8) } },
]);
module.exports = [div("mb-ts", [d, m], [
  w("mb-ts-title", "e-heading", { tag: "h2", title: "Explore our <em>trade shows</em>", attributes: attrs(reveal(0)) }, mix(H2, [{ width: AUTO, margin: P0 }, {}])),
  shows,
], { tag: "section", attributes: attrs([["data-trim", ""]]) })];
