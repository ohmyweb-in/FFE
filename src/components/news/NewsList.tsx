"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import singapore from "@/assets/news/n-singapore.jpg";
import produce from "@/assets/news/n-produce.jpg";
import conference from "@/assets/news/n-conference.jpg";
import hall from "@/assets/news/n-hall.jpg";
import seedling from "@/assets/news/n-seedling.jpg";
import logistics from "@/assets/news/n-logistics.jpg";
import search from "@/assets/news/icon-search.svg";
import chevronLeft from "@/assets/news/icon-chevron-left.svg";
import chevronRight from "@/assets/contact/icon-chevron-right.svg";

const CATEGORIES = ["Announcements", "Press Releases", "Partnerships", "Programme Updates", "Industry News"] as const;
type Category = (typeof CATEGORIES)[number];

type Post = {
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  img: StaticImageData;
  alt: string;
};

const POSTS: Post[] = [
  {
    title: "Fresh Food Expo APAC to Take Place on 16–18 November 2027 in Singapore",
    excerpt: "Fresh Food Expo APAC will be held at Sands Expo & Convention Centre, bringing together the fresh food ecosystem across Asia Pacific.",
    date: "12 SEP 2026",
    category: "Announcements",
    img: singapore,
    alt: "Marina Bay Sands and the Singapore skyline at sunset",
  },
  {
    title: "Key Industry Partners Join Fresh Food Expo APAC 2027",
    excerpt: "Fresh Food Expo APAC is pleased to welcome leading industry organisations as partners for the 2027 edition.",
    date: "02 SEP 2026",
    category: "Partnerships",
    img: produce,
    alt: "Visitors sampling products at a busy exhibitor counter",
  },
  {
    title: "Conference Programme to Explore the Future of Fresh Food",
    excerpt:
      "The 2027 programme will feature industry leaders and experts discussing innovation, resilience and growth across the fresh food ecosystem.",
    date: "25 AUG 2026",
    category: "Programme Updates",
    img: conference,
    alt: "Panel discussion on the Shaping the Future of Fresh Food stage",
  },
  {
    title: "Growing Global Interest in Fresh Food Expo APAC 2027",
    excerpt:
      "Interest in exhibiting and visiting continues to grow, with strong participation expected from across Asia Pacific and international markets.",
    date: "10 AUG 2026",
    category: "Industry News",
    img: hall,
    alt: "Guided tour group walking past pallets in a logistics hall",
  },
  {
    title: "Innovation and Sustainability in Focus at Fresh Food Expo APAC",
    excerpt: "The event will showcase the latest technologies and solutions driving a more sustainable and resilient fresh food ecosystem.",
    date: "28 JUL 2026",
    category: "Industry News",
    img: seedling,
    alt: "Exhibitors discussing an agri-robotics machine on a stand",
  },
  {
    title: "Connecting the Fresh Food Value Chain Across Asia Pacific",
    excerpt:
      "From fresh food to technology, logistics and distribution, the event provides a dedicated platform for the entire value chain to connect.",
    date: "15 JUL 2026",
    category: "Press Releases",
    img: logistics,
    alt: "Crowds of visitors in a busy exhibition hall",
  },
];

const PAGES = ["1", "2", "3", "4", "…", "8"];

