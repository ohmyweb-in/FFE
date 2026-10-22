// Site-wide settings: Elementor kit (colours, fonts, page background, content width) and font loading.
// Run once, and again after a token change in src/app/globals.css.
const { php, T } = require("./lib.js");

// Rules the atomic style schema can't express (no text-box, zoom, container-type, white-space, pointer-events, per-element CSS),
// keyed on data attributes the home sections set. Sources: globals.css, RevealObserver.tsx, CountUp.tsx.
const KIT_CSS = `/* Cap-trimmed text like the reference (globals.css :where(h1,h2,h3,p,li,label,.trim)), inside sections marked data-trim. */
[data-trim] :is(.e-heading-base, .e-paragraph-base):not([data-untrim]) { text-box: trim-both cap alphabetic; }
/* Two-tone headings: <em> is the accent run. */
:is(.e-heading-base, .e-paragraph-base) em { font-style: normal; color: #28ae3d; }
@media (max-width: 767px) { [data-br-md] br { display: none; } }
[data-nowrap] { white-space: nowrap; }
@media (min-width: 768px) { [data-nowrap-md] { white-space: nowrap; } }
[data-balance] { text-wrap: balance; }
[data-noevents] { pointer-events: none; }
[data-count] { font-variant-numeric: tabular-nums; }
@media (max-width: 767px) {
  [data-cq-m] { container-type: inline-size; }
  [data-zoom-m="903"] { zoom: 0.903; } /* Ecosystem cards: phone frame = desktop card x 0.903 */
  [data-zoom-m="619"] { zoom: 0.619; } /* Show cards: x 0.619 */
}
/* Pills (globals.css .btn / .pill): focus ring, 44px touch target, chevron nudge; cards: photo zoom. */
:is([data-btn], [data-group]):focus-visible { outline: 2px solid #025d03; outline-offset: 3px; }
@media (pointer: coarse) { [data-btn]::after { content: ""; position: absolute; inset: min(0px, calc((100% - 44px) / 2)); } }
[data-pill] span { display: inline-block; margin-left: 10px; }
@media (prefers-reduced-motion: no-preference) and (hover: hover) {
  [data-nudge], [data-group-nudge], [data-pill] span { transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1); }
  [data-btn]:hover :is([data-nudge], [data-pill] span), [data-group]:hover [data-group-nudge] { transform: translateX(3px); }
  [data-zoom] { transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
  [data-group]:hover [data-zoom] { transform: scale(1.04); }
}
/* Scroll reveal; .ffe-js is set by the "FFE motion" Custom Code snippet. */
@media (prefers-reduced-motion: no-preference) {
  .ffe-js [data-reveal] { opacity: 0; transform: translate3d(0, 24px, 0); transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1); }
  .ffe-js [data-reveal="fade"] { transform: none; }
  .ffe-js [data-reveal="scale"] { transform: scale(0.85); }
  .ffe-js [data-reveal].is-visible { opacity: 1; transform: none; }
  [data-reveal-i="1"] { transition-delay: 90ms; } [data-reveal-i="2"] { transition-delay: 180ms; } [data-reveal-i="3"] { transition-delay: 270ms; }
}
.elementor-editor-active [data-reveal] { opacity: 1 !important; transform: none !important; }`.split("\n");

// Custom Code snippet "FFE motion" (Elementor Pro): reveal on scroll + count-up. Reduced motion: nothing hides, numbers stay final.
const MOTION = `<script id="ffe-motion">
/* RevealObserver.tsx + CountUp.tsx. */
document.documentElement.classList.add('ffe-js');
document.addEventListener('DOMContentLoaded', function () {
  var io = 'IntersectionObserver' in window;
  var reveal = document.querySelectorAll('[data-reveal]');
  if (!io) { reveal.forEach(function (el) { el.classList.add('is-visible'); }); return; }
  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  reveal.forEach(function (el) { ro.observe(el); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var to = +el.dataset.count, dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || '';
    var fmt = function (v) { return v.toFixed(dec) + suf; };
    el.innerHTML = '<span aria-hidden="true"></span><span class="screen-reader-text"></span>';
    var shown = el.firstChild; el.lastChild.textContent = fmt(to); shown.textContent = fmt(0);
    var co = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      co.disconnect();
      var t0 = performance.now();
      (function tick(t) { var p = Math.min(1, (t - t0) / 1600); shown.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
    }, { threshold: 0.6 });
    co.observe(el);
  });
});
</script>`;

