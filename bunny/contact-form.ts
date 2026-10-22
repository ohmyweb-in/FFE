// Bunny Edge Script (standalone, its own pull zone): every form on the website posts here; the
// Turnstile token is checked, then newsletter sign-ups go to Mailchimp and everything else is emailed
// through ZeptoMail to the form's team inbox.
// Kept off the site's own pull zone because Bunny middleware doesn't run on storage-backed (Bunny Sites) zones.
// Deploy: see bunny/README.md. Env: ZEPTOMAIL_TOKEN, TURNSTILE_SECRET, MAILCHIMP_API_KEY (secrets), MAIL_FROM, ALLOWED_ORIGINS.
import * as BunnySDK from "npm:@bunny.net/edgescript-sdk@0.12.1";
import { createHash } from "node:crypto";
import process from "node:process";

// Messe Berlin Asia Pacific audience (shared with their other events); FFE APAC sign-ups carry this tag.
const MAILCHIMP = "https://us11.api.mailchimp.com/3.0/lists/20965648a9/members";
const MAILCHIMP_TAG = "FFE APAC";

// Team inboxes. Forms send a `team` key, never an address, so the site can't be used to mail anyone else.
const TEAMS: Record<string, string> = {
  exhibitor: "exhibitor@freshfoodexpoapac.com",
  marketing: "marketing@freshfoodexpoapac.com",
  visitor: "visitor@freshfoodexpoapac.com",
  conference: "conference@freshfoodexpoapac.com",
  buyers: "buyers@freshfoodexpoapac.com",
  media: "media@freshfoodexpoapac.com",
};

// Subject prefix per form (`form` field).
const FORMS: Record<string, string> = {
  contact: "Website enquiry",
  exhibit: "Apply to exhibit",
  visit: "Visitor registration",
  subscribe: "Newsletter sign-up",
};

// Not shown in the email (routing, honeypot, Turnstile token; the dial code is joined to the phone number).
const HIDDEN = new Set(["form", "team", "website", "dialCode", "cf-turnstile-response"]);

// Labels for field names that don't read well de-camel-cased.
const LABELS: Record<string, string> = {
  activity: "Business Activity",
  activityOther: "Business Activity (Other)",
  activityOtherText: "Other Activity",
  products: "Products of Interest",
  participation: "Participation Interest",
  goals: "Participation Goals",
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const label = (key: string) => LABELS[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

async function contact(request: Request, json: (status: number, body: object) => Response): Promise<Response> {
  if (request.method !== "POST") return json(405, { ok: false });
  const form = await request.formData().catch(() => null);
  if (!form) return json(400, { ok: false });
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 5000);

  // Honeypot: real visitors never see or fill `website`; pretend success to bots.
  if (get("website")) return json(200, { ok: true });

  const email = get("email");
  const to = TEAMS[get("team")];
  const subject = FORMS[get("form")];
  if (!to || !subject || !get("firstName") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(422, { ok: false });

  const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: String(process.env.TURNSTILE_SECRET), response: get("cf-turnstile-response") }),
  })
    .then((r) => r.json())
    .catch(() => null);
  if (!check?.success) return json(403, { ok: false });

  if (get("form") === "subscribe") return subscribe(get, json);

  // Every submitted field, in form order; checkbox groups are joined. Capped so a crafted post can't build a huge email.
  const rows = [...new Set(form.keys())]
    .filter((k) => !HIDDEN.has(k))
    .slice(0, 40)
    .map((k) => {
      let value = form.getAll(k).map((v) => String(v).trim().slice(0, 5000)).filter(Boolean).join(", ");
      // A number typed with its own "+code" wins over the picker.
      if (k === "phone" && value && !value.startsWith("+")) value = `${get("dialCode")} ${value}`;
      return [label(k), value === "on" ? "Yes" : value];
    });
  if (!form.has("marketingConsent")) rows.push(["Marketing Consent", "No"]);
  const table = rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join("");

  const name = `${get("firstName")} ${get("lastName")}`.trim();
  const company = get("company");
  const res = await fetch("https://api.zeptomail.com/v1.1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Zoho-enczapikey ${process.env.ZEPTOMAIL_TOKEN}` },
    body: JSON.stringify({
      from: { address: process.env.MAIL_FROM, name: "Fresh Food Expo APAC" },
      to: [{ email_address: { address: to } }],
      reply_to: [{ address: email, name }],
      // Visitor text in a header: collapse line breaks and cap the length.
      subject: `${subject}: ${name}${company ? `, ${company}` : ""}`.replace(/\s+/g, " ").slice(0, 150),
      htmlbody: `<table style="font:14px/1.5 sans-serif">${table}</table>`,
    }),
  });
  if (!res.ok) console.error("ZeptoMail", res.status, await res.text());
  return json(res.ok ? 200 : 502, { ok: res.ok });
}

