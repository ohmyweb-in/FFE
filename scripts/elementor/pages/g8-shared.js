// Gallery (G8): GalleryGrid.tsx tiles + its photo lightbox, shared by /gallery and the album pages.
const { T, px, pct, custom, pad, P0, mtAuto, radius, gap, link, box, div, w, attrs, image, text, mix, reveal, PAGE, at, media } = require("../lib.js");

// The albums (src/components/gallery/albums.ts). photos: [key, alt, download]; media keys g8-<key> (1600px) and g8-<key>-thumb (800px); the first photo
// is the cover. download: the client's full-resolution original (metadata stripped with `jpegtran -copy none`), a plain file in DOWNLOADS, not a media item.
const DOWNLOADS = "/wp-content/uploads/2026/10/downloads/";
const ALBUMS = [
  {
    slug: "partner-event-launch-signing-ceremony",
    title: "Partner Event Launch Signing Ceremony",
    desc: "Between Messe Berlin and the Singapore Tourism Board, supported by the Singapore Food Agency, Temasek and Enterprise Singapore.",
    photos: [
      ["signing-2", "Signatories at the table during the Partner Event Launch Signing Ceremony", "ffe-apac-signing-ceremony-2.jpg"],   // IMG_9658
      ["signing-3", "Signing the partner agreement at the Fresh Food Expo Asia Pacific Partner Event Launch", "ffe-apac-signing-ceremony-3.jpg"],   // IMG_9659
      ["signing-1", "Guests give a thumbs-up in front of the Partner Event Launch Signing Ceremony backdrop", "ffe-apac-signing-ceremony-1.jpg"],   // IMG_9664
    ],
  },
];

// GalleryGrid: container-page lg:px-[6px], mt 40 / lg 63; 2 cols (gap 12×20, md 20×20), lg 4 cols (26×15).
// Tile 298.85×224.14 accent box, photo 98.9% tall so a 2.5px accent strip shows. t = { thumb, href, title?, caption?, lb?, download? }.
const grid = (p, tiles) => {
  const M = media();
  const items = tiles.map((t, k) => {
    const id = `${p}-gal-t${k + 1}`;
    return div(id, [{ padding: P0, "min-width": px(0) }, {}], [
      box(`${id}-a`, [{ padding: P0, display: "flex", "flex-direction": "column", width: pct(100) }, {}], [
        div(`${id}-frame`, [
          { position: "relative", overflow: "hidden", "aspect-ratio": "298.85/224.14", padding: P0, "border-radius": radius(20), background: { color: T.accent } },
          { tablet: { "border-radius": radius(14) } },
        ], [
          w(`${id}-img`, "e-image", { image: image(M[t.thumb].id), attributes: attrs([["data-zoom", ""]]) }, [
            { ...at(px(0), null, null, px(0)), width: pct(100), height: pct(98.9), "max-width": custom("none"), "object-fit": "cover" }, {},
          ]),
        ]),
        ...(t.title ? [w(`${id}-cap`, "e-paragraph", { tag: "span", paragraph: t.title }, [
          { ...text(16.39, 400, "#000000", { "line-height": px(27.32), "text-align": "center" }), padding: pad(8, 2, 2, 2), margin: P0 },
          { mobile: { "font-size": px(14), "line-height": px(20) } },
        ])] : []),
      ], {
        tag: "a", link: link(t.href),
        attributes: attrs([["data-group", ""], ...(t.lb ? [["data-lb", ""], ["data-caption", t.caption], ["data-elementor-open-lightbox", "no"], ["aria-label", `View photo ${k + 1}: ${t.caption}`]] : []), ...(t.download ? [["data-download", t.download]] : [])]),
      }),
    ], { attributes: attrs(reveal(k % 4)) });
  });
  return div(`${p}-gal`, mix(PAGE(32, 26), [
    { padding: pad(0, 6), margin: mtAuto(63), display: "grid", "grid-template-columns": "repeat(4, minmax(0, 1fr))", gap: gap(15, 26) },
    { tablet: { padding: P0, margin: mtAuto(40), "grid-template-columns": "repeat(2, minmax(0, 1fr))", gap: gap(20, 20) }, mobile: { gap: gap(20, 12) } },
  ]), items, { tag: "section" });
};

