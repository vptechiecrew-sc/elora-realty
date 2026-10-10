import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard.jsx';
import { About, Services, Why, Contact } from './Sections.jsx';
import { properties } from '../data/properties.js';
import { AREA_LIST } from '../data/areas.js';
import { generalLink, IMAGES } from '../config.js';
import useTitle from '../useTitle.js';

export default function Home() {
  useTitle('Best Land, Property & Construction in Nagercoil | Elora Realty', 'Find the best plots, land, houses and commercial property in Nagercoil and Chennai, plus construction services. Enquire with Elora Realty on WhatsApp.');
  return (
    <>
      <section className="photo hero-photo" style={{ '--img': `url(${IMAGES.hero})` }}>
        <div className="wrap hero-photo-in">
          <h1 className="eyebrow light">Real estate in Nagercoil | Chennai</h1>
          <p className="hero-title">Find your place.<br />Build your future.</p>
          <p className="lead">Explore residential plots, farmland, homes and commercial properties in Nagercoil and Chennai with Elora Realty.</p>
          <div className="row"><Link className="btn btn-red" to="/properties">Explore properties</Link>
            <a className="btn btn-outline-white" href={generalLink} target="_blank" rel="noreferrer">WhatsApp us</a></div>
        </div>
      </section>
      
      {properties.length > 0 && <section className="section"><div className="wrap">
        <div className="section-head"><div><p className="eyebrow">Featured</p><h2>Latest properties</h2></div><Link to="/properties" className="link">View all properties</Link></div>
        <div className="grid">{properties.slice(0, 3).map((p) => <PropertyCard key={p.id} p={p} />)}</div>
      </div></section>}
      {AREA_LIST.length > 1 && <section className="section alt"><div className="wrap">
        <p className="eyebrow">Where we work</p><h2>Land and property by city</h2>
        <div className="areas">{AREA_LIST.map((a) => (
          <Link key={a.slug} to={`/land-in-${a.slug}`} className="area-tile"><h3>Land &amp; property in {a.name}</h3><p>Plots, farmland, houses and commercial property in {a.name}.</p><span className="link">Browse {a.name} →</span></Link>
        ))}</div>
      </div></section>}
      <About /><Services />
      <section className="photo band" style={{ '--img': `url(${IMAGES.band})` }}>
        <div className="wrap band-in">
          <h2>Looking for land in Nagercoil or Chennai?</h2>
          <p>Tell us what you need and we will help you find it.</p>
          <a className="btn btn-red" href={generalLink} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
        </div>
      </section>
      <Why /><Contact />
    </>
  );
}
