import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Visual from './Visual.jsx';
import { enquiryLink, inr } from '../config.js';


// Wide photos fill the card. Tall or square photos are shown in full (nothing cropped) on a blurred copy of themselves.
function CardPhoto({ src, alt, focus }) {
  const ref = useRef(null);
  const [wide, setWide] = useState(false);
  const check = (im) => { if (im && im.naturalWidth) setWide(im.naturalWidth / im.naturalHeight >= 1.25); };
  useEffect(() => { if (ref.current?.complete) check(ref.current); }, [src]);
  return (
    <span className={`cp${wide ? ' cp-wide' : ''}`} style={{ '--bg': `url("${src}")` }}>
      <img ref={ref} src={src} alt={alt} loading="lazy" decoding="async" onLoad={(e) => check(e.currentTarget)} style={wide && focus ? { objectPosition: focus } : undefined} />
    </span>
  );
}

export default function PropertyCard({ p }) {
  const alt = `${p.title}, ${p.location}`;
  return (
    <article className="card">
      <Link to={`/properties/${p.id}`} className="card-media" aria-label={`View ${p.title}`}>
        {p.images?.[0] ? <CardPhoto src={p.images[0]} alt={alt} focus={p.focus} /> : <Visual type={p.type} alt={alt} />}
        <span className={`status status-${p.status.toLowerCase()}`}>{p.status}</span>
        {p.images?.length > 1 && <span className="card-photos"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 16l-5-5-8 8" /></svg>{p.images.length}</span>}
      </Link>
      <div className="card-body">
        <p className="eyebrow">{p.type} · {p.location}</p>
        <h3>{p.title}</h3>
        <p className="price">{inr(p.price)}</p>
        <p className="meta">{p.area ? `${p.area} ${p.unit}` : "Area on request"}</p>
        <div className="card-actions">
          <Link className="btn btn-red btn-sm" to={`/properties/${p.id}`}>View details</Link>
          <a className="btn btn-line btn-sm" href={enquiryLink(p.title)} target="_blank" rel="noreferrer">Enquire</a>
        </div>
      </div>
    </article>
  );
}