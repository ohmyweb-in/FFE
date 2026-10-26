"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import plus from "@/assets/icon-plus.png";

// Figma 736:1519. `w` = desktop column width (flex-grow ratio; 0 = sized to content),
// `max` = Figma text box width where links wrap, `gap` = phone bar→title gap.
const COLS = [
  { title: "About", w: 225, max: 201, gap: 7, links: ["Overview", "Our Story", "Fresh Food Ecosystem", "Singapore International Agri-Food Week", "Messe Berlin", "Contact Us"] },
  { title: "Exhibit", w: 230, max: 190, gap: 8, links: ["Why Exhibit", "Who Should Exhibit", "Apply to Exhibit"] },
  { title: "Visit", w: 185, gap: 6, links: ["Why Visit", "Who Should Visit", "Plan Your Visit", "Register Your Interest"] },
  { title: "News & Media", w: 0, gap: 5, links: ["News & Press Release", "Gallery", "Subscribe Newsletter"] },
];

// Stage 1 pages only (Programme returns in phase 2).
const HREF: Record<string, string> = {
  Overview: "/about",
  "Our Story": "/our-story",
  "Fresh Food Ecosystem": "/ecosystem",
  "Singapore International Agri-Food Week": "/siaw",
  "Contact Us": "/contact",
  "Messe Berlin": "/messe-berlin",
  "Why Exhibit": "/why-exhibit",
  "Who Should Exhibit": "/who-should-exhibit",
  "Apply to Exhibit": "/apply-to-exhibit",
  "Why Visit": "/why-visit",
  "Who Should Visit": "/who-should-visit",
  "Plan Your Visit": "/plan-your-visit",
  "Register Your Interest": "/register-to-visit",
  "News & Press Release": "/news",
  Gallery: "/gallery",
  "Subscribe Newsletter": "/subscribe",
};

// Phone row paddings between the accordion rules (first row is shorter).
const ROW = ["pt-[11.5px] pb-[15px]", "pt-[15px] pb-[16px]", "pt-[15px] pb-[16px]", "pt-[15px] pb-[17px]"];

const PHONE = "(max-width: 767.98px)";

/**
 * Footer columns. Phones (Figma 318:2070–318:2085): <details> accordion with a plus icon.
 * md+: always-open columns. Rendered open so links work without JS; collapsed on phones after mount.
 */
export default function FooterNav() {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => refs.current.forEach((d) => d && (d.open = !mq.matches));
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <nav
      aria-label="Footer"
      className="mt-[27.5px] ml-[3px] border-b border-black/30 md:mt-0 md:ml-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-10 md:border-0 lg:flex lg:flex-1 lg:gap-0"
    >
      {COLS.map((c, i) => (
        <details
          key={c.title}
          open
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{ flexGrow: c.w, "--gap": `${c.gap}px`, "--pl": `${3 + c.gap}px`, "--max": c.max ? `${c.max}px` : "none" } as CSSProperties}
          className={`group border-t border-black/30 md:border-0 lg:min-h-[322px] lg:border-l lg:border-black/20 lg:pl-4 xl:pl-5 ${c.w ? "lg:basis-0" : "lg:flex-none"}`}
        >
          <summary
            onClick={(e) => !window.matchMedia(PHONE).matches && e.preventDefault()}
            className={`flex cursor-pointer list-none items-center justify-between pr-[11px] md:cursor-default md:p-0 [&::-webkit-details-marker]:hidden ${ROW[i]}`}
          >
            <span className="flex items-center gap-(--gap) md:gap-[9px]">
              <span className="h-[33px] w-[3px] shrink-0 bg-accent" aria-hidden />
              <h3 className="text-[20px] leading-[normal] font-semibold text-black md:text-[25px]">{c.title}</h3>
            </span>
            <Image
              src={plus}
              alt=""
              sizes="30px"
              className="size-[30px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-open:rotate-45 md:hidden"
            />
          </summary>
          <ul className={`acc-body text-lead flex flex-col gap-[25px] pb-[20px] pl-(--pl) md:mt-[25px] md:max-w-(--max) md:pb-0 md:pl-0 ${c.w ? "" : "lg:whitespace-nowrap"}`}>
            {c.links.map((l) => (
              <li key={l}>
                <a href={HREF[l] ?? "#"} className="footer-link">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </nav>
  );
}
