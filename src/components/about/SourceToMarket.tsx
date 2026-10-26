import Image from "next/image";
import leafOutline from "@/assets/leaf-outline.svg";
import { PillarRow } from "../home/Ecosystem";
import { Pill } from "../ui";

/** Figma 736:2256: 1329×767 panel. Cards are the homepage pillar cards at ×0.9487. */
export default function SourceToMarket() {
  return (
    <section className="untrim relative mx-auto mt-[46px] w-[min(1329px,100%-24px)] overflow-hidden rounded-[24px] bg-[#c2e3c3] md:w-[min(1329px,100%-32px)] lg:rounded-[36px]">
      <Image
        src={leafOutline}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[65px] w-[120px] max-w-none md:h-[141px] md:w-[260px] lg:top-[2.68px] lg:right-[49px] lg:h-[239px] lg:w-[440px]"
      />

      <div className="relative px-[20px] pt-[72px] md:px-8 md:pt-12 lg:px-[56px] lg:pt-[56px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">From source to market</p>
        <h2 className="h-section mt-[14px] max-w-[780px] lg:leading-[52px]">
          From <span className="text-accent">Fresh Food</span> to Market
        </h2>
        <p className="mt-[14px] max-w-[780px] text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
          Fresh Food Expo APAC connects fresh food with the technologies and logistics solutions that help maintain quality, preserve freshness and move products
          efficiently through the supply chain.
        </p>
      </div>

      <div className="relative mt-[33px] px-[20px] md:px-8 lg:mt-[41px] lg:px-[50.5px]">
        <div className="lg:[zoom:0.9487]">
          <PillarRow />
        </div>
      </div>

      <div className="relative flex justify-center px-[20px] pt-[36px] pb-[36px] md:px-8 lg:pt-[43px] lg:pb-[26px]" data-reveal>
        <Pill href="/ecosystem" className="bg-accent text-white max-md:px-[18px] max-md:text-[15px]">
          Explore the Full Fresh Food Ecosystem
        </Pill>
      </div>
    </section>
  );
}
