"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import chevronLeft from "@/assets/programme/m-chevron-left.svg";
import chevronRight from "@/assets/programme/m-chevron-right.svg";
import closeIcon from "@/assets/programme/icon-close.svg";

export type Tile = { thumb: StaticImageData; img?: StaticImageData; alt: string; title?: string; href?: string };

const NAV_BTN = "absolute grid size-[44px] place-items-center rounded-full bg-white shadow-[0_4px_12px_rgb(0_0_0/0.25)] transition-transform hover:scale-105 md:size-[52px]";

/**
 * Figma 1288:1080: 4-column grid of 298.85×224.14 green tiles (photo 221.67 tall, so a 2.5px accent strip shows below it),
 * 26px column gap, 303.9px row pitch, 63px below the hero. Tiles with an `href` link to an album; the rest open in a lightbox.
 */
export default function GalleryGrid({ items }: { items: Tile[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const N = items.length;
  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + N) % N));
  const a = open === null ? null : items[open];
  const label = (t: Tile) => (t.title ?? t.alt).replace("\n", " ");

  return (
    <section className="container-page mt-[40px] lg:mt-[63px] lg:px-[6px]">
      <ul className="grid grid-cols-2 gap-x-[12px] gap-y-[20px] md:gap-x-[20px] lg:grid-cols-4 lg:gap-x-[26px] lg:gap-y-[15px]">
        {items.map((t, k) => {
          const tile = (
            <>
              <span className="relative block aspect-[298.85/224.14] overflow-hidden rounded-[14px] bg-accent lg:rounded-[20px]">
                <Image
                  src={t.thumb}
                  alt={t.title ? "" : t.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 299px, 50vw"
                  className="zoom absolute inset-x-0 top-0 h-[98.9%] w-full object-cover"
                />
              </span>
              {t.title && (
                <span className="block px-[2px] pt-[8px] pb-[2px] text-center text-[14px] leading-[20px] text-black lg:whitespace-pre-line md:text-[16.39px] md:leading-[27.32px]">
                  {t.title}
                </span>
              )}
            </>
          );
          return (
            <li key={t.alt} data-reveal style={{ "--i": k % 4 } as CSSProperties}>
              {t.href ? (
                <Link href={t.href} className="group block w-full">
                  {tile}
                </Link>
              ) : (
                <button type="button" onClick={() => setOpen(k)} className="group block w-full cursor-zoom-in" aria-label={`View photo ${k + 1}: ${label(t)}`}>
                  {tile}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Native <dialog>: Esc, focus trapping and the page scroll lock come for free. */}
      <dialog
        ref={ref}
        aria-label={a ? label(a) : "Photo preview"}
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
                src={a.img ?? a.thumb}
                alt={a.alt}
                placeholder="blur"
                sizes="(min-width: 824px) 800px, 100vw"
                className="h-auto max-h-[calc(100dvh-190px)] w-full landscape-phone:max-h-[calc(100dvh-64px)] rounded-[14px] object-contain lg:rounded-[20px]"
              />
              <figcaption className="mt-[14px] text-center text-[15px] leading-[22px] text-white md:text-[17px]">
                {label(a)}
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
