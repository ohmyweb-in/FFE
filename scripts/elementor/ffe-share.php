<?php
/**
 * Plugin Name: FFE — share this article
 * Description: Fills every <div data-ffe-share> (the last block of pages/news-article/article.html, so duplicated article pages get it too) with a "Share this article" bar: native Share (only where navigator.share exists), copy link, LinkedIn, WhatsApp, email, Facebook, X, Telegram, WeChat (a panel with a QR code of the article URL, drawn client-side by ffe-qr.js, loaded on first click). Links are built at runtime from link[rel=canonical] and og:title. Plain links, no third-party scripts or cookies; sends the GA4 "share" event only if gtag exists (i.e. after consent). Mirrors src/components/news/ShareBar.tsx. Deployed to wp-content/mu-plugins/ together with ffe-qr.js; this copy in scripts/elementor/ is the record.
 */

add_action('wp_head', function () { ?>
<style id="ffe-share">
/* body .elementor + .ffe-share[data-ffe-share] keep these above Elementor's widget rules and the article's `a:not(.na-pill)` link style. */
body .elementor .ffe-share[data-ffe-share] { margin-top: 44px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__title { margin: 0; font: 600 22px/28px Fredoka, system-ui, sans-serif; color: #025d03; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__row { display: flex; flex-wrap: wrap; gap: 10px; margin: 16px 0 0; padding: 0; }
body .elementor .ffe-share[data-ffe-share] :is(a, button).ffe-share__btn {
	display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; width: 44px; height: 44px; min-width: 44px; padding: 0; margin: 0;
	border: 1px solid #e2f0e4; border-radius: 999px; background: #e2f0e4; color: #025d03; text-decoration: none; cursor: pointer; box-shadow: none;
	transition: background-color 250ms cubic-bezier(.22,1,.36,1), color 250ms cubic-bezier(.22,1,.36,1);
}
body .elementor .ffe-share[data-ffe-share] :is(a, button).ffe-share__btn:hover { background: #28ae3d; border-color: #28ae3d; color: #fff; text-decoration: none; }
body .elementor .ffe-share[data-ffe-share] :is(a, button).ffe-share__btn:focus-visible { outline: 2px solid #025d03; outline-offset: 2px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__btn svg { display: block; width: 20px; height: 20px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__msg { margin: 10px 0 0; min-height: 22px; font-size: 15px; line-height: 22px; font-weight: 500; color: #025d03; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel { position: relative; box-sizing: border-box; max-width: 360px; margin: 14px 0 0; padding: 20px; background: #fff; border-radius: 20px; box-shadow: 0 12px 16px rgb(3 41 26 / .1); color: #032919; font-size: 16px; line-height: 24px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel[hidden] { display: none; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel .ffe-share__close { position: absolute; top: 8px; right: 8px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel p { margin: 12px 0 0; padding: 0; font-size: 16px; line-height: 24px; color: #032919; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel .ffe-share__lead { margin: 0 44px 0 0; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel .ffe-share__url { font-size: 13px; line-height: 18px; word-break: break-all; color: #4f4f4f; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__qr { display: flex; justify-content: center; margin: 12px 0 0; min-height: 24px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__qr svg { display: block; width: 168px; height: 168px; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel button.ffe-share__pill {
	display: inline-flex; align-items: center; box-sizing: border-box; height: 44px; margin: 12px 0 0; padding: 0 22px; border: 0; border-radius: 999px;
	background: #e2f0e4; color: #025d03; font: 600 16px/1 Fredoka, system-ui, sans-serif; cursor: pointer; box-shadow: none;
}
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel button.ffe-share__pill:hover { background: #28ae3d; color: #fff; }
body .elementor .ffe-share[data-ffe-share] .ffe-share__panel button.ffe-share__pill:focus-visible { outline: 2px solid #025d03; outline-offset: 2px; }
</style>
<?php });

add_action('wp_footer', function () {
	$qr = defined('WPMU_PLUGIN_DIR') && file_exists(WPMU_PLUGIN_DIR . '/ffe-qr.js') ? WPMU_PLUGIN_URL . '/ffe-qr.js?ver=' . filemtime(WPMU_PLUGIN_DIR . '/ffe-qr.js') : ''; ?>
<script id="ffe-share-js">
(function () {
	if (document.body.classList.contains('elementor-editor-active')) return;
	var roots = document.querySelectorAll('[data-ffe-share]');
	if (!roots.length) return;
	var meta = document.querySelector('meta[property="og:title"]');
	var canon = document.querySelector('link[rel="canonical"]');
	var title = (meta && meta.content) || document.title;
	var url = (canon && canon.href) || location.origin + location.pathname;
	var path = url.replace(/^https?:\/\/[^\/]+/, '');
	var U = encodeURIComponent(url), T = encodeURIComponent(title);
	var S = function (d, f) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' + (f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"') + '><path d="' + d + '"/></svg>'; };
	var links = [
		['linkedin', 'Share on LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url=' + U, S('M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2 3.77-2 4 0 4.77 2.6 4.77 6V21h-4v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z', 1)],
		['whatsapp', 'Share on WhatsApp', 'https://api.whatsapp.com/send?text=' + T + '%20' + U, S('M3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 8 19.3zM9.2 8.6c0 3.3 2.9 6.2 6.2 6.2l1.1-1.6-2.2-1-1 .9c-.9-.4-1.8-1.3-2.2-2.2l.9-1-1-2.2z')],
		['email', 'Share by email', 'mailto:?subject=' + T + '&body=' + T + '%0A%0A' + U, S('M3 6h18v12H3zM3 7l9 7 9-7')],
		['facebook', 'Share on Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + U, S('M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z', 1)],
		['x', 'Share on X', 'https://x.com/intent/tweet?url=' + U + '&text=' + T, S('M17.8 3h3l-6.6 7.5L22 21h-6.1l-4.8-6.3L5.6 21h-3l7-8L2.2 3h6.3l4.3 5.7zM16.7 19.2h1.7L7.4 4.7H5.6z', 1)],
		['telegram', 'Share on Telegram', 'https://t.me/share/url?url=' + U + '&text=' + T, S('M21.5 3.6 2.9 10.8c-.9.3-.9 1 0 1.3l4.7 1.5 1.8 5.6c.2.6.4.8.9.8s.7-.2 1-.5l2.4-2.3 4.7 3.5c.9.5 1.5.2 1.7-.8l3-14.5c.3-1.3-.5-1.9-1.6-1.4zM8.6 13.2l9.2-5.8c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2z', 1)]
	];
	var QR_URL = <?php echo wp_json_encode($qr); ?>;
	var track = function (m) { if (typeof window.gtag === 'function') window.gtag('event', 'share', { method: m, content_type: 'article', item_id: path }); };
	var btn = function (label, icon) { var b = document.createElement('button'); b.type = 'button'; b.className = 'ffe-share__btn'; b.setAttribute('aria-label', label); b.innerHTML = icon; return b; };

	var idx = 0, qrQ;
	var loadQR = function (cb) {
		if (window.ffeQR) return cb(true);
		if (!QR_URL) return cb(false);
		if (!qrQ) {
			qrQ = [];
			var s = document.createElement('script'); s.src = QR_URL;
			s.onload = function () { qrQ.forEach(function (f) { f(true); }); qrQ = null; };
			s.onerror = function () { qrQ.forEach(function (f) { f(false); }); qrQ = null; };
			document.head.appendChild(s);
		}
		qrQ.push(cb);
	};
	roots.forEach(function (root) {
		root.classList.add('ffe-share');
		root.innerHTML = '<h2 class="ffe-share__title">Share this article</h2><div class="ffe-share__row"></div><p class="ffe-share__msg" aria-live="polite"></p>';
		var row = root.querySelector('.ffe-share__row'), msg = root.querySelector('.ffe-share__msg'), timer;
		var say = function (t) { msg.textContent = t; clearTimeout(timer); timer = setTimeout(function () { msg.textContent = ''; }, 2000); };

		if (navigator.share) {
			var n = btn('Share this article', S('M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4'));
			n.addEventListener('click', function () {
				navigator.share({ title: title, url: url }).then(function () { track('native'); }, function (e) { if (e && e.name !== 'AbortError') say('Sharing failed'); });
			});
			row.appendChild(n);
		}

		var c = btn('Copy link', S('M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'));
		var doCopy = function () {
			var ok = function () { say('Link copied'); track('copy_link'); };
			var old = function () {
				var t = document.createElement('textarea'); t.value = url; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
				document.body.appendChild(t); t.select(); t.setSelectionRange(0, url.length);
				var done = false; try { done = document.execCommand('copy'); } catch (e) {}
				document.body.removeChild(t); if (done) ok(); else say('Press Ctrl+C to copy: ' + url);
			};
			if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, old); else old();
		};
		c.addEventListener('click', doCopy);
		row.appendChild(c);

		links.forEach(function (l) {
			var a = document.createElement('a');
			a.className = 'ffe-share__btn'; a.href = l[2]; a.setAttribute('aria-label', l[1]); a.innerHTML = l[3];
			if (l[0] !== 'email') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
			a.addEventListener('click', function () { track(l[0]); });
			row.appendChild(a);
		});
		// WeChat has no share URL: a panel with a QR code (desktop), or "tap ..." (inside WeChat), or copy link + QR (other phones).
		var wcPath = 'M9.8 3C5.9 3 2.8 5.6 2.8 8.8c0 1.8 1 3.4 2.6 4.4l-.7 2.3 2.6-1.4c.5.1 1 .2 1.6.2M9.8 3c3.7 0 6.8 2.6 6.8 5.8 0 .3 0 .6-.1.8M7 8.2h.01M12.2 8.2h.01M21.3 15c0-2.5-2.4-4.5-5.4-4.5s-5.4 2-5.4 4.5 2.4 4.5 5.4 4.5c.7 0 1.3-.1 1.9-.3l2 1.1-.6-2c1.3-.8 2.1-2 2.1-3.3zM14 14.4h.01M18 14.4h.01';
		var w = btn('Share on WeChat', S(wcPath)), pid = 'ffe-share-wechat-' + (++idx);
		w.setAttribute('aria-expanded', 'false'); w.setAttribute('aria-controls', pid);
		var panel = document.createElement('div');
		panel.id = pid; panel.className = 'ffe-share__panel'; panel.setAttribute('role', 'group'); panel.setAttribute('aria-label', 'WeChat sharing'); panel.hidden = true;
		var x = btn('Close', S('M6 6l12 12M18 6L6 18')); x.classList.add('ffe-share__close'); panel.appendChild(x);
		var built = false;
		var el = function (tag, cls, text) { var e = document.createElement(tag); e.className = cls; if (text) e.textContent = text; panel.appendChild(e); return e; };
		var build = function () {
			built = true;
			var inWeChat = /MicroMessenger/i.test(navigator.userAgent), touch = window.matchMedia && matchMedia('(pointer: coarse)').matches, qr;
			if (inWeChat) { el('p', 'ffe-share__lead', 'Tap \u2022\u2022\u2022 in the top-right corner to share this article.'); return; }
			if (touch) {
				el('p', 'ffe-share__lead', 'Copy the link and paste it into a WeChat chat.');
				var p = el('button', 'ffe-share__pill', 'Copy link'); p.type = 'button'; p.addEventListener('click', doCopy);
				el('p', '', 'Or scan from another device');
				qr = el('div', 'ffe-share__qr', 'Loading\u2026');
			} else {
				qr = el('div', 'ffe-share__qr', 'Loading\u2026');
				el('p', '', 'Scan with WeChat to open and share this article.');
			}
			el('p', 'ffe-share__url', url);
			loadQR(function (ok) { if (ok) qr.innerHTML = window.ffeQR(url); else qr.textContent = 'The QR code could not be loaded.'; });
		};
		var setOpen = function (o, back) {
			panel.hidden = !o; w.setAttribute('aria-expanded', o ? 'true' : 'false');
			if (o) { if (!built) build(); track('wechat'); x.focus({ preventScroll: true }); } else if (back) w.focus();
		};
		w.addEventListener('click', function () { setOpen(panel.hidden); });
		x.addEventListener('click', function () { setOpen(false, true); });
		root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { e.stopPropagation(); setOpen(false, true); } });
		document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && !w.contains(e.target)) setOpen(false); });
		row.appendChild(w);
		row.after(panel);
	});
})();
</script>
<?php }, 99);
