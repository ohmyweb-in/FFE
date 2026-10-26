import SiawVideo from "./SiawVideo";
import { Pill } from "../ui";

// Long CTA on phones: full width, 20px sides, 13px top/bottom, balanced two lines.
const MOB = "max-md:w-full max-md:px-[16px] max-md:py-[12px] max-md:text-[15px] max-md:leading-[22px] max-md:text-balance";

/** Figma 736:2219: 560px media (16:9 so the trailer’s text isn’t cropped), 72px gap, content column. */
export default function AboutSiaw() {
  return (
    <section className="untrim container-narrow mt-[46px] flex flex-col gap-[32px] lg:flex-row lg:items-center lg:gap-[40px] xl:gap-[72px]">
      <div
        className="relative aspect-video w-full overflow-hidden rounded-[24px] rounded-bl-none bg-[#d9d9d9] lg:w-[44%] lg:shrink-0 xl:w-[560px] lg:rounded-[30.474px] lg:rounded-bl-none"
        data-reveal
      >
        <SiawVideo />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Part of</p>
        <h2 className="h-section trim max-w-[525px] lg:min-h-[98px]">
          Singapore International <br className="hidden lg:block" />
          Agri-Food Week
        </h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[22px] font-medium text-body">
          <p>
            Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, bringing together government, industry, innovation and
            business to advance a more sustainable, resilient and connected food future in Asia.
          </p>
          <p>
            Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B exhibition for the fresh food ecosystem, connecting fresh food, agri and
            fresh technology, logistics and distribution.
          </p>
        </div>
        <p className="text-[15px] leading-[22px] font-semibold text-black">
          Supported by Singapore Food Agency, Enterprise Singapore, Temasek and Singapore Tourism Board.*
        </p>
        <div className="pt-[6px]">
          <Pill
            href="/siaw"
            className={`border-[1.5px] border-accent bg-mint text-accent lg:max-xl:h-auto lg:max-xl:min-h-[52px] lg:max-xl:py-[12px] lg:max-xl:whitespace-normal ${MOB}`}
          >
            Discover Singapore International Agri{"\u2011"}Week 2027
          </Pill>
        </div>
      </div>
    </section>
  );
}
