import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard.jsx';
import { AREAS } from '../data/areas.js';
import { properties } from '../data/properties.js';
import { generalLink, waLink } from '../config.js';
import useTitle from '../useTitle.js';

// City landing page: /land-in-nagercoil
export default function Area({ slug }) {
  const a = AREAS[slug];
  useTitle(a ? a.title : 'Page not found | Elora Realty', a?.description, a ? undefined : { noindex: true });
  if (!a) return <div className="wrap page-top section"><h1>Page not found</h1><Link className="btn btn-red" to="/properties">All properties</Link></div>;
  const list = properties.filter((p) => p.location === a.name);
  return (
    <section className="section page-top"><div className="wrap">
      <p className="eyebrow">{a.name}</p>
      <h1 className="h2">{a.h1}</h1>
      {a.intro.map((t) => <p key={t} className="lead page-lead">{t}</p>)}
      {list.length > 0
        ? <div className="grid">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        : <p>No listings in {a.name} right now. <a className="link" href={waLink(`Hello Elora Realty, I am looking for property in ${a.name}.`)} target="_blank" rel="noreferrer">Ask us on WhatsApp</a>.</p>}
      <div className="faq">
        <h2>Questions about property in {a.name}</h2>
        {a.faqs.map(([q, ans]) => <details key={q}><summary>{q}</summary><p>{ans}</p></details>)}
      </div>
      <div className="row area-cta">
        <a className="btn btn-red" href={generalLink} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
        <Link className="btn btn-line" to="/properties">All properties</Link>
      </div>
    </div></section>
  );
}
