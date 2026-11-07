# Design system — "Embossed Glow"

The visual language shared by Kelly's sites. This is the source of truth for the
components in this registry; when a component and this document disagree, the
component is the bug. Site-specific art direction (the portfolio's desk
photograph, its about-page pyramid, the Wordle League sub-brand) stays in that
site's own DESIGN.md.

## The thesis

**Light passing through frosted glass.** Content sits on translucent panels over
a photograph or an image-rich ground. Interactive things don't look like
buttons; they look like **embossed words with a coloured light glowing behind
them.** That glow is the signature. Everything else stays quiet so it can shine.

## Interactive elements

**Every clickable thing is one of three.** No bare `<button>`, no one-off
`hover:scale-*`, no ad-hoc link colours.

| It reads as…           | Use           | What it is                                            |
| ---------------------- | ------------- | ----------------------------------------------------- |
| a word you can say     | `GlowButton`  | embossed letters, the cube ring revolving behind them |
| a thing you can press  | `GlassButton` | a slab of the panel's glass, the cube ring on its rim |
| a link in running text | `SweepLink`   | letters breathing white→blue, one cube sweep on hover |

**Text links sweep.** `.glow-sweep` is the canonical link: a breathing
white→blue gradient clipped to the letters, a steady blue halo, and on hover or
focus one band of a randomly chosen cube grouping across the word. Hover is the
only trigger. On a `GlowButton`, `sweep` gives a text link-button the same
treatment. Icons can't be swept (the text clip swallows them), so they sit
beside the swept label.

**Somewhere not ready yet is `pending`.** Still a real link, but it rests
white→grey, haloes grey, and sweeps grey the other way. Same shape, so it
belongs to the set; wrong colour and direction, so it reads as not quite on.

**Every icon is `--sweep-base`, the pale blue.** Icon-only controls are
`GlowButton variant="icon"` on every surface: solid pale blue, white on hover,
the same halo as the links. Icons are never azure and never a colour of their
own. This is the one variant chosen by _what the element is_.

### Variant selection is by surface, not by mood

| Surface                        | GlowButton variant | GlassButton tone |
| ------------------------------ | ------------------ | ---------------- |
| Dark / photographic            | `warm` (default)   | `dark`           |
| Very dark, needs more lift     | `dark`             | `dark`           |
| Light / frosted glass / a page | `azure`            | `light`          |
| Any surface, icon-only control | `icon`             | —                |

Pick it from the background the element actually sits on. Never mix warm and
azure on one surface. A new surface gets a new row here.

## Colour

- **The glow (Rubik's cube):** always three colours, white plus two cube
  colours, cycling the four top-face corner triads: white+orange+blue →
  white+orange+green → white+green+red → white+red+blue (`glowCube`), while the
  ring revolves (`glowSpin`). Orange `#ff5800`, green `#009b48`, red `#c41e3a`,
  blue `#0051ba`. Every control shares this one ring.
- **Warm identity:** letters `rgb(163 151 141)`. Accent `--frenchgrey #bbb9be`
  for titles and quiet chrome.
- **Azure:** letters `rgb(125 185 240)`, hover `rgb(170 210 250)` — tints the
  glyphs only; the halo stays the cube ring.
- **Icon / link blue:** `--sweep-base rgb(165 197 222)`; halo
  `drop-shadow(0 0 8px rgb(130 175 225 / 0.45))`, lifting to
  `0 0 13px rgb(150 190 235 / 0.8)` on hover.

The conic gradients and colour-mixes that paint the glow name `--glow-angle`,
`--glow-a`, `--glow-b` and `--breathe` directly. Routing them through an
intermediate custom property stops the browser repainting, and the ring sits
frozen.

## Typography

**One monospace stack, everywhere, all lower case** (the `typography` item).
With one typewriter face and no capitals, pages read as something typed rather
than something published. Lower case is a CSS transform, not an edit to the
strings, so sentence case survives for screen readers and search; `.keep-case`
is the escape hatch for code and names. Tab titles can't be reached from CSS —
lower-case them in source.

Mono is wide and slow, so **prose stays short.** Titles `text-2xl`+, body
`text-sm`–`lg`, muted text at `/70`–`/60`. Weight `600` on labels and buttons is
the heaviest thing here.

## Glass

The recurring surface is `GlassPanel`. Its edge is layered and the layers are
the point — reading inward: a blue bloom, a 2px stroke breathing white→blue, a
**clear untinted strip** where the fill drops away and the background shows
straight through, then the frosted interior. The tint lives on the panel, never
on the layer spanning the strip, or the strip stops being one.

- `floating` (default): rounded, the full edge.
- `header`: the same frost, top corners squared, flush to the top.
- `footer`: full-bleed near-black frost with a hairline, no edge layer.
- `edge="left" | "right"`: a floating panel joined to the screen edge — outer
  corners square and that side's stroke drops, so nothing draws a boundary where
  the panel leaves the screen.

The material is available without the component: `.glass-edge` (edge only) and
`.glass-dark` (a near-black fill drawn inward, for a card on a raw photograph or
in a box that clips — keep padding larger than `--glass-strip`).

**Glass needs something behind it.** Over a flat colour it's a faint box. Give
the page a photograph or a lit, image-rich ground.

`GlassButton` is the same material at button scale, drawn inward (rim, strip,
frost) with the cube ring as its rim. `SearchField` takes the panel's quiet edge
and none of the cube colours — it's written on, not pressed — and holds the
stroke blue while focused.

## Motion

- The ambient revolve is always on; hover/focus brightens and lifts. Don't
  re-invent it per component.
- One-shot load flourishes are rationed: one orchestrated moment per page.
- **Scroll motion is entrance-only** (`Reveal`): content arrives once and stays
  put. No scroll-linked wobble, no re-animating on the way back up.
- **`prefers-reduced-motion` is honoured** by every animation; anything new
  needs its own off-switch.

## Quality floor

- Responsive to phone width.
- Visible keyboard focus: the glow blooms on `:focus-visible`, and anything
  whose text is transparent (swept links, glass) also gets a real outline.
- Every icon-only control has an `aria-label`.
- Print stays legible: glows drop, text goes dark ink, glass flattens to white.
  New interactive styles include a print fallback.
