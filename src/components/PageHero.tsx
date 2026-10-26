import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import heroCurve from "@/assets/about/hero-curve.png";
import ecoCurve from "@/assets/ecosystem/hero-curve.svg";
import exhibitCurve from "@/assets/exhibit/hero-curve.svg";
import registerCurve from "@/assets/register/hero-curve.svg";
import chevronSmBrand from "@/assets/chevron-sm-brand.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import calendar from "@/assets/exhibit/icon-calendar.svg";
import pin from "@/assets/exhibit/icon-pin.svg";
import { Button, DateVenue, crop } from "./ui";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

type Props = {
  /** Omitted on Our Story (title only). */
  eyebrow?: string;
  title: ReactNode;
  /** Omitted on Apply to Exhibit (copy sits below the panel). */
  children?: ReactNode;
  img: StaticImageData;
  /** Desktop position of the photo inside the 1395×501 panel (Figma fill box). */
  imgBox: string;
  /** Date + venue block (About only). */
  date?: string;
  /** Left offset of the corner curve (image 78) inside the panel. */
  curveLeft?: number;
  /** Hide the curve below 1440px, where it crosses the copy (Gallery). */
  curveLaptopHide?: boolean;
  /** "Stay Connected" target; omit to render no CTAs (Subscribe). */
  stayHref?: string;
  /** Replaces the three CTAs with a single custom one (SIAW). */
  cta?: ReactNode;
  /**
   * "compact" = News 736:3042: 426px panel, content at (67, 77), wider gaps, 195×165 curve.
   * "tall" = Subscribe 736:3301 (panel 496:3169: 371px): two-line title, content at (69.5, 55), 194.6×165.4 curve.
   * "siaw" = SIAW 624:1751: 516px panel, content at (73.5, 88), one 596px fade, 18/23 copy.
   * "eco" = Ecosystem 674:2726: 351px panel, content at (56, 64.37), 676/496px fades, 18/25 medium copy, vector curve.
   * "story" = Our Story 786:3140: 342px panel, no eyebrow, title cap top 59, 1016/538px fades, eco copy + curve.
   * "exhibit" = Why Exhibit 786:3081: 380px panel, no eyebrow, 18/26 copy, date block + CTAs passed in `cta`.
   * "apply" = Apply to Exhibit 786:3263: 246px panel (30px radius), three-line title only, exhibit curve.
   * "applyLong" = "apply" grown by one 48px title line (Apply to Exhibit with the full event name).
   * "plan" = Plan Your Visit 793:4215: 338px panel (30px radius), one 325px fade, one-line copy, date block + CTAs via `cta`.
   * "register" = Register as a Trade Visitor 793:4301: 404px panel (360px since the 30px sub line was dropped), title only; sub, date block + CTAs via `cta`; taller curve.
   * "why" = Why Visit 869:777: 316px panel (30px radius), title only; date block + CTAs via `cta`; exhibit curve.
   * "contact" = Contact Us 483:211: 298px panel, eyebrow + title only, image 78 curve at top 118.
   * "gallery" = Gallery 1288:856: "why" panel with the title lower (cap top 77) and two lines of 18/26 copy above the CTAs.
   */
  size?: "default" | "compact" | "tall" | "siaw" | "eco" | "story" | "exhibit" | "apply" | "applyLong" | "plan" | "register" | "why" | "contact" | "gallery";
};

type Size = { panel: string; curve: string; content: string; desc: string; date: string; ctas: string; title?: string; descType?: string; fades?: string[]; curveSrc?: StaticImageData };

const DESC_TYPE = "max-w-[535px] text-[17px] leading-[normal] tracking-[0.02em] md:mt-[22px] md:text-[22px] md:leading-[31px]";
// Two 538px fades over the photo’s left edge.
const FADES = ["left-[16.7%] w-[38.57%]", "left-[36.63%] w-[38.57%]"];

