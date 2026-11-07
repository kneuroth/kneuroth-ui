'use client';

import { useEffect, type RefObject } from 'react';

/** The two non-white colours of each Rubik's top-face grouping (dampened). */
const GROUPS: readonly [string, string][] = [
  ['#ff9b66', '#6697d6'], // white, orange, blue
  ['#ff9b66', '#66c391'], // white, orange, green
  ['#66c391', '#dc7889'], // white, green, red
  ['#dc7889', '#6697d6'], // white, red, blue
];

/** A `.glow-sweep-pending` element sweeps grey, not in cube colours. */
const PENDING: [string, string] = ['#a4a4ac', '#cacad0'];

/**
 * Drives the `.glow-sweep` shimmer: on hover / keyboard focus of `host`, picks
 * a cube grouping at random and plays one sweep pass across `target` (the
 * element wearing `.glow-sweep`; defaults to `host`).
 *
 * Split host/target so a button can be hovered anywhere — icon included — while
 * only its label is swept. Respects `prefers-reduced-motion`: leaves the link
 * at rest and never sweeps.
 */
export function useGlowSweep(
  host: RefObject<HTMLElement | null>,
  target: RefObject<HTMLElement | null> = host,
): void {
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const onHover = () => {
      const t = target.current;
      if (!t || t.classList.contains('is-sweeping')) return; // one at a time
      const [c1, c2] = t.classList.contains('glow-sweep-pending')
        ? PENDING
        : GROUPS[Math.floor(Math.random() * GROUPS.length)];
      t.style.setProperty('--sweep-c1', c1);
      t.style.setProperty('--sweep-c2', c2);
      t.classList.remove('is-sweeping');
      void t.offsetWidth; // reflow, so the one-shot animation re-triggers
      t.classList.add('is-sweeping');
    };

    const onEnd = (e: AnimationEvent) => {
      if (
        e.animationName !== 'sweepOnce' &&
        e.animationName !== 'sweepOnceBack'
      )
        return;
      const t = target.current;
      if (!t) return;
      t.classList.remove('is-sweeping');
      t.style.removeProperty('--sweep-c1');
      t.style.removeProperty('--sweep-c2');
    };

    // animationend bubbles from the label up to the host, so listen there.
    el.addEventListener('mouseenter', onHover);
    el.addEventListener('focusin', onHover);
    el.addEventListener('animationend', onEnd);
    return () => {
      el.removeEventListener('mouseenter', onHover);
      el.removeEventListener('focusin', onHover);
      el.removeEventListener('animationend', onEnd);
    };
  }, [host, target]);
}