/** Figma 736:3075: filter chips + search, 3-column card grid, pagination. Filters work client-side. */
export default function NewsList() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const posts = POSTS.filter((p) => (cat === "All" || p.category === cat) && (!query || `${p.title} ${p.excerpt}`.toLowerCase().includes(query)));

  return (
    <section className="untrim container-narrow flex flex-col gap-[28px] pt-[40px] pb-[40px] md:gap-[32px] lg:pt-[48px]">
      <div className="flex flex-col gap-[16px] xl:flex-row xl:items-center xl:gap-[10px]">
        <ul className="flex flex-wrap gap-[10px]" aria-label="Filter news by category">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <li key={c}>
              <button
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full py-[12px] text-[15px] leading-[20px] font-medium transition-colors duration-(--dur-ui) ${
                  cat === c
                    ? "bg-accent px-[22px] text-white"
                    : "border border-[#c2e3c3] bg-white px-[20px] text-forest hover:border-accent hover:bg-mint"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
        <label className="input h-[48px] gap-[10px] border-[#d9e6db] pr-[18px] pl-[16px] xl:ml-auto xl:w-[320px] xl:shrink-0">
          <span className="sr-only">Search news</span>
          <Image src={search} alt="" className="size-[20px] shrink-0" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search news…"
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] leading-[19px] outline-none placeholder:text-field"
          />
        </label>
      </div>

      {/* Revealed as one block: cards re-mount when filters change, after the observer has run. */}
      <div data-reveal>
        {posts.length ? (
          <ul className="grid gap-[24px] md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.title}>
                <article className="lift group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white">
                  <div className="relative h-[210px] shrink-0 overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3]">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 411px, (min-width: 768px) 50vw, 100vw"
                      className="zoom size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-[22px] px-[26px] pt-[22px] pb-[26px]">
                    <div className="flex flex-col gap-[12px]">
                      <div className="flex items-center gap-[12px]">
                        <time className="text-[13px] leading-[16px] font-medium tracking-[0.04em] text-accent">{p.date}</time>
                        <span className="rounded-full bg-mint px-[12px] py-[5px] text-[11px] leading-[14px] font-semibold tracking-[0.04em] text-forest uppercase">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="font-display text-[23px] leading-[29px] font-semibold text-forest">
                        <a href="#" className="after:absolute after:inset-0">
                          {p.title}
                        </a>
                      </h3>
                      <p className="text-[15px] leading-[23px] font-medium text-body">{p.excerpt}</p>
                    </div>
                    <span className="flex items-center gap-[14px] text-[15px] leading-[20px] font-semibold text-forest" aria-hidden>
                      Read More
                      <span className="flex size-[40px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-accent bg-white transition-colors duration-(--dur-ui) group-hover:bg-mint">
                        <Image
                          src={chevronRight}
                          alt=""
                          className="size-[18px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:translate-x-[2px]"
                        />
                      </span>
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="rounded-[22px] bg-white px-6 py-16 text-center text-[17px] leading-[24px] font-medium text-body">
            No news matches your filters yet.
          </p>
        )}
      </div>

      {/* Pagination (736:3188) — visual until there is a CMS behind the list. */}
      <nav aria-label="News pages" className="flex items-center justify-center gap-[10px] max-sm:gap-[6px]">
        <span className="flex size-[40px] shrink-0 max-sm:size-[32px] items-center justify-center rounded-full border-[1.5px] border-[#e0e0e0] bg-white" aria-hidden>
          <Image src={chevronLeft} alt="" className="size-[18px]" />
        </span>
        {PAGES.map((n) =>
          n === "…" ? (
            <span key={n} className="text-[16px] text-body" aria-hidden>
              …
            </span>
          ) : (
            <a
              key={n}
              href="#"
              aria-current={n === "1" ? "page" : undefined}
              className={`tap flex size-[40px] shrink-0 max-sm:size-[32px] items-center justify-center rounded-full border-[1.5px] text-[15px] leading-[18px] font-semibold transition-colors duration-(--dur-ui) ${
                n === "1" ? "border-accent bg-accent text-white" : "border-[#e0e0e0] bg-white text-accent hover:border-accent"
              }`}
            >
              {n}
            </a>
          ),
        )}
        <a
          href="#"
          aria-label="Next page"
          className="tap flex size-[40px] shrink-0 max-sm:size-[32px] items-center justify-center rounded-full border-[1.5px] border-accent bg-white transition-colors duration-(--dur-ui) hover:bg-mint"
        >
          <Image src={chevronRight} alt="" className="size-[18px]" />
        </a>
      </nav>
    </section>
  );
}
