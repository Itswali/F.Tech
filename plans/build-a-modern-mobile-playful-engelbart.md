# Build a Modern Mobile Shop Website

## Context

The user wants a premium, minimal, fully responsive eCommerce site for a mobile phone shop, Apple/Samsung-inspired. The primary conversion action is **"Order on WhatsApp"** — there is **no cart, no checkout, no accounts, no payments**. The app is a greenfield build on an empty `src/app/App.tsx`.

Decisions locked with the user:
- **Accent color:** Electric Blue (Apple-like). WhatsApp buttons stay brand-green regardless.
- **Theming:** Light + Dark toggle.

## Environment findings

- No `@make-kits` design system. Project ships **shadcn/ui** (Radix) components in `src/app/components/ui/` (button, card, accordion, badge, input, select, sheet, textarea, label, slider, checkbox, dropdown-menu, sonner, tabs, etc.). **Reuse these** instead of hand-rolling primitives.
- Available deps: `react-router` 7.13, `motion` 12, `lucide-react`, `next-themes`, `sonner`, `embla-carousel-react`, `react-hook-form` 7.55.
- `ImageWithFallback` exists at `src/app/components/figma/ImageWithFallback.tsx`.
- Tailwind v4 with token-based theme in `src/styles/theme.css` (light + `.dark` blocks, `@theme inline` mappings). `src/styles/fonts.css` is empty.
- Routing: use **React Router Data mode** with `RouterProvider` in `App.tsx` and a `src/app/routes.tsx`.

## Design system

- **Stance:** Clean, premium Apple-inspired tech minimalism. Generous whitespace, 8px spacing scale, soft shadows, rounded corners, subtle glassmorphism only on the sticky navbar and sticky purchase card.
- **Fonts** (wired into `src/styles/fonts.css` via Google Fonts `@import` at top of file):
  - Display/headings: **Sora**
  - Body: **Inter**
- **Tokens** (edit `src/styles/theme.css`, preserve `.dark` block + `@theme inline`):
  - `--primary` → electric blue `oklch(0.55 0.22 264)` (~#2563EB) with white foreground, in both light and dark.
  - Keep neutral white/black/gray grounds; refine `--muted`/`--border`/`--ring` to blue-tinted neutrals.
  - Add a WhatsApp green used via a local constant/class (not a core token): `#25D366`.

## Data model

Create `src/app/data/products.ts`:
- `Product` type: `slug, name, brand, category, price, originalPrice?, storage[], ram, color, colorHex, condition, warranty, inStock, rating, reviews, images[], description, features[], specs{}`.
- ~12 realistic products (iPhone 16 Pro Max, Galaxy S25 Ultra, Pixel 10 Pro, OnePlus, Xiaomi, Nothing Phone, plus tablets/watches/earbuds for categories). Real names, specs, prices, SEO slugs.
- Images via Unsplash URLs (`https://images.unsplash.com/photo-{id}?w=800&h=800&fit=crop&auto=format`) with descriptive alt text, rendered through `ImageWithFallback`. Containers get a `bg-muted` fallback color.
- Helpers: `getProductBySlug`, `getRelatedProducts`, category + brand lists.
- `WHATSAPP_NUMBER` constant + `buildWhatsAppLink(product)` → `https://wa.me/<number>?text=Hi%20I'm%20interested%20in%20...`.

## Routing (`src/app/routes.tsx`)

`createBrowserRouter` with a `RootLayout` (navbar + `<Outlet/>` + footer):
- `/` → Home
- `/products` → Products catalogue
- `/products/:slug` → Product detail
- `/about` → About
- `/contact` → Contact
- `*` → NotFound

`App.tsx` renders `<RouterProvider router={router} />` wrapped in `next-themes` `ThemeProvider` and a `<Toaster/>` (sonner).

## Components (`src/app/components/`)

Reusable, Auto-Layout-friendly:
- `layout/Navbar.tsx` — sticky, glassmorphism (`backdrop-blur bg-background/70 border-b`), logo, nav links (Home/Products/About/Contact), theme toggle, WhatsApp link, responsive search; mobile hamburger → full-screen drawer using `ui/sheet`.
- `layout/Footer.tsx` — logo, nav, contact, WhatsApp, social (lucide icons), copyright.
- `ThemeToggle.tsx` — sun/moon via `next-themes`.
- `ProductCard.tsx` — image, wishlist heart (UI-only local state), stock badge (`ui/badge`), name, brand, storage, color, price, "View Details" (`Link` to slug). Hover lift + image zoom via Motion.
- `WhatsAppButton.tsx` — green primary variant, opens `buildWhatsAppLink` in new tab; hover/focus/active/disabled states.
- `home/` sections: `Hero`, `Categories`, `FeaturedProducts`, `WhyChooseUs`, `Brands`, `Testimonials`, `FAQ` (uses `ui/accordion`), `CTABanner`.
- `products/FilterSidebar.tsx` — brand, price range (`ui/slider`), storage, RAM, color, availability (`ui/checkbox`); collapses into a `ui/sheet` on mobile.
- `products/Toolbar.tsx` — search input, sort `ui/select`, product count.
- `contact/ContactForm.tsx` — Name/Phone/Message with `react-hook-form` validation states; success via sonner `toast`.

## Pages (`src/app/pages/`)

- `Home.tsx` — composes all home sections.
- `Products.tsx` — sidebar + toolbar + responsive grid; live client-side filtering/sorting/search via `useState`/`useMemo`.
- `ProductDetail.tsx` — gallery + thumbnails, info block (name/price/brand/storage/RAM/color/condition/warranty/availability), description, specs table (`ui/table`), features list, related products, **sticky purchase card** (glassmorphism) with price + big green "Order on WhatsApp". `useParams` + `getProductBySlug`; redirect to NotFound if missing.
- `About.tsx`, `Contact.tsx` (info + `ContactForm`), `NotFound.tsx`.

## Responsiveness

Mobile-first. Breakpoints via Tailwind (`sm`/`md`/`lg`/`xl`) tuned for 390 / 768 / 1280 / 1440. Product grids: 1 col → 2 → 3 → 4. Sidebar filters become a sheet under `lg`. Navbar collapses to hamburger under `md`.

## Accessibility

Semantic landmarks (`header/nav/main/footer`), alt text on all images, labelled form fields, focus-visible rings (token `--ring`), AA contrast, state conveyed beyond color, keyboard-operable drawer/accordion/select (inherited from Radix).

## Files to create / modify

- Modify: `src/app/App.tsx`, `src/styles/theme.css`, `src/styles/fonts.css`.
- Create: `src/app/routes.tsx`, `src/app/data/products.ts`, layout/section/page/component files listed above.
- Install if needed: confirm `react-router` present (it is) — no new packages expected beyond what's installed.

## Verification

- App loads at `/` with hero, categories, featured grid, why-us, brands, testimonials, FAQ, CTA, footer.
- Navigate to `/products`: filtering by brand/price/storage/color/availability, sorting, and search all update the grid live.
- Click a card → `/products/:slug` shows gallery, specs, related products, sticky WhatsApp card.
- "Order on WhatsApp" opens `wa.me` link with pre-filled product message in a new tab.
- Theme toggle switches light/dark cleanly across all pages.
- Resize to 390 / 768 / 1280 / 1440: navbar hamburger + drawer, filter sheet, and grids all adapt.
- Contact form shows validation errors and a success toast.
