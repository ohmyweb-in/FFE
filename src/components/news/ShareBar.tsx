"use client";

import { useEffect, useRef, useState } from "react";

// Mirrors scripts/elementor/ffe-share.php (production): links are built at runtime from the canonical URL and og:title.
// No third-party scripts or cookies; the GA4 "share" event is sent only if gtag exists (after consent).
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const icon = (d: string, filled?: boolean) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="block size-[20px]" {...(filled ? { fill: "currentColor" } : STROKE)}>
    <path d={d} />
  </svg>
);

const btn =
  "inline-flex size-[44px] items-center justify-center rounded-full border border-mint bg-mint text-forest transition-colors duration-250 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

const D = {
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  copy: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2 3.77-2 4 0 4.77 2.6 4.77 6V21h-4v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z",
  whatsapp: "M3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 8 19.3zM9.2 8.6c0 3.3 2.9 6.2 6.2 6.2l1.1-1.6-2.2-1-1 .9c-.9-.4-1.8-1.3-2.2-2.2l.9-1-1-2.2z",
  email: "M3 6h18v12H3zM3 7l9 7 9-7",
  facebook: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z",
  x: "M17.8 3h3l-6.6 7.5L22 21h-6.1l-4.8-6.3L5.6 21h-3l7-8L2.2 3h6.3l4.3 5.7zM16.7 19.2h1.7L7.4 4.7H5.6z",
  telegram:
    "M21.5 3.6 2.9 10.8c-.9.3-.9 1 0 1.3l4.7 1.5 1.8 5.6c.2.6.4.8.9.8s.7-.2 1-.5l2.4-2.3 4.7 3.5c.9.5 1.5.2 1.7-.8l3-14.5c.3-1.3-.5-1.9-1.6-1.4zM8.6 13.2l9.2-5.8c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2z",
};

type Gtag = (cmd: "event", name: string, params: Record<string, string>) => void;

export default function ShareBar({ className = "" }: { className?: string }) {
  const [page, setPage] = useState<{ url: string; title: string; canShare: boolean } | null>(null);
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only values (canonical URL, navigator.share), unknown at prerender
    setPage({ url: canon || location.origin + location.pathname, title: og || document.title, canShare: typeof navigator.share === "function" });
  }, []);

  if (!page) return <div className={className} style={{ minHeight: 118 }} />;
  const { url, title } = page;
  const U = encodeURIComponent(url);
  const T = encodeURIComponent(title);
  const track = (method: string) => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === "function") gtag("event", "share", { method, content_type: "article", item_id: url.replace(/^https?:\/\/[^/]+/, "") });
  };
  const say = (t: string) => {
    setMsg(t);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 2000);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      say("Link copied");
      track("copy_link");
    } catch {
      const t = document.createElement("textarea");
      t.value = url;
      t.readOnly = true;
      t.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.append(t);
      t.select();
      const ok = document.execCommand("copy");
      t.remove();
      if (ok) {
        say("Link copied");
        track("copy_link");
      } else say(`Press Ctrl+C to copy: ${url}`);
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title, url });
      track("native");
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") say("Sharing failed");
    }
  };
  const links: [string, string, string, string, boolean?][] = [
    ["linkedin", "Share on LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${U}`, D.linkedin, true],
    ["whatsapp", "Share on WhatsApp", `https://api.whatsapp.com/send?text=${T}%20${U}`, D.whatsapp],
    ["email", "Share by email", `mailto:?subject=${T}&body=${T}%0A%0A${U}`, D.email],
    ["facebook", "Share on Facebook", `https://www.facebook.com/sharer/sharer.php?u=${U}`, D.facebook, true],
    ["x", "Share on X", `https://x.com/intent/tweet?url=${U}&text=${T}`, D.x, true],
    ["telegram", "Share on Telegram", `https://t.me/share/url?url=${U}&text=${T}`, D.telegram, true],
  ];

  return (
    <aside className={className} data-ffe-share>
      <h2 className="font-display text-[22px] leading-[28px] font-semibold text-forest">Share this article</h2>
      <div className="mt-[16px] flex flex-wrap gap-[10px]">
        {page.canShare && (
          <button type="button" className={btn} aria-label="Share this article" onClick={share}>
            {icon(D.share)}
          </button>
        )}
        <button type="button" className={btn} aria-label="Copy link" onClick={copy}>
          {icon(D.copy)}
        </button>
        {links.map(([id, label, href, d, filled]) => (
          <a key={id} href={href} className={btn} aria-label={label} onClick={() => track(id)} {...(id === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
            {icon(d, filled)}
          </a>
        ))}
      </div>
      <p className="mt-[10px] min-h-[22px] text-[15px] leading-[22px] font-medium text-forest" aria-live="polite">
        {msg}
      </p>
    </aside>
  );
}
