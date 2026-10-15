import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import general from "@/assets/contact/help-general.png";
import exhibition from "@/assets/contact/help-exhibition.png";
import sponsorship from "@/assets/contact/help-sponsorship.png";
import partnership from "@/assets/about/point-3.png";

const CARDS: { title: string; desc: string; icon: StaticImageData; tall?: boolean }[] = [
  { title: "General Enquiries", desc: "Have a question about the event? Our team is happy to help.", icon: general },
  {
    title: "Exhibition Enquiries",
    desc: "Find out more about exhibiting opportunities and showcase your products and solutions.",
    icon: exhibition,
    tall: true,
  },
  { title: "Sponsorship Enquiries", desc: "Discover sponsorship opportunities to increase your brand visibility.", icon: sponsorship },
  {
    title: "Partnership Opportunities",
    desc: "Explore strategic partnerships, industry collaborations and supporting organisations.",
    icon: partnership,
  },
];

/** Figma 736:2743: heading + four 299px cards (justify-between column, 24px apart). */
export default function HelpCards() {
  return (
    <section className="untrim container-narrow mt-[48px] lg:mt-[50px]">
      <div className="flex flex-col items-start gap-[14px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">How can we help?</p>
        {/* Phones: font scales with the column (title ≈ 11.2× its size) so it stays on one line; 30px from ~400px. */}
        <h2 className="font-display text-[length:clamp(24px,calc((100vw-52px)/11.6),30px)] leading-[1.2] font-semibold whitespace-nowrap text-forest md:text-[40px] md:leading-[46px] lg:text-[48px] lg:leading-[54px]">
          Our Team is Here for You
        </h2>
        <p className="text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
          Get in touch with the right team for your enquiry or simply fill in the form and we’ll connect you with the right person.
        </p>
      </div>

      <ul className="mt-[28px] grid gap-[16px] sm:grid-cols-2 md:gap-[24px] lg:mt-[36px] xl:grid-cols-4">
        {CARDS.map((c, idx) => (
          <li key={c.title} data-reveal style={{ "--i": idx } as CSSProperties}>
            <article className="lift flex h-full flex-col items-center justify-between gap-[16px] rounded-[28px] rounded-bl-none bg-white px-[28px] pt-[36px] pb-[30px] text-center xl:h-[299px]">
              <span className="flex size-[96px] shrink-0 items-center justify-center rounded-full bg-mint">
                <Image src={c.icon} alt="" sizes="42px" className={c.tall ? "h-[43px] w-[42px]" : "size-[42px]"} />
              </span>
              <h3 className="text-[18px] leading-[24px] font-semibold text-accent">{c.title}</h3>
              <p className="text-[15px] leading-[22px] font-medium text-body">{c.desc}</p>
              <span className="h-[3px] w-[40px] shrink-0 rounded-[2px] bg-accent" aria-hidden />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
