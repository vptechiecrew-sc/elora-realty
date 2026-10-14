import { useEffect, useState } from 'react';

// Full-width hero with photos that cross-fade by themselves (never pauses).
// Every photo stays 3 s.
const FIRST_MS = 3000;
const NEXT_MS = 3000;

export default function HeroSlides({ slides, className = '', children }) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);
    slides.slice(1).forEach((s) => { const im = new Image(); im.src = s.src; }); // preload the rest
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);

  const playing = n > 1 && !hidden; // keeps playing even with phone 'reduce motion' on (CSS makes it a gentle fade, no zoom)
  const dur = active === 0 ? FIRST_MS : NEXT_MS;

  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), dur);
    return () => clearTimeout(t);
  }, [playing, active, n, dur]);

  return (
    <section className={`photo hero-photo hero-slides ${className}`}>
      {slides.map((s, i) => (
        <div key={s.src} className={`hs-layer${i === active ? ' on' : ''}`} aria-hidden="true"
          style={{ '--bg-img': `url(${s.src})`, '--pos': s.pos || 'center' }} />
      ))}
      {children}
    </section>
  );
}