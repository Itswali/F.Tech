import { Link } from "react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Smartphone, Twitter, Youtube, ShieldCheck, BadgeCheck } from "lucide-react";
import { buildWhatsAppLink } from "../../data/products";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-[#050810]">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-border/50 pb-8 lg:flex-nowrap">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-border/50 bg-[#151a28]">
              <ShieldCheck className="size-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase">100% Original Products</h4>
              <p className="text-sm text-muted-foreground">We Deal Only In Original & Genuine Products</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-border/50 bg-[#151a28]">
              <BadgeCheck className="size-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase">Best Value For Money</h4>
              <p className="text-sm text-muted-foreground">Get The Best Quality Products At Best Prices</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-border/50 bg-[#151a28]">
              <MessageCircle className="size-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase">Connect With Us</h4>
              <p className="text-sm text-muted-foreground mb-2">Follow Us On Social Media</p>
              <div className="flex gap-2">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="flex size-7 items-center justify-center rounded-full bg-[#151a28] text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src="/logo-ftech.jpg" alt="F.Tech Online Shopping" className="h-12 w-auto rounded-lg object-contain" />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Your trusted destination for premium gadgets, mobile accessories, and Amazon surplus deals — fast delivery and easy WhatsApp ordering.
            </p>
            <div className="flex gap-2">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" /> Chaklala Scheme 3, Rawalpindi, Pakistan
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" /> hello@ftech.shop
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Order fast</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Chat with our team and get your order delivered today.
            </p>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1ebe5b]"
            >
              <MessageCircle className="size-4" /> Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} F.Tech. All rights reserved.</p>
          <p className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/returns" className="hover:text-foreground transition-colors">Returns</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
