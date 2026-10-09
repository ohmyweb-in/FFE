import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import { AllAccess, HostedBuyers, StayUpToDate } from "@/components/register/Sections";
import hero from "@/assets/visit/hero.jpg";
import calendar from "@/assets/exhibit/icon-calendar.svg";
import pin from "@/assets/exhibit/icon-pin.svg";

export const metadata: Metadata = {
  title: "Register to Visit | Fresh Food Expo APAC",
  description:
    "Register as a trade visitor to Fresh Food Expo APAC, Asia Pacific’s premier trade fair for fresh food. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

const VENUE = [
  { icon: calendar, text: "16–18 November 2027" },
  { icon: pin, text: "Sands Expo & Convention Centre, Singapore" },
];

/** Figma 793:3981 (Register_Visitor_Desktop). */
export default function RegisterToVisitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="register"
          title="Register as a Trade Visitor"
          img={hero}
          // Figma fill is 104.03% × 253.27% (stretched 25% tall); kept at its true ratio, same width, left edge and vertical centre.
          imgBox="lg:top-[-78.32%] lg:left-[16.45%] lg:h-[202.03%]! lg:w-[104.03%] lg:max-w-none"
          curveLeft={4.39}
          cta={
            <div className="untrim">
              {/* Sub (793:4306): 15/24, 3px right of the title. */}
              <p className="text-[15px] leading-[24px] font-medium lg:ml-[3px]">Be among the first to visit Asia Pacific’s premier trade fair for fresh food.</p>
              {/* Date & Venue (793:4309): 24px icons, 12px gap, 18/23 semibold, rows 10px apart, 4px padding. */}
              <ul className="mt-[20px] flex flex-col gap-[10px] py-[4px] md:mt-[23.38px] lg:ml-[3.5px]">
                {VENUE.map((v) => (
                  <li key={v.text} className="flex items-center gap-[12px]">
                    <Image src={v.icon} alt="" className="shrink-0" />
                    <span className="text-[17px] leading-[23px] font-semibold text-white md:text-[18px]">{v.text}</span>
                  </li>
                ))}
              </ul>
              <HeroCtas stayHref="/subscribe" registerHref="/register-to-visit/form" className="mt-[24px] md:mt-[25.52px] lg:-ml-[0.5px]" />
            </div>
          }
        />

        <StayUpToDate />
        <AllAccess />
        <HostedBuyers />
      </main>
      {/* Footer content (793:4144) sits 30px into its frame, 24px below the Hosted Buyers section. */}
      <Footer mt="mt-[48px] lg:mt-[78px]" />
      <RevealObserver />
    </>
  );
}
