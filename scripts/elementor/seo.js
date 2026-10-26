// On-page SEO (Rank Math free; modules sitemap, rich-snippet, redirections): site-wide settings and each page's title +
// meta description. Titles ≤ 60 chars and descriptions ≤ 160 so Google shows them whole; wording from the pages' own copy,
// with the terms the 26 Oct 2026 DataForSEO research found people search for (trade fair, Singapore, agri-food, cold chain, SIAW).
// The Event structured data is in ffe-seo.php. Run: node seo.js [--dry]
const { php, media } = require("./lib.js");

const M = media();
const PAGES = {
  home: ["Fresh Food Expo Asia Pacific 2027 | Trade Fair in Singapore",
    "B2B trade fair for fresh food, agri-food technology, cold chain logistics and distribution. 16–18 Nov 2027, Sands Expo & Convention Centre, Singapore."],
  about: ["About FFE APAC | Asia Pacific's Fresh Food Trade Fair",
    "Fresh Food Expo APAC is a B2B trade fair connecting the fresh food value chain from source to market. 16–18 Nov 2027, Sands Expo, Singapore."],
  "our-story": ["Our Story | Fresh Food Expo Asia Pacific (FFE APAC)",
    "Why Fresh Food Expo APAC exists: a dedicated regional platform where fresh food, technology, logistics, distribution and markets come together."],
  ecosystem: ["Fresh Food, Agri-Tech & Cold Chain Ecosystem | FFE APAC",
    "Fresh food meets agri-food technology, cold chain logistics and distribution at Fresh Food Expo APAC, 16–18 Nov 2027 in Singapore."],
  siaw: ["Part of SIAW 2027 | Fresh Food Expo Asia Pacific",
    "Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027. 16–18 November 2027, Sands Expo & Convention Centre, Singapore."],
  "messe-berlin": ["Organiser: Messe Berlin Asia Pacific | FFE APAC",
    "Organised by Messe Berlin Asia Pacific, the Singapore-based subsidiary of Messe Berlin, one of the world's leading trade fair companies since 1822."],
  "why-exhibit": ["Why Exhibit | Fresh Food Expo Asia Pacific 2027",
    "Put your business in front of the buyers and decision-makers shaping Asia Pacific's fresh food ecosystem. 16–18 Nov 2027, Sands Expo, Singapore."],
  "who-should-exhibit": ["Who Should Exhibit | Fresh Food Expo Asia Pacific 2027",
    "If your business brings fresh food from source to buyer, FFE APAC connects you with buyers, partners and decision-makers across Asia Pacific."],
  "apply-to-exhibit": ["Apply to Exhibit | Fresh Food Expo Asia Pacific 2027",
    "Secure your stand at Fresh Food Expo APAC, Singapore's trade fair for fresh food. Send an enquiry and our team will reply within three business days."],
  "why-visit": ["Why Visit | Fresh Food Expo Asia Pacific 2027",
    "Meet fresh food suppliers and solution providers at one B2B trade fair: new products, partners and commercial opportunities from across Asia Pacific."],
  "who-should-visit": ["Who Should Visit | Fresh Food Expo Asia Pacific 2027",
    "For buyers, sourcing professionals and decision-makers looking for fresh food products, technologies and logistics solutions from Asia Pacific."],
  "register-to-visit": ["Register to Visit | Fresh Food Expo Asia Pacific 2027",
    "Register your interest as a trade visitor to Fresh Food Expo APAC, Asia Pacific's trade fair for fresh food. 16–18 Nov 2027, Sands Expo, Singapore."],
  "register-to-visit/form": ["Visitor Registration | Fresh Food Expo Asia Pacific 2027",
    "Register your interest to visit Fresh Food Expo APAC as a trade visitor. 16–18 November 2027, Sands Expo & Convention Centre, Singapore."],
  "plan-your-visit": ["Plan Your Visit to Sands Expo Singapore | FFE APAC 2027",
    "Getting to Sands Expo & Convention Centre, visa information, tips and where to stay in Singapore for Fresh Food Expo APAC, 16–18 November 2027."],
  news: ["News & Press | Fresh Food Expo Asia Pacific (FFE APAC)",
    "The latest announcements, industry developments, partnerships and programme updates from Fresh Food Expo APAC, plus press photos and videos."],
  gallery: ["Gallery | Fresh Food Expo Asia Pacific (FFE APAC)",
    "Event photos from Fresh Food Expo Asia Pacific for editorial use, including the Partner Event Launch Signing Ceremony in Singapore."],
  "gallery/partner-event-launch-signing-ceremony": ["Partner Event Launch Signing Ceremony | FFE APAC Gallery",
    "Photos from the FFE APAC Partner Event Launch Signing Ceremony between Messe Berlin and the Singapore Tourism Board. For editorial use."],
  subscribe: ["Subscribe for Updates | Fresh Food Expo Asia Pacific",
    "Join the FFE APAC community: be the first to know about new exhibitors, programme announcements, networking opportunities and industry news."],
  contact: ["Contact Us | Fresh Food Expo Asia Pacific (FFE APAC)",
    "Get in touch with the Fresh Food Expo APAC team about exhibiting, sponsorship, partnerships or general enquiries. We reply within three business days."],
};

