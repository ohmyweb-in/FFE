@AGENTS.md

## WordPress (live since 26 Oct 2026)

www.freshfoodexpoapac.com runs on WordPress + Elementor, built by `scripts/elementor/` (Fruit Logistica playbook). The Next.js app in `src/` is retired: it no longer deploys anywhere, so edit the site in WordPress (or the Elementor scripts), not here. Bunny zone `sites-ffe-yla75m` pulls from the server (origin https://ffe-staging.ohmyweb.in with the www Host header forwarded); the staging hostname redirects visitors to www.

- **People edit pages in Elementor now** (Ruben Tan, Editor). The push scripts (`page.js`, `home.js`, `header.js`, `footer.js`) call `guard()` and refuse a page changed in WordPress since the last push: copy that edit into the scripts first, then rerun with `FFE_FORCE=1`. `stamp()` names elements for the Structure panel (`names.php`) and saves a revision after each push.
- **Novamira:** always pass `--site ffe`. Never use another profile from this repo; `flci-prod` is Fruit Logistica's live site.
- **Server:** shared with Fruit Logistica (`ssh flci-prod`). FFE is isolated: Linux user `ffe`, `/var/www/freshfoodexpoapac`, database `ffe_prod`, Redis db 1 with prefix `ffe_prod`, and OpenLiteSpeed vhost `ffe`. Never touch the `fruitlogisticaindia` folder, the `flci_prod` database or the `flci` vhost.
