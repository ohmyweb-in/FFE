import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import Enquiry from "@/components/apply/Enquiry";
import hero from "@/assets/apply/hero.jpg";

export const metadata: Metadata = {
  title: "Apply to Exhibit | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "Secure your stand at Fresh Food Expo APAC. Complete the enquiry form and our sales team will contact you within three business days. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Figma 1138:3506 (Apply_to_Exhibit_Desktop). */
export default function ApplyToExhibitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="applyLong"
          title={
            <>
              Let’s Discuss Your <br className="max-lg:hidden" />
              Participation at <br className="max-lg:hidden" />
              Fresh Food Expo <br className="max-lg:hidden" />
              Asia Pacific <span className="whitespace-nowrap">(FFE APAC)</span>
            </>
          }
          img={hero}
          // Figma fill is 92.41% × 310.08% (5% taller than the photo); kept at its true ratio, same width, left edge and vertical centre.
          // Same 725px photo box as the 246px panel (top −131.96%, h 294.75%), rescaled to 294px and kept centred.
          imgBox="lg:top-[-102.25%] lg:left-[16.36%] lg:h-[246.63%]! lg:w-[92.41%] lg:max-w-none"
          curveLeft={3.39}
        />

        {/* Intro (786:3268/9): 18px body copy 39px under the panel (untrimmed tops 285 / 322), at x 77 of the panel = 22.5px inside its content column. */}
        <div className="container-wide">
          <div className="untrim container-page mt-[28px] text-[16px] leading-[24px] font-medium text-body md:text-[18px] lg:mt-[39px] lg:pl-[22.5px] [&>p]:max-w-[1101px]">
            <p className="load-in md:leading-[26px]" style={i(2)}>
              Whether you’re ready to secure your stand or are still exploring the best participation option for your business, our team is here to
              help.
            </p>
            <p className="load-in mt-[11px] md:leading-[27px]" style={i(3)}>
              Complete the <strong className="font-semibold">enquiry form below</strong> and a member of our sales team will contact you within{" "}
              <strong className="font-semibold">three business days</strong> to understand your objectives, recommend the most suitable participation
              opportunities and answer any questions you may have.
            </p>
          </div>
        </div>

        <Enquiry />
      </main>
      {/* Footer content (Figma group 781:1665) sits 40px into its frame: 112px below the card. */}
      <Footer mt="mt-[64px] lg:mt-[112px]" />
      <RevealObserver />
    </>
  );
}
