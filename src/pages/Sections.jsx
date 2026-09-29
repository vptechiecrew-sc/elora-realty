import { Link } from 'react-router-dom';
import Visual from '../components/Visual.jsx';
import useTitle from '../useTitle.js';
import { COMPANY, generalLink } from '../config.js';

export function About({ page }) {
  useTitle(page ? 'About Elora Realty | Real Estate in Kanyakumari' : document.title, page ? 'Since 2026, Elora Realty has been helping people explore land and property in Kanyakumari district.' : undefined);
  return (
    <section className={`section ${page ? 'page-top' : 'alt'}`} id="about">
      <div className="wrap split">
        <div className="split-media"><Visual type="House" alt="Illustration of a home" variant={1} /></div>
        <div>
          <p className="eyebrow">About us</p>
          <h2>Local property guidance, explained clearly</h2>
          <p>Since 2026, Elora Realty has been serving Kanyakumari district, helping people explore residential plots, agricultural land, commercial sites, houses and apartments.</p>
          <p>We aim to share clear property information and respond promptly to every enquiry. <span className="todo">[Company story, founders and registrations: to be provided by Elora Realty]</span></p>
          <Link className="btn btn-red" to="/properties">Explore properties</Link>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  ['Residential land', 'Plots for homes across the district.'], ['Agricultural land', 'Farmland and open land enquiries.'],
  ['Commercial land', 'Sites for shops, offices and business use.'], ['Houses and apartments', 'Ready homes for families.'],
  ['Commercial properties', 'Built spaces for business.'], ['Property enquiries and assistance', 'Ask us about any listing.'],
];
export function Services({ page }) {
  useTitle(page ? 'Services | Elora Realty' : document.title);
  return (
    <section className={`section ${page ? 'page-top' : ''}`} id="services">
      <div className="wrap services">
        <div className="services-lead">
          <p className="eyebrow light">Services</p><h2>What we help with</h2>
          <p>Sample service list. <span className="todo-light">[Confirm services with Elora Realty]</span></p>
          <Link className="btn btn-white" to="/contact">Talk to us</Link>
        </div>
        <ul className="services-list">{SERVICES.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul>
      </div>
    </section>
  );
}

export function Why() {
  const items = [['Local knowledge', 'Focused on Kanyakumari and nearby towns.'], ['Every property type', 'Plots, farmland, homes and commercial spaces.'],
    ['Clear information', 'Straightforward details for each listing.'], ['Easy enquiry', 'One tap on WhatsApp, phone or email.']];
  return (
    <section className="section alt"><div className="wrap">
      <p className="eyebrow">Why Elora Realty</p><h2>Made for confident property decisions</h2>
      <div className="why">{items.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
  );
}

export function Contact({ page }) {
  useTitle(page ? 'Contact Elora Realty | Kanyakumari' : document.title);
  const tel = COMPANY.phone.replace(/[^+\d]/g, '');
  return (
    <section className={`section ${page ? 'page-top' : ''}`} id="contact">
      <div className="wrap contact">
        <div><p className="eyebrow">Contact</p><h2>Enquire about a property</h2>
          <p>The quickest way to reach us is WhatsApp. We will share details and arrange a visit.</p>
          <dl><dt>Phone</dt><dd>{COMPANY.phone}</dd><dt>Email</dt><dd>{COMPANY.email}</dd><dt>Office</dt><dd>{COMPANY.address}</dd><dt>Hours</dt><dd>{COMPANY.hours}</dd></dl></div>
        <div className="contact-actions">
          <a className="btn btn-red btn-block" href={generalLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          <a className="btn btn-line btn-block" href={`tel:${tel}`}>Call us</a>
          <a className="btn btn-line btn-block" href={`mailto:${COMPANY.email}`}>Send an email</a>
        </div>
      </div>
    </section>
  );
}