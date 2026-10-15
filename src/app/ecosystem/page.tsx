import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import Intro from "@/components/ecosystem/Intro";
import OnePlatform from "@/components/ecosystem/OnePlatform";
import Sectors from "@/components/ecosystem/Sectors";
import Connects from "@/components/ecosystem/Connects";
import WhoFor from "@/components/ecosystem/WhoFor";
import hero from "@/assets/ecosystem/hero.jpg";

export const metadata: Metadata = {
  title: "Fresh Food Ecosystem | Fresh Food Expo APAC",
  description:
    "From fresh food to technology, logistics and distribution, Fresh Food Expo APAC connects the businesses and solutions that bring fresh food to market.",
};

/** Figma 1138:2024 (Ecosystem_Desktop, was 450:3745). Sections sit 67px apart; the intro (793:4477) was slotted in at 40.32 / 20.63. */
export default function EcosystemPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="eco"
          eyebrow="Industry sectors"
          title="Fresh Food Ecosystem"
          img={hero}
          // Rectangle 13 fill: 83.55% × 186.3% at (16.42%, −43.15%); `!` beats the base lg:h-full.
          imgBox="lg:top-[-43.15%] lg:left-[16.42%] lg:h-[186.3%]! lg:w-[83.55%]"
          curveLeft={-20.98}
          stayHref="/subscribe"
        >
          From fresh food to technology, logistics and distribution, Fresh Food Expo APAC connects the businesses and solutions that bring fresh food to
          market.
        </PageHero>
        <Intro />
        <OnePlatform />
        <Sectors />
        <Connects />
        <WhoFor />
        {/* Figma 669:1573: the homepage banner, 486px, content 11.5px further in, hero CTAs. */}
        <JoinBanner
          layout="mt-[48px] h-[814px] lg:mt-[67px] lg:h-[486px]"
          inner="lg:pt-[65px] lg:pb-0 lg:pl-[11.5px]"
          title={
            <>
              Connect across the fresh <br className="max-md:hidden" />
              food ecosystem
            </>
          }
          lead="Fresh Food Expo APAC connects fresh food, technology, logistics and distribution — bringing the ecosystem together in one dedicated business platform."
          leadMt="lg:mt-[34.2px]"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[27.85px] lg:ml-[4.5px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[34px] lg:ml-[4.5px]" />}
        />
      </main>
      <Footer mt="mt-[48px] lg:mt-[67px]" />
      <RevealObserver />
    </>
  );
}
