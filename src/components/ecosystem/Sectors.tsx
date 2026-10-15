import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import sprig from "@/assets/ecosystem/leaf-sprig.png";
import sprout from "@/assets/ecosystem/icon-sprout.svg";
import gear from "@/assets/ecosystem/icon-gear.svg";
import truck from "@/assets/ecosystem/icon-truck.svg";
import fruitVeg from "@/assets/ecosystem/sectors/fruit-veg.jpg";
import meat from "@/assets/ecosystem/sectors/meat.jpg";
import seafood from "@/assets/ecosystem/sectors/seafood.jpg";
import eggs from "@/assets/ecosystem/sectors/eggs.jpg";
import agritech from "@/assets/ecosystem/sectors/agritech.jpg";
import cooling from "@/assets/ecosystem/sectors/cooling.jpg";
import preservation from "@/assets/ecosystem/sectors/preservation.jpg";
import packaging from "@/assets/ecosystem/sectors/packaging.jpg";
import transport from "@/assets/ecosystem/sectors/transport.jpg";
import coldChain from "@/assets/ecosystem/sectors/cold-chain.jpg";
import warehousing from "@/assets/ecosystem/sectors/warehousing.jpg";
import supplyChain from "@/assets/ecosystem/sectors/supply-chain.jpg";

type Item = { name: string; text: string; img: StaticImageData; alt: string };
type Column = { title: string; icon: StaticImageData; desc: string; descW?: string; items: Item[] };

// Figma 450:3898 / 450:3948 / 450:3998. Item photos are tiles of one sprite in Figma, cut to the 96×78 slot.
const COLUMNS: Column[] = [
  {
    title: "Fresh Food",
    icon: sprout,
    desc: "The ingredients at the heart of the fresh food ecosystem.",
    items: [
      { name: "Fruit & Vegetables", text: "Fresh fruits  ·  Fresh vegetables  ·  Tropical and exotic produce", img: fruitVeg, alt: "Fresh vegetables and fruit on a wooden table" },
      { name: "Meat & Poultry", text: "Beef  ·  Pork  ·  Poultry  ·  Other fresh meat products", img: meat, alt: "Raw beef steaks and chicken breasts" },
      { name: "Seafood", text: "Fish  ·  Shellfish  ·  Crustaceans  ·  Other fresh and chilled seafood", img: seafood, alt: "Fresh fish, salmon and prawns on ice" },
      { name: "Eggs & Dairy", text: "Eggs  ·  Milk  ·  Cheese  ·  Other fresh dairy products", img: eggs, alt: "Milk bottle, eggs and cheese" },
    ],
  },
  {
    title: "Agri & Fresh Technology",
    icon: gear,
    desc: "Technologies and solutions that help maintain freshness, protect product quality, extend shelf life and improve efficiency.",
    items: [
      { name: "AgriTech", text: "Technologies supporting greater efficiency, visibility and control across fresh food operations.", img: agritech, alt: "Sensor camera above greenhouse lettuce" },
      { name: "Cooling", text: "Refrigeration  ·  Temperature control  ·  Pre-cooling  ·  Cooling systems", img: cooling, alt: "Industrial refrigeration condenser units" },
      { name: "Preservation", text: "Post-harvest solutions  ·  Freshness extension  ·  Storage technologies  ·  Quality preservation", img: preservation, alt: "Apples being washed on a processing line" },
      { name: "Packaging", text: "Fresh food packaging  ·  Sustainable packaging  ·  Modified-atmosphere solutions  ·  Smart packaging  ·  Labelling", img: packaging, alt: "Salads in sustainable food containers" },
    ],
  },
  {
    title: "Logistics & Distribution",
    icon: truck,
    desc: "Infrastructure, services and technologies that enable fresh food to move efficiently across local, regional and international markets while maintaining product quality.",
    descW: "xl:max-w-[348px]",
    items: [
      { name: "Transportation", text: "Air  ·  Sea  ·  Land  ·  Rail", img: transport, alt: "Refrigerated truck on a road" },
      { name: "Cold Chain", text: "Temperature-controlled transportation · Refrigerated storage  ·  Cold chain monitoring", img: coldChain, alt: "Pallets of produce in a refrigerated container" },
      { name: "Warehousing", text: "Cold storage  ·  Distribution centres  · Inventory management  ·  Fulfilment", img: warehousing, alt: "Aisle of a cold storage warehouse" },
      { name: "Supply Chain", text: "Supply chain infrastructure  ·  Traceability  · Digital solutions  ·  Distribution networks  · Supply chain technology", img: supplyChain, alt: "Tablet showing a supply chain map" },
    ],
  },
];

/** Figma 450:3890: heading, leaf sprig, three 619px sector columns (24px gaps). */
export default function Sectors() {
  return (
    <section className="untrim container-narrow relative mt-[48px] flex flex-col items-start gap-[14px] lg:mt-[67px]">
      {/* image 86: 176.39×168.4, rotated −34.04° inside a 240.43×238.28 box at (991, −9.32). */}
      <div className="pointer-events-none absolute top-[-9.32px] right-[48.57px] hidden h-[238.283px] w-[240.432px] xl:block" aria-hidden>
        <Image src={sprig} alt="" sizes="180px" className="absolute top-1/2 left-1/2 h-[168.397px] w-[176.392px] max-w-none -translate-1/2 rotate-[-34.04deg]" />
      </div>

      <div className="relative flex flex-col items-start gap-[14px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Industry sectors</p>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[42px] lg:leading-[48px]">
          Explore the Industry Sectors
        </h2>
        <p className="max-w-[900px] text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
          Fresh Food Expo APAC brings together companies and organisations involved in fresh food, the technologies that preserve its quality, and the
          logistics and distribution systems that connect it with markets.
        </p>
      </div>

      <div className="grid w-full gap-[24px] pt-[22px] md:grid-cols-2 xl:grid-cols-3">
        {COLUMNS.map((c, idx) => (
          <article
            key={c.title}
            className="lift flex flex-col gap-[16px] rounded-[28px] bg-white px-[20px] pt-[28px] pb-[30px] drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)] md:px-[26px] xl:h-[619px]"
            data-reveal
            style={{ "--i": idx } as CSSProperties}
          >
            <div className="flex items-center gap-[14px]">
              <span className="grid size-[52px] shrink-0 place-items-center rounded-full border-[1.5px] border-accent bg-white">
                <Image src={c.icon} alt="" />
              </span>
              <h3 className="min-w-0 flex-1 font-display text-[24px] leading-[30px] font-semibold text-accent">{c.title}</h3>
            </div>
            <p className={`text-[15px] leading-[22px] font-medium text-body ${c.descW ?? ""}`}>{c.desc}</p>
            <ul className="flex flex-col gap-[18px] pt-[8px]">
              {c.items.map((it) => (
                <li key={it.name} className="group flex items-start gap-[16px]">
                  <div className="relative h-[78px] w-[96px] shrink-0 overflow-hidden rounded-[14px] bg-linear-to-b from-mint to-[#c2e3c3]">
                    <Image src={it.img} alt={it.alt} placeholder="blur" sizes="96px" className="zoom absolute inset-0 size-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-[5px] pt-[4px]">
                    <h4 className="text-[16px] leading-[20px] font-semibold text-accent">{it.name}</h4>
                    <p className="text-[13px] leading-[18px] font-medium text-body lg:whitespace-pre-wrap">{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
