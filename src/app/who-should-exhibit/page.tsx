import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas, HeroVenue } from "@/components/PageHero";
import { Intro } from "@/components/why/Sections";
import JoinBanner from "@/components/home/JoinBanner";
import RuleEyebrow from "@/components/story/RuleEyebrow";
import SectorCard from "@/components/who/SectorCard";
import hero from "@/assets/who/hero.jpg";
import imgFresh from "@/assets/siaw/card-fresh.jpg";
import imgTech from "@/assets/who/tech-processing.jpg";
import imgLogistics from "@/assets/eco-logistics.jpg";
import basket from "@/assets/who/f-basket.svg";
import apple from "@/assets/who/f-apple.svg";
import meat from "@/assets/who/f-meat.svg";
import fish from "@/assets/who/f-fish.svg";
import milk from "@/assets/who/f-milk.svg";
import gear from "@/assets/who/t-gear.svg";
import thermo from "@/assets/who/t-thermo.svg";
import snowLg from "@/assets/who/t-snow.svg";
import boxIcon from "@/assets/who/t-box.svg";
import warehouse from "@/assets/who/t-warehouse.svg";
import leafIcon from "@/assets/who/t-leaf.svg";
import truck from "@/assets/who/l-truck.svg";
import plane from "@/assets/who/l-plane.svg";
import snow from "@/assets/who/l-snow.svg";
import network from "@/assets/who/l-network.svg";

export const metadata: Metadata = {
  title: "Who Should Exhibit | Fresh Food Expo Asia Pacific (FFE APAC)",
  description:
    "If your business plays a role in bringing fresh food from source to buyer, Fresh Food Expo Asia Pacific (FFE APAC) provides a dedicated platform to connect with buyers, partners and industry decision-makers across Asia Pacific.",
};

/** Figma 1142:5034 (Who_Should_Exhibit; hero as 1053:242). Intro 42px under the hero, cards 24px apart. */
export default function WhoShouldExhibitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="why"
          title="Who Should Exhibit"
          img={hero}
          imgBox="lg:top-[-54.32%] lg:left-[16.31%] lg:h-[208.36%]! lg:w-[83.72%]"
          curveLeft={3.89}
          cta={
            <>
              <HeroVenue />
              <HeroCtas stayHref="/subscribe" className="mt-[24px] md:mt-[29px]" />
            </>
          }
        />

        <Intro>
          If your business plays a role in bringing fresh food from source to buyer, Fresh Food Expo Asia Pacific (FFE APAC) provides a dedicated platform to connect with buyers,
          partners and industry decision-makers across Asia Pacific.
        </Intro>

        <SectorCard
          mt="mt-[24px]"
          title={
            <>
              Fresh Food
            </>
          }
          lead="For growers, producers, exporters and suppliers of:"
          icon={basket}
          tiles="row"
          tileH="min-h-[62px]"
          items={[
            { label: "Fruit &\nVegetables", icon: apple },
            { label: "Meat &\nPoultry", icon: meat },
            { label: "Seafood", icon: fish },
            { label: "Eggs &\nDairy", icon: milk },
          ]}
          text="Connect with importers, distributors, retailers, wholesalers, foodservice operators and sourcing professionals looking for new products and suppliers."
          img={imgFresh}
          alt="Worker sorting fresh vegetables at a packing station"
          // Fill 121.09% tall at −4.83% → cover, 22.9% down.
          pos="object-[50%_22.9%]"
        />
        <SectorCard
          mt="mt-[24px]"
          flip
          title="Agri & Fresh Technology"
          lead="For companies providing technologies and solutions that help maintain quality, extend shelf life and reduce losses."
          icon={gear}
          tiles="stack"
          tileH="min-h-[123px]"
          items={[
            { label: "Agricultural\nTechnologies", icon: thermo },
            { label: "Cooling &\nRefrigeration", icon: snowLg },
            { label: "Preservation &\nStorage", icon: boxIcon },
            { label: "Packaging", icon: warehouse },
            { label: "Freshness-\nExtension\nSolutions", icon: leafIcon },
          ]}
          text="Showcase solutions to businesses looking to improve how fresh food is handled, protected and prepared for the market."
          img={imgTech}
          alt="Workers in protective clothing on a food-processing line"
          // Figma 1142:5169 fill: 113.97% × 115.48% at (−6.9%, −0.08%) = cover zoomed 1.14× from the top centre (hides the photo credit).
          pos="object-top scale-[1.14] origin-top"
        />
        <SectorCard
          mt="mt-[24px]"
          title="Logistics & Distribution"
          lead="For companies providing the infrastructure, services and technologies that move fresh food safely and efficiently."
          icon={truck}
          tiles="row"
          tileH="min-h-[79px]"
          items={[
            { label: "Transportation\n– Air, Sea, Land\n& Rail", icon: plane },
            { label: "Cold Chain", icon: snow },
            { label: "Warehousing", icon: warehouse },
            { label: "Supply Chain\nSolutions", icon: network },
          ]}
          text="Connect with fresh food suppliers, distributors and buyers looking for reliable logistics and supply chain partners."
          img={imgLogistics}
          alt="Refrigerated truck being loaded with fresh produce at a cold storage facility"
          // Figma reuses a 410×150 crop here (154.08% tall), which would stretch the photo; true-ratio cover, same centre.
          pos="object-[50%_41%]"
        />

        {/* Figma 781:2682: the homepage banner, 412px, eyebrow + one-line title, hero CTAs. */}
        <JoinBanner
          layout="mt-[48px] h-[760px] lg:mt-[24px] lg:h-[412px]"
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
