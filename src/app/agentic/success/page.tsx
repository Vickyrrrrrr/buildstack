"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MonitorDown, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OpenDesktopButton } from "./OpenDesktopButton";

const nextSteps = [
  "Choose Open AgentIC Desktop and approve the browser handoff when prompted.",
  "IMPORTANT: Sign in to the desktop app using the exact same Google email you just verified before purchasing on Lemon Squeezy.",
  "Configure your BYOK model provider, then start your local workspace run.",
] as const;

export default function AgentICSuccessPage() {
  useEffect(() => {
    // Lemon Squeezy automatically appends ?orderId=XYZ to the return URL.
    // If it's missing, the user didn't just complete a checkout.
    const url = window.location.href.toLowerCase();
    if (!url.includes("orderid") && !url.includes("order_id")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28">
        <section className="section-shell">
          <div className="container">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-launch-radial shadow-surface">
              <div className="circuit-tile relative p-6 md:p-10">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                  <Badge variant="accent" className="mx-auto w-fit">
                    Payment Complete
                  </Badge>
                  <CheckCircle2 className="mx-auto h-12 w-12 text-accent-primary" />
                  <div className="space-y-4">
                    <h1 className="section-title">Your purchase is complete.</h1>
                    <p className="body-copy text-lg">
                      Your AgentIC license has been saved successfully. If you already have the desktop app installed, click the button below to open it. Otherwise, you can download it to get started.
                    </p>
                  </div>
                  <OpenDesktopButton />
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button asChild variant="ghost" size="lg">
                      <Link href="/agentic/download">
                        <MonitorDown className="h-4 w-4" />
                        Download Desktop
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg">
                      <Link href="/contact">
                        Need Help
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-4xl gap-3">
              {nextSteps.map((step) => (
                <div key={step} className="surface-panel flex items-center gap-4 p-5">
                  <RefreshCw className="h-5 w-5 shrink-0 text-accent-primary" />
                  <p className="text-text-primary">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
