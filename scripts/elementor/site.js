// Site-wide settings: Elementor kit (colours, fonts, page background, content width) and font loading.
// Run once, and again after a token change in src/app/globals.css.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { php, call, T, SP, ORIGIN } = require("./lib.js");

// Inter SemiBold Italic, latin only (story/WhyNow.tsx loads it with next/font; it is the only Inter on the site). Elementor's local-fonts option only serves
// the families a page's typography asks for, so this one is fetched from Google Fonts here and served from the uploads folder with its own @font-face.
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"; // a modern UA gets woff2
const interCss = execFileSync("curl", ["-sSf", "-A", UA, "https://fonts.googleapis.com/css2?family=Inter:ital,wght@1,600&display=swap"], { encoding: "utf8" });
const latin = interCss.match(/\/\* latin \*\/\s*@font-face \{([^}]*)\}/)[1];
const woff = path.join(SP, "ffe-inter-600-italic-latin.woff2");
execFileSync("curl", ["-sSf", "-o", woff, latin.match(/url\((https:[^)]+\.woff2)\)/)[1]]);
const upload = call("novamira/create-upload-link", { path: "wp-content/uploads/2026/10/ffe-inter-600-italic-latin.woff2", overwrite: true });
execFileSync("curl", ["-sSf", "-X", "PUT", "-H", `${upload.token_header}: ${upload.upload_token}`, "--data-binary", `@${woff}`, upload.upload_url]);
const INTER_FACE = `@font-face { font-family: Inter; font-style: italic; font-weight: 600; font-display: swap; src: url("${ORIGIN}/wp-content/uploads/2026/10/ffe-inter-600-italic-latin.woff2") format("woff2"); unicode-range: ${latin.match(/unicode-range: ([^;]+);/)[1]}; }`;

