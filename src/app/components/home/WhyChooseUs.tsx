import { BadgeCheck, Headphones, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "Authentic Tech", desc: "100% genuine gadgets, power gear, earpods, and verified Amazon surplus." },
  { icon: ShieldCheck, title: "Warranty Coverage", desc: "Devices and electronics come backed with official warranty coverage." },
  { icon: Truck, title: "Express Dispatch", desc: "Fast nationwide shipping directly to your doorstep." },
  { icon: MessageCircle, title: "WhatsApp Ordering", desc: "Order any gadget or mystery package deal instantly in a quick chat." },
  { icon: Headphones, title: "Instant Support", desc: "Real human help to answer questions and match you with the best deals." },
];

export function WhyChooseUs() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Why Shop With Us</h2>
          <p className="mt-2 text-muted-foreground">A smooth, transparent shopping experience for all your tech & gadget needs.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-6" />
              </div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
