# Public Portfolio Design System

## Design thesis

The public portfolio is an architectural project dossier: warm paper, ink-green typography, thin rules, documentary imagery, and precise metadata make complex systems work feel legible. Hierarchy comes from scale, proportion, whitespace, and evidence—not decorative chrome. The voice is calm, structured, mature, and direct.

This document governs the public portfolio only. The existing `/admin` CMS is an operational interface outside this visual system; its controls and utility styling should not be used as public-site precedents.

## Color

All public colors originate in `app/globals.css`.

| Token | Value | Intended role |
| --- | --- | --- |
| `--canvas` | `#f5f1e8` | Warm page ground, contact, footer, and scrollbar track |
| `--paper` | `#fffdf8` | Primary editorial sections, header, and project cards |
| `--surface` | `#eee8dc` | Secondary warm surface when a quiet tonal step is needed |
| `--mist` | `#e7ede4` | Cool-neutral tags, image placeholders, and gallery grounds |
| `--sage` | `#ccd8c8` | Selection highlight and restrained soft-green emphasis |
| `--sand` | `#e9dbc2` | Warm highlight on the dark capability map |
| `--ink` | `#1b211d` | Primary text |
| `--ink-soft` | `#4d5751` | Body copy and supporting descriptions |
| `--ink-muted` | `#778078` | Eyebrows, labels, and low-priority metadata |
| `--accent` | `#3f7052` | Links, icons, rules, and interactive emphasis |
| `--accent-strong` | `#173f2a` | Primary actions, dark section ground, and strongest brand emphasis |
| `--line` | `rgb(23 63 42 / 14%)` | Default dividers and frames |
| `--line-strong` | `rgb(23 63 42 / 27%)` | Active, structural, or interactive dividers |
| `--focus` | `#2f6e49` | Visible keyboard-focus outline |

Use white only on `--accent-strong` and for its subtle internal borders. Prefer tokenized tonal changes and fine rules to extra colors, shadows, gradients, or translucent panels.

## Typography

- Archivo is the Latin brand face, loaded through `next/font` and exposed as `--font-archivo` with `display: swap`.
- Body text uses Archivo followed by `Aptos`, `Segoe UI`, `Noto Sans TC`, `PingFang TC`, `Microsoft JhengHei`, and generic sans-serif. These CJK fallbacks are part of the design, not an accident.
- Display copy uses `.display-type`: Archivo with display-oriented system fallbacks. Keep Chinese display text in a clean sans family and test line breaks in both languages.
- Headlines are compact, semibold, and tightly tracked (`-.03em` to `-.055em`) with fluid `clamp()` sizing. Body copy is usually `15–16px`, `1.75–2` line-height. Metadata is `10–11px`, semibold, uppercase where appropriate, with `.08–.14em` tracking.
- Keep prose readable: project narrative paragraphs stop near `68ch`; supporting copy generally stops near `52–64ch`. Do not center long-form text.

## Layout and spacing

- `.page-shell` is the universal container: maximum `1480px`, with `1.25rem` side gutters by default and `1rem` below `768px`.
- `.section-space` supplies the main vertical rhythm: `clamp(5.5rem, 10vw, 10rem)`, fixed at `5.5rem` on mobile.
- At `1024px` and above, major editorial compositions use a 12-column grid. Common splits are `7/5` for Hero, `3/5/4` for About, `8/4` for Contact and case mastheads, and `3/8` for case-story navigation/content.
- Reuse the existing spacing cadence: `1.25rem` card gaps, `3–4rem` heading-to-content separation, and `5–7rem` between internal editorial groups. Section edges are marked by rules, not containers nested inside containers.
- The sticky header is `72px` high. In-page sections use `scroll-mt-24` so anchored headings clear it. Interactive targets remain at least `44px` high or wide.

## Section composition

- **Header:** a compact sticky index with the YL wordmark, identity lockup, active navigation, language control, and restrained contact action. Its warm translucent paper surface keeps context without becoming a floating pill.
- **Hero:** a viewport-height editorial title field paired with a tall `4:5` portrait. A faint specification grid and offset frame suggest system planning; they remain background texture, never content.
- **About:** an editorial `3/5/4` text composition followed by ruled trait rows. About and traits are not cards.
- **Core Skills:** one dark, continuous capability-map system. Individual capabilities are segments of the same ruled grid, not independent cards; numbering, icon, title, and skills share one visual grammar.
- **Selected Projects:** the deliberate card-based section. Project evidence benefits from a repeatable, scannable image-and-metadata unit.
- **Contact:** an editorial `8/4` invitation with a ruled three-channel contact index. It remains open and typographic, not a CTA card or form panel.
- **Project archive:** an editorial masthead and ruled text filters lead into the project grid. The detail page uses a large title, factual metadata, documentary cover, readable Markdown story, and generously spaced gallery evidence.
- **Footer:** a quiet ruled close with copyright and optional square social actions.

