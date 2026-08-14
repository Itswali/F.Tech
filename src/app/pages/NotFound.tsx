import { Link } from "react-router";
import { Home, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-7xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>404</p>
      <h1 className="mt-4 text-2xl" style={{ fontFamily: "var(--font-display)" }}>Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="size-4" /> Back home
        </Link>
        <Link
          to="/products"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 font-medium transition-colors hover:bg-accent"
        >
          <Search className="size-4" /> Browse products
        </Link>
      </div>
    </div>
  );
}
