'use client';

import {
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from 'react';
import './glow-link.css';
import './glow-sweep.css';
import { cx, mergeRefs, useGlowDelay } from './kn-utils';
import { useGlowSweep } from './use-glow-sweep';

/** Pick by the surface the button sits on — except `icon`, which is picked by
    the button being icon-only, on any surface. */
export type GlowVariant = 'warm' | 'dark' | 'azure' | 'icon';

const VARIANT_CLASS: Record<GlowVariant, string> = {
  warm: 'glow-link',
  dark: 'glow-link glow-link-dark',
  azure: 'glow-link glow-link-azure',
  icon: 'glow-link glow-link-icon',
};

interface GlowButtonOwnProps {
  variant?: GlowVariant;
  /** An icon node (an inline `<svg>` works best — it takes `currentColor`).
      Leave `children` empty for an icon-only button and set `aria-label`. */
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  /** Text link-buttons: swap the rotating ring for the cube-colour letter
      sweep. For links, not icon-only actions. */
  sweep?: boolean;
  /** With `sweep`: somewhere not ready yet (see SweepLink). */
  pending?: boolean;
}

type AsButton = GlowButtonOwnProps &
  Omit<ComponentPropsWithRef<'button'>, 'ref'> & {
    href?: undefined;
    ref?: Ref<HTMLButtonElement>;
  };
type AsLink = GlowButtonOwnProps &
  Omit<ComponentPropsWithRef<'a'>, 'ref'> & {
    href: string;
    ref?: Ref<HTMLAnchorElement>;
  };

export type GlowButtonProps = AsButton | AsLink;

/**
 * The site's one button: a word (or a glyph) with light behind it. Renders a
 * `<button>`, or an `<a>` when given `href` — somewhere to go has to be
 * middle-clickable and copyable.
 */
export function GlowButton(props: GlowButtonProps) {
  const {
    variant = 'warm',
    icon,
    size = 'md',
    rounded,
    sweep,
    pending,
    className,
    children,
    ref,
    ...rest
  } = props;

  const host = useRef<HTMLElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useGlowDelay(host);
  useGlowSweep(host, label);

  const iconOnly = children == null || children === false;
  const shared = {
    className: cx('glow-button', !sweep && VARIANT_CLASS[variant], className),
    'data-size': size === 'md' ? undefined : size,
    'data-rounded': rounded ? '' : undefined,
    'data-icon-only': iconOnly ? '' : undefined,
    'data-sweep': sweep ? '' : undefined,
  };

  const face = (
    <>
      {icon != null && (
        <span className="glow-button-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {!iconOnly &&
        (sweep ? (
          <span
            ref={label}
            className={cx('glow-sweep', pending && 'glow-sweep-pending')}
          >
            {children}
          </span>
        ) : (
          children
        ))}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a
        {...(rest as ComponentPropsWithRef<'a'>)}
        {...shared}
        ref={mergeRefs(host, ref as Ref<HTMLElement>)}
      >
        {face}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as ComponentPropsWithRef<'button'>)}
      {...shared}
      ref={mergeRefs(host, ref as Ref<HTMLElement>)}
    >
      {face}
    </button>
  );
}
