"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type RefObject, useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import logoCompact from "@/assets/logo-compact.png";
import menuIcon from "@/assets/icon-menu.png";
import chevronContact from "@/assets/chevron-contact.svg";
import chevronLang from "@/assets/chevron-lang.svg";
import searchIcon from "@/assets/icon-search.png";
import { Button, Pill, crop } from "./ui";
import { NAV, type NavSection } from "./nav";

// FFE MENA link hidden at client request (kept in place so the utility links stay right-aligned); drop `invisible` to restore.
const SITE = "FFE MENA";
const UTIL = [
  { label: "Newsletter", href: "/subscribe" },
  { label: "Press", href: "/news" },
];

const Divider = () => <span className="h-[22px] w-px bg-white" aria-hidden />;

const Caret = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 12 8" fill="none" aria-hidden className={`h-[7px] w-[11px] ${className}`}>
    <path d="M1.5 1.5 6 6l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`size-4 ${className}`}>
    <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Every page in the menu, once, searched by its label, description and menu section.
const PAGES = [
  { label: "Home", href: "/", desc: "Fresh Food Expo Asia Pacific, 16–18 November 2027, Singapore", section: "" },
  ...NAV.flatMap((s) => s.links.map((l) => ({ ...l, section: s.label }))),
].filter((p, i, all) => all.findIndex((q) => q.href === p.href) === i);

/** Site search (native <dialog>): filters the menu's pages as you type; an empty box lists them all. */
function SearchDialog({ dialog }: { dialog: RefObject<HTMLDialogElement | null> }) {
  const [q, setQ] = useState("");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = PAGES.filter((p) => words.every((w) => `${p.label} ${p.desc} ${p.section}`.toLowerCase().includes(w)));
  return (
    <dialog
      ref={dialog}
      aria-label="Search the site"
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      onClose={() => setQ("")}
      className="modal mx-auto mt-[12vh] w-[calc(100%-32px)] max-w-[640px] bg-transparent"
    >
      <div className="modal-body rounded-[24px] bg-white p-3 shadow-[0_32px_64px_-28px_rgb(2_93_3/0.4)]">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pages…"
          aria-label="Search pages"
          autoFocus
          className="input h-[52px] px-4 text-[17px]"
        />
        <ul className="mt-2 max-h-[min(60dvh,480px)] overflow-y-auto overscroll-contain">
          {hits.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="flex flex-col gap-[2px] rounded-[14px] px-4 py-[10px] transition-colors duration-(--dur-ui) hover:bg-mint focus-visible:bg-mint focus-visible:outline-none">
                <span className="font-display text-[17px] font-medium text-ink">{p.label}</span>
                <span className="text-[13px] text-body/80">{p.section ? `${p.section} · ${p.desc}` : p.desc}</span>
              </a>
            </li>
          ))}
          {!hits.length && <li className="px-4 py-[10px] text-[15px] text-body">No pages match “{q}”.</li>}
        </ul>
      </div>
    </dialog>
  );
}

/**
 * Utility bar above the header (Figma 736:1498). Scrolls away; the header below stays sticky.
 * Below lg language + search stay visible and Newsletter / Press move into the mobile menu.
 */
function TopBar() {
  const search = useRef<HTMLDialogElement>(null);
  const openSearch = () => search.current?.showModal();
  return (
    <>
      <div className="bg-forest font-medium tracking-[0.02em] text-white">
        <div className="container-page flex h-[44px] items-center justify-between text-[14px] lg:hidden">
          <a href="#" aria-hidden tabIndex={-1} className="invisible flex h-[44px] items-center uppercase">
            {SITE}
          </a>
          <div className="-mr-[12px] flex items-center">
            <a href="#" aria-label="Language: English" className="flex h-[44px] items-center gap-[5px] px-[8px] text-white/50 uppercase">
              EN
              <Image src={chevronLang} alt="" className="rotate-180" />
            </a>
            <button type="button" onClick={openSearch} aria-label="Search" className="grid size-[44px] place-items-center">
              <Image src={searchIcon} alt="" sizes="18px" className="size-[18px]" />
            </button>
          </div>
        </div>

        <div className="container-page hidden h-[49px] items-center justify-between text-[15px] lg:flex">
          <a href="#" aria-hidden tabIndex={-1} className="footer-link invisible uppercase hover:text-white/70">
            {SITE}
          </a>
          <ul className="flex items-center gap-[18px]">
            {UTIL.map((l) => (
              <li key={l.label} className="flex items-center gap-[18px]">
                <Link href={l.href} className="footer-link hover:text-white/70">
                  {l.label}
                </Link>
                <Divider />
              </li>
            ))}
            <li>
              <a href="#" aria-label="Language: English" className="footer-link flex items-start gap-[5px] text-white/50 uppercase hover:text-white/70">
                <span className="trim">EN</span>
                <Image src={chevronLang} alt="" className="mt-[5px] rotate-180" />
              </a>
            </li>
            <li className="ml-[-4px]">
              <button type="button" onClick={openSearch} aria-label="Search" className="block cursor-pointer transition-opacity duration-(--dur-ui) hover:opacity-70">
                <Image src={searchIcon} alt="" sizes="18px" className="size-[18px]" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <SearchDialog dialog={search} />
    </>
  );
}

