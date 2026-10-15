import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import RuleEyebrow from "../story/RuleEyebrow";
import { Pill, crop } from "../ui";
import pin from "@/assets/apply/icon-pin.svg";
import leaf from "@/assets/plan/leaf.svg";
import visa from "@/assets/plan/visa.jpg";
import mbs from "@/assets/plan/mbs-privileges.jpg";
import tips from "@/assets/plan/tips.jpg";
import singapore from "@/assets/plan/visit-singapore.jpg";
import hotelMbs from "@/assets/plan/hotel-mbs.jpg";
import hotelCbd from "@/assets/plan/hotel-cbd.jpg";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const EMAIL = "marketing@freshfoodexpoapac.com";
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Sands+Expo+and+Convention+Centre+Singapore";
// Keyless Google Maps embed.
const MAP_EMBED = "https://www.google.com/maps?q=Sands+Expo+and+Convention+Centre,+10+Bayfront+Avenue,+Singapore+018956&z=16&output=embed";

/** Getting to the venue (781:2292): 600×320 map + content (gap 16), 48px apart; x 60–1360 at 1440, 8px vertical padding. */
export function Venue() {
  return (
    <section className="untrim relative mt-[32px] lg:mt-[40.32px]">
      <div className="mx-auto flex w-[min(1300px,100%-2*var(--gutter))] flex-col gap-[28px] lg:flex-row lg:items-center lg:gap-[48px] lg:py-[8px] xl:relative xl:-left-[10px]">
        {/* Taller on phones so the embedded map stays usable; Figma's 600×320 from sm. */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-linear-to-b from-mint to-[#c2e3c3] sm:aspect-[600/320] lg:w-[46%] lg:shrink-0 xl:w-[600px]"
          data-reveal
        >
          <iframe
            src={MAP_EMBED}
            title="Map: Sands Expo & Convention Centre, 10 Bayfront Avenue, Singapore"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]" data-reveal style={i(1)}>
          <RuleEyebrow>Getting to the venue</RuleEyebrow>
          <h2 className="font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[32px] md:leading-[40px]">
            Sands Expo &amp; Convention Centre <span className="whitespace-nowrap">(Hall F)</span>
          </h2>
          <p className="text-[15px] leading-[24px] font-medium text-black md:text-[16px] md:leading-[25px]">
            Located in the heart of Singapore’s Marina Bay precinct, Sands Expo &amp; Convention Centre is one of Asia’s premier venues for
            international exhibitions, conferences and business events.
          </p>
          <p className="flex items-center gap-[12px] text-[16px] leading-[22px] font-semibold text-[#032919] md:text-[17px]">
            <Image src={pin} alt="" className="size-[24px] shrink-0" />
            10 Bayfront Avenue, Singapore 018956
          </p>
          <div className="pt-[6px]">
            <Pill href={DIRECTIONS} className="border-[1.5px] border-black text-black hover:bg-black/5">
              Get Directions
            </Pill>
          </div>
        </div>
      </div>
      {/* image 11 [Vectorized] (669:681) at (1167, 218.68) of the full-width frame, running 20px into the next section. */}
      <Image
        src={leaf}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[218.68px] right-[max(19.07px,calc(50%-700.93px))] hidden xl:block"
      />
    </section>
  );
}

type Resource = {
  title: string;
  text: ReactNode;
  cta: string;
  href: string;
  img: StaticImageData;
  alt: string;
  fit: { className?: string; style?: CSSProperties };
};

// Image boxes keep Figma’s 294×164; fills at the photo’s true ratio. Insets are 18/16 from the card’s outer edge (17/15 inside its 1px border).
const RESOURCES: Resource[] = [
  {
    title: "Visa Information",
    text: (
      <>
        Contact{" "}
        <a href={`mailto:${EMAIL}`} className="text-accent transition-colors duration-(--dur-ui) hover:text-forest">
          {EMAIL}
        </a>{" "}
        if you need help with visa requirements, application processes, or travel guidelines to ensure a hassle-free entry.
      </>
    ),
    cta: "Contact Us",
    href: "/contact",
    img: visa,
    alt: "The Merlion and Marina Bay skyline",
    // Fill 100% × 119.73% at −6.35%.
    fit: { className: "size-full object-cover object-[50%_32.2%]" },
  },
  {
    title: "Marina Bay Sands Privileges",
    text: "Access special promotions across world-renowned luxury brands, lifestyle stores and premium restaurants located within MBS.",
    cta: "Unlock Your Privileges",
    href: "https://www.marinabaysands.com/shopping/guest-privileges.html",
    img: mbs,
    alt: "Marina Bay Sands and the ArtScience Museum at dusk",
    // Fill 140.67% × 132.93% at (−14.49%, −13.41%): the photo’s own ratio, zoomed in.
    fit: { style: crop(140.67, 132.93, -14.49, -13.41) },
  },
  {
    title: "Useful Tips",
    text: (
      <>
        Everything you need to ensure a smooth and enjoyable visit to <span className="text-accent">FFE APAC.</span>
      </>
    ),
    cta: "Get Helpful Tips",
    href: "https://www.visitsingapore.com/travel-tips/essential-travel-information/",
    img: tips,
    alt: "Supertree Grove at Gardens by the Bay at night",
    fit: { className: "size-full object-cover object-top" },
  },
  {
    title: "Visit Singapore",
    text: "A dynamic city where innovation, culture, and business thrive—see what makes it the perfect destination.",
    cta: "Explore Now",
    href: "https://www.visitsingapore.com",
    img: singapore,
    alt: "Colourful shophouses in Chinatown, Singapore",
    fit: { className: "size-full object-cover" },
  },
];

/** Additional Resources (781:2333 + 793:4692): heading at x 40, then four 330×404 cards 18px apart (x 33–1407). */
export function Resources() {
  return (
    <section className="untrim mt-[48px] lg:mt-[40px]">
      <h2 className="mx-auto w-[min(1360px,100%-2*var(--gutter))] md:flex md:items-center md:gap-[16px]" data-reveal>
        <span className="font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[32px] md:leading-[38px]">
          Additional {/* Phones: the rule stays on the last word's line. From md it's a flex sibling, centred as in Figma. */}
          <span className="whitespace-nowrap">
            Resources
            <span aria-hidden className="ml-[16px] inline-block h-[2px] w-[36px] rounded-[1px] bg-accent align-middle md:hidden" />
          </span>
        </span>
        <span aria-hidden className="hidden h-[2px] w-[36px] shrink-0 rounded-[1px] bg-accent md:block" />
      </h2>
      <ul className="mx-auto mt-[18.68px] grid w-[min(1374px,100%-2*var(--gutter))] gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {RESOURCES.map((r, n) => (
          <li key={r.title} className="flex" data-reveal style={i(n)}>
            {/* Hover lift on an inner box: the reveal rule owns the <li>'s transform. */}
            <div className="group lift flex w-full flex-col overflow-hidden rounded-[32px] rounded-tr-none border border-accent bg-page xl:min-h-[404px]">
              <div className="mx-[17px] mt-[15px] aspect-[294/164] overflow-hidden rounded-tl-[25px] border border-accent bg-[#d9d9d9]">
                <div className="zoom relative size-full">
                  <Image
                    src={r.img}
                    alt={r.alt}
                    placeholder="blur"
                    sizes="(min-width: 1280px) 294px, (min-width: 640px) 45vw, 90vw"
                    className={`absolute ${r.fit.className ?? ""}`}
                    style={r.fit.style}
                  />
                </div>
              </div>
              <div className="mx-[17px] mt-[22px] mb-[24px] flex flex-1 flex-col gap-[12px]">
                <h3 className="text-[17px] leading-[22px] font-semibold text-[#032919]">{r.title}</h3>
                <p className="text-[13px] leading-[19px] font-medium text-body">{r.text}</p>
              </div>
              <a
                href={r.href}
                {...(r.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                className="-mx-px -mb-px flex h-[50px] items-center justify-center rounded-b-[32px] border border-accent bg-accent text-[17px] leading-[22px] font-semibold text-white uppercase transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                {r.cta}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const HOTELS = [
  {
    title: "Marina Bay Sands",
    sub: "(Connected to Venue)",
    img: hotelMbs,
    alt: "Marina Bay Sands and the ArtScience Museum reflected in the bay at night",
  },
  { title: "Central Business District", sub: "(In Marina Bay)", img: hotelCbd, alt: "Singapore city skyline across Marina Bay at dusk" },
];

/** Where to stay (793:4543): 560px copy + hotel cards (flex-1, 18px apart), 40px gap; x 78–1358 at 1440. */
export function WhereToStay() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col gap-[32px] lg:mt-[59px] lg:flex-row lg:items-center lg:gap-[40px] xl:relative xl:-left-[2px]">
      <div className="flex flex-col items-start gap-[16px] lg:w-[44%] lg:shrink-0 xl:w-[560px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Accommodation</p>
        <h2 className="font-display text-[34px] leading-[40px] font-semibold text-forest md:text-[44px] md:leading-[50px]">Where to Stay</h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[24px] font-medium text-body">
          <p>
            Singapore offers a wide range of accommodation options within and around Marina Bay, as well as convenient connections from other parts of
            the city.
          </p>
          <p>
            Visitors can choose from hotels across Marina Bay, the Central Business District and surrounding neighbourhoods, with easy access to Sands
            Expo &amp; Convention Centre by public transport, taxi or private-hire services.
          </p>
        </div>
      </div>
      <ul className="grid min-w-0 flex-1 gap-[18px] min-[480px]:grid-cols-2">
        {HOTELS.map((h, n) => (
          <li key={h.title} data-reveal style={i(n + 1)}>
            <div className="group lift overflow-hidden rounded-[20px] bg-white shadow-[0_12px_32px_rgb(3_41_26/0.1)]">
              <div className="relative h-[200px] overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3] md:h-[220px]">
                <Image
                  src={h.img}
                  alt={h.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 331px, (min-width: 480px) 50vw, 100vw"
                  className="zoom size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[3px] pt-[16px] pr-[16px] pb-[18px] pl-[18px]">
                <h3 className="text-[16px] leading-[20px] font-semibold text-forest">{h.title}</h3>
                <p className="text-[13px] leading-[17px] font-medium text-body">{h.sub}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
