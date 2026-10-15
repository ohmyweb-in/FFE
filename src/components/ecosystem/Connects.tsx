import Image, { type StaticImageData } from "next/image";
import { Fragment, type CSSProperties } from "react";
import robotics from "@/assets/ecosystem/robotics.jpg";
import robotArm from "@/assets/ecosystem/robot-arm.jpg";
import dots from "@/assets/ecosystem/dots.svg";
import arrow from "@/assets/ecosystem/arrow-sm.svg";
import sprout from "@/assets/ecosystem/step-sprout.svg";
import factory from "@/assets/ecosystem/step-factory.svg";
import boxIcon from "@/assets/ecosystem/step-box.svg";
import warehouse from "@/assets/ecosystem/step-warehouse.svg";
import cart from "@/assets/ecosystem/step-cart.svg";
import { box } from "../ui";

const M = (l: number, t: number, w: number, h: number) => box(472, 360, l, t, w, h);

const STEPS: { label: string; icon: StaticImageData }[] = [
  { label: "Grow & Produce", icon: sprout },
  { label: "Process & Preserve", icon: factory },
  { label: "Package", icon: boxIcon },
  { label: "Move & Distribute", icon: warehouse },
  { label: "Market & Consume", icon: cart },
];

/** Figma 450:4049: copy + 472×360 collage, then the five-step journey (14px arrows, 10px gaps). */
export default function Connects() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col gap-[40px] lg:mt-[67px]">
      <div className="flex flex-col gap-[32px] xl:flex-row xl:items-center xl:gap-[48px]">
        <div className="flex flex-col items-start gap-[14px] xl:w-[760px] xl:shrink-0" data-reveal>
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">The bigger picture</p>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[42px] lg:leading-[48px]">
            Where the ecosystem connects
          </h2>
          <div className="flex flex-col gap-[12px] text-[15px] leading-[23px] font-medium text-body">
            <p>
              Fresh food quality depends on every <b className="font-semibold">interconnected industries</b> that follows the product from source to
              market.
            </p>
            <p className="max-w-[715px]">
              Fresh Food Expo APAC brings these interconnected industries together — providing a platform where fresh food suppliers, technology
              providers, logistics operators, distributors and buyers can discover new opportunities across the wider ecosystem.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-[10px] aspect-[472/360] w-full max-w-[472px] xl:mx-0 xl:mt-0 xl:max-w-none xl:min-w-0 xl:flex-1" data-reveal style={{ "--i": 1 } as CSSProperties}>
          <div className="rounded-tl-[140px] rounded-tr-[140px] rounded-br-[20px] rounded-bl-[140px] bg-accent" style={M(212, -10, 280, 200)} />
          <Image src={dots} alt="" aria-hidden className="max-w-none" style={M(20, 230, 61, 61)} />
          <div className="group overflow-hidden rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] bg-linear-to-b from-mint to-[#c2e3c3]" style={M(110, 40, 362, 300)}>
            {/* Fill: 140.63% wide from the left edge → cover, left-aligned. */}
            <Image src={robotics} alt="Exhibitors talking beside a robotics demo stand" placeholder="blur" sizes="(min-width: 1280px) 362px, 77vw" className="zoom size-full object-cover object-left" />
          </div>
          <div className="group overflow-hidden rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] bg-linear-to-b from-mint to-[#c2e3c3]" style={M(39, 29.68, 210, 190)}>
            {/* Fill: 159.26% tall at −9.31% → cover, 15.7% down. */}
            <Image src={robotArm} alt="Robot arm picking tomatoes from a green wall" placeholder="blur" sizes="(min-width: 1280px) 210px, 45vw" className="zoom size-full object-cover object-[50%_15.7%]" />
          </div>
        </div>
      </div>

      <ol className="flex flex-col items-center gap-[10px] lg:flex-row">
        {STEPS.map((s, idx) => (
          <Fragment key={s.label}>
            {idx > 0 && <Image src={arrow} alt="" aria-hidden className="shrink-0 rotate-90 lg:rotate-0" />}
            <li
              className="flex w-full max-w-[320px] items-center gap-[12px] rounded-full bg-white py-[10px] pr-[16px] pl-[10px] drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)] lg:max-w-none lg:min-w-0 lg:flex-1"
              data-reveal
              style={{ "--i": idx } as CSSProperties}
            >
              <span className="grid size-[48px] shrink-0 place-items-center rounded-full border-[1.5px] border-accent bg-page">
                <Image src={s.icon} alt="" />
              </span>
              <span className="min-w-0 flex-1 text-[15px] leading-[20px] font-semibold text-forest">{s.label}</span>
            </li>
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
