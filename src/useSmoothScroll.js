import { useEffect } from 'react';
import Lenis from 'lenis';

// Gentle wheel scrolling (desktop): a little slower than default and it stops right when you stop.
// wheelMultiplier: lower = slower (1 = browser default).
// lerp: lower = more glide after you stop, higher = stops sooner (0.28 is nearly instant).
// Phones/tablets keep their normal touch scrolling.
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({
      lerp: 0.28,
      wheelMultiplier: 0.85,
      smoothWheel: true,
      prevent: (node) => !!node.closest?.('.lb'), // full-screen photo viewer handles its own scrolling
    });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis; };
  }, []);
}