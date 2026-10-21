"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import chevronDown from "@/assets/about/icon-chevron-down.svg";
import captcha from "@/assets/about/captcha.png";
import { COUNTRIES, FormField, Pill, crop } from "../ui";
import PhoneInput from "../PhoneInput";

const Field = (p: { label: string; required?: boolean; className?: string; children: React.ReactNode }) => <FormField gap={8} required {...p} />;

const checkbox = "checkbox mt-0 size-[20px] rounded-[5px] border-[1.5px] border-[#a8a8a8] bg-white checked:border-accent checked:bg-accent";

// Bunny Edge Script (bunny/contact-form.ts) that emails the enquiry via ZeptoMail.
const ENDPOINT = "https://ffe-contact.bunny.run";

/** Enquiry form (Figma 736:2774): native validation, posts to the Bunny edge script, success state. */
export default function EnquiryForm() {
  const [done, setDone] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    const res = await fetch(ENDPOINT, { method: "POST", body: new FormData(e.currentTarget) }).catch(() => null);
    if (res?.ok) setDone(true);
    else setState("error");
  };

  if (done) {
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
        <Field label="Country">
          <span className="relative block">
            <select
              name="country"
              required
              defaultValue=""
              autoComplete="country-name"
              className="input cursor-pointer appearance-none pr-[44px] invalid:text-field"
            >
              <option value="" disabled>
                Select Country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
            <Image src={chevronDown} alt="" className="pointer-events-none absolute top-[14px] right-[16px] size-[18px]" />
          </span>
        </Field>
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
            <a href="#" className="font-semibold text-black underline-offset-2 hover:underline">
              Terms of Service
            </a>
            . I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal data for the purpose of processing my registration
            and managing my account.
          </span>
        </label>
      </div>

      {/* Placeholder for the Cloudflare Turnstile widget (image 79). */}
      <span className="relative block h-[72px] w-[325px] max-w-full overflow-hidden" aria-hidden>
        <Image src={captcha} alt="" sizes="429px" style={crop(131.94, 691.67, -15.45, -182.14)} />
      </span>

      {/* Honeypot: hidden from people, filled by bots; the edge script drops those. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {state === "error" && (
        <p role="alert" className="text-[14px] leading-[20px] font-medium text-[#c0392b]">
          Sorry, your enquiry couldn’t be sent. Please try again in a moment.
        </p>
      )}

      <div className="pt-[8px]">
        <Pill className="bg-accent text-white">{state === "sending" ? "Sending…" : "Submit Enquiry"}</Pill>
      </div>
    </form>
  );
}
