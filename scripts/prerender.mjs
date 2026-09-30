// Runs after `vite build`: writes a ready-made HTML page (content + title/description/canonical/schema) for every route,
// so Google and WhatsApp/Facebook link previews see the real page without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';
import { properties } from '../src/data/properties.js';
import { AREA_LIST } from '../src/data/areas.js';

const site = (loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL || '').replace(/\/$/, '');
const { render } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const tpl = fs.readFileSync('dist/index.html', 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const put = (h, re, tag) => (re.test(h) ? h.replace(re, () => tag) : h.replace('</head>', () => `${tag}\n</head>`));

const routes = ['/', '/properties', ...AREA_LIST.map((a) => `/land-in-${a.slug}`), ...properties.map((p) => `/properties/${p.id}`)];
for (const url of routes) {
  const { html, seo } = render(url);
  let h = tpl;
  if (seo) {
    h = put(h, /<title>.*?<\/title>/s, `<title>${esc(seo.title)}</title>`);
    if (seo.description) {
      h = put(h, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(seo.description)}" />`);
      h = put(h, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(seo.description)}" />`);
      h = put(h, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`);
    }
    h = put(h, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(seo.title)}" />`);
    h = put(h, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`);
    h = put(h, /<meta name="robots"[^>]*>/, `<meta name="robots" content="${seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`);
    if (site) {
      const full = site + (url === '/' ? '/' : url);
      h = put(h, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${full}" />`);
      h = put(h, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${full}" />`);
    }
    if (seo.ld) h = h.replace('</head>', () => `<script type="application/ld+json" id="page-ld">${JSON.stringify(seo.ld).replace(/</g, '\\u003c')}</script>\n</head>`);
  }
  h = h.replace('<div id="root"></div>', () => `<div id="root" data-path="${url}">${html}</div>`);
  const out = url === '/' ? 'dist/index.html' : path.join('dist', url, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, h);
}
fs.rmSync('dist-server', { recursive: true, force: true });
console.log(`prerendered ${routes.length} pages${site ? '' : ' (VITE_SITE_URL not set: canonical/sitemap skipped)'}`);
