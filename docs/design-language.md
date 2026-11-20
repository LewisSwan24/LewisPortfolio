# Design language

Decided 2026-11-20. Warm paper and a single terra accent, run on the rules of
Lively Icons, Lewis's own design system. The tokens live at the top of
`src/styles/globals.css`; this file says how to use them.

The repo-root `DESIGN.md` (git-ignored) describes the earlier Claude-inspired
style and no longer applies.

## Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#EFE8DA` | `#141413` | Page |
| `--surface` | `#F7F4EC` | `#1C1C1B` | Cards, inputs, filled panels |
| `--surface-2` | `#E7DFD1` | `#262624` | Quiet fills, hover on borderless controls |
| `--text` | `#161412` | `#F5F5F4` | Titles, primary text |
| `--text-2` | `#4E4840` | `#D0D0CC` | Running text |
| `--text-3` | `#5F584F` | `#A8A8A3` | Labels, metadata, the second half of a heading |
| `--border` | `#9C9182` | `#5C5C58` | Card and divider lines |
| `--border-strong` | `#857C6F` | `#7A7A75` | Controls: buttons, inputs, tool buttons |
| `--rule` | `#D6CDBC` | `#3A3A37` | Hairlines that carry no meaning |
| `--accent` | `#A63F2A` | `#F5F5F4` | The primary action, links, the focus ring. Nothing else |
| `--on-accent` | `#F7F4EC` | `#141413` | Text on the accent |
| `--danger` | `#7A2D1C` | `#FF8A80` | Errors only, always with a word |

Ratios on `--bg`, measured 2026-11-20: text 15.1, text-2 7.4, text-3 5.8,
accent 5.1 (4.7 on `--surface-2`), border-strong 3.4. Dark: text 16.9,
text-2 11.9, text-3 7.7, border-strong 4.3.

- **One accent.** Terra marks what a reader can act on. A tag, a dot, a status
  line or a "current" marker uses `--text` or `--text-3`, never the accent.
- **Dark has no hue.** The accent becomes the brightest grey, so a primary
  action is told apart by its fill and position, not its colour.
- **Diagrams** (`ProjectViz`) draw with `--viz-*` tokens, so they follow the
  theme. Terra marks the one focal path in light; dark is monochrome.

## Type

| Role | Face | Where |
|---|---|---|
| Page title | Shantell Sans 700, Chinese in ZCOOL KuaiLe | The page's one `h1`, nothing else |
| Everything else | Lexend 400 / 600 | Headings, body, buttons, navigation, cards |
| Technical strings | Geist Mono 400 | Dates, versions, file names, eyebrows |

- Two weights, 400 and 600. The title face is the only 700.
- No italics. A two-part heading steps its second half down to `--text-3`.
- Chinese body text falls through to Noto Sans SC, PingFang SC or Microsoft
  YaHei, which are not bundled.

## Shape and depth

- Radii: `--r-xs` 6px tags and badges, `--r-sm` 8px icon buttons and nav
  items, `--r-md` 12px cards, buttons and inputs, `--r-pill` for capsules.
- No shadows, gradients or blur. Layers separate with a 1px line; the sticky
  nav is solid `--bg`.
- Hover deepens the line to `--text`. A filled button gains a 1px ink ring.
- Focus: a 2px `--accent` outline with a 2px offset, everywhere.

## Images

Each listed case has one real cover in `src/lib/project-covers.ts`, used by
the homepage deck and the `/projects` index; a test fails if a listed case has
none. Portrait phones and wide strips letterbox (`fit: "contain"`) rather than
crop. Add a cover only from an image that is of the case, with alt text in
both locales. Cases with screenshots and no drawn diagram (Grassland Iron Tide,
On The Beat) also use the cover at the top of the case page, without the
"concept visual" caption.

## Engineering notes

- `ProjectCoverImage` is a client component used only by `/projects`. The
  homepage renders `next/image` directly; sharing one module between the two
  broke the homepage in `next dev`.
- Under `next dev` the homepage can still throw
  `Cannot read properties of undefined (reading 'call')` from a lazy client
  reference inside `FeaturedDeck`. `next build && next start` renders it
  without error (checked 2026-11-20). Check a homepage change against a
  production build.
