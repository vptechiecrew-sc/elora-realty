# Elora Realty
1. `npm install` then `npm run dev` (local) or `npm run build` (output in `dist/`).
2. Edit company details in `src/config.js`. **Listings come from a Google Sheet**: follow `docs/GOOGLE-SHEET-SETUP.md` (add a row, click Website > Publish changes). Until `SHEET_CSV_URL` is set, the sample listings in `src/data/properties.js` are shown.
3. Netlify: connect the GitHub repo. Build `npm run build`, publish `dist` (already set in `netlify.toml`, including the routing redirect).
4. Add real photos in `public/images/` and reference them in each property's `images` array.
5. SEO (see also the checklist below): set `VITE_SITE_URL` (see `.env.example`; in Netlify: Site settings > Environment variables) to your live address. The build then writes `sitemap.xml`, adds the `Sitemap:` line to `robots.txt`, fills in the share-image URLs and adds structured data. Sample listings stay out of the sitemap; once you remove `sample` from a listing it is included automatically.
6. Share image: `public/og-image.jpg` (1200x630) is what WhatsApp, Facebook and X show when the link is shared.
7. Fonts (Inter + Plus Jakarta Sans) are bundled in the project, so there is no Google Fonts request.
8. The build (`npm run build`) also pre-renders every page to plain HTML (`scripts/prerender.mjs`), so Google and WhatsApp previews see real content and per-page titles/descriptions. City page lives at `/land-in-nagercoil` (text in `src/data/areas.js`).

## SEO checklist after hosting
- Set `VITE_SITE_URL` to the live domain, redeploy, then open `/sitemap.xml` and `/robots.txt` to check them.
- Google Search Console: add the domain, submit `sitemap.xml`, and use "Request indexing" on the home and city pages.
- Google Business Profile (free): create/verify the Nagercoil office listing with the same name, phone and address as the site. This is the biggest lever for "near me" searches.
- Replace placeholder phone, email and address in `src/config.js`, and remove `sample` from real listings (sample pages are set to noindex and stay out of the sitemap).
- Add real photos and descriptions to each listing, and keep adding listings: fresh, specific content is what ranks.

## Adding Chennai listings later
- Chennai and Nagercoil listings live in the same list in `src/data/properties.js`. Just set `location: 'Chennai'` (or 'Nagercoil') on each property.
- When the first real Chennai listing goes up, add a `chennai` entry in `src/data/areas.js` (copy the Nagercoil block). Its `/land-in-chennai` page, sitemap entry and footer link appear automatically.
- A location filter on the Properties page can be added later once there are enough listings.
