import { useEffect } from 'react';

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
};
const ROBOTS = 'index,follow,max-image-preview:large';

// Sets the page title, description, Open Graph, canonical, robots and per-page structured data (opts.ld).
// opts.noindex keeps a page out of Google (used for sample listings and "not found").
// During the build's prerender step there is no document; the values are collected instead (see scripts/prerender.mjs).
export default function useTitle(title, description, opts = {}) {
  if (typeof document === 'undefined') { if (title) globalThis.__SEO__ = { title, description, ...opts }; return; }
  const ld = opts.ld ? JSON.stringify(opts.ld) : '';
  useEffect(() => {
    if (!title) return;
    document.title = title;
    const base = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const url = base + (window.location.pathname.replace(/\/$/, '') || '/');
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;
    setMeta('property', 'og:title', title); setMeta('property', 'og:url', url); setMeta('name', 'twitter:title', title);
    setMeta('name', 'robots', opts.noindex ? 'noindex,follow' : ROBOTS);
    if (description) { setMeta('name', 'description', description); setMeta('property', 'og:description', description); setMeta('name', 'twitter:description', description); }
    let s = document.getElementById('page-ld');
    if (ld) { if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'page-ld'; document.head.appendChild(s); } s.textContent = ld; }
    else s?.remove();
  }, [title, description, ld, opts.noindex]);
}
