import { WhatsAppButton } from "../WhatsAppButton";

export function CTABanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -right-16 size-80 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Need help choosing a gadget or package deal?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90 leading-relaxed">
            Message us on WhatsApp to ask about custom gadget bundles, Amazon mystery box contents, or specific accessory compatibility.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton size="lg" label="Chat on WhatsApp Now" />
          </div>
        </div>
      </div>
    </section>
  );
}
