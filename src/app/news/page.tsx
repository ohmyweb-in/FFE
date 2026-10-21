import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import MediaEnquiries from "@/components/news/MediaEnquiries";
import NewsList from "@/components/news/NewsList";
import PressPhotos from "@/components/news/PressPhotos";
import StayUpdated from "@/components/news/StayUpdated";
import hero from "@/assets/about/hero.jpg";

export const metadata: Metadata = {
  title: "News & Press | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "The latest announcements, industry developments, partnerships and programme updates from Fresh Food Expo APAC, plus press photos and videos.",
};

/** Figma 1138:2540 (News & Press, was 736:3027). */
export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="compact"
          eyebrow="News & Media"
          title="News & Press"
          img={hero}
          imgBox="lg:top-[-0.09%] lg:left-[36.93%] lg:w-[63.04%]"
          stayHref="/subscribe"
        >
          Stay up to date with the latest announcements, industry developments, partnerships and programme updates from Fresh Food Expo Asia Pacific (FFE APAC).
        </PageHero>
        <MediaEnquiries />
        <NewsList />
        <PressPhotos />
        <StayUpdated />
      </main>
      <Footer mt="mt-[48px] lg:mt-[84px]" />
      <RevealObserver />
    </>
  );
}