const kit = {
  system_colors: [
    { _id: "primary", title: "Brand", color: T.brand },
    { _id: "secondary", title: "Forest", color: T.forest },
    { _id: "text", title: "Body", color: T.body },
    { _id: "accent", title: "Accent", color: T.accent },
  ],
  custom_colors: [
    { _id: "page", title: "Page", color: T.page },
    { _id: "mint", title: "Mint", color: T.mint },
  ],
  // Fredoka for display type, Outfit for everything else (layout.tsx).
  system_typography: [
    { _id: "primary", title: "Display", typography_typography: "custom", typography_font_family: "Fredoka", typography_font_weight: "600" },
    { _id: "secondary", title: "Display medium", typography_typography: "custom", typography_font_family: "Fredoka", typography_font_weight: "500" },
    { _id: "text", title: "Body", typography_typography: "custom", typography_font_family: "Outfit", typography_font_weight: "500" },
    { _id: "accent", title: "UI", typography_typography: "custom", typography_font_family: "Outfit", typography_font_weight: "500" },
  ],
  body_background_background: "classic",
  body_background_color: T.page,
  body_color: T.body,
  body_typography_typography: "custom",
  body_typography_font_family: "Outfit",
  container_width: { unit: "px", size: T.maxw, sizes: [] },
  // globals.css: decorative curves poke past the page edge without a sideways scroll; .load-in, where an
  // element's data-load-in="n" is its step in the page-load sequence (150ms + n × 90ms).
  custom_css: [
    "body { overflow-x: clip; }",
    "@keyframes ffe-fade-up { from { opacity: 0; transform: translate3d(0, 24px, 0); } }",
    "@media (prefers-reduced-motion: no-preference) {",
    "  [data-load-in] { animation: ffe-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both; }",
    ...[1, 2, 3, 4, 5].map((n) => `  [data-load-in="${n}"] { animation-delay: ${150 + n * 90}ms; }`),
    "}",
    ...KIT_CSS,
  ].join("\n"),
  // Breakpoints are max-widths: laptop 1280-1439 (Tailwind xl), tablet_extra 1025-1279 (lg), tablet 768-1024 (md), mobile <=767.
  active_breakpoints: ["viewport_mobile", "viewport_tablet", "viewport_tablet_extra", "viewport_laptop"],
  viewport_mobile: 767,
  viewport_tablet: 1024,
  viewport_tablet_extra: 1279,
  viewport_laptop: 1439,
};

const snippet = php(`
$t = get_posts(['post_type' => 'elementor_snippet', 'title' => 'FFE motion', 'post_status' => 'any', 'numberposts' => 1]);
$sid = $t ? $t[0]->ID : wp_insert_post(['post_type' => 'elementor_snippet', 'post_title' => 'FFE motion', 'post_status' => 'publish']);
wp_update_post(['ID' => $sid, 'post_status' => 'publish']);
update_post_meta($sid, '_elementor_code', base64_decode('${Buffer.from(MOTION).toString("base64")}'));
update_post_meta($sid, '_elementor_location', 'elementor_head');
update_post_meta($sid, '_elementor_priority', 1);
update_post_meta($sid, '_elementor_conditions', ['include/general']);
// Theme Builder conditions cache: Custom Code locations are looked up there.
\\ElementorPro\\Modules\\ThemeBuilder\\Module::instance()->get_conditions_manager()->get_cache()->regenerate();
return $sid;
`);

console.log(
  JSON.stringify(
    php(`
$kit = \\Elementor\\Plugin::$instance->kits_manager->get_active_kit();
$kit->update_settings(json_decode(base64_decode('${Buffer.from(JSON.stringify(kit)).toString("base64")}'), true));
// Serve Google Fonts from this server: Google's font CDN is unreliable from mainland China, and it keeps visitor IPs off Google.
update_option('elementor_local_google_fonts', '1');
update_option('elementor_font_display', 'swap');
\\Elementor\\Plugin::$instance->files_manager->clear_cache();
$s = get_post_meta($kit->get_id(), '_elementor_page_settings', true); // get_settings() still holds the old values
return ['kit' => $kit->get_id(), 'bg' => $s['body_background_color'], 'width' => $s['container_width'], 'local_fonts' => get_option('elementor_local_google_fonts'), 'bp' => array_intersect_key($s, array_flip(['active_breakpoints', 'viewport_laptop', 'viewport_tablet_extra'])), 'snippet' => ${snippet.return_value}];
`),
  ),
);
