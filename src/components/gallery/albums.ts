import type { StaticImageData } from "next/image";
import s1 from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-1.jpg";
import s1t from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-1-thumb.jpg";
import s2 from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-2.jpg";
import s2t from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-2-thumb.jpg";
import s3 from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-3.jpg";
import s3t from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-3-thumb.jpg";

export type Photo = { img: StaticImageData; thumb: StaticImageData; alt: string };
export type Album = { slug: string; title: string; desc: string; photos: Photo[] };

// Photos: 1600px wide (lightbox, hero) + 800px thumbs, from the client's originals (26 Oct 2026). The first photo is the album cover (the signing, IMG_9658, as the client asked on 26 Oct).
export const ALBUMS: Album[] = [
  {
    slug: "partner-event-launch-signing-ceremony",
    title: "Partner Event Launch Signing Ceremony",
    desc: "Between Messe Berlin and the Singapore Tourism Board, supported by the Singapore Food Agency, Temasek and Enterprise Singapore.",
    photos: [
      { img: s2, thumb: s2t, alt: "Signatories at the table during the Partner Event Launch Signing Ceremony" },
      { img: s3, thumb: s3t, alt: "Signing the partner agreement at the Fresh Food Expo Asia Pacific Partner Event Launch" },
      { img: s1, thumb: s1t, alt: "Guests give a thumbs-up in front of the Partner Event Launch Signing Ceremony backdrop" },
    ],
  },
];