async function subscribe(get: (k: string) => string, json: (status: number, body: object) => Response): Promise<Response> {
  const headers = { Authorization: `Basic ${btoa(`x:${process.env.MAILCHIMP_API_KEY}`)}`, "Content-Type": "application/json" };
  const f = (k: string) => get(k).slice(0, 255);
  const res = await fetch(MAILCHIMP, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email_address: get("email"),
      status: "subscribed",
      tags: [MAILCHIMP_TAG],
      // The audience's own fields: MMERGE7 Country Code, 8 Telephone Number, 10 Job Title, 11 Country, 12 Source.
      merge_fields: {
        FNAME: f("firstName"),
        LNAME: f("lastName"),
        COMPANY: f("company"),
        MMERGE10: f("jobTitle"),
        MMERGE11: f("country"),
        MMERGE7: get("phone") && !get("phone").startsWith("+") ? f("dialCode") : "",
        MMERGE8: f("phone"),
        MMERGE12: "FFE APAC website",
      },
    }),
  });
  if (res.ok) return json(200, { ok: true });
  const err = await res.json().catch(() => ({}));
  if (err.title !== "Member Exists") {
    console.error("Mailchimp", res.status, JSON.stringify(err));
    return json(502, { ok: false });
  }

  // Already in the audience (often from another Messe Berlin event): keep their details, (re)subscribe and tag them.
  const member = `${MAILCHIMP}/${createHash("md5").update(get("email").toLowerCase()).digest("hex")}`;
  const status = await fetch(member, { method: "PATCH", headers, body: JSON.stringify({ status: "subscribed" }) });
  // ponytail: contacts in Mailchimp's compliance state refuse this; they stay unsubscribed. Send them status "pending" (a confirmation email) if that matters.
  if (!status.ok) console.error("Mailchimp status", status.status, await status.text());
  const tag = await fetch(`${member}/tags`, { method: "POST", headers, body: JSON.stringify({ tags: [{ name: MAILCHIMP_TAG, status: "active" }] }) });
  if (!tag.ok) console.error("Mailchimp tag", tag.status, await tag.text());
  return json(tag.ok ? 200 : 502, { ok: tag.ok });
}

BunnySDK.net.http.serve(async (request) => {
  // A FormData POST is a CORS "simple request": no preflight, the browser only needs this header back.
  const origin = request.headers.get("origin") ?? "";
  const allowed = String(process.env.ALLOWED_ORIGINS).split(",").map((o) => o.trim()).includes(origin);
  const json = (status: number, body: object) =>
    Response.json(body, { status, headers: allowed ? { "Access-Control-Allow-Origin": origin, Vary: "Origin", "Cache-Control": "no-store" } : { "Cache-Control": "no-store" } });
  if (!allowed) return json(403, { ok: false });
  // A thrown error (e.g. ZeptoMail unreachable) still gets logged and a CORS-readable response.
  return contact(request, json).catch((e) => {
    console.error("contact", e);
    return json(500, { ok: false });
  });
});
