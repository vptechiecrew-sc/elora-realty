// EDIT ME: replace every placeholder with the company's real detail
export const COMPANY = {
  name: 'ELORA REALTY',
  phone: '+91 8220604939',          
  whatsapp: '918220604939',          
  email: 'elorarealty7@gmail.com',
  address: 'Second Floor, City Center, Kottar-Parvathipuram Rd, opp. Indian Oil, Nagercoil, Tamil Nadu 629001',
};
// Tap-to-call, tap-to-email and open-in-Maps links (used in the Contact section, footer and buttons).
export const INSTAGRAM = 'https://www.instagram.com/elora.realty/';
export const TEL = `tel:${COMPANY.phone.replace(/[^+\d]/g, '')}`;
export const MAIL = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Property enquiry - Elora Realty')}`;
export const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
export const waLink = (msg) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
export const enquiryLink = (title) =>
  waLink(`Hello Elora Realty, I am interested in the property ${title}. Could you please share more details?`);
export const generalLink = waLink('Hello Elora Realty, I would like to enquire about properties in Nagercoil and Chennai.');
export const inr = (n) => !n ? 'Price on request' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
// "12.5 lakh / cent", "1.2 crore", "Price on request"
export const priceText = (p) => {
  if (!p.price) return 'Price on request';
  const f = (v) => String(Math.round(v * 100) / 100);
  const base = p.price >= 1e7 ? `\u20b9${f(p.price / 1e7)} crore` : p.price >= 1e5 ? `\u20b9${f(p.price / 1e5)} lakh` : inr(p.price);
  return p.priceUnit ? `${base} / ${p.priceUnit}` : base;
};
// Number -> "5 cents". Text that already has a unit/words ("2.5 acre, can be separated") is shown exactly as typed; "2 to 10" gets the unit added.
export const areaText = (p) => {
  if (!p.area) return '';
  const s = String(p.area).trim();
  return /[a-z]/i.test(s.replace(/\bto\b/gi, '')) ? s : `${s} ${p.unit}`;
};
export const hasLoan = (p) => p.bankLoan !== false;

// Background photos. Put your files in /public/images/ with these names (or change the names here).
// If a file is missing, a red gradient is shown instead, so the site never looks broken.
export const IMAGES = { hero: '/images/hero.webp', band: '/images/land-band.webp' };
// Hero slideshow: first photo shows 6 s, the rest 5 s. Add drone / aerial shots here (put the files in /public/images/).
// `pos` = which part stays visible on tall phone screens (x% y%).
export const HERO_SLIDES = [
  { src: '/images/hero.webp', pos: '50% 60%' },
  { src: '/images/land-two.webp', pos: '50% 70%' },
  { src: '/images/land-1.webp', pos: '50% 70%' },
];
