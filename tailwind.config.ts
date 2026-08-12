import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // "Ink & Ember". Authored in OKLCH (perceptually uniform lightness
        // steps); `<alpha-value>` lets Tailwind opacity modifiers
        // (`bg-surface/60`, `border-rule/40`) inject the alpha channel.
        // Contrast measured against paper/surface in docs/design-direction.md §1.
        paper: 'oklch(0.971 0.006 84.6 / <alpha-value>)', // page background     ≈ #F7F5F1
        surface: 'oklch(0.946 0.008 91.5 / <alpha-value>)', // raised surface      ≈ #EFEDE7
        rule: 'oklch(0.883 0.015 84.6 / <alpha-value>)', // hairline borders    ≈ #DDD8CE
        ink: 'oklch(0.183 0.007 78.1 / <alpha-value>)', // headings            ≈ #14120F
        'ink-soft': 'oklch(0.335 0.012 78.2 / <alpha-value>)', // body text           ≈ #3A3630
        muted: 'oklch(0.520 0.017 80.7 / <alpha-value>)', // captions/meta only  ≈ #6E685E
        slate: 'oklch(0.372 0.039 257.3 / <alpha-value>)', // secondary structural≈ #334155
        ember: 'oklch(0.553 0.174 38.4 / <alpha-value>)', // accent — rare       ≈ #C2410C
        'ember-deep': 'oklch(0.470 0.143 37.3 / <alpha-value>)', // AA-safe small accent ≈ #9A3412
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['Switzer', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.5' }],
        sm: ['0.9375rem', { lineHeight: '1.55' }],
        base: ['1.0625rem', { lineHeight: '1.65' }],
        md: ['1.25rem', { lineHeight: '1.5' }],
        h4: ['1.3125rem', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['1.6875rem', { lineHeight: '1.25', fontWeight: '700' }],
        h2: ['2.125rem', { lineHeight: '1.15', fontWeight: '700' }],
        h1: ['2.6875rem', { lineHeight: '1.05', fontWeight: '800' }],
        'display-lg': ['clamp(1.9rem, 5vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['clamp(2.6rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.02em', fontWeight: '800' }],
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
} satisfies Config
