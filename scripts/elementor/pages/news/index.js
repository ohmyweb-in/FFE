module.exports = {
  slug: "news", parent: null, title: "News & Press", prefix: "nw",
  footer: [84, 48, 48],
  css: [
    "/* N1 MediaEnquiries bar sm:flex-row sm:items-center (640–767) */",
    '@media (min-width: 640px) and (max-width: 767px) { body .elementor [data-id="nw-media-bar"] { flex-direction: row; align-items: center; } }',
    "/* N2 MediaEnquiries mailto: text-accent underline underline-offset-2 [overflow-wrap:anywhere] hover:text-forest */",
    'body .elementor [data-id="nw-media-p"] a { color: #28ae3d; text-decoration: underline; text-underline-offset: 2px; overflow-wrap: anywhere; transition: color 250ms cubic-bezier(.22,1,.36,1); }',
    'body .elementor [data-id="nw-media-p"] a:hover { color: #025d03; }',
    "/* N3 StayUpdated sprig min-[1424px]:flex (1424–1439; D shows it locally) */",
    '@media (min-width: 1424px) and (max-width: 1439px) { body .elementor [data-id="nw-stay-sprig"] { display: flex; } }',
  ],
  sections: ["hero", "media-enquiries", "stay-updated"],
};
