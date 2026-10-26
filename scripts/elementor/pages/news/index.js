module.exports = {
  slug: "news", parent: null, title: "News & Press", prefix: "nw",
  footer: [84, 48, 48],
  css: [
    ...require("./media-enquiries.js").MEDIA_CSS("nw"),
    "/* NewsList lead card meta: date + mint category pill */",
    'body .elementor :is([data-id="nw-card-meta"]) span { margin-left: 12px; padding: 5px 12px; border-radius: 999px; background: #e2f0e4; color: #025d03; font-size: 11px; line-height: 14px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }',
    "/* N3 StayUpdated sprig min-[1424px]:flex (1424–1439; D shows it locally) */",
    '@media (min-width: 1424px) and (max-width: 1439px) { body .elementor [data-id="nw-stay-sprig"] { display: flex; } }',
  ],
  sections: ["hero", "media-enquiries", "news-list", "stay-updated"],
};
