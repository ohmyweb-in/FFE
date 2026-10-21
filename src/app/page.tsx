import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Siaw from "@/components/home/Siaw";
import Ecosystem from "@/components/home/Ecosystem";
import BeInvolved from "@/components/home/BeInvolved";
import Organiser from "@/components/home/Organiser";
import JoinBanner from "@/components/home/JoinBanner";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col overflow-x-clip md:block">
        <Hero />
        <About />
        <Siaw />
        <Ecosystem />
        <BeInvolved />
        <Organiser />
        <JoinBanner date="16-18 Nov. 2027" />
        <Newsletter />
      </main>
      {/* Partners label 112px below the newsletter collage (Figma 1138:140). */}
      <Footer mt="mt-[47px] md:mt-20 lg:mt-[112px]" />
      <RevealObserver />
    </>
  );
}
