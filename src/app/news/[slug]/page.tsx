import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import StayUpdated from "@/components/news/StayUpdated";
import { POSTS, PHOTOS_HREF } from "@/components/news/posts";
import { Pill } from "@/components/ui";
import chevronLeft from "@/assets/news/icon-chevron-left.svg";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

const post = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  return POSTS.find((p) => p.slug === slug)!;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await post(params);
  return {
    title: p.seo[0],
    description: p.seo[1],
    metadataBase: new URL("https://www.freshfoodexpoapac.com"),
    openGraph: { type: "article", publishedTime: p.iso, images: [p.img.src] },
  };
}

const A = "text-accent underline underline-offset-2 [overflow-wrap:anywhere] hover:text-forest";
const ext = { target: "_blank", rel: "noopener" } as const;

/** One news article: back link, date + category, title, standfirst, photo with caption, body, then the press release's closing blocks. */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await post(params);
  return (
    <>
      <Header />
      <main className="untrim overflow-x-clip">
        <article className="mx-auto w-[min(880px,100%-2*var(--gutter))] pt-[32px] lg:pt-[48px]">
          <Link href="/news/" className="inline-flex items-center gap-[8px] text-[15px] leading-[20px] font-semibold text-forest hover:text-accent">
            <Image src={chevronLeft} alt="" className="size-[18px]" />
            News &amp; Press
          </Link>

          <header className="mt-[28px] lg:mt-[36px]" data-reveal>
            <div className="flex items-center gap-[12px]">
              <time dateTime={p.iso} className="text-[13px] leading-[16px] font-medium tracking-[0.04em] text-accent">
                {p.date}
              </time>
              <span className="rounded-full bg-mint px-[12px] py-[5px] text-[11px] leading-[14px] font-semibold tracking-[0.04em] text-forest uppercase">{p.category}</span>
            </div>
            <h1 className="mt-[18px] font-display text-[32px] leading-[38px] font-semibold text-forest md:text-[42px] md:leading-[50px] lg:text-[48px] lg:leading-[56px]">
              {p.title}
            </h1>
            <p className="mt-[16px] text-[19px] leading-[28px] font-medium text-body md:text-[21px] md:leading-[31px]">{p.standfirst}</p>
          </header>

          <figure className="mt-[32px] lg:mt-[40px]" data-reveal>
            <Image src={p.img} alt={p.alt} placeholder="blur" preload sizes="(min-width: 912px) 880px, 100vw" className="h-auto w-full rounded-[20px] lg:rounded-[28px]" />
            <figcaption className="mt-[14px] text-[14px] leading-[21px] text-body [&_strong]:font-semibold [&_strong]:text-forest">{p.caption}</figcaption>
          </figure>

          {/* Body copy: 17/28 paragraphs, Fredoka h2s, accent bullets. */}
          <div className="mt-[36px] text-[17px] leading-[28px] text-body lg:mt-[44px] [&_h2]:mt-[48px] [&_h2]:mb-[16px] [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:leading-[32px] [&_h2]:font-semibold [&_h2]:text-forest md:[&_h2]:text-[30px] md:[&_h2]:leading-[36px] [&_li]:relative [&_li]:pl-[22px] [&_li]:before:absolute [&_li]:before:top-[11px] [&_li]:before:left-[2px] [&_li]:before:size-[7px] [&_li]:before:rounded-full [&_li]:before:bg-accent [&_p]:mt-[18px] [&_strong]:font-semibold [&_strong]:text-forest [&_ul]:mt-[18px] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-[12px]">
            {p.body}
          </div>

          <aside className="mt-[44px] flex flex-col items-start gap-[20px] rounded-[24px] bg-mint px-[24px] py-[28px] md:flex-row md:items-center md:justify-between md:px-[36px]" data-reveal>
            <p className="text-[17px] leading-[25px] font-medium text-forest md:max-w-[460px]">
              Photos of the Partner Event Launch Signing Ceremony are in our gallery, for editorial use.
            </p>
            <Pill href={PHOTOS_HREF} className="shrink-0 bg-accent text-white">
              View the photos
            </Pill>
          </aside>

          <p className="mt-[32px] text-[15px] leading-[23px] text-body">
            For more information: Fresh Food Expo Asia Pacific |{" "}
            <Link href="/" className={A}>
              www.freshfoodexpoapac.com
            </Link>
          </p>

          <div className="mt-[40px] grid gap-[20px] md:grid-cols-2" data-reveal>
            <section className="rounded-[22px] bg-white px-[24px] py-[26px] md:px-[30px]">
              <h2 className="font-display text-[22px] leading-[28px] font-semibold text-forest">About Fresh Food Expo Asia Pacific</h2>
              <p className="mt-[12px] text-[15px] leading-[23px] text-body">
                Fresh Food Expo Asia Pacific (FFE APAC) is Messe Berlin’s international B2B trade show bringing together the broader fresh food value chain across Asia Pacific.
                The trade show focuses on three core sectors: Fresh Food, Agri &amp; Fresh Technology, and Logistics &amp; Distribution. FFE APAC connects international
                producers, suppliers, buyers, technology providers and logistics specialists, creating new business opportunities and partnerships across the region.
              </p>
              <p className="mt-[14px] text-[15px] leading-[23px] text-body">
                Follow us:{" "}
                <a href="https://www.linkedin.com/showcase/freshfoodexpoapac/" className={A} {...ext}>
                  LinkedIn
                </a>
                ,{" "}
                <a href="https://www.instagram.com/freshfoodexpo_apac" className={A} {...ext}>
                  Instagram
                </a>
                ,{" "}
                <a href="https://www.facebook.com/profile.php?id=61595410562693" className={A} {...ext}>
                  Facebook
                </a>
              </p>
            </section>
            <section className="rounded-[22px] bg-white px-[24px] py-[26px] md:px-[30px]">
              <h2 className="font-display text-[22px] leading-[28px] font-semibold text-forest">About Messe Berlin</h2>
              <p className="mt-[12px] text-[15px] leading-[23px] text-body">
                Messe Berlin has been a trade fair venue for over 200 years and has been one of the world’s most important for many decades. As a state-owned trade fair
                organisation, Messe Berlin designs, markets and organises hundreds of live events every year. Its aim is to be an outstanding host to visitors at all events, to
                provide the best possible business opportunities and to ensure fair conditions for everyone. This ethos is reflected in the company’s motto: Messe Berlin –
                Hosting the World.
              </p>
              <p className="mt-[14px] text-[15px] leading-[23px] text-body">
                More:{" "}
                <a href="https://www.messe-berlin.de/en" className={A} {...ext}>
                  messe-berlin.de
                </a>{" "}
                | Follow us:{" "}
                <a href="https://www.linkedin.com/company/messe-berlin-gmbh" className={A} {...ext}>
                  LinkedIn
                </a>
                ,{" "}
                <a href="https://www.instagram.com/messeberlin/" className={A} {...ext}>
                  Instagram
                </a>
              </p>
            </section>
          </div>

          <section className="mt-[20px] rounded-[22px] border-l-[5px] border-accent bg-white px-[24px] py-[24px] md:px-[30px]" data-reveal>
            <h2 className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">For media queries, please contact</h2>
            <p className="mt-[12px] text-[15px] leading-[23px] text-body">
              <span className="font-semibold text-forest">Emanuel Hoeger</span>, Director Communications and Spokesperson, Messe Berlin
              <br />
              <a href="mailto:emanuel.hoeger@messe-berlin.de" className={A}>
                emanuel.hoeger@messe-berlin.de
              </a>
            </p>
          </section>
        </article>
        <StayUpdated mt="mt-[56px] lg:mt-[72px]" />
      </main>
      <Footer mt="mt-[48px] lg:mt-[84px]" />
      <RevealObserver />
    </>
  );
}
