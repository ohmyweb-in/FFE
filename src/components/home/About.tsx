import Image from "next/image";
import about from "@/assets/about-hall.jpg";
import aboutCurve from "@/assets/about-curve.svg";
import aboutCurveMobile from "@/assets/about-curve-mobile.svg";
import chevronAccent from "@/assets/chevron-accent.svg";
import chevronInk from "@/assets/chevron-ink.svg";
import { Button, crop } from "../ui";

export default function About() {
  return (
    <section id="about" className="container-page mt-[35px] flex flex-col gap-[33px] md:mt-14 md:gap-12 lg:mt-[70.39px] lg:flex-row lg:justify-between lg:gap-10">
      <div className="min-w-0 lg:basis-[586px] lg:pt-[18.61px]" data-reveal>
        <h2 className="h-section max-w-[295px] md:max-w-[549px]">
          <span className="md:block">About </span>
          <span className="text-accent md:block">Fresh Food Expo APAC</span>
        </h2>
        <p className="text-lead mt-[24px] ml-[2px] max-w-[586px] md:mt-[28px] md:ml-0 lg:mt-[38px]">
          Fresh Food Expo APAC is a premier B2B trade fair connecting fresh food with the technologies, logistics and
          distribution solutions that help preserve quality, maintain freshness and move products efficiently to market.
          <br />
          <br />
          Building on the global expertise and industry network behind FRUIT LOGISTICA, Fresh Food Expo APAC brings
          together fresh food, agri and fresh technology, logistics and distribution within one regional platform
        </p>
        <div className="mt-[18px] flex flex-wrap gap-[7px] md:mt-[32px] md:gap-[12px] lg:ml-px">
          <Button
            href="/about"
            chevron={chevronAccent}
            w={220}
            h={52}
            pl={24}
            gap={17.66}
            m={{ w: 197, h: 43, pl: 27, gap: 8, fs: 15, chev: 0.828 }}
            className="border-[1.5px] border-accent bg-mint text-accent"
          >
            Discover The Expo
          </Button>
          <Button
            href="/our-story"
            chevron={chevronInk}
            w={172}
            h={52}
            pl={37}
            gap={17.66}
            m={{ w: 129, h: 43, pl: 23, gap: 8, fs: 15, chev: 0.828 }}
            className="border-[1.5px] border-ink bg-[#f4f6f4] text-ink md:bg-transparent"
          >
            Our Story
          </Button>
        </div>
      </div>

      <div className="relative w-full min-w-0 shrink lg:mr-[1.2px] lg:basis-[559.7px]" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        {/* Mobile curve (318:1869) bleeds to both screen edges; desktop curve (359:76). */}
        <Image src={aboutCurveMobile} alt="" aria-hidden className="pointer-events-none absolute top-[-6.3px] left-[-25.6px] max-w-none md:hidden" />
        <Image src={aboutCurve} alt="" aria-hidden className="pointer-events-none absolute top-[-25.38px] left-[-100.23px] hidden max-w-none xl:block" />
        <div className="relative aspect-[388/296] overflow-hidden rounded-[18.2px] bg-[#d9d9d9] md:aspect-[559.7/425.6] md:rounded-[30.47px] md:rounded-bl-none">
          <Image
            src={about}
            alt="Visitors filling a market hall with Norwegian and Swedish stands at a Messe Berlin trade fair"
            placeholder="blur"
            sizes="(min-width: 1024px) 750px, 134vw"
            // Fill 159.81% × 121.2% at (−34.54%, −7.91%): the photo’s true ratio.
            style={crop(159.81, 121.2, -34.54, -7.91)}
          />
        </div>
      </div>
    </section>
  );
}
