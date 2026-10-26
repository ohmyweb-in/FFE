import Image from "next/image";
import type { CSSProperties } from "react";
import users from "@/assets/apply/i-users.svg";
import chart from "@/assets/apply/i-chart.svg";
import globe from "@/assets/apply/i-globe.svg";
import megaphone from "@/assets/apply/i-megaphone.svg";
import calendar from "@/assets/apply/icon-calendar.svg";
import pin from "@/assets/apply/icon-pin.svg";
import dots from "@/assets/contact/dots.svg";
import venue from "@/assets/about/produce.jpg";
import ApplyForm from "./ApplyForm";

const EMAIL = "exhibitor@freshfoodexpoapac.com";

const WHY = [
  { icon: users, title: "Meet new buyers", text: "Connect with importers, distributors, retailers and sourcing professionals." },
  { icon: chart, title: "Generate quality leads", text: "Build face-to-face relationships and explore new business opportunities." },
  { icon: globe, title: "Expand into new markets", text: "Connect with partners across Asia Pacific and global markets." },
  { icon: megaphone, title: "Increase brand visibility", text: "Showcase your products and solutions to a highly targeted audience." },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Heading with the 36×2 accent rule, 16px after the text. */
function RuleHeading({ className, children }: { className: string; children: string }) {
  return (
    <h2 className="flex items-center gap-[16px]">
      <span className={`font-display font-semibold text-accent ${className}`}>{children}</span>
      <span className="h-[2px] w-[36px] shrink-0 rounded-[1px] bg-accent" aria-hidden />
    </h2>
  );
}

/**
 * Figma 781:1521: 1360px row (40px sides at 1440), form card (flex-1) + 420px "Why Exhibit" panel, 24px apart.
 * Below xl the panel drops under the form at full width.
 */
export default function Enquiry() {
  return (
    <section id="enquiry" className="untrim mx-auto mt-[32px] flex w-[min(1360px,100%-2*var(--gutter))] flex-col gap-[24px] md:mt-[40px] lg:mt-[45px] max-[359px]:w-[min(1360px,100%-32px)] xl:flex-row xl:items-stretch">
      <div className="min-w-0 flex-1 rounded-[24px] bg-white px-[22px] py-[32px] max-[359px]:px-[16px] md:rounded-[28px] md:p-[40px]" data-reveal>
        <div className="mb-[20px]">
          <RuleHeading className="text-[28px] leading-[34px] md:text-[34px] md:leading-[40px]">Enquiry Form</RuleHeading>
        </div>
        <ApplyForm />
      </div>

      {/* Why Exhibit (781:1603). Bottom padding = Figma's 16px + the room the frame leaves for the dots and collage (489 total).
          lg–xl (full-width panel): the collage sits beside the event details instead of below them. */}
      <aside
        className="relative flex flex-col gap-[26px] overflow-hidden rounded-[24px] bg-linear-to-b from-mint to-[#eef6ef] px-[22px] pt-[32px] pb-[489px] md:rounded-[28px] lg:pb-[190px] xl:pb-[489px] md:px-[30px] md:pt-[36px] xl:w-[420px] xl:shrink-0 xl:self-start"
        data-reveal
        style={i(1)}
      >
        <RuleHeading className="text-[24px] leading-[30px]">Why Exhibit?</RuleHeading>

        <ul className="grid gap-[26px] md:grid-cols-2 md:gap-x-[32px] xl:grid-cols-1">
          {WHY.map((w) => (
            <li key={w.title} className="group flex items-start gap-[18px]">
              <span className="flex size-[68px] shrink-0 items-center justify-center rounded-full bg-mint transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:-translate-y-[3px]">
                <Image src={w.icon} alt="" className="size-[34px]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[6px] pt-[2px] leading-[22px]">
                <span className="text-[17px] font-semibold text-[#032919]">{w.title}</span>
                <span className="text-[15px] font-medium text-body">{w.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <hr className="h-px w-full border-0 bg-[#c2e3c3]" />

        <h3 className="text-[22px] leading-[28px] font-semibold text-accent">Event Details</h3>

        {/* Details (781:1647): 24px icons, 12px gap, 18/23 medium, rows 14px apart. Email row keeps Figma's pin icon. */}
        <ul className="flex flex-col gap-[14px] text-[17px] leading-[23px] font-medium text-black md:text-[18px]">
          <li className="flex items-center gap-[12px]">
            <Image src={calendar} alt="" className="size-[24px] shrink-0" />
            16–18 November 2027
          </li>
          <li className="flex items-center gap-[12px]">
            <Image src={pin} alt="" className="size-[24px] shrink-0" />
            <span>
              Sands Expo &amp; Convention <br />
              Centre, Singapore
            </span>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className="tap-y flex items-center gap-[12px] max-[389px]:gap-[8px] transition-colors duration-(--dur-ui) hover:text-accent">
              <Image src={pin} alt="" className="size-[24px] shrink-0" />
              {/* One line on phones (15px, 14px + tighter gap under 390px); wraps only if it truly can’t fit. */}
              <span className="min-w-0 [overflow-wrap:anywhere] max-md:text-[15px] max-[389px]:text-[14px]!">{EMAIL}</span>
            </a>
          </li>
        </ul>

        {/* Deco · Dots (786:3658) at (−3, 736.68) of the 1184px panel, anchored to the bottom. */}
        <Image src={dots} alt="" aria-hidden className="pointer-events-none absolute bottom-[372.32px] left-[-3px] size-[75px] lg:max-xl:right-[348px] lg:max-xl:bottom-[300px] lg:max-xl:left-auto" />

        {/* Collage (786:3700): 360×343, flush with the panel's right and bottom edges. */}
        <div className="pointer-events-none absolute right-0 bottom-[0.32px] h-[343px] w-[360px] max-w-full" aria-hidden data-reveal="fade">
          <div className="absolute top-0 right-0 h-[220px] w-[260px] rounded-tl-[200px] bg-accent" />
          <div className="absolute top-[40px] right-0 h-[290px] w-[360px] overflow-hidden rounded-tl-[32px] rounded-tr-[180px] rounded-bl-[200px] bg-linear-to-b from-mint to-[#c2e3c3]">
            <Image src={venue} alt="" placeholder="blur" sizes="360px" className="size-full object-cover" />
          </div>
          <div className="absolute top-[273px] left-[44px] h-[70px] w-[120px] rounded-t-[70px] bg-[rgb(40_174_61/0.9)]" />
        </div>
      </aside>
    </section>
  );
}
