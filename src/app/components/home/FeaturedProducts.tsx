import { Link } from "react-router";
import { ProductCard } from "../ProductCard";
import { products } from "../../data/products";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>Featured products</h2>
          <p className="mt-2 text-muted-foreground">Handpicked flagships loved by our customers.</p>
        </div>
        <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline sm:block">
          View all products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
