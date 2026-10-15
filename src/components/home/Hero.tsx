import Image from "next/image";
import type { CSSProperties } from "react";
import hero from "@/assets/hero.jpg";
import heroCurve from "@/assets/hero-curve.svg";
import heroCurveMobile from "@/assets/hero-curve-mobile.svg";
import sliderDots from "@/assets/slider-dots.svg";
import chevronSmBrand from "@/assets/chevron-sm-brand.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import gwMark from "@/assets/logo-gruene-woche-mark.svg";
import gwText from "@/assets/logo-gruene-woche-text.svg";
import flLogo from "@/assets/logo-fruit-logistica.svg";
import { Button, DateVenue } from "../ui";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="container-wide relative mt-[10px] md:mt-0">
      {/* Mobile = Figma 318:1796 (388×566, r20) + room for the Powered By tab. Tablet fluid. Desktop = 359:30. */}
      <div className="relative h-[660px] overflow-hidden rounded-[20px] bg-[#032919] md:h-auto md:rounded-[24px] md:bg-brand lg:h-[622px] lg:rounded-[30px]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={hero}
            alt=""
            preload
            quality={90}
            placeholder="blur"
            sizes="(min-width: 1024px) 1165px, (min-width: 768px) 100vw, 300vw"
            className="absolute top-[0.035%] left-[-10.03%] h-[103.15%] w-[294.12%] max-w-none object-cover md:inset-0 md:size-full lg:inset-auto lg:top-[-0.03%] lg:left-[16.51%] lg:h-[105.31%] lg:w-[83.52%]"
          />
        </div>
        {/* Mobile (318:1797 / 318:1798): pale then brand green, opaque at the left edge. */}
        <div className="absolute inset-0 bg-linear-to-l from-[#e5f4da]/0 to-[#e5f4da] md:hidden" />
        <div className="absolute inset-0 bg-linear-to-l from-brand/0 to-brand md:hidden" />
        {/* Tablet. */}
        <div className="absolute inset-0 hidden bg-linear-to-b from-brand from-35% via-brand/85 to-brand/65 md:block lg:hidden" />
        {/* Desktop (359:31 / 359:32): brand-green fades over the photo's left edge. */}
        <div className="absolute inset-y-0 -ml-[3px] left-[16.34%] hidden w-[38.57%] bg-linear-to-l from-brand/0 to-brand lg:block" />
        <div className="absolute inset-y-0 -ml-[3px] left-[16.34%] hidden w-[65.88%] bg-linear-to-l from-brand/0 to-brand lg:block" />

        <div className="container-page relative pt-[51px] text-white md:pt-10 md:pb-[141px] lg:pt-[90px] lg:pb-0">
          <p className="eyebrow load-in max-w-[200px] md:max-w-none" style={i(0)}>
            Fresh PEOPLE.&nbsp; bRIGHTER POSSIBILITIES.
          </p>
          <h1
            className="load-in mt-[22px] max-w-[285px] font-display text-[30px] leading-[35px] font-semibold tracking-[0.02em] uppercase md:max-w-none md:text-[44px] md:leading-[1.08] lg:mt-[31px] lg:text-[50px] lg:leading-[53px] lg:whitespace-nowrap"
            style={i(1)}
          >
            <span className="block md:inline lg:block">Asia pacific’s </span>
            <span className="lg:block">premier trade fair </span>
            <span className="lg:block">
              for <br className="md:hidden" />
              fresh food
            </span>
          </h1>
          <p
            className="load-in mt-[23px] max-w-[239px] text-[17px] leading-[normal] tracking-[0.02em] md:mt-[22px] md:max-w-[610px] md:text-[22px] md:leading-[31px] lg:mt-[31px]"
            style={i(2)}
          >
            {/* Copy differs between the Figma mobile (318:1801) and desktop (359:39) frames. */}
            <span className="md:hidden">Connecting fresh food technologies, logistics, and distribution from farm to fork</span>
            <span className="hidden md:inline">Connecting Fresh Food, Technology, Logistics & Distribution From Farm to Fork</span>
          </p>
          <DateVenue date="16-18 Nov. 2027" className="load-in mt-[22px] md:mt-[28px]" style={i(3)} />

          {/* Mobile CTAs (318:1811): stacked, Apply first as the solid pill. */}
          <div className="load-in mt-[18px] flex flex-col items-start gap-[11px] md:hidden" style={i(4)}>
            <Button href="/apply-to-exhibit" chevron={chevronSmBrand} w={162} h={40} pl={19} gap={12} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 7, fs: 15 }} className="bg-white text-[#31a834]">
              Apply To Exhibit
            </Button>
            <Button href="/register-to-visit" chevron={chevronSmWhite} w={200} h={40} pl={19} gap={12} fs={15} m={{ w: 202, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-white text-white">
              Register Your Interest
            </Button>
          </div>
          <div className="load-in mt-[28px] hidden flex-wrap gap-[13px] md:flex" style={i(4)}>
            <Button href="/register-to-visit" chevron={chevronSmBrand} w={200} h={40} pl={19} gap={12} fs={15} className="border border-white bg-white text-brand">
              Register Your Interest
            </Button>
            <Button href="/apply-to-exhibit" chevron={chevronSmWhite} w={162} h={40} pl={19} gap={12} fs={15} className="border border-white text-white hover:bg-white/10">
              Apply To Exhibit
            </Button>
            <Button href="/subscribe" chevron={chevronSmWhite} w={162} h={40} pl={19} gap={14} fs={15} className="border border-white text-white hover:bg-white/10">
              Stay Connected
            </Button>
          </div>
        </div>

        {/* Powered by (1138:145, 266×109): white tab in the card’s bottom-right corner. */}
        <div className="load-in absolute right-0 bottom-0 w-[266px] rounded-tl-[30px] bg-white pt-[27px] pb-[19px] pl-[31px]" style={i(5)}>
          <p className="font-display text-[20px] leading-[normal] font-semibold text-[#00966f] uppercase">Powered By:</p>
          <div className="mt-[19px] flex items-center gap-[29px]">
            <span className="relative block h-[30px] w-[94px] shrink-0" role="img" aria-label="Grüne Woche">
              <Image src={gwMark} alt="" className="absolute top-[1.33px] left-0" />
              <Image src={gwText} alt="" className="absolute top-0 left-[36.58px]" />
            </span>
            <Image src={flLogo} alt="Fruit Logistica" className="mt-px shrink-0" />
          </div>
        </div>

        {/* Decorative slider indicator (single slide in the design; not in the mobile frame). */}
        <Image src={sliderDots} alt="" aria-hidden className="absolute bottom-[20px] left-1/2 hidden -translate-x-1/2 md:block lg:bottom-[34px]" />
      </div>
      <Image src={heroCurveMobile} alt="" aria-hidden className="pointer-events-none absolute top-[588px] left-[-3px] max-w-none md:hidden" />
      <Image src={heroCurve} alt="" aria-hidden className="pointer-events-none absolute top-[441px] left-[-21px] hidden max-w-none lg:block" />
    </section>
  );
}
