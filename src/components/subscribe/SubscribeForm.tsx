"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import chevronDown from "@/assets/about/icon-chevron-down.svg";
import leaf from "@/assets/subscribe/leaf.svg";
import PhoneInput from "../PhoneInput";
import { COUNTRIES, FormField, Pill } from "../ui";
import { SendError, Turnstile, useSend } from "../FormSend";

const Field = (p: { label: string; className?: string; children: ReactNode }) => <FormField gap={8} required {...p} />;

/** Subscribe form (Figma 736:3367): native validation, emailed to the marketing team, success state. */
export default function SubscribeForm() {
  const [state, onSubmit] = useSend("subscribe", "marketing");

  return (
    <>
      <h2 className="font-display text-[28px] leading-[34px] font-semibold text-forest md:text-[32px] md:leading-[38px]">
        Subscribe to our updates
      </h2>

      {state === "done" ? (
        <p role="status" className="fade-in mt-[18px] flex min-h-[280px] items-center justify-center rounded-[20px] bg-mint px-6 text-center text-[18px] leading-[24px] font-medium text-forest">
          Thanks for subscribing — you’re now part of the FFE APAC community.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="relative mt-[18px] flex flex-col gap-[18px]">
          <div className="grid gap-[16px] md:grid-cols-2 md:gap-x-[20px] md:gap-y-[18px]">
            <Field label="First Name">
              <input name="firstName" required autoComplete="given-name" placeholder="John" className="input" />
            </Field>
            <Field label="Last Name">
              <input name="lastName" required autoComplete="family-name" placeholder="Doe" className="input" />
            </Field>
            <Field label="Email Address">
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input" />
            </Field>
            <Field label="Company Name">
              <input name="company" required autoComplete="organization" placeholder="Your Company Name" className="input" />
            </Field>
            <Field label="Job Title">
              <input name="jobTitle" required autoComplete="organization-title" placeholder="e.g. Marketing Manager" className="input" />
            </Field>
            <Field label="Country">
              <span className="relative block">
                <select name="country" required defaultValue="" autoComplete="country-name" className="input cursor-pointer appearance-none pr-[44px] invalid:text-field">
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
            <Field label="Contact Number" className="md:col-span-2">
              <PhoneInput />
            </Field>
          </div>

          <label className="flex cursor-pointer items-start gap-[14px] pt-[6px] text-[13px] leading-[19px] font-medium text-body">
            <input
              type="checkbox"
              name="marketingConsent"
              required
              className="checkbox size-[22px] rounded-[5px] border-[1.5px] border-[#a8a8a8] bg-white checked:border-accent checked:bg-accent"
            />
            <span>
              By submitting this form, I consent to the organisers of <b className="font-semibold">Fresh Food Expo Asia Pacific (FFE APAC)</b> collecting, using, processing
              and/or disclosing my personal information for communications and activities relating to its affiliates, partners and related events,
              including event updates, industry news, products and services, promotions, and other marketing communications.
            </span>
          </label>

          <Turnstile />
          <SendError state={state} />

          <div className="pt-[8px]">
            <Pill className="bg-accent text-white">{state === "sending" ? "Sending…" : "Subscribe"}</Pill>
          </div>
        </form>
      )}

      {/* image 11 [Vectorized] (736:3409): 195.8×106.4 in the card's bottom-right corner. */}
      <Image src={leaf} alt="" aria-hidden className="pointer-events-none absolute right-0 bottom-0 hidden h-[106.365px] w-[195.818px] max-w-none sm:block" />
    </>
  );
}
