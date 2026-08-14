import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { categories } from "../../data/products";

export function Categories() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Browse Categories</h2>
          <p className="mt-2 text-muted-foreground">From chargers & audio to Amazon mystery package bundles.</p>
        </div>
        <Link to="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-muted">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">{cat.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-medium text-primary">
              <span>Explore</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
