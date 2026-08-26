import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — AgentIC | Buildstack EDA Lab",
  description: "AgentIC desktop agent pricing. Download the desktop agent and keep your silicon local. BYOK model path with secure, local-first execution.",
};
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  "AgentIC desktop app (Linux & macOS)",
  "BYOK model configuration (OpenAI, Anthropic, Gemini, Ollama)",
  "Local-first workspace & execution environment",
  "Full OSS & commercial EDA tool discovery",
  "Durable state checkpoints & automated error repair",
  "Priority support & updates",
] as const;

const guarantees = [
  {
    title: "Runs locally",
    copy: "Desktop work runs on your machine — nothing is uploaded to Buildstack.",
  },
  {
    title: "No hidden charges",
    copy: "No setup costs or surprise fees on any plan.",
  },
  {
    title: "Your IP stays yours",
    copy: "No RTL, PDK, prompt, log, or artifact is sent to Buildstack.",
  },
] as const;

export default function AgentICPricingPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main>
        <section className="section-shell">
          <div className="container">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <Badge variant="accent" className="mx-auto w-fit">
                AgentIC Pricing
              </Badge>
              <h1 className="section-title">AgentIC Desktop, simply priced.</h1>
              <p className="text-lg leading-[1.7] text-text-muted">
                Download the desktop app, configure your model, and start building locally.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
              <div className="surface-panel overflow-hidden">
                <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4 md:px-8">
                  <p className="eyebrow">AgentIC Desktop</p>
                  <Badge variant="accent">Free</Badge>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-[-0.04em]">Free</span>
                  </div>
                  <p className="mt-4 text-text-muted">
                    Full access to AgentIC Desktop for Linux &amp; macOS with local
                    execution and BYOK models.
                  </p>

                  <Button asChild size="lg" className="mt-7 w-full justify-between">
                    <Link href="/agentic/download">
                      Download AgentIC
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary" />
                        <span className="text-sm leading-relaxed text-text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-4 max-w-2xl text-center">
              <Button asChild variant="ghost" size="lg">
                <Link href="/agentic/download">
                  <Download className="h-4 w-4" />
                  Download Desktop
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="text-center">
                <p className="eyebrow">The small print</p>
                <h2 className="section-title">No catches.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {guarantees.map((item) => (
                  <div key={item.title} className="surface-panel p-6">
                    <h3 className="mb-2 text-base font-semibold text-text-primary">{item.title}</h3>
                    <p className="text-sm leading-[1.7] text-text-muted">{item.copy}</p>
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