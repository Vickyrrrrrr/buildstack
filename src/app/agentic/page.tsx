"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { agenticTerminalLines } from "@/lib/buildstack-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AgentICPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28">
        <section className="section-shell">
          <div className="container">
            <motion.div
              layoutId="agentic-card"
              className="surface-panel grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
            >
              <div className="space-y-6">
                <Badge variant="accent" className="w-fit">
                  AgentIC - Live
                </Badge>
                <div className="space-y-4">
                  <p className="eyebrow">Autonomous Hardware Synthesizer · v3.0</p>
                  <h1 className="section-title">Synthesize synthesizable silicon.<br />Natural language in, GDSII out.</h1>
                  <p className="body-copy text-lg">
                    Describe a custom CPU, peripheral, or logic gate array in plain language.
                    AgentIC handles formal bounds checking, self-healing timing verification,
                    and physical standard cell placement.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <a href="https://agentic.buildstack.live" target="_blank" rel="noreferrer">
                      Join Waitlist / Launch AgentIC
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link href="/">Back to Buildstack</Link>
                  </Button>
                </div>
              </div>

              <AnimatedTerminal
                title="agentic://pipeline"
                lines={agenticTerminalLines}
                loop
                loopDelay={1200}
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
