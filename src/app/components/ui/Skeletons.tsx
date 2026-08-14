/**
 * Reusable skeleton loading components for product grids, cards, and detail pages.
 */

// ── Base pulse animation ──────────────────────────────────────────────────────
function Pulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

// ── Product Card Skeleton ─────────────────────────────────────────────────────
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Pulse className="aspect-square w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Pulse className="h-3 w-1/3" />
        <Pulse className="h-4 w-3/4" />
        <Pulse className="h-3 w-1/2" />
        <div className="mt-auto flex items-center justify-between">
          <Pulse className="h-6 w-1/4" />
        </div>
        <Pulse className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
}

// ── Product Grid Skeleton ─────────────────────────────────────────────────────
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Product Detail Skeleton ───────────────────────────────────────────────────
export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <Pulse className="mb-6 h-4 w-64" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_340px]">
        <div>
          <Pulse className="aspect-square w-full rounded-2xl" />
          <div className="mt-4 flex gap-3">
            {[...Array(4)].map((_, i) => <Pulse key={i} className="size-20 rounded-xl" />)}
          </div>
        </div>
        <div className="space-y-4">
          <Pulse className="h-4 w-20" />
          <Pulse className="h-8 w-3/4" />
          <Pulse className="h-4 w-32" />
          <Pulse className="h-8 w-1/4" />
          <Pulse className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <Pulse key={i} className="h-12 rounded-xl" />)}
          </div>
        </div>
        <div>
          <Pulse className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// ── Hero Skeleton ─────────────────────────────────────────────────────────────
export function HeroSkeleton() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
      <div className="space-y-5 max-w-xl">
        <Pulse className="h-6 w-48 rounded-full" />
        <Pulse className="h-14 w-full" />
        <Pulse className="h-14 w-3/4" />
        <Pulse className="h-20 w-full" />
        <div className="flex gap-3">
          <Pulse className="h-12 w-40 rounded-full" />
          <Pulse className="h-12 w-40 rounded-full" />
        </div>
      </div>
      <Pulse className="aspect-[4/5] w-full rounded-[2rem]" />
    </section>
  );
}

// ── Generic inline spinner ────────────────────────────────────────────────────
export function Spinner({ size = 6 }: { size?: number }) {
  return (
    <div
      className={`size-${size} animate-spin rounded-full border-2 border-primary border-t-transparent`}
      aria-label="Loading..."
    />
  );
}

// ── Full page centered spinner ────────────────────────────────────────────────
export function PageSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size={10} />
    </div>
  );
}
