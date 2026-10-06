import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { properties } from './src/data/properties.js';
import { AREA_LIST } from './src/data/areas.js';
import { COMPANY } from './src/config.js';

// Adds the site URL to meta tags, and generates robots.txt + sitemap.xml + structured data at build time.
// Set VITE_SITE_URL (e.g. https://elorarealty.in) in Netlify > Site settings > Environment variables.
const seo = (site) => ({
  name: 'elora-seo',
  transformIndexHtml(html) {
    const ld = site ? `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'RealEstateAgent', '@id': `${site}/#business`, name: 'Elora Realty', url: site, telephone: COMPANY.phone, email: COMPANY.email,
          logo: `${site}/logo-mark.png`, image: `${site}/og-image.jpg`, foundingDate: '2026', priceRange: '\u20b9\u20b9',
          description: 'Land and property in Nagercoil and Chennai: residential plots, agricultural land, houses, apartments and commercial properties.',
          areaServed: [{ '@type': 'City', name: 'Nagercoil' }, { '@type': 'City', name: 'Chennai' }],
          address: { '@type': 'PostalAddress', streetAddress: 'Second Floor, City Center, Kottar-Parvathipuram Rd, opp. Indian Oil', addressLocality: 'Nagercoil', addressRegion: 'Tamil Nadu', postalCode: '629001', addressCountry: 'IN' } },
        { '@type': 'WebSite', '@id': `${site}/#website`, url: site, name: 'Elora Realty', inLanguage: 'en-IN', publisher: { '@id': `${site}/#business` } },
      ],
    })}</script>` : '';
    // No domain set yet (VITE_SITE_URL empty): keep every page out of Google until the real domain is configured.
    if (!site) html = html.replace('content="index,follow,max-image-preview:large"', 'content="noindex,nofollow"');
    return html.replaceAll('__SITE__', site).replace('</head>', `${ld}</head>`);
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}` });
    if (!site) return;
    // sample listings are left out until they are replaced by real ones
    const paths = ['/', '/properties', ...AREA_LIST.map((a) => `/land-in-${a.slug}`), ...properties.filter((p) => !p.sample).map((p) => `/properties/${p.id}`)];
    const day = new Date().toISOString().slice(0, 10);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((u) => `  <url><loc>${site}${u}</loc><lastmod>${day}</lastmod></url>`).join('\n')}\n</urlset>\n`;
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
  },
});

export default defineConfig(({ mode, isSsrBuild }) => {
  const site = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || '').replace(/\/$/, '');
  return { plugins: [react(), ...(isSsrBuild ? [] : [seo(site)])], build: { copyPublicDir: !isSsrBuild } };
});
