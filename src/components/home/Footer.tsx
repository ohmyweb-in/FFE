import Image from "next/image";
import logo from "@/assets/logo.png";
import linkedin from "@/assets/social-linkedin.png";
import facebook from "@/assets/social-facebook.svg";
import youtube from "@/assets/social-youtube.png";
import instagram from "@/assets/social-instagram.png";
import FooterNav from "./FooterNav";
import Partners from "./Partners";

const SOCIAL = [
  { label: "LinkedIn", icon: linkedin, href: "https://www.linkedin.com/showcase/freshfoodexpoapac/" },
  { label: "Facebook", icon: facebook, href: "https://www.facebook.com/profile.php?id=61595410562693" },
  { label: "YouTube", icon: youtube, href: "https://www.youtube.com/@FreshFoodExpoAPAC" },
  { label: "Instagram", icon: instagram, href: "https://www.instagram.com/freshfoodexpo_apac" },
];

/** `mt` = gap above the partners strip, which every page shows right before the footer. */
export default function Footer({ mt = "mt-[47px] md:mt-20 lg:mt-[96px]" }: { mt?: string }) {
  return (
    <>
      <Partners className={mt} />
      {/* Figma 1138:140: footer logo 123px below the partners logos (the logo PNG has 8px of padding on top). */}
      <footer id="contact" className="container-page mt-[56px] pb-[38px] md:mt-[80px] md:pb-10 lg:mt-[115px] lg:pb-[30px]">
        <div className="flex flex-col md:gap-12 xl:flex-row xl:gap-0">
          <div className="ml-[3px] md:ml-0 xl:w-[225px] xl:shrink-0 xl:pt-[8px]">
            <Image src={logo} alt="Fresh Food Expo Asia Pacific" sizes="131px" className="h-[90px] w-[131px] object-cover object-right" />
            <p className="text-lead mt-[21px] max-w-[245px] text-[18px] lg:max-w-[208px]">Asia Pacific’s Premier Trade Fair for Fresh Food</p>
            <ul className="mt-[23px] flex gap-[7px]">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="tap-y block rounded-md transition-transform duration-(--dur-ui) ease-(--ease-out) hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    <Image src={s.icon} alt="" sizes="29px" className="size-[29px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterNav />
        </div>

        <div className="mt-10 hidden h-px bg-black/50 md:block lg:mt-[36px]" />
        {/* Phones: policies first, then copyright, left-aligned. Desktop (736:1581–736:1582): copyright left, policies right. */}
        <div className="text-lead mt-[30px] ml-[3px] flex flex-col items-start md:mt-[26px] md:ml-0 md:items-center md:gap-4 md:text-center lg:mt-[27.5px] lg:flex-row lg:justify-between lg:text-left">
          <p className="mt-[34px] md:mt-0 lg:whitespace-nowrap">© 2027 Fresh Food Expo APAC. All rights reserved</p>
          <p className="order-first md:order-none">
            <a href="https://www.messe-berlin.asia/en/additional-pages/privacy-policy" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </>
  );
}
