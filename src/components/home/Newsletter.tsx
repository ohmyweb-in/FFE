import Image from "next/image";
import type { CSSProperties } from "react";
import leafOutline from "@/assets/leaf-outline.svg";
import dots from "@/assets/dots.svg";
import main from "@/assets/newsletter-main.jpg";
import small from "@/assets/newsletter-small.jpg";
import chevronWhite from "@/assets/chevron-white.svg";
import { Button, crop } from "../ui";

/** Collage (Figma 359:340, 644×400) laid out in % so it scales below xl. */
const pct = (l: number, t: number, w: number, h: number): CSSProperties => ({
  position: "absolute",
  left: `${(l / 644) * 100}%`,
  top: `${(t / 400) * 100}%`,
  width: `${(w / 644) * 100}%`,
  height: `${(h / 400) * 100}%`,
});

export default function Newsletter() {
  return (
    <div className="relative">
      {/* Figma 359:166 — the leaf asset flipped horizontally, as in the design. */}
      <Image src={leafOutline} alt="" aria-hidden className="pointer-events-none absolute top-[-165px] left-[-7px] hidden max-w-none -scale-x-100 lg:block" />

      {/* Figma 624:861: copy starts 96px below the collage top (176px under the banner); the section still ends at the collage bottom. */}
      <section id="newsletter" className="container-page relative mt-[47px] md:mt-16 lg:mt-[133px] xl:mt-[176px] xl:min-h-[304px]">
        <div className="xl:max-w-[662px]" data-reveal>
          <p className="eyebrow ml-[2px] text-accent">Newsletter</p>
          <h2 className="h-section mt-[18px] ml-[2px] md:mt-[20px] md:ml-0 lg:mt-[23px] lg:ml-[2px]">Stay Connected</h2>
          <p className="text-lead mt-[20px] ml-[2px] max-w-[567px] text-[18px] md:mt-[24px] md:ml-0 lg:ml-px">
            Get the latest Fresh Food Expo APAC news, programme announcements and event updates delivered to your inbox.
          </p>
          {/* Subscribe (516:4039): 181×56 brand pill, label 41px in, chevron 18.66px after it; the full form lives on /subscribe. */}
          <div className="mt-[24px] md:mt-[25px] lg:ml-px">
            <Button href="/subscribe" chevron={chevronWhite} w={181} h={56} pl={41} gap={18.66} className="bg-brand text-white">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Mobile collage (318:2908) is this one at ×0.626, 403px wide from x=10. */}
        <div
          className="relative mt-[21px] -ml-[16px] aspect-[644/400] w-[calc(100%+15px)] md:mx-auto md:mt-12 md:w-full md:max-w-[644px] xl:absolute xl:top-[-96px] xl:right-[4px] xl:mt-0 xl:w-[644px]"
          data-reveal
          style={{ "--i": 1 } as CSSProperties}
        >
          <div className="overflow-hidden rounded-[19.4px] rounded-bl-none bg-[#d9d9d9] md:rounded-[31px] md:rounded-bl-none" style={pct(28, 27, 482, 319)}>
            <Image
              src={main}
              alt="Exhibitors talking beside a robotics demo at a trade fair stand"
              placeholder="blur"
              sizes="(min-width: 1280px) 541px, 85vw"
              style={crop(112.31, 100, -1.45, 0)}
            />
          </div>
          <div className="rounded-[8.14px] bg-[rgb(40_174_61/0.47)] md:rounded-[13px]" style={pct(364, 329, 68, 71)} />
          <div className="overflow-hidden rounded-[15.64px] rounded-bl-none md:rounded-[25px] md:rounded-bl-none" style={pct(410, 210, 234, 170)}>
            <Image src={small} alt="Robotic arm harvesting in a greenhouse" placeholder="blur" sizes="(min-width: 1280px) 243px, 40vw" style={crop(103.51, 205.3, -3.42, -17.6)} />
          </div>
          <Image src={dots} alt="" aria-hidden style={pct(528, 0, 91, 79)} />
          <Image src={dots} alt="" aria-hidden style={pct(0, 313, 91, 79)} />
        </div>
      </section>
    </div>
  );
}
