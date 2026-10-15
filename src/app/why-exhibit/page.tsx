import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas, HeroVenue } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import Buyers from "@/components/exhibit/Buyers";
import Grow from "@/components/exhibit/Grow";
import Showcase from "@/components/exhibit/Showcase";
import Elevate from "@/components/exhibit/Elevate";
import hero from "@/assets/exhibit/hero.jpg";

export const metadata: Metadata = {
  title: "Why Exhibit | Fresh Food Expo APAC",
  description:
    "Put your business in front of the buyers, partners and decision-makers shaping Asia Pacific’s fresh food ecosystem. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

/** Figma 1138:3194 (Why_Exhibit_Desktop). Sections sit 72px apart. */
export default function WhyExhibitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="exhibit"
          title="Why Exhibit"
          img={hero}
          // Figma fill is 109.89% × 238.8% (5% taller than the photo); kept at its true ratio, same width, left edge and vertical centre.
          imgBox="lg:top-[-60.26%] lg:left-[16.63%] lg:h-[226.9%]! lg:w-[109.89%] lg:max-w-none"
          curveLeft={4.37}
          cta={
            <>
              <HeroVenue />
              <HeroCtas stayHref="/subscribe" className="mt-[24px] md:mt-[29px]" />
            </>
          }
        >
          Put your business in front of the buyers, partners and decision-makers shaping Asia Pacific’s fresh food ecosystem.
        </PageHero>
        <Buyers />
        <Grow />
        <Showcase />
        <Elevate />
        {/* Figma 781:2770: the homepage banner, 447px, wider title, tighter photo crop, hero CTAs. */}
        <JoinBanner
          layout="mt-[48px] h-[780px] lg:mt-[72px] lg:h-[447px]"
          imgCls="lg:top-[-19.58%] lg:left-[23.7%] lg:h-[133.78%] lg:w-[78.64%]"
          inner="lg:pt-[64px] lg:pb-0 lg:pl-[14.5px]"
          title={
            <>
              Put your business at the centre of <br className="max-md:hidden" />
              Asia Pacific’s fresh food ecosystem
            </>
          }
          titleCls="md:max-w-[771px]! lg:ml-[5px]"
          lead="Meet buyers. Showcase your products and solutions. Build partnerships. Explore new markets. Connect with the community."
          leadMt="lg:mt-[27.2px] lg:ml-[0.5px] md:max-w-[591px]!"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[30.84px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[25px]" />}
        />
      </main>
      <Footer mt="mt-[48px] lg:mt-[72px]" />
      <RevealObserver />
    </>
  );
}
