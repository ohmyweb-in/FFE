import Image from "next/image";
import type { CSSProperties } from "react";
import hero from "@/assets/programme/hero.jpg";
import curve from "@/assets/programme/hero-curve.svg";
import chevronSmBrand from "@/assets/chevron-sm-brand.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import { Button } from "../ui";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Figma 736:3490: 1395×368 panel (r30), 538 + 992px fades, SVG corner curve. */
export default function ProgrammeHero() {
  return (
    <section id="top" className="container-wide relative mt-[10px] md:mt-0">
      <div className="relative overflow-hidden rounded-[20px] bg-brand md:rounded-[24px] lg:h-[368px] lg:rounded-[30px]">
        <Image
          src={hero}
          alt=""
          aria-hidden
          preload
          quality={90}
          placeholder="blur"
          sizes="(min-width: 1024px) 1063px, 100vw"
          className="absolute inset-0 size-full max-w-none object-cover lg:top-[-19.09%] lg:left-[23.81%] lg:h-[138.19%] lg:w-[76.19%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand from-35% via-brand/85 to-brand/65 lg:hidden" />
        <div className="absolute inset-y-0 -ml-[3px] left-[16.4%] hidden w-[38.57%] bg-linear-to-l from-brand/0 to-brand lg:block" />
        <div className="absolute inset-y-0 -ml-[3px] left-[16.41%] hidden w-[71.11%] bg-linear-to-l from-brand/0 to-brand lg:block" />
        <Image
          src={curve}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-[188px] left-0 hidden h-[184.316px] w-[230.216px] max-w-none lg:block"
        />

        <div className="container-page relative pt-[48px] pb-[56px] text-white md:pt-12 md:pb-16 lg:pt-[61px] lg:pb-0 lg:pl-[20px]">
          <p className="eyebrow load-in" style={i(0)}>
            Conference agenda
          </p>
          <h1
            className="load-in mt-[22px] max-w-[742px] font-display text-[30px] leading-[35px] font-semibold tracking-[0.02em] uppercase md:text-[44px] md:leading-[1.08] lg:mt-[29px] lg:text-[50px] lg:leading-[53px]"
            style={i(1)}
          >
            Fresh Food Expo APAC 2027 <br className="hidden lg:block" />
            Conference Programme
          </h1>
          <p
            className="load-in mt-[22px] max-w-[645px] text-[17px] leading-[25px] font-medium [text-box:normal] md:text-[18px] lg:mt-[33px]"
            style={i(2)}
          >
            Discover the conversations shaping the future of fresh food across Asia Pacific.
          </p>
          <div className="load-in mt-[24px] flex flex-col items-start gap-[11px] md:flex-row md:flex-wrap md:gap-[13px] lg:mt-[29px]" style={i(3)}>
            <Button
              href="/register-to-visit"
              chevron={chevronSmBrand}
              w={160}
              h={40}
              pl={19}
              gap={6}
              fs={15}
              m={{ w: 178, h: 43, pl: 25, gap: 7, fs: 15 }}
              className="border border-white bg-white text-brand"
            >
              Register to Visit
            </Button>
            <Button
              href="/plan-your-visit"
              chevron={chevronSmWhite}
              w={155.29}
              h={40}
              pl={18.29}
              gap={6.4}
              fs={15}
              m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }}
              className="border border-white text-white hover:bg-white/10"
            >
              Plan Your Visit
            </Button>
            <Button
              href="/subscribe"
              chevron={chevronSmWhite}
              w={162}
              h={40}
              pl={19}
              gap={14}
              fs={15}
              m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }}
              className="border border-white text-white hover:bg-white/10"
            >
              Stay Connected
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
