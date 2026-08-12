/**
 * The one place internal hrefs/asset paths are constructed. Never write a raw
 * "/foo" literal in a template — GitHub Pages project sites serve from
 * "/AI-Native-Marketing/", and a raw root-absolute path 404s in production
 * while working fine in `astro dev`. See docs/ADR-001-stack.md.
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}${clean}` : base;
}

export function asset(path: string): string {
  return href(path);
}
