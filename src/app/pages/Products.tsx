import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, Search, PackageX } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { FilterSidebar, type Filters } from "../components/products/FilterSidebar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import type { Product } from "../data/products";

const PRODUCTS_PER_PAGE = 24;

const createDefaultFilters = (initialCat?: string | null, maxPrice = 999): Filters => ({
  categories: initialCat ? [initialCat] : [],
  brands: [],
  price: [0, maxPrice],
  inStockOnly: false,
});

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("category");
  const initialSearch = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>(() => createDefaultFilters(initialCat));
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetch("https://f-tech-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const maxPrice = data.length > 0 ? Math.max(...data.map(p => p.price)) : 999;
        setFilters(f => ({ ...f, price: [f.price?.[0] ?? 0, Math.max(f.price?.[1] ?? maxPrice, maxPrice)] }));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const PRICE_MAX = useMemo(() => products.length > 0 ? Math.max(...products.map(p => p.price)) : 999, [products]);

  // Sync URL param to filter state
  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q") || "";
    
    setFilters((f) => {
      const currentCat = f.categories?.[0] || null;
      const targetCat = cat || null;
      if (targetCat !== currentCat) {
        return { ...f, categories: targetCat ? [targetCat] : [] };
      }
      return f;
    });

    if (q !== search) setSearch(q);
  }, [searchParams, search]);

  // Dynamic brands from catalog
  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean))].sort(),
    [products]
  );

  // Apply filters to catalog
  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands && filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.price) {
      result = result.filter(
        (p) => p.price >= filters.price![0] && p.price <= filters.price![1]
      );
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, filters, search, sort]);

  // Paginate
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
    if (newFilters.categories && newFilters.categories.length === 1) {
      setSearchParams({ category: newFilters.categories[0] }, { replace: true });
    } else if (newFilters.categories && newFilters.categories.length === 0) {
      setSearchParams({}, { replace: true });
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(createDefaultFilters(null, PRICE_MAX));
    setSearch("");
    setSearchParams({}, { replace: true });
    setPage(1);
  };

  const sidebar = (
    <FilterSidebar
      filters={filters}
      onChange={handleFilterChange}
      priceMax={PRICE_MAX}
      availableBrands={brands}
      onReset={handleReset}
    />
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          All Products
        </h1>
        <p className="mt-2 text-muted-foreground">
          {loading ? "Loading products..." : `${filtered.length} products found`}
        </p>
      </div>

      <div className="flex gap-5">
        {/* Desktop sidebar */}
        <aside className="hidden w-48 shrink-0 lg:block">{sidebar}</aside>

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="size-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-6">
                <SheetTitle className="mb-4">Filters</SheetTitle>
                {sidebar}
              </SheetContent>
            </Sheet>

            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products…"
                className="pl-9"
              />
            </div>

            <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1); }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
                <p className="text-lg font-semibold">Loading data...</p>
             </div>
          ) : (
            <>
              {/* Empty state */}
              {paginated.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
                  <PackageX className="mb-4 size-16 opacity-20" />
                  <p className="text-lg font-semibold">No products found</p>
                  <p className="mt-2 text-sm">Try adjusting your filters or search term.</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={handleReset}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}

              {/* Product grid */}
              {paginated.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginated.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        ← Previous
                      </Button>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          const p = i + 1;
                          return (
                            <button
                              key={p}
                              onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                              className={`size-9 rounded-xl text-sm font-medium transition-colors ${
                                page === p
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border hover:bg-accent"
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                        {totalPages > 7 && <span className="flex size-9 items-center justify-center text-muted-foreground">…</span>}
                        {totalPages > 7 && (
                          <button
                            onClick={() => { setPage(totalPages); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className={`size-9 rounded-xl text-sm font-medium transition-colors ${
                              page === totalPages ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"
                            }`}
                          >
                            {totalPages}
                          </button>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        Next →
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
