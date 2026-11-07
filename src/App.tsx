import { useState } from 'react';
import { GlassButton } from '@registry/ui/glass-button';
import { GlassPanel } from '@registry/ui/glass-panel';
import { GlowButton } from '@registry/ui/glow-button';
import { Reveal } from '@registry/ui/reveal';
import { SearchField } from '@registry/ui/search-field';
import { SweepLink } from '@registry/ui/sweep-link';
import {
  ADD_REGISTRY,
  Code,
  Command,
  Props,
  REGISTRY_URL,
  Section,
  Stage,
  add,
} from './docs';
import { ArrowIcon, DownloadIcon, GithubIcon } from './icons';

const NAV = [
  ['install', 'install'],
  ['for-ai', 'for ai'],
  ['sweep-link', 'sweep link'],
  ['glow-button', 'glow button'],
  ['glass-panel', 'glass panel'],
  ['glass-button', 'glass button'],
  ['search-field', 'search field'],
  ['reveal', 'reveal'],
  ['typography', 'typography'],
] as const;

const AI_PROMPT = `Add kneuroth-ui to this React project. It is a shadcn registry: the CLI copies component source into the project.

1. If the project has no components.json, run: npx shadcn@latest init
2. Register the namespace once:
   ${ADD_REGISTRY}
3. Add what is needed, or everything:
   ${add('all')}
4. Import components from "@/components/ui/<file>" (glow-button, glass-button, glass-panel, search-field, sweep-link, reveal). Each component imports its own CSS; do not import component CSS by hand.
5. For the site-wide monospace, lower-case voice, import "@/components/ui/kneuroth-type.css" once in the app entry or root layout. Wrap code samples and names that must keep their capitals in className="keep-case".

Rules:
- Every clickable element is a GlowButton (a word with light behind it), a GlassButton (an object you press) or a SweepLink (a plain text link). No bare <button> or one-off hover styles.
- GlowButton variant comes from the surface: "warm" on dark/photographic ground, "azure" on frosted glass, "dark" on very dark ground. Every icon-only button uses variant="icon" and must set aria-label.
- GlassButton tone: "light" on a page, "dark" on a raw photograph.
- Glass only reads over an image or busy background; over a flat colour it is a faint box.
- Reveal needs an ancestor with overflow-x: clip.
- Every animation honours prefers-reduced-motion and has a print fallback; keep it that way when editing.

Full reference: https://kneuroth.github.io/kneuroth-ui/llms.txt`;

function Header() {
  return (
    <div className="sticky top-0 z-10 px-3 sm:px-6">
      <GlassPanel
        variant="header"
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3"
      >
        <a href="#top" className="mr-auto text-lg text-frenchgrey no-underline">
          kneuroth-ui
        </a>
        <nav
          aria-label="sections"
          className="hidden flex-wrap gap-x-4 gap-y-1 text-sm md:flex"
        >
          {NAV.slice(2, 8).map(([id, label]) => (
            <SweepLink key={id} href={`#${id}`}>
              {label}
            </SweepLink>
          ))}
        </nav>
        <GlowButton
          variant="icon"
          rounded
          href="https://github.com/kneuroth/kneuroth-ui"
          aria-label="source on github"
          icon={<GithubIcon />}
        />
      </GlassPanel>
    </div>
  );
}

function Intro() {
  return (
    <section id="top" className="flex flex-col gap-6 pt-10">
      <h1 className="text-3xl text-frenchgrey sm:text-4xl">kneuroth-ui</h1>
      <p className="max-w-prose leading-relaxed text-ink/80">
        The components behind{' '}
        <SweepLink href="https://kneuroth.github.io/kneuroth/">
          kneuroth.github.io
        </SweepLink>
        , as a shadcn registry. Light through frosted glass: controls are
        embossed words with a cube-coloured glow behind them, and content sits
        on translucent panels.
      </p>
      <p className="max-w-prose text-sm leading-relaxed text-ink/65">
        Nothing is installed from npm. The shadcn cli copies each component's
        source into your project, where it's yours to read and change. Plain css
        and react, no other dependencies.
      </p>
      <nav
        aria-label="contents"
        className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
      >
        {NAV.map(([id, label]) => (
          <SweepLink key={id} href={`#${id}`}>
            {label}
          </SweepLink>
        ))}
      </nav>
    </section>
  );
}

