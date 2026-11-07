import type { ComponentPropsWithRef, ElementType } from 'react';
import './glass.css';
import { cx } from './kn-utils';

/** How the surface presents. */
export type GlassVariant = 'floating' | 'header' | 'footer';

/** Which screen edge a floating panel is joined to, if any. */
export type GlassEdge = 'none' | 'left' | 'right';

export interface GlassPanelProps extends ComponentPropsWithRef<'div'> {
  /**
   * - `floating` (default): rounded frost with the full layered edge.
   * - `header`: the same frost, top corners squared, flush to the top.
   * - `footer`: full-bleed near-black frost with a hairline, no edge layer.
   */
  variant?: GlassVariant;
  /** Joins a floating panel to that screen edge — see the docs. */
  edge?: GlassEdge;
  /** The element to render. Defaults to `header`/`footer` for those variants,
      `div` otherwise. */
  as?: ElementType;
}

/**
 * The frosted-glass surface. Content goes inside; set layout (max-width,
 * padding, margin) with your own classes. Flattens to white on paper.
 */
export function GlassPanel({
  variant = 'floating',
  edge = 'none',
  as,
  className,
  children,
  ...props
}: GlassPanelProps) {
  const Tag: ElementType =
    as ??
    (variant === 'header' ? 'header' : variant === 'footer' ? 'footer' : 'div');
  return (
    <Tag
      className={cx('glass-panel', className)}
      data-variant={variant}
      data-edge={edge === 'none' ? undefined : edge}
      {...props}
    >
      {variant !== 'footer' && (
        <div className="glass-panel-edge glass-edge" aria-hidden="true" />
      )}
      {children}
    </Tag>
  );
}
