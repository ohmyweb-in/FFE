import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas, HeroVenue } from "@/components/PageHero";
import { Intro } from "@/components/why/Sections";
import JoinBanner from "@/components/home/JoinBanner";
import RuleEyebrow from "@/components/story/RuleEyebrow";
import VisitorGroups from "@/components/visit/VisitorGroups";
import hero from "@/assets/visit/hero.jpg";

export const metadata: Metadata = {
  title: "Who Should Visit | Fresh Food Expo APAC",
  description:
    "Fresh Food Expo APAC is designed for buyers, sourcing professionals and industry decision-makers looking for fresh food products, technologies and logistics solutions from across Asia Pacific and global markets.",
};

/** Figma 1138:4117 (Who_Should_Visit; hero as 1053:369). Intro 42px under the hero, cards 24px below it. */
export default function WhoShouldVisitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="why"
          title="Who Should Visit"
          img={hero}
          // Figma 1053:371 fill is 81.25% × 176.9% (squashed to 0.88 of the photo); kept at its true ratio, same width, left edge and vertical centre.
          imgBox="lg:top-[-73.02%] lg:left-[18.76%] lg:h-[201.76%]! lg:w-[81.25%] lg:max-w-none"
          curveLeft={3.89}
          cta={
            <>
              <HeroVenue />
              <HeroCtas stayHref="/subscribe" className="mt-[24px] md:mt-[29px]" />
            </>
          }
        />

        <Intro>
          Fresh Food Expo APAC is designed for buyers, sourcing professionals and industry decision-makers looking for fresh food products, technologies and
          logistics solutions from across Asia Pacific and global markets.
        </Intro>

        <VisitorGroups />

        {/* Figma 789:3766: 329px banner, eyebrow + date title, venue row only, hero CTAs; 24px below the cards. */}
        <JoinBanner
          layout="mt-[48px] h-[600px] lg:mt-[24px] lg:h-[329px]"
          imgCls="lg:top-[-26.21%] lg:left-[23.73%] lg:h-[176.74%] lg:w-[76.29%]"
          inner="lg:pt-[53px] lg:pb-0 lg:pl-[14.5px]"
          eyebrow={
            <div className="mb-[16px] lg:mb-[23px] lg:ml-[2.5px]">
              <RuleEyebrow light>Connect with the fresh food ecosystem</RuleEyebrow>
            </div>
          }
          title="16–18 November 2027"
          // Figma’s title box starts 7px left of the rule below it.
          titleCls="md:max-w-[730px]! lg:-ml-[7px]"
          lead={false}
          date={false}
          dateCls="mt-[25px] md:mt-[30px] lg:mt-[29.41px]"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[32px]" />}
        />
      </main>
      {/* Footer content (781:2199) sits 30px into its frame, 24px below the banner. */}
      <Footer mt="mt-[48px] lg:mt-[54px]" />
      <RevealObserver />
    </>
  );
}
