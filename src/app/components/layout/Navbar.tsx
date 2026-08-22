import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Search, ShoppingCart, User, Truck, ShieldCheck, Phone, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "SHOP", to: "/products" },
  { label: "CATEGORIES", to: "/products?category=all" },
  { label: "NEW ARRIVALS", to: "/products?category=New+Arrivals" },
  { label: "BEST SELLERS", to: "/products?sort=popular" },
  { label: "ABOUT US", to: "/about" },
  { label: "CONTACT US", to: "/contact" },
];

export function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="w-full bg-[#0b101e] text-slate-200">
      {/* Top Bar */}
      <div className="hidden border-b border-border/50 text-xs sm:block">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Truck className="size-3.5 text-primary" /> Fast & Reliable Delivery All Over Pakistan</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-primary" /> Quality Products. Trusted Service.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="size-3.5 text-primary" /> Customer Support: 24/7</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="size-3.5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="size-3.5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="size-3.5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><MessageCircle className="size-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="border-b border-border/50">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 lg:px-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex text-4xl font-black italic tracking-tighter">
              <span className="text-[#38bdf8]">F</span>
              <span className="text-primary -ml-1">.</span>
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-white uppercase">F.Tech</span>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase">Online Shopping</span>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={submitSearch} className="hidden w-full max-w-xl lg:block">
            <div className="relative flex items-center">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="h-10 rounded-l-md rounded-r-none border-r-0 bg-[#151a28] focus-visible:ring-0 focus-visible:border-primary px-4"
              />
              <button type="submit" className="flex h-10 w-12 items-center justify-center rounded-r-md bg-primary text-black transition-colors hover:bg-primary/90">
                <Search className="size-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden items-center gap-3 md:flex group hover:text-primary transition-colors">
              <User className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">Admin</span>
                <span className="text-sm font-semibold text-white">Login</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="hidden border-b border-border/50 lg:block">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-center px-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-xs font-bold tracking-wider transition-colors border-b-2 py-3.5",
                    isActive || (link.to === "/" && location.pathname === "/")
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-white"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
