module.exports = {
  slug: "news", parent: null, title: "News & Press", prefix: "nw",
  footer: [84, 48, 48],
  css: [
    ...require("./media-enquiries.js").MEDIA_CSS("nw"),
    "/* N3 StayUpdated sprig min-[1424px]:flex (1424–1439; D shows it locally) */",
    '@media (min-width: 1424px) and (max-width: 1439px) { body .elementor [data-id="nw-stay-sprig"] { display: flex; } }',
  ],
  sections: ["hero", "media-enquiries", "stay-updated"],
};
