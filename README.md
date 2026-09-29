# Elora Realty
1. `npm install` then `npm run dev` (local) or `npm run build` (output in `dist/`).
2. Edit company details in `src/config.js` and listings in `src/data/properties.js`.
3. Netlify: connect the GitHub repo. Build `npm run build`, publish `dist` (already set in `netlify.toml`, including the routing redirect).
4. Add real photos in `public/images/` and reference them in each property's `images` array.
5. SEO: set `VITE_SITE_URL` (see `.env.example`; in Netlify: Site settings > Environment variables) to your live address. The build then writes `sitemap.xml`, adds the `Sitemap:` line to `robots.txt`, fills in the share-image URLs and adds structured data. Sample listings stay out of the sitemap; once you remove `sample` from a listing it is included automatically.
6. Share image: `public/og-image.jpg` (1200x630) is what WhatsApp, Facebook and X show when the link is shared.
7. Fonts (Inter + Plus Jakarta Sans) are bundled in the project, so there is no Google Fonts request.
