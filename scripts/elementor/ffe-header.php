<?php
/**
 * Plugin Name: FFE — sticky header
 * Description: Header.tsx behaviour the Elementor header can't express with controls: the green utility bar scrolls away, the bar below stays pinned, and it turns frosted (page colour at 90%, blur, soft shadow) once the page scrolls or a menu is open. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

add_action('wp_head', function () { ?>
<style id="ffe-header">
/* A sticky element only travels inside its parent, and Elementor wraps the header template in
   .elementor-location-header, which is only as tall as the header. So the wrapper is the sticky
   element, offset by the utility bar's height (49px, 44px below 1025px) so only that scrolls away. */
.elementor-location-header { position: sticky; top: -49px; z-index: 50; }
@media (max-width: 1024px) { .elementor-location-header { top: -44px; } }
.admin-bar .elementor-location-header { top: calc(32px - 49px); }
@media (max-width: 1024px) { .admin-bar .elementor-location-header { top: calc(32px - 44px); } }
@media (max-width: 782px) { .admin-bar .elementor-location-header { top: calc(46px - 44px); } }

.elementor-element-site-bar {
	transition: background-color .3s cubic-bezier(.22,1,.36,1), box-shadow .3s cubic-bezier(.22,1,.36,1), backdrop-filter .3s cubic-bezier(.22,1,.36,1);
}
[data-scrolled] .elementor-element-site-bar,
.elementor-element-site-bar:has([aria-expanded="true"]) {
	background-color: rgb(244 248 244 / .9);
	box-shadow: 0 6px 24px -12px rgb(2 93 3 / .25);
	-webkit-backdrop-filter: blur(12px);
	backdrop-filter: blur(12px);
}

/* Menu labels: sliding green underline on hover and on the current page's section (globals.css .nav-link). */
.elementor-element-site-menu .e-n-menu-title-text { position: relative; }
.elementor-element-site-menu .e-n-menu-title-text::after {
	content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 2px; border-radius: 2px;
	background: #28ae3d; transform: scaleX(0); transform-origin: left; transition: transform .25s cubic-bezier(.22,1,.36,1);
}
@media (hover: hover) { .elementor-element-site-menu .e-n-menu-title:hover .e-n-menu-title-text::after { transform: scaleX(1); } }
.elementor-element-site-menu .e-n-menu-title-container:focus-visible .e-n-menu-title-text::after,
.elementor-element-site-menu [aria-current] .e-n-menu-title-text::after { transform: scaleX(1); }
@media (max-width: 1024px) { .elementor-element-site-menu .e-n-menu-title-text::after { display: none; } }

/* Below 1025px the menu opens as one white sheet inset to the page gutter (32px, 26px on phones) (Header.tsx #mobile-menu),
   scrolling inside itself on short phones. Elementor positions the dropdown; the sheet is ours. */
