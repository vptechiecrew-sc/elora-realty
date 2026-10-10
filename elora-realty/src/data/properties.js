// Listings come from the Google Sheet (see docs/GOOGLE-SHEET-SETUP.md). The listings below are used while no sheet is connected.
// Add `images: ['/images/x.webp']` per property once real photos exist; until then an illustration is shown.
// Optional `focus: '50% 75%'` sets which part of a tall/odd-shaped photo stays visible when it is cropped (x% y%).
import generated from './listings.generated.js';
export { TYPES, LOCATIONS } from './options.js';

const listings = [
  { id: 'nagercoil-layout-01', title: 'Plots in a Developed Layout', type: 'Residential land', location: 'Nagercoil', price: 0, area: 0, unit: 'cents', status: 'Available',
    description: 'Marked plots in a developed layout with laid roads and kerbed edges, ready for construction. Contact us for price, plot sizes and documents.', features: ['Laid roads', 'Marked plots', 'Open surroundings'],
    images: ['/images/land-1.jpg', '/images/land-2.jpg'], focus: '50% 75%' },
  { id: 'nagercoil-plot-01', title: 'Open Plot with Tree Cover', type: 'Residential land', location: 'Nagercoil', price: 0, area: 0, unit: 'cents', status: 'Available',
    description: 'Level, open plot with green cover and natural shade trees. Contact us for price, extent and documents.', features: ['Open, level land', 'Natural tree cover'],
    images: ['/images/property-land.webp'], focus: '50% 78%' },
  { id: 'nagercoil-house-01', title: 'Independent House with Compound Wall', type: 'House', location: 'Nagercoil', price: 0, area: 0, unit: 'sq ft', status: 'Available',
    description: 'Two-storey independent house with a gated compound wall. Contact us for price, built-up area and documents.', features: ['Two storeys', 'Gated compound wall'],
    images: ['/images/property-house.webp'], focus: '50% 70%' },
];
export const properties = generated ? generated : listings;
