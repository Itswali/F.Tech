import { Link } from "react-router";
import { Headphones, Plug, Cable, Battery, Monitor, Dumbbell, Watch, Home, ChevronRight } from "lucide-react";

const categories = [
  { name: "Earbuds & Headphones", icon: Headphones, to: "/products?category=Earbuds+%26+Headphones" },
  { name: "Chargers & Adapters", icon: Plug, to: "/products?category=Chargers+%26+Adapters" },
  { name: "Cables & Connectors", icon: Cable, to: "/products?category=Cables+%26+Connectors" },
  { name: "Power Banks", icon: Battery, to: "/products?category=Power+Banks" },
  { name: "Computer Accessories", icon: Monitor, to: "/products?category=Computer+Accessories" },
  { name: "Fitness & Health", icon: Dumbbell, to: "/products?category=Fitness+%26+Health" },
  { name: "Smart Gadgets", icon: Watch, to: "/products?category=Smart+Gadgets" },
  { name: "Home Essentials", icon: Home, to: "/products?category=Home+Essentials" },
];

export function QuickCategories() {
  return (
    <section className="bg-[#0b101e] pt-10 pb-4">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:justify-start">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.to}
              className="group flex items-center justify-between gap-3 rounded-full border border-border/50 bg-[#151a28] py-2.5 pl-4 pr-3 transition-colors hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/10"
            >
              <cat.icon className="size-4 text-[#38bdf8]" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white md:text-sm">
                {cat.name}
              </span>
              <ChevronRight className="size-3 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-[#38bdf8]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
