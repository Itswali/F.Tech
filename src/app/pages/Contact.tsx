import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function Contact() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>Get in touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Questions about a device or your order? Reach out — the fastest way to get help is a quick WhatsApp message.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <InfoCard icon={MapPin} title="Visit us" text="Chaklala Scheme 3, Rawalpindi, Pakistan" />
          <InfoCard icon={Mail} title="Email us" text="hello@ftech.shop" />
          <div className="rounded-2xl border border-border bg-primary/5 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#1ebe5b]">
                <MessageCircle className="size-5" />
              </span>
              <div>
                <h3 className="text-base">Order on WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Fastest response, every day 9am–9pm.</p>
              </div>
            </div>
            <WhatsAppButton size="lg" className="w-full" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="mb-6 text-xl" style={{ fontFamily: "var(--font-display)" }}>Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: typeof MapPin; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-base">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
