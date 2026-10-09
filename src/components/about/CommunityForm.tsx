"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import chevronDown from "@/assets/about/icon-chevron-down.svg";
import captcha from "@/assets/about/captcha.png";
import { COUNTRIES, FormField, Pill, crop } from "../ui";

const Field = (p: { label: string; required?: boolean; children: ReactNode }) => <FormField gap={7} {...p} />;

/** UI-only subscribe form (Figma 736:2566): native validation + success state, no submission. */
export default function CommunityForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TODO: wire to Mailchimp.
    setDone(true);
  };

  if (done) {
    return (
      <p role="status" className="fade-in flex h-full min-h-[200px] items-center justify-center rounded-[20px] bg-mint px-6 text-center text-[18px] leading-[24px] font-medium text-forest">
        Thanks for subscribing — you’re now part of the FFE APAC community.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
      <div className="grid gap-[16px] md:grid-cols-2 md:gap-x-[24px] md:gap-y-[18px]">
        <Field label="First Name" required>
          <input name="firstName" required autoComplete="given-name" placeholder="Enter first name" className="input" />
        </Field>
        <Field label="Last Name" required>
          <input name="lastName" required autoComplete="family-name" placeholder="Enter last name" className="input" />
        </Field>
        <Field label="Email Address" required>
          <input name="email" type="email" required autoComplete="email" placeholder="Enter email address" className="input" />
        </Field>
        <Field label="Company Name">
          <input name="company" autoComplete="organization" placeholder="Enter company name" className="input" />
        </Field>
        <Field label="Job Title">
          <input name="jobTitle" autoComplete="organization-title" placeholder="Enter job title" className="input" />
        </Field>
        <Field label="Country">
          <span className="relative block">
            <select name="country" defaultValue="" autoComplete="country-name" className="input cursor-pointer appearance-none pr-[44px]">
              <option value="" disabled>
                Select Country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <Image src={chevronDown} alt="" className="pointer-events-none absolute top-[14px] right-[14px] size-[18px]" />
          </span>
        </Field>
        <Field label="Contact Number">
          <span className="input gap-[10px]">
            <span className="shrink-0 text-field">+65</span>
            <span className="shrink-0 text-field" aria-hidden>
              |
            </span>
            <input name="phone" type="tel" autoComplete="tel-national" placeholder="Enter contact number" className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-field" />
          </span>
        </Field>
        {/* Spacer (736:2594) makes this row 100px tall. */}
        <span className="hidden h-[100px] md:block" aria-hidden />
      </div>

      <label className="flex cursor-pointer items-start gap-[12px]">
        <input type="checkbox" required className="checkbox mt-px size-[18px] rounded-[4px] border-[1.5px] border-accent bg-white checked:bg-accent" />
        <span className="text-[12px] leading-[17px] font-medium text-body">
          By registering for Fresh Food Expo APAC, you agree to receive event-related communications, including important updates, programme
          information, exhibitor announcements, registration notices and other information relating to the event.
        </span>
      </label>

      <div className="flex flex-col gap-[16px] md:flex-row md:items-start md:gap-[28px]">
        <div className="flex flex-col items-start gap-[16px]">
          {/* Placeholder for the Cloudflare Turnstile widget (image 79). */}
          <span className="relative block h-[58.712px] w-[267px] max-w-full overflow-hidden" aria-hidden>
            <Image src={captcha} alt="" sizes="353px" style={crop(131.94, 691.67, -15.45, -182.14)} />
          </span>
          <Pill className="bg-accent text-white">Subscribe</Pill>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[8px] text-[12px] leading-[17px] font-medium text-body">
          <p>
            You can unsubscribe from our marketing communications at any time. For more information on how we collect, use and protect your personal
            data, please refer to our{" "}
            <a href="https://www.messe-berlin.asia/en/additional-pages/privacy-policy" className="text-accent underline underline-offset-2 hover:text-forest">
              Privacy Policy
            </a>
            .
          </p>
          <p>
            We use Mailchimp as our marketing platform. By clicking below to subscribe, you acknowledge that your information will be transferred to
            Mailchimp for processing. Learn more about Mailchimp’s privacy practices.
          </p>
        </div>
      </div>
    </form>
  );
}
