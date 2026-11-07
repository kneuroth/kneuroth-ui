import { useState, type ReactNode } from 'react';
import { GlowButton } from '@registry/ui/glow-button';
import { CheckIcon, CopyIcon } from './icons';

export const REGISTRY_URL = 'https://kneuroth.github.io/kneuroth-ui/r';
export const ADD_REGISTRY = `npx shadcn@latest registry add @kneuroth=${REGISTRY_URL}/{name}.json`;
export const add = (item: string) => `npx shadcn@latest add @kneuroth/${item}`;

/** A copy-to-clipboard control: an icon-only glow button, as every icon is. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <GlowButton
      variant="icon"
      size="sm"
      rounded
      aria-label={done ? 'copied' : label}
      icon={done ? <CheckIcon /> : <CopyIcon />}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    />
  );
}

export function Code({
  children,
  label = 'copy code',
}: {
  children: string;
  label?: string;
}) {
  return (
    <div className="relative">
      <pre className="code keep-case">
        <code>{children}</code>
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton text={children} label={label} />
      </div>
    </div>
  );
}

/** One shell line with a copy control beside it. */
export function Command({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-frenchgrey/15 bg-black/35 py-1.5 pr-1.5 pl-4">
      <code className="keep-case flex-1 overflow-x-auto py-1 text-[0.8rem] whitespace-nowrap text-[#d8d2cc]">
        <span className="text-frenchgrey/60 select-none">$ </span>
        {children}
      </code>
      <CopyButton text={children} label="copy command" />
    </div>
  );
}

export function Stage({
  ground = 'photo',
  children,
}: {
  ground?: 'photo' | 'page' | 'dark';
  children: ReactNode;
}) {
  return (
    <div className="stage" data-ground={ground}>
      {children}
    </div>
  );
}

export interface Prop {
  name: string;
  type: string;
  note: string;
}

export function Props({ rows }: { rows: Prop[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="prop-table">
        <thead>
          <tr>
            <th>prop</th>
            <th>type</th>
            <th>notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <code className="keep-case">{r.name}</code>
              </td>
              <td>
                <code className="keep-case text-frenchgrey!">{r.type}</code>
              </td>
              <td className="text-ink/75">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Section({
  id,
  title,
  item,
  lede,
  children,
}: {
  id: string;
  title: string;
  /** Registry item name, for the install line. */
  item?: string;
  lede: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl text-frenchgrey">{title}</h2>
        <p className="max-w-prose text-sm leading-relaxed text-ink/75">
          {lede}
        </p>
      </header>
      {item && <Command>{add(item)}</Command>}
      {children}
    </section>
  );
}
