import Image, { type StaticImageData } from "next/image";
import { Fragment, type CSSProperties } from "react";
import leaf from "@/assets/ecosystem/leaf.svg";
import ring from "@/assets/siaw/ring.svg";
import arrow from "@/assets/siaw/arrow.svg";
import check from "@/assets/check.svg";
import imgFresh from "@/assets/siaw/card-fresh.jpg";
import imgTech from "@/assets/siaw/card-agri.jpg";
import imgLogistics from "@/assets/eco-logistics.jpg";
import iconFresh from "@/assets/icon-fresh-food.png";
import iconTech from "@/assets/icon-agri-tech.png";
import iconLogistics from "@/assets/icon-logistics.png";

type Pillar = { title: string; lead: string; desc: string; tags: string[]; img: StaticImageData; alt: string; pos: string; icon: StaticImageData; h: string };

// Figma 450:3807 / 450:3834 / 450:3861 (the third card is 537px, one taller).
const PILLARS: Pillar[] = [
  {
    title: "Fresh Food",
    lead: "Where fresh food begins.",
    desc: "Fresh food products supplied by growers, producers, farms, fisheries, exporters and suppliers from across Asia Pacific and global markets.",
    tags: ["Fruits & Vegetables", "Meat & Poultry", "Seafood", "Eggs & Dairy"],
    img: imgFresh,
    alt: "Worker sorting fresh vegetables at a packing station",
    pos: "object-center",
    icon: iconFresh,
    h: "xl:h-[536px]",
  },
  {
    title: "Agri & Fresh Technology",
    lead: "Protecting quality and extending freshness.",
    desc: "Technologies and solutions that support the handling, cooling, preservation, storage and packaging of fresh food.",
    tags: ["AgriTech", "Cooling", "Preservation", "Packaging"],
    img: imgTech,
    alt: "Robotic arm tending leafy greens in a vertical farm",
    pos: "object-center",
    icon: iconTech,
    h: "xl:h-[536px]",
  },
  {
    title: "Logistics & Distribution",
    lead: "Connecting fresh food with markets.",
    desc: "Transportation, cold chain, warehousing and supply chain solutions that enable fresh food to move safely and efficiently from source to buyers and markets.",
    tags: ["Transportation – Air, Sea, Land & Rail", "Cold Chain", "Warehousing", "Supply Chain"],
    img: imgLogistics,
    alt: "Refrigerated truck being loaded with fresh produce at a cold storage facility",
    // Figma fill: 129.02% tall at −3.49% → cover, 11% down.
    pos: "object-[50%_11%]",
    icon: iconLogistics,
    h: "xl:h-[537px]",
  },
];

/** Figma 450:3800: 1360px mint panel, heading, three pillar cards with 18px arrows. */
export default function OnePlatform() {
  return (
    <section className="untrim mx-auto mt-[24px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[20.63px]">
      <div className="relative flex flex-col gap-[32px] rounded-[24px] bg-linear-to-b from-mint to-[#eef6ef] px-[20px] py-[36px] md:px-[40px] md:py-[48px] lg:rounded-[36px]">
        {/* image 11 [Vectorized]: 270×146.7 in the panel's top-right corner. */}
        <Image src={leaf} alt="" aria-hidden className="pointer-events-none absolute top-[-0.32px] right-0 hidden max-w-none xl:block" />

        <div className="relative flex flex-col items-start gap-[12px]" data-reveal>
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">The fresh food ecosystem</p>
          <h2 className="max-w-[882px] font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[42px] lg:leading-[48px]">
            One platform.
            <br /> Connecting <span className="text-accent">fresh food</span> from source to market
          </h2>
          <p className="text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
            Fresh Food Expo APAC is built around three interconnected pillars of the fresh food value chain.
          </p>
        </div>

        <div className="flex flex-col items-center xl:flex-row xl:items-center xl:gap-[12px]">
          {PILLARS.map((p, idx) => (
            <Fragment key={p.title}>
              {idx > 0 && (
                <div className="flex h-[44px] items-center justify-center xl:h-auto" aria-hidden>
                  <Image src={arrow} alt="" className="rotate-90 xl:rotate-0" />
                </div>
              )}
              <div className="w-full max-w-[520px] xl:max-w-none xl:min-w-0 xl:flex-1" data-reveal style={{ "--i": idx } as CSSProperties}>
                <article className={`lift group relative flex flex-col overflow-hidden rounded-[26px] bg-white ${p.h}`}>
                  <div className="relative h-[180px] shrink-0 overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3]">
                    <Image src={p.img} alt={p.alt} placeholder="blur" sizes="(min-width: 1280px) 400px, (min-width: 560px) 520px, 100vw" className={`zoom absolute inset-0 size-full object-cover ${p.pos}`} />
                  </div>
                  {/* Ring (60.71 circle in a 68.71 shadow svg) at (22, 144); icon 32.52px at (36.09, 157.5). */}
                  <Image src={ring} alt="" className="absolute top-[144px] left-[18px] max-w-none" />
                  <Image src={p.icon} alt="" sizes="33px" className="absolute top-[157.5px] left-[36.09px] size-[32.52px]" />
                  <div className="flex flex-col gap-[10px] px-[26px] pt-[46px] pb-[28px]">
                    <h3 className="font-display text-[26px] leading-[32px] font-semibold text-accent">{p.title}</h3>
                    <p className="text-[15px] leading-[20px] font-semibold text-black">{p.lead}</p>
                    <p className="text-[15px] leading-[22px] font-medium text-body">{p.desc}</p>
                    <ul className="flex flex-wrap gap-[8px] pt-[8px]">
                      {p.tags.map((t) => (
                        <li key={t} className="flex items-start gap-[5px] rounded-full bg-mint/50 px-[14px] py-[7px] text-[12px] leading-[16px] font-semibold text-forest">
                          <Image src={check} alt="" className="shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
