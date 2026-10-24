"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import o25 from "@/assets/gallery/2025-opening-ceremony.jpg";
import e25 from "@/assets/gallery/2025-exhibition.jpg";
import c25 from "@/assets/gallery/2025-conferences.jpg";
import k25 from "@/assets/gallery/2025-keynote.jpg";
import e24 from "@/assets/gallery/2024-exhibition.jpg";
import c24 from "@/assets/gallery/2024-conferences.jpg";
import o24 from "@/assets/gallery/2024-opening-ceremony.jpg";
import k24 from "@/assets/gallery/2024-keynote.jpg";
import e23 from "@/assets/gallery/2023-exhibition.jpg";
import o23 from "@/assets/gallery/2023-opening-ceremony.jpg";
import r22 from "@/assets/gallery/2022-ribbon-cutting.jpg";
import t20 from "@/assets/gallery/2020-travelrevive.jpg";
import r19 from "@/assets/gallery/2019-ribbon-cutting.jpg";
import k19 from "@/assets/gallery/2019-keynote.jpg";
import e19 from "@/assets/gallery/2019-exhibition.jpg";
import c19 from "@/assets/gallery/2019-conferences.jpg";
import chevronLeft from "@/assets/programme/m-chevron-left.svg";
import chevronRight from "@/assets/programme/m-chevron-right.svg";
import closeIcon from "@/assets/programme/icon-close.svg";

// Line breaks follow the Figma text boxes (196/222/206px wide).
const ALBUMS = [
  { img: o25, title: "2025 Opening Ceremony &\nVIP Guided Tour" },
  { img: e25, title: "2025 Exhibition" },
  { img: c25, title: "2025 Conferences" },
  { img: k25, title: "2025 Opening Remarks & Keynote" },
  { img: e24, title: "2024 Exhibition" },
  { img: c24, title: "2024 Conferences" },
  { img: o24, title: "2024 Opening Ceremony &\nVIP Guided Tour" },
  { img: k24, title: "2024 Opening Remarks & Keynote" },
  { img: e23, title: "2023 Exhibition" },
  { img: o23, title: "2023 Opening Ceremony &\nVIP Guided Tour" },
  { img: r22, title: "2022 Ribbon Cutting & VIP Guided Tour" },
  { img: t20, title: "TravelRevive 2020" },
  { img: r19, title: "2019 Ribbon Cutting & VIP Guided Tour" },
  { img: k19, title: "2019 Opening Remarks & Keynote" },
  { img: e19, title: "2019 Exhibition" },
  { img: c19, title: "2019 Conferences" },
];
const N = ALBUMS.length;
const label = (t: string) => t.replace("\n", " ");

const NAV_BTN = "absolute grid size-[44px] place-items-center rounded-full bg-white shadow-[0_4px_12px_rgb(0_0_0/0.25)] transition-transform hover:scale-105 md:size-[52px]";

/**
 * Figma 1288:1080: 4 × 4 albums, 298.85×224.14 green tiles (photo 221.67 tall, so a 2.5px accent strip shows below it),
 * 26px column gap, 303.9px row pitch, 63px below the hero. Clicking a tile opens it in a lightbox.
 */
export default function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + N) % N));
  const a = open === null ? null : ALBUMS[open];

  return (
    <section className="container-page mt-[40px] lg:mt-[63px] lg:px-[6px]">
      <ul className="grid grid-cols-2 gap-x-[12px] gap-y-[20px] md:gap-x-[20px] lg:grid-cols-4 lg:gap-x-[26px] lg:gap-y-[15px]">
        {ALBUMS.map((a, k) => (
          <li key={a.title} data-reveal style={{ "--i": k % 4 } as CSSProperties}>
            <button type="button" onClick={() => setOpen(k)} className="group block w-full cursor-zoom-in" aria-label={`View ${label(a.title)}`}>
              <span className="relative block aspect-[298.85/224.14] overflow-hidden rounded-[14px] bg-accent lg:rounded-[20px]">
                <Image
                  src={a.img}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1024px) 299px, 50vw"
                  className="zoom absolute inset-x-0 top-0 h-[98.9%] w-full object-cover"
                />
              </span>
              <span className="block px-[2px] pt-[8px] pb-[2px] text-center text-[14px] leading-[20px] text-black lg:whitespace-pre-line md:text-[16.39px] md:leading-[27.32px]">
                {a.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Native <dialog>: Esc, focus trapping and the page scroll lock come for free. */}
      <dialog
        ref={ref}
        aria-label={a ? label(a.title) : "Photo preview"}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current.x;
          const dy = e.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
        }}
        className="modal lightbox m-0 size-full max-h-none max-w-none bg-transparent"
      >
        {a && open !== null && (
          // Clicks on the dark area around the photo close the preview.
          <div className="flex size-full items-center justify-center px-[12px] py-[72px] md:px-[96px] landscape-phone:py-[12px]" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            {/* key: replay the entrance on every step. */}
            <figure key={open} className="modal-body flex w-full max-w-[800px] flex-col items-center">
              <Image
                src={a.img}
                alt={label(a.title)}
                placeholder="blur"
                sizes="(min-width: 824px) 800px, 100vw"
                className="h-auto max-h-[calc(100dvh-190px)] w-full landscape-phone:max-h-[calc(100dvh-64px)] rounded-[14px] object-contain lg:rounded-[20px]"
              />
              <figcaption className="mt-[14px] text-center text-[15px] leading-[22px] text-white md:text-[17px]">
                {label(a.title)}
                <span className="block whitespace-nowrap text-white/60 tabular-nums sm:ml-[10px] sm:inline">
                  {open + 1} / {N}
                </span>
              </figcaption>
            </figure>
          </div>
        )}
        <button type="button" onClick={() => setOpen(null)} aria-label="Close preview" className={`${NAV_BTN} top-[14px] right-[12px] md:top-[24px] md:right-[24px]`}>
          <Image src={closeIcon} alt="" className="size-[20px]" />
        </button>
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${NAV_BTN} top-1/2 left-[8px] -translate-y-1/2 md:left-[24px]`}>
          <Image src={chevronLeft} alt="" className="size-[24px]" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${NAV_BTN} top-1/2 right-[8px] -translate-y-1/2 md:right-[24px]`}>
          <Image src={chevronRight} alt="" className="size-[24px]" />
        </button>
      </dialog>
    </section>
  );
}
