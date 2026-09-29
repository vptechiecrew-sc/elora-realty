// SAMPLE DATA ONLY. Replace with the company's real listings (same shape).
// Add `images: ['/images/x.webp']` per property once real photos exist; until then an illustration is shown.
export const TYPES = ['Residential land', 'Agricultural land', 'Commercial land', 'House', 'Apartment', 'Commercial property'];
export const LOCATIONS = ['Nagercoil', 'Marthandam', 'Thuckalay', 'Kuzhithurai', 'Kanyakumari', 'Colachel'];

const listings = [
  { id: 'sample-01', title: 'Residential Plot, Corner Site', type: 'Residential land', location: 'Nagercoil', price: 3200000, area: 5, unit: 'cents', status: 'Available',
    description: 'A regular-shaped corner plot suited for a family home. Sample listing: replace with verified details.', features: ['Corner plot', 'Road access', 'Clear title (to be confirmed)'] },
  { id: 'sample-02', title: 'Agricultural Land with Water Access', type: 'Agricultural land', location: 'Thuckalay', price: 4500000, area: 1.5, unit: 'acres', status: 'Available',
    description: 'Open farmland suitable for cultivation. Sample listing: replace with verified details.', features: ['Level land', 'Water source (to be confirmed)', 'Approach road'] },
  { id: 'sample-03', title: 'Commercial Plot on Main Road', type: 'Commercial land', location: 'Marthandam', price: 9800000, area: 8, unit: 'cents', status: 'Reserved',
    description: 'Main-road frontage suitable for commercial development. Sample listing: replace with verified details.', features: ['Main-road frontage', 'Suitable for retail or offices'] },
  { id: 'sample-04', title: 'Independent 3 BHK House', type: 'House', location: 'Kuzhithurai', price: 6800000, area: 1850, unit: 'sq ft', status: 'Available',
    description: 'A family home with covered parking and a private garden. Sample listing: replace with verified details.', features: ['3 bedrooms', 'Covered parking', 'Garden'] },
  { id: 'sample-05', title: '2 BHK Apartment', type: 'Apartment', location: 'Nagercoil', price: 4200000, area: 1100, unit: 'sq ft', status: 'Available',
    description: 'A well-planned apartment with lift access. Sample listing: replace with verified details.', features: ['2 bedrooms', 'Lift', 'Car parking'] },
  { id: 'sample-06', title: 'Ground-Floor Shop Space', type: 'Commercial property', location: 'Colachel', price: 5500000, area: 650, unit: 'sq ft', status: 'Sold',
    description: 'Ground-floor commercial space in a busy area. Sample listing: replace with verified details.', features: ['Ground floor', 'Street-facing'] },
];
export const properties = listings.map((p) => ({ ...p, sample: true })); // remove 'sample' when using real listings
