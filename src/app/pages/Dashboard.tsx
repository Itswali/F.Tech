import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Plus, Pencil, Trash2, LogOut, X, Check, PackageX,
  LayoutDashboard, Package, Star, AlertTriangle, Upload, ImageIcon
} from "lucide-react";

const API = "https://f-tech-backend.onrender.com/api/products";

interface Product {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  condition: string;
  warranty: string;
  features: string[];
  specs: Record<string, string>;
  color?: string;
}

const EMPTY_FORM: Omit<Product, "_id"> = {
  slug: "", name: "", brand: "", category: "Chargers & Power",
  price: 0, originalPrice: undefined, inStock: true, featured: false,
  rating: 0, reviews: 0, images: [], description: "",
  condition: "Brand New", warranty: "1 Year Official",
  features: [], specs: {}, color: "",
};

const CATEGORIES = [
  "Amazon Mystery Packages", "Chargers & Power", "Cables & Hubs",
  "Audio & Earpods", "Smart Gadgets & Fitness", "Cameras & Tech",
  "Outdoor & Tactical", "Home & Kitchen Gadgets",
];

function getToken() { return localStorage.getItem("adminToken") || ""; }

function authHeaders() {
  return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

export function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "_id">>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [specsText, setSpecsText] = useState("");

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(await res.json());
    } catch (e: any) {
      setError("Could not load products. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Stats
  const inStockCount = products.filter(p => p.inStock).length;
  const featuredCount = products.filter(p => p.featured).length;
  const avgRating = products.length
    ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
    : "0";

  // Open add modal
  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setSpecsText("");
    setFormError("");
    setModalOpen(true);
  }

  // Open edit modal
  function openEdit(product: Product) {
    setEditTarget(product);
    setForm({ ...product });
    setSpecsText(Object.entries(product.specs || {}).map(([k, v]) => `${k}: ${v}`).join("\n"));
    setFormError("");
    setModalOpen(true);
  }

  // Save (create or update)
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      const specs: Record<string, string> = {};
      specsText.split("\n").forEach(line => {
        const [k, ...rest] = line.split(":");
        if (k && rest.length) specs[k.trim()] = rest.join(":").trim();
      });
      
      const features = (form.features || []).map(f => f.trim()).filter(Boolean);
      const finalForm = { ...form, specs, features };

      const url = editTarget ? `${API}/${editTarget.slug}` : API;
      const method = editTarget ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(finalForm) });
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${res.statusText} - ${text.substring(0, 50)}`);
      }

      if (!res.ok) {
        let errMsg = data?.message || "Failed to save product";
        if (data?.error?.code === 11000) {
          const duplicateField = data?.error?.keyValue ? Object.keys(data.error.keyValue)[0] : "slug";
          errMsg = `A product with this ${duplicateField} already exists. Please use a unique value.`;
        } else if (data?.error?.message) {
          errMsg += `: ${data.error.message}`;
        }
        throw new Error(errMsg);
      }
      
      setModalOpen(false);
      fetchProducts();
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setSaving(false);
    }
  }

  // Delete
  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/${deleteTarget.slug}`, {
        method: "DELETE", headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteTarget(null);
      fetchProducts();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("adminToken");
    navigate("/login");
  }

  // Helper to update images/features array fields
  function setArrayField(field: "images" | "features", value: string) {
    setForm(f => ({ ...f, [field]: value.split("\n") }));
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="size-6 text-primary" />
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              F.Tech Admin
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
            { label: "In Stock", value: inStockCount, icon: Check, color: "text-green-500" },
            { label: "Featured", value: featuredCount, icon: Star, color: "text-amber-500" },
            { label: "Avg Rating", value: avgRating, icon: Star, color: "text-purple-500" },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            <AlertTriangle className="size-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Products table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="size-4" /> Add Product
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <PackageX className="mb-3 size-12 opacity-30" />
              <p className="font-medium">No products yet</p>
              <p className="mt-1 text-sm">Click "Add Product" to create your first one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Product</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Featured</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map(product => (
                    <tr key={product._id} className="transition-colors hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.images?.[0] && (
                            <img src={product.images[0]} alt="" className="size-10 rounded-lg object-cover bg-muted" />
                          )}
                          <div>
                            <p className="font-medium leading-tight">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{product.category}</td>
                      <td className="px-4 py-4">
                        <span className="font-semibold">PKR {Math.round(product.price).toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="ml-1 text-xs text-muted-foreground line-through">PKR {Math.round(product.originalPrice).toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${product.inStock ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                          {product.inStock ? "In-Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {product.featured ? (
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => openEdit(product)}
                          className="mr-2 inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                        >
                          <Pencil className="size-3" /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="size-3" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-2xl max-h-[90vh] flex-col rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
              <h2 className="text-lg font-semibold">{editTarget ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setModalOpen(false)} className="rounded-lg p-1.5 hover:bg-accent">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-5 p-6">
              {formError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                  {formError}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Product Name *">
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="input-style" placeholder="e.g. Anker Power Bank" />
                </Field>
                <Field label="Slug *">
                  <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="input-style" placeholder="e.g. anker-power-bank" />
                </Field>
                <Field label="Brand *">
                  <input required value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                    className="input-style" placeholder="e.g. Anker" />
                </Field>
                <Field label="Category *">
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-style">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Price (PKR) *">
                  <input required type="number" min="0" step="1" value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} className="input-style" />
                </Field>
                <Field label="Original Price (PKR)">
                  <input type="number" min="0" step="1" value={form.originalPrice ?? ""}
                    onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value ? +e.target.value : undefined }))} className="input-style" />
                </Field>
                <Field label="Condition *">
                  <input required value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
                    className="input-style" placeholder="e.g. Brand New" />
                </Field>
                <Field label="Warranty *">
                  <input required value={form.warranty} onChange={e => setForm(f => ({ ...f, warranty: e.target.value }))}
                    className="input-style" placeholder="e.g. 1 Year Official" />
                </Field>
                <Field label="Rating (0–5)">
                  <input type="number" min="0" max="5" step="0.1" value={form.rating}
                    onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} className="input-style" />
                </Field>
                <Field label="Reviews Count">
                  <input type="number" min="0" value={form.reviews}
                    onChange={e => setForm(f => ({ ...f, reviews: +e.target.value }))} className="input-style" />
                </Field>
              </div>

              <Field label="Description *">
                <textarea required rows={3} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="input-style resize-none" placeholder="Product description..." />
              </Field>

              <Field label="Product Images">
                <ImageUploader
                  images={form.images || []}
                  onChange={(imgs) => setForm(f => ({ ...f, images: imgs }))}
                />
              </Field>

              <Field label="Features (one per line)">
                <textarea rows={3} value={(form.features || []).join("\n")}
                  onChange={e => setArrayField("features", e.target.value)}
                  className="input-style resize-none" placeholder="Each feature on a new line..." />
              </Field>

              <Field label="Specs (key: value, one per line)">
                <textarea rows={3}
                  value={specsText}
                  onChange={e => setSpecsText(e.target.value)}
                  className="input-style resize-none font-mono text-xs" placeholder="Battery: 10000 mAh&#10;Weight: 280g" />
              </Field>

              <div className="flex items-center gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.inStock}
                    onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))}
                    className="size-4 rounded accent-primary" />
                  In Stock
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!form.featured}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="size-4 rounded accent-primary" />
                  Featured Product
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-accent">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70">
                  {saving ? "Saving..." : editTarget ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <Trash2 className="size-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Delete Product</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-70">
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`.input-style { width: 100%; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); padding: 0.5rem 0.75rem; font-size: 0.875rem; color: hsl(var(--foreground)); outline: none; } .input-style:focus { border-color: hsl(var(--primary)); box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

// ── Image Uploader ─────────────────────────────────────────────────────────
function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          if (base64) onChange([...images, base64]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images, onChange]
  );

  // Paste anywhere in the form
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      processFiles(e.clipboardData?.files ?? null);
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [processFiles]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          dragging
            ? "border-primary bg-primary/10"
            : "border-border bg-muted/30 hover:border-primary hover:bg-primary/5"
        }`}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
          <Upload className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Drag &amp; drop images here</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            or <span className="text-primary underline">click to browse</span> · also try Ctrl+V to paste
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              {src.startsWith("data:") || src.startsWith("http") ? (
                <img src={src} alt={`Product image ${i + 1}`} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <ImageIcon className="size-6 text-muted-foreground" />
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