// Rules the atomic style schema can't express (no text-box, zoom, container-type, white-space, pointer-events, per-element CSS),
// keyed on data attributes the home sections set. Sources: globals.css, RevealObserver.tsx, CountUp.tsx.
const KIT_CSS = `${INTER_FACE}
/* Cap-trimmed text like the reference (globals.css :where(h1,h2,h3,p,li,label,.trim)), inside sections marked data-trim. */
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
  /* globals.css: transition-delay = --i * --stagger (90ms). Same specificity as the transition shorthand above would lose to it, hence the extra attribute. */
  .ffe-js [data-reveal][data-reveal-i="1"] { transition-delay: 90ms; } .ffe-js [data-reveal][data-reveal-i="2"] { transition-delay: 180ms; } .ffe-js [data-reveal][data-reveal-i="3"] { transition-delay: 270ms; }
  .ffe-js [data-reveal][data-reveal-i="4"] { transition-delay: 360ms; } .ffe-js [data-reveal][data-reveal-i="5"] { transition-delay: 450ms; }
}
.elementor-editor-active [data-reveal] { opacity: 1 !important; transform: none !important; }
/* Inner pages: a <br> that only breaks from lg (max-lg:hidden); title that must stay on one line from lg. */
@media (max-width: 1024px) { [data-br-lg] br { display: none; } }
@media (min-width: 1025px) { [data-nowrap-lg] { white-space: nowrap; } }
[data-prewrap] { white-space: pre-wrap; } @media (min-width: 1025px) { [data-prewrap-lg] { white-space: pre-wrap; } } /* whitespace-pre-wrap / lg:whitespace-pre-wrap copy (double spaces and \n survive escaped-html) */
[data-nowrap-span] span { white-space: nowrap; } /* <span>…</span> inside a heading = the source's whitespace-nowrap run (a class is stripped from headings) */
/* Forms (globals.css .input / .checkbox / .pill): states the atomic schema can't express. .elementor lifts these above the widgets' own base and local classes. */
body .elementor [data-ffe-input] { appearance: none; outline: none; }
body .elementor [data-ffe-input]::placeholder { color: #cdcdcd; opacity: 1; }
body .elementor select[data-ffe-input]:invalid { color: #cdcdcd; } body .elementor select[data-ffe-input] option { color: #000; }
body .elementor [data-ffe-input]:is(:focus, :focus-within) { border-color: #28ae3d; box-shadow: 0 0 0 4px rgb(40 174 61 / .15); }
body .elementor [data-ffe-input]:is(:user-invalid, :has(:user-invalid)) { border-color: #d93025; box-shadow: 0 0 0 4px rgb(217 48 37 / .12); }
body .elementor [data-ffe-dial] input { outline: none; } body .elementor [data-ffe-dial] select { appearance: none; border: 0; }
body .elementor [data-dial-flag] { flex-shrink: 0; background: #fff url(/flags/sg.svg) center / cover no-repeat; }
/* Dial-code list (PhoneInput .dial-select): where the browser can style a select's list (Chrome/Edge 135+), padded rows in the
   country dropdown's look, long names wrapping; elsewhere the native list. */
@supports (appearance: base-select) {
  body .elementor [data-ffe-dial] select, body .elementor [data-ffe-dial] select::picker(select) { appearance: base-select; }
  body .elementor [data-ffe-dial] select::picker(select) { width: 300px; max-height: min(320px, 60dvh); overflow-x: hidden; margin-top: 6px; padding: 6px 0; border: 1px solid #cdcdcd; border-radius: 10px; background: #fff; box-shadow: 0 12px 32px -12px rgb(2 93 3 / .3); }
  body .elementor [data-ffe-dial] optgroup { padding-top: 6px; font-size: 12px; font-weight: 600; color: #4f4f4f; text-transform: uppercase; text-indent: 16px; }
  body .elementor [data-ffe-dial] option { padding: 9px 16px; font-size: 15px; line-height: 20px; font-weight: 500; white-space: normal; color: #1f1f1f; text-transform: none; text-indent: 0; }
  body .elementor [data-ffe-dial] option:is(:hover, :focus-visible, :checked) { background: #e2f0e4; color: #025d03; outline: none; }
  body .elementor [data-ffe-dial] option::checkmark { display: none; }
}
/* Country combobox (CountrySelect.tsx): chevron flips when open, listbox as in the source. */
body .elementor [data-ffe-cs] { position: relative; }
body .elementor [data-ffe-cs] [data-noevents] { transition: transform 250ms cubic-bezier(.22, 1, .36, 1); }
body .elementor [data-ffe-cs][data-open] [data-noevents] { transform: rotate(180deg); }
body .elementor [data-ffe-cs] > ul { position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 20; max-height: 264px; overflow-y: auto; overscroll-behavior: contain; margin: 0; padding: 6px 0; list-style: none; background: #fff; border: 1px solid #cdcdcd; border-radius: 10px; box-shadow: 0 12px 32px -12px rgb(2 93 3 / .3); animation: ffe-cs-in 250ms cubic-bezier(.22, 1, .36, 1) both; }
body .elementor [data-ffe-cs] > ul[hidden] { display: none; }
body .elementor [data-ffe-cs] > ul > li { margin: 0; padding: 9px 16px; cursor: pointer; font-size: 15px; line-height: 20px; font-weight: 500; color: #1f1f1f; }
body .elementor [data-ffe-cs] > ul > li.is-active { background: #e2f0e4; color: #025d03; }
body .elementor [data-ffe-cs] > ul > li.ffe-cs-none { cursor: default; font-weight: 400; color: #4f4f4f; }
@keyframes ffe-cs-in { from { opacity: 0; } }
body .elementor [data-ffe-check], body .elementor [data-ffe-radio] { appearance: none; flex-shrink: 0; margin: 0; cursor: pointer; background: #fff center / 100% no-repeat; }
body .elementor [data-ffe-check]::before, body .elementor [data-ffe-radio]::before { content: none; }
body .elementor [data-ffe-check]:checked { border-color: #28ae3d; background-color: #28ae3d; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.5l3 3 6-7' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); }
body .elementor [data-ffe-radio] { border-radius: 50%; } body .elementor [data-ffe-radio]:checked { border-color: #28ae3d; background-color: #28ae3d; box-shadow: inset 0 0 0 4px #fff; }
body .elementor :is([data-ffe-check], [data-ffe-radio]):focus-visible { outline: 2px solid #025d03; outline-offset: 2px; }
body .elementor :is([data-ffe-check], [data-ffe-radio]):user-invalid { border-color: #d93025; }
[data-span] { grid-column: 1 / -1; }
body .elementor .e-form-label-base :is(b, strong) { font-weight: 600; }
body .elementor [data-link="dark"] a { font-weight: 600; color: #000; text-decoration: none; text-underline-offset: 2px; } body .elementor [data-link="dark"] a:hover { text-decoration: underline; }
body .elementor [data-link="accent"] a { color: #28ae3d; text-decoration: underline; text-decoration-thickness: from-font; text-underline-offset: 2px; overflow-wrap: anywhere; transition: color 250ms cubic-bezier(.22,1,.36,1); } body .elementor [data-link="accent"] a:hover { color: #025d03; }
body .elementor [data-req] span { color: #e4051f; } /* the " *" run inside a required field's label */
/* SIAW trailer (SiawVideo.tsx). */
[data-ffe-video] video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
[data-ffe-video] button { position: absolute; right: 16px; bottom: 16px; width: 44px; height: 44px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 50%;
  background: rgb(0 0 0 / .4); color: #fff; backdrop-filter: blur(4px); cursor: pointer; transition: background-color 250ms cubic-bezier(.22,1,.36,1); }
[data-ffe-video] button:hover { background: rgb(0 0 0 / .6); }
[data-ffe-video] button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { [data-ffe-video] button { display: none; } }`.split("\n");

