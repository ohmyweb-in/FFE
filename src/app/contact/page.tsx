import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import HelpCards from "@/components/contact/HelpCards";
import SendMessage from "@/components/contact/SendMessage";
import UsefulResources from "@/components/contact/UsefulResources";
import JoinPanel from "@/components/contact/JoinPanel";
import hero from "@/assets/contact/hero.jpg";

export const metadata: Metadata = {
  title: "Contact Us | Fresh Food Expo APAC",
  description:
    "Get in touch with the Fresh Food Expo APAC team about exhibiting, sponsorship, partnerships or general enquiries. We reply within three business days.",
};

/** Figma 1138:2812 (Contact_Us), hero per revision 450:2843. Sections sit 50px apart, as in the frame. */
export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* Figma 450:2843 revision: 298px title-only hero. Fill 83.25% × 223.38% at (16.75%, −93.64%) is the photo's true ratio. */}
        <PageHero
          size="contact"
          eyebrow="Get in touch"
          title="Contact Us"
          img={hero}
          imgBox="lg:top-[-93.64%] lg:left-[16.75%] lg:h-[223.38%]! lg:w-[83.25%] lg:max-w-none"
          curveLeft={-0.25}
        />
        <HelpCards />
        <SendMessage />
        <UsefulResources />
        <JoinPanel />
      </main>
      <Footer mt="mt-[48px] lg:mt-[50px]" />
      <RevealObserver />
    </>
  );
}
