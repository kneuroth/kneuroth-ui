import { useEffect, type Ref, type RefCallback } from 'react';

/** Join class names, skipping falsy ones. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

/** One ref callback that feeds several refs (a caller's and our own). */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value);
      else if (ref) (ref as { current: T | null }).current = value;
    }
  };
}

/**
 * Starts the element's glow animations at a random point in the ~16s cube
 * cycle, so a row of controls never rotates in lockstep.
 *
 * Set after mount on purpose: a random value rendered into `style` would
 * differ between server and client and break hydration.
 */
export function useGlowDelay(ref: { current: HTMLElement | null }): void {
  useEffect(() => {
    ref.current?.style.setProperty(
      '--glow-delay',
      `-${(Math.random() * 16).toFixed(2)}s`,
    );
  }, [ref]);
}
