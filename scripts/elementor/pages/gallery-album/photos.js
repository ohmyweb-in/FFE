// The album's photos (each links to its 1600px file; the lightbox opens it and offers the full-resolution download) + the editorial-use note.
const { T, px, pad, P0, mtAuto, w, mix, PAGE, text, media } = require("../../lib.js");
const { ALBUMS, DOWNLOADS, grid, lightbox } = require("../g8-shared.js");

const M = media(), a = ALBUMS[0];
module.exports = [
  grid("ga", a.photos.map(([key, alt, dl]) => ({ thumb: `g8-${key}-thumb`, href: M[`g8-${key}`].url, caption: alt, lb: true, download: dl && DOWNLOADS + dl }))),
  w("ga-note", "e-paragraph", {
    paragraph: 'These photos are for editorial use only. Copyright: Messe Berlin Asia Pacific. Open a photo to download it in full resolution. Questions: <a href="mailto:marketing@freshfoodexpoapac.com">marketing@freshfoodexpoapac.com</a>. <a href="/gallery/">Back to Gallery</a>',
  }, mix(PAGE(32, 26), [
    { ...text(15, 400, T.body, { "line-height": px(23) }), padding: pad(0, 6), margin: mtAuto(40) },
    { tablet: { padding: P0, margin: mtAuto(32) } },
  ])),
  lightbox("ga"),
];