function Install() {
  return (
    <Section
      id="install"
      title="install"
      lede={
        <>
          In a react project already set up for shadcn — if it isn't, run{' '}
          <code className="keep-case">npx shadcn@latest init</code> first.
          Register the namespace once per project, then add items by name.
        </>
      }
    >
      <ol className="flex list-none flex-col gap-4 p-0">
        <li className="flex flex-col gap-2">
          <span className="text-sm text-frenchgrey">
            1. register the registry
          </span>
          <Command>{ADD_REGISTRY}</Command>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-sm text-frenchgrey">
            2. add a component, or all of them
          </span>
          <Command>{add('glow-button')}</Command>
          <Command>{add('all')}</Command>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-sm text-frenchgrey">3. use it</span>
          <Code>{`import { GlowButton } from '@/components/ui/glow-button';

<GlowButton variant="azure">hello</GlowButton>`}</Code>
        </li>
      </ol>
      <p className="max-w-prose text-sm leading-relaxed text-ink/65">
        Files land side by side in{' '}
        <code className="keep-case">components/ui/</code>, css included. To pick
        up a fix later, re-run the add with{' '}
        <code className="keep-case">--overwrite</code>, or{' '}
        <code className="keep-case">--diff</code> first to see what changed. The
        raw item json is at{' '}
        <SweepLink className="keep-case" href={`${REGISTRY_URL}/registry.json`}>
          r/registry.json
        </SweepLink>
        .
      </p>
    </Section>
  );
}

function ForAi() {
  return (
    <Section
      id="for-ai"
      title="for ai agents"
      lede={
        <>
          Paste this into a coding agent working in the project, or point it at{' '}
          <SweepLink className="keep-case" href="llms.txt">
            llms.txt
          </SweepLink>
          , which has the same setup plus every component's props and rules.
        </>
      }
    >
      <Code label="copy prompt">{AI_PROMPT}</Code>
    </Section>
  );
}

function SweepLinkDocs() {
  return (
    <Section
      id="sweep-link"
      title="sweep link"
      item="glow-sweep"
      lede="The canonical text link. Letters rest as a breathing white→blue gradient; hover sends one band of cube colour across them. pending marks somewhere not ready yet: grey, swept backwards."
    >
      <Stage>
        <SweepLink href="#sweep-link">portfolio</SweepLink>
        <SweepLink href="#sweep-link">about</SweepLink>
        <SweepLink href="#sweep-link" pending>
          blog
        </SweepLink>
      </Stage>
      <Code>{`import { SweepLink } from '@/components/ui/sweep-link';

<SweepLink href="/portfolio">portfolio</SweepLink>
<SweepLink href="/blog" pending>blog</SweepLink>

// a router's own link: the class + the hook
const ref = useRef(null);
useGlowSweep(ref);
<Link ref={ref} className="glow-sweep" to="/about">about</Link>`}</Code>
      <Props
        rows={[
          {
            name: 'pending',
            type: 'boolean',
            note: 'not ready yet — rests and sweeps grey.',
          },
          {
            name: '...a',
            type: 'anchor props',
            note: 'text only; an icon inside is swallowed by the text clip.',
          },
        ]}
      />
    </Section>
  );
}

function GlowButtonDocs() {
  return (
    <Section
      id="glow-button"
      title="glow button"
      item="glow-button"
      lede="A control that reads as a word: embossed letters with a revolving cube-colour ring behind them. Pick the variant from the surface it sits on; every icon-only button is the icon variant, whatever the surface."
    >
      <Stage>
        <GlowButton>warm</GlowButton>
        <GlowButton variant="dark">dark</GlowButton>
        <GlowButton
          variant="icon"
          aria-label="download"
          icon={<DownloadIcon />}
        />
        <GlowButton sweep href="#glow-button" icon={<ArrowIcon />}>
          swept link
        </GlowButton>
      </Stage>
      <Stage ground="page">
        <GlassPanel className="flex flex-wrap items-center gap-4 px-6 py-4">
          <GlowButton variant="azure">azure on glass</GlowButton>
          <GlowButton
            variant="icon"
            rounded
            aria-label="github"
            icon={<GithubIcon />}
          />
        </GlassPanel>
      </Stage>
      <Code>{`import { GlowButton } from '@/components/ui/glow-button';

<GlowButton onClick={save}>save</GlowButton>
<GlowButton variant="azure">on glass</GlowButton>
<GlowButton variant="icon" aria-label="download" icon={<DownloadIcon />} />
<GlowButton sweep href="/resume.pdf" icon={<ArrowIcon />}>resume</GlowButton>`}</Code>
      <Props
        rows={[
          {
            name: 'variant',
            type: "'warm' | 'dark' | 'azure' | 'icon'",
            note: 'warm on dark or photographic ground, dark on very dark, azure on frosted glass; icon for every icon-only button.',
          },
          {
            name: 'icon',
            type: 'ReactNode',
            note: 'an inline svg using currentColor. no children → icon-only; set aria-label.',
          },
          {
            name: 'sweep',
            type: 'boolean',
            note: 'text link-buttons: the letter sweep instead of the ring.',
          },
          {
            name: 'pending',
            type: 'boolean',
            note: 'with sweep: not ready yet.',
          },
          {
            name: 'href',
            type: 'string',
            note: 'renders an <a> instead of a <button>.',
          },
          { name: 'size', type: "'sm' | 'md' | 'lg'", note: 'default md.' },
          { name: 'rounded', type: 'boolean', note: 'pill corners.' },
        ]}
      />
    </Section>
  );
}