/** Desktop mega menu panel (800px, right-aligned under the nav): photo card on the left, section links + CTA on the right. */
function MegaPanel({ s, i, on }: { s: NavSection; i: number; on: boolean }) {
  return (
    <div
      id={`mega-${i}`}
      inert={!on}
      tabIndex={-1}
      className={`absolute inset-x-0 top-full pt-2 font-sans text-[16px] font-normal tracking-normal normal-case outline-none transition-[opacity,transform] duration-(--dur-ui) ease-(--ease-out) ${
        on ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="container-page flex justify-end">
        <div className="grid w-[800px] grid-cols-[200px_1fr] gap-2 rounded-[24px] bg-white p-2 shadow-[0_32px_64px_-28px_rgb(2_93_3/0.4)] ring-1 ring-forest/5">
          <Link href={s.href} tabIndex={-1} className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[18px] p-5 text-white">
            <Image src={s.image} alt="" fill sizes="200px" className="zoom object-cover" />
            <span className="absolute inset-0 bg-linear-to-t from-forest via-forest/70 to-brand/10" aria-hidden />
            <span className="relative font-display text-[20px] leading-none font-semibold uppercase tracking-[0.02em]">{s.label}</span>
            <span className="relative mt-2 text-[13px] leading-[1.4] text-white/85">{s.blurb}</span>
          </Link>

          <div className="flex flex-col px-2 pt-2 pb-3">
            <ul className="grid grid-cols-2 gap-1">
              {s.links.map((l) => (
                <li key={l.label} className="[text-box:normal]!">
                  <Link
                    href={l.href}
                    className="group/l flex items-center justify-between gap-3 rounded-[14px] px-4 py-[10px] transition-colors duration-(--dur-ui) hover:bg-mint focus-visible:bg-mint focus-visible:outline-none"
                  >
                    <span>
                      <span className="block font-display text-[17px] font-medium text-ink transition-colors duration-(--dur-ui) group-hover/l:text-forest">
                        {l.label}
                      </span>
                      <span className="mt-[2px] block text-[13px] text-body/80">{l.desc}</span>
                    </span>
                    <Arrow className="shrink-0 -translate-x-1 text-accent opacity-0 transition-[opacity,transform] duration-(--dur-ui) ease-(--ease-out) group-hover/l:translate-x-0 group-hover/l:opacity-100 group-focus-visible/l:translate-x-0 group-focus-visible/l:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-forest/10 px-4 pt-3">
              {/* Figma 1138:1433: 7px dot, 12px #727272 copy. */}
              <p className="flex min-w-0 items-center gap-[6px] text-[12px] font-medium tracking-[0.02em] text-[#727272] [text-box:normal]!">
                <span className="size-[7px] shrink-0 rounded-full bg-accent" aria-hidden />
                16-18 November 2027 | Sands Expo &amp; Convention Centre, Singapore
              </p>
              <Pill href={s.cta.href} className="shrink-0 bg-brand whitespace-nowrap text-white md:h-[40px]! md:px-[18px]! md:text-[15px]!">
                {s.cta.label}
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  // trailingSlash: true serves /why-visit/, while nav hrefs have no trailing slash.
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Desktop mega menu: index of the open section. Hover opens after a short intent delay and
  // closes with a grace period so the pointer can cross the gap into the panel.
  const [menu, setMenu] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const carets = useRef<(HTMLButtonElement | null)[]>([]);
  const showMenu = (i: number | null, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(i), delay);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (menu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      carets.current[menu]?.focus();
      setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const solid = scrolled || open || menu !== null;

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-(--ease-out) ${
          solid ? "bg-page/90 shadow-[0_6px_24px_-12px_rgb(2_93_3/0.25)] backdrop-blur-md" : "bg-page/0"
        }`}
      >
        <div className="container-page flex h-(--header-h) items-center justify-between lg:items-start lg:pt-[17px]">
          <Link href="/" aria-label="Fresh Food Expo Asia Pacific — home" className="tap shrink-0">
            <Image src={logo} alt="Fresh Food Expo Asia Pacific" sizes="131px" preload className="hidden h-[90px] w-[131px] object-cover object-right lg:block" />
            {/* Compact "FFE" mark below lg (Figma 318:1795, 79×42 crop). */}
            <span className="relative block h-[42px] w-[79px] overflow-hidden lg:hidden">
              <Image src={logoCompact} alt="Fresh Food Expo Asia Pacific" sizes="100px" preload style={crop(126.03, 131.85, -12.67, -16.56)} />
            </span>
          </Link>

          <div className="hidden items-center gap-[35px] lg:mt-[18px] lg:flex">
            <nav aria-label="Primary" onClick={(e) => (e.target as Element).closest("a") && setMenu(null)}>
              <ul className="flex items-center gap-[22px] font-display text-[19px] font-medium uppercase tracking-[0.02em] text-ink">
                {NAV.map((n, i) => {
                  const on = menu === i;
                  const here = n.links.some((l) => l.href === pathname);
                  return (
                    <li
                      key={n.label}
                      className="flex items-center gap-[6px]"
                      onPointerEnter={(e) => e.pointerType === "mouse" && showMenu(i, menu === null ? 90 : 0)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && showMenu(null, 220)}
                      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && showMenu(null, 0)}
                    >
                      <Link
                        href={n.href}
                        aria-current={here ? "page" : undefined}
                        className={`nav-link trim block transition-colors duration-(--dur-ui) hover:text-forest ${on ? "text-forest" : ""}`}
                      >
                        {n.label}
                      </Link>
                      <button
                        type="button"
                        ref={(el) => {
                          carets.current[i] = el;
                        }}
                        aria-expanded={on}
                        aria-controls={`mega-${i}`}
                        aria-label={`${n.label} menu`}
                        onClick={() => showMenu(on ? null : i, 0)}
                        className={`grid size-6 place-items-center rounded-full transition-colors duration-(--dur-ui) hover:text-forest focus-visible:outline-2 focus-visible:outline-forest ${on ? "text-forest" : "text-ink"}`}
                      >
                        <Caret className={`transition-transform duration-(--dur-ui) ease-(--ease-out) ${on ? "rotate-180" : ""}`} />
                      </button>
                      <MegaPanel s={n} i={i} on={on} />
                    </li>
                  );
                })}
              </ul>
            </nav>
            {/* Figma 1138:191: 246×47. */}
            <Button href="/register-to-visit" chevron={chevronContact} w={246} h={47} pl={24} gap={13} className="bg-brand text-white">
              Register Your Interest
            </Button>
          </div>

          {/* Below lg (Figma 318:2092 / 318:2089): Register pill + 47px ringed menu button. */}
          <div className="flex items-center gap-[13px] max-[379px]:gap-[8px] lg:hidden">
            <Button
              href="/register-to-visit"
              chevron={chevronContact}
              w={246}
              h={47}
              pl={24}
              gap={13}
              m={{ w: 166, h: 43, pl: 13, gap: 5, fs: 13, chev: 0.916 }}
              className="bg-accent text-white"
            >
              Register Your Interest
            </Button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="relative grid size-[47px] place-items-center rounded-full border-2 border-[#032919] text-[#032919] transition-colors duration-(--dur-ui) hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <Image
                src={menuIcon}
                alt=""
                sizes="21px"
                className={`size-[21px] transition-[opacity,transform] duration-(--dur-ui) ease-(--ease-out) ${open ? "scale-75 opacity-0" : "opacity-100"}`}
              />
              {[45, -45].map((deg) => (
                <span
                  key={deg}
                  className="absolute h-[2px] w-[18px] rounded-full bg-current transition-[transform,opacity] duration-(--dur-ui) ease-(--ease-out)"
                  style={{ transform: `rotate(${open ? deg : 0}deg) scaleX(${open ? 1 : 0})`, opacity: open ? 1 : 0 }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu: opacity + transform only; inert while closed. */}
        <div
          id="mobile-menu"
          inert={!open}
          className={`absolute inset-x-0 top-full transition-[opacity,transform] duration-(--dur-ui) ease-(--ease-out) lg:hidden ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {/* Scrolls inside itself on short phones (About alone has six pages); 60px = 44px top bar + 16px gap. */}
          <nav
            aria-label="Mobile"
            className="container-wide max-h-[calc(100dvh-var(--header-h)-60px)] overflow-y-auto overscroll-contain rounded-[24px] bg-white p-3 shadow-[0_24px_48px_-24px_rgb(2_93_3/0.35)]"
          >
            {/* Exclusive accordion (shared name): one section open at a time, the current page’s section open by default. */}
            <ul>
              {NAV.map((n) => {
                const here = n.links.some((l) => l.href === pathname);
                return (
                  <li key={n.label}>
                    <details name="mobile-nav" open={here} className="group">
                      <summary
                        className={`flex min-h-12 cursor-pointer list-none items-center justify-between rounded-2xl px-4 font-display text-[19px] font-medium tracking-[0.02em] uppercase transition-colors group-open:text-forest hover:bg-mint [&::-webkit-details-marker]:hidden ${
                          here ? "text-forest" : "text-ink"
                        }`}
                      >
                        {n.label}
                        <Caret className="transition-transform duration-(--dur-ui) ease-(--ease-out) group-open:rotate-180" />
                      </summary>
                      <ul className="mb-2 ml-4 border-l-2 border-mint pl-2">
                        {n.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              href={l.href}
                              aria-current={l.href === pathname ? "page" : undefined}
                              onClick={() => setOpen(false)}
                              className="flex min-h-11 items-center rounded-xl px-3 text-[16px] font-medium text-body transition-colors hover:bg-mint aria-[current]:font-semibold aria-[current]:text-forest"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ul>
            {/* Utility links that don't fit the mobile bar. */}
            <ul className="mt-2 flex border-t border-black/10 pt-2 text-[16px] font-medium text-body">
              {UTIL.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-2xl px-4 transition-colors hover:bg-mint">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
