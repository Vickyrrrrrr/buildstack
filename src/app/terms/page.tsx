"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "license", label: "2. License Grant" },
  { id: "ownership", label: "3. Intellectual Property" },
  { id: "restrictions", label: "4. Restrictions" },
  { id: "fees", label: "5. Fees & Payment" },
  { id: "validation", label: "6. License Validation" },
  { id: "warranty", label: "7. Warranty Disclaimer" },
  { id: "liability", label: "8. Limitation of Liability" },
  { id: "termination", label: "9. Termination" },
  { id: "governing", label: "10. Governing Law & Disputes" },
];

export default function TermsPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28 pb-20">
        <section className="section-shell">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 space-y-4">
                <p className="eyebrow">Legal</p>
                <h1 className="section-title">Terms of Service</h1>
                <p className="body-copy text-text-muted">
                  Effective: April 2026 &middot; Buildstack Lab
                </p>
              </div>

              <div className="h-px bg-border mb-12" />

              <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
                {/* Table of Contents */}
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

                {/* Content */}
                <div className="body-copy leading-relaxed space-y-12 max-w-none">
                  <section id="acceptance" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">1. Acceptance of Terms</h2>
                    <p>
                      By purchasing, downloading, installing, or using AgentIC (&ldquo;the Software&rdquo;),
                      you enter into a binding agreement with Buildstack Lab (&ldquo;Buildstack,&rdquo;
                      &ldquo;we,&rdquo; &ldquo;us&rdquo;). If you do not agree to these Terms of Service
                      (&ldquo;Terms&rdquo;), you may not access or use the Software.
                    </p>
                    <p>
                      These Terms govern your use of the AgentIC desktop application, command-line interface
                      (CLI) tool, and any related documentation, updates, or support services provided by
                      Buildstack. Your use of the Software is also subject to our Privacy Policy and Refund Policy.
                    </p>
                  </section>

                  <section id="license" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">2. License Grant</h2>
                    <p>
                      Subject to your payment of applicable fees and compliance with these Terms,
                      Buildstack grants you a limited, non-exclusive, non-transferable, revocable
                      license to install and execute the Software on machines you own or control,
                      solely for your internal business or personal use.
                    </p>
                    <p>
                      Each license key is associated with a specific number of machine activations
                      as defined in your purchase plan. You may not exceed this limit. License keys
                      are issued and managed through Lemon Squeezy, our authorized reseller and
                      merchant of record.
                    </p>
                    <p>
                      The community edition of AgentIC, available via public source repositories,
                      is provided separately under its own terms and is not subject to the
                      fee requirements of this commercial license.
                    </p>
                  </section>

                  <section id="ownership" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">3. Intellectual Property</h2>
                    <p>
                      Buildstack Lab retains all right, title, and interest in and to the Software,
                      including all source code, object code, documentation, algorithms, design
                      methodologies, and any improvements, modifications, or derivative works
                      thereof. These Terms grant you a license to use the Software; they do not
                      transfer ownership of any intellectual property.
                    </p>
                    <p>
                      Any designs, netlists, GDSII layouts, or other outputs generated by the
                      Software belong to you. Buildstack claims no ownership over your chip designs.
                    </p>
                    <p>
                      Feedback, suggestions, or feature requests you provide to Buildstack may be
                      used by us without restriction or obligation to you.
                    </p>
                  </section>

                  <section id="restrictions" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">4. Restrictions</h2>
                    <p>You agree not to, and shall not permit any third party to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Redistribute, resell, sublicense, or lease the Software or your license key to any third party.</li>
                      <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Software, except to the extent such restriction is prohibited by applicable law.</li>
                      <li>Modify, adapt, or create derivative works of the Software without prior written authorization.</li>
                      <li>Remove, obscure, or alter any proprietary notices or labels on the Software.</li>
                      <li>Use the Software to develop, train, or fine-tune any machine learning model that competes with AgentIC.</li>
                      <li>Use the Software for any unlawful purpose or in violation of applicable export controls.</li>
                    </ul>
                  </section>

                  <section id="fees" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">5. Fees &amp; Payment</h2>
                    <p>
                      Fees for the Software are set forth on the purchase page at buildstack.live
                      and are processed through Lemon Squeezy. All fees are quoted in US Dollars
                      and are non-refundable except as provided in our Refund Policy.
                    </p>
                    <p>
                      <strong>Subscription &amp; Cancellation:</strong> If you purchase a subscription plan,
                      you will be billed automatically in advance on a recurring cycle (monthly or annually)
                      corresponding to your plan. You may cancel your subscription at any time through the
                      Lemon Squeezy customer portal (linked in your receipt email) or by contacting us at{" "}
                      <a href="mailto:contactme@buildstack.live" className="text-accent-primary hover:underline">
                        contactme@buildstack.live
                      </a>.
                      Upon cancellation, your subscription will remain active until the end of your current
                      paid billing period, at which point it will expire and your license key will be deactivated.
                    </p>
                    <p>
                      Lemon Squeezy is the merchant of record for all transactions. Your payment
                      relationship, including chargebacks and disputes, is governed by
                      Lemon Squeezy&apos;s terms and the policies of your payment method.
                    </p>
                  </section>

                  <section id="validation" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">6. License Validation</h2>
                    <p>
                      The Software periodically validates your license key against Lemon Squeezy&apos;s
                      servers. An active internet connection is required for initial activation and
                      periodic re-validation. A grace period of 24 hours is provided for temporary
                      connectivity interruptions. Failure to validate within the grace period will
                      result in suspension of Software functionality until a valid connection is
                      re-established.
                    </p>
                    <p>
                      You may not circumvent, disable, or otherwise interfere with the license
                      validation mechanism. Attempts to do so constitute a material breach of
                      these Terms.
                    </p>
                  </section>

                  <section id="warranty" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">7. Warranty Disclaimer</h2>
                    <p>
                      The Software is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
                      without warranty of any kind, express or implied, including but not limited to
                      the implied warranties of merchantability, fitness for a particular purpose,
                      title, and non-infringement.
                    </p>
                    <p>
                      Buildstack does not warrant that the Software will be error-free, uninterrupted,
                      or that generated chip designs will be free of defects or suitable for
                      fabrication. The Software is a design automation tool that generates RTL,
                      netlists, and GDSII layouts based on natural language inputs and AI models.
                      <strong> You are solely responsible for validating all outputs before
                      committing to silicon fabrication.</strong> Buildstack shall not be liable for
                      fabrication costs, mask costs, or any other expenses incurred as a result of
                      using designs generated by the Software.
                    </p>
                  </section>

                  <section id="liability" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">8. Limitation of Liability</h2>
                    <p>
                      To the maximum extent permitted by applicable law, in no event shall
                      Buildstack Lab, its affiliates, directors, employees, or licensors be liable
                      for any indirect, incidental, special, consequential, or punitive damages,
                      including but not limited to loss of profits, data, use, goodwill, or business
                      interruption, arising out of or in connection with your use of the Software,
                      whether based on warranty, contract, tort (including negligence), or any
                      other legal theory, even if advised of the possibility of such damages.
                    </p>
                    <p>
                      Buildstack&apos;s total aggregate liability for any claims arising out of or
                      relating to these Terms or the Software shall not exceed the amount you paid
                      for the Software in the twelve (12) months preceding the claim. The foregoing
                      limitations shall apply even if the remedy fails of its essential purpose.
                    </p>
                  </section>

                  <section id="termination" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">9. Termination</h2>
                    <p>
                      These Terms remain effective until terminated. You may terminate at any time
                      by ceasing use of the Software. Buildstack may terminate your license
                      immediately upon notice if you breach any provision of these Terms.
                    </p>
                    <p>
                      Upon termination: (a) your right to use the Software ceases immediately;
                      (b) you must delete all copies of the Software from your systems; and
                      (c) any provisions of these Terms that by their nature should survive
                      termination shall survive, including Sections 3, 7, 8, and 10.
                    </p>
                  </section>

                  <section id="governing" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">10. Governing Law &amp; Disputes</h2>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws
                      of India, without regard to conflict of law principles. Any dispute arising
                      out of or relating to these Terms shall be subject to the exclusive
                      jurisdiction of the courts located in New Delhi, India.
                    </p>
                    <p>
                      Before initiating any formal legal proceeding, you agree to first contact us
                      at{" "}
                      <a href="mailto:contactme@buildstack.live" className="text-accent-primary hover:underline">
                        contactme@buildstack.live
                      </a>{" "}
                      to attempt to resolve the dispute informally.
                    </p>
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
