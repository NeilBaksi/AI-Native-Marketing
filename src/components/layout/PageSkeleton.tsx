interface PageSkeletonProps {
  /** Real title/kicker, rendered immediately — only the body is unknown while it loads. */
  kicker?: string
  title?: string
}

/**
 * Loading fallback for the Suspense boundary around lazy-loaded page bodies.
 * Because the manifest (PAGES) is already in the main bundle, the real
 * title/kicker render instantly — only the prose below is actually waiting,
 * which is most of the perceived-speed win.
 */
export function PageSkeleton({ kicker, title }: PageSkeletonProps) {
  return (
    <div role="status" aria-busy="true" className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <span className="sr-only">Loading page</span>
      {kicker && <p className="kicker">{kicker}</p>}
      {title && <h1 className="mt-3 text-display-lg text-ink">{title}</h1>}

      <div className="mt-10 flex flex-col gap-5" aria-hidden>
        <div className="h-4 w-3/4 animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
        <div className="h-4 w-full animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
        <div className="mt-4 h-48 w-full animate-pulse rounded-xl bg-rule/60 motion-reduce:animate-none" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
        <div className="h-4 w-full animate-pulse rounded bg-rule/60 motion-reduce:animate-none" />
      </div>
    </div>
  )
}
