import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { crop } from "../ui";
import apple from "@/assets/why/i-apple.svg";
import meat from "@/assets/why/i-meat.svg";
import fish from "@/assets/why/i-fish.svg";
import milk from "@/assets/why/i-milk.svg";
import network from "@/assets/why/i-network.svg";
import truck from "@/assets/why/i-truck.svg";
import ship from "@/assets/why/i-ship.svg";
import layers from "@/assets/why/i-layers.svg";
import leaf from "@/assets/who/t-leaf.svg";
import snow from "@/assets/who/t-snow.svg";
import box from "@/assets/who/t-box.svg";
import produce from "@/assets/siaw/card-fresh.jpg";
import tech from "@/assets/why/tech-packing.jpg";
import networking from "@/assets/why/networking.jpg";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
// Rows span x 53–1387 at 1440.
const ROW = "mx-auto w-[min(1334px,100%-2*var(--gutter))]";
const H2 = "text-[26px] leading-[32px] font-semibold text-forest md:text-[30px] md:leading-[34px]";
const P = "text-[15px] leading-[24px] font-medium text-black md:text-[16px] md:leading-[25px]";

/** Intro under the hero (869:782, also Who Should Exhibit 1053:248): 15/23 copy at x 72, 5px #28ae3d rule (968:1814) at x 59, 56px tall, 5px above the text. */
export function Intro({ children }: { children: ReactNode }) {
  return (
    <div className={`untrim mt-[32px] lg:mt-[42px] ${ROW}`} data-reveal>
      <p className="relative max-w-[1285px] pl-[19px] text-[15px] leading-[23px] font-medium text-body">
        <span aria-hidden className="absolute -top-[5px] -bottom-[5px] left-[6px] w-[5px] bg-accent" />
        {children}
      </p>
    </div>
  );
}

type Item = { icon: StaticImageData; label: string[] };

/** Items (869:468 / 968:1854): mint/70 box, 16px radius, 10/16 padding; six equal columns 4px apart (3 per row on phones). */
function Items({ items }: { items: Item[] }) {
  return (
    <ul className="grid w-full grid-cols-3 gap-x-[4px] gap-y-[16px] rounded-[16px] bg-mint/70 px-[10px] py-[16px] md:grid-cols-6">
      {items.map((it) => (
        <li key={it.label.join(" ")} className="group flex flex-col items-center gap-[8px] text-center text-[12px] leading-[16px] font-medium text-[#032919]">
          <Image src={it.icon} alt="" className="size-[30px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:-translate-y-[3px]" />
          <span>
            {it.label.map((l, k) => (
              <span key={l}>
                {k > 0 && <br />}
                {l}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Body({ title, lead, items, close, className = "" }: { title: string; lead: string; items: Item[]; close: string; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col items-start gap-[14px] lg:px-[16px] ${className}`} data-reveal style={i(1)}>
      <h2 className={H2}>{title}</h2>
      <p className={P}>{lead}</p>
      <Items items={items} />
      <p className={P}>{close}</p>
    </div>
  );
}

function Photo({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`group relative w-full shrink-0 overflow-hidden rounded-[18px] bg-linear-to-b from-mint to-[#c2e3c3] ${className}`} data-reveal>
      <div className="zoom size-full">{children}</div>
    </div>
  );
}

const PRODUCTS: Item[] = [
  { icon: apple, label: ["Fruits &", "Vegetables"] },
  { icon: meat, label: ["Meat &", "Poultry"] },
  { icon: fish, label: ["Seafood"] },
  { icon: milk, label: ["Eggs & Dairy"] },
  { icon: network, label: ["Technologies Provider"] },
  { icon: truck, label: ["Logistic & Distribution", "Provider"] },
];

const TECH: Item[] = [
  { icon: leaf, label: ["Agricultural", "Technologies"] },
  { icon: truck, label: ["Cold Chain"] },
  { icon: ship, label: ["Transportation"] },
  { icon: snow, label: ["Cooling &", "Refrigeration"] },
  { icon: box, label: ["Preservation", "& Storage"] },
  { icon: layers, label: ["Packaging"] },
];

/** Discover new products (869:458 + 869:465): 322×246 photo, body 15px to its right (16px sides, 19px right inset to x 1384). */
export function Products() {
  return (
    <section className={`untrim mt-[40px] flex flex-col gap-[24px] lg:mt-[44px] lg:flex-row lg:items-start lg:gap-[15px] ${ROW}`}>
      <Photo className="aspect-[322/246] lg:w-[322px]">
        <Image src={produce} alt="Worker sorting fresh vegetables at a packing station" placeholder="blur" sizes="(min-width: 1024px) 322px, 100vw" className="size-full object-cover" />
      </Photo>
      <Body
        className="lg:pr-[19px]"
        title="Discover new products and suppliers"
        lead="Connect directly with growers, producers, exporters and suppliers offering:"
        items={PRODUCTS}
        close="Identify new sourcing opportunities, compare suppliers and build relationships that support your business."
      />
    </section>
  );
}

/** Discover technologies (968:1851 + 968:1849): body (pt 1, 16px sides) then a 378×230 photo, 30px apart. Phones: photo first. */
export function Technologies() {
  return (
    <section className={`untrim mt-[48px] flex flex-col gap-[24px] lg:mt-[67px] lg:flex-row lg:items-start lg:gap-[30px] ${ROW}`}>
      <Body
        className="lg:pt-px"
        title="Discover technologies and supply chain solutions"
        lead="Explore technologies and services that help maintain freshness, improve efficiency and move fresh food safely to market."
        items={TECH}
        close="Meet solution providers and discover practical ways to strengthen your operations and supply chain."
      />
      <Photo className="aspect-[378/230] max-lg:order-first lg:w-[378px]">
        {/* Figma 1138:4607 fill: 116.5% × 100% at (−8.18%, −0.15%), the photo's true ratio. */}
        <Image src={tech} alt="Packaged fresh chicken moving along a packing line conveyor" placeholder="blur" sizes="(min-width: 1024px) 440px, 100vw" style={crop(116.5, 100, -8.18, -0.15)} />
      </Photo>
    </section>
  );
}

/** Build valuable business connections (968:1907 + 968:1923): 322×187 photo at x 66, copy 35px right (794px, 16px sides), centred. */
export function Connections() {
  return (
    <section className={`untrim mt-[48px] flex flex-col gap-[24px] lg:mt-[60px] lg:flex-row lg:items-center lg:gap-[35px] lg:pl-[13px] ${ROW}`}>
      <Photo className="aspect-[322/187] lg:w-[322px]">
        {/* Figma 1138:4687 fill: 135.4% × 137.17% at (−6.21%, −9.94%), the photo's true ratio. */}
        <Image src={networking} alt="Two visitors talking on the exhibition floor" placeholder="blur" sizes="(min-width: 1024px) 440px, 100vw" style={crop(135.4, 137.17, -6.21, -9.94)} />
      </Photo>
      <div className="flex max-w-[794px] min-w-0 flex-1 flex-col gap-[14px] lg:px-[16px]" data-reveal style={i(1)}>
        <h2 className={H2}>Build valuable business connections</h2>
        <p className={P}>Meet suppliers, partners and industry decision-makers from across the fresh food ecosystem.</p>
        <p className={P}>
          Use Fresh Food Expo APAC to source new products, discover new solutions, exchange market insights and build commercial relationships across Asia
          Pacific.
        </p>
      </div>
    </section>
  );
}
