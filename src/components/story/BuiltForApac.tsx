import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import chevronDown from "@/assets/story/chevron-down.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import { Button } from "../ui";
import RuleEyebrow from "./RuleEyebrow";

type Item = { title: string; body: string; cta?: ReactNode; tight?: boolean };

// Figma 777:600 only has copy for the first item; the other two use client-supplied copy.
const ITEMS: Item[] = [
  {
    title: "Part of Singapore International Agri-Food Week",
    body: "Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW), Singapore’s premier agri-food convention and flagship platform for advancing sustainable and resilient food systems in Asia.",
    cta: (
      <Button href="https://sginternationalagrifoodweek.com.sg/" chevron={chevronSmWhite} w={135} h={40} pl={22} gap={9.39} fs={15} className="border border-accent bg-accent text-white">
        SIAW 2027
      </Button>
    ),
    // Figma fixes this item at 187px, 8px less than its content: the button sits 15px (not 22) above the divider.
    tight: true,
  },
  {
    title: "Built on Global Industry Expertise",
    body: "Fresh Food Expo APAC is brought to you by Messe Berlin Asia Pacific, the organiser behind FRUIT LOGISTICA and Grüne Woche.",
    cta: (
      <Button href="/messe-berlin" chevron={chevronSmWhite} w={128} h={40} pl={22} gap={9.39} fs={15} className="border border-accent bg-accent text-white">
        Organiser
      </Button>
    ),
  },
  {
    title: "Our Strategic Priorities",
    body: "Fresh Food Expo APAC is built around strategic priorities that guide the development of the platform and its role within Asia Pacific’s fresh food ecosystem.",
    cta: (
      <Button href="/ecosystem" chevron={chevronSmWhite} w={215} h={40} pl={22} gap={9.39} fs={15} className="border border-accent bg-accent text-white">
        Fresh Food Ecosystem
      </Button>
    ),
  },
];

/** Figma 777:590: 640px copy, 56px gap, white accordion (one item open at a time). */
export default function BuiltForApac() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col gap-[32px] lg:mt-[80px] xl:flex-row xl:items-start xl:gap-[56px]">
      <div className="flex flex-col items-start gap-[16px] xl:w-[640px] xl:shrink-0" data-reveal>
        <RuleEyebrow>Built for Asia Pacific</RuleEyebrow>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px]">
          Asia Pacific’s diverse markets.
          <br />
          <span className="text-accent">A stronger fresh food future.</span>
        </h2>
        <p className="text-[15px] leading-[24px] font-medium text-body">
          Asia Pacific is home to highly diverse food-producing economies, major consumer markets and increasingly interconnected supply chains.
        </p>
        <p className="text-[15px] leading-[24px] font-medium text-body">
          Across the region, businesses are navigating priorities around food security, supply chain resilience, sustainability, efficiency, innovation and
          access to markets.
        </p>
        <p className="text-[15px] leading-[24px] font-medium text-body">
          Hosted in Singapore, Fresh Food Expo APAC creates a regional meeting point where businesses from across Asia Pacific can connect with
          international suppliers, buyers, technologies, expertise and commercial partners.
        </p>
      </div>

      <div className="rounded-[22px] bg-white px-[20px] py-[8px] md:px-[28px] xl:min-h-[343px] xl:min-w-0 xl:flex-1" data-reveal style={{ "--i": 1 } as CSSProperties}>
        {ITEMS.map((it, idx) => (
          // Native exclusive accordion: details sharing a name keep one item open.
          <details key={it.title} name="story-apac" open={idx === 0} className="group border-b border-[#e6e6e6] py-[22px] last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px] [&::-webkit-details-marker]:hidden">
              <span className="font-display text-[18px] leading-[24px] font-semibold text-[#032919] transition-colors duration-(--dur-ui) group-open:text-accent hover:text-accent">
                {it.title}
              </span>
              <Image src={chevronDown} alt="" className="shrink-0 transition-transform duration-(--dur-ui) ease-(--ease-out) group-open:rotate-180" />
            </summary>
            <div className={`flex flex-col items-start gap-[10px] pt-[10px] [--reveal-y:8px] motion-safe:animate-[fade-up_300ms_var(--ease-out)_both] ${it.tight ? "-mb-[8px]" : ""}`}>
              <p className="text-[14px] leading-[22px] font-medium text-body">{it.body}</p>
              {it.cta}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
