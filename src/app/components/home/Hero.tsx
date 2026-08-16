import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Package, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getFeaturedProducts, type Product } from "../../data/products";
import { useState, useEffect } from "react";

export function Hero() {
  const [featured, setFeatured] = useState<Product | null>(null);

  useEffect(() => {
    getFeaturedProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setFeatured(data[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-4 text-primary" /> Amazon Surplus &amp; Gadgets Deals 2026
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            Trending gadgets, accessories &amp; <span className="text-primary">package deals.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Discover authentic mobile accessories, power banks, earpods, action cameras, lifestyle gadgets, and Amazon mystery packages at unbeatable prices. Order directly on WhatsApp!
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-md"
            >
              Explore All Gadgets <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/products?category=Amazon+Mystery+Packages"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 font-medium transition-colors hover:bg-accent"
            >
              <Package className="size-4 text-primary" /> Mystery Package Deals
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Verified authentic</span>
            <span className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Fast dispatch</span>
            <span className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> Unbeatable value</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          {featured && (
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl">
              <div className="aspect-[4/5] bg-muted">
                <ImageWithFallback
                  src={featured.images[0]}
                  alt={featured.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/50 p-5 text-white backdrop-blur-md">
                <p className="text-xs uppercase font-semibold tracking-wider opacity-90 text-primary-foreground">🔥 Featured Deal</p>
                <div className="mt-1 flex items-end justify-between">
                  <div>
                     <p className="font-bold text-lg">{featured.name}</p>
                     <p className="text-xs opacity-80">{featured.category} · {featured.brand}</p>
                  </div>
                  <p className="text-2xl font-black">${featured.price}</p>
                </div>
                <Link
                  to={`/products/${featured.slug}`}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  View Featured Deal
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
