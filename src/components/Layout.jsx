import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY, generalLink, TEL, MAIL, MAP } from '../config.js';
import { AREA_LIST } from '../data/areas.js';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Elora Realty home">
      <img src="/logo-mark.png" width="40" height="40" alt="" />
      <span>ELORA<b>REALTY</b></span>
    </Link>
  );
}

// About / Services / Contact scroll to their sections on the home page (see App.jsx + the ids in Sections.jsx).
const links = [['/', 'Home'], ['/properties', 'Properties'], ['/#about', 'About Us'], ['/#services', 'Services'], ['/#contact', 'Contact']];

function isActive(to, pathname, hash) {
  if (to.startsWith('/#')) return pathname === '/' && hash === to.slice(1);
  if (to === '/') return pathname === '/' && !hash;
  return pathname.startsWith(to);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const ref = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 8);
        bar.current?.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [pathname]);

  // close the mobile menu on navigation, Escape, or a tap outside it
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', away); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} ref={ref}>
      <div className="wrap nav-in">
        <Logo />
        <nav id="main-nav" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {links.map(([to, label]) => <Link key={to} to={to} className={isActive(to, pathname, hash) ? 'active' : ''} aria-current={isActive(to, pathname, hash) ? 'page' : undefined}>{label}</Link>)}
          <a className="btn btn-red btn-sm nav-cta" href={generalLink} target="_blank" rel="noreferrer">Enquire now</a>
        </nav>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span /><span /><span /></button>
      </div>
      <div className="progress" ref={bar} aria-hidden="true" />
    </header>
  );
}

const Wa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.7 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.300 1.800.6 2.800.7a2 2 0 0 1 1.700 2z"/></svg>
);

// WhatsApp pill on desktop; WhatsApp + Call bar pinned to the bottom on phones. Appears after a little scrolling.
export function QuickActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 260);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`quick ${show ? 'show' : ''}`}>
      <a className="quick-wa" href={generalLink} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><Wa /><span>WhatsApp</span></a>
      <a className="quick-call" href={TEL} aria-label="Call us"><Phone /><span>Call</span></a>
    </div>
  );
}

const Mail = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
const Pin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Logo />
          <p>Land, property and construction enquiries in Nagercoil and Chennai. Serving families and investors since 2026.</p>
          <a className="btn btn-red btn-sm" href={generalLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </div>
        <nav className="foot-col" aria-label="Footer"><h4>Explore</h4>{links.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</nav>
        <div className="foot-col"><h4>Areas</h4>{AREA_LIST.map((a) => <Link key={a.slug} to={`/land-in-${a.slug}`}>Land in {a.name}</Link>)}</div>
        <div className="foot-col foot-contact"><h4>Contact</h4>
          <a className="fc" href={TEL}><Phone /><span>{COMPANY.phone}</span></a>
          <a className="fc" href={MAIL}><Mail /><span>{COMPANY.email}</span></a>
          <a className="fc" href={MAP} target="_blank" rel="noreferrer"><Pin /><span>{COMPANY.address}</span></a>
        </div>
      </div>
      <div className="wrap foot-base"><span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span><span>Since 2026 · Nagercoil | Chennai</span></div>
    </footer>
  );
}
