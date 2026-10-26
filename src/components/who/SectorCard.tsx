import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

export type Item = { label: string; icon: StaticImageData };

type Props = {
  title: ReactNode;
  lead: string;
  icon: StaticImageData;
  items: Item[];
  /** "row" = icon beside label (62/79px tiles); "stack" = icon above centred label (123px tiles). */
  tiles: "row" | "stack";
  tileH: string;
  text: string;
  img: StaticImageData;
  alt: string;
  pos: string;
  /** Photo on the right (Agri & Fresh Technology). */
  flip?: boolean;
  /** Distance from the previous section (Figma: 26.32 after the hero, then 24). */
  mt: string;
};

/**
 * Figma 1142:5097 / 1142:5131 / 1142:5170: 1360px card (#eef6ef → page), 20px padding, 560px photo, 40px gap,
 * content column (16px vertical padding, 24px on the side away from the photo, 20px gaps). Tile heights include the 1px border.
 */
export default function SectorCard({ title, lead, icon, items, tiles, tileH, text, img, alt, pos, flip, mt }: Props) {
  return (
    <section className={`untrim mx-auto w-[min(1360px,100%-2*var(--gutter))] ${mt}`}>
      <div className={`flex flex-col gap-[24px] rounded-[24px] bg-linear-to-r from-[#eef6ef] to-page p-[16px] md:p-[20px] lg:rounded-[28px] lg:items-stretch lg:gap-[32px] xl:gap-[40px] ${flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="group relative aspect-[560/300] w-full shrink-0 overflow-hidden rounded-[18px] bg-linear-to-b from-mint to-[#c2e3c3] md:rounded-[22px] lg:aspect-auto lg:w-[40%] xl:w-[560px]" data-reveal>
          <Image src={img} alt={alt} placeholder="blur" sizes="(min-width: 1280px) 560px, 100vw" className={`zoom absolute inset-0 size-full object-cover ${pos}`} />
        </div>

        <div className={`flex min-w-0 flex-1 flex-col items-start gap-[20px] pb-[8px] sm:px-[4px] md:px-[8px] lg:py-[16px] ${flip ? "lg:pr-0 lg:pl-[24px]" : "lg:pr-[24px] lg:pl-0"}`} data-reveal style={{ "--i": 1 } as CSSProperties}>
          <div className="flex w-full flex-col items-start gap-[16px] sm:flex-row sm:items-center sm:gap-[24px]">
            <span className="grid size-[64px] shrink-0 place-items-center rounded-full bg-mint md:size-[76px]">
              <Image src={icon} alt="" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
              <h2 className="font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[36px] md:leading-[42px]">{title}</h2>
              <p className="text-[15px] leading-[23px] font-medium text-body">{lead}</p>
            </div>
          </div>

          <ul className={`grid w-full gap-[8px] ${tiles === "stack" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 3xl:grid-cols-4"}`}>
            {items.map((it) =>
              tiles === "stack" ? (
                <li key={it.label} className={`flex flex-col items-center gap-[10px] rounded-[14px] border border-accent bg-mint px-[10px] pt-[16px] pb-[14px] text-center ${tileH}`}>
                  <Image src={it.icon} alt="" className="shrink-0" />
                  <span className="text-[13px] leading-[17px] font-medium whitespace-pre-line text-accent">{it.label}</span>
                </li>
              ) : (
                <li key={it.label} className={`flex items-center gap-[12px] rounded-[14px] border border-accent bg-mint px-[14px] py-[13px] max-sm:gap-[10px] max-sm:px-[10px] ${tileH} max-sm:min-h-0!`}>
                  <Image src={it.icon} alt="" className="shrink-0" />
                  <span className="min-w-0 flex-1 text-[13px] leading-[17px] font-medium whitespace-pre-line hyphens-auto text-accent max-sm:whitespace-normal">{it.label}</span>
                </li>
              ),
            )}
          </ul>

          <p className="text-[16px] leading-[25px] font-medium text-body">{text}</p>
        </div>
      </div>
    </section>
  );
}
