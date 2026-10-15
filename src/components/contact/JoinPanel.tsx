import Image from "next/image";
import venue from "@/assets/join.jpg";
import leaf from "@/assets/contact/leaf.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import chevronSmAccent from "@/assets/contact/chevron-sm-accent.svg";
import { Button } from "../ui";

/** Figma 1138:3030: 1337×326 white panel, venue photo on the right half. */
export default function JoinPanel() {
  return (
    <section className="untrim mx-auto mt-[48px] w-[min(1337px,100%-2*var(--gutter))] lg:mt-[50px]">
      <div className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white lg:block lg:min-h-[326px] lg:rounded-[33.425px]" data-reveal>
        <div className="relative order-2 h-[220px] overflow-hidden md:h-[300px] lg:absolute lg:inset-0 lg:h-auto" aria-hidden>
          {/* Panel fill crop: photo starts at 51.36% and bleeds past the right edge. */}
          <Image
            src={venue}
            alt=""
            placeholder="blur"
            sizes="(min-width: 1024px) 780px, 100vw"
            className="absolute inset-0 size-full max-w-none object-cover lg:top-[-8.57%] lg:left-[51.36%] lg:h-[137.37%] lg:w-[57.75%]"
          />
        </div>

        <div className="relative px-[24px] pt-[36px] pb-[32px] lg:max-w-[calc(51.36%-20px)] lg:pt-[58px] lg:pr-0 lg:pb-[80px] lg:pl-[55px]">
          <p className="text-[15.668px] leading-[19.846px] font-medium tracking-[0.02em] text-accent uppercase">Join the event</p>
          <h2 className="mt-[12.53px] font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[35.514px] md:leading-[41.781px]">
            Be part of <span className="text-accent">Fresh Food Expo APAC</span>
          </h2>
          <p className="mt-[12.54px] max-w-[593px] text-[15.668px] leading-[21.935px] font-medium text-body">
            Connect with the businesses, technologies and decision-makers shaping the future of fresh food across Asia Pacific.
          </p>
          <div className="mt-[20px] flex flex-col items-start gap-[11px] md:mt-[17.38px] md:flex-row md:flex-wrap md:gap-[13px]">
            <Button href="/register-to-visit" chevron={chevronSmWhite} w={203} h={40} pl={21} gap={6} fs={15} m={{ w: 202, h: 43, pl: 25, gap: 7, fs: 15 }} className="border border-accent bg-accent text-white">
              Register Your Interest
            </Button>
            <Button href="/apply-to-exhibit" chevron={chevronSmAccent} w={162} h={40} pl={19} gap={12} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-accent text-accent hover:bg-mint">
              Apply To Exhibit
            </Button>
            <Button href="/subscribe" chevron={chevronSmAccent} w={162} h={40} pl={19} gap={14} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-accent text-accent hover:bg-mint">
              Stay Connected
            </Button>
          </div>
          <Image src={leaf} alt="" aria-hidden className="pointer-events-none absolute top-[245px] left-[550.5px] hidden h-[80.841px] w-[148.829px] max-w-none xl:block" />
        </div>
      </div>
    </section>
  );
}
