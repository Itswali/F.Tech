import { useState } from "react";
import { Link, useParams } from "react-router";
import { Check, ChevronRight, ShieldCheck, Star, Truck, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ProductCard } from "../components/ProductCard";
import { cn } from "../components/ui/utils";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import { NotFound } from "./NotFound";

export function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product);
  const hasStorage = product.storage && product.storage.length > 0 && product.storage[0] !== "—";

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-4" />
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="size-4" />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="size-4" />
        <span className="truncate text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_340px]">
        {/* ── Gallery with Lightbox ── */}
        <div className="lg:col-span-1">
          <div
            className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-muted"
            onClick={() => setLightboxOpen(true)}
          >
            <div className="aspect-square">
              <ImageWithFallback
                src={product.images[activeImage]}
                alt={`${product.name} view ${activeImage + 1}`}
                className="size-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
              <ZoomIn className="size-8 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100" />
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all",
                    activeImage === i ? "border-primary shadow-sm shadow-primary/30" : "border-border hover:border-muted-foreground"
                  )}
                >
                  <ImageWithFallback src={image} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">{product.brand}</span>
            <Badge className={cn("rounded-full border-0", product.inStock ? "bg-[#25D366] text-white" : "bg-muted-foreground/80 text-white")}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <h1 className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="size-4 fill-amber-400 text-amber-400" /> {product.rating}
            </span>
            <span>·</span>
            <span>{product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-sm font-bold text-red-600">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Storage selector if applicable */}
          {hasStorage && product.storage && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Storage Options</p>
              <div className="flex flex-wrap gap-2">
                {product.storage.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedStorage(i)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      selectedStorage === i
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick facts */}
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {product.ram && product.ram !== "—" && <Fact label="RAM" value={product.ram} />}
            {product.color && product.color !== "—" && <Fact label="Color" value={product.color} />}
            <Fact label="Condition" value={product.condition} />
            <Fact label="Warranty" value={product.warranty} />
          </dl>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Fast dispatch</span>
            <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Verified authentic</span>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-base font-semibold">Key Highlights</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="size-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-base font-semibold">Specifications</h3>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <tr key={key} className={cn(i % 2 === 0 ? "bg-muted/40" : "bg-card")}>
                        <th scope="row" className="w-1/3 px-4 py-3 text-left font-medium text-muted-foreground">{key}</th>
                        <td className="px-4 py-3 font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky purchase card ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">Order Price</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="pb-1 text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {hasStorage && product.storage && `${product.storage[selectedStorage]} · `}
              {product.color && product.color !== "—" ? product.color : product.category}
            </p>

            <div className="mt-5 space-y-3">
              <WhatsAppButton product={product} size="lg" className="w-full" disabled={!product.inStock} />
              {!product.inStock && (
                <p className="text-center text-xs text-muted-foreground">Currently out of stock — chat on WhatsApp for restock updates.</p>
              )}
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> {product.warranty}</p>
              <p className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Express delivery available</p>
              <p className="flex items-center gap-2"><Check className="size-4 text-primary" /> {product.condition}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>You might also like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="size-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                    className={cn(
                      "size-2.5 rounded-full transition-all",
                      activeImage === i ? "bg-white scale-125" : "bg-white/40"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-3">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}
