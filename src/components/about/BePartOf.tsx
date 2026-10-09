import Image from "next/image";
import type { CSSProperties } from "react";
import venue from "@/assets/join.jpg";
import calendar from "@/assets/about/icon-calendar.svg";
import pin from "@/assets/about/icon-pin.svg";
import leaf from "@/assets/about/leaf-join.svg";
import { Pill } from "../ui";

const DETAILS = [
  { icon: calendar, text: "16–18 November 2027" },
  { icon: pin, text: "Sands Expo & Convention Centre, Singapore" },
];

/** Figma 736:2481: 1280×488 panel; venue collage on the right from xl. */
export default function BePartOf() {
  return (
    <section className="untrim container-narrow mt-[46px]">
      <div className="relative overflow-hidden rounded-[24px] bg-linear-to-r from-mint to-page lg:rounded-[32px] xl:min-h-[488px]">
        {/* Collage (736:2503), anchored to the panel's right edge. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[527px] xl:block" aria-hidden>
          <div className="absolute top-0 right-0 h-[321.983px] w-[380.525px] rounded-tl-[292.711px] bg-accent" />
          <div className="absolute top-[64px] right-0 h-[424.431px] w-[526.88px] overflow-hidden rounded-tl-[46.834px] rounded-tr-[263.44px] rounded-bl-[292.711px] bg-linear-to-b from-mint to-[#c2e3c3]">
            <Image src={venue} alt="" placeholder="blur" sizes="527px" className="size-full object-cover" />
          </div>
          <div className="absolute top-[399.55px] right-[271.85px] h-[102.449px] w-[175.627px] rounded-t-[102.449px] bg-[rgb(40_174_61/0.9)]" />
        </div>
        <Image src={leaf} alt="" aria-hidden className="pointer-events-none absolute top-[307px] left-[496px] hidden h-[186.432px] w-[343.222px] max-w-none xl:block" />

        <div className="relative px-[24px] pt-[36px] pb-[36px] lg:px-[52px] lg:pt-[48px] lg:pb-[48px] xl:max-w-[620px] xl:pr-0" data-reveal>
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Join us</p>
          <h2 className="mt-[12px] font-display text-[30px] leading-[36px] font-semibold text-forest lg:text-[34px] lg:leading-[40px]">
            Be part of <span className="text-accent">Fresh Food Expo APAC</span>
          </h2>
          <div className="mt-[12px] flex flex-col gap-[10px] text-[15px] leading-[21px] font-medium text-body">
            <p>Connect with the businesses, technologies and decision-makers shaping the future of fresh food across Asia Pacific.</p>
            <p>
              Whether you are looking to showcase your solutions, source new products, enter new markets or build regional partnerships, Fresh Food Expo
              APAC brings the fresh food ecosystem together in Singapore.
            </p>
          </div>
          <ul className="mt-[33px] flex flex-col gap-[16px]">
            {DETAILS.map((d) => (
              <li key={d.text} className="flex items-center gap-[12px] text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
                <Image src={d.icon} alt="" className="size-[24px] shrink-0" />
                {d.text}
              </li>
            ))}
          </ul>
          <div className="mt-[24px] flex flex-col items-stretch gap-[12px] sm:flex-row sm:items-start sm:gap-[14px]">
            <Pill href="/apply-to-exhibit" className="bg-accent text-white">
              Apply to Exhibit
            </Pill>
            <Pill href="/register-to-visit" className="border-[1.5px] border-accent text-accent hover:bg-mint">
              Register to Visit
            </Pill>
          </div>
        </div>

        {/* Below xl the venue photo sits under the copy (mobile frame 453:5724). */}
        <div className="relative h-[200px] md:h-[280px] xl:hidden" data-reveal style={{ "--i": 1 } as CSSProperties}>
          <Image src={venue} alt="" aria-hidden placeholder="blur" sizes="100vw" className="size-full object-cover" />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-mint to-mint/0" />
        </div>
      </div>
    </section>
  );
}
