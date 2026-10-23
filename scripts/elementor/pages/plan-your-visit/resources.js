// Resources (plan/Sections.tsx Resources).
const { T, px, pct, custom, pad, P0, AUTO, mtAuto, radius, gap, flex, link, image, box, div, w, attrs, media, text, mix, reveal } = require("../../lib.js");
const { CW, H, LIFT, GRID, GRIDC } = require("../g4-shared.js");
const M = media();

const CARDS = [
  ["g4-res-visa", "Visa Information", 'Contact <a href="mailto:marketing@freshfoodexpoapac.com">marketing@freshfoodexpoapac.com</a> if you need help with visa requirements, application processes, or travel guidelines to ensure a hassle-free entry.', "Contact Us", "/contact", false],
  ["g4-res-mbs", "Marina Bay Sands Privileges", "Access special promotions across world-renowned luxury brands, lifestyle stores and premium restaurants located within MBS.", "Unlock Your Privileges", "https://www.marinabaysands.com/shopping/guest-privileges.html", true],
  ["g4-res-tips", "Useful Tips", "Everything you need to ensure a smooth and enjoyable visit to <em>FFE APAC.</em>", "Get Helpful Tips", "https://www.visitsingapore.com/travel-tips/essential-travel-information/", true],
  ["g4-res-singapore", "Visit Singapore", "A dynamic city where innovation, culture, and business thrive—see what makes it the perfect destination.", "Explore Now", "https://www.visitsingapore.com", true],
];

const items = CARDS.map(([key, title, body, label, href, ext], k) => {
  const id = `pv-res-c${k + 1}`;
  return box(id, [{ padding: P0, display: "flex", "flex-direction": "row", "min-width": px(0), width: pct(100) }, {}], [
    box(`${id}-card`, mix(LIFT, [
      {
        padding: P0, display: "flex", "flex-direction": "column", width: pct(100), overflow: "hidden", "min-height": px(404),
        "border-radius": { "start-start": px(32), "start-end": px(0), "end-start": px(32), "end-end": px(32) }, "border-width": pad(1), "border-style": "solid", "border-color": T.accent, background: { color: T.page },
      },
      { tablet_extra: { "min-height": px(0) } },
    ]), [
      div(`${id}-media`, [{
        position: "relative", overflow: "hidden", padding: P0, margin: pad(15, 17, 0, 17), "aspect-ratio": "294/164", width: AUTO,
        "border-radius": { "start-start": px(25), "start-end": px(0), "end-start": px(0), "end-end": px(0) }, "border-width": pad(1), "border-style": "solid", "border-color": T.accent, background: { color: "#d9d9d9" },
      }, {}], [
        w(`${id}-img`, "e-image", { image: image(M[key].id), attributes: attrs([["data-zoom", ""]]) }, [{ position: "absolute", "inset-block-start": px(0), "inset-inline-start": px(0), width: pct(100), height: pct(100), "max-width": custom("none"), "object-fit": "cover" }, {}]),
      ]),
      box(`${id}-body`, [{ padding: P0, margin: pad(22, 17, 24, 17), display: "flex", "flex-direction": "column", gap: gap(12, 0), flex: flex(1, 1, AUTO), width: AUTO }, {}], [
        w(`${id}-title`, "e-heading", { tag: "h3", title }, [{ ...H(17, 22, "#032919"), "font-family": require("../../lib.js").OUTFIT }, {}]),
        w(`${id}-text`, "e-paragraph", { paragraph: body }, [{ ...text(13, 500, T.body, { "line-height": px(19) }), margin: P0 }, {}]),
      ]),
      box(`${id}-cta`, [
        {
          height: px(50), margin: pad(0, -1, -1, -1), padding: P0, display: "flex", "justify-content": "center", "align-items": "center", "border-radius": { "start-start": px(0), "start-end": px(0), "end-start": px(32), "end-end": px(32) },
          "border-width": pad(1), "border-style": "solid", "border-color": T.accent, background: { color: T.accent }, transition: require("../../lib.js").ease(250), width: AUTO,
        },
        { hover: { background: { color: T.forest } } },
      ], [
        w(`${id}-cta-t`, "e-paragraph", { tag: "span", paragraph: label, attributes: attrs([["data-untrim", ""]]) }, [{ ...text(17, 600, T.white, { "line-height": px(22), "text-transform": "uppercase" }), margin: P0 }, {}]),
      ], { tag: "a", link: link(href, ext), attributes: attrs([["data-btn", ""], ...(ext ? [["rel", "noopener noreferrer"], ["aria-label", `${label} (opens in a new tab)`]] : [])]) }),
    ], { attributes: attrs([["data-group", ""]]) }),
  ], { attributes: attrs(reveal(k)) });
});

module.exports = [div("pv-res", [{ width: pct(100), padding: P0, margin: pad(40, 0, 0, 0), display: "block" }, { tablet: { margin: pad(48, 0, 0, 0) } }], [
  box("pv-res-head", mix(CW(1360), [{ padding: P0, margin: mtAuto(0), display: "flex", "flex-direction": "row", "align-items": "center", gap: gap(0, 16) }, {}]), [
    w("pv-res-title", "e-heading", { tag: "h2", title: "Additional <span>Resources</span>" }, [H(32, 38), { mobile: { "font-size": px(28), "line-height": px(34) } }]),
    div("pv-res-rule", [{ width: px(36), "min-width": px(36), height: px(2), padding: P0, "border-radius": radius(1), background: { color: T.accent }, display: "block", flex: flex(0, 0, AUTO) }, { mobile: { display: "none" } }], [], { attributes: attrs([["aria-hidden", "true"]]) }),
  ], { attributes: attrs(reveal(0)) }),
  div("pv-res-grid", mix(CW(1374), [
    { padding: P0, margin: mtAuto(18.68), ...GRID(4, 18) },
    { tablet_extra: { ...GRIDC(2) }, mobile: { ...GRIDC(1) } },
  ]), items),
], { tag: "section" })];
