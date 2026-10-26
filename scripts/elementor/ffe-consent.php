<?php
/**
 * Plugin Name: FFE — cookie consent and analytics
 * Description: Google Analytics 4 loads only after the visitor accepts it in the cookie banner (opt-in for everyone, the GDPR standard Messe Berlin works to; also covers Singapore's PDPA). The choice is the cookie ffe_consent (granted|denied, 6 months); the footer's "Cookie Settings" link (#cookie-settings) reopens the banner. Nothing else on the site sets non-essential cookies: Turnstile is security, Mailchimp runs server-side. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

// GA4 property "freshfoodexpoapac.com" (account "Fresh Food Expo APAC", created 26 Oct 2026). Only on the live domain, so staging
// and tests stay out of the data, and never for logged-in editors. Pages are cached, so the cookie is read in the browser.
add_action('wp_head', function () {
  if (is_user_logged_in() || wp_parse_url(home_url(), PHP_URL_HOST) !== 'www.freshfoodexpoapac.com') return;
  ?>
<script>
window.ffeGA = function () {
  window['ga-disable-G-RS2KZKZQDW'] = false;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', 'G-RS2KZKZQDW');
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-RS2KZKZQDW';
  document.head.appendChild(s);
};
if (/(^|; )ffe_consent=granted/.test(document.cookie)) ffeGA();
</script>
<?php
}, 1);

add_action('wp_footer', function () {
  if (is_admin() || is_customize_preview() || isset($_GET['elementor-preview'])) return;
  if (class_exists('\Elementor\Plugin') && (\Elementor\Plugin::$instance->editor->is_edit_mode() || \Elementor\Plugin::$instance->preview->is_preview_mode())) return;
  ?>
<style id="ffe-consent-css">
#ffe-consent, #ffe-consent * { box-sizing: border-box; }
#ffe-consent {
  position: fixed; left: 16px; bottom: 16px; z-index: 9999; width: calc(100% - 32px); max-width: 400px; padding: 20px;
  border-radius: 20px; background: #fff; box-shadow: 0 10px 40px rgb(0 0 0 / .18); color: #4f4f4f;
  font: 400 14px/1.5 Outfit, system-ui, sans-serif;
}
#ffe-consent[hidden] { display: none; }
#ffe-consent p { margin: 0; padding: 0; }
#ffe-consent .fc-title { margin-bottom: 6px; color: #025d03; font: 600 18px/1.3 Fredoka, system-ui, sans-serif; }
#ffe-consent a { color: #28ae3d; text-decoration: underline; text-underline-offset: 2px; }
#ffe-consent a:hover { color: #025d03; }
#ffe-consent .fc-btns { display: flex; gap: 8px; margin-top: 14px; }
/* Same size and weight for both, so declining is as easy as accepting. */
#ffe-consent button {
  flex: 1; height: 39px; margin: 0; padding: 0 16px; border: 1.5px solid #28ae3d; border-radius: 999px; cursor: pointer;
  font: 500 15px/1.2 Outfit, system-ui, sans-serif; letter-spacing: .02em; text-transform: none;
  transition: background-color .25s cubic-bezier(.22,1,.36,1), color .25s cubic-bezier(.22,1,.36,1);
}
#ffe-consent .fc-yes, #ffe-consent .fc-yes:hover, #ffe-consent .fc-yes:focus { background: #28ae3d; color: #fff; }
#ffe-consent .fc-yes:hover { background: #025d03; border-color: #025d03; }
#ffe-consent .fc-no, #ffe-consent .fc-no:focus { background: #fff; color: #28ae3d; }
#ffe-consent .fc-no:hover { background: #e2f0e4; color: #28ae3d; }
#ffe-consent button:focus-visible { outline: 2px solid #025d03; outline-offset: 3px; }
</style>
<section id="ffe-consent" aria-label="Cookie consent" hidden>
  <p class="fc-title">Cookies on this site</p>
  <p>We’d like to use Google Analytics cookies to understand how visitors use the site, so we can improve it. They’re only set if you accept. See our <a href="https://www.messe-berlin.asia/en/additional-pages/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</p>
  <div class="fc-btns">
    <button type="button" class="fc-yes" data-consent="granted">Accept</button>
    <button type="button" class="fc-no" data-consent="denied">Decline</button>
  </div>
</section>
<script>
(function () {
  var box = document.getElementById('ffe-consent');
  if (!/(^|; )ffe_consent=/.test(document.cookie)) box.hidden = false;
  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-consent]');
    if (!b) return;
    var v = b.getAttribute('data-consent');
    document.cookie = 'ffe_consent=' + v + '; Max-Age=15552000; path=/; SameSite=Lax; Secure';
    box.hidden = true;
    box.dispatchEvent(new Event('ffe-consent'));
    if (v === 'granted') { if (window.ffeGA) ffeGA(); return; }
    // Withdrawn: stop this page's tag and remove the cookies it set (GA puts them on the registrable domain).
    window['ga-disable-G-RS2KZKZQDW'] = true;
    document.cookie.split('; ').forEach(function (c) {
      var n = c.split('=')[0];
      if (!/^_ga/.test(n)) return;
      document.cookie = n + '=; Max-Age=0; path=/';
      document.cookie = n + '=; Max-Age=0; path=/; domain=.' + location.hostname.replace(/^www\./, '');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('a[href$="#cookie-settings"]')) return;
    e.preventDefault();
    box.hidden = false;
    box.querySelector('button').focus();
  });
})();
</script>
<?php
});
