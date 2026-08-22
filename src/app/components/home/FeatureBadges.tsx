import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw, BadgeCheck } from "lucide-react";

const features = [
  { icon: Truck, title: "Fast Delivery", text: "All Over Pakistan" },
  { icon: ShieldCheck, title: "Secure Payment", text: "100% Safe & Secure" },
  { icon: HeadphonesIcon, title: "7 Days Support", text: "We're Here For You" },
  { icon: RotateCcw, title: "Easy Returns", text: "Hassle Free Returns" },
  { icon: BadgeCheck, title: "Trusted Store", text: "Thousands Of Happy Customers" },
];

export function FeatureBadges() {
  return (
    <section className="border-y border-border/50 bg-[#0b101e]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center justify-center gap-4 rounded-xl border border-border/50 bg-[#151a28]/50 p-4 transition-colors hover:border-primary/50 hover:bg-[#151a28]">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{feature.title}</span>
                <span className="text-xs text-muted-foreground">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
