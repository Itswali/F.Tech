import { NavLink, useSearchParams, useLocation } from "react-router";
import { Package, Plug, Cable, Headphones, Dumbbell, Camera, Flashlight, Home, Sparkles, LayoutList, ChevronRight } from "lucide-react";
import { cn } from "../ui/utils";
import { categories as defaultCategories, type Category } from "../../data/products";

const iconMap: Record<Category, React.ElementType> = {
  "Amazon Mystery Packages": Package,
  "Chargers & Power": Plug,
  "Cables & Hubs": Cable,
  "Audio & Earpods": Headphones,
  "Smart Gadgets & Fitness": Dumbbell,
  "Cameras & Tech": Camera,
  "Outdoor & Tactical": Flashlight,
  "Home & Kitchen Gadgets": Home,
};

const categories = defaultCategories.map(c => ({
  name: c.name,
  icon: iconMap[c.name] || Sparkles,
  to: `/products?category=${encodeURIComponent(c.name)}`,
}));

export function Sidebar() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentCategory = searchParams.get("category");
  const isProductsPage = location.pathname === "/products";

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 py-6 pl-4 pr-6 lg:flex bg-[#0b101e] border-r border-border">
      <div className="flex items-center justify-between px-2 text-sm font-semibold tracking-wider text-muted-foreground">
        <span className="uppercase text-xs text-primary">Browse Categories</span>
        <LayoutList className="size-4" />
      </div>
      <nav className="flex flex-col gap-1">
        {categories.map((cat) => {
          const isActive = isProductsPage && currentCategory === cat.name;
          return (
            <NavLink
              key={cat.name}
              to={cat.to}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={cn("size-4 transition-colors", isActive ? "opacity-100 text-primary" : "opacity-70 group-hover:opacity-100 group-hover:text-primary")} />
                <span>{cat.name}</span>
              </div>
              <ChevronRight className={cn("size-4 transition-opacity", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
            </NavLink>
          );
        })}
        <NavLink
          to="/products"
          className={cn(
            "group mt-2 flex items-center justify-between px-3 py-2 text-sm font-semibold transition-colors hover:text-primary/80",
            isProductsPage && !currentCategory ? "text-primary" : "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">›</span>
            <span>VIEW ALL PRODUCTS</span>
          </div>
          <ChevronRight className={cn("size-4 transition-opacity", isProductsPage && !currentCategory ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
        </NavLink>
      </nav>
    </aside>
  );
}
