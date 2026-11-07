'use client';

import { useRef, type ComponentPropsWithRef, type Ref } from 'react';
import './glass-button.css';
import { cx, mergeRefs, useGlowDelay } from './kn-utils';

/** Which ground the slab stands on — pick it from the background. */
export type GlassButtonTone = 'light' | 'dark';

interface GlassButtonOwnProps {
  /** `light` (default): white frost, for a page. `dark`: near-black frost,
      for a button on the raw photograph. The rim is the same on both. */
  tone?: GlassButtonTone;
}

type AsButton = GlassButtonOwnProps &
  Omit<ComponentPropsWithRef<'button'>, 'ref'> & {
    href?: undefined;
    ref?: Ref<HTMLButtonElement>;
  };
type AsLink = GlassButtonOwnProps &
  Omit<ComponentPropsWithRef<'a'>, 'ref'> & {
    href: string;
    ref?: Ref<HTMLAnchorElement>;
  };

export type GlassButtonProps = AsButton | AsLink;

/**
 * A pressable slab of glass, with the cube triad on its rim. Put a label, an
 * icon, or both inside (icon-only needs `aria-label`). Renders an `<a>` when
 * given `href`, a `<button>` otherwise.
 */
export function GlassButton(props: GlassButtonProps) {
  const { tone = 'light', className, ref, ...rest } = props;
  const host = useRef<HTMLElement>(null);
  useGlowDelay(host);

  const shared = {
    className: cx('glass-button', className),
    'data-tone': tone,
    ref: mergeRefs(host, ref as Ref<HTMLElement>),
  };

  if (rest.href !== undefined) {
    return <a {...(rest as ComponentPropsWithRef<'a'>)} {...shared} />;
  }
  return (
    <button
      type="button"
      {...(rest as ComponentPropsWithRef<'button'>)}
      {...shared}
    />
  );
}
