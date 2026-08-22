import { Link } from "react-router";
import { ProductCard } from "../ProductCard";
import { getFeaturedProducts, type Product } from "../../data/products";
import { useState, useEffect } from "react";

export function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then((data) => {
        setFeatured(data.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load featured products", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#050810] py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Best Selling Products</h2>
          </div>
        <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline sm:block">
          View all products
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading products...</div>
      ) : featured.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">Failed to fetch data or no products found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
