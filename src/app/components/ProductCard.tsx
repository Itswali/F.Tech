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
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-[#151a28] shadow-sm transition-all hover:border-[#38bdf8]/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#0b101e]">
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
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-all hover:bg-black/60 hover:scale-110"
        >
          <Heart className={cn("size-3.5 transition-colors", wishlisted ? "fill-red-500 text-red-500" : "text-white")} />
        </button>
        <Badge
          className={cn(
            "absolute left-3 top-3 rounded-full border-0 font-medium px-2 py-0.5 text-xs",
            product.inStock ? "bg-primary text-black" : "bg-red-500 text-white"
          )}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
        {discount && (
          <span className="absolute bottom-3 left-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{product.brand}</span>
        </div>
        <Link to={`/products/${product.slug}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-sm text-white line-clamp-2 min-h-[2.5rem] leading-tight">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="ml-1 text-muted-foreground">({product.rating * 10 || 120})</span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">Rs. {Math.round(product.price).toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">Rs. {Math.round(product.originalPrice).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