for (const [p, [t, d]] of Object.entries(PAGES)) {
  if (t.length > 60) throw new Error(`${p}: title ${t.length} chars`);
  if (d.length > 160) throw new Error(`${p}: description ${d.length} chars`);
}
if (process.argv.includes("--dry")) { console.log(`${Object.keys(PAGES).length} pages ok`); process.exit(0); }

const og = M["g7-og"], logo = M.logo;
const SOCIAL = [
  "https://www.linkedin.com/showcase/freshfoodexpoapac/",
  "https://www.instagram.com/freshfoodexpo_apac",
  "https://www.youtube.com/@FreshFoodExpoAPAC",
];
const b64 = (v) => Buffer.from(JSON.stringify(v)).toString("base64");
console.log(JSON.stringify(php(`
$set = function ($opt, $vals) { $o = get_option($opt, []); update_option($opt, array_merge(is_array($o) ? $o : [], $vals)); };
$set('rank-math-options-titles', [
  'title_separator' => '|',
  'knowledgegraph_type' => 'company',
  'knowledgegraph_name' => 'Fresh Food Expo Asia Pacific',
  'website_name' => 'Fresh Food Expo Asia Pacific',
  'website_alternate_name' => 'FFE APAC',
  'knowledgegraph_logo' => '${logo.url}', 'knowledgegraph_logo_id' => ${logo.id},
  'open_graph_image' => '${og.url}', 'open_graph_image_id' => ${og.id},
  'social_url_facebook' => 'https://www.facebook.com/profile.php?id=61595410562693',
  'social_additional_profiles' => implode("\\n", json_decode(base64_decode('${b64(SOCIAL)}'), true)),
  'twitter_card_type' => 'summary_large_image',
  // Pages are web pages, not articles. Author archives would publish the admin's login name and add nothing.
  'pt_page_default_rich_snippet' => 'off',
  'disable_author_archives' => 'on',
]);
// Sitemap: pages only (no blog posts or categories yet; images listed with their page).
$set('rank-math-options-sitemap', ['pt_page_sitemap' => 'on', 'pt_post_sitemap' => 'off', 'pt_attachment_sitemap' => 'off', 'tax_category_sitemap' => 'off', 'tax_post_tag_sitemap' => 'off', 'authors_sitemap' => 'off', 'include_images' => 'on']);
$done = [];
foreach (json_decode(base64_decode('${b64(PAGES)}'), true) as $path => [$t, $d]) {
  $p = get_page_by_path($path);
  if (!$p) throw new Exception("no page $path");
  update_post_meta($p->ID, 'rank_math_title', wp_slash($t));
  update_post_meta($p->ID, 'rank_math_description', wp_slash($d));
  $done[] = $p->ID;
}
// The album page: a shared press-release link previews its cover photo, not the site-wide poster.
$a = get_page_by_path('gallery/partner-event-launch-signing-ceremony');
update_post_meta($a->ID, 'rank_math_facebook_image', '${M["g8-signing-1"].url}');
update_post_meta($a->ID, 'rank_math_facebook_image_id', ${M["g8-signing-1"].id});
update_post_meta($a->ID, 'rank_math_twitter_use_facebook', 'on');
return $done;
`).return_value));
