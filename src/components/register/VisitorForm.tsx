"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import calendar from "@/assets/apply/icon-calendar.svg";
import pin from "@/assets/apply/icon-pin.svg";
import { checkbox, Field, input } from "../apply/ApplyForm";
import { Pill } from "../ui";
import { SendError, Turnstile, useSend } from "../FormSend";
import CountrySelect from "./CountrySelect";

// Content copied as-is from the Microsoft Form (forms.cloud.microsoft/r/M2XNWa49UM), in its order.
const SALUTATION = ["Ambassador", "Dr", "Professor", "High Commissioner", "Madam", "Mr", "Mrs", "Ms"];

const ACTIVITY = [
  "Academic, Research Institution",
  "Consulting, Professional Services",
  "Distributor, Wholesaler",
  "Food Manufacturer, Processor",
  "Foodservice, Hospitality, Catering",
  "Government, Public Agency, Regulator",
  "Importer, Exporter, Trader",
  "Industry Association, Chamber of Commerce",
  "Investor, Financial Institution",
  "Logistics & Distribution Providers",
  "Primary Producers",
  "Retailer, Supermarket, Grocery, E-commerce",
  "Technology Provider",
];

const PRODUCTS = [
  "Fresh Food - Eggs & Dairy",
  "Fresh Food - Fruit & Vegetables",
  "Fresh Food - Meat & Poultry",
  "Fresh Food - Seafood",
  "Agri & Fresh Technology - Agri-Tech",
  "Agri & Fresh Technology - Digital Solutions",
  "Agri & Fresh Technology - Packaging",
  "Agri & Fresh Technology - Preservation",
  "Logistics & Distribution - Cold Chain",
  "Logistics & Distribution - Distribution & Supply Chain",
  "Logistics & Distribution - Freight & Transportation",
  "Logistics & Distribution - Storage & Warehousing",
];

const PRIVACY = "https://www.messe-berlin.asia/en/additional-pages/privacy-policy";

// Same box as the Apply form checkbox, drawn as a round radio with a white ring around the accent dot.
const radio = `${checkbox} rounded-full checked:bg-none checked:shadow-[inset_0_0_0_4px_white]`;
const option = "flex cursor-pointer items-start gap-[14px] text-[13px] leading-[19px] font-medium text-body";
const groupLabel = "text-[15px] leading-[19px] font-medium text-black";

const Req = () => <span className="text-[#e4051f]"> *</span>;

/** Labelled group of radios / checkboxes (Apply form 1143:5692 "Company Business Activity" pattern). */
function Group({ id, label, radio: isRadio, className = "", children }: { id: string; label: ReactNode; radio?: boolean; className?: string; children: ReactNode }) {
  return (
    <div role={isRadio ? "radiogroup" : "group"} aria-labelledby={id} aria-required={isRadio || undefined} className={`flex min-w-0 flex-col gap-[16px] md:col-span-2 ${className}`}>
      <p id={id} className={groupLabel}>
        {label}
        <Req />
      </p>
      {children}
    </div>
  );
}

