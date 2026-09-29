import { Link } from 'react-router-dom';
import Visual from './Visual.jsx';
import { enquiryLink, inr } from '../config.js';

export default function PropertyCard({ p }) {
  return (
    <article className="card">
      <Link to={`/properties/${p.id}`} className="card-media" aria-label={`View ${p.title}`}>
        <Visual type={p.type} src={p.images?.[0]} alt={`${p.title}, ${p.location}`} />
        <span className={`status status-${p.status.toLowerCase()}`}>{p.status}</span>
        {p.sample && <span className="sample-tag">Sample</span>}
      </Link>
      <div className="card-body">
        <p className="eyebrow">{p.type} · {p.location}</p>
        <h3>{p.title}</h3>
        <p className="price">{inr(p.price)}</p>
        <p className="meta">{p.area} {p.unit}</p>
        <div className="card-actions">
          <Link className="btn btn-red btn-sm" to={`/properties/${p.id}`}>View details</Link>
          <a className="btn btn-line btn-sm" href={enquiryLink(p.title)} target="_blank" rel="noreferrer">Enquire</a>
        </div>
      </div>
    </article>
  );
}
