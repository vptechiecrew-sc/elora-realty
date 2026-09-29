// Illustrated placeholder shown until real photography is added to a property.
const PALETTE = {
  'Residential land': ['#F6D9C8', '#C9DDB5', '#7FA37A'], 'Agricultural land': ['#F8E6B8', '#B7D27F', '#6E9A4B'],
  'Commercial land': ['#EBD9D3', '#D9D2CB', '#A69C94'], House: ['#F7D2CF', '#CFE0BF', '#B91F2D'],
  Apartment: ['#E6DCD6', '#D8D8DC', '#8F1722'], 'Commercial property': ['#EFD5D2', '#DAD5D0', '#B91F2D'],
};
export default function Visual({ type, src, alt, variant = 0 }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className="visual" />;
  const [sky, ground, accent] = PALETTE[type] || PALETTE.House;
  const built = ['House', 'Apartment', 'Commercial property'].includes(type);
  const x = 250 + variant * 40;
  return (
    <svg className="visual" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt}>
      <rect width="800" height="500" fill={sky} />
      <circle cx={620 - variant * 60} cy="120" r="46" fill="#fff" opacity=".7" />
      <path d="M0 330 Q200 250 400 320 T800 300 V500 H0Z" fill={ground} />
      <path d="M0 400 Q250 350 500 400 T800 390 V500 H0Z" fill={accent} opacity=".35" />
      {built ? (<g><rect x={x} y="240" width="240" height="170" fill="#fff" /><path d={`M${x - 20} 245 L${x + 120} 150 L${x + 260} 245Z`} fill={accent} />
        <rect x={x + 30} y="290" width="50" height="60" fill={sky} /><rect x={x + 100} y="290" width="50" height="120" fill={accent} /><rect x={x + 170} y="290" width="40" height="60" fill={sky} /></g>)
        : (<g stroke="#fff" strokeWidth="4" fill="none" strokeDasharray="14 10"><path d="M180 440 L330 350 L620 370 L700 450Z" /></g>)}
    </svg>
  );
}
