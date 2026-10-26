<?php
/**
 * Plugin Name: FFE — share this article
 * Description: Fills every <div data-ffe-share> (the last block of pages/news-article/article.html, so duplicated article pages get it too) with a "Share this article" bar: native Share (only where navigator.share exists), copy link, LinkedIn, WhatsApp, email, Facebook, X, Telegram. Links are built at runtime from link[rel=canonical] and og:title. Plain links, no third-party scripts or cookies; sends the GA4 "share" event only if gtag exists (i.e. after consent). Mirrors src/components/news/ShareBar.tsx. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
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
</style>
<?php });

add_action('wp_footer', function () { ?>
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
	var track = function (m) { if (typeof window.gtag === 'function') window.gtag('event', 'share', { method: m, content_type: 'article', item_id: path }); };
	var btn = function (label, icon) { var b = document.createElement('button'); b.type = 'button'; b.className = 'ffe-share__btn'; b.setAttribute('aria-label', label); b.innerHTML = icon; return b; };

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
		c.addEventListener('click', function () {
			var ok = function () { say('Link copied'); track('copy_link'); };
			var old = function () {
				var t = document.createElement('textarea'); t.value = url; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
				document.body.appendChild(t); t.select(); t.setSelectionRange(0, url.length);
				var done = false; try { done = document.execCommand('copy'); } catch (e) {}
				document.body.removeChild(t); if (done) ok(); else say('Press Ctrl+C to copy: ' + url);
			};
			if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, old); else old();
		});
		row.appendChild(c);

		links.forEach(function (l) {
			var a = document.createElement('a');
			a.className = 'ffe-share__btn'; a.href = l[2]; a.setAttribute('aria-label', l[1]); a.innerHTML = l[3];
			if (l[0] !== 'email') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
			a.addEventListener('click', function () { track(l[0]); });
			row.appendChild(a);
		});
	});
})();
</script>
<?php }, 99);
