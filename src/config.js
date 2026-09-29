// EDIT ME: replace every placeholder with the company's real details.
export const COMPANY = {
  name: 'ELORA REALTY',
  phone: '+91 8820604939',          // placeholder
  whatsapp: '918820604939',          // placeholder: country code + number, digits only
  email: 'info@your-domain.example', // placeholder
  address: '[Office address: to be provided]',
  hours: '[Business hours: to be provided]',
};
export const waLink = (msg) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
export const enquiryLink = (title) =>
  waLink(`Hello Elora Realty, I am interested in the property ${title}. Could you please share more details?`);
export const generalLink = waLink('Hello Elora Realty, I would like to enquire about properties in Kanyakumari.');
export const inr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

// Background photos. Put your files in /public/images/ with these names (or change the names here).
// If a file is missing, a red gradient is shown instead, so the site never looks broken.
export const IMAGES = { hero: '/images/hero.jpg', band: '/images/land-band.jpg' };
