import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
export interface Filters {
  categories: string[];
  brands: string[];
  price: [number, number];
  inStockOnly: boolean;
  storage?: string[];
  ram?: string[];
  colors?: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  priceMax: number;
  availableBrands?: string[];
  onReset: () => void;
}

function toggle(list: string[] = [], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterSidebar({
  filters,
  onChange,
  priceMax,
  availableBrands = [],
  onReset,
}: FilterSidebarProps) {
  const currentPrice: [number, number] = filters.price || [0, priceMax || 9999];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold">Filter Products</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-auto p-0 text-primary hover:bg-transparent hover:underline"
        >
          Reset all
        </Button>
      </div>

      {/* Category section removed as it's now handled by main sidebar */}

      {/* Brand */}
      {availableBrands.length > 0 && (
        <FilterGroup title="Brand">
          {availableBrands.map((brand) => (
            <CheckRow
              key={brand}
              id={`brand-${brand}`}
              label={brand}
              checked={(filters.brands || []).includes(brand)}
              onCheckedChange={() =>
                onChange({ ...filters, brands: toggle(filters.brands, brand) })
              }
            />
          ))}
        </FilterGroup>
      )}

      {/* Price Range */}
      <FilterGroup title="Price Range">
        <div className="px-1">
          <Slider
            value={currentPrice}
            min={0}
            max={priceMax || 9999}
            step={5}
            onValueChange={(v) =>
              onChange({ ...filters, price: [v[0], v[1]] as [number, number] })
            }
          />
          <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
            <span>Min: ${currentPrice[0]}</span>
            <span>Max: ${currentPrice[1]}</span>
          </div>
        </div>
      </FilterGroup>

      {/* Availability */}
      <FilterGroup title="Availability">
        <CheckRow
          id="in-stock"
          label="In Stock Only"
          checked={!!filters.inStockOnly}
          onCheckedChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-muted-foreground hover:text-foreground">
        {label}
      </Label>
    </div>
  );
}
