import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqs = [
  { q: "Are your phones brand new and genuine?", a: "Yes. Every device we sell is 100% genuine, factory-sealed and sourced from authorised distributors, with official manufacturer warranty." },
  { q: "How do I place an order?", a: "Simply browse a product, tap “Order on WhatsApp”, and confirm the details in a quick chat. We'll handle the rest — no cart or checkout needed." },
  { q: "How fast is delivery?", a: "Orders placed before 3pm are dispatched the same day. Express nationwide delivery typically arrives within 1–3 business days." },
  { q: "What warranty do I get?", a: "All devices come with the standard manufacturer warranty (usually 1 year). Warranty terms are listed on each product page." },
  { q: "Can I get help choosing a phone?", a: "Absolutely. Message us on WhatsApp and our team will recommend the best device for your needs and budget." },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>Frequently asked questions</h2>
        <p className="mt-2 text-muted-foreground">Everything you need to know before ordering.</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