function GlassPanelDocs() {
  return (
    <Section
      id="glass-panel"
      title="glass panel"
      item="glass-panel"
      lede="Every frosted surface. Read from the edge inward: blue bloom, breathing stroke, a clear strip where the fill stops, then the frost. It needs something behind it to blur."
    >
      <Stage>
        <GlassPanel className="max-w-xs px-6 py-5 text-sm leading-relaxed">
          floating: the default. set padding and width with your own classes.
        </GlassPanel>
      </Stage>
      <div
        className="stage flex-col items-stretch! gap-0! p-0!"
        data-ground="photo"
      >
        <GlassPanel variant="header" className="mx-6 px-5 py-3 text-sm">
          header — pulled down from the top
        </GlassPanel>
        <div className="flex flex-1 items-center py-6">
          <GlassPanel edge="left" className="max-w-[70%] px-6 py-4 text-sm">
            edge="left" — joined to the screen edge
          </GlassPanel>
        </div>
        <GlassPanel variant="footer" className="px-6 py-3 text-sm">
          footer — the dark bar
        </GlassPanel>
      </div>
      <Code>{`import { GlassPanel } from '@/components/ui/glass-panel';

<GlassPanel className="max-w-prose p-6">…</GlassPanel>
<GlassPanel variant="header" className="mx-4 px-5 py-3">…</GlassPanel>
<GlassPanel edge="left" className="px-6 py-4">…</GlassPanel>
<GlassPanel variant="footer" className="px-6 py-3">…</GlassPanel>

// the material without the component (from the glass item):
<div className="glass-edge glass-dark rounded-xl p-4">…</div>`}</Code>
      <Props
        rows={[
          {
            name: 'variant',
            type: "'floating' | 'header' | 'footer'",
            note: 'header renders <header>, footer renders <footer>.',
          },
          {
            name: 'edge',
            type: "'none' | 'left' | 'right'",
            note: 'floating only: squares the outer corners and drops that side’s stroke. you put it against the edge.',
          },
          {
            name: 'as',
            type: 'ElementType',
            note: 'override the element (section, aside…).',
          },
        ]}
      />
    </Section>
  );
}

function GlassButtonDocs() {
  return (
    <Section
      id="glass-button"
      title="glass button"
      item="glass-button"
      lede="A control that reads as an object: a pressable slab of the panel's glass, with the cube colours revolving on its rim instead of behind it. Tone comes from the ground."
    >
      <Stage ground="page">
        <GlassButton>light</GlassButton>
        <GlassButton href="#glass-button">
          as a link <ArrowIcon />
        </GlassButton>
        <GlassButton disabled>disabled</GlassButton>
      </Stage>
      <Stage>
        <GlassButton tone="dark">dark, on a photograph</GlassButton>
      </Stage>
      <Code>{`import { GlassButton } from '@/components/ui/glass-button';

<GlassButton onClick={start}>start</GlassButton>
<GlassButton tone="dark" href="/portfolio">portfolio <ArrowIcon /></GlassButton>

// knobs, as css variables on your own class:
.big { --glass-radius: 1.5rem; --glass-strip: 7px; }`}</Code>
      <Props
        rows={[
          {
            name: 'tone',
            type: "'light' | 'dark'",
            note: 'light on a page, dark on a raw photograph.',
          },
          {
            name: 'href',
            type: 'string',
            note: 'renders an <a> instead of a <button>.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            note: 'label, icon, or both. icon-only needs aria-label.',
          },
          {
            name: '--glass-radius / -rim / -strip',
            type: 'css vars',
            note: 'set radius here, not border-radius, or the fill stops following the corners.',
          },
        ]}
      />
    </Section>
  );
}

