import Image from "next/image";
import type { CSSProperties } from "react";
import fruitCups from "@/assets/ecosystem/fruit-cups.jpg";
import dots from "@/assets/ecosystem/dots.svg";
import { box } from "../ui";

const M = (l: number, t: number, w: number, h: number) => box(472, 360, l, t, w, h);

/** Figma 793:4477: 472×360 collage, 48px gap, 760px copy column. */
export default function Intro() {
  return (
    <section className="untrim container-narrow mt-[40px] flex flex-col gap-[32px] lg:mt-[40.32px] xl:flex-row xl:items-center xl:gap-[48px]">
      <div className="relative mx-auto aspect-[472/360] w-full max-w-[472px] xl:mx-0 xl:max-w-none xl:min-w-0 xl:flex-1" data-reveal>
        <div className="rounded-tl-[140px] rounded-tr-[40px] rounded-br-[20px] rounded-bl-[140px] bg-accent" style={M(122, 24, 261, 166)} />
        <div className="group overflow-hidden rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] bg-linear-to-b from-mint to-[#c2e3c3]" style={M(0, 40, 362, 300)}>
          {/* Fill: 135.91% wide from the left edge → cover, left-aligned. */}
          <Image
            src={fruitCups}
            alt="Cups of cut kiwi, pineapple and strawberries on a chilled shelf"
            placeholder="blur"
            sizes="(min-width: 1280px) 362px, 77vw"
            className="zoom size-full object-cover object-left"
          />
        </div>
        <Image src={dots} alt="" aria-hidden className="max-w-none" style={M(331, 228, 61, 61)} />
      </div>

      <div className="flex flex-col items-start gap-[25px] xl:w-[760px] xl:shrink-0" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[42px] lg:leading-[48px]">
          The <span className="text-accent">fresh food industry</span> depends on more than the product itself
        </h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[23px] font-medium text-body">
          <p className="max-w-[684px]">
            Maintaining freshness, quality and availability requires{" "}
            <b className="font-bold">technologies, cold chain infrastructure, logistics networks, packaging, storage and efficient distribution.</b>
          </p>
          <p className="max-w-[715px]">
            Fresh Food Expo APAC brings these interconnected parts of the value chain together within one dedicated B2B platform, creating opportunities
            for businesses to discover solutions, meet partners and build commercial relationships across Asia Pacific.
          </p>
        </div>
      </div>
    </section>
  );
}
