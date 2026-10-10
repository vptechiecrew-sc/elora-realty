import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { Navbar, Footer, QuickActions } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import Area from './pages/Area.jsx';
import { AREA_LIST } from './data/areas.js';
import useTitle from './useTitle.js';
import useSmoothScroll from './useSmoothScroll.js';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
function NotFound() {
  useTitle('Page not found | Elora Realty', undefined, { noindex: true });
  return <div className="wrap page-head"><h1>Page not found</h1><Link className="btn btn-red" to="/">Back to home</Link></div>;
}

const REVEAL = '.strip, .section-head, .card, .split > *, .services, .why > div, .contact > *, .band-in, .page-top .wrap > .h2, .page-lead, .detail > *, .gallery';

export default function App() {
  const { pathname, hash, key } = useLocation();
  useSmoothScroll();
  // Go to the top of a new page, or smoothly scroll to a #section (About / Services / Contact).
  useEffect(() => {
    const lenis = window.__lenis;
    if (!hash) { lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0); return; }
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1)); if (!el) return;
      lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, hash, key]);
  // Gentle fade-up as sections scroll into view (skipped automatically if the browser can't observe).
  useIsoLayoutEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = [...document.querySelectorAll(REVEAL)];
    els.forEach((el) => {
      const i = [...el.parentElement.children].filter((c) => c.matches(REVEAL)).indexOf(el);
      el.style.setProperty('--d', `${Math.min(i, 5) * 80}ms`);
      el.classList.add('reveal');
    });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          {AREA_LIST.map((a) => <Route key={a.slug} path={`/land-in-${a.slug}`} element={<Area slug={a.slug} />} />)}
          {/* Old separate pages now point to the matching section on the home page */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}