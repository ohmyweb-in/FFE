import Image from "next/image";
import type { CSSProperties } from "react";
import exhibit from "@/assets/exhibit.jpg";
import visit from "@/assets/visit.jpg";
import visitBase from "@/assets/visit-base.jpg";
import chevronWhite from "@/assets/chevron-white.svg";
import chevronBlack from "@/assets/chevron-black.svg";
import { Button } from "../ui";

export default function BeInvolved() {
  return (
    <section id="be-involved" className="container-page mt-[42px] md:mt-16 lg:mt-[71px]">
      <div className="ml-[4px] md:ml-0" data-reveal>
        <p className="eyebrow text-accent">BE INVOLVED</p>
        <h2 className="h-section mt-[23px] max-w-[330px] text-[#032919] md:mt-[20px] md:max-w-none md:text-forest lg:mt-[28px]">
          Be part of <span className="text-accent">Fresh Food Expo APAC</span>
        </h2>
      </div>

      <div className="mt-[29px] ml-[3px] grid gap-[20px] md:mt-10 md:ml-0 md:gap-6 lg:mt-[48px] lg:grid-cols-2 lg:gap-[42px]">
        {[
          {
            title: "Exhibit",
            desc: "Build new commercial relationships, strengthen your regional presence and connect your business with new opportunities.",
            img: exhibit,
            alt: "Exhibitors in conversation at a trade fair stand",
            // Figma fill crops: mobile 318:2002, desktop 359:226 (tablet: plain cover).
            imgClass:
              "top-[-2.35%] left-[-13.55%] h-[102.43%] w-[167.77%] md:inset-0 md:size-full md:object-[10%_100%] lg:inset-auto lg:top-[-17.34%] lg:left-[-13.26%] lg:h-[117.34%] lg:w-[167.77%]",
            box: "bottom-[32.7px] left-[19.3px] md:left-8 lg:left-[36px]",
            desc2: "mt-[18.7px] max-w-[336px] text-[18px] md:mt-[20px] md:max-w-[532px] lg:mt-[28.4px]",
            btnMt: "mt-[25px] md:mt-[23px]",
            cta: (
              <Button
                href="/apply-to-exhibit"
                chevron={chevronWhite}
                w={220}
                h={52}
                pl={33}
                gap={21.66}
                m={{ w: 136.5, h: 32.3, pl: 20.5, gap: 8.6, fs: 11.17, chev: 0.617 }}
                className="border-[1.5px] border-accent bg-accent text-white"
              >
                Apply to Exhibit
              </Button>
            ),
          },
          {
            title: "Visit",
            desc: "Discover fresh food products, suppliers, technologies and logistics solutions from across the fresh food ecosystem.",
            img: visit,
            alt: "Visitors walking through a busy exhibition hall",
            base: true,
            // Mobile 318:2016 crops the photo to 87.5% height; the base photo shows beneath.
            imgClass: "top-0 left-[-21.66%] h-[87.52%] w-[143.32%] md:inset-0 md:size-full",
            box: "bottom-[29.6px] left-[26px] md:left-8 lg:left-[42px]",
            desc2: "mt-[16.1px] max-w-[324px] md:mt-[20px] md:max-w-[521px] lg:mt-[28.4px]",
            btnMt: "mt-[18.8px] md:mt-[23px]",
            cta: (
              <Button
                href="/register-to-visit"
                chevron={chevronBlack}
                w={248}
                h={52}
                pl={27}
                gap={13.66}
                m={{ w: 153, h: 32.4, pl: 16.7, gap: 8.4, fs: 11.2, chev: 0.617 }}
                className="border-[1.5px] border-white bg-white text-black"
              >
                Register Your Interest
              </Button>
            ),
          },
        ].map((c, idx) => (
          <div key={c.title} data-reveal style={{ "--i": idx } as CSSProperties}>
            <article className="lift group relative h-[332px] overflow-hidden rounded-[18.6px] bg-[#d9d9d9] md:aspect-[622/467] md:h-auto md:rounded-[24px] lg:rounded-[30px]">
              {c.base && (
                <Image src={visitBase} alt="" aria-hidden placeholder="blur" sizes="100vw" className="absolute inset-0 size-full object-cover md:hidden" />
              )}
              <Image
                src={c.img}
                alt={c.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 1045px, 170vw"
                className={`zoom absolute max-w-none object-cover ${c.imgClass}`}
              />
              <div className="absolute inset-x-0 bottom-0 h-[76.8%] bg-linear-to-b from-black/0 to-black md:h-[73.45%]" />
              <div className={`absolute right-5 text-white md:right-8 md:bottom-6 lg:right-[36px] lg:bottom-[39px] ${c.box}`}>
                <h3 className="font-display text-[30px] leading-[32.4px] font-semibold md:text-[48px] md:leading-[52.2px]">{c.title}</h3>
                <p className={`text-lead ${c.desc2}`}>{c.desc}</p>
                <div className={`flex ${c.btnMt}`}>{c.cta}</div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
