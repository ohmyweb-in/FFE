import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import JoinBanner from "@/components/home/JoinBanner";
import { ShowCards } from "@/components/home/Organiser";
import { HeroCtas } from "@/components/PageHero";
import RuleEyebrow from "@/components/story/RuleEyebrow";
import { MesseAsia, MesseBerlin, Portfolio } from "@/components/messe/Sections";

export const metadata: Metadata = {
  title: "Messe Berlin | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "Fresh Food Expo APAC is organised by Messe Berlin Asia Pacific, the Singapore-based subsidiary of Messe Berlin, one of the world’s leading trade fair companies since 1822.",
};

/** Figma 1138:3908 (Messe Berlin). */
export default function MesseBerlinPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <MesseAsia />
        <Portfolio />
        <MesseBerlin />

        {/* Trade shows (914:1625): title cap top 3.94px below the Messe Berlin band, block at x 92 (15px right of the column). */}
        <section className="container-page mt-[8px] lg:mt-[3.94px] xl:relative xl:left-[15px]">
          <h2 className="h-section" data-reveal>
            Explore our <span className="text-accent">trade shows</span>
          </h2>
          <ShowCards className="mt-[26px] md:mt-8 lg:mt-[41px]" />
        </section>

        {/* Join banner (781:2638): 470px, eyebrow + two-line title, hero CTAs; 53.06px below the cards. */}
        <JoinBanner
          layout="mt-[48px] h-[780px] lg:mt-[53.06px] lg:h-[470px]"
          imgCls="lg:top-[-18.62%] lg:left-[23.7%] lg:h-[127.23%] lg:w-[78.64%]"
          inner="lg:pt-[56px] lg:pb-0 lg:pl-[14.5px]"
          eyebrow={
            <div className="mb-[16px] lg:mb-[19px] lg:ml-[2.5px]">
              <RuleEyebrow light>Be part of the fresh food ecosystem</RuleEyebrow>
            </div>
          }
          title={
            <>
              Join us at <br className="max-md:hidden" />
              Fresh Food Expo Asia Pacific (FFE APAC) 2027
            </>
          }
          titleCls="md:max-w-[730px]! lg:ml-[4.5px]"
          lead="Connect with the region’s leading fresh food businesses, technologies and decision-makers."
          leadMt="lg:mt-[27px] lg:ml-[0.5px] md:max-w-[591px]!"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[31px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[25px]" />}
        />
      </main>
      {/* Footer content (781:1850) sits 30px into its frame, which starts at the banner's bottom edge. */}
      <Footer mt="mt-[48px] lg:mt-[30px]" />
      <RevealObserver />
    </>
  );
}
