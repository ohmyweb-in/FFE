"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, type FormEvent } from "react";
import chevronDown from "@/assets/about/icon-chevron-down.svg";
import recaptcha from "@/assets/apply/recaptcha.png";
import { COUNTRIES, FormField, Pill } from "../ui";
import PhoneInput from "../PhoneInput";

// reCAPTCHA mock label only (Figma uses Inter 14 here).
const inter = Inter({ subsets: ["latin"], weight: "400" });

const PARTICIPATION = [
  "Exhibition Stand – Space Only",
  "Exhibition Stand – Shell Scheme",
  "Country / Regional Pavilion",
  "Sponsorship & Branding",
  "Not Sure Yet – Please Advise",
];

// Company Business Activity (1143:5692): fresh food, technology, then logistics and services.
const ACTIVITY = [
  ["Eggs & Dairy", "Fresh Fruit", "Fresh Vegetables", "Meat & Poultry", "Seafood"],
  [
    "Agricultural Technology",
    "Biosecurity & Protection Systems",
    "Chilling, Freezing & Cold Storage Technology",
    "Cultivation, Greenhouse & Controlled Environment Agriculture",
    "Digital Technologies and Applications",
    "Freshness & Shelf-Life Extension Technology",
    "Genetics, Breeding & Hatchery Technology",
    "Livestock Farming & Aquaculture Technology",
    "Preservation & Freshness Monitoring Technology",
    "Processing, Sorting & Packaging Technology",
    "Seeds, Variety Development, Plant Biotechnology",
    "Sorting & Grading Technology",
  ],
  [
    "Air, Land & Sea Freight",
    "Cargo Handling, Ports, Terminals, Reefer, Packhouse and Warehouse Facilities",
    "Cold Chain Management",
    "Supply Chain Technology & Tracking",
    "Tracking systems (RFID/barcode/GPS)",
    "Transport Services / Customs Clearance Services",
    "Wholesale Markets / Producer markets/Auctions",
    "Associations, Research and Educational institutions",
    "Financial, Insurance, Research & Consulting Services",
    "Government, Public Sector, Regulatory Agencies",
    "Quality, Food Safety, Standards and Certification",
    "Others",
  ],
];

const Field = (p: { label: string; required?: boolean; className?: string; children: React.ReactNode }) => (
  <FormField gap={8} labelCls="text-[15px] leading-[19px]" {...p} />
);

// Input (Figma 445:2792 instance): 48px, 10px radius, 15/23 text.
const input = "input h-[48px] rounded-[10px] text-[15px]";
// Taller on phones so the long goals placeholder (3–4 lines there) isn’t clipped.
const textarea = `${input} h-[120px] min-h-[96px] resize-y items-start pt-[14px] md:h-[96px]`;
const checkbox = "checkbox mt-0 size-[20px] rounded-[4px] border-[1.5px] border-[#8a8a8a] bg-white checked:border-accent checked:bg-accent";

function Select({ name, placeholder, options }: { name: string; placeholder: string; options: string[] }) {
  return (
    <span className="relative block">
      <select name={name} required defaultValue="" className={`${input} cursor-pointer appearance-none pr-[48px] text-[#1f1f1f]`}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Image src={chevronDown} alt="" className="pointer-events-none absolute top-[15px] right-[18px] size-[18px]" />
    </span>
  );
}

