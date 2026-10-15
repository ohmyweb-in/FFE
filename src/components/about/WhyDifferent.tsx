import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import p1 from "@/assets/about/point-1.png";
import p2 from "@/assets/about/point-2.png";
import p3 from "@/assets/about/point-3.png";
import p4 from "@/assets/about/point-4.png";
import p5 from "@/assets/about/point-5.png";
import leafDeco from "@/assets/about/leaf-deco.svg";

type Point = { title: [string, string]; desc: string; icon: StaticImageData };

const POINTS: Point[] = [
  {
    title: ["Source-to-market", "by design"],
    desc: "A dedicated platform connecting fresh food with the technologies that preserve quality and freshness and the logistics and distribution solutions that move products efficiently through the supply chain.",
    icon: p1,
  },
  {
    title: ["Built for", "Asia Pacific"],
    desc: "Focused on the opportunities and priorities shaping the region, including food security, supply chain resilience, sustainability, innovation and cross-border trade.",
    icon: p2,
  },
  {
    title: ["Built for", "business partnerships"],
    desc: "Designed to enable sourcing, supplier discovery, buyer connections, market entry and long-term commercial partnerships.",
    icon: p3,
  },
  {
    title: ["Connecting industry", "and innovation"],
    desc: "Bringing together fresh food suppliers, technology and solution providers, logistics and supply chain specialists, buyers, industry organisations and other public and private sector stakeholders.",
    icon: p4,
  },
  {
    title: ["Strategically located", "in Singapore"],
    desc: "A strategic gateway connecting Southeast Asia, the wider Asia Pacific region and global markets.",
    icon: p5,
  },
];

/** Figma 736:2230. Descriptions fold away on desktop and slide open on hover (see .points in globals.css). */
export default function WhyDifferent() {
  return (
    <section className="untrim relative mt-[46px] overflow-hidden bg-linear-to-b from-mint to-page">
      {/* Deco · Leaf (736:2253): 200×130 rotated -25°, bleeding off the right edge. */}
      <Image
        src={leafDeco}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[-28px] left-[calc(50%+588px)] hidden h-[130px] w-[200px] max-w-none -rotate-25 xl:block"
      />
      <div className="container-narrow relative pt-[48px] pb-[48px] lg:pt-[72px] lg:pb-[53px]">
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]" data-reveal>
          Why <span className="text-accent">Fresh Food Expo APAC</span> is different
        </h2>

        <ul className="points mt-[32px] grid gap-x-[28px] gap-y-[28px] md:grid-cols-2 lg:mt-[44px] lg:flex lg:items-stretch lg:gap-0">
          {POINTS.map((p, idx) => (
            <li
              key={p.title.join(" ")}
              className={`flex gap-[16px] lg:flex-[1_0_0] lg:flex-col ${idx ? "lg:border-l lg:border-[#c2e3c3] lg:px-[28px]" : "lg:pr-[28px]"}`}
              data-reveal
              style={{ "--i": idx } as CSSProperties}
            >
              <span className="pt-icon flex size-[56px] shrink-0 items-center justify-center rounded-full bg-white drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)] lg:size-[72px]">
                <Image src={p.icon} alt="" sizes="31px" className="size-[26px] lg:size-[31px]" />
              </span>
              <div className="flex min-w-0 flex-col gap-[6px] lg:gap-[16px]">
                <h3 className="text-[19px] leading-[24px] font-semibold text-forest">
                  {p.title[0]} <br className="hidden lg:block" />
                  {p.title[1]}
                </h3>
                <div className="pt-desc grid">
                  <p className="min-h-0 overflow-hidden text-[15px] leading-[21px] font-medium text-body">{p.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
