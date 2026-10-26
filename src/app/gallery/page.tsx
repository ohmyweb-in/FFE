import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import RuleEyebrow from "@/components/story/RuleEyebrow";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { ALBUMS } from "@/components/gallery/albums";
import hero from "@/assets/hero.jpg";

export const metadata: Metadata = {
  title: "Gallery | Fresh Food Expo Asia Pacific (FFE APAC)",
  description: "Event photos from Fresh Food Expo Asia Pacific (FFE APAC) for editorial use, including the Partner Event Launch Signing Ceremony.",
};

/** Figma 1288:840 (Gallery). */
export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="gallery"
          title="Gallery"
          img={hero}
          // Homepage hero photo in the Figma photo box; cover crops off the credit along the bottom.
          imgBox="lg:top-0 lg:left-[16.31%] lg:w-[83.72%]"
          curveLeft={3.89}
          curveLaptopHide
          stayHref="/subscribe"
        >
          Please note that these photos are intended solely for editorial use.
        </PageHero>

        <GalleryGrid items={ALBUMS.map((a) => ({ thumb: a.photos[0].thumb, alt: a.title, title: a.title, href: `/gallery/${a.slug}/` }))} />

        {/* Figma 1288:1220: same 412px banner as Who Should Exhibit (781:2682). */}
        <JoinBanner
          layout="mt-[48px] h-[760px] lg:mt-[60px] lg:h-[412px]"
          imgCls="lg:top-[-21.24%] lg:left-[23.7%] lg:h-[145.14%] lg:w-[78.64%]"
          inner="lg:pt-[56px] lg:pb-0 lg:pl-[14.5px]"
          eyebrow={
            <div className="mb-[16px] lg:mb-[19px] lg:ml-[2.5px]">
              <RuleEyebrow light>Put your business at the centre of</RuleEyebrow>
            </div>
          }
          title="Asia Pacific’s fresh food industry"
          titleCls="md:max-w-[730px]! lg:ml-[5px]"
          lead="Showcase your products and solutions, meet prospective buyers and partners, and build new commercial opportunities across the region."
          leadMt="lg:mt-[28.41px] lg:ml-[0.5px] md:max-w-[591px]!"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[30.83px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[25px]" />}
        />
      </main>
      <Footer mt="mt-[48px] lg:mt-[64px]" />
      <RevealObserver />
    </>
  );
}
