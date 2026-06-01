import Link from "next/link";
import { ArrowRight, Download, KeyRound, MonitorDown, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MonitorDown,
    title: "Install AgentIC Desktop",
    copy: "Use the desktop build for your operating system. The app launches its local FastAPI executor on your machine.",
  },
  {
    icon: KeyRound,
    title: "Sign in and configure BYOK",
    copy: "Use the same account you purchased with, then add your OpenAI-compatible model provider key.",
  },
  {
    icon: RefreshCw,
    title: "Recheck license",
    copy: "AgentIC verifies the signed entitlement, discovers local tools, and unlocks workspace execution.",
  },
] as const;

export default function AgentICDownloadPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28">
        <section className="section-shell">
          <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="accent" className="w-fit">
                Desktop Download
              </Badge>
              <div className="space-y-4">
                <h1 className="section-title">Install AgentIC where your EDA tools already live.</h1>
                <p className="body-copy text-lg">
                  The desktop app runs the agent loop, file operations, and EDA commands
                  locally. After installation, sign in, configure your model provider,
                  and let AgentIC discover your native, Docker, WSL, or proprietary flows.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <a href="https://agentic.buildstack.live" target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" />
                    Download Latest
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/agentic/pricing">
                    View Pricing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="elevated-panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  agentic://setup
                </span>
                <span className="h-2 w-2 rounded-full bg-accent-primary" />
              </div>
              <div className="space-y-4 p-6">
                {steps.map((step, index) => (
                  <div key={step.title} className="surface-panel flex gap-4 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-primary/30 bg-accent-primary/10">
                      <step.icon className="h-5 w-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                        Step {index + 1}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                        {step.title}
                      </h2>
                      <p className="body-copy mt-2 text-sm">{step.copy}</p>
                    </div>
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
