import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import visit from "@/assets/visit.jpg";
import exhibit from "@/assets/exhibit.jpg";
import chevronWhite from "@/assets/chevron-white.svg";
import chevronBlack from "@/assets/chevron-black.svg";
import { Button } from "../ui";

type Card = { title: string; text: string; roles: string; img: ReactNode; pl: string; textMt: string; textW: string; rolesW: string; rolesMt?: string; ctaMt?: string; ctaGap: string; ctas: ReactNode };

// Figma 669:1481: two 622×467 cards, 42px apart (ratio kept on single-column md and on xl; taller on 2-column lg); content anchored 39px above the bottom edge.
// Gaps are tuned so title/copy/roles land on Figma’s y (181|178 / 240 / 327) with the browser’s trimmed metrics,
// and pill gaps put each chevron at Figma’s x (the rendered labels run ~6px narrower than Figma’s text boxes).
const CARDS: Card[] = [
  {
    title: "Looking to Visit?",
    text: "Discover fresh food suppliers, technologies and supply chain solutions while connecting with businesses from across regional and global markets.",
    roles: "Wholesalers | Importers | Exporters | Retailers | Food Service Operators...",
    img: <Image src={visit} alt="Visitors walking through a busy exhibition hall" placeholder="blur" sizes="(min-width: 1024px) 622px, 100vw" className="zoom absolute inset-0 size-full object-cover" />,
    pl: "lg:pl-[42px]",
    textMt: "mt-[23px] md:mt-[25.41px]",
    textW: "max-w-[534px]",
    rolesW: "max-w-[391px]",
    // Two-line roles (1138:2377): 18px above, 22px to the pills, so the title stays on Figma’s y.
    rolesMt: "mt-[18px] md:mt-[18.83px]",
    ctaMt: "mt-[22px] md:mt-[22.83px]",
    ctaGap: "gap-[9px]",
    ctas: (
      <>
        <Button href="/why-visit" chevron={chevronBlack} w={162} h={52} pl={33} gap={16.39} className="border-[1.5px] border-white bg-white text-black">
          Why Visit
        </Button>
        <Button href="/register-to-visit" chevron={chevronWhite} w={248} h={52} pl={27} gap={13.66} className="border-[1.5px] border-white text-white hover:bg-white/10">
          Register Your Interest
        </Button>
      </>
    ),
  },
  {
    title: "Looking to Exhibit?",
    text: "Showcase your fresh food products, technologies or logistics and distribution solutions to buyers, partners and industry stakeholders from across Asia Pacific.",
    roles: "Producer | Packaging Companies | Cold Chain Operators...",
    // Same fill crop as the homepage Exhibit card (desktop 359:226) once the card keeps its 622×467 ratio (xl); cover below.
    img: (
      <Image
        src={exhibit}
        alt="Exhibitors in conversation at a trade fair stand"
        placeholder="blur"
        sizes="(min-width: 1024px) 1045px, 170vw"
        className="zoom absolute inset-0 size-full max-w-none object-cover xl:inset-auto xl:top-[-17.34%] xl:left-[-13.26%] xl:h-[117.34%] xl:w-[167.77%]"
      />
    ),
    pl: "lg:pl-[36px]",
    textMt: "mt-[26px] md:mt-[28.41px]",
    textW: "max-w-[532px]",
    rolesW: "max-w-[549px]",
    ctaGap: "gap-[11px]",
    ctas: (
      <>
        <Button href="/why-exhibit" chevron={chevronWhite} w={172} h={52} pl={27} gap={16.8} className="border-[1.5px] border-accent bg-accent text-white">
          Why Exhibit
        </Button>
        <Button href="/who-should-exhibit" chevron={chevronWhite} w={240} h={52} pl={33} gap={15.49} className="border-[1.5px] border-white text-white hover:bg-white/10">
          Who Should Exhibit
        </Button>
      </>
    ),
  },
];

/** Figma 669:1480 "Who is this event for". */
export default function WhoFor() {
  return (
    <section className="container-page mt-[48px] grid xl:relative xl:left-[3px] gap-[20px] md:gap-6 lg:mt-[67px] lg:grid-cols-2 lg:gap-[42px]">
      {CARDS.map((c, idx) => (
        <div key={c.title} data-reveal style={{ "--i": idx } as CSSProperties}>
          <article
            className={`lift group relative flex h-full min-h-[460px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#d9d9d9] px-[20px] pb-[28px] md:aspect-[622/467] md:min-h-0 lg:aspect-auto lg:min-h-[540px] xl:aspect-[622/467] xl:min-h-0 md:px-[32px] md:pb-[39px] lg:rounded-[30px] lg:pr-[36px] ${c.pl}`}
          >
            {c.img}
            <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black" />
            <div className="relative text-white">
              <h3 className="font-display text-[30px] leading-[32.4px] font-semibold md:text-[48px] md:leading-[52.2px]">{c.title}</h3>
              <p className={`text-[17px] leading-[normal] font-medium md:text-[18px] ${c.textMt} ${c.textW}`}>{c.text}</p>
              <p className={`text-[17px] leading-[normal] font-medium text-white/60 md:text-[18px] ${c.rolesMt ?? "mt-[28px] md:mt-[28.83px]"} ${c.rolesW}`}>{c.roles}</p>
              <div className={`flex flex-wrap ${c.ctaMt ?? "mt-[36px] md:mt-[36.83px]"} ${c.ctaGap}`}>{c.ctas}</div>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}