function Options({ name, options, type, className, onChange }: { name: string; options: string[]; type: "radio" | "checkbox"; className: string; onChange?: () => void }) {
  return (
    <ul className={`gap-x-[24px] ${className}`}>
      {options.map((o) => (
        <li key={o} className="mb-[14px] break-inside-avoid last:mb-0">
          <label className={option}>
            <input type={type} name={name} value={o} required={type === "radio"} onChange={onChange} className={type === "radio" ? radio : checkbox} />
            <span className="min-w-0 flex-1">{o}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

/** "I agree" consent question: the statement, then its single required checkbox. */
function Consent({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div role="group" aria-labelledby={`${name}-label`} className="flex flex-col gap-[12px] md:col-span-2">
      <p id={`${name}-label`} className="text-[13px] leading-[19px] font-medium text-body">
        {children}
        <Req />
      </p>
      <label className={option}>
        <input type="checkbox" name={name} value="I agree" required className={checkbox} />
        <span>I agree</span>
      </label>
    </div>
  );
}

/**
 * Visitor registration ("Register Your Interest"), rebuilt from the Microsoft Form in the Apply to Exhibit form's design.
 * Native validation, emailed to the visitor team, then the form's confirmation message.
 */
export default function VisitorForm() {
  const [state, onSubmit] = useSend("visit", "visitor", (form) => form.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  // Company Business Activity needs at least one tick (or Other): keep every box required until one is ticked.
  const [activityCount, setActivityCount] = useState(0);
  const [other, setOther] = useState(false);

  const countActivity = (e: FormEvent<HTMLDivElement>) => {
    const group = e.currentTarget;
    setActivityCount(group.querySelectorAll("input[name=activity]:checked").length);
    setOther((group.querySelector("input[name=activityOther]") as HTMLInputElement).checked);
  };
  const activityMissing = activityCount === 0 && !other;

  if (state === "done") {
    return (
      <div role="status" className="fade-in flex flex-col items-center gap-[14px] rounded-[20px] bg-mint px-[22px] py-[48px] text-center text-forest md:px-[40px] md:py-[64px]">
        <p className="text-[15px] leading-[19px] font-semibold tracking-[0.02em] text-accent uppercase">Submission Confirmation</p>
        <p className="font-display text-[26px] leading-[32px] font-semibold md:text-[32px] md:leading-[40px]">Thank you for registering your interest!</p>
        <p className="max-w-[640px] text-[17px] leading-[25px] font-medium text-body">
          Your interest in <strong className="font-semibold text-forest">Fresh Food Expo APAC 2027</strong> has been received. Our team will keep you
          updated on event developments, registration announcements and relevant participation opportunities.
        </p>
        <p className="mt-[10px] text-[16px] leading-[24px] font-medium text-body">
          <strong className="font-semibold text-forest">Fresh Food Expo APAC 2027</strong>
          <br />
          16–18 November 2027
          <br />
          Sands Expo &amp; Convention Centre, Singapore
        </p>
        <p className="text-[16px] leading-[24px] font-semibold text-forest">Connecting Fresh Food, Technology, Logistics and Distribution — From Farm to Fork.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-[28px] flex flex-col gap-[18px] md:mb-[32px]">
        {/* Apply's RuleHeading, with the 36×2 rule inline so it follows the last word when the long title wraps. */}
        <h2 className="font-display text-[26px] leading-[32px] font-semibold text-accent md:text-[34px] md:leading-[40px]">
          Fresh Food Expo APAC 2027 - Register Your{"\u00a0"}Interest
          <span className="ml-[16px] inline-block h-[2px] w-[36px] rounded-[1px] bg-accent align-middle" aria-hidden />
        </h2>
        {/* Event details: Apply panel 781:1647 rows (24px icons, 12px gap). */}
        <ul className="flex flex-col gap-[12px] text-[17px] leading-[23px] font-medium text-black md:text-[18px]">
          <li className="flex items-center gap-[12px]">
            <Image src={calendar} alt="" className="size-[24px] shrink-0" />
            16-18 November 2027
          </li>
          <li className="flex items-center gap-[12px]">
            <Image src={pin} alt="" className="size-[24px] shrink-0" />
            Sands Expo &amp; Convention Centre, Singapore
          </li>
        </ul>
        <p className="max-w-[900px] text-[15px] leading-[24px] font-medium text-body md:text-[16px]">
          Thank you for your interest in Fresh Food Expo APAC 2027, Asia Pacific’s premier trade fair for fresh food, technology, logistics and
          distribution. Complete the form below to register your interest and receive the latest event updates, registration announcements and
          opportunities to participate.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-[28px]">
        {/* items-end: when one label wraps (Mobile Number at md) the paired inputs still line up. */}
        <div className="grid gap-[24px] md:grid-cols-2 md:items-end md:gap-x-[24px]">
          <Group id="salutation-label" label="Salutation" radio>
            <Options name="salutation" type="radio" options={SALUTATION} className="flex flex-wrap gap-y-[14px] [&>li]:mb-0" />
          </Group>

          <Field label="First Name" required>
            <input name="firstName" required autoComplete="given-name" placeholder="Enter your first name" className={input} />
          </Field>
          <Field label="Last Name" required>
            <input name="lastName" required autoComplete="family-name" placeholder="Enter your last name" className={input} />
          </Field>
          <Field label="Business Email" required>
            <input name="email" type="email" required autoComplete="email" placeholder="Enter your business email" className={input} />
          </Field>
          <Field label="Mobile Number (Include '+' and 'country code')" required>
            <input
              name="mobile"
              type="tel"
              required
              autoComplete="tel"
              pattern="\+[0-9][0-9 \(\)\-]{6,}"
              title="Start with + and your country code, e.g. +65 8123 4567"
              placeholder="+65 8123 4567"
              className={input}
            />
          </Field>
          <Field label="Company Name" required>
            <input name="company" required autoComplete="organization" placeholder="Enter your company name" className={input} />
          </Field>
          <Field label="Job Title" required>
            <input name="jobTitle" required autoComplete="organization-title" placeholder="Enter your job title" className={input} />
          </Field>
          <Field label="Country / Region" required>
            <CountrySelect name="country" placeholder="Search country / region" />
          </Field>

          <Group id="activity-label" label="Company Business Activity">
            <div onChange={countActivity} className="flex flex-col gap-[14px]">
              <ul className="gap-x-[24px] sm:columns-2 xl:columns-3">
                {ACTIVITY.map((a) => (
                  <li key={a} className="mb-[14px] break-inside-avoid">
                    <label className={option}>
                      <input type="checkbox" name="activity" value={a} required={activityMissing} className={checkbox} />
                      <span className="min-w-0 flex-1">{a}</span>
                    </label>
                  </li>
                ))}
                <li className="break-inside-avoid">
                  <label className={option}>
                    <input type="checkbox" name="activityOther" value="Other" required={activityMissing} className={checkbox} />
                    <span className="min-w-0 flex-1">Other</span>
                  </label>
                </li>
              </ul>
              {other && (
                <input name="activityOtherText" required autoFocus placeholder="Other" aria-label="Other company business activity" className={`${input} fade-in md:max-w-[calc(50%-12px)]`} />
              )}
            </div>
          </Group>

          <Group id="products-label" label="What are the products/services that you are interested in?" radio>
            <Options name="products" type="radio" options={PRODUCTS} className="sm:columns-2 xl:columns-3" />
          </Group>

          <Consent name="marketingConsent">
            By submitting this form, I consent to the organisers of Fresh Food Expo Asia Pacific collecting, using, processing and/or disclosing my personal
            information for communications and activities relating to its affiliates, partners and related events, including event updates, industry news,
            products and services, promotions, and other marketing communications.
          </Consent>
          <Consent name="termsConsent">
            I have read, understood, and agree to the Terms of Service. I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal
            data for the purpose of processing my registration and managing my account.{" "}
            <a
              href={PRIVACY}
              target="_blank"
              rel="noopener"
              className="[overflow-wrap:anywhere] text-accent underline decoration-from-font underline-offset-2 transition-colors duration-(--dur-ui) hover:text-forest"
            >
              {PRIVACY}
            </a>
          </Consent>
        </div>

        <Turnstile />
        <SendError state={state} />

        <div>
          <Pill className="w-[300px] max-w-full bg-accent text-white">{state === "sending" ? "Sending…" : "Submit"}</Pill>
        </div>
      </form>
    </>
  );
}
