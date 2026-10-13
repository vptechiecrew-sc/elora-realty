import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import Visual from '../components/Visual.jsx';
import { properties } from '../data/properties.js';
import { enquiryLink, priceText, hasLoan, areaText, TEL } from '../config.js';
import useTitle from '../useTitle.js';

const FIRST_MS = 6000; // first photo
const NEXT_MS = 4000;  // every other photo

export default function PropertyDetails() {
  const p = properties.find((x) => x.id === useParams().id);
  const imgs = (p?.images || []).slice(0, 10);
  const count = imgs.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const track = useRef(null);
  const animUntil = useRef(0);
  const [stopped, setStopped] = useState(false); // visitor took over (touched, swiped, used arrows): autoplay stays off
  const [hidden, setHidden] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [cycle, setCycle] = useState(0);
  const playing = count > 1 && !stopped && !open && !hidden && !reduce;
  const dur = active === 0 ? FIRST_MS : NEXT_MS;
  const slideTo = (i, user = false) => {
    const el = track.current; if (!el) return;
    const n = (i + count) % count;
    animUntil.current = Date.now() + 1000; // ignore scroll events caused by our own slide
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
    setActive(n);
    if (user) setStopped(true);
  };
  const onScroll = () => {
    const el = track.current;
    if (!el || !el.clientWidth || Date.now() < animUntil.current) return;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== active) { setActive(n); setStopped(true); } // visitor swiped
  };
  // auto-advance: first photo 6 s, the rest 4 s
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => slideTo(active + 1), dur);
    return () => clearTimeout(t);
  }, [playing, active, cycle, dur]);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);
  // after closing the full-screen viewer, put the gallery on the photo that was last viewed
  useEffect(() => {
    if (open) return;
    const el = track.current; if (!el || !el.clientWidth) return;
    animUntil.current = Date.now() + 300;
    el.scrollTo({ left: active * el.clientWidth, behavior: 'auto' });
  }, [open]);
  // full-screen viewer: Esc closes, arrows browse, page behind stays still
  useEffect(() => {
    if (!open) return undefined;
    const key = (e) => { if (e.key === 'Escape') setOpen(false); if (e.key === 'ArrowRight') setActive((a) => (a + 1) % count); if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + count) % count); };
    window.addEventListener('keydown', key);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [open, count]);
  useTitle(p ? `${p.title}, ${p.location} | Elora Realty` : 'Property not found | Elora Realty', p ? `${p.title} in ${p.location}. ${areaText(p) ? `${areaText(p)}, ` : ""}${priceText(p)}.${hasLoan(p) ? ' Bank loan available.' : ''} Enquire with Elora Realty on WhatsApp.` : undefined,
    p ? { noindex: !!p.sample, ld: { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: p.title, description: p.description, url: `${import.meta.env.VITE_SITE_URL || ''}/properties/${p.id}`,
      ...(p.images?.[0] ? { image: `${import.meta.env.VITE_SITE_URL || ''}${p.images[0]}` } : {}), ...(p.price ? { offers: { '@type': 'Offer', price: p.price, priceCurrency: 'INR' } } : {}) } } : { noindex: true });
  if (!p) return <div className="wrap page-top section"><h1>Property not found</h1><Link className="btn btn-red" to="/properties">Back to properties</Link></div>;
  return (
    <section className="section page-top"><div className="wrap">
      <Link to="/properties" className="link">← All properties</Link>
      <div className="pd" style={{ '--ar': 4 / 3 }}>
        <div className="pd-gal">
          <div className="pd-frame"
            onPointerDown={(e) => { if (e.pointerType !== 'mouse') setStopped(true); }}>
            {count ? (
              <>
                <div className="pd-track" ref={track} onScroll={onScroll}>
                  {imgs.map((src, i) => (
                    <button key={src + i} type="button" className="pd-slide" style={{ '--bg': `url("${src}")` }} onClick={() => { setActive(i); setOpen(true); }} aria-label="View photo full screen">
                      <img src={src} alt={`${p.title} view ${i + 1}`} decoding="async" loading={i === 0 ? 'eager' : 'lazy'} />
                    </button>
                  ))}
                </div>
                <span className={`status status-${p.status.toLowerCase()}`}>{p.status}</span>
                {count > 1 && <span className="pd-count">{active + 1} / {count}</span>}
                <button type="button" className="pd-full" onClick={() => setOpen(true)} aria-label="View full screen"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg><span>Full screen</span></button>
                {count > 1 && <>
                  <button type="button" className="pd-arrow prev" onClick={() => slideTo(active - 1, true)} aria-label="Previous photo">‹</button>
                  <button type="button" className="pd-arrow next" onClick={() => slideTo(active + 1, true)} aria-label="Next photo">›</button>
                </>}
              </>
            ) : <Visual type={p.type} alt={p.title} />}
          </div>
          {count > 1 && (
            <div className="pd-thumbs">
              {imgs.map((src, i) => <button key={src + i} type="button" className={i === active ? 'on' : ''} onClick={() => slideTo(i, true)} aria-label={`Show photo ${i + 1}`}><img src={src} alt="" loading="lazy" /></button>)}
            </div>
          )}
        </div>
        <div className="pd-info">
          <p className="eyebrow">{p.type} · {p.place || p.location}</p><h1 className="h2">{p.title}</h1>
          <p className="price big">{priceText(p)}</p>
          {hasLoan(p) && <p className="loan big"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>Bank loan available</p>}
          <dl className="pd-facts">
            <div><dt>Area</dt><dd>{areaText(p) || "On request"}</dd></div>
            <div><dt>Category</dt><dd>{p.type}</dd></div>
            <div><dt>Location</dt><dd>{p.place ? `${p.place}, ` : ''}{p.location}, Tamil Nadu</dd></div>
            {hasLoan(p) && <div><dt>Finance</dt><dd>Bank loan available</dd></div>}
            <div><dt>Status</dt><dd>{p.status}</dd></div>
          </dl>
          <div className="pd-cta">
            <a className="btn btn-red" href={enquiryLink(p.title)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
            <a className="btn btn-line" href={TEL}>Call us</a>
          </div>
          <h3>About this property</h3>
          <p>{p.description}</p>
          {p.features.length > 0 && <h3>Features</h3>}<ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      </div>
      {open && count > 0 && createPortal(
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(false)}>
          <button type="button" className="lb-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
          <img src={imgs[active]} alt={`${p.title} view ${active + 1}`} onClick={(e) => e.stopPropagation()} />
          {count > 1 && <>
            <button type="button" className="lb-arrow prev" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + count) % count); }} aria-label="Previous photo">‹</button>
            <button type="button" className="lb-arrow next" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % count); }} aria-label="Next photo">›</button>
            <span className="lb-count">{active + 1} / {count}</span>
          </>}
        </div>,
        document.body
      )}
    </div></section>
  );
} 