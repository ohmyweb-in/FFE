<?php
/**
 * Plugin Name: FFE — launch popup
 * Description: LaunchPopup.tsx as a native <dialog> printed in wp_footer: opens 800ms after load, once per tab session (sessionStorage "popupShown"), not on /register-to-visit* or /apply-to-exhibit*, never in the Elementor editor or preview. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record. Images: media-g6.json, media.json (powered-*, chevron-sm-white) and media-g4.json (chevron-sm-accent).
 */

add_action('wp_footer', function () {
	if (is_admin() || is_customize_preview() || isset($_GET['elementor-preview'])) return;
	if (class_exists('\Elementor\Plugin') && (\Elementor\Plugin::$instance->editor->is_edit_mode() || \Elementor\Plugin::$instance->preview->is_preview_mode())) return;
	$u = content_url('uploads/2026/10/');
	?>
<style id="ffe-popup-css">
/* Tailwind's preflight, scoped: the reference styles every element from a reset, the theme's differ. */
#ffe-popup, #ffe-popup * { box-sizing: border-box; }
#ffe-popup :is(p, h2, ul, li) { margin: 0; padding: 0; list-style: none; text-box: trim-both cap alphabetic; }
#ffe-popup img { display: block; max-width: 100%; height: auto; vertical-align: middle; border: 0; }
#ffe-popup a { text-decoration: none; }

#ffe-popup {
	margin: auto; padding: 0; border: 0; width: calc(100% - 24px); max-width: 1299px; max-height: calc(100dvh - 24px);
	overflow-y: auto; border-radius: 20px; background: transparent; outline: none; color: #4f4f4f;
	font-family: Outfit, system-ui, sans-serif;
}
#ffe-popup::backdrop { background: rgb(40 174 61 / .2); }
html:has(#ffe-popup[open]) { overflow: hidden; }

/* Zero-height sticky row: the close button stays in view when the popup scrolls on short phones. */
#ffe-popup .pu-sticky { position: sticky; top: 0; z-index: 10; height: 0; }
#ffe-popup .pu-close {
	position: absolute; top: 10px; right: 10px; display: grid; place-items: center; width: 44px; height: 44px; padding: 0; border: 0;
	border-radius: 50%; background: #fff; box-shadow: 0 4px 14px rgb(0 0 0 / .15); cursor: pointer;
	transition: background-color .25s cubic-bezier(.22,1,.36,1), transform .25s cubic-bezier(.22,1,.36,1);
}
#ffe-popup .pu-close:hover { background: #e2f0e4; transform: scale(1.05); }
#ffe-popup .pu-close:focus-visible { outline: 2px solid #025d03; }
#ffe-popup .pu-close img { width: 16px; height: 16px; }

#ffe-popup .pu-body { display: grid; overflow: hidden; border-radius: 20px; background: #fff; }
#ffe-popup .pu-poster { position: relative; display: flex; align-items: center; background: #fff; }
#ffe-popup .pu-poster img { width: 100%; height: auto; }
#ffe-popup .pu-text { display: flex; flex-direction: column; padding: 16px; padding-top: 18px; }

#ffe-popup .pu-badge {
	display: inline-flex; align-self: flex-start; align-items: center; gap: 7px; height: 27px; padding: 0 14px 0 16px; border-radius: 999px;
	background: #e2f0e4; color: #025d03; font-size: 12px; font-weight: 600; text-transform: uppercase;
}
#ffe-popup .pu-badge span { width: 10px; height: 10px; border-radius: 50%; background: #28ae3d; animation: pu-pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
@keyframes pu-pulse { 50% { opacity: .5; } }

#ffe-popup h2 {
	max-width: 429px; margin-top: 14px; color: #025d03; font: 600 24px/30px Fredoka, system-ui, sans-serif;
}
#ffe-popup .pu-powered {
	display: flex; align-items: center; align-self: flex-start; gap: 4px; height: 46px; margin-top: 14px; padding: 0 10px; border-radius: 10px; background: #e2f0e4;
}
#ffe-popup .pu-powered p { margin-right: 6px; color: #025d03; font: 600 15px Fredoka, system-ui, sans-serif; text-transform: uppercase; }
#ffe-popup .pu-powered img { flex-shrink: 0; width: auto; height: 32px; }

#ffe-popup .pu-options { display: grid; gap: 8px; margin-top: 14px; }
#ffe-popup .pu-options li { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 16px; background: #edf6ee; }
#ffe-popup .pu-options p { color: #4f4f4f; font-size: 14px; font-weight: 600; text-transform: uppercase; }