// The lightbox (GalleryGrid.tsx <dialog>): native dialog, near-black backdrop, 800px photo, round white close/prev/next, arrow keys, swipe,
// and a Download pill for the photo's full-resolution file (the tile's data-download; hidden when a photo has none).
// Links work without JS (they open the 1600px file). A classic html widget, as the atomic schema has no <dialog>.
const LIGHTBOX = `<dialog class="ffe-lb" aria-label="Photo preview">
<div class="ffe-lb-stage"><figure><img alt=""><figcaption><span></span> <span class="ffe-lb-n"></span></figcaption>
<a class="ffe-lb-dl" download hidden><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Download full resolution</a></figure></div>
<button type="button" class="ffe-lb-close" aria-label="Close preview"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#025d03" stroke-width="2.2" stroke-linecap="round"/></svg></button>
<button type="button" class="ffe-lb-prev" aria-label="Previous photo"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="#025d03" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<button type="button" class="ffe-lb-next" aria-label="Next photo"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="#025d03" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
</dialog>
<style>
.ffe-lb { margin: 0; padding: 0; width: 100%; height: 100%; max-width: none; max-height: none; border: 0; background: transparent; overflow: hidden; }
.ffe-lb::backdrop { background: rgb(10 14 10 / .92); }
.ffe-lb-stage { display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; padding: 72px 96px; box-sizing: border-box; }
.ffe-lb figure { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 800px; margin: 0; }
.ffe-lb img { width: 100%; height: auto; max-height: calc(100dvh - 250px); object-fit: contain; border-radius: 20px; }
.ffe-lb figcaption { margin-top: 14px; color: #fff; font: 400 17px/22px Outfit, system-ui, sans-serif; text-align: center; }
.ffe-lb-n { margin-left: 10px; color: rgb(255 255 255 / .6); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ffe-lb .ffe-lb-dl { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; padding: 10px 20px; border-radius: 999px; background: #fff; color: #025d03; font: 500 16px/20px Outfit, system-ui, sans-serif; text-decoration: none; transition: transform .25s cubic-bezier(.22,1,.36,1); }
.ffe-lb .ffe-lb-dl[hidden] { display: none; }
.ffe-lb .ffe-lb-dl:hover, .ffe-lb .ffe-lb-dl:focus { color: #025d03; background: #fff; transform: scale(1.04); }
.ffe-lb .ffe-lb-dl:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.ffe-lb button { position: absolute; display: grid; place-items: center; width: 52px; height: 52px; padding: 0; border: 0; border-radius: 999px; background: #fff; box-shadow: 0 4px 12px rgb(0 0 0 / .25); cursor: pointer; transition: transform .25s cubic-bezier(.22,1,.36,1); }
/* :hover/:focus repeated so Hello Elementor's pink [type=button]:focus / button:hover fill never shows. */
.ffe-lb button:hover, .ffe-lb button:focus { background: #fff; color: #025d03; border: 0; }
.ffe-lb button:hover { transform: scale(1.05); }
.ffe-lb button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.ffe-lb-close { top: 24px; right: 24px; }
.ffe-lb-prev, .ffe-lb-next { top: 50%; margin-top: -26px; }
.ffe-lb-prev { left: 24px; } .ffe-lb-next { right: 24px; }
@media (max-width: 767px) {
  .ffe-lb-stage { padding: 72px 12px; }
  .ffe-lb img { border-radius: 14px; }
  .ffe-lb figcaption { font-size: 15px; }
  .ffe-lb-n { display: block; margin: 0; }
  .ffe-lb button { width: 44px; height: 44px; }
  .ffe-lb-prev, .ffe-lb-next { margin-top: -22px; }
  .ffe-lb-close { top: 14px; right: 12px; } .ffe-lb-prev { left: 8px; } .ffe-lb-next { right: 8px; }
}
@media (orientation: landscape) and (max-height: 500px) { .ffe-lb-stage { padding: 12px 72px; } .ffe-lb img { max-height: calc(100dvh - 64px); } }
</style>
<script>
(function () {
  var d = document.querySelector('.ffe-lb'), links = [].slice.call(document.querySelectorAll('a[data-lb]')), i = 0, x = 0, y = 0;
  if (!d || !d.showModal || !links.length) return;
  var img = d.querySelector('img'), cap = d.querySelector('figcaption span'), n = d.querySelector('.ffe-lb-n'), dl = d.querySelector('.ffe-lb-dl');
  function show(k) {
    i = (k + links.length) % links.length;
    var a = links[i];
    img.src = a.href; img.alt = a.dataset.caption || '';
    cap.textContent = a.dataset.caption || ''; n.textContent = (i + 1) + ' / ' + links.length;
    dl.hidden = !a.dataset.download;
    if (a.dataset.download) { dl.href = a.dataset.download; dl.setAttribute('download', a.dataset.download.split('/').pop()); }
    d.setAttribute('aria-label', a.dataset.caption || 'Photo preview');
  }
  links.forEach(function (a, k) { a.addEventListener('click', function (e) { e.preventDefault(); show(k); d.showModal(); }); });
  d.querySelector('.ffe-lb-close').onclick = function () { d.close(); };
  d.querySelector('.ffe-lb-prev').onclick = function () { show(i - 1); };
  d.querySelector('.ffe-lb-next').onclick = function () { show(i + 1); };
  d.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  // Clicks on the dark area around the photo close the preview.
  d.querySelector('.ffe-lb-stage').addEventListener('click', function (e) { if (e.target === e.currentTarget) d.close(); });
  d.addEventListener('touchstart', function (e) { x = e.touches[0].clientX; y = e.touches[0].clientY; }, { passive: true });
  d.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - x, dy = e.changedTouches[0].clientY - y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(i + (dx < 0 ? 1 : -1));
  });
})();
</script>`;
const lightbox = (p) => ({ id: `${p}-lightbox`, elType: "widget", widgetType: "html", settings: { html: LIGHTBOX }, elements: [] });

module.exports = { ALBUMS, DOWNLOADS, grid, lightbox };
