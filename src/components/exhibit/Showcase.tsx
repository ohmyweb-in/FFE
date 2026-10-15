import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import leaf from "@/assets/exhibit/leaf.svg";
import imgFresh from "@/assets/siaw/card-fresh.jpg";
import imgTech from "@/assets/siaw/card-agri.jpg";
import imgLogistics from "@/assets/eco-logistics.jpg";
import sprout from "@/assets/ecosystem/icon-sprout.svg";
import gear from "@/assets/ecosystem/icon-gear.svg";
import truck from "@/assets/ecosystem/icon-truck.svg";
import { Pill } from "../ui";

type Card = { title: string; text: string; img: StaticImageData; alt: string; pos: string; icon: StaticImageData };

// Figma 777:858 / 777:873 / 777:888 (412×268). Separators keep Figma’s double spaces from lg.
const CARDS: Card[] = [
  {
    title: "Fresh Food",
    text: "Fruit & Vegetables  ·  Meat & Poultry  ·  Seafood  ·  \nEggs & Dairy",
    img: imgFresh,
    alt: "Worker sorting fresh vegetables at a packing station",
    pos: "object-center",
    icon: sprout,
  },
  {
    title: "Agri & Fresh Technology",
    text: "Post-Harvest Technologies  ·  Cooling  ·  Preservation · Storage  ·  Packaging  ·  Freshness-Extension Solutions",
    img: imgTech,
    alt: "Robotic arm tending leafy greens in a vertical farm",
    pos: "object-center",
    icon: gear,
  },
  {
    title: "Logistics & Distribution",
    text: "Transportation – Air, Sea, Land & Rail  ·  Cold Chain  · Warehousing  ·  Supply Chain Solutions",
    img: imgLogistics,
    alt: "Refrigerated truck being loaded with fresh produce at a cold storage facility",
    // Fill 154.08% tall at −13.53% → cover, 25% down.
    pos: "object-[50%_25%]",
    icon: truck,
  },
];

/** Figma 777:851: heading, leaf, three 268px cards (22px gaps), closing copy, two CTAs. */
export default function Showcase() {
  return (
    <section className="untrim container-narrow relative mt-[48px] flex flex-col items-start gap-[22px] lg:mt-[72px]">
      {/* Deco · Leaf: 150×95 rotated 40° in a 175.97×169.19 box at (1078.94, −40). */}
      <div className="pointer-events-none absolute top-[-40px] right-[25.09px] hidden h-[169.192px] w-[175.971px] xl:block" aria-hidden>
        <Image src={leaf} alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-1/2 rotate-40" />
      </div>

      <div className="relative flex flex-col items-start gap-[22px]" data-reveal>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px]">
          Showcase your products and solutions
        </h2>
        <p className="text-[17px] leading-[24px] font-medium text-black md:text-[18px] md:leading-[26px]">
          Fresh Food Expo APAC brings together three key areas of the fresh food ecosystem:
        </p>
      </div>

      <div className="grid w-full gap-[22px] py-[6px] md:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((c, idx) => (
          <article key={c.title} className="lift group relative overflow-hidden rounded-[20px] bg-white xl:h-[268px]" data-reveal style={{ "--i": idx } as CSSProperties}>
            <div className="relative h-[130px] overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3]">
              <Image src={c.img} alt={c.alt} placeholder="blur" sizes="(min-width: 1280px) 412px, (min-width: 768px) 50vw, 100vw" className={`zoom absolute inset-0 size-full object-cover ${c.pos}`} />
            </div>
            <span className="absolute top-[104px] left-[18px] grid size-[52px] place-items-center rounded-full bg-white drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)]">
              <Image src={c.icon} alt="" />
            </span>
            <div className="flex flex-col gap-[8px] px-[24px] pt-[38px] pb-[24px]">
              <h3 className="font-display text-[20px] leading-[26px] font-semibold text-forest">{c.title}</h3>
              <p className="text-[14px] leading-[21px] font-medium text-body lg:whitespace-pre-wrap">{c.text}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="text-[15px] leading-[24px] font-medium text-body" data-reveal>
        Whether you are supplying fresh food, providing technologies that preserve quality and freshness, or delivering logistics solutions that keep
        products moving, Fresh Food Expo APAC gives your business a platform to connect with the wider ecosystem.
      </p>
      <div className="flex flex-col items-stretch gap-[14px] pt-[4px] sm:flex-row sm:flex-wrap sm:items-start" data-reveal>
        <Pill href="/who-should-exhibit" className="bg-accent text-white">
          Who Should Exhibit
        </Pill>
        <Pill href="/ecosystem" className="border-[1.5px] border-black text-black hover:bg-black/5 max-md:px-[18px]">
          Explore the Fresh Food Ecosystem
        </Pill>
      </div>
    </section>
  );
}
