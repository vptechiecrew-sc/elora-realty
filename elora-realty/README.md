# Elora Realty
1. `npm install` then `npm run dev` (local) or `npm run build` (output in `dist/`).
2. Edit company details in `src/config.js` and listings in `src/data/properties.js`.
3. Netlify: connect the GitHub repo. Build `npm run build`, publish `dist` (already set in `netlify.toml`, including the routing redirect).
4. Add real photos in `public/images/` and reference them in each property's `images` array.
