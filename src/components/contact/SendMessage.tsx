import Image from "next/image";
import mail from "@/assets/contact/icon-mail.svg";
import dots from "@/assets/contact/dots.svg";
import venue from "@/assets/about/produce.jpg";
import EnquiryForm from "./EnquiryForm";

const EMAIL = "visitor@freshfoodexpoapac.com";

/** Figma 736:2772: white card, form (flex-1, 52px padding) + 440px "Other ways to reach us" panel. */
export default function SendMessage() {
  return (
    <section id="enquiry" className="untrim container-narrow mt-[48px] lg:mt-[50px]">
      <div className="relative flex flex-col overflow-hidden rounded-[24px] bg-white lg:flex-row lg:rounded-[32px]" data-reveal>
        <div className="min-w-0 flex-1 px-[22px] py-[32px] md:p-[40px] xl:p-[52px]">
          <h2 className="font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[36px] md:leading-[42px]">Send Us a Message</h2>
          <p className="mt-[18px] text-[15px] leading-[22px] font-medium text-body">
            Fill in the form below and our team will get back to you within three business days.
          </p>
          <EnquiryForm />
        </div>

        <aside className="relative flex flex-col gap-[26px] overflow-hidden bg-linear-to-b from-mint to-page px-[22px] pt-[32px] max-[479px]:px-[18px] pb-[352px] md:px-[44px] md:pt-[52px] lg:w-[360px] lg:shrink-0 xl:w-[440px]">
          <div className="flex flex-col gap-[10px]">
            <h2 className="font-display text-[26px] leading-[32px] font-semibold text-balance text-forest max-[400px]:text-[24px] md:text-[28px] md:leading-[34px]">
              Other Ways to Reach Us
            </h2>
            <p className="text-[15px] leading-[22px] font-medium text-body">You can also contact us directly using the details below.</p>
          </div>
          <a href={`mailto:${EMAIL}`} className="group flex items-start gap-[18px] max-[479px]:items-center max-[479px]:gap-[12px]">
            <span className="flex size-[56px] shrink-0 items-center justify-center rounded-full bg-white max-[479px]:size-[44px] drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)] transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:-translate-y-[3px]">
              <Image src={mail} alt="" className="size-[24px]" />
            </span>
            <span className="flex min-w-0 flex-col gap-[6px] pt-[2px] text-[15px] leading-[21px]">
              <span className="text-[16px] font-semibold text-forest">General Enquiries</span>
              {/* One line beside the icon: under 480px the size tracks the column (address ≈ 16.3× its size), capped at 15px. */}
              <span className="font-medium [overflow-wrap:anywhere] text-body max-[479px]:text-[length:clamp(12px,calc((100vw-144px)/16.4),15px)]! transition-colors duration-(--dur-ui) group-hover:text-accent">
                {EMAIL}
              </span>
            </span>
          </a>

          {/* Collage (736:2838), pinned to the panel's bottom-right; runs off the card edge. */}
          <div className="pointer-events-none absolute right-0 bottom-0 h-[328px] w-[360px] max-w-full" aria-hidden>
            <div className="absolute top-0 right-0 h-[220px] w-[260px] rounded-tl-[200px] bg-accent" />
            <div className="absolute top-[40px] right-0 h-[290px] w-[360px] overflow-hidden rounded-tl-[32px] rounded-tr-[180px] rounded-bl-[200px] bg-linear-to-b from-mint to-[#c2e3c3]">
              <Image src={venue} alt="" placeholder="blur" sizes="360px" className="size-full object-cover" />
            </div>
            <div className="absolute top-[273px] left-[44px] h-[70px] w-[120px] rounded-t-[70px] bg-[rgb(40_174_61/0.9)]" />
          </div>
        </aside>

        {/* Deco · Dots (736:2842) straddling the form/panel edge. */}
        <Image src={dots} alt="" aria-hidden className="pointer-events-none absolute top-[763px] right-[425px] hidden size-[75px] xl:block" />
      </div>
    </section>
  );
}