@media (min-width: 1025px) { .elementor-element-site-menu .ffe-util { display: none; } }
@media (max-width: 1024px) {
	/* Elementor spans the dropdown wrapper across the viewport; the list inside it is the sheet. */
	.elementor-element-site-menu .e-n-menu-wrapper .e-n-menu-heading {
		margin-inline: 32px; background: #fff; border-radius: 24px; padding: 12px;
		box-shadow: 0 24px 48px -24px rgb(2 93 3 / .35);
		max-height: calc(100dvh - 128px - 16px); overflow-y: auto; overscroll-behavior: contain;
	}
	/* Rows and their panels fill the sheet, not the viewport-wide width Elementor gives the dropdown. */
	.elementor-element-site-menu .e-n-menu-heading > .e-n-menu-item,
	.elementor-element-site-menu .e-n-menu-heading .e-n-menu-content { width: 100% !important; }
	.elementor-element-site-menu .e-n-menu-title { min-height: 48px; border-radius: 16px; background: transparent; justify-content: space-between; }
	.elementor-element-site-menu .e-n-menu-title-container { flex: 1; justify-content: flex-start; }
	.elementor-element-site-menu .e-n-menu-title:hover { background: #e2f0e4; }
	.elementor-element-site-menu .e-n-menu-title:has([aria-expanded="true"]) .e-n-menu-title-text { color: #025d03; }
	.elementor-element-site-menu .e-n-menu-content > .e-con { background: transparent; }
	.elementor-element-site-menu .e-n-menu-content a[aria-current] span { color: #025d03; font-weight: 600; }
	/* The desktop card's drop shadow stayed on the flattened panel: a green gradient bar under the last link. */
	.elementor-element-site-menu .e-n-menu-content [data-id$="-card"] { box-shadow: none; }
	/* Newsletter / Press, which the utility bar hides below 1025px (script below adds them). */
	.elementor-element-site-menu .ffe-util { display: block; width: 100%; }
	.elementor-element-site-menu .ffe-util a { display: flex; align-items: center; min-height: 48px; padding: 0 16px; border-radius: 16px; font: 500 16px Outfit, sans-serif; color: #4f4f4f; text-decoration: none; }
	.elementor-element-site-menu .ffe-util a:hover { background: #e2f0e4; }
	.elementor-element-site-menu .ffe-util-first { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgb(0 0 0 / .1); }
}
@media (max-width: 767px) {
	.elementor-element-site-menu .e-n-menu-wrapper .e-n-menu-heading { margin-inline: 26px; }
}
/* The utility bar's flex row squeezed the 18px search icon to 14px wide. */
.s-util-search { flex-shrink: 0; object-fit: contain; }
</style>
<?php });

// Hello's "Skip to content" link targets #content, which Elementor pages don't have: wrap the page in <main id="content">
// (also gives screen readers the main landmark). Elementor renders the page through the_content at priority 9.
add_filter('the_content', function ($c) {
  return is_singular() && in_the_loop() && is_main_query() ? '<main id="content">' . $c . '</main>' : $c;
}, 99);

add_action('wp_footer', function () { ?>
<script id="ffe-header-js">
(function () {
	var root = document.documentElement;
	var onScroll = function () { root.toggleAttribute('data-scrolled', window.scrollY > 8); };
	onScroll();
	addEventListener('scroll', onScroll, { passive: true });

	// Mark the menu section that links to this page, as Header.tsx does with aria-current.
	var here = location.pathname.replace(/(.)\/$/, '$1');
	document.querySelectorAll('.elementor-element-site-menu .e-n-menu-item').forEach(function (item) {
		var links = item.querySelectorAll('.e-n-menu-content a[href]');
		for (var i = 0; i < links.length; i++) {
			if (new URL(links[i].href).pathname.replace(/(.)\/$/, '$1') === here) {
				item.querySelector('.e-n-menu-title-container').setAttribute('aria-current', 'page');
				links.forEach(function (a) { if (new URL(a.href).pathname.replace(/(.)\/$/, '$1') === here) a.setAttribute('aria-current', 'page'); });
				break;
			}
		}
	});

	// Not in the Elementor editor's preview: the click interceptor would block selecting the menu there.
	if (document.body.classList.contains('elementor-editor-active')) return;
	var mq = function (q) { return matchMedia(q).matches; };
	var sheet = function () { return mq('(max-width: 1024px)'); };
	var btn = function (el) { return el.querySelector('.e-n-menu-dropdown-icon'); };
	var menu = '.elementor-element-site-menu ';

	// Newsletter / Press join the sheet (Header.tsx #mobile-menu); the utility bar hides them below 1025px.
	var list = document.querySelector(menu + '.e-n-menu-heading');
	if (list) [['Newsletter', '/subscribe'], ['Press', '/news']].forEach(function (l, i) {
		var li = document.createElement('li');
		li.className = 'ffe-util' + (i ? '' : ' ffe-util-first');
		li.innerHTML = '<a href="' + l[1] + '">' + l[0] + '</a>';
		list.appendChild(li);
	});

	// Sheet (and a touch tap at 1025-1279, Elementor's tablet_extra, iPad landscape): the whole label row toggles its
	// section, as Header.tsx's <summary> does, instead of navigating; the section's own page is its first link inside.
	// Elementor's chevron button does the toggling, so open/close state and aria stay its own.
	document.addEventListener('click', function (e) {
		var a = e.target.closest(menu + '.e-n-menu-title-container');
		// detail 0 = keyboard Enter: let the label link navigate, as a keyboard user expects.
		if (!a || e.detail === 0 || !(sheet() || mq('(min-width: 1025px) and (max-width: 1279.98px) and (hover: none)'))) return;
		var b = btn(a.parentNode);
		if (!b) return;
		e.preventDefault(); e.stopPropagation();
		b.click();
	}, true);

	// Elementor's mega menu picks hover or click once, from the device mode when the page loads, and counts
	// 1025-1279 (tablet_extra) as touch, so panels never opened on hover there. Drive the same chevron on hover.
	// Only when the page loaded in that range: loaded wider, Elementor's own hover handler is live and would toggle it back.
	var mid = function () { return mq('(min-width: 1025px) and (max-width: 1279.98px)'); };
	if (mid()) document.querySelectorAll(menu + '.e-n-menu-item').forEach(function (item) {
		var t, b = btn(item);
		if (!b) return;
		item.addEventListener('pointerenter', function (e) {
			if (e.pointerType !== 'mouse' || !mid()) return;
			clearTimeout(t);
			if (b.getAttribute('aria-expanded') !== 'true') b.click();
		});
		item.addEventListener('pointerleave', function (e) {
			if (e.pointerType !== 'mouse' || !mid()) return;
			t = setTimeout(function () { if (b.getAttribute('aria-expanded') === 'true') b.click(); }, 250);
		});
	});

	// Opening the sheet leaves the current page's section open, like Header.tsx's <details open>.
	document.addEventListener('click', function (e) {
		var t = e.target.closest(menu + '.e-n-menu-toggle');
		if (!t) return;
		setTimeout(function () {
			if (!sheet() || t.getAttribute('aria-expanded') !== 'true' || document.querySelector(menu + '.e-n-menu-dropdown-icon[aria-expanded="true"]')) return;
			var cur = document.querySelector(menu + '.e-n-menu-title-container[aria-current]');
			if (cur) btn(cur.parentNode).click();
		}, 0);
	});
})();
</script>
<?php });

/* ── CTA labels never wrap (Safari/Firefox set Outfit wider than Chrome; the date line gives way instead) ─ */
add_action('wp_head', function () { ?>
<style id="ffe-header-cta">
.elementor-element-site-menu [data-id$="-cta"] { white-space: nowrap; flex-shrink: 0; }
.elementor-element-site-menu [data-id$="-date"] { min-width: 0; }
/* Just above the 1024px menu breakpoint the nav no longer fits one row (it wrapped NEWS & MEDIA): tighten the gaps and the pill. */
/* Below 360px the logo, the 166px pill and the 47px menu button no longer fit: the pill reads "Register" and shrinks to it. */
@media (max-width: 359.98px) {
	body .elementor [data-id="header-cta-label"] { display: none; }
	body .elementor [data-id="header-cta-label-short"] { display: inline; }
	body .elementor [data-id="header-cta"] { width: auto; padding-right: 13px; }
}
@media (min-width: 1025px) and (max-width: 1075px) {
	body .elementor [data-id="site-bar-inner"] { gap: 20px; }
	body .elementor [data-id="site-nav"] { gap: 14px; }
	body .elementor [data-id="header-cta"] { width: 222px; }
}
</style>
<?php });

/* ── Favicons: the Next.js build's src/app/{favicon.ico,icon.svg,apple-icon.png}, files in the docroot ─ */
add_action('wp_head', 'ffe_icons', 1);
add_action('login_head', 'ffe_icons', 1);
add_action('admin_head', 'ffe_icons', 1);
function ffe_icons() {
	echo '<link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon">' . "\n"
		. '<link rel="icon" href="/icon.svg" sizes="any" type="image/svg+xml">' . "\n"
		. '<link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" type="image/png">' . "\n";
}

/* ── Every link to another host opens in a new tab ─ */
function ffe_is_front() {
	if (is_admin() || wp_doing_ajax() || wp_is_json_request() || is_feed() || is_customize_preview()) return false;
	if (isset($_GET['elementor-preview']) || isset($_GET['preview'])) return false;
	if (class_exists('\Elementor\Plugin') && (\Elementor\Plugin::$instance->preview->is_preview_mode() || \Elementor\Plugin::$instance->editor->is_edit_mode())) return false;
	return true;
}
add_action('template_redirect', function () {
	if (!ffe_is_front()) return;
	ob_start(function ($html) {
		if (stripos($html, '</html>') === false) return $html;
		$host = wp_parse_url(home_url(), PHP_URL_HOST);
		$p = new WP_HTML_Tag_Processor($html);
		while ($p->next_tag('a')) {
			$href = (string) $p->get_attribute('href');
			if (!preg_match('#^(https?:)?//#i', $href)) continue;
			$h = wp_parse_url(strpos($href, '//') === 0 ? 'https:' . $href : $href, PHP_URL_HOST);
			if (!$h || strcasecmp($h, $host) === 0) continue;
			$p->set_attribute('target', '_blank');
			$rel = array_unique(array_merge(preg_split('/\s+/', trim((string) $p->get_attribute('rel')), -1, PREG_SPLIT_NO_EMPTY), ['noopener', 'noreferrer']));
			$p->set_attribute('rel', implode(' ', $rel));
		}
		return $p->get_updated_html();
	});
}, 0);

/* ── Search: the header magnifier opens an overlay that submits to /?s= ─ */
add_action('wp_footer', function () {
	if (!ffe_is_front()) return; ?>
<div id="ffe-search" hidden>
	<form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" aria-label="Site search">
		<label for="ffe-search-input">Search Fresh Food Expo APAC</label>
		<div class="ffe-search-row">
			<input id="ffe-search-input" type="search" name="s" placeholder="Search" autocomplete="off" required>
			<button type="submit">Search</button>
			<button type="button" class="ffe-search-x" aria-label="Close search">&times;</button>
		</div>
	</form>
</div>
<style id="ffe-search-css">
#ffe-search { position: fixed; inset: 0; z-index: 100000; background: rgb(3 41 25 / .45); display: flex; align-items: flex-start; justify-content: center; padding: 0 16px; }
#ffe-search[hidden] { display: none; }
#ffe-search form { width: 100%; max-width: 760px; margin-top: 96px; padding: 24px; background: #fff; border-radius: 24px; box-shadow: 0 24px 48px -24px rgb(2 93 3 / .45); }
#ffe-search label { display: block; margin-bottom: 12px; font: 600 14px/1.2 Fredoka, sans-serif; letter-spacing: .08em; text-transform: uppercase; color: #025d03; }
.ffe-search-row { display: flex; gap: 8px; align-items: center; }
.ffe-search-row input { flex: 1; min-width: 0; height: 52px; padding: 0 22px; border: 2px solid #e2f0e4; border-radius: 999px; background: #f4f8f4; font: 400 17px Outfit, sans-serif; color: rgb(0 0 0 / .78); }
.ffe-search-row input:focus { outline: none; border-color: #2ca62f; background: #fff; }
.ffe-search-row button { height: 52px; padding: 0 26px; border: 0; border-radius: 999px; background: #2ca62f; color: #fff; font: 500 16px Outfit, sans-serif; letter-spacing: .02em; cursor: pointer; transition: transform .25s, box-shadow .25s; }
.ffe-search-row button:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -10px rgb(2 93 3 / .45); }
.ffe-search-row .ffe-search-x { width: 52px; padding: 0; background: #e2f0e4; color: #032919; font-size: 26px; line-height: 1; }
.ffe-search-row button:focus-visible { outline: 2px solid #032919; outline-offset: 2px; }
@media (max-width: 359.98px) { .ffe-search-row { flex-wrap: wrap; } .ffe-search-row input { flex-basis: 100%; } .ffe-search-row button[type=submit] { flex: 1; } }
@media (max-width: 767px) { #ffe-search form { margin-top: 24px; padding: 18px; } .ffe-search-row input { padding: 0 16px; } .ffe-search-row button { height: 48px; } .ffe-search-row input { height: 48px; } .ffe-search-row button[type=submit] { padding: 0 16px; } .ffe-search-row .ffe-search-x { width: 48px; } }
</style>
<script id="ffe-search-js">
(function () {
	var box = document.getElementById('ffe-search'), input = document.getElementById('ffe-search-input'), opener;
	function close() { box.hidden = true; document.documentElement.style.overflow = ''; if (opener) opener.focus(); }
	document.addEventListener('click', function (e) {
		var t = e.target.closest('[data-id="util-search"]');
		if (t) { e.preventDefault(); opener = t.closest('a') || t; box.hidden = false; document.documentElement.style.overflow = 'hidden'; input.focus(); return; }
		if (e.target === box || e.target.closest('.ffe-search-x')) close();
	});
	document.addEventListener('keydown', function (e) {
		if (box.hidden) return;
		if (e.key === 'Escape') close();
		if (e.key === 'Tab') { // keep focus inside the dialog
			var f = box.querySelectorAll('input,button'), a = f[0], z = f[f.length - 1];
			if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
			else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
		}
	});
	var l = (document.querySelector('[data-id="util-search"]') || {}).parentElement;
	if (l && l.tagName === 'A') { l.setAttribute('aria-label', 'Search'); l.setAttribute('aria-haspopup', 'dialog'); }
})();
</script>
<?php });

/* Page text lives in _elementor_data, so post_content is empty and WP search finds nothing. Keep post_content
   as the rendered plain text of every published page (re-synced when the Elementor data changes). */
function ffe_search_sync() {
	if (!class_exists('\Elementor\Plugin')) return;
	foreach (get_posts(['post_type' => 'page', 'post_status' => 'publish', 'numberposts' => -1, 'fields' => 'ids']) as $id) {
		$raw = get_post_meta($id, '_elementor_data', true);
		if (!$raw) continue;
		$hash = md5(is_string($raw) ? $raw : wp_json_encode($raw));
		if (get_post_meta($id, '_ffe_search_hash', true) === $hash) continue;
		$html = \Elementor\Plugin::$instance->frontend->get_builder_content($id);
		$html = preg_replace('#<(script|style)\b.*?</\1>#is', ' ', $html);
		$text = trim(preg_replace('/\s+/', ' ', html_entity_decode(wp_strip_all_tags(preg_replace('#</?(p|div|h[1-6]|li|br|section|span)\b[^>]*>#i', ' ', $html)), ENT_QUOTES, 'UTF-8')));
		global $wpdb;
		$wpdb->update($wpdb->posts, ['post_content' => $text], ['ID' => $id]);
		clean_post_cache($id);
		update_post_meta($id, '_ffe_search_hash', $hash);
	}
}
add_action('pre_get_posts', function ($q) {
	if (is_admin() || !$q->is_main_query() || !$q->is_search()) return;
	$q->set('post_type', 'page'); // templates, snippets and posts never show
	$q->set('post_status', 'publish');
	ffe_search_sync();
});

/* Results page inside the site header and footer. */
add_filter('template_include', function ($t) {
	return is_search() ? WPMU_PLUGIN_DIR . '/ffe/search-results.php' : $t;
});
add_action('wp_head', function () {
	if (!is_search()) return; ?>
<style id="ffe-search-page">
.ffe-results { max-width: 860px; margin: 0 auto; padding: 72px 32px 112px; font-family: Outfit, sans-serif; color: #4f4f4f; }
.ffe-results h1 { margin: 0 0 12px; font: 600 clamp(32px, 5vw, 48px)/1.1 Fredoka, sans-serif; color: #025d03; text-transform: uppercase; }
.ffe-results .ffe-count { margin: 0 0 40px; font-size: 17px; }
.ffe-results ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
.ffe-results li a { display: block; min-width: 0; overflow-wrap: anywhere; padding: 22px 26px; background: #fff; border: 1px solid rgb(2 93 3 / .08); border-radius: 20px; text-decoration: none; transition: transform .25s, box-shadow .25s; }
.ffe-results li a:hover, .ffe-results li a:focus-visible { transform: translateY(-2px); box-shadow: 0 16px 32px -20px rgb(2 93 3 / .45); }
.ffe-results h2 { margin: 0 0 6px; font: 500 22px/1.3 Fredoka, sans-serif; color: rgb(0 0 0 / .78); }
.ffe-results li a:hover h2 { color: #025d03; }
.ffe-results p { margin: 0; font-size: 15px; line-height: 1.6; color: #4f4f4f; }
.ffe-results mark { background: #e2f0e4; color: #025d03; border-radius: 4px; padding: 0 2px; }
.ffe-results .ffe-empty { padding: 40px; background: #fff; border-radius: 24px; text-align: center; }
.ffe-results .ffe-empty a { color: #025d03; font-weight: 600; }
/* the_posts_pagination(): "1 2 Next" as pills with 44px targets */
.ffe-results .nav-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 40px; }
.ffe-results .page-numbers { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding: 0 18px; border: 1px solid rgb(2 93 3 / .15); border-radius: 999px; background: #fff; color: #025d03; font: 500 16px Outfit, sans-serif; text-decoration: none; transition: background-color .25s, transform .25s; }
.ffe-results a.page-numbers:hover, .ffe-results a.page-numbers:focus-visible { background: #e2f0e4; transform: translateY(-1px); }
.ffe-results .page-numbers.current { border-color: #025d03; background: #025d03; color: #fff; }
.ffe-results .page-numbers.dots { border-color: transparent; background: transparent; }
@media (max-width: 767px) { .ffe-results { padding: 40px 20px 72px; } }
</style>
<?php });
