// EDIT ME: replace every placeholder with the company's real details.
export const COMPANY = {
  name: 'ELORA REALTY',
  phone: '+91 8220604939',          // placeholder
  whatsapp: '918220604939',          // placeholder: country code + number, digits only
  email: 'elorarealthy7@gmail.com',
  address: 'Second Floor, City Center, Kottar-Parvathipuram Rd, opp. Indian Oil, Nagercoil, Tamil Nadu 629001',
};
// Tap-to-call, tap-to-email and open-in-Maps links (used in the Contact section, footer and buttons).
export const TEL = `tel:${COMPANY.phone.replace(/[^+\d]/g, '')}`;
export const MAIL = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Property enquiry - Elora Realty')}`;
export const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
export const waLink = (msg) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
export const enquiryLink = (title) =>
  waLink(`Hello Elora Realty, I am interested in the property ${title}. Could you please share more details?`);
export const generalLink = waLink('Hello Elora Realty, I would like to enquire about properties in Nagercoil and Chennai.');
export const inr = (n) => !n ? 'Price on request' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

// Background photos. Put your files in /public/images/ with these names (or change the names here).
// If a file is missing, a red gradient is shown instead, so the site never looks broken.
export const IMAGES = { hero: '/images/hero.jpg', band: '/images/land-band.jpg' };
