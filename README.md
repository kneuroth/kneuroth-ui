# kneuroth-ui

The "embossed glow" components behind
[kneuroth.github.io](https://kneuroth.github.io/kneuroth/), as a
[shadcn registry](https://ui.shadcn.com/docs/registry). React 19 and plain CSS,
no runtime dependencies.

Docs: https://kneuroth.github.io/kneuroth-ui/ · for agents:
[`llms.txt`](https://kneuroth.github.io/kneuroth-ui/llms.txt)

## Use it in a project

```bash
# once per project (needs a shadcn components.json — `npx shadcn@latest init`)
npx shadcn@latest registry add @kneuroth=https://kneuroth.github.io/kneuroth-ui/r/{name}.json

# then by name, or everything
npx shadcn@latest add @kneuroth/glow-button
npx shadcn@latest add @kneuroth/all
```

Files land side by side in `components/ui/`, CSS included. To pick up a fix,
re-run the add with `--overwrite` (or `--diff` first).

## Work on it

```bash
pnpm install
pnpm dev              # docs page at http://localhost:5173/kneuroth-ui/
pnpm build            # registry JSON → public/r, typecheck, bundle → dist/
pnpm registry:build   # just the registry JSON
```

Pushing to `master` deploys to GitHub Pages (`.github/workflows/deploy.yml`).
