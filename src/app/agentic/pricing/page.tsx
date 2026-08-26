import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — AgentIC | Buildstack EDA Lab",
  description: "AgentIC pricing plans. Buy the desktop agent and keep your silicon local. BYOK model path with secure, local-first execution.",
};
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const licenseServerUrl = (
  process.env.NEXT_PUBLIC_AGENTIC_LICENSE_URL || "https://api.buildstack.live"
).replace(/\/$/, "");

const purchaseHref = (plan: "starter" | "pro") =>
  `${licenseServerUrl}/purchase/start?plan=${plan}`;

const plans = [
  {
    name: "AgentIC Pro",
    plan: "pro",
    price: "₹299",
    cadence: "per month",
    description: "Full access to AgentIC Desktop workspace for Linux & macOS with local execution & BYOK models.",
    cta: "Subscribe Now — ₹299/mo",
    highlighted: true,
    features: [
      "AgentIC desktop app (Linux & macOS)",
      "BYOK model configuration (OpenAI, Anthropic, Gemini, Ollama)",
      "Local-first workspace & execution environment",
      "Full OSS & commercial EDA tool discovery",
      "Durable state checkpoints & automated error repair",
      "Priority support & updates",
    ],
  },
] as const;

const guarantees = [
  "Desktop work runs locally on the user's machine",
  "Cloud receives license state and count-only usage",
  "No RTL, PDK, prompt, log, or artifact upload to Buildstack",
] as const;

export default function AgentICPricingPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28">
        <section className="section-shell">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-5 text-center">
              <Badge variant="accent" className="mx-auto w-fit">
                AgentIC Pricing
              </Badge>
              <h1 className="section-title">Buy the desktop agent. Keep the silicon local.</h1>
              <p className="body-copy text-lg">
                Complete checkout, then sign in to AgentIC Desktop with the same account to unlock your local agent.
              </p>
              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                <Button asChild variant="ghost" size="lg">
                  <Link href="/agentic/download">
                    <Download className="h-4 w-4" />
                    Download Desktop
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-12 mx-auto max-w-xl">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className="elevated-panel trace-outline p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="eyebrow">{plan.name}</p>
                      <div className="mt-3 flex items-end gap-2">
                        <span className="text-5xl font-semibold tracking-[-0.04em]">
                          {plan.price}
                        </span>
                        <span className="pb-2 text-sm text-text-muted">{plan.cadence}</span>
                      </div>
                    </div>
                    <Badge variant="accent">All-Inclusive Plan</Badge>
                  </div>

                  <p className="body-copy mt-5 min-h-[3rem]">{plan.description}</p>

                  <Button asChild size="lg" className="mt-7 w-full justify-between">
                    <a href={purchaseHref(plan.plan)}>
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>

                  <div className="mt-7 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="container">
            <div className="surface-panel grid gap-8 p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-4">
                <ShieldCheck className="h-8 w-8 text-accent-primary" />
                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  License server, not cloud EDA.
                </h2>
                <p className="body-copy">
                  AgentIC is sold online, but design execution is local. Checkout activates
                  an account entitlement; it does not move chip IP into Buildstack servers.
                </p>
              </div>
              <div className="grid gap-3">
                {guarantees.map((item) => (
                  <div key={item} className="rounded-full border border-border bg-bg-elevated/70 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-primary">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
