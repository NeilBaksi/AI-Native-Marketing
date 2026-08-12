import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// GitHub Pages project-site base path — the single source of truth for pages/components.
// Every internal link/asset must route through src/lib/url.ts, never a raw "/..." literal.
// EXCEPTION: src/styles/tokens.css's @font-face rules hard-code this same string, because
// public/ assets referenced from a plain CSS file can't see import.meta.env.BASE_URL.
// If this changes, tokens.css MUST change with it — scripts/check-links.mjs verifies the two stay in sync.
// See docs/ADR-001-stack.md and docs/open-questions.md #1.
const BASE = '/AI-Native-Marketing/';

export default defineConfig({
  site: 'https://neilbaksi.github.io',
  base: BASE,
  trailingSlash: 'always',
  integrations: [mdx()],
  build: {
    // Required for CSP `style-src 'self'` with no 'unsafe-inline' — see docs/ADR-001-stack.md §CSP.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Vite's default 4KB assetsInlineLimit also applies to local <script src="...">
      // files (they're small enough to qualify) and was inlining them as literal
      // <script type="module"> bodies — which a strict CSP with no 'unsafe-inline'
      // blocks outright. Disabling it keeps every script a real external file.
      assetsInlineLimit: 0,
    },
  },
});
