import { Link, useParams } from 'react-router-dom';
import Visual from '../components/Visual.jsx';
import { properties } from '../data/properties.js';
import { enquiryLink, inr, COMPANY } from '../config.js';
import useTitle from '../useTitle.js';

export default function PropertyDetails() {
  const p = properties.find((x) => x.id === useParams().id);
  useTitle(p ? `${p.title}, ${p.location} | Elora Realty` : 'Property not found | Elora Realty', p ? `${p.title} in ${p.location}, Kanyakumari. ${p.area} ${p.unit}, ${inr(p.price)}. Enquire with Elora Realty on WhatsApp.` : undefined);
  if (!p) return <div className="wrap page-top section"><h1>Property not found</h1><Link className="btn btn-red" to="/properties">Back to properties</Link></div>;
  const tel = COMPANY.phone.replace(/[^+\d]/g, '');
  return (
    <section className="section page-top"><div className="wrap">
      <Link to="/properties" className="link">← All properties</Link>
      <div className="gallery">
        {[0, 1, 2].map((i) => <div key={i} className={i === 0 ? 'g-main' : ''}><Visual type={p.type} src={p.images?.[i]} alt={`${p.title} view ${i + 1}`} variant={i} /></div>)}
      </div>
      <div className="detail">
        <div>
          <p className="eyebrow">{p.type} · {p.location}</p><h1 className="h2">{p.title}</h1>
          {p.sample && <p className="todo">Sample listing for design demonstration only.</p>}
          <p>{p.description}</p>
          <h3>Features</h3><ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <aside className="side">
          <p className="price big">{inr(p.price)}</p>
          <dl><dt>Area</dt><dd>{p.area} {p.unit}</dd><dt>Category</dt><dd>{p.type}</dd><dt>Location</dt><dd>{p.location}, Kanyakumari district</dd><dt>Status</dt><dd>{p.status}</dd></dl>
          <a className="btn btn-red btn-block" href={enquiryLink(p.title)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
          <a className="btn btn-line btn-block" href={`tel:${tel}`}>Call us</a>
        </aside>
      </div>
    </div></section>
  );
}
