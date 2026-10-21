import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import hero from "@/assets/about/hero.jpg";
import EventIntro from "@/components/about/EventIntro";
import AboutSiaw from "@/components/about/AboutSiaw";
import WhyDifferent from "@/components/about/WhyDifferent";
import SourceToMarket from "@/components/about/SourceToMarket";
import FruitLogistica, { GrueneWoche } from "@/components/about/FruitLogistica";
import WhoFor from "@/components/about/WhoFor";
import BackedBy from "@/components/about/BackedBy";
import BePartOf from "@/components/about/BePartOf";
import JoinCommunity from "@/components/about/JoinCommunity";

export const metadata: Metadata = {
  title: "About | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "Fresh Food Expo APAC is a premier B2B trade fair connecting the fresh food ecosystem across the source-to-market value chain. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

/** Figma 1138:1437 (About_Us, was 736:2133). Sections sit 46px apart, as in the frame. */
export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* Figma 736:2149 (content per revision 449:1564). */}
        <PageHero eyebrow="The event" title={<>Fresh Food Expo Asia Pacific <br className="max-lg:hidden" />(FFE APAC)</>} img={hero} imgBox="lg:top-[-0.09%] lg:left-[36.93%] lg:w-[63.04%]" date="16-18 Nov. 2027" stayHref="/subscribe">
          A premier B2B trade fair connecting the fresh food ecosystem across the source-to-market value chain.
        </PageHero>
        <EventIntro />
        <AboutSiaw />
        <WhyDifferent />
        <SourceToMarket />
        <FruitLogistica />
        <GrueneWoche />
        <WhoFor />
        <BackedBy />
        <BePartOf />
        <JoinCommunity />
      </main>
      <Footer mt="mt-[56px]" />
      <RevealObserver />
    </>
  );
}
