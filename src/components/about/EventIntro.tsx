import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import event1 from "@/assets/about/event-1.jpg";
import join from "@/assets/join.jpg"; // production (28 Oct): the wide keynote photo, not the event-2 crop
import event3 from "@/assets/about/event-3.jpg";

type Card = { title: string; lead: string; body: string; img: StaticImageData; alt: string; textW: number; titleX: number; imgH: number };

// Figma 736:2211 / 736:2203 / 736:2195 (411×203). Text widths, title offsets and photo heights per card.
const CARDS: Card[] = [
  {
    title: "The Event",
    lead: "Connecting the Fresh Food Industry",
    body: "Fresh Food Expo APAC connects the fresh food ecosystem across the source-to-market value chain, bringing businesses and decision-makers together in Singapore.",
    img: event1,
    alt: "Visitors crowding the aisles beside an exhibitor stand",
    textW: 254,
    titleX: 34,
    imgH: 203,
  },
  {
    title: "The Ecosystem",
    lead: "From Source to Market",
    body: "Discover fresh food, post-harvest technologies, cooling, packaging, cold chain, logistics, distribution and market access—all within one platform.",
    img: join,
    alt: "Audience watching a keynote on a green-lit stage",
    textW: 264,
    titleX: 34,
    imgH: 203,
  },
  {
    title: "The Opportunity",
    lead: "Connect. Source. Grow.",
    body: "Meet growers, producers, exporters, suppliers, technology providers, buyers and industry partners from Asia Pacific and global markets.",
    img: event3,
    alt: "Busy exhibition hall under a large Berlin banner",
    textW: 250,
    titleX: 36,
    imgH: 187,
  },
];

export default function EventIntro() {
  return (
    <section className="untrim mt-[46px] w-[min(1263px,100%-2*var(--gutter))] mx-auto">
      <div className="flex flex-col items-center gap-[16px] text-center text-accent" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] uppercase">About the event</p>
        <h2 className="trim font-display text-[30px] leading-[normal] font-semibold md:text-[40px] lg:text-[48px] lg:leading-[52.2px]">Fresh Food Expo APAC</h2>
      </div>

      <ul className="mx-auto mt-[36px] grid max-w-[600px] gap-[15px] xl:max-w-none xl:grid-cols-3">
        {CARDS.map((c, idx) => (
          <li key={c.title} data-reveal style={{ "--i": idx } as CSSProperties}>
            <article className="lift group relative h-full min-h-[203px] overflow-hidden rounded-[15px] rounded-br-[75px] bg-linear-to-r from-mint to-page pt-[25px] pr-[131px] pb-[24px] pl-[22px]">
              <div className="absolute top-0 right-0 w-[119px] overflow-hidden rounded-tl-[75px] rounded-tr-[15px] rounded-br-[75px] bg-[#d9d9d9]" style={{ height: c.imgH }}>
                <Image src={c.img} alt={c.alt} placeholder="blur" sizes="240px" className="zoom size-full object-cover" />
              </div>
              {/* Bar 736:2218 (4×37, round caps) at x22; title cap top 8px below it. Grows with a wrapped title. */}
              <div className="relative min-h-[37px] pt-[8px]">
                <span className="absolute inset-y-0 left-0 w-[4px] rounded-full bg-accent" aria-hidden />
                <h3 className="trim font-display text-[22px] leading-[1.2] font-semibold text-accent md:text-[25px] md:leading-[normal]" style={{ marginLeft: c.titleX - 22 }}>
                  {c.title}
                </h3>
              </div>
              <p className="mt-[12px] text-[13px] leading-[20px] font-medium text-body xl:max-w-(--tw)" style={{ "--tw": `${c.textW}px` } as CSSProperties}>
                <b className="font-semibold">{c.lead}</b>
                <br />
                {c.body}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
