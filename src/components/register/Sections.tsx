import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Pill, crop } from "../ui";
import leaf from "@/assets/register/leaf.svg";
import bell from "@/assets/register/i-bell.svg";
import megaphone from "@/assets/register/i-megaphone.svg";
import users from "@/assets/register/i-users.svg";
import news from "@/assets/register/i-news.svg";
import info from "@/assets/register/i-info.svg";
import showfloor from "@/assets/siaw/tomatoes.jpg";
import handshake from "@/assets/exhibit.jpg";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const ROW = "mx-auto w-[min(1360px,100%-2*var(--gutter))]";

/** Lines as Figma breaks them at full width; they reflow on smaller screens. */
const Lines = ({ lines }: { lines: string[] }) =>
  lines.map((l, k) => (
    <span key={l}>
      {k > 0 && <br className="max-xl:hidden" />}
      {k > 0 && " "}
      {l}
    </span>
  ));

const BENEFITS: { icon: StaticImageData; title: string[]; text: string[] }[] = [
  { icon: bell, title: ["Priority notification", "when visitor registration", "opens"], text: ["Be among the first to know when visitor registration for", "Fresh Food Expo Asia Pacific (FFE APAC) goes live."] },
  { icon: megaphone, title: ["Exhibitor and product", "announcements"], text: ["Discover the fresh food suppliers, technologies and solutions joining the event."] },
  { icon: users, title: ["Conference and", "programme updates"], text: ["Stay informed about speakers, sessions, site visits and other programme highlights."] },
  { icon: news, title: ["Event news and", "visitor opportunities"], text: ["Receive the latest announcements and opportunities to make the most of your visit."] },
  { icon: info, title: ["Practical information", "to plan your visit"], text: ["Get useful updates on the venue, travel and other information ahead of the event."] },
];

/** Stay up to date (793:4035): 1360px mint panel, 40px sides, 20px between blocks; five benefit columns split by #c2e3c3 rules. */
export function StayUpToDate() {
  return (
    <section className={`untrim relative mt-[32px] flex flex-col gap-[20px] overflow-hidden rounded-[24px] bg-linear-to-b from-mint to-[#eef6ef] px-[22px] py-[28px] md:rounded-[28px] md:px-[40px] md:pt-[32px] md:pb-[32px] lg:mt-[43.83px] ${ROW}`}>
      {/* image 11 [Vectorized] (793:4402) at (1124, 10.17) of the panel. */}
      <Image src={leaf} alt="" aria-hidden className="pointer-events-none absolute top-[10.17px] right-[10.26px] hidden xl:block" />
      <h2 className="relative flex items-center gap-[16px]" data-reveal>
        <span className="font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[34px] md:leading-[40px]">Stay Up to Date.</span>
        <span aria-hidden className="h-[2px] w-[36px] shrink-0 rounded-[1px] bg-accent" />
      </h2>
      <p className="relative text-[16px] leading-[24px] font-medium text-black md:text-[17px]">By registering your interest today, you’ll receive:</p>
      <ul className="grid gap-x-[22px] gap-y-[28px] pt-[8px] sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:gap-0">
        {BENEFITS.map((b, n) => (
          <li
            key={b.title[0]}
            className="group flex flex-col items-start gap-[12px] border-[#c2e3c3] xl:flex-1 xl:border-r xl:px-[22px] xl:first:pl-0 xl:last:border-r-0 sm:max-lg:last:col-span-2"
            data-reveal
            style={i(n)}
          >
            <span className="flex size-[56px] items-center justify-center rounded-full bg-mint transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:-translate-y-[3px]">
              <Image src={b.icon} alt="" className="size-[28px]" />
            </span>
            <h3 className="text-[17px] leading-[22px] font-semibold text-[#032919]">
              <Lines lines={b.title} />
            </h3>
            <p className="text-[14px] leading-[21px] font-medium text-body">
              <Lines lines={b.text} />
            </p>
          </li>
        ))}
      </ul>
      <p className="text-[15px] leading-[24px] font-medium text-black md:text-[16px]">Stay informed as we build towards Fresh Food Expo APAC in November 2027.</p>
    </section>
  );
}

const TD = "border-[#d9e6db] px-[20px] max-md:p-0";

