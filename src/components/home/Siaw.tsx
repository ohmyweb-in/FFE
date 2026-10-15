import Image from "next/image";
import dividerCircle from "@/assets/divider-circle.svg";
import leaf from "@/assets/leaf.png";
import chevronAccent from "@/assets/chevron-accent.svg";
import { Button, Pill, crop } from "../ui";

// Long CTA on phones: full width, 20px sides, 13px top/bottom, balanced two lines.
const MOB = "max-md:w-full max-md:px-[20px] max-md:py-[13px] max-md:leading-[22px] max-md:text-balance";

export default function Siaw() {
  return (
    <>
      {/* Leaf divider (Figma 491:1412 / 491:1410 / 486:909) — not in the mobile frame. */}
      <div className="container-page relative mt-14 hidden h-[85px] items-center justify-center md:flex lg:mt-[43px]" aria-hidden>
        <div className="absolute h-[3px] w-[min(760px,100%)] bg-accent" data-reveal="fade" />
        <div className="relative size-[85px]" data-reveal="scale">
          <Image src={dividerCircle} alt="" className="absolute inset-0" />
          <div className="absolute top-[18px] left-[18px] size-[49px] overflow-hidden">
            <Image src={leaf} alt="" sizes="78px" style={crop(159.23, 145.37, -34.26, -26.34)} />
          </div>
        </div>
      </div>

      <section className="container-page mt-[53px] flex flex-col gap-[30px] pl-[5px] md:mt-10 md:gap-8 md:pl-0 lg:mt-[35px] lg:flex-row lg:justify-between lg:gap-10">
        <div className="lg:basis-[524px]" data-reveal>
          <p className="eyebrow text-accent md:ml-px md:text-brand">
            {/* Copy differs: mobile frame 318:2457 vs desktop 359:386. */}
            <span className="md:hidden">Our strategic platform</span>
            <span className="hidden md:inline">ONE strategic platform</span>
          </p>
          <h2 className="h-section mt-[20px] -ml-px max-w-[346px] leading-[38.2px] md:mt-[25px] md:ml-0 md:max-w-none md:leading-[1.09] lg:leading-[52.2px]">
            <span className="md:block">Part of </span>
            <span className="text-accent md:block">Singapore International Agri-Food Week</span>
          </h2>
        </div>
        <div className="lg:basis-[698px] lg:pt-[16px]" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <p className="text-lead max-w-[361px] md:max-w-[696px] lg:ml-[2px]">
            Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, bringing together government, industry, innovation and
            business to advance a more sustainable, resilient and connected food future in Asia.
            <br />
            <br />
            Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B trade platform for the fresh food ecosystem, connecting fresh food, agri and
            fresh technology, logistics and distribution.
          </p>
          <div className="mt-[25px] flex md:mt-[39px]">
            {/* Phones: full-width pill, two balanced lines, chevron after the last word. */}
            <Pill href="/siaw" className={`border-[1.5px] border-accent bg-mint text-accent md:hidden ${MOB}`}>
              Discover Singapore International Agri{"\u2011"}Food Week
            </Pill>
            <Button
              href="/siaw"
              chevron={chevronAccent}
              w={488}
              h={52}
              pl={28}
              gap={16.66}
              className="border-[1.5px] border-accent bg-mint text-accent max-md:hidden"
            >
              Discover Singapore International Agri-Food Week
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
