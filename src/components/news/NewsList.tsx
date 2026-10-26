import Image from "next/image";
import Link from "next/link";
import chevronRight from "@/assets/contact/icon-chevron-right.svg";
import { POSTS } from "./posts";

/**
 * Figma 736:3075 card grid (3 columns at lg), one card per post in posts.tsx; the newest post is a full-width lead card at lg.
 * The Figma filter chips, search and pagination come back when there are enough posts to need them.
 */
export default function NewsList() {
  return (
    <section className="untrim container-narrow pt-[40px] pb-[8px] lg:pt-[48px]" aria-label="Latest news">
      <ul className="grid gap-[24px] md:grid-cols-2 lg:grid-cols-3" data-reveal>
        {POSTS.map((p, k) => (
          <li key={p.slug} className={k ? "" : "lg:col-span-3"}>
            <article className={`lift group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white ${k ? "" : "lg:flex-row lg:rounded-[28px]"}`}>
              <div className={`relative h-[210px] shrink-0 overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3] ${k ? "" : "md:h-[380px] lg:h-auto lg:min-h-[360px] lg:w-[54%]"}`}>
                <Image src={k ? p.thumb : p.img} alt={p.alt} placeholder="blur" sizes={k ? "(min-width: 1024px) 411px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 690px, 100vw"} className={`zoom size-full object-cover ${k ? "" : "object-[50%_10%]"}`} />
              </div>
              <div className={`flex flex-1 flex-col justify-between gap-[22px] px-[26px] pt-[22px] pb-[26px] ${k ? "" : "lg:px-[44px] lg:py-[40px]"}`}>
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <time dateTime={p.iso} className="text-[13px] leading-[16px] font-medium tracking-[0.04em] text-accent">
                      {p.date}
                    </time>
                    <span className="rounded-full bg-mint px-[12px] py-[5px] text-[11px] leading-[14px] font-semibold tracking-[0.04em] text-forest uppercase">{p.category}</span>
                  </div>
                  <h3 className={`font-display text-[23px] leading-[29px] font-semibold text-forest ${k ? "" : "lg:text-[32px] lg:leading-[40px]"}`}>
                    <Link href={`/news/${p.slug}/`} className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-[15px] leading-[23px] font-medium text-body">{p.excerpt}</p>
                </div>
                <span className="flex items-center gap-[14px] text-[15px] leading-[20px] font-semibold text-forest" aria-hidden>
                  Read More
                  <span className="flex size-[40px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-accent bg-white transition-colors duration-(--dur-ui) group-hover:bg-mint">
                    <Image src={chevronRight} alt="" className="size-[18px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:translate-x-[2px]" />
                  </span>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
