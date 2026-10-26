# Hosting: Bunny CDN

Everything is served by Bunny so visitors in China get the same CDN path as everyone else. Since 26 Oct 2026 production is
WordPress and the Next.js app is staging (see CLAUDE.md).

| Piece | Bunny resource | URL |
|---|---|---|
| Production (WordPress) | Pull zone `sites-ffe-yla75m` (6764453, SG), converted from a Bunny Site: origin https://ffe-staging.ohmyweb.in with `Host: www…` forwarded, pages cached 300 s, wp-admin/login/json/cron/xmlrpc and logged-in cookies bypassed, wp-content/wp-includes 30 d. Rollback copy of the old Site config: zone-ffe-before.json (OriginType 2, storage 1977351) | https://www.freshfoodexpoapac.com |
| Staging (Next.js) | Site `ffe-preview` (storage 1977353, pull zone 6764456, SG), noindex | https://sites-ffe-preview-yc7f5d.b-cdn.net |
| Staging forms → email | Edge Script `ffe-contact` (95863, standalone). Production forms don't use it (they post to WordPress, `ffe-forms.php`) | https://ffe-contact.bunny.run |
| DNS | biz-era (pridns/secdns.biz-era.net), helpdesk@biz-era.net. Their HQ keeps DNS in-house, so no nameserver change | `www` CNAME → sites-ffe-yla75m.b-cdn.net; bare domain `@` A → 89.106.200.1 (redirect.pizza free plan, 301 → https://www. with path + query; their DNS has no ALIAS and Bunny has no fixed IP); ZeptoMail DKIM TXT + `bounce-zem` CNAME for freshfoodexpoapac.com. Mail (MX/SPF) is Microsoft 365. Don't touch it. |

## Deploying staging

Needs `BUNNYNET_API_KEY` in the environment (or `npx @bunny.net/cli login` once).

```bash
npm run deploy:preview      # build + publish the Next.js site to staging (adds a Disallow robots.txt)
npx -y @bunny.net/cli@0.20.2 sites deployments publish --previous --site ffe-preview   # instant rollback
```

Never deploy the Next.js build to the `ffe` site: that zone is production WordPress now.

Form script: `npx -y @bunny.net/cli@0.20.2 scripts deploy bunny/contact-form.ts 95863`.
Its env (Bunny dashboard → Edge Scripting → ffe-contact → Env):
`ZEPTOMAIL_TOKEN` (secret, ZeptoMail Send Mail token), `TURNSTILE_SECRET` (secret, Cloudflare Turnstile secret key),
`MAILCHIMP_API_KEY` (secret, Mailchimp API key, us11), `MAIL_FROM` (`noreply@freshfoodexpoapac.com`), `ALLOWED_ORIGINS` (sites allowed to post).

Where each form's email goes (the `TEAMS` table in the script):

| Form | Inbox |
|---|---|
| Apply to Exhibit | exhibitor@ |
| Register to Visit | visitor@ |
| Subscribe, About page community form | No email: added to Mailchimp (audience "Messe Berlin Asia Pacific", tag `FFE APAC`, Source "FFE APAC website"). Someone already in the audience keeps their details and is resubscribed and tagged. |
| Contact Us | by the visitor's "Enquiry Type": General → marketing@, Exhibiting & Sponsorship → exhibitor@, Visitor Registration → visitor@, Conference → conference@, Buyers → buyer@, Media Partnership → media@ |

Contact Us, Apply to Exhibit and Register to Visit are also added to Mailchimp (same audience and tag) when the
marketing consent box is ticked, with Source "FFE APAC website – Contact Us" / "– Apply to Exhibit" / "– Register to Visit".
The email still goes out if Mailchimp fails; the failure is only in the script's logs.

Turnstile: the widget (Cloudflare dashboard → Turnstile) must list every hostname that shows the forms
(www.freshfoodexpoapac.com, the preview host, localhost). Its site key goes in `SITE_KEY` in
`src/components/FormSend.tsx`, its secret in `TURNSTILE_SECRET`. Cloudflare's test keys (site key
`1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`) always pass.

## Search engines

The staging pull zone adds `X-Robots-Tag: noindex, nofollow` to every response and staging serves `robots.txt` with
`Disallow: /`. Production's indexing is WordPress's (Rank Math sitemap, blog_public on).

## Known risks

- **Form spam.** The origin allowlist only stops other websites' browsers; scripts can fake the
  header. Mitigated by Cloudflare Turnstile (checked server-side), the honeypot, field validation,
  and a per-IP request limit on the `ffe-contact` pull zone (1/s, burst 5). If spam still arrives,
  add a Bunny Shield rate-limit rule.
- **Turnstile from China** works (Globalping, 10 CN ISPs, 26 Oct 2026).
- **`ffe-contact.bunny.run` from China** is untested. If it's blocked, add a custom hostname
  (e.g. `forms.freshfoodexpoapac.com`) to the script's pull zone and update `ENDPOINT`.
- **Bunny Sites is a preview CLI feature.** The CLI is pinned (0.20.2; 0.19.0 stopped finding the sites on 22 Oct 2026); underneath it's an ordinary
  storage zone + pull zone, manageable from the dashboard if the CLI changes.
