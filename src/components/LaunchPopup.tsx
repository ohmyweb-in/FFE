"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import poster from "@/assets/popup-poster.jpg";
import calendar from "@/assets/popup/icon-calendar.png";
import pin from "@/assets/popup/icon-pin.png";
import closeIcon from "@/assets/popup/icon-close.png";
import gwMark from "@/assets/popup/gw-mark.svg";
import gwText from "@/assets/popup/gw-text.svg";
import flLogo from "@/assets/popup/fruit-logistica.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import chevronSmAccent from "@/assets/contact/chevron-sm-accent.svg";
import { Button } from "./ui";

// Pages that already are the call to action.
const SKIP = ["/register-to-visit", "/apply-to-exhibit"];

// Figma 1138:857 / 1138:858: 240×100 and 224×100 cards, 207×39 and 176×39 pills.
const OPTIONS = [
  {
    q: "Planning to visit?",
    cta: "Register Your Interest",
    href: "/register-to-visit",
    chevron: chevronSmWhite,
    box: { w: 207, h: 39, pl: 21, gap: 15 },
    cls: "border-[1.5px] border-accent bg-accent text-white",
  },
  {
    q: "Looking to exhibit?",
    cta: "Book Your Booth",
    href: "/apply-to-exhibit",
    chevron: chevronSmAccent,
    box: { w: 176, h: 39, pl: 27, gap: 10 },
    cls: "border-[1.5px] border-accent bg-white text-accent hover:bg-mint",
  },
];

/**
 * Registration popup (Figma 1138:788), opened on every full page load (client-side navigation keeps the
 * layout, so it doesn’t reappear while browsing). Native <dialog>: Esc, backdrop click and the close
 * button dismiss it.
 */
