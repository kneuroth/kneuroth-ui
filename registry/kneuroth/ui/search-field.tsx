'use client';

import { useState, type ComponentPropsWithRef } from 'react';
import './search-field.css';
import { cx } from './kn-utils';

export interface SearchFieldProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'type'
> {
  /** Controlled value. Pair with `onValueChange`. */
  value?: string;
  /** Uncontrolled starting value. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Class for the outer pane (layout, width). Other props go to the input. */
  className?: string;
}

/**
 * A search box on the panel's glass. Escape clears it. The magnifier is
 * decorative, so the input carries the accessible name: `aria-label` defaults
 * to "search" — set it whenever the placeholder doesn't say what is searched.
 */
export function SearchField({
  value,
  defaultValue = '',
  onValueChange,
  className,
  placeholder = 'search',
  'aria-label': ariaLabel = 'search',
  onKeyDown,
  ...inputProps
}: SearchFieldProps) {
  const [own, setOwn] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : own;

  const set = (next: string) => {
    if (!controlled) setOwn(next);
    onValueChange?.(next);
  };

  return (
    // A <label>, so a click anywhere on the pane lands in the input.
    <label className={cx('search-field', className)}>
      <span className="search-field-edge glass-edge" aria-hidden="true" />
      <svg
        className="search-field-icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
      </svg>
      <input
        {...inputProps}
        className="search-field-input"
        type="search"
        autoComplete="off"
        spellCheck={false}
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={current}
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') set('');
          onKeyDown?.(e);
        }}
      />
    </label>
  );
}
