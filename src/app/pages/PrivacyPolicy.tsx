export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Privacy Policy</h1>
      <p className="mb-10 text-sm text-muted-foreground">Last updated: August 2026</p>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
        <section>
          <h2>1. Information We Collect</h2>
          <p>When you contact us or place an order via WhatsApp or our contact form, we collect information you voluntarily provide, including your name, phone number, email address, and message content. We do not collect payment card data.</p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use your information solely to:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Respond to your inquiries and process orders</li>
            <li>Send order updates and delivery notifications</li>
            <li>Improve our store and customer service</li>
          </ul>
          <p className="mt-2">We do <strong className="text-foreground">not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2>3. Data Retention</h2>
          <p>Contact messages are retained for up to 12 months to provide ongoing customer support, after which they are deleted from our systems.</p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>Our website uses a minimal number of cookies necessary for site functionality (e.g. theme preference, wishlist storage). We do not use advertising or tracking cookies.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to request access to, correction of, or deletion of any personal data we hold about you. Please contact us via WhatsApp or our contact form to make such a request.</p>
        </section>

        <section>
          <h2>6. Changes to This Policy</h2>
          <p>We may update this policy from time to time. The "Last updated" date at the top will reflect the most recent revision.</p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please reach out via our <a href="/contact" className="text-primary hover:underline">Contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}
