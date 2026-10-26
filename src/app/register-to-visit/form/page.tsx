import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import hero from "@/assets/visit/hero.jpg";
import VisitorForm from "@/components/register/VisitorForm";

export const metadata: Metadata = {
  title: "Visitor Registration | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "Register as a trade visitor to Fresh Food Expo APAC. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

/** No Figma frame: Apply to Exhibit hero + its enquiry card holding the visitor form (rebuilt from the Microsoft Form). */
export default function VisitorFormPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="apply"
          title={
            <>
              Register Your <br className="max-lg:hidden" />
              Interest
            </>
          }
          img={hero}
          imgBox="lg:top-[-78.32%] lg:left-[16.45%] lg:h-[202.03%]! lg:w-[104.03%] lg:max-w-none"
          curveLeft={3.39}
        />

        {/* Apply to Exhibit's enquiry card (781:1521), full row width. */}
        <section className="untrim mx-auto mt-[32px] w-[min(1360px,100%-2*var(--gutter))] scroll-mt-[calc(var(--header-h)+16px)] rounded-[24px] bg-white px-[22px] py-[32px] md:mt-[40px] md:rounded-[28px] md:p-[40px] lg:mt-[45px] xl:px-[56px] xl:py-[48px]" data-reveal>
          <VisitorForm />
        </section>
      </main>
      <Footer mt="mt-[64px] lg:mt-[112px]" />
      <RevealObserver />
    </>
  );
}
