"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import chevronDown from "@/assets/about/icon-chevron-down.svg";
import { input } from "../apply/ApplyForm";
import { COUNTRIES } from "./countries";

/**
 * Searchable country dropdown (ARIA combobox): type to filter, ↑/↓ + Enter or click to pick, Esc to close.
 * Free text that isn’t one of the options fails native validation, so the form only submits a listed country.
 */
export default function CountrySelect({ name, placeholder }: { name: string; placeholder: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const list = useId();

  const q = query.trim().toLowerCase();
  // Names starting with the query first, then the rest that contain it.
  const hits = COUNTRIES.filter((c) => c.toLowerCase().includes(q));
  const matches = [...hits.filter((c) => c.toLowerCase().startsWith(q)), ...hits.filter((c) => !c.toLowerCase().startsWith(q))];

  // Only a listed country is valid (empty is left to `required`).
  useEffect(() => {
    ref.current?.setCustomValidity(!query || COUNTRIES.includes(query) ? "" : "Please select a country from the list.");
  }, [query]);

  const pick = (c: string) => {
    setQuery(c);
    setOpen(false);
  };

  // Keep the highlighted option in view while arrowing through the list.
  useEffect(() => {
    if (open) document.getElementById(`${list}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, list]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      const n = matches.length;
      setActive((a) => (n ? (a + (e.key === "ArrowDown" ? 1 : n - 1)) % n : 0));
    } else if (e.key === "Enter" && open && matches[active]) {
      e.preventDefault();
      pick(matches[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <span className="relative block">
      <input
        ref={ref}
        name={name}
        required
        role="combobox"
        aria-expanded={open}
        aria-controls={list}
        aria-autocomplete="list"
        aria-activedescendant={open && matches[active] ? `${list}-${active}` : undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          // Typed rather than picked ("india", or the only match left): take the listed spelling.
          const exact = COUNTRIES.find((c) => c.toLowerCase() === q);
          if (exact || (q && matches.length === 1)) setQuery(exact ?? matches[0]);
        }}
        onKeyDown={onKeyDown}
        className={`${input} pr-[48px]`}
      />
      <Image
        src={chevronDown}
        alt=""
        className={`pointer-events-none absolute top-[15px] right-[18px] size-[18px] transition-transform duration-(--dur-ui) ${open ? "rotate-180" : ""}`}
      />
      {open && (
        <ul
          id={list}
          role="listbox"
          className="fade-in absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-[264px] overflow-y-auto overscroll-contain rounded-[10px] border border-field bg-white py-[6px] shadow-[0_12px_32px_-12px_rgb(2_93_3/0.3)]"
        >
          {matches.length ? (
            matches.map((c, i) => (
              <li
                key={c}
                id={`${list}-${i}`}
                role="option"
                aria-selected={c === query}
                // mousedown, not click: fires before the input’s blur closes the list.
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(c);
                }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-[16px] py-[9px] text-[15px] leading-[20px] font-medium ${i === active ? "bg-mint text-forest" : "text-[#1f1f1f]"}`}
              >
                {c}
              </li>
            ))
          ) : (
            <li className="px-[16px] py-[9px] text-[15px] leading-[20px] text-body">No matching country</li>
          )}
        </ul>
      )}
    </span>
  );
}
