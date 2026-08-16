import { BadgeCheck, Globe2, Heart, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CTABanner } from "../components/home/CTABanner";

const stats = [
  { value: "50k+", label: "Happy customers" },
  { value: "8+", label: "Top brands" },
  { value: "99%", label: "Positive reviews" },
  { value: "24/7", label: "WhatsApp support" },
];

const values = [
  { icon: BadgeCheck, title: "Authenticity first", desc: "We only sell genuine, sealed devices — no exceptions, ever." },
  { icon: Heart, title: "Customer obsessed", desc: "Honest advice and real human support before and after you buy." },
  { icon: Globe2, title: "Nationwide reach", desc: "Fast, reliable delivery to your doorstep across the country." },
  { icon: Users, title: "Community driven", desc: "Built on the trust of tens of thousands of loyal customers." },
];

export function About() {
  return (
    <div>
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            We make buying phones simple.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            F.Tech started with one belief: buying a premium phone should be fast, honest and stress-free.
            No confusing checkouts, no hidden fees — just genuine devices, fair prices, and a friendly chat away
            from your next upgrade.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today we serve tens of thousands of customers with a curated lineup of the world's best smartphones,
            tablets and accessories — all backed by official warranty and fast delivery.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <div className="aspect-[4/3]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&h=675&fit=crop&auto=format"
              alt="Modern smartphone retail experience"
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>What we stand for</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <v.icon className="size-6" />
              </div>
              <h3 className="text-base">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
