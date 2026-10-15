import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import users from "@/assets/programme/s-users.svg";
import store from "@/assets/visit/i-store.svg";
import chef from "@/assets/visit/i-chef.svg";
import box from "@/assets/visit/i-box.svg";
import buyers from "@/assets/visit/buyers.jpg";
import retail from "@/assets/visit/retail.jpg";
import foodservice from "@/assets/visit/foodservice.jpg";
import logistics from "@/assets/visit/logistics.jpg";

type Group = { title: [string, string]; icon: StaticImageData; tags: string[]; text: string; img: StaticImageData; alt: string; pos: string };

// `tags`: one string per Figma line. Figma fills are full-width at the photo’s true ratio, shifted up; `pos` = that shift as object-position (top offset / overflow).
const GROUPS: Group[] = [
  {
    title: ["Buyers & Procurement", "Professionals"],
    icon: users,
    tags: ["Importers  ·  Exporters  ·  Sourcing Professionals  ·  Procurement Teams  ·  ", "Purchasing Managers  ·  Traders  ·  Buying Offices"],
    text: "Discover new suppliers, compare products and identify new sourcing opportunities across the fresh food ecosystem.",
    img: buyers,
    alt: "Buyers meeting exhibitors at a stand",
    pos: "object-[50%_80.3%]",
  },
  {
    title: ["Distributors, Wholesalers", "& Retailers"],
    icon: store,
    tags: ["Distributors  ·  Wholesalers  ·  Supermarkets  ·  Grocery Retailers  ·  ", "E\u2011commerce Platforms  ·  Regional Distribution Networks"],
    text: "Meet suppliers, expand your product portfolio and build new commercial relationships across regional and international markets.",
    img: retail,
    alt: "Busy exhibition aisle with retail buyers at a produce stand",
    pos: "object-[50%_73.3%]",
  },
  {
    title: ["Foodservice & ", "Hospitality"],
    icon: chef,
    tags: ["Hotels  ·  Restaurants  ·  Catering Companies  ·  Foodservice Operators  · Institutional Buyers"],
    text: "Source fresh food products, discover new suppliers and explore solutions that support quality, consistency and supply reliability.",
    img: foodservice,
    alt: "Visitors sampling products at a fresh herbs stand",
    pos: "object-[50%_61.3%]",
  },
  {
    title: ["Supply Chain & Industry", "Professionals"],
    icon: box,
    tags: ["Logistics Operators  ·  Cold Chain Professionals  ·  Warehousing Specialists  · Supply Chain Managers  ·  Quality & Operations Teams  ·  Industry Organisations"],
    text: "Explore technologies, services and partnerships that improve how fresh food is handled, stored, transported and distributed.",
    img: logistics,
    alt: "Packaged fresh vegetables in a display crate",
    pos: "object-[50%_85.2%]",
  },
];

/** Visitor groups (1138:4177): 2×2 cards, 24px gaps, 1360px row (40px sides at 1440). */
export default function VisitorGroups() {
  return (
    <section className="untrim mx-auto mt-[24px] grid w-[min(1360px,100%-2*var(--gutter))] gap-[24px] lg:grid-cols-2">
      {GROUPS.map((g, n) => (
        <article
          key={g.title[0]}
          className="group flex flex-col justify-between gap-[24px] rounded-[22px] bg-linear-to-b from-[#eef6ef] to-page px-[18px] pt-[22px] pb-[18px] md:rounded-[26px] md:px-[22px] md:pt-[24px] md:pb-[22px] xl:min-h-[488px]"
          data-reveal
          style={{ "--i": n % 2 } as CSSProperties}
        >
          <div className="flex flex-col items-start gap-[16px] min-[480px]:flex-row min-[480px]:gap-[24px]">
            <span className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-mint transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:-translate-y-[3px] md:size-[72px]">
              <Image src={g.icon} alt="" className="size-[30px] md:size-[36px]" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
              <h2 className="font-display text-[26px] leading-[30px] font-semibold text-forest md:text-[30px] md:leading-[34px]">
                {g.title[0]}
                <br />
                {g.title[1]}
              </h2>
              {/* Figma's strings verbatim (pre-wrapped "  ·  "); cards 1–2 break where Figma does at full width. */}
              <p className="text-[15px] leading-[23px] font-medium whitespace-pre-wrap text-black">
                {g.tags.map((t, k) => (
                  <span key={t}>
                    {k > 0 && <br className="max-xl:hidden" />}
                    {t}
                  </span>
                ))}
              </p>
              <p className="text-[15px] leading-[24px] font-medium text-body md:text-[16px] md:leading-[25px]">{g.text}</p>
            </div>
          </div>
          <div className="relative h-[200px] shrink-0 overflow-hidden rounded-[18px] bg-linear-to-b from-mint to-[#c2e3c3] md:h-[230px]">
            <Image
              src={g.img}
              alt={g.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 624px, 100vw"
              className={`zoom absolute inset-0 size-full object-cover ${g.pos}`}
            />
          </div>
        </article>
      ))}
    </section>
  );
}
