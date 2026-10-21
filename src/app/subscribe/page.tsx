import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import SubscribeSection from "@/components/subscribe/SubscribeSection";
import hero from "@/assets/subscribe/hero.jpg";

export const metadata: Metadata = {
  title: "Subscribe | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "Join the FFE APAC community: be the first to know about new exhibitors, programme announcements, networking opportunities and industry news.",
};

/** Figma 736:3286 (Subscribe_Desktop), content and media per revision 495:2222. */
export default function SubscribePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="tall"
          eyebrow="Stay connected"
          title={
            <>
              Join the Fresh Food Expo <br className="hidden lg:block" />
              {/* Up to 7px wider than the title box around 1024, so it stays one line on desktop. */}
              <span className="lg:whitespace-nowrap">
                Asia Pacific <span className="whitespace-nowrap">(FFE APAC)</span> community
              </span>
            </>
          }
          img={hero}
          // Figma 496:3169 fill: 63.35% × 143.09% at (36.67%, −21.54%), the true ratio of the photo.
          imgBox="lg:top-[-21.54%] lg:left-[36.67%] lg:h-[143.09%]! lg:w-[63.35%] lg:max-w-none"
          date="16–18 November 2027"
        >
          Subscribe to stay connected
        </PageHero>
        <SubscribeSection />
      </main>
      {/* Section has 64px bottom padding in Figma; footer content starts 20px into its frame. */}
      <Footer mt="mt-[48px] lg:mt-[84px]" />
      <RevealObserver />
    </>
  );
}
