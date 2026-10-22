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

/* Below 1025px the menu opens as one white sheet inset to the page gutter (Header.tsx #mobile-menu),
   scrolling inside itself on short phones. Elementor positions the dropdown; the sheet is ours. */
@media (max-width: 1024px) {
	/* Elementor spans the dropdown wrapper across the viewport; the list inside it is the sheet. */
	.elementor-element-site-menu .e-n-menu-wrapper .e-n-menu-heading {
		margin-inline: max(16px, (100% - 1395px) / 2); background: #fff; border-radius: 24px; padding: 12px;
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
}
@media (max-width: 767px) {
	.elementor-element-site-menu .e-n-menu-wrapper .e-n-menu-heading { margin-inline: 26px; }
}
</style>
<?php });

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
})();
</script>
<?php });