/** UI-only enquiry form (Figma 1143:5643): native validation + success state, no submission. */
export default function ApplyForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TODO: wire to the sales team's CRM.
    setDone(true);
  };

  if (done) {
    return (
      <p
        role="status"
        className="fade-in flex min-h-[240px] items-center justify-center rounded-[20px] bg-mint px-6 text-center text-[18px] leading-[24px] font-medium text-forest"
      >
        Thank you — your enquiry has been sent. A member of our sales team will contact you within three business days.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[20px]">
      <div className="grid gap-[20px] md:grid-cols-2 md:gap-x-[24px]">
        <Field label="First Name" required>
          <input name="firstName" required autoComplete="given-name" placeholder="Enter your first name" className={input} />
        </Field>
        <Field label="Last Name" required>
          <input name="lastName" required autoComplete="family-name" placeholder="Enter your last name" className={input} />
        </Field>
        <Field label="Business Email Address" required>
          <input name="email" type="email" required autoComplete="email" placeholder="Enter your business email" className={input} />
        </Field>
        <Field label="Phone Number (with country code)" required>
          <PhoneInput split placeholder="Enter your phone number" />
        </Field>
        <Field label="Job Title" required>
          <input name="jobTitle" required autoComplete="organization-title" placeholder="Enter your job title" className={input} />
        </Field>
        <Field label="Company Name" required>
          <input name="company" required autoComplete="organization" placeholder="Enter your company name" className={input} />
        </Field>
        <Field label="Company Website">
          <input name="website" type="url" autoComplete="url" placeholder="https://" className={input} />
        </Field>
        <Field label="Country" required>
          <Select name="country" placeholder="Select your country" options={COUNTRIES} />
        </Field>
        <Field label="Participation Interest" required className="md:col-span-2">
          <Select name="participation" placeholder="Select an option" options={PARTICIPATION} />
        </Field>
        {/* Figma 1143:5692: three columns (171 / 291 / 41 + 333) where the form card is wide enough (lg–xl full width, 1440+ beside the panel);
            otherwise the three lists stack and each flows into two columns from sm. */}
        <div role="group" aria-labelledby="activity-label" className="flex min-w-0 flex-col gap-[8px] md:col-span-2">
          <p id="activity-label" className="text-[15px] leading-[19px] font-medium text-black">
            Company Business Activity
          </p>
          <div className="flex flex-col gap-[14px] pt-[8px] lg:max-xl:grid lg:max-xl:grid-cols-[171px_291px_minmax(0,1fr)] lg:max-xl:gap-0 3xl:grid 3xl:grid-cols-[171px_291px_minmax(0,1fr)] 3xl:gap-0">
            {ACTIVITY.map((col, c) => (
              <ul
                key={c}
                className={`gap-x-[24px] sm:columns-2 lg:max-xl:columns-1 3xl:columns-1 ${c === 2 ? "lg:max-xl:pl-[41px] 3xl:pl-[41px]" : ""}`}
              >
                {col.map((a) => (
                  <li key={a} className="mb-[14px] break-inside-avoid last:mb-0">
                    <label className="flex cursor-pointer items-start gap-[14px] text-[13px] leading-[19px] font-medium text-body">
                      <input type="checkbox" name="activity" value={a} className={checkbox} />
                      <span className="min-w-0 flex-1">{a}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <Field label="Tell Us About Your Participation Goals" className="md:col-span-2">
          <textarea
            name="goals"
            placeholder="Please share your goals, products or solutions you would like to showcase, and any specific requirements."
            className={textarea}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-[14px] pt-[8px] text-[13px] leading-[19px] font-medium text-body">
        <label className="flex cursor-pointer items-start gap-[14px]">
          <input type="checkbox" name="marketingConsent" className={checkbox} />
          <span>
            By submitting this form, I consent to the organisers of Fresh Food Expo APAC collecting, using, processing and/or disclosing my personal
            information for communications and activities relating to its affiliates, partners and related events, including event updates, industry
            news, products and services, promotions, and other marketing communications.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-[14px]">
          <input type="checkbox" name="termsConsent" required className={checkbox} />
          <span>
            I have read, understood, and agree to the{" "}
            <a href="#" className="text-accent underline decoration-from-font underline-offset-2 transition-colors duration-(--dur-ui) hover:text-forest">
              Terms of Service
            </a>
            . I consent to Messe Berlin Asia Pacific collecting, using, and disclosing my personal data for the purpose of processing my registration
            and managing my account.
          </span>
        </label>
      </div>

      {/* reCAPTCHA (781:1592): static stand-in until the real widget is wired. */}
      <label className="flex h-[74px] w-[300px] max-w-full cursor-pointer items-center gap-[12px] rounded-[6px] border border-[#d3d3d3] bg-[#f9f9f9] px-[12px] drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.08)]">
        <input type="checkbox" name="captcha" className="checkbox size-[26px] rounded-[3px] border-2 border-[#c1c1c1] bg-white" />
        <span className={`${inter.className} min-w-0 flex-1 text-[14px] leading-normal text-black`}>I’m not a robot</span>
        <Image src={recaptcha} alt="" className="size-[48px] shrink-0" />
      </label>

      <div>
        <Pill className="w-[300px] max-w-full bg-accent text-white">Submit Enquiry</Pill>
      </div>
    </form>
  );
}
