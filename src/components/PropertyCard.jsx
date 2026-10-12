import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Visual from './Visual.jsx';
import { enquiryLink, priceText, hasLoan } from '../config.js';

const FIRST_MS = 5000; // first photo
const NEXT_MS = 4000;  // every other photo

// Wide photos fill the card. Tall or square photos are shown in full (nothing cropped) on the card colour.
function CardPhoto({ src, alt, focus, layer = '' }) {
  const ref = useRef(null);
  const [wide, setWide] = useState(false);
  const check = (im) => { if (im && im.naturalWidth) setWide(im.naturalWidth / im.naturalHeight >= 1.25); };
  useEffect(() => { if (ref.current?.complete) check(ref.current); }, [src]);
  return (
    <span className={`cp${wide ? ' cp-wide' : ''}${layer ? ` ${layer}` : ''}`} style={{ '--bg': `url("${src}")` }}>
      <img ref={ref} src={src} alt={alt} loading="lazy" decoding="async" onLoad={(e) => check(e.currentTarget)} style={wide && focus ? { objectPosition: focus } : undefined} />
    </span>
  );
}

// 2+ photos: they fade into each other by themselves, with a thin progress bar. One photo: plain.
function CardSlides({ images, alt, focus }) {
  const n = images.length;
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lag, setLag] = useState(0); // small random delay so neighbouring cards don't change in sync
  const [cycle, setCycle] = useState(0);
  const playing = n > 1 && visible && !hidden;
  const dur = active === 0 ? FIRST_MS + lag : NEXT_MS;

  useEffect(() => {
    setLag(Math.round(Math.random() * 1200));
    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);
    let io;
    if ('IntersectionObserver' in window && root.current) {
      io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
      io.observe(root.current);
    } else setVisible(true);
    return () => { document.removeEventListener('visibilitychange', vis); io && io.disconnect(); };
  }, []);
  useEffect(() => { if (playing) setCycle((c) => c + 1); }, [playing]);
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), dur);
    return () => clearTimeout(t);
  }, [playing, active, cycle, dur, n]);

  return (
    <span ref={root} style={{ position: 'absolute', inset: 0, display: 'block' }}>
      {images.map((src, i) => (
        <CardPhoto key={src + i} src={src} alt={i === 0 ? alt : ''} focus={focus} layer={n > 1 ? `cp-layer${i === active ? ' on' : ''}` : ''} />
      ))}
    </span>
  );
}

export default function PropertyCard({ p }) {
  const alt = `${p.title}, ${p.location}`;
  const imgs = (p.images || []).slice(0, 6);
  return (
    <article className="card">
      <Link to={`/properties/${p.id}`} className={`card-media${imgs.length > 1 ? ' multi' : ''}`} aria-label={`View ${p.title}`}>
        {imgs.length ? <CardSlides images={imgs} alt={alt} focus={p.focus} /> : <Visual type={p.type} alt={alt} />}
        <span className={`status status-${p.status.toLowerCase()}`}>{p.status}</span>
        {imgs.length > 1 && <span className="card-photos"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 16l-5-5-8 8" /></svg>{p.images.length}</span>}
      </Link>
      <div className="card-body">
        <p className="eyebrow">{p.type} · {p.place || p.location}</p>
        <h3>{p.title}</h3>
        <p className="price">{priceText(p)}</p>
        <p className="meta area">{p.area ? `${p.area} ${p.unit}` : "Area on request"}</p>
        {hasLoan(p) && <p className="loan"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>Bank loan available</p>}
        <div className="card-actions">
          <Link className="btn btn-red btn-sm" to={`/properties/${p.id}`}>View details</Link>
          <a className="btn btn-line btn-sm" href={enquiryLink(p.title)} target="_blank" rel="noreferrer">Enquire</a>
        </div>
      </div>
    </article>
  );
}