const SIZES: Record<NonNullable<Props["size"]>, Size> = {
  default: { panel: "lg:h-[501px]", curve: "bottom-0 h-[181px] w-[213px]", content: "lg:pt-[80px] lg:pl-[6.5px]", desc: "lg:mt-[31px]", date: "md:mt-[28px]", ctas: "md:mt-[34px]" },
  compact: { panel: "lg:h-[426px]", curve: "bottom-[5px] h-[165px] w-[195px]", content: "lg:pt-[77px] lg:pl-[12.5px]", desc: "lg:mt-[39px]", date: "md:mt-[28px]", ctas: "md:mt-[34px] lg:mt-[39.6px]" },
  tall: { panel: "lg:h-[371px]", curve: "bottom-0 h-[165.352px] w-[194.586px]", content: "lg:pt-[53px] lg:pl-[15px]", desc: "lg:mt-[20px]", date: "md:mt-[28px] lg:mt-[24px]", ctas: "" },
  // Copy is an untrimmed auto-layout text (top 248.94, 4×23px); CTA top 369.65.
  siaw: {
    panel: "lg:h-[516px]",
    curve: "bottom-[0.88px] h-[167.809px] w-[197.477px]",
    content: "lg:pt-[88px] lg:pl-[19px]",
    title: "lg:mt-[31.93px]",
    descType: "max-w-[694px] text-[17px] leading-[22px] [text-box:normal]! md:mt-[22px] md:text-[18px] md:leading-[23px]",
    // Browser trims the Fredoka title to 88px (Figma 90.63), so the gap absorbs the 2.8px to land at y 248.94.
    desc: "lg:mt-[30.88px]",
    date: "",
    ctas: "md:mt-[28.71px]",
    fades: ["left-[34.16%] w-[42.72%]"],
  },
  // Title (one line) cap top 105.37, copy (untrimmed, 2×25px) 166.37 and 4px right of the title, CTAs 246.37.
  eco: {
    panel: "lg:h-[351px]",
    // Group 1000015919: 230.62×184.32 at (−20.98, 171), runs 4.3px past the panel’s bottom edge.
    curve: "top-[171px] h-[184.316px] w-[230.623px]",
    curveSrc: ecoCurve,
    content: "lg:pt-[64.37px] lg:pl-[1.52px]",
    title: "lg:mt-[30.86px]",
    descType: "max-w-[625px] text-[17px] leading-[23px] font-medium [text-box:normal]! md:mt-[22px] md:text-[18px] md:leading-[25px] lg:ml-[4px]",
    desc: "lg:mt-[26px]",
    date: "",
    ctas: "md:mt-[30px]",
    fades: ["left-[16.35%] w-[48.46%]", "left-[16.35%] w-[35.56%]"],
  },
  // Title (no eyebrow) cap top 59 at x 55.01; copy (4×25px) top 118, 4px further right; CTAs 246.
  story: {
    panel: "lg:h-[342px]",
    curve: "top-[161px] h-[184.316px] w-[230.623px]",
    curveSrc: ecoCurve,
    content: "lg:pt-[59px] lg:pl-[0.51px]",
    title: "mt-0!",
    descType: "max-w-[625px] text-[17px] leading-[23px] font-medium [text-box:normal]! md:mt-[22px] md:text-[18px] md:leading-[25px] lg:ml-[4px]",
    desc: "lg:mt-[24px]",
    date: "",
    ctas: "md:mt-[28px]",
    fades: ["left-[16.35%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
  // Title cap top 59 at x 55.49; copy (2×26px) top 117; date block 191 (via `cta`, followed by the CTAs at 286).
  exhibit: {
    panel: "lg:h-[380px]",
    // Group 1000015919: 196.84×157.32 at (4.37, 212).
    curve: "top-[212px] h-[157.316px] w-[196.841px]",
    curveSrc: exhibitCurve,
    content: "lg:pt-[59px] lg:pl-[0.99px]",
    title: "mt-0!",
    descType: "max-w-[620px] text-[17px] leading-[23px] font-medium [text-box:normal]! md:mt-[22px] md:text-[18px] md:leading-[26px] lg:ml-[4px]",
    desc: "lg:mt-[23px]",
    date: "",
    ctas: "md:mt-[22px]",
    fades: ["left-[16.42%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
  // Title cap top 59 at x 67.5 (13px inside the content column). Curve at (3.39, 93), 4px past the bottom edge.
  apply: {
    panel: "lg:h-[246px] lg:rounded-[30px]!",
    curve: "top-[93px] h-[157.316px] w-[196.841px]",
    curveSrc: exhibitCurve,
    content: "lg:pt-[59px] lg:pl-[13px]",
    title: "mt-0! lg:text-[45px]! lg:leading-[48px]!",
    desc: "",
    date: "",
    ctas: "",
    fades: ["left-[16.34%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
  // "apply" + one 48px title line; the curve moves down with the bottom edge.
  applyLong: {
    panel: "lg:h-[294px] lg:rounded-[30px]!",
    curve: "top-[141px] h-[157.316px] w-[196.841px]",
    curveSrc: exhibitCurve,
    content: "lg:pt-[59px] lg:pl-[13px]",
    title: "mt-0! lg:text-[45px]! lg:leading-[48px]!",
    desc: "",
    date: "",
    ctas: "",
    fades: ["left-[16.34%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
  // Title cap top 54 at x 54 (0.5px left of the column); copy (1×26px) top 112; date block 156 (via `cta`), CTAs 251. Curve at (3.88, 174).
  plan: {
    panel: "lg:h-[338px] lg:rounded-[30px]!",
    curve: "top-[174px] h-[157.316px] w-[196.841px]",
    curveSrc: exhibitCurve,
    content: "lg:-left-[0.5px] lg:pt-[54px]",
    title: "mt-0!",
    descType: "max-w-[620px] text-[17px] leading-[23px] font-medium [text-box:normal]! md:mt-[22px] md:text-[18px] md:leading-[26px]",
    desc: "lg:mt-[23px]",
    date: "",
    ctas: "md:mt-[18px]",
    // Second fade only at lg–xl, where the narrower panel puts the CTAs over the bright sky.
    fades: ["left-[34.95%] w-[23.3%]", "left-[34.95%] w-[30%] xl:hidden!"],
  },
  // Title cap top 71 at x 55; sub (untrimmed) top 132 via `cta`. Curve Group 1000015919: 196.84×207.85 at (4.39, 215.98).
  register: {
    panel: "lg:h-[360px] lg:rounded-[30px]!",
    curve: "top-[171.98px] h-[207.848px] w-[196.842px]",
    curveSrc: registerCurve,
    content: "lg:pt-[71px] lg:pl-[0.5px]",
    title: "mt-0!",
    desc: "",
    date: "",
    // Browser trims the title to 35px (Figma 34), so 26px lands the sub at y 132.
    ctas: "md:mt-[26px]",
    fades: ["left-[16.42%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
  // Eyebrow cap top 111 at x 54.63, title 41px below. image 78 (213×181) at (−0.25, 118), 1px past the panel’s bottom edge.
  contact: {
    panel: "lg:h-[298px]",
    curve: "top-[118px] h-[181px] w-[213px]",
    content: "lg:pt-[111px] lg:pl-[0.13px]",
    desc: "",
    date: "",
    ctas: "",
    fades: ["left-[16.72%] w-[38.57%]", "left-[16.75%] w-[38.57%]"],
  },
  // Title cap top 59 at x 55; date block (via `cta`) top 120, CTAs 215. Curve at (3.89, 142).
  why: {
    panel: "lg:h-[316px] lg:rounded-[30px]!",
    curve: "top-[142px] h-[157.316px] w-[196.841px]",
    curveSrc: exhibitCurve,
    content: "lg:pt-[59px] lg:pl-[0.5px]",
    title: "mt-0!",
    desc: "",
    date: "",
    ctas: "md:mt-[26px]",
    fades: ["left-[16.34%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
  // Title cap top 77 at x 55; copy (untrimmed, 448px wide) top 134; CTAs 215. Curve at (3.89, 162).
  gallery: {
    panel: "lg:h-[316px] lg:rounded-[30px]!",
    curve: "top-[162px] h-[157.316px] w-[196.841px]",
    curveSrc: exhibitCurve,
    content: "lg:pt-[77px] lg:pl-[0.5px]",
    title: "mt-0!",
    descType: "max-w-[448px] text-[17px] leading-[23px] font-medium [text-box:normal]! md:mt-[22px] md:text-[18px] md:leading-[26px]",
    // Browser trims the title to 35px, so 22px lands the copy at y 134.
    desc: "lg:mt-[22px]",
    date: "",
    ctas: "md:mt-[29px]",
    fades: ["left-[16.34%] w-[72.83%]", "left-[16.34%] w-[38.57%]"],
  },
};

/**
 * Inner-page hero: 1395×501 brand panel, photo on the right, two 538px fades, three CTAs.
 * Figma 736:2149 (About), 736:2710 (Contact).
 */
export default function PageHero({ eyebrow, title, children, img, imgBox, date, curveLeft = 0, curveLaptopHide, stayHref, cta, size = "default" }: Props) {
  const z = SIZES[size];
  return (
    <section id="top" className="container-wide relative mt-[10px] md:mt-0">
      <div className={`relative overflow-hidden rounded-[20px] bg-brand md:rounded-[24px] lg:rounded-[25px] ${z.panel}`}>
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={img}
            alt=""
            preload
            quality={90}
            placeholder="blur"
            sizes="(min-width: 1024px) 880px, 100vw"
            className={`absolute inset-0 size-full object-cover lg:inset-auto lg:h-full ${imgBox}`}
          />
        </div>
        {/* Below lg: brand green over the photo so white copy stays readable. */}
        <div className="absolute inset-0 bg-linear-to-b from-brand from-35% via-brand/85 to-brand/65 lg:hidden" />
        {/* Desktop: brand fades over the photo's left edge. -ml-[3px] tucks each fade under the photo's edge so no hairline shows when zoomed. */}
        {(z.fades ?? FADES).map((f) => (
          <div key={f} className={`absolute inset-y-0 -ml-[3px] hidden bg-linear-to-l from-brand/0 to-brand lg:block ${f}`} />
        ))}
        {/* image 78: 213×181 slot, Figma fill crop. */}
        <span className={`pointer-events-none absolute hidden overflow-hidden ${curveLaptopHide ? "min-[1440px]:block" : "lg:block"} ${z.curve}`} style={{ left: curveLeft }} aria-hidden>
          {z.curveSrc ? <Image src={z.curveSrc} alt="" className="max-w-none" /> : <Image src={heroCurve} alt="" sizes="231px" style={crop(108.45, 101.93, -8.45, 0)} />}
        </span>

        <div className={`container-page relative pt-[48px] pb-[56px] text-white md:pt-12 md:pb-16 lg:pb-0 ${z.content}`}>
          {eyebrow && (
            <p className="eyebrow load-in" style={i(0)}>
              {eyebrow}
            </p>
          )}
          <h1
            className={`load-in mt-[22px] font-display text-[30px] leading-[35px] font-semibold tracking-[0.02em] uppercase md:text-[44px] md:leading-[1.08] lg:text-[50px] lg:leading-[53px] ${z.title ?? "lg:mt-[31px]"}`}
            style={i(1)}
          >
            {title}
          </h1>
          {children && (
            <p className={`load-in mt-[23px] ${z.descType ?? DESC_TYPE} ${z.desc}`} style={i(2)}>
              {children}
            </p>
          )}
          {date && <DateVenue date={date} className={`load-in mt-[22px] ${z.date}`} style={i(3)} />}

          {cta ? (
            <div className={`load-in mt-[24px] ${z.ctas}`} style={i(4)}>
              {cta}
            </div>
          ) : (
            stayHref && <HeroCtas stayHref={stayHref} className={`load-in mt-[24px] ${z.ctas}`} style={i(4)} />
          )}
        </div>
      </div>
    </section>
  );
}

const VENUE = [
  { icon: calendar, text: "16–18 November 2027" },
  { icon: pin, text: "Sands Expo & Convention Centre, Singapore" },
];

/** Date & Venue for `cta` heroes (786:3088 / 869:783 / 1053:249): 24px icons, 12px gap, 18/23 semibold, rows 10px apart, 4px padding, 4px right of the title. */
export function HeroVenue() {
  return (
    <ul className="flex flex-col gap-[10px] py-[4px] lg:ml-[4px]">
      {VENUE.map((v) => (
        <li key={v.text} className="flex items-center gap-[12px]">
          <Image src={v.icon} alt="" className="shrink-0" />
          <span className="text-[17px] leading-[23px] font-semibold text-white md:text-[18px]">{v.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Register / Apply / Stay Connected: white 200/162/162×40 pills (hero, SIAW join banner). */
export function HeroCtas({ stayHref, registerHref = "/register-to-visit", className = "", style }: { stayHref: string; registerHref?: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`flex flex-col items-start gap-[11px] md:flex-row md:flex-wrap md:gap-[13px] ${className}`} style={style}>
      <Button href={registerHref} chevron={chevronSmBrand} w={200} h={40} pl={19} gap={12} fs={15} m={{ w: 202, h: 43, pl: 25, gap: 7, fs: 15 }} className="border border-white bg-white text-brand">
        Register Your Interest
      </Button>
      <Button href="/apply-to-exhibit" chevron={chevronSmWhite} w={162} h={40} pl={19} gap={12} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-white text-white hover:bg-white/10">
        Apply To Exhibit
      </Button>
      <Button href={stayHref} chevron={chevronSmWhite} w={162} h={40} pl={19} gap={14} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-white text-white hover:bg-white/10">
        Stay Connected
      </Button>
    </div>
  );
}
