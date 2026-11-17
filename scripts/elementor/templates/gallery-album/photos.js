// The album's photos (its Gallery block, rendered by [ffe_album_photos] in ffe-content.php; each opens in the lightbox with its
// full-resolution download), then the editorial-use note and the lightbox.
const { T, px, pad, P0, mtAuto, w, mix, PAGE, text } = require("../../lib.js");
const { lightbox } = require("../../pages/g8-shared.js");

module.exports = [
  { id: "ga-photos", elType: "widget", widgetType: "shortcode", settings: { shortcode: "[ffe_album_photos]" }, elements: [], styles: {} },
  w("ga-note", "e-paragraph", {
    paragraph: 'These photos are for editorial use only. Copyright: Messe Berlin Asia Pacific. Open a photo to download it in full resolution. Questions: <a href="mailto:marketing@freshfoodexpoapac.com">marketing@freshfoodexpoapac.com</a>. <a href="/gallery/">Back to Gallery</a>',
  }, mix(PAGE(32, 26), [
    { ...text(15, 400, T.body, { "line-height": px(23) }), padding: pad(0, 6), margin: mtAuto(40) },
    { tablet: { padding: P0, margin: mtAuto(32) } },
  ])),
  lightbox("ga"),
];