Cards are intentionally reserved for project cases. Do not convert About, Contact, traits, or section headings into rounded feature cards. Core Skills must continue to read as one capability map, even when its columns stack.

## Project card anatomy

Each project card is a full-height evidence unit with:

1. A linked `4:3` cover image or YL fallback, plus a small sequential case label.
2. A metadata row for category and period.
3. A linked display title and short description, clamped to three lines.
4. Up to three compact tags on `--mist`.
5. A bottom-aligned, ruled “view case” action with directional arrow.

Cards use square corners, a fine `--line` border, `--paper`, and a low green-tinted shadow. Hover/focus may lift the card `5px`, strengthen the border/shadow, and gently scale the image; never hide essential information behind hover.

## Responsive behavior

- **Mobile (`<768px`):** single-column reading order, `1rem` shell gutters, fixed `5.5rem` section spacing, collapsed navigation, stacked editorial columns, and one project card per row.
- **Tablet (`768–1023px`):** two project-card columns and two capability-map columns. Preserve generous line lengths and avoid prematurely forcing 12-column compositions.
- **Desktop (`>=1024px`):** the homepage project grid is four columns and the capability map is four columns; 12-column editorial layouts activate. This `1 / 2 / 4` progression is the expected featured-case rhythm.
- Wide layouts may increase breathing room, but content remains capped at `1480px`. Project-detail prose stays narrow even when imagery spans wide.

## Interaction, motion, and accessibility

- Motion is restrained and informative: underlines draw, arrows shift a few pixels, project cards lift, images scale to about `1.025`, and the portrait enters once. Typical interaction timing is `200–300ms`; image/entrance motion may extend to `650–700ms`, using the existing `cubic-bezier(.16, 1, .3, 1)` where appropriate.
- Honor `prefers-reduced-motion`: remove smooth scrolling and reduce transitions/animations to effectively instantaneous behavior. Do not make comprehension depend on motion.
- Preserve the `2px` `--focus` focus-visible outline with `4px` offset. Hover styling must have a focus equivalent.
- Maintain semantic landmarks, headings, lists, definitions, figures, and links/buttons. Keep menu state, language state, and filters programmatically exposed (`aria-expanded`, `aria-pressed`, and live filter results).
- Maintain `44px` minimum targets, useful link labels, descriptive CMS alt text, keyboard operation, sufficient contrast, and a `320px` minimum layout without horizontal overflow. Decorative marks are `aria-hidden`.
- Use the existing Lucide-style line icon language. Icons support labels; they do not replace them unless an accessible name is supplied.

## Bilingual and CMS content

- Public routes and content support Traditional Chinese (`zh-TW`) and English (`en`). Every editable public text field that varies by language keeps its `_zh` / `_en` pair; `localize()` provides the established Chinese fallback when English is empty.
- Keep structural UI terms in `lib/dictionary.ts`. Keep portfolio content, imagery, alt text, ordering, visibility, and project metadata in the CMS-backed data model—not duplicated in presentation components.
- Preserve intentional newlines in Hero copy and blank-line paragraph breaks in About copy. Project narratives are Markdown; use semantic `h2`/`h3`, short paragraphs, and lists rather than manual visual formatting.
- Titles and descriptions should be concise enough to survive both language lengths. Never assume English and Chinese will wrap at the same point; test both before shipping.
- Project slugs are language-independent and stable. Respect `published`, `featured`, `is_active`, and `sort_order`; homepage features remain capped at four. Categories, periods, and tags are plain visible metadata and must be sanitized.
- Image records require meaningful localized alt text. Gallery order should support the narrative, and images should demonstrate project evidence rather than serve as generic decoration.

## Anti-patterns to avoid

- Generic SaaS/dashboard styling: rounded cards everywhere, pill navigation, glass panels, metric widgets, and dense control surfaces.
- Turning every content group into a card, especially About, traits, Core Skills, or Contact.
- Unapproved KPI counters, process timelines, testimonials, logos, claims, or fabricated outcomes.
- Excessive shadows, gradients, border radii, color accents, ornamental icons, or animation.
- Centered long-form copy, full-width prose, weak metadata hierarchy, or arbitrary breakpoints outside the established system.
- Hardcoded public content that bypasses the bilingual CMS, untranslated interface strings, or English layouts that rely on Chinese line length.
- Hover-only actions, invisible focus, undersized targets, low-contrast muted text, missing alt text, or motion that ignores user preferences.
- Applying admin CMS components or admin styling to the public portfolio.
