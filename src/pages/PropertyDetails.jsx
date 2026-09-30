import { Link, useParams } from 'react-router-dom';
import Visual from '../components/Visual.jsx';
import { properties } from '../data/properties.js';
import { enquiryLink, inr, TEL } from '../config.js';
import useTitle from '../useTitle.js';

export default function PropertyDetails() {
  const p = properties.find((x) => x.id === useParams().id);
  useTitle(p ? `${p.title}, ${p.location} | Elora Realty` : 'Property not found | Elora Realty', p ? `${p.title} in ${p.location}. ${p.area ? `${p.area} ${p.unit}, ` : ""}${inr(p.price)}. Enquire with Elora Realty on WhatsApp.` : undefined,
    p ? { noindex: !!p.sample, ld: { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: p.title, description: p.description, url: `${import.meta.env.VITE_SITE_URL || ''}/properties/${p.id}`,
      ...(p.images?.[0] ? { image: `${import.meta.env.VITE_SITE_URL || ''}${p.images[0]}` } : {}), offers: { '@type': 'Offer', price: p.price, priceCurrency: 'INR' } } } : { noindex: true });
  if (!p) return <div className="wrap page-top section"><h1>Property not found</h1><Link className="btn btn-red" to="/properties">Back to properties</Link></div>;
  // real photos: show only the photos we have (1-3); otherwise three illustrated placeholders
  const shots = p.images?.length ? [...p.images.keys()].slice(0, 3) : [0, 1, 2];
  return (
    <section className="section page-top"><div className="wrap">
      <Link to="/properties" className="link">← All properties</Link>
      <div className={`gallery gallery-${shots.length}`}>
        {shots.map((i) => <div key={i} className={i === 0 ? 'g-main' : ''}><Visual type={p.type} src={p.images?.[i]} focus={p.focus} alt={`${p.title} view ${i + 1}`} variant={i} /></div>)}
      </div>
      <div className="detail">
        <div>
          <p className="eyebrow">{p.type} · {p.location}</p><h1 className="h2">{p.title}</h1>
          <p>{p.description}</p>
          <h3>Features</h3><ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <aside className="side">
          <p className="price big">{inr(p.price)}</p>
          <dl><dt>Area</dt><dd>{p.area ? `${p.area} ${p.unit}` : "On request"}</dd><dt>Category</dt><dd>{p.type}</dd><dt>Location</dt><dd>{p.location}, Tamil Nadu</dd><dt>Status</dt><dd>{p.status}</dd></dl>
          <a className="btn btn-red btn-block" href={enquiryLink(p.title)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
          <a className="btn btn-line btn-block" href={TEL}>Call us</a>
        </aside>
      </div>
    </div></section>
  );
}