/** All access (793:4083): content (flex-1, gap 16) + 440px photo, 32px apart; x 64–1400 at 1440, 8px vertical padding. */
export function AllAccess() {
  return (
    <section className="untrim mx-auto mt-[40px] flex w-[min(1336px,100%-2*var(--gutter))] flex-col gap-[32px] lg:mt-[24px] lg:flex-row lg:items-center lg:py-[8px] xl:relative xl:left-[12px]">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]" data-reveal>
        <h2 className="font-display text-[26px] leading-[32px] font-semibold text-forest md:text-[32px] md:leading-[40px]">
          All Access to <span className="text-accent">Fresh Food Expo APAC</span>
          <br className="max-md:hidden" /> Showfloor and Conference
        </h2>

        {/* Pricing table (793:4086). Phones: one card per package, labels inline. */}
        <div className="w-full overflow-hidden rounded-[14px] border border-[#d9e6db] bg-white">
          <table className="w-full text-left text-[16px] leading-[20px] text-[#032919] max-md:block">
            <thead className="max-md:hidden">
              <tr className="h-[52px] bg-page">
                <th className={`border-r border-b font-semibold ${TD}`}>Package Type</th>
                <th className={`border-r border-b font-semibold md:w-[150px] xl:w-[210px] ${TD}`}>Price (SGD)</th>
                <th className={`border-b font-semibold md:w-[190px] xl:w-[250px] ${TD}`}>Register Now</th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              <tr className="max-md:flex max-md:flex-col max-md:items-start max-md:gap-[12px] max-md:p-[20px] md:h-[76px]">
                <td className={`font-medium max-md:font-semibold md:border-r ${TD}`}>Trade Visitor Pass</td>
                <td className={`font-medium md:border-r ${TD}`}>
                  <span className="text-body md:hidden">Price (SGD): </span>XXX
                </td>
                <td className={TD}>
                  <Pill href="/register-to-visit/form" className="bg-accent leading-[20px] text-white md:h-[43px] md:min-h-0 md:px-[22px] md:text-[15px]">
                    Register Now
                  </Pill>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[13px] leading-[15px] font-medium text-body">All prices are subjected to 9% Goods and Service Tax (GST)</p>
        <hr className="h-px w-full border-0 bg-[#d9e6db]" />
        <p className="text-[16px] leading-[20px] font-semibold tracking-[0.02em] text-accent">PRICING DEADLINES:</p>
        <ul className="flex flex-col gap-[6px] text-[15px] leading-[22px] font-medium text-black">
          <li className="flex gap-[10px]">
            <span aria-hidden>•</span>
            <span>
              <strong className="font-semibold">Onsite Payment:</strong> Payment is accepted via Credit Card and Debit Card. Only SGD payment is accepted.
            </span>
          </li>
          <li className="flex gap-[10px]">
            <span aria-hidden>•</span>
            <span>Please note that all promo codes will expire on xxx (GMT +8, Singapore Time). There will be no extensions to this deadline.</span>
          </li>
        </ul>
      </div>

      {/* Image · Showfloor (793:4119): fill 111.54% × 157.84% at (−5.87%, −44.51%), the photo's true ratio. */}
      <div className="group relative mx-auto aspect-square w-full max-w-[440px] shrink-0 overflow-hidden rounded-[22px] bg-linear-to-b from-mint to-[#c2e3c3] lg:mx-0 lg:w-[34%] xl:w-[440px]" data-reveal style={i(1)}>
        <div className="zoom size-full">
          <Image src={showfloor} alt="Tomatoes on a blue conveyor belt" placeholder="blur" sizes="(min-width: 1024px) 440px, 100vw" style={crop(111.54, 157.84, -5.87, -44.51)} />
        </div>
      </div>
    </section>
  );
}

/** Hosted Buyers (793:4125): 1360×370 mint card, 540×330 photo at (20, 20), content 48px right of it (gap 12). */
export function HostedBuyers() {
  return (
    <section id="hosted-buyers" className={`untrim relative mt-[40px] lg:mt-[24px] ${ROW}`}>
      <div className="relative flex flex-col gap-[28px] rounded-[24px] bg-linear-to-r from-mint to-[#eef6ef] p-[16px] pb-[28px] md:rounded-[28px] md:p-[20px] lg:flex-row lg:items-center lg:gap-[48px] lg:pr-[40px]">
        <div className="group relative aspect-[540/330] w-full shrink-0 overflow-hidden rounded-[20px] bg-linear-to-b from-mint to-[#c2e3c3] lg:w-[42%] xl:w-[540px]" data-reveal>
          {/* Fill 146.53% × 125.92% at (−12.73%, −26.01%): the photo's true ratio. */}
          <div className="zoom size-full">
            <Image src={handshake} alt="Buyers meeting an exhibitor at a produce stand" placeholder="blur" sizes="(min-width: 1024px) 540px, 100vw" style={crop(146.53, 125.92, -12.73, -26.01)} />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[12px] max-lg:px-[6px] lg:py-[10px]" data-reveal style={i(1)}>
          <h2 className="font-display text-[26px] leading-[32px] font-semibold text-forest md:text-[30px] md:leading-[36px]">
            Interested in joining the <br className="max-md:hidden" />
            <span className="text-accent">Hosted Buyers Programme?</span>
          </h2>
          <p className="text-[15px] leading-[22px] font-medium text-black">
            Fresh Food Expo APAC’s Hosted Buyers Programme connects qualified buyers and sourcing decision-makers with relevant suppliers, technologies and
            solutions across the fresh food ecosystem.
          </p>
          <p className="text-[15px] leading-[22px] font-medium text-black">
            Selected participants can discover new suppliers, build valuable business connections and enjoy a more targeted event experience.
          </p>
          <p className="text-[15px] leading-[22px] font-medium text-black">
            Applications will open at a later stage. <strong className="font-semibold">Register your interest</strong> to receive updates on eligibility,
            programme benefits and application details.
          </p>
          <div className="pt-[6px]">
            {/* Applications open later: interest = newsletter sign-up for now. */}
            <Pill href="/subscribe" className="border-[1.5px] border-black text-black hover:bg-black/5">
              Register Your Interest for Hosted Buyers
            </Pill>
          </div>
        </div>
        {/* image 11 [Vectorized] (968:1773) at (1158, 0.17), running 23.74px past the card's right edge. */}
        <Image src={leaf} alt="" aria-hidden className="pointer-events-none absolute top-[0.17px] right-[-23.74px] hidden xl:block" />
      </div>
    </section>
  );
}
