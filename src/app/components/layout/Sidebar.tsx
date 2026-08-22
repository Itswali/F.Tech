import { NavLink } from "react-router";
import { Headphones, Plug, Cable, Battery, Monitor, Dumbbell, Watch, Home, Sparkles, LayoutList, ChevronRight } from "lucide-react";
import { cn } from "../ui/utils";

const categories = [
  { name: "Earbuds & Headphones", icon: Headphones, to: "/products?category=Earbuds+%26+Headphones" },
  { name: "Chargers & Adapters", icon: Plug, to: "/products?category=Chargers+%26+Adapters" },
  { name: "Cables & Connectors", icon: Cable, to: "/products?category=Cables+%26+Connectors" },
  { name: "Power Banks", icon: Battery, to: "/products?category=Power+Banks" },
  { name: "Computer Accessories", icon: Monitor, to: "/products?category=Computer+Accessories" },
  { name: "Fitness & Health", icon: Dumbbell, to: "/products?category=Fitness+%26+Health" },
  { name: "Smart Gadgets", icon: Watch, to: "/products?category=Smart+Gadgets" },
  { name: "Home Essentials", icon: Home, to: "/products?category=Home+Essentials" },
  { name: "New Arrivals", icon: Sparkles, to: "/products?category=New+Arrivals" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 py-6 pl-4 pr-6 lg:flex bg-[#0b101e] border-r border-border">
      <div className="flex items-center justify-between px-2 text-sm font-semibold tracking-wider text-muted-foreground">
        <span className="uppercase text-xs text-primary">Browse Categories</span>
        <LayoutList className="size-4" />
      </div>
      <nav className="flex flex-col gap-1">
        {categories.map((cat) => (
          <NavLink
            key={cat.name}
            to={cat.to}
            className={({ isActive }) =>
              cn(
                "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )
            }
          >
            <div className="flex items-center gap-3">
              <cat.icon className="size-4 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-colors" />
              <span>{cat.name}</span>
            </div>
            <ChevronRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </NavLink>
        ))}
        <NavLink
          to="/products"
          className="group mt-2 flex items-center justify-between px-3 py-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">›</span>
            <span>VIEW ALL PRODUCTS</span>
          </div>
          <ChevronRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </NavLink>
      </nav>
    </aside>
  );
}
