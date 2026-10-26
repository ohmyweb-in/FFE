import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import calendar from "@/assets/contact/icon-calendar.svg";
import users from "@/assets/contact/icon-users.svg";
import file from "@/assets/contact/icon-file.svg";
import chevronRight from "@/assets/contact/icon-chevron-right.svg";

const LINKS: { title: string; desc: [string, string?]; icon: StaticImageData; href: string }[] = [
  { title: "Event Overview", desc: ["Key dates, venue and", "what to expect"], icon: calendar, href: "/about" },
  { title: "Why Exhibit", desc: ["Reasons to exhibit and", "key benefits"], icon: users, href: "/why-exhibit" },
  { title: "Why Visit", desc: ["Who should attend and", "what you’ll discover"], icon: users, href: "/why-visit" },
  { title: "Register Your Interest", desc: ["Join Asia Pacific Fresh Food Ecosystem"], icon: file, href: "/register-to-visit" },
];

/** Figma 1138:2976: 1360px mint panel (40px side margins) with four 108px link cards (4-up from 1440). */
export default function UsefulResources() {
  return (
    <section className="untrim mx-auto mt-[48px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[50px]">
      <div className="flex flex-col gap-[24px] rounded-[24px] bg-linear-to-b from-mint to-[#eef6ef] px-[20px] py-[36px] max-[400px]:px-[14px] md:px-[40px] md:py-[48px] lg:rounded-[36px]">
        <div className="flex flex-col gap-[10px] md:pl-[16px]" data-reveal>
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Need more information?</p>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px]">Useful Resources</h2>
        </div>
        <ul className="grid gap-[16px] sm:grid-cols-2 md:gap-[20px] 3xl:grid-cols-4">
          {LINKS.map((l, idx) => (
            <li key={l.title} data-reveal style={{ "--i": idx } as CSSProperties}>
              <a href={l.href} className="lift group flex h-full max-[400px]:flex-wrap max-[400px]:gap-y-[10px] min-h-[108px] items-center gap-[16px] rounded-[22px] bg-white px-[20px] py-[16px] 3xl:py-[11px]">
                <span className="flex size-[56px] shrink-0 items-center justify-center rounded-full bg-mint max-[400px]:order-1">
                  <Image src={l.icon} alt="" className="size-[26px]" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-[6px] max-[400px]:order-3 max-[400px]:basis-full">
                  <span className="text-[17px] leading-[22px] font-semibold text-forest">{l.title}</span>
                  <span className="text-[13px] leading-[18px] font-medium text-body">
                    {l.desc[0]}
                    {l.desc[1] && (
                      <>
                        <br className="hidden 3xl:block" /> {l.desc[1]}
                      </>
                    )}
                  </span>
                </span>
                <span className="flex size-[36px] shrink-0 items-center justify-center rounded-full max-[400px]:order-2 max-[400px]:ml-auto border-[1.5px] border-accent transition-colors duration-(--dur-ui) group-hover:bg-mint">
                  <Image src={chevronRight} alt="" className="size-[18px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:translate-x-[2px]" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
