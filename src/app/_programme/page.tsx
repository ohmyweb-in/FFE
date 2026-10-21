// Phase 2: hidden from routing by the _ prefix. Rename the folder back to `programme` to publish /programme.
import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import ProgrammeHero from "@/components/programme/ProgrammeHero";
import PlanExperience from "@/components/programme/PlanExperience";
import Agenda from "@/components/programme/Agenda";
import StayUpdated from "@/components/news/StayUpdated";

export const metadata: Metadata = {
  title: "Conference Programme | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "The Fresh Food Expo APAC 2027 conference agenda: keynotes, panels and presentations on the future of fresh food across Asia Pacific.",
};

/** Figma 736:3475 (Programme_Desktop) + click states 736:3845. */
export default function ProgrammePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <ProgrammeHero />
        <PlanExperience />
        <Agenda />
        <StayUpdated
          eyebrow="Stay connected"
          title={
            <>
              Get the <span className="text-accent">latest</span> updates
            </>
          }
          copy="Subscribe to receive the latest news, programme announcements and event updates from Fresh Food Expo APAC."
          mt="mt-0"
        />
      </main>
      {/* Panel section has 56px bottom padding; footer content starts 20px into its frame. */}
      <Footer mt="mt-[48px] lg:mt-[76px]" />
      <RevealObserver />
    </>
  );
}
