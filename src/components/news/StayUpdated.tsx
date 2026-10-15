import Image from "next/image";
import type { ReactNode } from "react";
import venue from "@/assets/join.jpg";
import sprig from "@/assets/news/leaf-sprig.png";
import dots from "@/assets/news/dots.svg";
import { Pill } from "../ui";

type Props = { eyebrow?: string; title?: ReactNode; copy?: string; mt?: string };

/**
 * Figma 736:3212 (News) / 736:3747 (Programme): 1360×327 panel — 760px content column,
 * 600px photo with a 200px top-left curve. Defaults are the News copy.
 */
export default function StayUpdated({
  eyebrow = "Stay updated",
  title = (
    <>
      Join the <span className="text-accent">FFE APAC</span> community
    </>
  ),
  copy = "Subscribe to receive the latest news, programme announcements, industry insights and opportunities.",
  mt = "mt-[40px] lg:mt-[41px]",
}: Props) {
  return (
    <section className={`untrim mx-auto w-[min(1360px,100%-2*var(--gutter))] ${mt}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-[24px] bg-linear-to-r from-mint to-page lg:block lg:min-h-[327px] lg:rounded-[32px]" data-reveal>
        <div className="relative px-[24px] pt-[36px] pb-[32px] lg:w-[760px] lg:max-w-[calc(100%-440px)] lg:pt-[52px] lg:pr-[40px] lg:pb-[48px] lg:pl-[56px] xl:max-w-[calc(100%-600px)]">
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">{eyebrow}</p>
          <h2 className="mt-[16px] font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]">
            {title}
          </h2>
          <p className="mt-[16px] text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
            {copy}
          </p>
          <div className="mt-[24px] lg:mt-[24px]">
            <Pill href="/subscribe" className="bg-accent text-white">
              Subscribe Now
            </Pill>
          </div>
          {/* image 86 (736:3220): 93×89 sprig rotated -34.04° in a 126.9×125.8 box at (705.1, 8.31). */}
          <span className="pointer-events-none absolute top-[8.31px] left-[705.1px] hidden h-[125.81px] w-[126.885px] items-center justify-center min-[1424px]:flex" aria-hidden>
            <Image src={sprig} alt="" sizes="93px" className="h-[89px] w-[93px] max-w-none rotate-[-34.04deg] object-cover" />
          </span>
        </div>

        <div className="relative order-2 h-[220px] overflow-hidden md:h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[440px] lg:rounded-tl-[200px] xl:w-[600px]">
          <div className="absolute inset-0 bg-linear-to-b from-mint to-[#c2e3c3]" />
          <Image src={venue} alt="" aria-hidden placeholder="blur" sizes="(min-width: 1280px) 600px, (min-width: 1024px) 440px, 100vw" className="zoom absolute inset-0 size-full object-cover" />
        </div>
        <Image src={dots} alt="" aria-hidden className="pointer-events-none absolute top-[247px] right-[585px] hidden h-[47px] w-[75px] xl:block" />
      </div>
    </section>
  );
}
