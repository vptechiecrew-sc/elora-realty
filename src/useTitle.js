import { useEffect } from 'react';

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
};

// Sets the page title and the description / Open Graph / canonical tags for each page.
export default function useTitle(title, description) {
  useEffect(() => {
    document.title = title;
    const url = window.location.origin + window.location.pathname;
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;
    setMeta('property', 'og:title', title); setMeta('property', 'og:url', url); setMeta('name', 'twitter:title', title);
    if (description) { setMeta('name', 'description', description); setMeta('property', 'og:description', description); setMeta('name', 'twitter:description', description); }
  }, [title, description]);
}
