import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard.jsx';
import { About, Services, Why, Contact } from './Sections.jsx';
import { properties, TYPES } from '../data/properties.js';
import { generalLink, IMAGES } from '../config.js';
import useTitle from '../useTitle.js';

export default function Home() {
  useTitle('Elora Realty | Land & Real Estate in Kanyakumari', 'Since 2026, Elora Realty helps you explore residential plots, agricultural land, houses, apartments and commercial properties across Kanyakumari district. Enquire on WhatsApp.');
  return (
    <>
      <section className="photo hero-photo" style={{ '--img': `url(${IMAGES.hero})` }}>
        <div className="wrap hero-photo-in">
          <p className="eyebrow light">Real estate in Kanyakumari · Since 2026</p>
          <h1>Find your place.<br />Build your future.</h1>
          <p className="lead">Explore residential plots, farmland, homes and commercial properties across Kanyakumari district with Elora Realty.</p>
          <div className="row"><Link className="btn btn-red" to="/properties">Explore properties</Link>
            <a className="btn btn-outline-white" href={generalLink} target="_blank" rel="noreferrer">WhatsApp us</a></div>
        </div>
      </section>
      <div className="strip-wrap"><div className="wrap"><div className="strip">
        {[[<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></>, 'Since 2026', 'Serving Kanyakumari district'],
          [<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />, `${TYPES.length} property types`, 'Plots, farmland, homes and more'],
          [<path d="M21 12a8 8 0 0 1-11.600 7.100L4 20l1-4.600A8 8 0 1 1 21 12z" />, 'One-tap enquiry', 'WhatsApp, call or email'],
          [<><circle cx="12" cy="12" r="9" /><path d="M8 12.500l3 3 5-6" /></>, 'Clear details', 'Straightforward info on every listing']].map(([icon, t, d]) =>
          <div key={t}><span className="ico"><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg></span><span><b>{t}</b><small>{d}</small></span></div>)}
      </div></div></div>
      <section className="section"><div className="wrap">
        <div className="section-head"><div><p className="eyebrow">Featured</p><h2>Sample listings</h2></div><Link to="/properties" className="link">View all properties</Link></div>
        <div className="grid">{properties.slice(0, 3).map((p) => <PropertyCard key={p.id} p={p} />)}</div>
      </div></section>
      <About /><Services />
      <section className="photo band" style={{ '--img': `url(${IMAGES.band})` }}>
        <div className="wrap band-in">
          <h2>Looking for land in Kanyakumari?</h2>
          <p>Tell us what you need and we will help you find it.</p>
          <a className="btn btn-red" href={generalLink} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
        </div>
      </section>
      <Why /><Contact />
    </>
  );
}
