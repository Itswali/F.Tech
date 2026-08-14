import { MessageCircle } from "lucide-react";
import { cn } from "./ui/utils";
import { buildWhatsAppLink, type Product } from "../data/products";

interface WhatsAppButtonProps {
  product?: Product;
  label?: string;
  className?: string;
  size?: "default" | "lg";
  disabled?: boolean;
}

export function WhatsAppButton({
  product,
  label = "Order on WhatsApp",
  className,
  size = "default",
  disabled = false,
}: WhatsAppButtonProps) {
  return (
    <a
      href={disabled ? undefined : buildWhatsAppLink(product)}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium text-white transition-all",
        "bg-[#25D366] hover:bg-[#1ebe5b] active:bg-[#17a34c] shadow-sm hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#25D366]/40",
        size === "lg" ? "h-12 px-7 text-base" : "h-10 px-5 text-sm",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <MessageCircle className={size === "lg" ? "size-5" : "size-4"} />
      {label}
    </a>
  );
}
