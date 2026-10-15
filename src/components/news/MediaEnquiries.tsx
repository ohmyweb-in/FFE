import Image from "next/image";
import icon from "@/assets/about/point-2.png";

/** Figma 1138:2800: 1290×134 mint bar between the hero and the news list (square bottom-left corner). */
export default function MediaEnquiries() {
  return (
    <section className="untrim mx-auto mt-[24px] w-[min(1290px,100%-2*var(--gutter))] lg:mt-[37px] lg:mb-[3px]" data-reveal>
      <div className="flex flex-col items-start gap-[16px] rounded-[22px] rounded-bl-none bg-mint px-[20px] py-[20px] sm:flex-row sm:items-center md:gap-[20px] md:py-[29px] md:pl-[38px] md:pr-[32px]">
        <span className="grid size-[56px] shrink-0 place-items-center rounded-full bg-white md:size-[76px]" aria-hidden>
          <Image src={icon} alt="" sizes="31px" className="size-[24px] md:size-[31px]" />
        </span>
        <p className="border-l-[5px] border-accent py-[5px] pl-[11px] text-[15px] leading-[23px] font-medium text-body [text-box:normal]!">
          Fresh Food Expo APAC Media Enquiries
          <br />
          For press accreditation, media partnerships or enquiries, please contact{" "}
          <a href="mailto:media@freshfoodexpoapac.com" className="text-accent underline underline-offset-2 [overflow-wrap:anywhere] hover:text-forest">
            media@freshfoodexpoapac.com
          </a>
        </p>
      </div>
    </section>
  );
}
