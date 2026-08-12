/**
 * Nav tree. Phase 1 lists only pages that actually exist — a nav rail
 * pointing at unbuilt pages would violate the "zero broken links" bar we're
 * holding ourselves to from day one. Phase 3 expands this to the full
 * 59-page tree (docs/information-architecture.md) as pages land.
 */
export interface NavPage {
  title: string;
  path: string;
}

export interface NavPart {
  label: string;
  pages: NavPage[];
}

export const nav: NavPart[] = [
  {
    label: 'Part I — Foundations',
    pages: [{ title: 'The Problem', path: 'foundations/the-problem' }],
  },
];
