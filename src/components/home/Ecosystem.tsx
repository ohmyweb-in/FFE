import Image, { type StaticImageData } from "next/image";
import { Fragment, type CSSProperties } from "react";
import leafOutline from "@/assets/leaf-outline.svg";
import ring from "@/assets/icon-ring.svg";
import check from "@/assets/check.svg";
import flowArrow from "@/assets/flow-arrow.png";
import chevronWhite from "@/assets/chevron-white.svg";
import imgFresh from "@/assets/eco-fresh-food.jpg";
import imgAgri from "@/assets/eco-agri-tech.jpg";
import imgLogistics from "@/assets/eco-logistics.jpg";
import iconFresh from "@/assets/icon-fresh-food.png";
import iconAgri from "@/assets/icon-agri-tech.png";
import iconLogistics from "@/assets/icon-logistics.png";
import { Button, crop } from "../ui";

type Pillar = {
  title: string;
  desc: string;
  items: string[];
  img: StaticImageData;
  alt: string;
  crop: CSSProperties;
  icon: StaticImageData;
};

const PILLARS: Pillar[] = [
  {
    title: "Fresh Food",
    desc: "The products at the heart of the ecosystem.",
    items: ["Fruit & Vegetables", "Meat & Poultry", "Seafood", "Eggs & Dairy"],
    img: imgFresh,
    alt: "Crates of fresh broccoli and vegetables on display",
    crop: crop(102.69, 123.98, -0.03, 0.21),
    icon: iconFresh,
  },
  {
    title: "Agri & Fresh Technology",
    desc: "Protecting quality and extending freshness.",
    items: ["Agri-Tech", "Digital Solutions", "Preservation", "Packaging"],
    img: imgAgri,
    alt: "Automated food-processing machine under purple light",
    crop: crop(102.65, 123.98, -1.33, 0),
    icon: iconAgri,
  },
  {
    title: "Logistic & Distribution",
    desc: "Solutions that move, store and distribute fresh food efficiently across markets.",
    items: ["Distribution & Supply Chain", "Cold Chain", "Freight & Transportation", "Storage & Warehousing"],
    img: imgLogistics,
    alt: "Refrigerated truck being loaded with fresh produce at a cold storage facility",
    crop: crop(100, 129.02, 0, -3.49),
    icon: iconLogistics,
  },
];

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="container-wide relative mt-[29px] overflow-hidden rounded-[20px] bg-brand/25 [--gutter:18px] md:mt-16 md:rounded-[24px] md:[--gutter:32px] lg:mt-[54px] lg:rounded-[30px]"
    >
      <Image src={leafOutline} alt="" aria-hidden className="pointer-events-none absolute top-0 right-0 top-[-12px] h-[60px] w-[110px] max-w-none md:top-0 md:h-[109px] md:w-[200px] lg:h-[163px] lg:w-[300px] xl:h-[239px] xl:w-[440px]" />

      <div className="container-page relative pt-[55px] pb-[60px] md:pt-12 md:pb-12 lg:pt-[69px] lg:pb-[54px]">
        <div className="pl-[2px] md:pl-0 lg:pl-[6px]" data-reveal>
          <p className="eyebrow text-accent md:text-brand">About fresh food expo apac</p>
          <h2 className="h-section mt-[28px] max-w-[354px] leading-[38.2px] md:mt-[20px] md:max-w-[825px] md:leading-[1.09] lg:mt-[28px] lg:leading-[52.2px]">
            Connecting the fresh food ecosystem
          </h2>
          <p className="text-lead mt-[28px] max-w-[354px] text-[18px] text-forest md:mt-[24px] md:max-w-[615px] lg:mt-[32px]">
            One Platform. Fresh Food, Agri & Fresh Technology, Logistics & Distribution.
          </p>
        </div>

        <PillarRow className="mt-[33px] md:mt-10 lg:mt-[54px]" />

        <div className="mt-[44px] flex justify-center md:mt-10 lg:mt-[42px]" data-reveal>
          <Button
            href="/ecosystem"
            chevron={chevronWhite}
            w={398}
            h={52}
            pl={35}
            gap={18.66}
            m={{ w: 294, h: 87, fs: 18, lh: 25, tw: 210, center: true }}
            className="border-[1.5px] border-brand bg-brand text-white"
          >
            Explore the Full Fresh Food Ecosystem
          </Button>
        </div>
      </div>
    </section>
  );
}

/** The three pillar cards with flow arrows (also used on the About page, scaled). */
export function PillarRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center lg:flex-row lg:items-stretch ${className}`}>
      {PILLARS.map((p, idx) => (
        <Fragment key={p.title}>
          {idx > 0 && (
            <div className="flex h-[71px] items-center justify-center md:h-[55px] lg:h-auto lg:w-[55px] lg:shrink-0 lg:items-start lg:pt-[198px]" aria-hidden>
              <Image src={flowArrow} alt="" sizes="31px" className="size-[31px] rotate-90 lg:rotate-0" />
            </div>
          )}
          {/* Mobile cards (428:647 etc.) are the desktop card at exactly ×0.903. */}
          <div
            className="w-full max-w-[392px] [zoom:0.903] md:[zoom:1] lg:w-[392px] lg:max-w-none lg:shrink"
            data-reveal
            style={{ "--i": idx } as CSSProperties}
          >
            <article className="lift group h-full min-h-[410px] overflow-hidden rounded-[25px] bg-white md:min-h-[426px]">
              <div className="relative aspect-[392/171] overflow-hidden">
                <Image src={p.img} alt={p.alt} placeholder="blur" sizes="(min-width: 1024px) 405px, 100vw" style={p.crop} className="zoom" />
              </div>
              <div className="relative px-[27px] pb-[13px] md:pb-[32px]">
                <Image src={ring} alt="" className="absolute top-[-31px] left-[23px]" />
                <Image src={p.icon} alt="" sizes="34px" className="absolute top-[-16.61px] left-[41.39px] size-[33.21px]" />
                <h3 className="pt-[57px] font-display text-[26px] leading-[1.2] font-semibold text-accent">{p.title}</h3>
                <p className="mt-[17px] max-w-[332px] text-[15px] leading-[23px] font-medium text-black">{p.desc}</p>
                <ul className="mt-[22px] text-[15px] leading-[normal] font-medium text-black">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-[5px]">
                      <Image src={check} alt="" className="shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
