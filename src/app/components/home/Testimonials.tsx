import { Star } from "lucide-react";

const reviews = [
  {
    name: "Amelia Carter",
    role: "Verified buyer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format",
    text: "Ordered my iPhone 16 Pro Max on WhatsApp at noon and it arrived the same evening. Sealed, genuine, unbeatable price!",
  },
  {
    name: "Daniel Okafor",
    role: "Verified buyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    text: "The team helped me pick the right Galaxy for my budget. Super responsive and honest advice. Highly recommend.",
  },
  {
    name: "Sofia Rossi",
    role: "Verified buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    text: "Loved how easy the whole thing was. No confusing checkout — just a quick chat and my Pixel was on the way.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>What our customers say</h2>
          <p className="mt-2 text-muted-foreground">Thousands of happy customers and counting.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="size-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
