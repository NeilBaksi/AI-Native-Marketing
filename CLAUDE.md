# CLAUDE.md — The AI-Native Marketing Handbook

## Precedence

Read `docs/BRIEF-AMENDMENTS.md` before treating anything in `docs/00_BUILD_PROMPT.md` as current. §5 (stack), §8 (palette/type), §9.2 (diagram system), §11 (perf budget), §12 (CSP), §7/§14 (content model) are all superseded there. The brief's information architecture (`docs/information-architecture.md`, the 59-page tree) and pedagogy rules (§3.4, §7.1 page shapes) still stand.

`docs/` (brief, both appendices, ADRs, design direction, IA, open questions) and `.impeccable.md` are gitignored — read them locally, never assume a worker agent without local filesystem access has seen them.

## Stack

Vite 8 + React 19 + TypeScript + Tailwind v3 + framer-motion + react-router-dom (HashRouter) + lucide-react + clsx. Mirrors `../five-days-of-product` and `../PromptToolkit` — when unsure how to build something, check those two first.

```
npm run dev        # http://localhost:5960/AI-Native-Marketing/
npm run build       # tsc -b && vite build && node scripts/check-content.mjs
npm run typecheck
```

## Content rules

- **Content is prose in MDX + facts in the typed registry** (`src/data/facts.ts`) — never hard-code an unregistered stat or an unmarked company example. Every `Fact` carries a `Provenance` (`verified` / `course` / `synthetic`); TypeScript refuses an incomplete one.
- Never more than 2 paragraphs before a visual interrupt (diagram, callout, example, table, quote). `check-content.mjs` fails the build on 3+ in a row.
- Collapsed (accordion/tab) content is elaboration, never load-bearing — a chapter must teach its idea completely with everything shut.
- Diagrams: build the one the chapter needs. Generalise into a `variant`-based form component only on the *second* diagram that wants the same shape (rule of two) — don't build primitives speculatively. Every diagram carries `d` (D-number), `caption`, and `alt` (a prose equivalent for screen readers), via `<Figure>`.

## Design

Ink & Ember palette, **light mode only** — no dark-mode work without a fresh sign-off. One easing constant everywhere: `[0.16, 1, 0.3, 1]`. `ember` (`#C2410C`) fails AA at body-text size on `surface` — use `ember-deep` for small accent text.

## Working agreement

**Never commit or push without Neil explicitly saying so**, even mid-task. Everything stays in the working tree until then.
