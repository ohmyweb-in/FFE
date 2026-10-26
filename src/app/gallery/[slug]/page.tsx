import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { ALBUMS } from "@/components/gallery/albums";
import hero from "@/assets/hero.jpg";

export const dynamicParams = false;
export const generateStaticParams = () => ALBUMS.map((a) => ({ slug: a.slug }));

const album = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  return ALBUMS.find((a) => a.slug === slug)!;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = await album(params);
  return {
    title: `${a.title} | Gallery | FFE APAC`,
    description: `Photos from the Fresh Food Expo Asia Pacific ${a.title}. ${a.desc} For editorial use.`,
    // A press-release link shares with the cover photo.
    metadataBase: new URL("https://www.freshfoodexpoapac.com"),
    openGraph: { images: [a.photos[0].img.src] },
  };
}

/** One album: Gallery hero with the album title, its photos in the gallery grid (lightbox), editorial-use note. */
export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = await album(params);
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* Same hero photo as /gallery (an album cover would put faces under the title); the title wraps to two lines. */}
        <PageHero size="gallery" title={<span className="block lg:max-w-[760px]">{a.title}</span>} img={hero} imgBox="lg:top-0 lg:left-[16.31%] lg:w-[83.72%]" curveLeft={3.89}>
          {a.desc}
        </PageHero>

        <GalleryGrid items={a.photos} />

        <p className="container-page mt-[32px] text-[15px] leading-[23px] text-body lg:mt-[40px] lg:px-[6px]">
          These photos are for editorial use only. Copyright: Messe Berlin Asia Pacific. For high-resolution files, contact{" "}
          <a href="mailto:marketing@freshfoodexpoapac.com" className="text-accent underline underline-offset-2 [overflow-wrap:anywhere] hover:text-forest">
            marketing@freshfoodexpoapac.com
          </a>
          .{" "}
          <Link href="/gallery/" className="ml-[4px] font-medium text-accent underline underline-offset-2 hover:text-forest">
            Back to Gallery
          </Link>
        </p>
      </main>
      <Footer mt="mt-[48px] lg:mt-[64px]" />
      <RevealObserver />
    </>
  );
}
