"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const sections = [
  { id: "acceptance", label: "1. Acceptance" },
  { id: "license", label: "2. License Grant" },
  { id: "ownership", label: "3. Intellectual Property" },
  { id: "restrictions", label: "4. Restrictions" },
  { id: "fees", label: "5. Fees & Payment" },
  { id: "validation", label: "6. License Validation" },
  { id: "warranty", label: "7. Warranty Disclaimer" },
  { id: "liability", label: "8. Limitation of Liability" },
  { id: "termination", label: "9. Termination" },
  { id: "governing", label: "10. Governing Law" },
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
                      These Terms govern your use of the AgentIC command-line tool and any related
                      documentation, updates, or support services provided by Buildstack. Your use of
                      the Software is also subject to our Privacy Policy and Refund Policy.
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
                      THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo;
                      WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                      THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                      TITLE, AND NON-INFRINGEMENT.
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
                      TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
                      BUILDSTACK LAB, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR LICENSORS BE LIABLE
                      FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                      INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR BUSINESS
                      INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SOFTWARE,
                      WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY
                      OTHER LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <p>
                      BUILDSTACK&apos;S TOTAL AGGREGATE LIABILITY FOR ANY CLAIMS ARISING OUT OF OR
                      RELATING TO THESE TERMS OR THE SOFTWARE SHALL NOT EXCEED THE AMOUNT YOU PAID
                      FOR THE SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. THE FOREGOING
                      LIMITATIONS SHALL APPLY EVEN IF THE REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
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
