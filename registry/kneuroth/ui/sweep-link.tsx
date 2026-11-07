'use client';

import { useRef, type ComponentPropsWithRef } from 'react';
import './glow-sweep.css';
import { cx, mergeRefs } from './kn-utils';
import { useGlowSweep } from './use-glow-sweep';

export interface SweepLinkProps extends ComponentPropsWithRef<'a'> {
  /** Somewhere that isn't ready yet: rests grey, sweeps grey, backwards. */
  pending?: boolean;
}

/**
 * The canonical text link — letters breathing white→blue, one cube-colour
 * sweep on hover. Text only: an icon inside is swallowed by the clip-to-text
 * fill, so put icons beside it (or use `GlowButton` with `sweep`).
 *
 * For a framework router link, use `useGlowSweep` with your own `<Link
 * className="glow-sweep">` instead.
 */
export function SweepLink({
  pending,
  className,
  ref,
  ...props
}: SweepLinkProps) {
  const own = useRef<HTMLAnchorElement>(null);
  useGlowSweep(own);
  return (
    <a
      ref={mergeRefs(own, ref)}
      className={cx('glow-sweep', pending && 'glow-sweep-pending', className)}
      {...props}
    />
  );
}
