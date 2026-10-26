# Fresh Food Expo Asia Pacific

- **Production:** https://www.freshfoodexpoapac.com, WordPress + Elementor, built by `scripts/elementor/`.
- **Staging:** the Next.js app in `src/`, deployed with `npm run deploy:preview` to https://sites-ffe-preview-yc7f5d.b-cdn.net.

Changes go to staging first, then are ported to production. See `CLAUDE.md` for the workflow, servers and safety rules,
and `bunny/README.md` for hosting, DNS and the staging form script.

```bash
npm run dev             # staging app on http://localhost:3000
npm run deploy:preview  # publish staging
node scripts/elementor/page.js <page> --dry   # validate a production page module without writing
```
