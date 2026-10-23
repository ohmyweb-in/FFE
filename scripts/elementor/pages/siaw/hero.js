const { pageHero, pill, btn, T, SIAW_SITE, pct, pad, px } = require("../../lib.js");
// <Button … className="… max-md:hidden">: btn() always has a mobile variant; hide it there (same move as home/siaw.js).
const hidePhones = (node) => { node.styles["s-" + node.id].variants.find((v) => v.meta.breakpoint === "mobile").props.display = "none"; return node; };

module.exports = [pageHero("si", {
  size: "siaw",
  eyebrow: "Part of SIAW",
  title: "Singapore International <br>Agri-Food Week 2027.",
  titleBr: "md",
  desc: "Fresh Food Expo Asia Pacific (FFE&nbsp;APAC) is part of Singapore International Agri-Food Week (SIAW) 2027, Singapore’s premier agri-food convention bringing together government, industry, innovation and business for a more sustainable, resilient and connected agri-food system across Asia.",
  img: "ph-siaw",
  imgBox: { top: 0, left: 34.19, w: 65.81, h: 100 },
  cta: [
    // Phones only: <Pill className="bg-white text-accent md:hidden max-md:w-full max-md:px-[20px] max-md:py-[13px] …">
    pill("si-ph-pill", "Discover Singapore International Agri‑Food Week", SIAW_SITE, {
      color: T.accent, bg: T.white,
      styles: [{ display: "none" }, { mobile: { display: "flex", width: pct(100), padding: pad(13, 20), "line-height": px(22) } }],
    }),
    // md+: <Button w={497} h={52} pl={33} gap={9} chevron=chevron-accent className="bg-white text-accent max-md:hidden">
    hidePhones(btn("si-ph-btn", "Discover Singapore International Agri-Food Week", SIAW_SITE, {
      w: 497, h: 52, pl: 33, gap: 9, chev: "chevron-accent", color: T.accent, bg: T.white,
    })),
  ],
})];
