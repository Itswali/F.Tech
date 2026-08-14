export function ReturnsPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Returns & Refund Policy</h1>
      <p className="mb-10 text-sm text-muted-foreground">Last updated: August 2026</p>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
        <section>
          <h2>1. Return Window</h2>
          <p>You may return eligible products within <strong className="text-foreground">7 days</strong> of receiving your order. After 7 days, items are considered final sale unless covered by a manufacturer warranty.</p>
        </section>

        <section>
          <h2>2. Eligible Returns</h2>
          <p>Items are eligible for return if they:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Are defective, damaged, or not as described</li>
            <li>Are in their original, unused condition with all packaging</li>
            <li>Were not listed as final sale or liquidation-only items</li>
          </ul>
        </section>

        <section>
          <h2>3. Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Amazon Mystery Packages / Surplus Liquidation boxes (sold as-is)</li>
            <li>Items with broken seals (earbuds, hygiene accessories)</li>
            <li>Items damaged by the customer after delivery</li>
          </ul>
        </section>

        <section>
          <h2>4. How to Initiate a Return</h2>
          <p>Contact us on WhatsApp within the 7-day window with:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Your order confirmation number</li>
            <li>Photos or video of the issue</li>
            <li>A brief description of the problem</li>
          </ul>
          <p className="mt-2">Our team will respond within 24 hours with return instructions.</p>
        </section>

        <section>
          <h2>5. Refunds</h2>
          <p>Once your return is received and inspected, we will notify you of the refund decision. Approved refunds are processed within <strong className="text-foreground">3–5 business days</strong> via the original payment method.</p>
        </section>

        <section>
          <h2>6. Exchanges</h2>
          <p>If you received a defective or wrong item, we will exchange it at no extra cost including free re-delivery. Availability of the exact same item is subject to current stock.</p>
        </section>

        <section>
          <h2>7. Warranty Claims</h2>
          <p>Products with official manufacturer warranties should be claimed directly with the manufacturer using the included warranty card. Nova Mobiles can assist with the process on request.</p>
        </section>
      </div>
    </div>
  );
}
