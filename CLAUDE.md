# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

Kelly Neuroth's UI library: the design-system components from her portfolio site
(`../kneuroth`, Angular), rebuilt in React and distributed as a **shadcn
registry** so every new site can pull them. The repo is two things at once:

- **The registry** — `registry.json` + the source under `registry/kneuroth/ui/`.
  `shadcn build` turns it into `public/r/*.json`.
- **The docs page** — a small Vite + React + Tailwind 4 app in `src/` that shows
  each component and how to install it. It imports the registry source directly
  (`@registry/ui/...`), so it is the library's first real consumer.

Deployed to GitHub Pages at https://kneuroth.github.io/kneuroth-ui/ (Vite
`base: '/kneuroth-ui/'`). Consumers register
`@kneuroth=https://kneuroth.github.io/kneuroth-ui/r/{name}.json`.

The visual rules are in `DESIGN.md` — read it before changing a component.

## Commands

pnpm only (`pnpm-lock.yaml`).

```bash
pnpm dev              # docs page
pnpm build            # registry:build + tsc -b + vite build → dist/
pnpm registry:build   # shadcn build --output public/r (gitignored output)
npx shadcn registry validate
npx prettier --write "registry/**/*.{css,ts,tsx}" "src/**/*.{css,ts,tsx}"
```

## How the registry is laid out — and why

- **Every file is `registry:ui` in one flat folder.** shadcn installs all
  `registry:ui` files into the consumer's `ui` alias directory, so files import
  each other relatively (`./kn-utils`, `./glass.css`) and those paths are
  identical here and there. Don't split into `hooks/` / `lib/` — the relative
  imports would break on install.
- **Each component imports its own CSS**, which `@import`s `kneuroth.css`.
  Consumers never import component CSS by hand. The one exception is
  `kneuroth-type.css` (typography) — it styles the whole page, so it's imported
  once at the app root.
- **Component rules live in `@layer components`**, and `kneuroth.css` declares
  Tailwind's layer order (`theme, base, components, utilities`). That keeps
  preflight below the components and utilities above them, so a `className` on
  any component wins. Keep new rules inside the layer. `@property` and the
  shared keyframes stay unlayered in `kneuroth.css`.
- **shadcn strips a CSS file's leading comment.** Files whose first line isn't
  an `@import` start with `@charset "UTF-8";` (legitimate: they contain
  non-ASCII) so the header comment survives install.
- **Knob custom properties are declared under `:where()`** so a caller's class
  always beats the defaults.
- **No runtime deps.** `cx` / `mergeRefs` / `useGlowDelay` in `kn-utils.ts`
  stand in for clsx and friends. Keep it that way unless something is truly
  needed (then add it to the item's `dependencies`).
- **SSR-safe.** Components carry `'use client'` (the CLI drops it for non-RSC
  consumers). Anything random (the glow phase) is set after mount, never
  rendered, so it can't mismatch on hydration.
- `registryDependencies` use the `@kneuroth/<name>` namespace.

## Adding or changing a component

1. Source in `registry/kneuroth/ui/` (`.tsx` + `.css`), React 19 (ref as a prop,
   no `forwardRef`).
2. An entry in `registry.json` (files, `registryDependencies`, description).
3. A section in `src/App.tsx` — minimal preview, usage code, props — and the nav
   list.
4. The component's entry in `public/llms.txt`.
5. `pnpm build`, then test a real install: serve `public/` locally, point a
   scratch project's `@kneuroth` registry at it, `npx shadcn add @kneuroth/all`.
   Installed files should be byte-identical to the source.

## Conventions

- Prettier: single quotes, 80 cols, `proseWrap: always`.
- Every interactive style needs a `prefers-reduced-motion` off-switch and a
  print fallback.
- Docs copy is short and plain (it's set in mono), lower case by the site's own
  transform; code, commands and tables wear `.keep-case`.