/* ui.tsx Button: 39px pill, label then chevron; the same box on phones and up. */
#ffe-popup .pu-btn {
	position: relative; display: inline-flex; flex-shrink: 0; align-items: center; justify-content: flex-start; width: var(--w); height: 39px; padding: 0 0 0 var(--pl); gap: var(--gap);
	border: 1.5px solid #28ae3d; border-radius: 999px; font-size: 15px; font-weight: 500; line-height: 1.2; letter-spacing: .02em; text-align: left; white-space: nowrap;
	transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s cubic-bezier(.22,1,.36,1), background-color .25s cubic-bezier(.22,1,.36,1), color .25s cubic-bezier(.22,1,.36,1);
}
#ffe-popup .pu-btn::before { content: ""; position: absolute; inset: -2.5px 0; }
#ffe-popup .pu-btn.pu-fill, #ffe-popup .pu-btn.pu-fill:hover { background: #28ae3d; color: #fff; }
#ffe-popup .pu-btn.pu-line { background: #fff; color: #28ae3d; }
#ffe-popup .pu-btn.pu-line:hover { background: #e2f0e4; }
#ffe-popup .pu-btn:focus-visible { outline: 2px solid #025d03; outline-offset: 3px; }
#ffe-popup .pu-btn img { width: 6px; height: 11px; max-width: none; transition: transform .25s cubic-bezier(.22,1,.36,1); }
#ffe-popup .pu-btn:active { transform: translateY(0); transition-duration: 80ms; }
@media (hover: hover) {
	#ffe-popup .pu-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 24px -10px rgb(2 93 3 / .45); }
	#ffe-popup .pu-btn:hover img { transform: translateX(3px); }
}

#ffe-popup .pu-meta {
	display: none; flex-direction: column; gap: 12px; margin-top: 19px; padding-top: 32px; border-top: 1px solid #e5e5e5;
	color: #4f4f4f; font-size: 22px; font-weight: 500; line-height: 31px; letter-spacing: .02em;
}
#ffe-popup .pu-meta li { display: flex; align-items: center; gap: 11px; min-height: 23px; }
#ffe-popup .pu-meta li:first-child { height: 23px; }
#ffe-popup .pu-meta img { flex-shrink: 0; width: 23px; height: 23px; }

