"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sections = [
  { id: "overview", label: "1. Overview" },
  { id: "cli", label: "2. CLI Tool Data" },
  { id: "web", label: "3. Web Application Data" },
  { id: "usage", label: "4. How We Use Data" },
  { id: "third-party", label: "5. Third-Party Services" },
  { id: "storage", label: "6. Data Storage & Security" },
  { id: "cookies", label: "7. Cookies" },
  { id: "rights", label: "8. Your Rights" },
  { id: "retention", label: "9. Data Retention" },
  { id: "changes", label: "10. Changes to This Policy" },
  { id: "contact", label: "11. Contact" },
];

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28 pb-20">
        <section className="section-shell">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 space-y-4">
                <p className="eyebrow">Legal</p>
                <h1 className="section-title">Privacy Policy</h1>
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
                  <section id="overview" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">1. Overview</h2>
                    <p>
                      Buildstack Lab (&ldquo;Buildstack,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;)
                      develops AgentIC, an autonomous silicon compiler available as both a
                      command-line tool and a web application. This Privacy Policy describes
                      what information we collect, how we use it, and what rights you have
                      regarding your data.
                    </p>
                    <p>
                      Our approach is simple: <strong>the CLI tool collects nothing.</strong> The
                      web application collects only what is necessary to provide authentication
                      and build history.
                    </p>
                  </section>

                  <section id="cli" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">2. CLI Tool — What It Does Not Collect</h2>
                    <p>
                      The AgentIC command-line tool runs entirely on your machine. It does
                      <strong> not</strong> collect, transmit, or phone home with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your design specifications or architecture descriptions</li>
                      <li>Your generated Verilog RTL, netlists, or GDSII layouts</li>
                      <li>Your system information, IP address, or hardware fingerprints</li>
                      <li>Usage telemetry or analytics of any kind</li>
                    </ul>

                    <h3 className="font-semibold text-text-primary mt-6">What the CLI does communicate externally:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm mt-3">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 font-semibold text-text-primary">External Call</th>
                            <th className="text-left py-2 pr-4 font-semibold text-text-primary">Data Sent</th>
                            <th className="text-left py-2 font-semibold text-text-primary">Destination</th>
                          </tr>
                        </thead>
                        <tbody className="text-text-muted">
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4">License validation</td>
                            <td className="py-2 pr-4">License key only</td>
                            <td className="py-2">api.lemonsqueezy.com</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4">LLM API calls</td>
                            <td className="py-2 pr-4">Your design prompts (using your own API key)</td>
                            <td className="py-2">Your chosen LLM provider</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">PDK downloads</td>
                            <td className="py-2 pr-4">None (read-only fetch)</td>
                            <td className="py-2">github.com, volare repositories</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section id="web" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">3. Web Application — What We Collect</h2>
                    <p>
                      When you use the AgentIC web console at agentic.buildstack.live or
                      buildstack.live:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Email address</strong> — collected through Supabase Auth
                        for account creation and login. We do not require a password when
                        using Google OAuth.
                      </li>
                      <li>
                        <strong>Build data</strong> — design names, natural language
                        descriptions, and build status/results are stored to provide your
                        build history and enable the Human-in-the-Loop pipeline.
                      </li>
                      <li>
                        <strong>Payment information</strong> — processed entirely by
                        Razorpay and Lemon Squeezy. We never receive, store, or have
                        access to your credit card details.
                      </li>
                    </ul>
                    <p>
                      We do <strong>not</strong> collect your generated RTL code, netlists,
                      GDSII files, or API keys from the web application. Build artifacts
                      are stored temporarily for download and then purged.
                    </p>
                  </section>

                  <section id="usage" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">4. How We Use Your Data</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Authentication:</strong> Your email is used to create and secure your account.</li>
                      <li><strong>Build history:</strong> Your design names and build results are displayed in your personal dashboard.</li>
                      <li><strong>Service improvement:</strong> Aggregated, anonymized build metrics (e.g., pipeline stage success rates, average build times) may be used to improve the Software.</li>
                    </ul>
                    <p>
                      We do <strong>not</strong> sell, rent, trade, or share your personal
                      data with third parties for their marketing purposes. We do not use your
                      data to train AI models.
                    </p>
                  </section>

                  <section id="third-party" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">5. Third-Party Services</h2>
                    <p>
                      Our services rely on the following third-party providers. Each operates
                      under its own privacy policy:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm mt-3">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 font-semibold text-text-primary">Service</th>
                            <th className="text-left py-2 pr-4 font-semibold text-text-primary">Purpose</th>
                            <th className="text-left py-2 font-semibold text-text-primary">Policy</th>
                          </tr>
                        </thead>
                        <tbody className="text-text-muted">
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4">Lemon Squeezy</td>
                            <td className="py-2 pr-4">License issuance &amp; validation</td>
                            <td className="py-2">
                              <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noreferrer" className="text-accent-primary hover:underline">Privacy Policy</a>
                            </td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4">Supabase</td>
                            <td className="py-2 pr-4">Authentication &amp; database</td>
                            <td className="py-2">
                              <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer" className="text-accent-primary hover:underline">Privacy Policy</a>
                            </td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2 pr-4">Razorpay</td>
                            <td className="py-2 pr-4">Payment processing (web only)</td>
                            <td className="py-2">
                              <a href="https://razorpay.com/privacy" target="_blank" rel="noreferrer" className="text-accent-primary hover:underline">Privacy Policy</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">LLM Providers</td>
                            <td className="py-2 pr-4">AI-powered RTL generation</td>
                            <td className="py-2">Data sent using your own API key; see your provider&apos;s policy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section id="storage" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">6. Data Storage &amp; Security</h2>
                    <p>
                      <strong>CLI tool:</strong> All data — credentials, cache, design files,
                      and build artifacts — is stored locally on your machine under{" "}
                      <code className="font-mono text-sm bg-bg-elevated px-1.5 py-0.5 rounded">
                        ~/.agentic/
                      </code>. Buildstack has no access to this directory.
                    </p>
                    <p>
                      <strong>Web application:</strong> User accounts and build data are
                      stored in a Supabase-managed PostgreSQL database with encryption at
                      rest. We employ industry-standard security practices including TLS
                      encryption for all data in transit.
                    </p>
                    <p>
                      No method of electronic storage or transmission is 100% secure. While we
                      strive to protect your data, we cannot guarantee absolute security.
                    </p>
                  </section>

                  <section id="cookies" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">7. Cookies</h2>
                    <p>
                      The AgentIC CLI tool does not use cookies. The web application uses
                      essential authentication cookies (Supabase session tokens) required for
                      login functionality. We do not deploy tracking cookies, analytics
                      cookies, or advertising cookies.
                    </p>
                  </section>

                  <section id="rights" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">8. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Access:</strong> Request a copy of your personal data stored in the web application.</li>
                      <li><strong>Deletion:</strong> Request deletion of your web application account and associated data. CLI users can delete all local data by removing the <code className="font-mono text-sm bg-bg-elevated px-1.5 py-0.5 rounded">~/.agentic/</code> directory.</li>
                      <li><strong>Correction:</strong> Update your account email through the web application.</li>
                      <li><strong>Portability:</strong> Export your build history in machine-readable format.</li>
                    </ul>
                    <p>
                      To exercise any of these rights, contact us at{" "}
                      <a href="mailto:contactme@buildstack.live" className="text-accent-primary hover:underline">
                        contactme@buildstack.live
                      </a>. We respond within 30 days.
                    </p>
                  </section>

                  <section id="retention" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">9. Data Retention</h2>
                    <p>
                      Web application account data is retained for the lifetime of your account.
                      Upon account deletion, your personal data is permanently removed within 30
                      days. Anonymized build metrics may be retained indefinitely for service
                      improvement purposes.
                    </p>
                  </section>

                  <section id="changes" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">10. Changes to This Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time. Material changes
                      will be communicated via our website and, for web application users,
                      via the email address associated with your account. Continued use of the
                      Software after changes take effect constitutes acceptance of the revised
                      policy.
                    </p>
                  </section>

                  <section id="contact" className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">11. Contact</h2>
                    <p>
                      For privacy-related inquiries or to exercise your data rights, contact:{" "}
                      <a href="mailto:contactme@buildstack.live" className="text-accent-primary hover:underline">
                        contactme@buildstack.live
                      </a>
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
