import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import join from "@/assets/join.jpg";
import chevronBrand from "@/assets/chevron-brand.svg";
import chevronWhite from "@/assets/chevron-white.svg";
import { Button, DateVenue } from "../ui";

type Props = {
  /** Section margins + phone/desktop height. */
  layout?: string;
  /** Optional line above the title (Our Story: eyebrow + rule). */
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Extra title classes (e.g. a wider max-width). */
  titleCls?: string;
  /** Desktop crop of the venue photo (Figma fill box). */
  imgCls?: string;
  /** `false` drops the paragraph (Who Should Visit). */
  lead?: ReactNode | false;
  /** Desktop content offsets: wrapper padding, lead gap, date block margins. */
  inner?: string;
  leadMt?: string;
  dateCls?: string;
  /** `false` = venue row only. */
  date?: string | false;
  /** Replaces the homepage's two 220×52 CTAs (SIAW uses the hero's three 40px pills). */
  ctas?: ReactNode;
};

export default function JoinBanner({
  layout = "mt-[53px] h-[760px] md:mt-16 lg:mt-[62px] lg:h-[495px]",
  eyebrow,
  title,
  titleCls = "",
  imgCls = "lg:top-[-20.74%] lg:left-[23.7%] lg:h-[141.71%] lg:w-[78.64%]",
  lead,
  inner = "lg:pt-[63px] lg:pb-[62px]",
  leadMt = "lg:mt-[37px]",
  dateCls = "mt-[25px] md:mt-[34px] lg:ml-[2px]",
  date,
  ctas,
}: Props) {
  return (
    <section className={`container-wide relative overflow-hidden rounded-[20px] bg-[#032919] [--gutter:18px] md:h-auto md:rounded-[24px] md:bg-brand md:[--gutter:32px] lg:rounded-[30px] ${layout}`}>
      <Image
        src={join}
        alt=""
        aria-hidden
        placeholder="blur"
        sizes="(min-width: 1024px) 1100px, 100vw"
        className={`absolute inset-0 size-full object-cover lg:inset-auto lg:max-w-none ${imgCls}`}
      />
      {/* Mobile (318:2032 / 318:2033): pale then brand green, opaque at the top. */}
      <div className="absolute inset-0 bg-linear-to-b from-[#e5f4da] to-[#e5f4da]/0 md:hidden" />
      <div className="absolute inset-0 bg-linear-to-b from-brand to-brand/0 md:hidden" />
      {/* Tablet. */}
      <div className="absolute inset-0 hidden bg-linear-to-b from-brand from-40% via-brand/85 to-brand/50 md:block lg:hidden" />
      {/* Desktop (359:481): green fade over the photo's left edge. */}
      <div className="absolute inset-y-0 -ml-[3px] left-[23.66%] hidden w-[51.9%] bg-linear-to-l from-brand/0 to-brand lg:block" />

      <div className={`container-page relative pt-[48px] text-white md:pt-12 md:pb-12 ${inner}`}>
        <div data-reveal>
          {eyebrow}
          <h2 className={`h-section max-w-[354px] leading-[38.2px] text-white md:max-w-[566px] md:leading-[1.09] lg:leading-[52.2px] ${titleCls}`}>
            {title ?? (
              <>
                <span className="md:block">Join Asia Pacific’s </span>
                <span className="md:block">Fresh Food Ecosystem</span>
              </>
            )}
          </h2>
          {lead !== false && (
            <p className={`text-lead mt-[26px] max-w-[330px] leading-[24px] md:mt-[28px] md:max-w-[579px] md:leading-[normal] ${leadMt}`}>
              {lead ??
                "Connect with the fresh food suppliers, technologies, logistics solutions and decision-makers shaping how fresh food is preserved, moved and brought to market across Asia Pacific."}
            </p>
          )}
        </div>
        <div data-reveal style={{ "--i": 1 } as CSSProperties}>
          <DateVenue date={date} className={dateCls} />
          {ctas ?? (
            <div className="mt-[23px] flex flex-col items-start gap-[11px] md:mt-[26px] md:flex-row md:flex-wrap md:gap-[10px]">
              <Button
                href="/apply-to-exhibit"
                chevron={chevronBrand}
                w={220}
                h={52}
                pl={34}
                gap={17.66}
                m={{ w: 178, h: 43, pl: 25, gap: 7, fs: 15, chev: 0.828 }}
                className="bg-white text-[#31a834] md:text-brand"
              >
                Apply To Exhibit
              </Button>
              <Button
                href="/register-to-visit"
                chevron={chevronWhite}
                w={255}
                h={52}
                pl={31}
                gap={13.66}
                m={{ w: 202, h: 43, pl: 25, gap: 9, fs: 15, chev: 0.828 }}
                className="border border-white text-white hover:bg-white/10"
              >
                Register Your Interest
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
