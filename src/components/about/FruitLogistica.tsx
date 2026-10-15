import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import flPhoto from "@/assets/about/fruit-logistica.png";
import gwPhoto from "@/assets/about/gruene-woche.jpg";
import dots from "@/assets/about/dots.svg";
import flLogo from "@/assets/logo-fruit-logistica.svg";
import CountUp from "../CountUp";
import { box } from "../ui";

type Stat = { n: ReactNode; label: string | [string, string] };

type Props = {
  title: string;
  copy: [string, string];
  note: string;
  stats: Stat[];
  photo: StaticImageData;
  alt: string;
  /** Logo over the photo’s top-left (FRUIT LOGISTICA only). */
  logo?: boolean;
  /** Photo on the left at lg+ (GRÜNE WOCHE 1138:1718). */
  flip?: boolean;
  className: string;
};

// Media collage (736:2363 / 1138:1719) is a 608×420 frame; shapes overhang its edges.
const m = (l: number, t: number, w: number, h: number) => box(608, 420, l, t, w, h);

function GlobalExpertise({ title, copy, note, stats, photo, alt, logo, flip, className }: Props) {
  return (
    <section className={`untrim container-narrow flex flex-col gap-[40px] lg:items-center lg:gap-[40px] xl:gap-[72px] ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} ${className}`}>
      <div className="flex flex-col items-start gap-[16px] lg:w-[54%] lg:shrink-0 xl:w-[600px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Global expertise</p>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]">{title}</h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[22px] font-medium text-body">
          <p>{copy[0]}</p>
          <p>{copy[1]}</p>
        </div>
        {/* GRÜNE WOCHE keeps the note inside the copy block (12px gap, not 16). */}
        <p className={`text-[12px] leading-[15px] font-medium text-body ${flip ? "-mt-[4px]" : ""}`}>{note}</p>
        {/* Stats (736:2350): 2×2 on phones (as the mobile frame), one row from md. */}
        <dl className="grid w-full grid-cols-2 gap-y-[16px] pt-[10px] whitespace-nowrap md:flex">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={`flex flex-col-reverse justify-end gap-[6px] pr-[16px] ${idx % 2 ? "border-l border-[#c2e3c3] pl-[18px]" : ""} ${idx === 2 ? "md:border-l md:border-[#c2e3c3] md:pl-[18px]" : ""} ${idx === 3 ? "md:flex-1" : ""}`}
            >
              <dt className="text-[13px] leading-[17px] font-medium text-body">
                {Array.isArray(s.label) ? (
                  <>
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </>
                ) : (
                  s.label
                )}
              </dt>
              <dd className="font-display text-[28px] leading-[34px] font-semibold text-accent">{s.n}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mx-auto aspect-[608/420] w-full max-w-[608px] lg:mx-0 lg:min-w-0 lg:flex-1" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <Image src={dots} alt="" aria-hidden style={m(-10, 160, 61, 75)} />
        <div className="rounded-tr-[90px] rounded-bl-[90px] bg-accent" style={m(496, -21, 130, 150)} aria-hidden />
        <div className="rounded-br-[110px] bg-sun" style={m(464, 296, 170, 140)} aria-hidden />
        <div className="group overflow-hidden rounded-[30px] rounded-bl-none" style={m(20, 8, 568, 400)}>
          <Image src={photo} alt={alt} placeholder="blur" sizes="(min-width: 1024px) 568px, 95vw" className="zoom size-full object-cover" />
        </div>
        {logo && <Image src={flLogo} alt="FRUIT LOGISTICA" style={m(61, 49.68, 131, 44.885)} />}
      </div>
    </section>
  );
}

/** Figma 1138:1646. */
export default function FruitLogistica() {
  return (
    <GlobalExpertise
      title="FRUIT LOGISTICA"
      copy={[
        "Fresh Food Expo APAC draws on the international fresh produce expertise behind FRUIT LOGISTICA in Berlin, the leading trade show for the global fresh produce business.",
        "Bringing together the international fresh produce industry across the entire value chain, FRUIT LOGISTICA demonstrates the global reach, industry connections and trade fair expertise that Messe Berlin has built over decades.",
      ]}
      note="*Figures below refer to FRUIT LOGISTICA in Berlin and not to Fresh Food Expo APAC."
      stats={[
        { n: <CountUp to={2500} suffix="+" group />, label: "Exhibitors" },
        { n: <CountUp to={90000} suffix="+" group />, label: "Trade visitors" },
        { n: <CountUp to={150} suffix="+" />, label: ["Countries", "represented"] },
        { n: "Since 1993", label: ["Organised by", "Messe Berlin"] },
      ]}
      photo={flPhoto}
      alt="Visitors walking towards the Messe Berlin hall in winter"
      logo
      className="mt-[46px] lg:mt-[74px]"
    />
  );
}

/** Figma 1138:1718: the FRUIT LOGISTICA block mirrored, 46px below it. */
export function GrueneWoche() {
  return (
    <GlobalExpertise
      title="GRÜNE WOCHE"
      copy={[
        "Fresh Food Expo APAC draws on the international food and agriculture expertise behind GRÜNE WOCHE in Berlin, one of the world’s leading exhibitions for food, agriculture and horticulture, with a legacy spanning 100 years.",
        "Bringing together producers, industry leaders, policymakers and international stakeholders, GRÜNE WOCHE provides a global platform for agricultural innovation, sustainability and industry dialogue, reflecting Messe Berlin’s longstanding expertise in connecting the food and agriculture ecosystem.",
      ]}
      note="*Figures below refer to GRÜNE WOCHE in Berlin and not to Fresh Food Expo APAC."
      stats={[
        { n: <CountUp to={1600} suffix="+" group />, label: "Exhibitors" },
        { n: <CountUp to={350000} suffix="+" group />, label: "Trade visitors" },
        { n: <CountUp to={300} suffix="+" />, label: ["Forums, seminars,", "conferences"] },
        { n: "Since 1926", label: ["Organised by", "Messe Berlin"] },
      ]}
      photo={gwPhoto}
      alt="The Messe Berlin hall facade against a blue sky"
      flip
      className="mt-[46px]"
    />
  );
}
