import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import buyerMeeting from "@/assets/exhibit/buyer-meeting.jpg";
import standChat from "@/assets/exhibit/stand-chat.jpg";
import ship from "@/assets/exhibit/b-ship.svg";
import truck from "@/assets/exhibit/b-truck.svg";
import store from "@/assets/exhibit/b-store.svg";
import cart from "@/assets/exhibit/b-cart.svg";
import utensils from "@/assets/exhibit/b-utensils.svg";
import users from "@/assets/exhibit/b-users.svg";
import globe from "@/assets/exhibit/b-globe.svg";
import monitor from "@/assets/exhibit/b-monitor.svg";
import { Pill, box } from "../ui";

const M = (l: number, t: number, w: number, h: number) => box(440, 520, l, t, w, h);

// Figma 777:745 / 777:770. Line breaks as in Figma; "Procurement" wraps inside a 101px box.
const BUYERS: { label: string; icon: StaticImageData; w?: string }[] = [
  { label: "Importers", icon: ship },
  { label: "Distributors", icon: truck },
  { label: "Wholesalers", icon: store },
  { label: "Retailers", icon: cart },
  { label: "Foodservice\nOperators", icon: utensils },
  { label: "Procurement &\nSourcing", icon: users, w: "md:max-w-[101px]" },
  { label: "Traders", icon: globe },
  { label: "E-commerce &\nGrocery", icon: monitor },
];

/** Figma 777:739: 800px copy with the buyer-type grid, 40px gap, 440×520 photo pair. */
export default function Buyers() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col gap-[40px] lg:mt-[72px] xl:flex-row xl:items-center">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]" data-reveal>
        {/* Figma's text box is 37px for a 46px line, so the copy below sits 9px higher. */}
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px] xl:h-[37px]">
          Connect with the buyers that matter
        </h2>
        <p className="text-[17px] leading-[24px] font-medium text-body md:text-[18px] md:leading-[26px]">
          Meet professionals responsible for sourcing, procurement, distribution and purchasing across the fresh food industry.
        </p>
        <div className="flex w-full flex-col gap-[14px] rounded-[22px] bg-linear-to-r from-mint to-[#eef6ef] px-[16px] py-[20px]">
          <p className="text-[17px] leading-[22px] font-semibold text-accent">Fresh Food Expo Asia Pacific (FFE APAC) brings together:</p>
          <ul className="grid gap-x-[10px] gap-y-[14px] min-[400px]:grid-cols-2 md:grid-cols-4">
            {BUYERS.map((b) => (
              <li key={b.label} className="flex h-[64px] items-center gap-[12px] rounded-[14px] bg-white px-[14px] py-[12px]">
                <Image src={b.icon} alt="" className="shrink-0" />
                <span className={`min-w-0 flex-1 text-[14px] leading-[18px] font-medium whitespace-pre-line text-black max-sm:whitespace-normal ${b.w ?? ""}`}>{b.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[15px] leading-[24px] font-medium text-body">
          Build new relationships, reconnect with existing customers and put your business in front of prospective buyers from across Asia Pacific and
          global markets.
        </p>
        <Pill href="/who-should-visit" className="border-[1.5px] border-black text-black hover:bg-black/5">
          Who Should Visit
        </Pill>
      </div>

      {/* Media 440×520 (1138:3307): the 777:739 photo pair scaled to 0.898 and moved in, meeting photo 359×359 at (22, 26), stand photo 216×198 (7px page-colour frame) at (202, 295). */}
      <div className="relative mx-auto aspect-[440/520] w-full max-w-[440px] md:aspect-[2/1] md:max-w-none xl:mx-0 xl:aspect-[440/520] xl:w-[440px] xl:shrink-0" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <div className="group overflow-hidden rounded-[23.35px] bg-linear-to-b from-mint to-[#c2e3c3]" style={M(22, 26, 359.23, 359.23)}>
          {/* Fill 175.67% wide at −40.26% → cover, 53.2% across. */}
          <Image src={buyerMeeting} alt="Journalists interviewing a speaker on the show floor" placeholder="blur" sizes="360px" className="zoom size-full object-cover object-[53.2%_50%]" />
        </div>
        <div className="group overflow-hidden rounded-[21.55px] border-[7.185px] border-page bg-linear-to-b from-mint to-[#c2e3c3]" style={M(201.62, 295.42, 215.54, 197.58)}>
          {/* Fill 161.16% × 100% of the framed box at (3.68%, 1.03%), measured inside the 7px frame; hides the photo credit. */}
          <Image
            src={standChat}
            alt="Two visitors talking at an exhibitor stand"
            placeholder="blur"
            sizes="350px"
            className="zoom absolute top-[-2.81%] left-[0.37%] h-[107.84%] w-[172.69%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
