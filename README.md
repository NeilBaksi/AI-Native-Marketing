# The AI-Native Marketing Handbook

A personal teaching site: a field guide to the Intelligent Marketing Operating
System (I-MOS) — for a marketer who's never touched AI, an engineer who's never
touched marketing, a student, or a CMO.

Live at: https://neilbaksi.github.io/AI-Native-Marketing/

This is an independent study aid written by a student in MKTG 468 (AI-Native
Marketing) at the Kellogg School of Management. It is not affiliated with or endorsed
by Kellogg or the course instructor — see [`/about/attribution`](https://neilbaksi.github.io/AI-Native-Marketing/#/about/attribution).

## Stack

Vite + React + TypeScript + Tailwind, framer-motion, react-router (HashRouter). Prose
lives in MDX (`src/content/`), facts (stats, examples, synthetic figures) in a typed
registry (`src/data/facts.ts`) so every one carries a source. Self-hosted variable
fonts, no third-party requests at runtime. See `docs/ADR-002-vite-react.md` for the
full reasoning (kept outside this public repo — ask the author for the working
document if you're collaborating on the build).

## Local development

```bash
npm install
npm run dev        # http://localhost:5960/AI-Native-Marketing/
npm run build       # tsc -b && vite build, runs the content-integrity check
npm run preview     # serve the production build locally
```

Routes are hash-based (`/#/foundations/the-problem`) — GitHub Pages has no
server-side rewrite rule for a single-page app, and this keeps deep links working
without one.

## License

Site code: MIT (`LICENSE`). Prose content: CC BY-NC-SA 4.0 (`CONTENT-LICENSE`). See
`NOTICE.md` for which is which.
