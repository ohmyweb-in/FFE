import Image from "next/image";
import type { CSSProperties } from "react";
import photo from "@/assets/news/media-gallery.jpg";
import { Pill } from "../ui";

/** Figma 1138:2719: 1274px block from x=114 (a 1336px centred box with 62px left padding) — heading, 538×310 photo, copy + CTA beside it. */
export default function PressPhotos() {
  return (
    <section className="untrim mx-auto mt-[24px] w-[min(1336px,100%-2*var(--gutter))] lg:mt-0 xl:pl-[62px]">
      <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]" data-reveal>
        Official Media Gallery
      </h2>
      <div className="mt-[24px] flex flex-col gap-[24px] lg:mt-[27px] lg:flex-row lg:items-start lg:gap-[38px]">
        <div className="group relative aspect-[538/310] w-full overflow-hidden rounded-[24px] bg-[#d9d9d9] lg:w-[538px] lg:shrink-0 lg:rounded-[30px]" data-reveal>
          <Image
            src={photo}
            alt="Broadcast camera filming a speaker on stage at Grüne Woche"
            placeholder="blur"
            sizes="(min-width: 1024px) 538px, 100vw"
            className="zoom absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start lg:max-w-[698px] lg:pt-[26px]" data-reveal style={{ "--i": 1 } as CSSProperties}>
          <p className="text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
            These photos are for editorial purposes only. Use for promotional purposes is forbidden. For more information, please contact{" "}
            <a href="mailto:marketing@freshfoodexpoapac.com" className="text-accent underline underline-offset-2 [overflow-wrap:anywhere] hover:text-forest">
              marketing@freshfoodexpoapac.com
            </a>
            <br />
            Copyright: Messe Berlin Asia Pacific
          </p>
          <div className="mt-[24px] lg:mt-[29px]">
            <Pill href="#" className="bg-accent text-white">
              To the press photos
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
