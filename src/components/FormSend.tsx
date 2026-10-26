"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

// Bunny Edge Script (bunny/contact-form.ts): checks the Turnstile token, then emails the entry to the team inbox.
const ENDPOINT = "https://ffe-contact.bunny.run";
// Cloudflare Turnstile site key (public; the secret lives in the edge script's env). Cloudflare's always-pass test key for local experiments: 1x00000000000000000000AA.
const SITE_KEY = "0x4AAAAAAFgvz0fD6-Qi3FgK";

// Terms of Service / privacy link on the forms' consent checkboxes.
export const PRIVACY = "https://www.messe-berlin.de/en/extra-pages/data-protection";

type TurnstileApi = { render: (el: HTMLElement, o: { sitekey: string; size?: "normal" | "compact" }) => string; reset: (id: string) => void; remove: (id: string) => void };
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Loaded once, on the first page with a form (explicit render: forms can mount after a client-side navigation).
let api: Promise<TurnstileApi> | undefined;
const loadTurnstile = () =>
  (api ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.onload = () => resolve(window.turnstile!);
    s.onerror = () => {
      api = undefined;
      reject();
    };
    document.head.append(s);
  }));

/** Cloudflare Turnstile widget (300×65, or 150×140 compact in a narrow slot): adds the `cf-turnstile-response` field to its form. */
export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let id: string | undefined;
    let gone = false;
    loadTurnstile()
      .then((t) => {
        if (gone || !ref.current) return;
        // The normal widget is 300px wide and overflows form cards narrower than that (320px phones): use the 150×140 compact one.
        const compact = ref.current.clientWidth > 0 && ref.current.clientWidth < 300;
        if (compact) ref.current.style.minHeight = "140px";
        id = t.render(ref.current, { sitekey: SITE_KEY, size: compact ? "compact" : "normal" });
        ref.current.dataset.widgetId = id;
      })
      .catch(() => {});
    return () => {
      gone = true;
      if (id) window.turnstile?.remove(id);
    };
  }, []);
  return <div ref={ref} className="min-h-[65px]" />;
}

/**
 * Submit handler for the site's forms: posts the fields plus `form` (email subject) and `team` (inbox; the contact form
 * lets the visitor pick it instead). A Turnstile token is single-use, so a failed send resets the widget for the retry.
 */
export function useSend(form: string, team?: string, onDone?: (el: HTMLFormElement) => void) {
  const [state, setState] = useState<"idle" | "sending" | "error" | "done">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const el = e.currentTarget;
    const body = new FormData(el);
    body.set("form", form);
    if (team) body.set("team", team);
    setState("sending");
    const res = await fetch(ENDPOINT, { method: "POST", body }).catch(() => null);
    if (res?.ok) {
      onDone?.(el);
      setState("done");
      return;
    }
    const id = el.querySelector<HTMLElement>("[data-widget-id]")?.dataset.widgetId;
    if (id) window.turnstile?.reset(id);
    setState("error");
  };

  return [state, onSubmit] as const;
}

export function SendError({ state }: { state: string }) {
  return state === "error" ? (
    <p role="alert" className="text-[14px] leading-[20px] font-medium text-[#c0392b]">
      Sorry, this couldn’t be sent. Please wait for the security check to finish and try again.
    </p>
  ) : null;
}
