import PropertyCard from '../components/PropertyCard.jsx';
import { properties } from '../data/properties.js';
import { generalLink } from '../config.js';
import useTitle from '../useTitle.js';

export default function Properties() {
  useTitle('Properties for Sale in Nagercoil & Chennai | Elora Realty', 'Browse residential plots, agricultural land, houses, apartments and commercial properties for sale in Nagercoil and Chennai. Enquire on WhatsApp.');
  return (
    <section className="section page-top"><div className="wrap">
      <p className="eyebrow">Properties</p>
      <h1 className="h2">Find land and property</h1>
      <p className="lead page-lead">Browse plots, farmland, homes and commercial spaces in Nagercoil and Chennai.</p>
      {properties.length
        ? <div className="grid">{properties.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        : <p>New listings are being added. <a className="link" href={generalLink} target="_blank" rel="noreferrer">Ask us on WhatsApp</a> about what is available.</p>}
    </div></section>
  );
}
