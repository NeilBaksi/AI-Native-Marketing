# The AI-Native Marketing Handbook

A public, static teaching site: a field guide to the Intelligent Marketing Operating
System (I-MOS) — for a marketer who's never touched AI, an engineer who's never
touched marketing, a student, or a CMO.

Live at: https://neilbaksi.github.io/AI-Native-Marketing/

This is an independent study aid written by a student in MKTG 468 (AI-Native
Marketing) at the Kellogg School of Management. It is not affiliated with or endorsed
by Kellogg or the course instructor — see [`/about/attribution`](https://neilbaksi.github.io/AI-Native-Marketing/about/attribution/).

## Stack

Astro + MDX, self-hosted variable fonts, Pagefind for client-side search, CSS custom
properties for the design token layer. Zero third-party requests, zero runtime
secrets, static output only. See the project's ADR for the full reasoning (kept
outside this public repo — ask the author for the working document if you're
collaborating on the build).

## Local development

```bash
npm install
npm run dev       # http://localhost:4321/AI-Native-Marketing/
npm run build      # static build to dist/, runs Pagefind indexing + link check
npm run preview    # serve the production build locally
```

## License

Site code: MIT (`LICENSE`). Prose content: CC BY-NC-SA 4.0 (`CONTENT-LICENSE`). See
`NOTICE.md` for which is which.
