import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import visit from "@/assets/visit.jpg";
import exhibit from "@/assets/exhibit.jpg";
import chevronBlack from "@/assets/chevron-black.svg";
import chevronWhite from "@/assets/chevron-white.svg";
import { Button } from "../ui";

// Button gaps put the chevron where Figma has it (label widths measured in Outfit 500/18px).
const CARDS: { title: string; desc: string; tags: string; tagW: string; img: ReactNode; pl: string; gap: string; buttons: ReactNode }[] = [
  {
    title: "Visitors",
    desc: "For buyers and industry professionals seeking new fresh food products, suppliers, technologies, solutions and business partners.",
    tags: "Wholesalers | Importers | Exporters | Retailers | Food Service Operators...",
    tagW: "max-w-[391px]",
    img: <Image src={visit} alt="Visitors walking through a busy exhibition hall" placeholder="blur" sizes="(min-width: 1024px) 622px, 100vw" className="zoom absolute inset-0 size-full object-cover" />,
    pl: "lg:pl-[42px]",
    gap: "md:gap-[9px]",
    buttons: (
      <>
        <Button href="/why-visit" chevron={chevronBlack} w={162} h={52} pl={33} gap={9.73} m={{ w: 125, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 }} className="border-[1.5px] border-white bg-white text-black">
          Why Visit
        </Button>
        <Button href="/register-to-visit" chevron={chevronWhite} w={248} h={52} pl={27} gap={13.66} m={{ w: 200, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 }} className="border-[1.5px] border-white text-white hover:bg-white/10">
          Register Your Interest
        </Button>
      </>
    ),
  },
  {
    title: "Exhibitors",
    desc: "For companies looking to showcase fresh food products, technologies and logistics solutions, enter new markets and build commercial relationships across Asia Pacific's fresh food ecosystem",
    tags: "Producer | Packaging Companies | Cold Chain Operators...",
    tagW: "max-w-[549px]",
    // Same Figma fill crop as the homepage Exhibit card (359:226).
    img: (
      <Image
        src={exhibit}
        alt="Exhibitors in conversation at a trade fair stand"
        placeholder="blur"
        sizes="(min-width: 1024px) 1045px, 170vw"
        className="zoom absolute top-[-17.34%] left-[-13.26%] h-[117.34%] w-[167.77%] max-w-none object-cover"
      />
    ),
    pl: "lg:pl-[36px]",
    gap: "md:gap-[11px]",
    buttons: (
      <>
        <Button href="/why-exhibit" chevron={chevronWhite} w={172} h={52} pl={27} gap={10.14} m={{ w: 142, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 }} className="border-[1.5px] border-accent bg-accent text-white">
          Why Exhibit
        </Button>
        {/* Figma 736:2463 says Who Should Visit; client asked for Who Should Exhibit on the exhibit card. */}
        <Button href="/who-should-exhibit" chevron={chevronWhite} w={241} h={52} pl={33} gap={8.83} m={{ w: 197, h: 43, pl: 22, gap: 8, fs: 15, chev: 0.828 }} className="border-[1.5px] border-white text-white hover:bg-white/10">
          Who Should Exhibit
        </Button>
      </>
    ),
  },
];

/** Figma 736:2414: two 622×467 photo cards, 42px apart. Copy is anchored to the bottom (buttons 39px up). */
export default function WhoFor() {
  return (
    <section className="untrim container-narrow mt-[46px]">
      <h2 className="h-section lg:leading-[52px]" data-reveal>
        Who is this <span className="text-accent">event </span>for?
      </h2>
      <div className="mt-[24px] grid gap-[20px] md:gap-6 lg:mt-[28px] xl:w-[calc(100%+6px)] xl:grid-cols-2 xl:gap-[42px]">
        {CARDS.map((c, idx) => (
          <div key={c.title} data-reveal style={{ "--i": idx } as CSSProperties}>
            <article
              className={`lift group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[18.6px] bg-[#d9d9d9] px-[22px] pb-[28px] text-white md:rounded-[24px] lg:rounded-[30px] lg:pr-[36px] lg:pb-[39px] xl:aspect-[622/467] xl:min-h-0 ${c.pl}`}
            >
              {c.img}
              <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black" />
              <div className="relative">
                <h3 className="trim font-display text-[30px] leading-[normal] font-semibold md:text-[48px] md:leading-[52.2px]">{c.title}</h3>
                <p className="trim mt-[20px] max-w-[534px] text-[17px] leading-[normal] font-medium md:mt-[26px] md:text-[18px]">{c.desc}</p>
                <p className={`trim mt-[24px] ${c.tagW} text-[17px] leading-[normal] font-medium text-white/60 md:mt-[30px] md:text-[18px]`}>{c.tags}</p>
                <div className={`mt-[28px] flex flex-wrap gap-[10px] md:mt-[36px] ${c.gap}`}>{c.buttons}</div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
