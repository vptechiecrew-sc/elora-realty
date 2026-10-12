import { Link } from 'react-router-dom';
import useTitle from '../useTitle.js';
import { COMPANY, generalLink, TEL, MAIL, MAP, INSTAGRAM } from '../config.js';

export function About({ page }) {
  useTitle(page ? 'About Elora Realty | Real Estate in Nagercoil & Chennai' : undefined, page ? 'Elora Realty helps people explore land and property in Nagercoil and Chennai.' : undefined);
  return (
    <section className={`section ${page ? 'page-top' : 'alt'}`} id="about">
      <div className="wrap about-mini">
        <img className="about-logo" src="/images/about-us.png" alt="Elora Realty, since 2026" width="460" height="460" loading="lazy" decoding="async" />
        <div>
          <p className="eyebrow">About us</p>
          <h2>Real estate and construction in Nagercoil and Chennai</h2>
          <p>Elora Realty is a real estate company helping you buy residential plots, agricultural land, commercial sites, houses and apartments in Nagercoil and Chennai. We handle construction too, so you can go from finding the land to building on it with one team.</p>
          <ul className="ticks" style={{ marginBottom: 24 }}>
            <li>Plots, farmland, houses and commercial property</li>
            <li>Site visits arranged</li>
            <li>Construction services</li>
            
          </ul>
          <Link className="btn btn-red" to="/properties">Explore properties</Link>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  ['Residential land', 'Plots for homes in Nagercoil and Chennai.'],['Commercial land', 'Sites for shops, offices and business use.'],  ['Agricultural land', 'Farmland and open land enquiries.'],
  
  ['Commercial properties', 'Built spaces for business.'], ['Construction', 'Building work for homes and other buildings.'], ['Property enquiries and assistance', 'Ask us about any listing.'],
];
export function Services({ page }) {
  useTitle(page ? 'Services | Elora Realty' : undefined);
  return (
    <section className={`section ${page ? 'page-top' : ''}`} id="services">
      <div className="wrap services">
        <div className="services-lead">
          <p className="eyebrow light">Services</p><h2>What we help with</h2>
          <p>From open plots to built property, we help you find the right fit and enquire with confidence.</p>
          <Link className="btn btn-white" to="/contact">Talk to us</Link>
        </div>
        <ul className="services-list">{SERVICES.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul>
      </div>
    </section>
  );
}

export function Why() {
  const items = [['Local knowledge', 'Focused on Nagercoil and Chennai.'], ['Every property type', 'Plots, farmland, homes and commercial spaces.'],
    ['Clear information', 'Straightforward details for each listing.'], ['Easy enquiry', 'One tap on WhatsApp, phone or email.']];
  return (
    <section className="section alt"><div className="wrap">
      <p className="eyebrow">Why Elora Realty</p><h2>Made for confident property decisions</h2>
      <div className="why">{items.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
  );
}

export function Contact({ page }) {
  useTitle(page ? 'Contact Elora Realty | Nagercoil & Chennai' : undefined);
  return (
    <section className={`section ${page ? 'page-top' : ''}`} id="contact">
      <div className="wrap contact">
        <div><p className="eyebrow">Contact</p><h2>Enquire about a property</h2>
          <p>The quickest way to reach us is WhatsApp. We will share details and arrange a visit.</p>
          <dl><dt>Phone</dt><dd><a href={TEL}>{COMPANY.phone}</a></dd><dt>Email</dt><dd><a href={MAIL}>{COMPANY.email}</a></dd><dt>Instagram</dt><dd><a href={INSTAGRAM} target="_blank" rel="noreferrer">@elora.realty</a></dd><dt>Office</dt><dd><a href={MAP} target="_blank" rel="noreferrer">{COMPANY.address}</a></dd></dl></div>
        <div className="contact-actions">
          <a className="btn btn-red btn-block" href={generalLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          <a className="btn btn-line btn-block" href={TEL}>Call us</a>
          <a className="btn btn-line btn-block" href={MAIL}>Send an email</a>
        </div>
      </div>
    </section>
  );
}