"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sections = [
  { id: "guarantee", label: "1. Money-Back Guarantee" },
  { id: "eligibility", label: "2. Eligibility" },
  { id: "process", label: "3. How to Request" },
  { id: "after", label: "4. After Refund" },
  { id: "exceptions", label: "5. Exceptions" },
  { id: "contact", label: "6. Contact" },
];

export default function RefundPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28 pb-20">
        <section className="section-shell">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 space-y-4">
                <p className="eyebrow">Legal</p>
                <h1 className="section-title">Refund Policy</h1>
                <p className="body-copy text-text-muted">
                  Effective: April 2026 &middot; Buildstack Lab
                </p>
              </div>

              <div className="h-px bg-border mb-12" />

              <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
                <aside className="hidden lg:block">
                  <nav className="sticky top-32 space-y-0.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-4">
                      Contents
                    </p>
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block text-sm text-text-muted hover:text-accent-primary transition-colors py-1.5 border-l-2 border-transparent hover:border-accent-primary/30 pl-3"
                      >
                        {s.label}
                      </a>
                    ))}
                  </nav>
                </aside>

                <div className="body-copy leading-relaxed space-y-12 max-w-none">
                  <section id="guarantee" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">1. Money-Back Guarantee</h2>
                    <p>
                      We stand behind AgentIC. If you are not satisfied with the Software
                      for any reason, you may request a full refund within <strong>14 days</strong> of
                      your purchase date. This applies to all license types — one-time purchases
                      and subscription plans.
                    </p>
                    <p>
                      Refunds are processed through Lemon Squeezy, our authorized reseller,
                      and credited to your original payment method. Processing typically
                      takes 5&ndash;10 business days depending on your payment provider.
                    </p>
                  </section>

                  <section id="eligibility" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">2. Eligibility</h2>
                    <p>To qualify for a refund, the following conditions must be met:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The refund request is submitted within 14 calendar days of the original purchase date.</li>
                      <li>You provide your Lemon Squeezy order ID, license key, or the email address used for purchase.</li>
                      <li>The license key has not been shared, redistributed, or activated on more machines than permitted by your plan.</li>
                      <li>The purchase was made directly through our official Lemon Squeezy storefront linked from buildstack.live.</li>
                    </ul>
                  </section>

                  <section id="process" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">3. How to Request a Refund</h2>
                    <p>
                      Send an email to{" "}
                      <a href="mailto:contactme@buildstack.live" className="text-accent-primary hover:underline">
                        contactme@buildstack.live
                      </a>{" "}
                      with the following information:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Subject line:</strong> &ldquo;Refund Request — [Your Order ID]&rdquo;
                      </li>
                      <li>
                        <strong>Your Lemon Squeezy order ID</strong> (found in your purchase
                        confirmation email) or the first 8 characters of your license key.
                      </li>
                      <li>
                        <strong>Reason for refund</strong> (optional &mdash; helps us improve
                        the product, but is not required for eligibility).
                      </li>
                    </ol>
                    <p>
                      We acknowledge all refund requests within <strong>2 business days</strong>.
                      Once approved, Lemon Squeezy initiates the refund to your original payment
                      method. You will receive a confirmation email when the refund is processed.
                    </p>
                  </section>

                  <section id="after" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">4. What Happens After Refund</h2>
                    <p>Upon processing your refund:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your license key is deactivated on Lemon Squeezy and will no longer validate.</li>
                      <li>Your machine activations are revoked.</li>
                      <li>You must delete all copies of the licensed Software from your systems.</li>
                      <li>You may continue to use the community edition of AgentIC, which remains freely available via public source repositories and is not affected by license deactivation.</li>
                    </ul>
                    <p>
                      Any chip designs, RTL code, or GDSII layouts you generated during the
                      license period remain yours. Buildstack claims no ownership over your
                      design outputs.
                    </p>
                  </section>

                  <section id="exceptions" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">5. Exceptions</h2>
                    <p>
                      We reserve the right to decline refund requests in the following
                      circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>License sharing:</strong> If our systems detect the same
                        license key activated across more machines than permitted by your plan,
                        indicating redistribution or sharing in violation of our Terms of Service.
                      </li>
                      <li>
                        <strong>Fraudulent purchases:</strong> Purchases made with stolen
                        payment information, unauthorized card use, or other fraudulent activity
                        will not be refunded and will be reported to the relevant authorities.
                      </li>
                      <li>
                        <strong>Chargeback abuse:</strong> Initiating a chargeback with your
                        bank or payment provider instead of contacting us for a refund may
                        result in permanent account suspension.
                      </li>
                      <li>
                        <strong>Outside the window:</strong> Requests received more than 14
                        calendar days after the original purchase date.
                      </li>
                    </ul>
                  </section>

                  <section id="contact" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">6. Contact</h2>
                    <p>
                      For refund requests, billing questions, or any other concerns:
                    </p>
                    <ul className="space-y-1 list-none pl-0 text-text-muted">
                      <li>
                        Email:{" "}
                        <a href="mailto:contactme@buildstack.live" className="text-accent-primary hover:underline">
                          contactme@buildstack.live
                        </a>
                      </li>
                      <li>
                        Response time: Within 2 business days
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
