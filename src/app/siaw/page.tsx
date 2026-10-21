import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import BiggerPicture from "@/components/siaw/BiggerPicture";
import OurRole from "@/components/siaw/OurRole";
import BroaderImpact from "@/components/siaw/BroaderImpact";
import { Button, Pill } from "@/components/ui";
import hero from "@/assets/siaw/hero.jpg";
import chevronAccent from "@/assets/chevron-accent.svg";

// Long CTA on phones: full width, 20px sides, 13px top/bottom, balanced two lines.
const SIAW_SITE = "https://sginternationalagrifoodweek.com.sg/";
const MOB = "max-md:w-full max-md:px-[20px] max-md:py-[13px] max-md:leading-[22px] max-md:text-balance";

export const metadata: Metadata = {
  title: "SIAW | Fresh Food Expo APAC",
  description:
    "Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, Singapore’s premier agri-food convention. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

/** Figma 453:4604 (SIAW_Desktop). Sections sit 65px apart, as in the frame. */
export default function SiawPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="siaw"
          eyebrow="Part of SIAW"
          title={
            <>
              Singapore International <br className="max-md:hidden" />
              Agri-Food Week 2027.
            </>
          }
          img={hero}
          imgBox="lg:top-0 lg:left-[34.19%] lg:w-[65.81%]"
          cta={
            <>
              {/* Phones: full-width pill, two balanced lines, chevron after the last word. */}
              <Pill href={SIAW_SITE} className={`bg-white text-accent md:hidden ${MOB} max-[389px]:px-[16px]! max-[389px]:text-[15px]!`}>
                Discover Singapore International Agri{"\u2011"}Food Week
              </Pill>
              <Button href={SIAW_SITE} chevron={chevronAccent} w={497} h={52} pl={33} gap={9} className="bg-white text-accent max-md:hidden">
                Discover Singapore International Agri-Food Week
              </Button>
            </>
          }
        >
          Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, Singapore’s premier agri-food convention bringing
          together government, industry, innovation and business for a more sustainable, resilient and connected agri-food system across Asia.
        </PageHero>
        <BiggerPicture />
        <OurRole />
        <BroaderImpact />
        {/* Figma 624:1829: the homepage banner with the hero's three 40px CTAs and the 16–18 date. */}
        <JoinBanner
          layout="mt-[48px] h-[814px] lg:mt-[65px] lg:h-[495px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[30px]" />}
        />
      </main>
      <Footer mt="mt-[48px] lg:mt-[65px]" />
      <RevealObserver />
    </>
  );
}
