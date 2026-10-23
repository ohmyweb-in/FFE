// PageHero size="register" with a custom cta (register-to-visit/page.tsx).
const { T, px, pad, P0, w, attrs, text, pageHero, heroVenue, heroCtas } = require("../../lib.js");

module.exports = [
  pageHero("rv", {
    size: "register",
    title: "Register as a Trade Visitor",
    img: "ph-visit",
    imgBox: { top: -78.32, left: 16.45, w: 104.03, h: 202.03 },
    curveLeft: 4.39,
    cta: [
      w("rv-ph-sub", "e-paragraph", { paragraph: "Be among the first to visit Asia Pacific’s premier trade fair for fresh food.", attributes: attrs([["data-untrim", ""]]) }, [
        { ...text(15, 500, T.white, { "line-height": px(24) }), margin: pad(0, 0, 0, 3) },
        { tablet: { margin: P0 } },
      ]),
      heroVenue("rv-ph", [{ margin: pad(23.38, 0, 0, 3.5) }, { tablet: { margin: pad(23.38, 0, 0, 0) }, mobile: { margin: pad(20, 0, 0, 0) } }]),
      heroCtas("rv-ph", { stayHref: "/subscribe", registerHref: "/register-to-visit/form",
        styles: [{ margin: pad(25.52, 0, 0, -0.5) }, { tablet: { margin: pad(25.52, 0, 0, 0) }, mobile: { margin: pad(24, 0, 0, 0) } }] }),
    ],
  }),
];
