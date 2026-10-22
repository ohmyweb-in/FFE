@AGENTS.md

## WordPress rebuild (staging)

The site is being rebuilt in WordPress + Elementor at https://ffe-staging.ohmyweb.in, following the Fruit Logistica playbook. This Next.js build stays the source of truth for copy and layout until launch.

- **Novamira:** always pass `--site ffe-staging`. Never use another profile from this repo; `flci-prod` is Fruit Logistica's live site.
- **Server:** shared with Fruit Logistica (`ssh flci-prod`). FFE is isolated: Linux user `ffe`, `/var/www/freshfoodexpoapac`, database `ffe_prod`, Redis db 1 with prefix `ffe_prod`, and OpenLiteSpeed vhost `ffe`. Never touch the `fruitlogisticaindia` folder, the `flci_prod` database or the `flci` vhost.
