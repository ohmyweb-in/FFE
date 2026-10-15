import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import { Resources, Venue, WhereToStay } from "@/components/plan/Sections";
import hero from "@/assets/plan/hero.jpg";
import calendar from "@/assets/exhibit/icon-calendar.svg";
import pin from "@/assets/exhibit/icon-pin.svg";

export const metadata: Metadata = {
  title: "Plan Your Visit | Fresh Food Expo APAC",
  description:
    "Make the most of your time at Fresh Food Expo APAC: getting to Sands Expo & Convention Centre, visa information, useful tips and where to stay in Singapore. 16–18 November 2027.",
};

const VENUE = [
  { icon: calendar, text: "16–18 November 2027" },
  { icon: pin, text: "Sands Expo & Convention Centre, Singapore" },
];

/** Figma 1138:4309 (Plan Your Visit). */
export default function PlanYourVisitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="plan"
          title="Plan Your Visit"
          img={hero}
          imgBox="lg:top-[-43.35%] lg:left-[35.16%] lg:h-[200.74%]! lg:w-[64.85%] lg:max-w-none"
          curveLeft={3.88}
          cta={
            <>
              {/* Date & Venue (793:4221): 24px icons, 12px gap, 18/23 semibold, rows 10px apart, 4px padding. */}
              <ul className="flex flex-col gap-[10px] py-[4px]">
                {VENUE.map((v) => (
                  <li key={v.text} className="flex items-center gap-[12px]">
                    <Image src={v.icon} alt="" className="shrink-0" />
                    <span className="text-[17px] leading-[23px] font-semibold text-white md:text-[18px]">{v.text}</span>
                  </li>
                ))}
              </ul>
              {/* CTA group sits 4px left of the copy (x 50 in the panel). */}
              <HeroCtas stayHref="/subscribe" className="mt-[24px] md:mt-[29px] lg:-ml-[4px]" />
            </>
          }
        >
          Make the most of your time at Fresh Food Expo APAC.
        </PageHero>

        <Venue />
        <Resources />
        <WhereToStay />

        {/* Figma 781:2550: 395px banner, no eyebrow, one-line title. Figma's fill is 78.64% × 127.23% (stretched 19% wide here);
            kept at the photo's true ratio, same width, left edge and vertical centre. */}
        <JoinBanner
          layout="mt-[48px] h-[720px] lg:mt-[72.32px] lg:h-[395px]"
          imgCls="lg:top-[-30.89%] lg:left-[23.7%] lg:h-[151.77%] lg:w-[78.64%]"
          inner="lg:pt-[55.26px] lg:pb-0 lg:pl-[14.5px]"
          title="See You in Singapore"
          titleCls="md:max-w-[730px]! lg:ml-[4.5px]"
          lead="Join fresh food suppliers, technology providers, logistics specialists, buyers and industry professionals from across Asia Pacific and global markets."
          leadMt="lg:mt-[39.72px] lg:ml-[0.5px] md:max-w-[591px]!"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[30.83px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[25px]" />}
        />
      </main>
      {/* Footer content (781:2466) sits 30px into its frame, 21.68px below the banner. */}
      <Footer mt="mt-[48px] lg:mt-[51.68px]" />
      <RevealObserver />
    </>
  );
}
