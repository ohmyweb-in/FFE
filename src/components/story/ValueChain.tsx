import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import hall from "@/assets/story/hall.jpg";
import imgFresh from "@/assets/siaw/card-fresh.jpg";
import imgTech from "@/assets/ecosystem/card-agri.jpg";
import imgLogistics from "@/assets/eco-logistics.jpg";
import sprout from "@/assets/story/icon-sprout.svg";
import gear from "@/assets/story/icon-gear.svg";
import truck from "@/assets/story/icon-truck.svg";
import { Pill } from "../ui";
import RuleEyebrow from "./RuleEyebrow";

type Card = { title: string; text: string; img: StaticImageData; alt: string; pos: string; icon: StaticImageData };

// Figma 777:539 / 777:554 / 777:569 (410.67×348).
const CARDS: Card[] = [
  {
    title: "Fresh Food",
    text: "Fruit & Vegetables, Meat & Poultry, Seafood, Eggs & Dairy, supplied by growers, producers, exporters and fresh food suppliers from across regional and global markets.",
    img: imgFresh,
    alt: "Worker sorting fresh vegetables at a packing station",
    pos: "object-center",
    icon: sprout,
  },
  {
    title: "Agri & Fresh Technology",
    text: "Post-harvest technologies, cooling, preservation, storage, packaging and other solutions that help maintain quality, extend freshness, improve efficiency and reduce losses throughout the fresh food journey.",
    img: imgTech,
    alt: "Robotic arm tending leafy greens in a vertical farm",
    pos: "object-center",
    icon: gear,
  },
  {
    title: "Logistics & Distribution",
    text: "Transportation, cold chain, warehousing, supply chain infrastructure and distribution solutions that enable fresh food to move safely and efficiently across local, regional and international markets.",
    img: imgLogistics,
    alt: "Refrigerated truck being loaded with fresh produce at a cold storage facility",
    // Fill 154.08% tall at −13.53% → cover, 25% down.
    pos: "object-[50%_25%]",
    icon: truck,
  },
];

/** Figma 777:522: intro + 444×290 photo, three 348px cards (24px gaps), objective bar. 32px between rows. */
export default function ValueChain() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col gap-[32px] lg:mt-[80px]">
      <div className="flex flex-col gap-[32px] xl:flex-row xl:items-center xl:gap-[56px]">
        <div className="flex flex-col items-start gap-[16px] xl:w-[740px] xl:shrink-0" data-reveal>
          <RuleEyebrow>Connecting the fresh food value chain</RuleEyebrow>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px]">
            Fresh food depends on more than the product itself.
          </h2>
          <p className="text-[15px] leading-[24px] font-medium text-body">
            From post-harvest handling and preservation to cold chain, logistics, distribution and market access, every stage plays a role in maintaining
            freshness, quality, safety and availability.
          </p>
          <p className="text-[15px] leading-[24px] font-medium text-body">
            Fresh Food Expo APAC brings these interconnected parts of the value chain together on one dedicated business platform.
          </p>
        </div>
        {/* Media 484×300: photo 444×290 at x 40. */}
        <div className="xl:relative xl:h-[300px] xl:min-w-0 xl:flex-1" data-reveal style={{ "--i": 1 } as CSSProperties}>
          <div className="group relative aspect-[444/290] w-full max-w-[444px] overflow-hidden rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-linear-to-b from-mint to-[#c2e3c3] xl:absolute xl:top-0 xl:left-[40px] xl:h-[290px] xl:w-[444px]">
            {/* Fill 108.7% wide from the left edge → cover, left-aligned. */}
            <Image src={hall} alt="Visitors walking past produce stands in a busy exhibition hall" placeholder="blur" sizes="(min-width: 768px) 444px, 100vw" className="zoom absolute inset-0 size-full object-cover object-left" />
          </div>
        </div>
      </div>

      <div className="grid gap-[24px] md:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((c, idx) => (
          <article key={c.title} className="lift group relative overflow-hidden rounded-[22px] bg-white xl:h-[348px]" data-reveal style={{ "--i": idx } as CSSProperties}>
            <div className="relative h-[150px] overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3]">
              <Image src={c.img} alt={c.alt} placeholder="blur" sizes="(min-width: 1280px) 411px, (min-width: 768px) 50vw, 100vw" className={`zoom absolute inset-0 size-full object-cover ${c.pos}`} />
            </div>
            <span className="absolute top-[122px] left-[22px] grid size-[56px] place-items-center rounded-full bg-white drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)]">
              <Image src={c.icon} alt="" />
            </span>
            <div className="flex flex-col gap-[10px] px-[26px] pt-[40px] pb-[28px]">
              <h3 className="font-display text-[22px] leading-[28px] font-semibold text-accent">{c.title}</h3>
              <p className="text-[15px] leading-[23px] font-medium text-body">{c.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div
        className="flex flex-col items-start gap-[20px] rounded-[22px] bg-linear-to-r from-mint to-[#eef6ef] px-[20px] py-[20px] md:flex-row md:items-center md:gap-[32px] md:pr-[22px] md:pl-[28px]"
        data-reveal
      >
        <p className="min-w-0 flex-1 text-[15px] leading-[22px] font-medium text-body">
          The objective is to create stronger connections between those who produce fresh food, those who provide the technologies and solutions that
          preserve it, those who move and distribute it, and the buyers and markets that ultimately need it.
        </p>
        <Pill href="/ecosystem" className="shrink-0 bg-accent text-white max-md:px-[18px]">
          Explore the Fresh Food Ecosystem
        </Pill>
      </div>
    </section>
  );
}
