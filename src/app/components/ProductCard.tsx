import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";
import type { Product } from "../data/products";
import { isWishlisted, toggleWishlist } from "../lib/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(() => isWishlisted(product.slug));

  const handleWishlist = () => {
    const next = toggleWishlist(product.slug);
    setWishlisted(next);
  };

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={handleWishlist}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-all hover:bg-background hover:scale-110"
        >
          <Heart className={cn("size-4 transition-colors", wishlisted ? "fill-red-500 text-red-500" : "text-foreground")} />
        </button>
        <Badge
          className={cn(
            "absolute left-3 top-3 rounded-full border-0 font-medium",
            product.inStock ? "bg-[#25D366] text-white" : "bg-muted-foreground/80 text-white"
          )}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
        {discount && (
          <span className="absolute bottom-3 left-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{product.brand}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-amber-400 text-amber-400" /> {product.rating}
          </span>
        </div>
        <Link to={`/products/${product.slug}`} className="hover:text-primary">
          <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-1 min-h-[1.25rem] flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {product.storage?.[0] && product.storage[0] !== "—" && (
            <span>{product.storage[0]}</span>
          )}
          {product.color && product.color !== "—" && (
            <span className="inline-flex items-center gap-1">
              {product.colorHex && (
                <span className="size-2.5 rounded-full border border-border" style={{ backgroundColor: product.colorHex }} />
              )}
              {product.color}
            </span>
          )}
          {(!product.storage?.[0] || product.storage[0] === "—") && (!product.color || product.color === "—") && (
            <span>{product.category}</span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
