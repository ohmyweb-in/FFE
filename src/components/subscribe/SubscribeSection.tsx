import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import target from "@/assets/about/point-2.png";
import programme from "@/assets/subscribe/b-programme.png";
import handshake from "@/assets/about/point-3.png";
import bulb from "@/assets/about/point-4.png";
import shade from "@/assets/subscribe/card.jpg";
import dots from "@/assets/subscribe/dots.svg";
import SubscribeForm from "./SubscribeForm";

const BENEFITS: { label: [string, string]; icon: StaticImageData; size: number }[] = [
  { label: ["New exhibitors", "and products"], icon: target, size: 31 },
  { label: ["Programme", "announcements"], icon: programme, size: 32 },
  { label: ["Networking", "opportunities"], icon: handshake, size: 36 },
  { label: ["Industry news", "and insights"], icon: bulb, size: 36 },
];

/** Figma 736:3320: 640px benefits column + form card, 32px apart, 60px page margins. */
export default function SubscribeSection() {
  return (
    <section className="untrim mx-auto flex w-[min(1320px,100%-2*var(--gutter))] flex-col gap-[32px] pt-[40px] lg:flex-row lg:items-stretch">
      <div className="flex min-w-0 flex-col gap-[24px] lg:w-[48.5%] lg:shrink-0 xl:w-[640px]">
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[42px]" data-reveal>
          Be the first to know about
        </h2>

        <ul className="grid grid-cols-2 gap-[14px] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((b, idx) => (
            <li
              key={b.label[0]}
              className="lift flex min-h-[182px] flex-col items-center gap-[16px] rounded-[22px] rounded-bl-none bg-mint px-[12px] py-[24px] text-center"
              data-reveal
              style={{ "--i": idx } as CSSProperties}
            >
              <span className="flex size-[76px] shrink-0 items-center justify-center rounded-full bg-white">
                <Image src={b.icon} alt="" sizes="36px" style={{ width: b.size, height: b.size }} />
              </span>
              <span className="text-[16px] leading-[21px] font-medium text-black">
                {b.label[0]}
                <br />
                {b.label[1]}
              </span>
            </li>
          ))}
        </ul>

        {/* Image card (736:3340 / 495:2318): the visible layer is "Shade" — 640×384 photo (fill 109.16% wide, true ratio) with a green fade. */}
        <div className="group relative h-[340px] overflow-hidden rounded-[24px] bg-[#d9d9d9] md:h-[384px] lg:rounded-[30px]" data-reveal>
          <Image
            src={shade}
            alt="Exhibitors in conversation at a digital crop-monitoring stand"
            placeholder="blur"
            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 48vw, 100vw"
            className="zoom absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-accent/0 from-30% to-accent" />
          <p className="absolute bottom-[60px] left-[24px] max-w-[536px] font-display text-[30px] leading-[36px] font-semibold text-white md:top-[200px] md:bottom-auto md:left-[28px] md:text-[38px] md:leading-[44px]">
            A connected <br className="hidden md:block" />
            ecosystem for a <br className="hidden md:block" />
            healthier tomorrow.
          </p>
          <span className="absolute bottom-[31px] left-[24px] h-[5px] w-[64px] rounded-[3px] bg-white md:top-[348px] md:bottom-auto md:left-[28px]" aria-hidden />
          <Image src={dots} alt="" aria-hidden className="pointer-events-none absolute top-[180px] right-[1px] hidden size-[47px] md:block" />
        </div>
      </div>

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-[24px] bg-white px-[22px] py-[32px] md:px-[36px] md:py-[40px] lg:rounded-[28px]" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <SubscribeForm />
      </div>
    </section>
  );
}
