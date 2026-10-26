import type { StaticImageData } from "next/image";
import aboutImg from "@/assets/about/hero.jpg";
import exhibitImg from "@/assets/exhibit/hero.jpg";
import visitImg from "@/assets/visit/hero.jpg";
import newsImg from "@/assets/news/media-gallery.jpg";

export type NavLink = { label: string; href: string; desc: string };
export type NavSection = {
  label: string;
  href: string;
  blurb: string;
  image: StaticImageData;
  cta: { label: string; href: string };
  links: NavLink[];
};

// Stage 1 sitemap for the header mega menu (the footer keeps its own list in FooterNav).
export const NAV: NavSection[] = [
  {
    label: "About",
    href: "/about",
    blurb: "Asia Pacific’s premier trade fair for fresh food, 16–18 November 2027 in Singapore.",
    image: aboutImg,
    cta: { label: "Contact Us", href: "/contact" },
    links: [
      { label: "Overview", href: "/about", desc: "The event at a glance" },
      { label: "Our Story", href: "/our-story", desc: "Why Fresh Food Expo exists" },
      { label: "Fresh Food Ecosystem", href: "/ecosystem", desc: "The sectors we bring together" },
      { label: "SIAW", href: "/siaw", desc: "Singapore International Agri-Food Week" },
      { label: "Messe Berlin", href: "/messe-berlin", desc: "Meet the organiser" },
      { label: "Contact Us", href: "/contact", desc: "Talk to our team" },
    ],
  },
  {
    label: "Exhibit",
    href: "/why-exhibit",
    blurb: "Put your brand in front of fresh food buyers from across Asia Pacific.",
    image: exhibitImg,
    cta: { label: "Apply to Exhibit", href: "/apply-to-exhibit" },
    links: [
      { label: "Why Exhibit", href: "/why-exhibit", desc: "Grow your business in the region" },
      { label: "Who Should Exhibit", href: "/who-should-exhibit", desc: "Sectors and exhibitor profiles" },
      { label: "Apply to Exhibit", href: "/apply-to-exhibit", desc: "Secure your stand" },
    ],
  },
  {
    label: "Visit",
    href: "/why-visit",
    blurb: "Source, connect and discover what’s next in fresh food.",
    image: visitImg,
    cta: { label: "Register to Visit", href: "/register-to-visit" },
    links: [
      { label: "Why Visit", href: "/why-visit", desc: "What’s waiting on the show floor" },
      { label: "Who Should Visit", href: "/who-should-visit", desc: "Buyers, retailers and more" },
      { label: "Plan Your Visit", href: "/plan-your-visit", desc: "Venue, travel and stay" },
      { label: "Register to Visit", href: "/register-to-visit", desc: "Get your trade pass" },
    ],
  },
  {
    label: "News & Media",
    href: "/news",
    blurb: "The latest announcements and stories from Fresh Food Expo APAC.",
    image: newsImg,
    cta: { label: "Subscribe", href: "/subscribe" },
    links: [
      { label: "News & Press Release", href: "/news", desc: "Announcements and media" },
      { label: "Gallery", href: "/gallery", desc: "Photos from our events" },
      { label: "Subscribe Newsletter", href: "/subscribe", desc: "Updates in your inbox" },
    ],
  },
];
