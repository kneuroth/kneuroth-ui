'use client';

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type RefObject,
} from 'react';
import { cx, mergeRefs } from './kn-utils';
import './reveal.css';

/** Which edge the content travels in from. */
export type RevealFrom = 'left' | 'right';

/**
 * True once `ref`'s element has scrolled into view; then stops observing.
 * Fires a little before the element clears the fold, so the motion is already
 * underway when it's properly visible.
 */
export function useReveal(ref: RefObject<Element | null>): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver: just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return revealed;
}

export interface RevealProps extends ComponentPropsWithRef<'div'> {
  from?: RevealFrom;
}

/**
 * Flies its child in from the side of the screen the first time it scrolls
 * into view. This element is the track — it's observed and never moves; the
 * child travels. Give it ONE child, and make sure an ancestor sets
 * `overflow-x: clip`.
 */
export function Reveal({
  from = 'left',
  className,
  ref,
  ...props
}: RevealProps) {
  const own = useRef<HTMLDivElement>(null);
  const revealed = useReveal(own);
  return (
    <div
      ref={mergeRefs(own, ref)}
      className={cx('reveal', className)}
      data-from={from}
      data-revealed={revealed ? '' : undefined}
      {...props}
    />
  );
}
