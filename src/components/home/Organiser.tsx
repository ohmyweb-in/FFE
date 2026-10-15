import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import worldMap from "@/assets/world-map.png";
import arrowCircle from "@/assets/arrow-circle.svg";
import showGW from "@/assets/show-gruene-woche.jpg";
import showFL from "@/assets/show-fruit-logistica.jpg";
import showAFL from "@/assets/show-asia-fruit-logistica.jpg";
import showFLI from "@/assets/show-fruit-logistica-india.jpg";
import gwMark from "@/assets/logo-gruene-woche-mark.svg";
import gwText from "@/assets/logo-gruene-woche-text.svg";
import flLogo from "@/assets/logo-fruit-logistica.svg";
import aflLogo from "@/assets/logo-asia-fruit-logistica.png";
import fliLogo from "@/assets/logo-fruit-logistica-india.png";
import CountUp from "../CountUp";

// Mobile widths are cqw of the 385px stats row in Figma 318:2511–428:624, so they scale down on narrow phones.
const STATS = [
  { n: "1822", count: { to: 1822 }, label: "ORGANISING TRADE FAIRS SINCE", w: "w-[19.22cqw] md:w-[74px]" },
  { n: "100+", count: { to: 100, suffix: "+" }, label: "EVENTS A YEAR, IN-HOUSE AND GUEST", w: "w-[24.42cqw] md:w-[94px]" },
  {
    n: "2.8 MILLION",
    count: { to: 2.8, decimals: 1, suffix: " MILLION" },
    label: "GATHERED MORE THAN ATTENDEES AROUND THE WORLD",
    w: "w-[40.78cqw] md:w-[157px]",
    labelW: "md:w-[144px]",
  },
];

type Show = { name: string; href: string; img: StaticImageData; logo: ReactNode; logoX: number };

const SHOWS: Show[] = [
  {
    name: "Grüne Woche",
    href: "https://www.gruenewoche.de/en",
    img: showGW,
    logoX: 20,
    // Figma "Ebene_1" (359:416): mark + wordmark composed in a 94×30 box.
    logo: (
      <span className="relative block h-[30px] w-[94px]">
        <Image src={gwMark} alt="" className="absolute top-[1.33px] left-0" />
        <Image src={gwText} alt="" className="absolute top-0 left-[36.58px]" />
      </span>
    ),
  },
  { name: "Fruit Logistica", href: "https://www.fruitlogistica.com/en", img: showFL, logoX: 21, logo: <Image src={flLogo} alt="" /> },
  {
    name: "Asia Fruit Logistica",
    href: "http://www.asiafruitlogistica.com/",
    img: showAFL,
    logoX: 14,
    // Mobile logo is 55×25 (318:2715) → 88.9×40.4 before the ×0.619 zoom.
    logo: <Image src={aflLogo} alt="" sizes="213px" className="h-[40.4px] w-[88.9px] object-cover object-left md:h-[48px] md:w-[106px]" />,
  },
  {
    name: "Fruit Logistica Connect India",
    href: "https://www.fruitlogisticaindia.com/",
    img: showFLI,
    logoX: 23,
    // Mobile logo is 39.5×21.7 (318:2703) → 63.8×35.1 before the ×0.619 zoom.
    logo: <Image src={fliLogo} alt="" sizes="70px" className="h-[35.1px] w-[63.8px] object-cover md:h-[39px] md:w-[70px]" />,
  },
];