function SearchFieldDocs() {
  const [q, setQ] = useState('');
  return (
    <Section
      id="search-field"
      title="search field"
      item="search-field"
      lede="Glass you type on. It takes the panel's quiet edge and no cube colours; focus holds the stroke blue. Escape clears."
    >
      <Stage ground="page">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <SearchField
            value={q}
            onValueChange={setQ}
            placeholder="search projects"
            aria-label="search projects"
          />
          <p className="keep-case min-h-5 px-1 text-xs text-ink/70">
            {q ? `query: "${q}"` : ' '}
          </p>
        </div>
      </Stage>
      <Code>{`import { SearchField } from '@/components/ui/search-field';

const [q, setQ] = useState('');
<SearchField value={q} onValueChange={setQ} aria-label="search projects" />

// or uncontrolled
<SearchField defaultValue="" onValueChange={console.log} />`}</Code>
      <Props
        rows={[
          {
            name: 'value / onValueChange',
            type: 'string / (v) => void',
            note: 'controlled. omit value for uncontrolled (defaultValue).',
          },
          {
            name: 'aria-label',
            type: 'string',
            note: "defaults to 'search'; set it when the placeholder doesn't say what is searched.",
          },
          {
            name: 'className',
            type: 'string',
            note: 'goes on the pane (width, margin). other props go to the input.',
          },
          {
            name: '--search-strip / -radius',
            type: 'css vars',
            note: 'the clear strip and the corner.',
          },
        ]}
      />
    </Section>
  );
}

function RevealDocs() {
  return (
    <Section
      id="reveal"
      title="reveal"
      item="reveal"
      lede="Flies its child in from the side the first time it scrolls into view, then stays put. The wrapper is watched and never moves; the child travels. An ancestor needs overflow-x: clip."
    >
      <div
        className="stage flex-col! items-stretch! gap-4! overflow-x-clip"
        data-ground="photo"
      >
        <Reveal from="left">
          <GlassPanel className="max-w-xs px-5 py-3 text-sm">
            from the left
          </GlassPanel>
        </Reveal>
        <Reveal from="right" className="flex justify-end">
          <GlassPanel className="max-w-xs px-5 py-3 text-sm">
            from the right
          </GlassPanel>
        </Reveal>
      </div>
      <Code>{`import { Reveal } from '@/components/ui/reveal';

<main className="overflow-x-clip">
  <Reveal from="left"><Card /></Reveal>
  <Reveal from="right"><Card /></Reveal>
</main>

// or the hook on your own wrapper (add the .reveal class + data attrs)
const revealed = useReveal(ref);`}</Code>
      <Props
        rows={[
          {
            name: 'from',
            type: "'left' | 'right'",
            note: 'the edge it travels in from. default left.',
          },
          {
            name: 'children',
            type: 'one element',
            note: 'the thing that moves.',
          },
        ]}
      />
    </Section>
  );
}

function TypographyDocs() {
  return (
    <Section
      id="typography"
      title="typography"
      item="typography"
      lede="The voice: one monospace stack, everything lower case. It styles the whole page, so the components don't pull it in — import it once at the root."
    >
      <Stage ground="dark">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-xl">Written In Sentence Case</span>
          <span className="keep-case text-sm text-ink/70">
            .keep-case Holds Its Capitals
          </span>
        </div>
      </Stage>
      <Code>{`// main.tsx, or app/layout.tsx
import '@/components/ui/kneuroth-type.css';

<code className="keep-case">useGlowSweep</code>`}</Code>
      <p className="max-w-prose text-sm leading-relaxed text-ink/65">
        Lower case is a css transform, so sentence case stays in the dom for
        screen readers and search. Browser-tab titles can't be reached from css
        — write those lower case in source. Mono is slow to read; keep prose
        short.
      </p>
    </Section>
  );
}

function Footer() {
  return (
    <GlassPanel variant="footer" className="mt-24 px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 text-sm text-ink/60">
        <span>kneuroth-ui — kelly neuroth</span>
        <div className="flex gap-5">
          <SweepLink href="llms.txt">llms.txt</SweepLink>
          <SweepLink href="https://kneuroth.github.io/kneuroth/">
            kneuroth.github.io
          </SweepLink>
        </div>
      </div>
    </GlassPanel>
  );
}

export function App() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 sm:px-6">
        <Intro />
        <Install />
        <ForAi />
        <SweepLinkDocs />
        <GlowButtonDocs />
        <GlassPanelDocs />
        <GlassButtonDocs />
        <SearchFieldDocs />
        <RevealDocs />
        <TypographyDocs />
      </main>
      <Footer />
    </>
  );
}
