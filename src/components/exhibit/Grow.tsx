import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import users from "@/assets/exhibit/g-users.svg";
import chart from "@/assets/exhibit/g-chart.svg";
import handshake from "@/assets/exhibit/g-handshake.svg";
import megaphone from "@/assets/exhibit/g-megaphone.svg";

const BR = <br className="max-xl:hidden" />;

const BENEFITS: { title: ReactNode; text: string; icon: StaticImageData }[] = [
  { title: "Reach new buyers", text: "Connect with prospective customers actively sourcing fresh food products, technologies and supply chain solutions.", icon: users },
  { title: "Enter new markets", text: "Meet importers, distributors and commercial partners that can support regional expansion.", icon: chart },
  { title: <>Generate quality {BR}business leads</>, text: "Build face-to-face relationships and identify new commercial opportunities.", icon: handshake },
  { title: <>Strengthen your {BR}market presence</>, text: "Increase visibility, reconnect with customers and position your brand within the regional fresh food industry.", icon: megaphone },
];

/** Figma 777:812: 1360px mint panel (40px padding, 24px gap), four 249px benefit cards (16px gaps). */
export default function Grow() {
  return (
    <section className="untrim mx-auto mt-[48px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[72px]">
      <div className="flex flex-col gap-[24px] rounded-[24px] bg-linear-to-b from-mint to-[#eef6ef] p-[20px] md:p-[40px] lg:rounded-[32px]">
        <div className="flex flex-col items-start gap-[10px]" data-reveal>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px]">
            Grow your business across <span className="text-accent">Asia Pacific</span>
          </h2>
          <p className="text-[17px] leading-[24px] font-medium text-body md:text-[18px] md:leading-[26px]">Fresh Food Expo APAC gives exhibitors a platform to:</p>
        </div>
        <ul className="grid gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((b, idx) => (
            <li
              key={b.text}
              className="lift flex flex-col items-start gap-[14px] rounded-[20px] bg-white px-[22px] pt-[24px] pb-[26px] xl:min-h-[249px]"
              data-reveal
              style={{ "--i": idx } as CSSProperties}
            >
              <span className="grid size-[60px] shrink-0 place-items-center rounded-full bg-mint">
                <Image src={b.icon} alt="" />
              </span>
              <h3 className="font-display text-[19px] leading-[24px] font-semibold text-[#032919]">{b.title}</h3>
              <p className="text-[14px] leading-[21px] font-medium text-body">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
