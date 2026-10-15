import Image from "next/image";
import type { CSSProperties } from "react";
import branding from "@/assets/exhibit/branding.jpg";
import { Pill } from "../ui";

/** Figma 777:912: 1360px card (mint → page), copy column + 600×310 photo, 48px gap. */
export default function Elevate() {
  return (
    <section className="untrim mx-auto mt-[48px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[72px]">
      <div className="flex flex-col gap-[32px] rounded-[24px] bg-linear-to-r from-mint to-page p-[20px] md:p-[40px] lg:rounded-[32px] xl:flex-row xl:items-center xl:gap-[48px] xl:py-[40px] xl:pr-[32px] xl:pl-[48px]">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[14px]" data-reveal>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px]">
            Elevate your presence
          </h2>
          <p className="text-[17px] leading-[24px] font-medium text-black md:text-[18px] md:leading-[26px]">Looking to go beyond your exhibition stand?</p>
          <p className="text-[15px] leading-[24px] font-medium text-body">
            From high-impact branding to tailored sponsorship opportunities, position your business more prominently within the Fresh Food Expo APAC
            experience.
          </p>
          <div className="pt-[8px]">
            <Pill href="/contact#enquiry" className="border-[1.5px] border-black text-black hover:bg-black/5 max-md:px-[18px]">
              Explore Sponsorship &amp; Branding Opportunities
            </Pill>
          </div>
        </div>
        <div
          className="group relative aspect-[600/310] w-full max-w-[600px] shrink-0 overflow-hidden rounded-[24px] bg-linear-to-b from-mint to-[#c2e3c3] xl:aspect-auto xl:h-[310px] xl:w-[600px]"
          data-reveal
          style={{ "--i": 1 } as CSSProperties}
        >
          {/* Fill 117.78% tall at −11.97% → cover, 67.3% down. */}
          <Image src={branding} alt="Two visitors at a vertical-farming stand" placeholder="blur" sizes="(min-width: 1280px) 600px, 100vw" className="zoom absolute inset-0 size-full object-cover object-[50%_67.3%]" />
        </div>
      </div>
    </section>
  );
}
