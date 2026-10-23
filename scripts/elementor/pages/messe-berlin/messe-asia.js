// Messe Berlin Asia Pacific band (messe/Sections.tsx MesseAsia): the page h1, no PageHero.
const { T, FREDOKA, OUTFIT, px, pct, pad, P0, AUTO, mtAuto, gap, attrs, mix, PAGE, grad, layers, step } = require("../../lib.js");
const { dv, hd, pg } = require("../g3-shared.js");
const BODY = [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(17), "line-height": px(27), color: "#000000", margin: P0 }, { mobile: { "font-size": px(16), "line-height": px(25) } }];
const MORE = [{ "font-family": OUTFIT, "font-weight": "500", "font-size": px(16), "line-height": px(24), color: "#000000", margin: P0, width: AUTO }, { mobile: { "font-size": px(15) } }];

const [wd, wm] = mix(PAGE(), [{ margin: mtAuto(0), padding: pad(0, 3, 0, 23) }, { tablet_extra: { padding: P0 } }]);
module.exports = [dv("mb-ma", {
  width: pct(100), "max-width": { $$type: "size", value: { size: "none", unit: "custom" } }, margin: P0,
  background: layers(grad(90, [[T.mint, 0], [T.page, 100]])), padding: pad(31.5, 0, 31.5, 0),
}, { mobile: { padding: pad(32, 0, 32, 0) } }, [
  dv("mb-ma-wrap", wd, wm, [
    dv("mb-ma-col", { display: "flex", "flex-direction": "column", "align-items": "flex-start", gap: gap(18), "max-width": px(1236), width: pct(100) }, {}, [
      hd("mb-ma-title", "h1", "Messe Berlin Asia Pacific", [
        { "font-family": FREDOKA, "font-weight": "600", color: T.forest, "font-size": px(56), "line-height": px(70), margin: P0, width: AUTO },
        { tablet: { "font-size": px(52), "line-height": px(64) }, mobile: { "font-size": px(38), "line-height": px(46) } },
      ], { attributes: step(0) }),
      dv("mb-ma-body", { width: pct(100) }, {}, [
        pg("mb-ma-p1", "Messe Berlin Asia Pacific is the regional headquarters of Messe Berlin GmbH for the Asia Pacific region, headquartered in Singapore with a growing presence in key markets. It leads the development and expansion of Messe Berlin’s business across Asia, connecting global industries with high-growth regional opportunities.", BODY),
        pg("mb-ma-p2", "In Asia Pacific, Messe Berlin Asia Pacific develops and delivers leading platforms including <a href=\"#\">ITB Asia</a>, <a href=\"#\">InnoTrans Asia</a>, <a href=\"#\">CMS Asia</a>, <a href=\"#\">Smart Health Asia</a>, <a href=\"#\">ITB India</a>, <a href=\"#\">MICE Show Asia</a>, <a href=\"#\">Travel Tech Asia</a> and <a href=\"#\">Travel Meet Asia</a>. The organisation also oversees Messe Berlin India, supporting the group’s growth in the Indian market.",
          mix(BODY, [{ margin: pad(27, 0, 0, 0) }, { mobile: { margin: pad(25, 0, 0, 0) } }])),
      ], { attributes: step(1) }),
      pg("mb-ma-more", "For more information: <a href=\"https://www.messe-berlin.asia\" target=\"_blank\">https://www.messe-berlin.asia</a>", MORE, { attributes: step(2) }),
    ]),
  ]),
], { tag: "section" })];