export default function LaunchPopup() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (SKIP.some((p) => pathname.startsWith(p))) return;
    // Let the hero load-in play first.
    const t = setTimeout(() => {
      const d = ref.current;
      if (!d) return;
      d.showModal();
      // Focus the dialog itself so the first CTA doesn’t open with a focus ring; Tab still moves into it.
      d.focus();
    }, 800);
    return () => clearTimeout(t);
    // Only on the first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="launch-popup-title"
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="modal launch-modal m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[1299px] overflow-y-auto rounded-[20px] bg-transparent outline-none lg:rounded-[30px]"
    >
      {/* Zero-height sticky row: the close button stays in view when the popup scrolls on short phones. */}
      <div className="sticky top-0 z-10 h-0">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-[10px] right-[10px] grid size-[44px] place-items-center rounded-full bg-white shadow-[0_4px_14px_rgb(0_0_0/0.15)] transition-[background-color,transform] duration-(--dur-ui) hover:scale-105 hover:bg-mint focus-visible:outline-2 focus-visible:outline-forest lg:top-[17px] lg:right-[16px] lg:size-[56px]"
        >
          <Image src={closeIcon} alt="" className="size-[16px] lg:size-[18px]" />
        </button>
      </div>

      {/* Portrait phones/tablets: a capped column where the poster shrinks (min 140px) so the whole popup fits the screen without scrolling. */}
      <div className="modal-body grid overflow-hidden rounded-[20px] bg-white max-lg:portrait:flex max-lg:portrait:max-h-[calc(100dvh-24px)] max-lg:portrait:flex-col max-lg:portrait:overflow-y-auto lg:grid-cols-[minmax(0,735fr)_minmax(0,564fr)] lg:rounded-[30px] landscape-phone:grid-cols-2">
        {/* Phones/tablets/1024 band: whole poster (its own background is white). ≥1280: Figma’s cover fill. */}
        <div className="relative flex items-center bg-white max-lg:portrait:contents">
          <Image
            src={poster}
            alt="Fresh Food Expo APAC 2027 poster"
            placeholder="blur"
            sizes="(min-width: 1024px) 735px, 100vw"
            className="h-auto w-full max-lg:portrait:min-h-[140px] max-lg:portrait:object-contain xl:absolute xl:inset-0 xl:size-full xl:object-cover xl:object-[25%_50%] 3xl:object-center"
          />
        </div>

        <div className="flex flex-col p-[16px] pt-[18px] sm:p-[20px] sm:pt-[22px] md:p-[32px] lg:py-[36px] lg:pr-[32px] lg:pl-[28px] xl:pt-[45px] xl:pr-[55px] xl:pb-[52px] xl:pl-[31px] landscape-phone:p-[20px]!">
          <p className="inline-flex h-[27px] items-center gap-[7px] self-start rounded-full bg-mint pr-[14px] pl-[16px] text-[12px] font-semibold text-forest uppercase">
            <span className="size-[10px] animate-pulse rounded-full bg-accent" aria-hidden />
            Registration is now open!
          </p>

          <h2
            id="launch-popup-title"
            className="mt-[14px] max-w-[429px] font-display text-[24px] leading-[30px] font-semibold text-forest sm:mt-[22px] sm:text-[26px] sm:leading-[32px] md:mt-[29px] md:text-[34px] md:leading-[42px] xl:text-[40px] xl:leading-[49.2px] landscape-phone:mt-[16px]! landscape-phone:text-[22px]! landscape-phone:leading-[28px]!"
          >
            Be Part of Asia Pacific’s Fresh Food Ecosystem!
          </h2>

          {/* Figma 1228:243: 374×58 mint strip. */}
          <div className="mt-[14px] flex h-[46px] items-center gap-[10px] self-start rounded-[10px] bg-mint pr-[12px] pl-[10px] sm:mt-[22px] sm:h-[58px] sm:gap-0 sm:pr-[14px] sm:pl-[12px] md:mt-[29px] landscape-phone:mt-[16px]!">
            <p className="font-display text-[15px] font-semibold text-forest uppercase sm:mr-[17px] sm:w-[134px] sm:text-[20px]">Powered By:</p>
            <span className="relative aspect-[94/30] w-[75px] shrink-0 sm:w-[94px]" role="img" aria-label="Grüne Woche">
              <Image src={gwMark} alt="" className="absolute top-[4.43%] left-0 h-auto w-[29.9%]" />
              <Image src={gwText} alt="" className="absolute top-0 left-[38.92%] h-auto w-[61.08%]" />
            </span>
            <Image src={flLogo} alt="Fruit Logistica" className="h-auto w-[67px] shrink-0 sm:ml-[19px] sm:w-[84px]" />
          </div>

          <ul className="mt-[14px] grid gap-[8px] sm:mt-[18px] sm:grid-cols-[240fr_224fr] sm:gap-[14px] md:mt-[23px] lg:grid-cols-1 xl:grid-cols-[240fr_224fr] landscape-phone:grid-cols-1! landscape-phone:mt-[14px]!">
            {OPTIONS.map((o) => (
              <li key={o.cta} className="flex flex-col items-start gap-[10px] rounded-[16px] bg-[#edf6ee] p-[14px] sm:gap-[14px] sm:rounded-[20px] sm:px-[17px] sm:pt-[20px] sm:pb-[17px] landscape-phone:flex-row! landscape-phone:items-center! landscape-phone:justify-between landscape-phone:py-[12px]!">
                <p className="text-[14px] font-semibold text-body uppercase">{o.q}</p>
                <Button
                  href={o.href}
                  chevron={o.chevron}
                  {...o.box}
                  fs={15}
                  m={{ ...o.box, fs: 15 }}
                  className={`shrink-0 tracking-[0.02em] ${o.cls}`}
                >
                  {o.cta}
                </Button>
              </li>
            ))}
          </ul>

          {/* Phones (and phones held sideways): the poster already shows the date and venue. */}
          <ul className="mt-[19px] hidden flex-col gap-[12px] border-t border-[#e5e5e5] pt-[32px] text-[22px] leading-[31px] font-medium tracking-[0.02em] text-body md:flex lg:mt-auto lg:pt-[28px] xl:mt-[19px] xl:pt-[32px] landscape-phone:hidden!">
            <li className="flex h-[23px] items-center gap-[11px]">
              <Image src={calendar} alt="" className="size-[23px] shrink-0" />
              16-18 Nov. 2027
            </li>
            <li className="flex min-h-[23px] items-center gap-[11px] xl:h-[23px] xl:whitespace-nowrap">
              <Image src={pin} alt="" className="size-[23px] shrink-0" />
              Sands Expo &amp; Convention Centre, Singapore
            </li>
          </ul>
        </div>
      </div>
    </dialog>
  );
}
