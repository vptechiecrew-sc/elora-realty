import PropertyCard from '../components/PropertyCard.jsx';
import { properties } from '../data/properties.js';
import useTitle from '../useTitle.js';

export default function Properties() {
  useTitle('Properties for sale in Kanyakumari | Elora Realty', 'Browse residential plots, agricultural land, houses, apartments and commercial properties for sale across Kanyakumari district.');
  return (
    <section className="section page-top"><div className="wrap">
      <p className="eyebrow">Properties</p>
      <h1 className="h2">Find land and property</h1>
      <p className="lead page-lead">Browse plots, farmland, homes and commercial spaces across Kanyakumari district.</p>
      <div className="grid">{properties.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
    </div></section>
  );
}