@media (min-width: 640px) {
	#ffe-popup .pu-text { padding: 20px; padding-top: 22px; }
	#ffe-popup h2 { margin-top: 22px; font-size: 26px; line-height: 32px; }
	#ffe-popup .pu-powered { gap: 5px; height: 58px; margin-top: 22px; padding: 0 29px 0 12px; }
	#ffe-popup .pu-powered p { width: 134px; margin-right: 12px; font-size: 20px; }
	#ffe-popup .pu-powered img { height: 40px; }
	#ffe-popup .pu-options { grid-template-columns: 240fr 224fr; gap: 14px; margin-top: 18px; }
	#ffe-popup .pu-options li { gap: 14px; padding: 20px 17px 17px; border-radius: 20px; }
}
@media (min-width: 768px) {
	#ffe-popup .pu-text { padding: 32px; }
	#ffe-popup h2 { margin-top: 29px; font-size: 34px; line-height: 42px; }
	#ffe-popup .pu-powered { margin-top: 29px; }
	#ffe-popup .pu-options { margin-top: 23px; }
	#ffe-popup .pu-meta { display: flex; }
}
/* Portrait phones/tablets: a capped column where the poster shrinks (min 140px) so the whole popup fits without scrolling. */
@media (max-width: 1023.98px) and (orientation: portrait) {
	#ffe-popup .pu-body { display: flex; flex-direction: column; max-height: calc(100dvh - 24px); overflow-y: auto; }
	#ffe-popup .pu-poster { display: contents; }
	#ffe-popup .pu-poster img { min-height: 140px; object-fit: contain; }
}
@media (min-width: 1024px) {
	#ffe-popup { border-radius: 30px; }
	#ffe-popup .pu-close { top: 17px; right: 16px; width: 56px; height: 56px; }
	#ffe-popup .pu-close img { width: 18px; height: 18px; }
	#ffe-popup .pu-body { grid-template-columns: minmax(0, 735fr) minmax(0, 564fr); border-radius: 30px; }
	#ffe-popup .pu-text { padding: 36px 32px 36px 28px; }
	#ffe-popup .pu-options { grid-template-columns: 1fr; }
	#ffe-popup .pu-meta { margin-top: auto; padding-top: 28px; }
}
@media (min-width: 1280px) {
	#ffe-popup .pu-poster img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 25% 50%; }
	#ffe-popup .pu-text { padding: 45px 55px 52px 31px; }
	#ffe-popup h2 { font-size: 40px; line-height: 49.2px; }
	#ffe-popup .pu-options { grid-template-columns: 240fr 224fr; }
	#ffe-popup .pu-meta { margin-top: 19px; padding-top: 32px; }
	#ffe-popup .pu-meta li:last-child { height: 23px; white-space: nowrap; }
}
@media (min-width: 1440px) { #ffe-popup .pu-poster img { object-position: center; } }

/* Phones held sideways: two columns, tighter text column, no date/venue list (the poster shows both). */
@media (orientation: landscape) and (max-height: 500px) {
	#ffe-popup .pu-body { grid-template-columns: 1fr 1fr; }
	#ffe-popup .pu-text { padding: 20px !important; }
	#ffe-popup h2 { margin-top: 16px !important; font-size: 22px !important; line-height: 28px !important; }
	#ffe-popup .pu-powered { margin-top: 16px !important; }
	#ffe-popup .pu-options { grid-template-columns: 1fr !important; margin-top: 14px !important; }
	#ffe-popup .pu-options li { flex-direction: row !important; align-items: center !important; justify-content: space-between; padding-block: 12px !important; }
	#ffe-popup .pu-meta { display: none !important; }
}
</style>

<dialog id="ffe-popup" aria-labelledby="ffe-popup-title" tabindex="-1">
	<div class="pu-sticky">
		<button type="button" class="pu-close" aria-label="Close"><img src="<?php echo esc_url($u . 'ffe-g6-close.png'); ?>" alt="" width="54" height="54"></button>
	</div>
	<div class="pu-body">
		<div class="pu-poster"><img src="<?php echo esc_url($u . 'ffe-g6-poster.jpg'); ?>" alt="Fresh Food Expo APAC 2027 poster" width="1282" height="904"></div>
		<div class="pu-text">
			<p class="pu-badge"><span aria-hidden="true"></span>Registration is now open!</p>
			<h2 id="ffe-popup-title">Be Part of Asia Pacific’s Fresh Food Ecosystem!</h2>
			<div class="pu-powered">
				<p>Powered By:</p>
				<img src="<?php echo esc_url($u . 'ffe-powered-fl.png'); ?>" alt="Fruit Logistica" width="306" height="138">
				<img src="<?php echo esc_url($u . 'ffe-powered-gw.png'); ?>" alt="Grüne Woche" width="353" height="165">
			</div>
			<ul class="pu-options">
				<li>
					<p>Planning to visit?</p>
					<a class="pu-btn pu-fill" href="/register-to-visit/" style="--w:207px;--pl:21px;--gap:15px"><span style="text-box:trim-both cap alphabetic">Register Your Interest</span><img src="<?php echo esc_url($u . 'ffe-chevron-sm-white.svg'); ?>" alt="" width="6" height="11"></a>
				</li>
				<li>
					<p>Looking to exhibit?</p>
					<a class="pu-btn pu-line" href="/apply-to-exhibit/" style="--w:176px;--pl:27px;--gap:10px"><span style="text-box:trim-both cap alphabetic">Book Your Booth</span><img src="<?php echo esc_url($u . 'ffe-g4-chevron-sm-accent.svg'); ?>" alt="" width="6" height="11"></a>
				</li>
			</ul>
			<ul class="pu-meta">
				<li><img src="<?php echo esc_url($u . 'ffe-g6-calendar.png'); ?>" alt="" width="69" height="69">16-18 Nov. 2027</li>
				<li><img src="<?php echo esc_url($u . 'ffe-g6-pin.png'); ?>" alt="" width="69" height="69">Sands Expo &amp; Convention Centre, Singapore</li>
			</ul>
		</div>
	</div>
</dialog>
<script id="ffe-popup-js">
(function () {
	var d = document.getElementById('ffe-popup');
	// Pages that already are the call to action.
	if (!d || /^\/(register-to-visit|apply-to-exhibit)/.test(location.pathname)) return;
	// Storage can be blocked (private mode, site data off): then it falls back to every page load.
	try { if (sessionStorage.getItem('popupShown')) return; } catch (e) {}
	d.querySelector('.pu-close').onclick = function () { d.close(); };
	d.onclick = function (e) { if (e.target === d) d.close(); };
	// Something in Elementor's frontend preventDefaults Escape on window, which blocks the dialog's native close.
	d.onkeydown = function (e) { if (e.key === 'Escape') d.close(); };
	setTimeout(function () {
		d.showModal();
		try { sessionStorage.setItem('popupShown', '1'); } catch (e) {}
		// Focus the dialog itself so the first CTA doesn’t open with a focus ring; Tab still moves into it.
		d.focus();
	}, 800);
})();
</script>
<?php
}, 99);
