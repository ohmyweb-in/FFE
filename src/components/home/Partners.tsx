import Image, { type StaticImageData } from "next/image";
import sfa from "@/assets/partners/sfa.png";
import temasek from "@/assets/partners/temasek.png";
import esg from "@/assets/partners/esg.png";
import secb from "@/assets/partners/secb.png";
import messe from "@/assets/partners/messe.png";
import sg from "@/assets/partners/sg.png";
import siaw from "@/assets/partners/siaw.png";

type Logo = { src: StaticImageData; alt: string };

// Figma 1268:92: 90px-tall tiles (each PNG is cut to its Figma box), 78px apart.
const SUPPORTED: Logo[] = [
  { src: sfa, alt: "Singapore Food Agency" },
  { src: temasek, alt: "Temasek" },
  { src: esg, alt: "Enterprise Singapore" },
  { src: secb, alt: "Singapore Exhibition & Convention Bureau" },
];

// Figma 1268:222 columns (395 / 315 / 365 wide, 123px apart) with the 1269:425 / 1268:85 / 1269:420 logos under them.
const ROLES: (Logo & { label: string })[] = [
  { label: "Organising Partner", src: messe, alt: "Messe Berlin Asia Pacific" },
  { label: "Held In", src: sg, alt: "Singapore: Passion Made Possible" },
  { label: "Participating Event Of", src: siaw, alt: "Singapore International Agri-Food Week" },
];

/** Green label with a rule on either side (Figma 1269:412). */
function Label({ children }: { children: string }) {
  return (
    <p className="flex h-[25px] items-center gap-[4px] text-[16px] font-semibold tracking-[0.02em] whitespace-nowrap text-accent uppercase before:h-px before:flex-1 before:bg-accent after:h-px after:flex-1 after:bg-accent lg:text-[18px] xl:text-[20px]">
      {children}
    </p>
  );
}

const logo = "h-[56px] w-auto md:h-[60px] lg:h-[70px] xl:h-[90px]";

/** Supporters / partners strip (Homepage_Updated 1268:223–1269:420), shown above the footer on every page. */
export default function Partners({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Partners" className={`container-page ${className}`}>
      <div className="mx-auto max-w-[755px]" data-reveal>
        <Label>Supported By</Label>
      </div>
      <ul className="mt-[20px] flex flex-wrap items-center justify-center gap-x-[32px] gap-y-[20px] md:gap-x-[40px] lg:mt-[26px] lg:gap-x-[56px] xl:gap-x-[78px]" data-reveal>
        {SUPPORTED.map((l) => (
          <li key={l.alt}>
            <Image src={l.src} alt={l.alt} sizes="250px" className={logo} />
          </li>
        ))}
      </ul>

      <ul className="mt-[40px] grid gap-y-[36px] lg:mt-[76px] lg:grid-cols-[395fr_315fr_365fr] lg:gap-x-[9.3%]">
        {ROLES.map((r) => (
          <li key={r.label} className="flex flex-col items-center" data-reveal>
            <div className="w-full max-w-[395px] lg:max-w-none">
              <Label>{r.label}</Label>
            </div>
            <Image src={r.src} alt={r.alt} sizes="320px" className={`mt-[20px] lg:mt-[34px] ${logo}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