export default function Organiser() {
  return (
    <section id="organiser" className="container-page relative mt-[55px] md:mt-16 lg:mt-[75px]">
      <div className="ml-[3px] md:ml-0" data-reveal>
        <p className="eyebrow text-accent md:ml-px">ORGANISER</p>
        <h2 className="h-section mt-[18px] md:mt-[20px]">
          Led by <br className="max-md:hidden" />
          <span className="text-accent">Messe Berlin Asia Pacific</span>
        </h2>
        <p className="text-lead mt-[21px] max-w-[697px] md:mt-[24px] lg:mt-[22px] lg:ml-px">
          Messe Berlin Asia Pacific is the regional headquarters of Messe Berlin GmbH for the Asia Pacific region, headquartered in Singapore with a
          growing presence in key markets including India. It leads the development and expansion of Messe Berlin’s business across Asia, connecting
          global industries with high-growth regional opportunities.
        </p>
      </div>

      {/* Wrapper is the size container so the row's own gap can use cqw too. */}
      <div className="ml-[3px] [container-type:inline-size] md:ml-0 md:[container-type:normal]">
      <dl
        className="mt-[27px] flex items-start gap-x-[3.9cqw] md:mt-10 md:gap-x-[25px] lg:mt-[32px] lg:ml-[2px]"
        data-reveal
        style={{ "--i": 1 } as CSSProperties}
      >
        {STATS.map((s, idx) => (
          <div key={s.n} className="contents">
            {idx > 0 && <span className={`h-[93px] w-px shrink-0 bg-accent/47 md:-mr-px ${idx === 2 ? "md:mr-px" : ""}`} aria-hidden />}
            <div className={`flex shrink-0 flex-col-reverse pt-[9px] lg:pt-[6px] ${s.w}`}>
              <dt className={`trim mt-[17px] text-[3.117cqw] leading-[normal] font-medium text-body md:text-[12px] ${s.labelW ?? ""}`}>{s.label}</dt>
              <dd className="trim font-display text-[7.27cqw] leading-[normal] font-semibold tracking-[0.02em] whitespace-nowrap text-accent uppercase md:text-[28px]">
                <CountUp {...s.count} />
              </dd>
            </div>
          </div>
        ))}
      </dl>
      </div>

      {/* Mobile: full-bleed map with the tagline over its lower right (Figma 318:2286).
          ≥1440: beside the copy, ending 2px short of the viewport edge (1138:329 at x=720, w=718); narrower screens stack it so it never crosses the copy. */}
      <div className="relative mt-[36px] ml-[calc(var(--gutter)*-1)] w-screen md:mt-8 md:ml-0 md:w-auto 3xl:static 3xl:mt-0">
        <div className="3xl:absolute 3xl:top-[17px] 3xl:right-[calc((100%-100vw)/2+2px)] 3xl:mt-0 3xl:w-[718px]" data-reveal="fade">
          <Image src={worldMap} alt="" aria-hidden sizes="(min-width: 1440px) 718px, 100vw" className="aspect-[440/146] h-auto w-full object-cover md:aspect-[718/240]" />
        </div>
        <p
          className="text-lead absolute top-[95px] right-[22px] w-[172px] text-right text-[12px] md:static md:mt-4 md:w-auto md:text-[18px] 3xl:absolute 3xl:top-[231px] 3xl:right-[-2px] 3xl:mt-0 3xl:w-[172px]"
          data-reveal
        >
          Global Platforms.
          <br />
          Stronger Industries.
          <br />
          Brighter Tomorrows.
        </p>
      </div>

      {/* Line 22 (359:254): 8.88px below the stats rules (Figma 359:255 update). */}
      <div className="mt-[25px] ml-[2px] h-px bg-accent/37 md:mt-10 md:ml-0 md:w-full 3xl:mt-[8.88px]" />

      <h2 className="h-section mt-[21px] ml-px md:mt-10 md:ml-0 lg:mt-[29.12px] xl:ml-[3px]" data-reveal>
        Explore our <span className="text-accent">trade shows</span>
      </h2>
      <ShowCards />
    </section>
  );
}

/** "Explore our trade shows" cards (homepage 359:400; reused on Messe Berlin 914:1625). `className` = the list's margins. */
export function ShowCards({ className = "mt-[26px] ml-px md:mt-8 md:ml-0 lg:mt-[41px] xl:ml-[3px]" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-[8.2px] gap-y-[12.4px] md:gap-6 lg:grid-cols-4 lg:gap-[22px] ${className}`}>
      {SHOWS.map((s, idx) => (
        // Mobile cards (318:2615 etc.) are the desktop card at exactly ×0.619.
        <li key={s.name} className="[zoom:0.619] md:[zoom:1]" data-reveal style={{ "--i": idx } as CSSProperties}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener"
            aria-label={`${s.name} (opens in a new tab)`}
            className="group block rounded-[18px] transition-transform duration-(--dur-ui) ease-(--ease-out) hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            <div className="relative aspect-[305/175] overflow-hidden rounded-[18px] bg-[#d9d9d9]">
              <Image
                src={s.img}
                alt=""
                placeholder="blur"
                sizes="(min-width: 1024px) 305px, 50vw"
                className="zoom absolute inset-0 size-full object-cover"
              />
            </div>
            <div
              className="relative -mt-[31px] ml-[13.1px] flex h-[62px] w-[88.2%] items-center justify-between rounded-[18px] bg-sun pr-[12px] md:mx-auto"
              style={{ paddingLeft: s.logoX }}
            >
              {s.logo}
              <Image
                src={arrowCircle}
                alt=""
                className="shrink-0 transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:translate-x-[3px]"
              />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
