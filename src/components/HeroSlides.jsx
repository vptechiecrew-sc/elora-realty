import { useEffect, useState } from 'react';

// Full-width hero with photos that cross-fade by themselves (never pauses).
// First photo stays FIRST_MS, the others NEXT_MS.
const FIRST_MS = 6000;
const NEXT_MS = 5000;

export default function HeroSlides({ slides, className = '', children }) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);
    slides.slice(1).forEach((s) => { const im = new Image(); im.src = s.src; }); // preload the rest
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);

  const playing = n > 1 && !hidden && !reduce;
  const dur = active === 0 ? FIRST_MS : NEXT_MS;

  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), dur);
    return () => clearTimeout(t);
  }, [playing, active, cycle, n, dur]);

  return (
    <section className={`photo hero-photo hero-slides ${className}`}>
      {slides.map((s, i) => (
        <div key={s.src} className={`hs-layer${i === active ? ' on' : ''}`} aria-hidden="true"
          style={{ '--bg-img': `url(${s.src})`, '--pos': s.pos || 'center' }} />
      ))}
      {children}
      {n > 1 && (
        <div className="hs-dots" role="tablist" aria-label="Hero photos">
          {slides.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === active} aria-label={`Show photo ${i + 1}`}
              className={i < active ? 'done' : i === active ? 'cur' : ''}
              style={{ '--dur': `${dur}ms` }}
              onClick={() => { setActive(i); setCycle((c) => c + 1); }}>
              <i key={i === active ? `a${cycle}` : 'x'} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