// Cloudflare Turnstile site key (public, as in src/components/FormSend.tsx); the secret is FFE_TURNSTILE_SECRET in wp-config.php.
const TURNSTILE_SITE_KEY = "0x4AAAAAAFgvz0fD6-Qi3FgK";

// Country -> ISO code (src/components/dialCodes.ts), so the phone input can show /flags/<iso>.svg.
const DIAL_ISO = Object.fromEntries([...fs.readFileSync(path.join(__dirname, "../../src/components/dialCodes.ts"), "utf8").matchAll(/\["([^"]+)", "[^"]+", "([a-z]{2})"\]/g)].map(([, c, i]) => [c, i]));

// Custom Code snippet "FFE motion" (Elementor Pro): reveal on scroll + count-up. Reduced motion: nothing hides, numbers stay final.
const MOTION = `<script id="ffe-motion">
/* RevealObserver.tsx + CountUp.tsx + SiawVideo.tsx + the atomic forms' behaviours. */
document.documentElement.classList.add('ffe-js');
/* SiawVideo: a muted looping <video> in [data-ffe-video], playing while 25% in view. Reduced motion: controls instead, no autoplay. */
function ffeVideo() {
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-ffe-video]').forEach(function (box) {
    var v = document.createElement('video');
    v.muted = v.defaultMuted = v.loop = v.playsInline = true; v.preload = 'none';
    v.poster = box.dataset.poster || ''; v.src = box.dataset.ffeVideo;
    v.setAttribute('aria-label', box.getAttribute('aria-label') || ''); box.removeAttribute('aria-label');
    box.appendChild(v);
    if (rm) { v.controls = true; return; }
    var b = document.createElement('button'); b.type = 'button';
    var icon = function () {
      b.setAttribute('aria-label', v.muted ? 'Unmute trailer' : 'Mute trailer');
      b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor"/>' + (v.muted ? '<path d="m22 9-6 6m0-6 6 6"/>' : '<path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>') + '</svg>';
    };
    b.onclick = function () { v.muted = !v.muted; icon(); };
    icon(); box.appendChild(b);
    new IntersectionObserver(function (e) { if (e[0].isIntersecting) v.play().catch(function () {}); else v.pause(); }, { threshold: 0.25 }).observe(v);
  });
}
/* Atomic forms (globals.css .input etc. + FormSend / PhoneInput / CountrySelect / VisitorForm behaviours). */
function ffeForms() {
  /* Cloudflare Turnstile (FormSend.tsx Turnstile): rendered into each form's [data-ffe-turnstile] slot, script loaded only on pages with a form.
     Elementor posts only the form's own fields, so the token is added to its request here; ffe-forms.php checks it and refuses a post without one. */
  var slots = document.querySelectorAll('form[data-element_type="e-form"] [data-ffe-turnstile]');
  if (slots.length) {
    window.ffeTurnstile = function () { slots.forEach(function (el) { el.dataset.wid = turnstile.render(el, { sitekey: '${TURNSTILE_SITE_KEY}' }); }); };
    var ts = document.createElement('script');
    ts.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=ffeTurnstile'; ts.async = true;
    document.head.appendChild(ts);
    var send = window.fetch;
    window.fetch = function (input, init) {
      var body = init && init.body, slot = null;
      if (body instanceof FormData && body.get('action') === 'elementor_pro_atomic_forms_send_form') {
        var form = document.querySelector('form[data-id="' + CSS.escape(String(body.get('form_id'))) + '"]');
        slot = form && form.querySelector('[data-ffe-turnstile]');
        if (slot && slot.dataset.wid && window.turnstile) body.set('cf-turnstile-response', turnstile.getResponse(slot.dataset.wid) || '');
      }
      var p = send.apply(window, arguments);
      /* A token is single-use: get a fresh one for the next try, whatever happened. */
      if (slot && slot.dataset.wid) { var reset = function () { turnstile.reset(slot.dataset.wid); }; p.then(reset, reset); }
      return p;
    };
  }
  /* select[data-ph]: option 1 is the placeholder, not a choice. "-" options are separators. */
  document.querySelectorAll('select[data-ph]').forEach(function (s) { var o = s.options[0]; o.value = ''; o.disabled = true; s.selectedIndex = 0; });
  document.querySelectorAll('select option[value="-"]').forEach(function (o) { o.disabled = true; });
  /* Real autofill hints: the widget only has an on/off switch. */
  document.querySelectorAll('[data-ac]').forEach(function (el) { el.setAttribute('autocomplete', el.dataset.ac); });
  /* Phone: the visible dial code and flag follow the hidden picker. The "-" separator becomes PhoneInput's two optgroups. */
  var ISO = ${JSON.stringify(DIAL_ISO)};
  document.querySelectorAll('[data-ffe-dial]').forEach(function (w) {
    var sel = w.querySelector('select'), code = w.querySelector('[data-dial-code]'), flag = w.querySelector('[data-dial-flag]');
    var cut = sel.querySelector('option[value="-"]');
    if (cut) {
      var v = sel.value, top = document.createElement('optgroup'), rest = document.createElement('optgroup');
      top.label = 'Asia Pacific'; rest.label = 'All countries';
      while (sel.firstChild !== cut) top.appendChild(sel.firstChild);
      sel.removeChild(cut);
      while (sel.firstChild) rest.appendChild(sel.firstChild);
      sel.append(top, rest);
      sel.value = v; /* moving the options drops the selection */
    }
    var sync = function () {
      var t = sel.options[sel.selectedIndex].text, m = t.match(/^(.*) \\(([^)]*)\\)\\s*$/);
      if (!m) return;
      if (code) code.textContent = m[2];
      if (flag && ISO[m[1]]) flag.style.backgroundImage = 'url(/flags/' + ISO[m[1]] + '.svg)';
    };
    sel.addEventListener('change', sync); sync();
  });
  /* Searchable country (CountrySelect.tsx): ARIA combobox, prefix matches first, only a listed value is valid. */
  document.querySelectorAll('[data-ffe-countries]').forEach(function (inp, n) {
    var all = inp.dataset.ffeCountries.split('|'), box = inp.parentNode, ul = document.createElement('ul'), shown = [], active = 0, open = false;
    ul.id = 'ffe-cs-' + n; ul.setAttribute('role', 'listbox'); ul.hidden = true; box.appendChild(ul); box.setAttribute('data-ffe-cs', '');
    inp.setAttribute('role', 'combobox'); inp.setAttribute('aria-controls', ul.id); inp.setAttribute('aria-autocomplete', 'list'); inp.setAttribute('aria-expanded', 'false');
    var check = function () { inp.setCustomValidity(!inp.value || all.indexOf(inp.value) > -1 ? '' : 'Please select a country from the list.'); };
    var render = function () {
      var q = inp.value.trim().toLowerCase(), hits = all.filter(function (c) { return c.toLowerCase().indexOf(q) > -1; });
      shown = hits.filter(function (c) { return c.toLowerCase().indexOf(q) === 0; }).concat(hits.filter(function (c) { return c.toLowerCase().indexOf(q) !== 0; }));
      ul.textContent = '';
      shown.forEach(function (c, i) {
        var li = document.createElement('li'); li.id = ul.id + '-' + i; li.setAttribute('role', 'option'); li.textContent = c;
        li.setAttribute('aria-selected', c === inp.value);
        /* mousedown, not click: fires before the input's blur closes the list. */
        li.addEventListener('mousedown', function (e) { e.preventDefault(); pick(c); });
        li.addEventListener('mouseenter', function () { mark(i); });
        ul.appendChild(li);
      });
      if (!shown.length) { var no = document.createElement('li'); no.className = 'ffe-cs-none'; no.textContent = 'No matching country'; ul.appendChild(no); }
      mark(0);
    };
    var mark = function (i) {
      active = i;
      [].forEach.call(ul.children, function (li, k) { li.classList.toggle('is-active', k === i); });
      var li = ul.children[i];
      if (li && shown.length) { inp.setAttribute('aria-activedescendant', li.id); if (open) li.scrollIntoView({ block: 'nearest' }); } else inp.removeAttribute('aria-activedescendant');
    };
    var show = function (v) {
      open = v; ul.hidden = !v; inp.setAttribute('aria-expanded', v); box.toggleAttribute('data-open', v);
      if (v) { render(); mark(Math.max(0, shown.indexOf(inp.value))); }
    };
    var pick = function (c) { inp.value = c; check(); inp.dispatchEvent(new Event('change', { bubbles: true })); show(false); };
    inp.addEventListener('input', function () { check(); show(true); });
    inp.addEventListener('focus', function () { show(true); });
    inp.addEventListener('click', function () { show(true); });
    inp.addEventListener('blur', function () {
      show(false);
      /* Typed rather than picked ("india", or the only match left): take the listed spelling. */
      var q = inp.value.trim().toLowerCase(), hits = all.filter(function (c) { return c.toLowerCase().indexOf(q) > -1; });
      var exact = all.filter(function (c) { return c.toLowerCase() === q; })[0];
      if (exact || (q && hits.length === 1)) { inp.value = exact || hits[0]; check(); }
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!open) return show(true);
        mark(shown.length ? (active + (e.key === 'ArrowDown' ? 1 : shown.length - 1)) % shown.length : 0);
      } else if (e.key === 'Enter' && open && shown[active]) { e.preventDefault(); pick(shown[active]); }
      else if (e.key === 'Escape') show(false);
    });
    check();
  });
  /* Tick at least one box in the group (or Other). */
  document.querySelectorAll('[data-require-one]').forEach(function (g) {
    var boxes = g.querySelectorAll('input[type=checkbox]');
    var sync = function () { var any = [].some.call(boxes, function (b) { return b.checked; }); boxes.forEach(function (b) { b.required = !any; }); };
    g.addEventListener('change', sync); sync();
  });
  /* "Other" box: reveals and requires its text field. */
  document.querySelectorAll('input[data-other]').forEach(function (cb) {
    var t = cb.form && cb.form.querySelector('[data-other-text]'); if (!t) return;
    var sync = function () { t.style.display = cb.checked ? '' : 'none'; t.required = cb.checked; if (!cb.checked) t.value = ''; };
    cb.addEventListener('change', sync); sync();
  });
}
document.addEventListener('DOMContentLoaded', function () {
  ffeVideo(); ffeForms();
  var io = 'IntersectionObserver' in window;
  var reveal = document.querySelectorAll('[data-reveal]');
  if (!io) { reveal.forEach(function (el) { el.classList.add('is-visible'); }); return; }
  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  reveal.forEach(function (el) { ro.observe(el); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var to = +el.dataset.count, dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || '', sep = el.dataset.sep !== undefined;
    var fmt = function (v) { return (sep ? Math.round(v).toLocaleString('en-US') : v.toFixed(dec)) + suf; };
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
update_post_meta($sid, '_elementor_code', wp_slash(base64_decode('${Buffer.from(MOTION).toString("base64")}'))); // wp_slash: update_post_meta unslashes, which would eat the regex backslashes
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
