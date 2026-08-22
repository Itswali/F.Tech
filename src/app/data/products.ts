export type Category =
  | "Amazon Mystery Packages"
  | "Chargers & Power"
  | "Cables & Hubs"
  | "Audio & Earpods"
  | "Smart Gadgets & Fitness"
  | "Cameras & Tech"
  | "Outdoor & Tactical"
  | "Home & Kitchen Gadgets";

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  storage?: string[];
  ram?: string;
  color?: string;
  colorHex?: string;
  condition: string;
  warranty: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  featured?: boolean;
}

// Store WhatsApp contact number (international format)
export const WHATSAPP_NUMBER = "923185114774";

const img = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const categories: { name: Category; description: string; image: string }[] = [
  {
    name: "Amazon Mystery Packages",
    description: "Unopened surplus & tech deal mystery boxes",
    image: img("1586528116311-ad8dd3c8310d", 600, 600),
  },
  {
    name: "Chargers & Power",
    description: "Fast GaN chargers & magnetic power banks",
    image: img("1583863788434-e58a36330cf6", 600, 600),
  },
  {
    name: "Cables & Hubs",
    description: "Multi-port USB-C hubs & fast charging cables",
    image: img("1544716278-ca5e3f4abd8c", 600, 600),
  },
  {
    name: "Audio & Earpods",
    description: "Wireless earpods & noise-canceling headphones",
    image: img("1590658268037-6bf12165a8df", 600, 600),
  },
  {
    name: "Smart Gadgets & Fitness",
    description: "Fitness trackers, smart sensors & wearables",
    image: img("1575311373937-040b8e1fd5b6", 600, 600),
  },
  {
    name: "Cameras & Tech",
    description: "4K action cams, vlogging gear & smart cams",
    image: img("1526170375885-4d8ecf77b99f", 600, 600),
  },
  {
    name: "Outdoor & Tactical",
    description: "Ultra-bright flashlights & solar camping lights",
    image: img("1508873696983-2df515122519", 600, 600),
  },
  {
    name: "Home & Kitchen Gadgets",
    description: "Greek yogurt makers, micro-blenders & kitchen tech",
    image: img("1556911220-e15b29be8c8f", 600, 600),
  },
];

export const brands = [
  "Amazon Surplus",
  "Anker",
  "Baseus",
  "Ugreen",
  "Xiaomi",
  "Sony",
  "GoPro",
  "Dash",
  "Nitecore",
  "JBL",
];

const API_URL = 'https://f-tech-backend.onrender.com/api/products';

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await res.json();
  return products.filter((p) => p.featured);
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const res = await fetch(`${API_URL}/${slug}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const getRelatedProducts = async (product: Product, count = 4): Promise<Product[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await res.json();
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, count);
};

export const buildWhatsAppLink = (product?: Product) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const text = product
    ? `Hi, I'm interested in ordering the ${product.name} priced at PKR ${Math.round(product.price).toLocaleString()}. Is it in stock?`
    : `Hi, I'm interested in your gadget deals and mystery packages. Can you help me?`;
  return `${base}?text=${encodeURIComponent(text)}`;
};
