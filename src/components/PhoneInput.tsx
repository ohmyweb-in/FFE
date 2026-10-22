"use client";

import Image from "next/image";
import { useState } from "react";
import chevronDownSm from "@/assets/contact/icon-chevron-down-sm.svg";
import { DIAL_ALL, DIAL_TOP } from "./dialCodes";

const options = (list: [string, string][]) =>
  list.map(([country, code]) => (
    <option key={country} value={country}>
      {country} ({code})
    </option>
  ));

/**
 * Phone Input (Figma 736:2787 / 736:3395): SG flag, dial code, divider, number.
 * `split` = Apply to Exhibit 781:1542: 48px, flag + chevron, divider, dial code, divider, number (15px).
 * The picker holds the country (several share +1 or +7); the code is posted as `dialCode`.
 */
export default function PhoneInput({ split, required = true, placeholder = "8123 4567" }: { split?: boolean; required?: boolean; placeholder?: string }) {
  const [country, setCountry] = useState("Singapore");
  const dial = DIAL_ALL.find(([c]) => c === country)![1];
  const flag = country === "Singapore" && (
    <span className="flex h-[15px] w-[22px] shrink-0 flex-col overflow-hidden rounded-[2px] border border-[#e0e0e0]" aria-hidden>
      <span className="h-1/2 bg-[#ef3340]" />
      <span className="h-1/2 bg-white" />
    </span>
  );
  // Transparent native select on top of the trigger lists the countries.
  const select = (
    <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country calling code" className="absolute inset-0 cursor-pointer opacity-0">
      <optgroup label="Asia Pacific">{options(DIAL_TOP)}</optgroup>
      <optgroup label="All countries">{options(DIAL_ALL)}</optgroup>
    </select>
  );
  const divider = <span className={`${split ? "h-[24px]" : "h-[22px]"} w-px shrink-0 bg-[#e0e0e0]`} aria-hidden />;

  return (
    <span className={`input gap-[10px] pr-[16px] pl-[14px] ${split ? "h-[48px] rounded-[10px] text-[15px]" : ""}`}>
      {split ? (
        <>
          {/* Flag + chevron trigger keeps its 46px width (and tap area) when the flag is hidden. */}
          <span className="relative flex min-w-[46px] shrink-0 items-center justify-end gap-[10px] self-stretch">
            {flag}
            <Image src={chevronDownSm} alt="" className="size-[14px]" />
            {select}
          </span>
          {divider}
          <span className="shrink-0 leading-[19px] text-black">{dial}</span>
        </>
      ) : (
        <>
          {flag}
          {/* Shows just the code, as in Figma. */}
          <span className="relative flex shrink-0 items-center gap-[10px] text-[14px] leading-[19px] text-black">
            {dial}
            <Image src={chevronDownSm} alt="" className="size-[14px]" />
            {select}
          </span>
        </>
      )}
      {divider}
      <input type="hidden" name="dialCode" value={dial} />
      <input
        name="phone"
        type="tel"
        required={required}
        autoComplete="tel-national"
        placeholder={placeholder}
        className={`h-full min-w-0 flex-1 bg-transparent leading-[19px] outline-none placeholder:text-field ${split ? "text-ellipsis" : ""}`}
      />
    </span>
  );
}
