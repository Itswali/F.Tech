import { brands } from "../../data/products";

export function Brands() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>Trusted brands</h2>
        <p className="mt-2 text-muted-foreground">We stock the world's leading manufacturers.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex h-20 items-center justify-center rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <span className="text-lg font-semibold tracking-tight text-muted-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
