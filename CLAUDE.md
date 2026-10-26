@AGENTS.md

## Which site is which (since 26 Oct 2026)

| Role | What | Where | How it changes |
|---|---|---|---|
| **Production** | WordPress + Elementor 4 | https://www.freshfoodexpoapac.com | Elementor editor (Ruben Tan, Editor role) or the push scripts in `scripts/elementor/` |
| **Staging** | The Next.js app in `src/` (static export) | https://sites-ffe-preview-yc7f5d.b-cdn.net (Bunny Site `ffe-preview`, noindex) | `npm run deploy:preview` |

- A change is built and shown to the client on **staging (Next.js)** first, then ported to **production (WordPress)**. The port goes through the matching `scripts/elementor/` module (pages/<page>/…, home/…, header.js, footer.js), not by hand in wp-admin, so the scripts stay the record.
- **`ffe-staging.ohmyweb.in` is NOT staging.** It is production's origin hostname: Bunny zone `sites-ffe-yla75m` (6764453) pulls from it and forwards `Host: www.freshfoodexpoapac.com`; visitors who land on it are 301'd to www. wp-admin, REST and Novamira still answer on it.
- Staging forms post to the Bunny Edge Script `ffe-contact` (`bunny/contact-form.ts`), which sends **real email** to the team inboxes and adds people to Mailchimp. Mark any staging test as a test.
- Staging is behind `main` as of 26 Oct (no /gallery yet): run `npm run deploy:preview` before showing it to anyone.
- Production has things staging doesn't: cookie banner + GA4 after consent (`ffe-consent.php`), launch popup after 6 s (staging: 800 ms), the album lightbox's "Download full resolution" button, form entries stored under Elementor > Submissions.
- A colleague (GitHub VaishG18) also commits to `main`. `git pull --rebase` before you start, and port her Next.js changes to production.

## Production (WordPress)

- **Editors change pages in Elementor.** The push scripts (`page.js`, `home.js`, `header.js`, `footer.js`) call `guard()` and refuse a page changed in WordPress since the last push: copy that edit into the scripts first, then rerun with `FFE_FORCE=1`. `stamp()` names every element for Elementor's Structure panel (`names.php`) and saves a revision after each push. `node scripts/elementor/page.js <page> --dry` validates without writing.
- **Novamira:** always pass `--site ffe` (www). Never use another profile from this repo; `flci-prod` is Fruit Logistica's live site.
- **Server:** shared with Fruit Logistica (`ssh flci-prod`). FFE is isolated: Linux user `ffe`, `/var/www/freshfoodexpoapac`, database `ffe_prod` (prefix `ffe_`), Redis db 1 with prefix `ffe_prod`, and OpenLiteSpeed vhost `ffe`. Never touch the `fruitlogisticaindia` folder, the `flci_prod` database or the `flci` vhost. **Fruit Logistica must stay untouched.**
- WP-CLI for FFE must skip FL's server-wide Wordfence prepend: `sudo -u ffe /usr/local/lsws/lsphp83/bin/php -d auto_prepend_file= /usr/local/bin/wp --path=/var/www/freshfoodexpoapac/public_html …`. mu-plugins (`scripts/elementor/*.php`, the repo copy is the record) deploy with scp + `sudo install -o ffe -g ffe -m 644` into `wp-content/mu-plugins/`; then `sudo pkill -u ffe -f lsphp` (FFE workers only) and `wp litespeed-purge all`.
- Visitors see a change within ~5 min (Bunny caches pages 300 s; LiteSpeed purges on save). Add `?nc=<anything>` to check past the edge cache.
- Secrets live in wp-config constants (ZeptoMail, Turnstile, Mailchimp), never in the repo.
- Big binaries stay out of git: client originals and the gallery download files are in `scripts/elementor/.tmp/` (ignored); the downloads are served from `wp-content/uploads/2026/10/downloads/`.
