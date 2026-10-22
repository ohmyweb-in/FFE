"use client";

import Image from "next/image";
import chevronDown from "@/assets/about/icon-chevron-down.svg";
import { COUNTRIES, FormField, Pill } from "../ui";
import PhoneInput from "../PhoneInput";
import { PRIVACY, SendError, Turnstile, useSend } from "../FormSend";

const Field = (p: { label: string; required?: boolean; className?: string; children: React.ReactNode }) => <FormField gap={8} required {...p} />;

const checkbox = "checkbox mt-0 size-[20px] rounded-[5px] border-[1.5px] border-[#a8a8a8] bg-white checked:border-accent checked:bg-accent";

// Enquiry type → team inbox key (addresses live in bunny/contact-form.ts).
const TOPICS = [
  ["General Enquiry", "marketing"],
  ["Exhibiting & Sponsorship", "exhibitor"],
  ["Visitor Registration", "visitor"],
  ["Conference", "conference"],
  ["Buyers", "buyers"],
  ["Media Partnership", "media"],
];

const select = (name: string, placeholder: string, options: string[][]) => (
  <span className="relative block">
    <select name={name} required defaultValue="" autoComplete={name === "country" ? "country-name" : "off"} className="input cursor-pointer appearance-none pr-[44px] invalid:text-field">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map(([label, value = label]) => (
        <option key={value} value={value} className="text-black">
          {label}
        </option>
      ))}
    </select>
    <Image src={chevronDown} alt="" className="pointer-events-none absolute top-[14px] right-[16px] size-[18px]" />
  </span>
);

/** Enquiry form (Figma 736:2774): native validation, posts to the Bunny edge script, success state. */
export default function EnquiryForm() {
  const [state, onSubmit] = useSend("contact");

  if (state === "done") {
    return (
      <p
        role="status"
        className="fade-in mt-[18px] flex min-h-[240px] items-center justify-center rounded-[20px] bg-mint px-6 text-center text-[18px] leading-[24px] font-medium text-forest"
      >
        Thank you — your enquiry has been sent. Our team will get back to you within three business days.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-[18px] flex flex-col gap-[18px]">
      <div className="grid gap-[16px] md:grid-cols-2 md:gap-x-[24px] md:gap-y-[18px]">
        <Field label="First Name">
          <input name="firstName" required autoComplete="given-name" placeholder="John" className="input" />
        </Field>
        <Field label="Last Name">
          <input name="lastName" required autoComplete="family-name" placeholder="Doe" className="input" />
        </Field>
        <Field label="Phone Number">
          <PhoneInput />
        </Field>
        <Field label="Business Email Address">
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input" />
        </Field>
        <Field label="Job Title">
          <input name="jobTitle" required autoComplete="organization-title" placeholder="e.g. Marketing Manager" className="input" />
        </Field>
        <Field label="Company Name">
          <input name="company" required autoComplete="organization" placeholder="Your Company Name" className="input" />
        </Field>
        <Field label="Country">{select("country", "Select Country", COUNTRIES.map((c) => [c]))}</Field>
        <Field label="Enquiry Type">{select("team", "Select Enquiry Type", TOPICS)}</Field>
        <Field label="Please share details that will help the team prepare for your conversation." className="md:col-span-2">
          <textarea name="message" required placeholder="Type your message here…" className="input h-[120px] resize-y items-start pt-[14px]" />
        </Field>
      </div>

      <div className="flex flex-col gap-[14px] pt-[6px] text-[13px] leading-[19px] font-medium text-body">
        <label className="flex cursor-pointer items-start gap-[14px]">
          <input type="checkbox" name="marketingConsent" className={checkbox} />
          <span>
            By submitting this form, I consent to the organisers of Fresh Food Expo Asia Pacific (FFE APAC) collecting, using, processing and/or disclosing my personal
            information for communications and activities relating to its affiliates, partners and related events, including event updates, industry
            news, products and services, promotions, and other marketing communications.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-[14px]">
          <input type="checkbox" name="termsConsent" required className={checkbox} />
          <span>
            I have read, understood, and agree to the{" "}
            <a href={PRIVACY} target="_blank" rel="noopener" className="font-semibold text-black underline-offset-2 hover:underline">
              Terms of Service
            </a>
            . I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal data for the purpose of processing my registration
            and managing my account.
          </span>
        </label>
      </div>

      <Turnstile />

      {/* Honeypot: hidden from people, filled by bots; the edge script drops those. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <SendError state={state} />

      <div className="pt-[8px]">
        <Pill className="bg-accent text-white">{state === "sending" ? "Sending…" : "Submit Enquiry"}</Pill>
      </div>
    </form>
  );
}
