import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, Search, Smartphone, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ThemeToggle } from "../ThemeToggle";
import { WhatsAppButton } from "../WhatsAppButton";
import { cn } from "../ui/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Smartphone className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            NovaMobile
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop search */}
        <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 items-center lg:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search phones..."
              aria-label="Search products"
              className="rounded-full pl-9"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <WhatsAppButton label="WhatsApp" className="ml-1" />
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-full p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Smartphone className="size-5" />
                  </span>
                  <span className="font-bold" style={{ fontFamily: "var(--font-display)" }}>NovaMobile</span>
                </span>
              </div>
              <div className="flex flex-col gap-6 p-6">
                <form onSubmit={submitSearch}>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search phones..."
                      aria-label="Search products"
                      className="rounded-full pl-9"
                    />
                  </div>
                </form>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                          isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/60",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <WhatsAppButton size="lg" className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
