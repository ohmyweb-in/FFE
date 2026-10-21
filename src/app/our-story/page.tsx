import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import StoryIntro from "@/components/story/StoryIntro";
import WhyNow from "@/components/story/WhyNow";
import ValueChain from "@/components/story/ValueChain";
import BuiltForApac from "@/components/story/BuiltForApac";
import RuleEyebrow from "@/components/story/RuleEyebrow";
import hero from "@/assets/about/hero.jpg";

export const metadata: Metadata = {
  title: "Our Story | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "Fresh Food Expo APAC was created to build stronger connections across the fresh food ecosystem: a dedicated regional platform where fresh food, technology, logistics, distribution and markets come together.",
};

/** Figma 777:423 (Our_Story_Desktop). Sections sit 80px apart (83.32 below the hero). */
export default function OurStoryPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="story"
          title="Our Story"
          img={hero}
          // Figma stretches this fill (82.6% × 143.32%); kept at its true ratio with the same width, left edge and vertical centre.
          imgBox="lg:top-[-46.08%] lg:left-[17.42%] lg:h-[191.99%]! lg:w-[82.6%]"
          curveLeft={-20.98}
          stayHref="/subscribe"
        >
          Fresh Food Expo Asia Pacific (FFE APAC) was created with a clear purpose: to build stronger connections across the fresh food ecosystem and create a dedicated
          regional platform where fresh food, technology, logistics, distribution and markets come together.
        </PageHero>
        <StoryIntro />
        <WhyNow />
        <ValueChain />
        <BuiltForApac />
        {/* Figma 781:2855: the homepage banner, 499px, eyebrow + wider title, tighter photo crop, hero CTAs. */}
        <JoinBanner
          layout="mt-[48px] h-[880px] lg:mt-[80px] lg:h-[499px]"
          imgCls="lg:top-[-8.03%] lg:left-[23.85%] lg:h-[119.84%] lg:w-[78.64%]"
          inner="lg:pt-[56px] lg:pb-0 lg:pl-[14.5px]"
          eyebrow={
            <div className="mb-[16px] lg:mb-[19px] lg:ml-[2.5px]">
              <RuleEyebrow light>Connecting Asia Pacific’s fresh food future</RuleEyebrow>
            </div>
          }
          title={
            <>
              Be part of a stronger, <br className="max-md:hidden" />
              more connected fresh food future.
            </>
          }
          titleCls="md:max-w-[751px]! lg:ml-[5px]"
          lead="Fresh Food Expo APAC begins in Singapore in 2027 with a long-term ambition to build a leading regional platform connecting the businesses, technologies and markets shaping the fresh food future across Asia Pacific."
          leadMt="lg:mt-[27.21px] lg:ml-[1px] md:max-w-[679px]!"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[25.83px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[25px]" />}
        />
      </main>
      <Footer mt="mt-[48px] lg:mt-[80px]" />
      <RevealObserver />
    </>
  );
}
