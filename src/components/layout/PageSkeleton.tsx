/**
 * Loading fallback for the Suspense boundary around lazy-loaded page bodies.
 *
 * Body only — deliberately no kicker and no title. `PageHeader` renders those
 * from the manifest, which is already in the main bundle, and it sits *outside*
 * this boundary in Page.tsx. Rendering them here too stacked a second hero
 * block (same `pt-14 sm:pt-20` padding) under a header that is still at
 * `opacity: 0` mid-stagger, so the only visible title sat ~450px down the page
 * and snapped to the top when the chunk resolved and this subtree unmounted.
 */
export function PageSkeleton() {
  return (
    <div role="status" aria-busy="true" className="flex flex-col gap-5">
      <span className="sr-only">Loading page</span>
      <div aria-hidden className="h-4 w-3/4 animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
      <div aria-hidden className="h-4 w-full animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
      <div aria-hidden className="h-4 w-5/6 animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
      <div aria-hidden className="mt-4 h-48 w-full animate-pulse rounded-xl bg-rule/60 motion-reduce:animate-none" />
      <div aria-hidden className="h-4 w-2/3 animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
      <div aria-hidden className="h-4 w-full animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
    </div>
  )
}
