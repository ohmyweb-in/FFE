// Back link, date + category, title, standfirst, photo + caption (atomic), then article.html in an html widget.
const fs = require("fs");
const path = require("path");
const { T, FREDOKA, px, pad, P0, mtAuto, radius, div, w, image, media, text, mix, pct, custom } = require("../../lib.js");
const { CW } = require("../g4-shared.js");

const M = media();
const HTML = fs.readFileSync(path.join(__dirname, "article.html"), "utf8").replace(/^<!--.*-->\n/, "");
const CAPTION =
  "<strong>Seated, from left:</strong> Katrina Leung, Managing Director and Vice President Asia Pacific, Messe Berlin; and Poh Chi Chuan, Executive Director, Exhibitions and Conferences, Singapore Tourism Board. <strong>Standing, from left:</strong> Leong Der Yao, Deputy Chief Executive Officer (Corporate, Industry &amp; Technology), Singapore Food Agency; Ralph Graichen, Corporate Advisor, Temasek; and Jeannie Lim, Assistant Managing Director, Services &amp; Growth Enterprises, Enterprise Singapore.";

module.exports = [div("na-article", mix(CW(880), [{ padding: pad(48, 0, 0, 0), margin: mtAuto(0), display: "block" }, { tablet: { padding: pad(32, 0, 0, 0) } }]), [
  w("na-back", "e-paragraph", { paragraph: '<a href="/news/">‹&nbsp; News &amp; Press</a>' }, [{ ...text(15, 600, T.forest, { "line-height": px(20) }), margin: P0 }, {}]),
  w("na-meta", "e-paragraph", { paragraph: '<time datetime="2026-10-27">27 OCT 2026</time><span>Press Release</span>' }, [
    { ...text(13, 500, T.accent, { "line-height": px(24), "letter-spacing": px(0.52) }), margin: pad(36, 0, 0, 0) }, { tablet: { margin: pad(28, 0, 0, 0) } },
  ]),
  w("na-title", "e-heading", { tag: "h1", title: "Messe Berlin launches Fresh Food Expo Asia Pacific in Singapore" }, [
    { "font-family": FREDOKA, "font-size": px(48), "font-weight": "600", "line-height": px(56), color: T.forest, margin: pad(18, 0, 0, 0) },
    { tablet: { "font-size": px(42), "line-height": px(50) }, mobile: { "font-size": px(32), "line-height": px(38) } },
  ]),
  w("na-standfirst", "e-paragraph", { paragraph: "New international B2B trade show for the fresh food industry to join Singapore International Agri-Food Week from 2027" }, [
    { ...text(21, 500, T.body, { "line-height": px(31) }), margin: pad(16, 0, 0, 0) }, { mobile: { "font-size": px(19), "line-height": px(28) } },
  ]),
  w("na-photo", "e-image", { image: image(M["g8-signing-2"].id) }, [
    { width: pct(100), height: custom("auto"), "max-width": custom("none"), "border-radius": radius(28), margin: pad(40, 0, 0, 0) },
    { tablet: { "border-radius": radius(20), margin: pad(32, 0, 0, 0) } },
  ]),
  w("na-caption", "e-paragraph", { paragraph: CAPTION }, [{ ...text(14, 400, T.body, { "line-height": px(21) }), margin: pad(14, 0, 0, 0) }, {}]),
  { id: "na-html", elType: "widget", widgetType: "html", settings: { html: HTML }, elements: [], styles: {} },
], { tag: "article" })];
