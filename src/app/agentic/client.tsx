"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Cpu, KeyRound, LockKeyhole, TerminalSquare } from "lucide-react";
import Link from "next/link";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { agenticTerminalLines } from "@/lib/buildstack-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trustSignals = [
  {
    icon: LockKeyhole,
    title: "Zero-Trust Local Workspaces",
    copy: "RTL, PDK files, synthesis scripts, logs, and evidence graphs remain strictly on your machine. Your source code is never uploaded to the cloud.",
  },
  {
    icon: KeyRound,
    title: "Enterprise BYOK Path",
    copy: "Securely connect your own model provider keys (OpenAI, Anthropic, Gemini, or local models). You pay only for raw tokens.",
  },
  {
    icon: Cpu,
    title: "Broad EDA & PDK Support",
    copy: "Works with your existing stack. AgentIC auto-discovers and drives both open-source tools (Yosys, Verilator, OpenROAD) and industry-standard commercial tools (Synopsys, Cadence, Siemens) and PDKs.",
  },
  {
    icon: TerminalSquare,
    title: "Durable State Checkpoints",
    copy: "Maintains filesystem snapshots and state databases. The agent can back-track to previous stages if synthesis or routing fails.",
  },
] as const;

const workflow = [
  "RTL Quality & Linter Loops",
  "Static Timing Analysis (STA) Parsing",
  "Physical DRC & LVS Verification",
  "Human-in-the-Loop Verification",
] as const;

export default function AgentICClientPage() {
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
                  AgentIC Desktop
                </Badge>
                <div className="space-y-4">
                  <p className="eyebrow">Closed-Loop Semiconductor Automation</p>
                  <h1 className="section-title">RTL to Signoff. Driven by AI, Run Locally.</h1>
                  <p className="body-copy text-lg">
                    An autonomous, local-first desktop workspace built for chip design. 
                    AgentIC auto-discovers and drives your local EDA tools and PDKs—supporting both open-source 
                    and commercial stacks (Synopsys, Cadence, Siemens)—running closed-loop verification 
                    and checkpointed repair loops until your design is signoff-clean.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/agentic/pricing">
                      Buy AgentIC
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link href="/agentic/download">Download Desktop</Link>
                  </Button>
                </div>
              </div>

              <AnimatedTerminal
                title="agentic://local-workspace"
                lines={agenticTerminalLines}
                loop
                loopDelay={1200}
              />
            </motion.div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((item) => (
              <div key={item.title} className="surface-panel p-6">
                <item.icon className="mb-5 h-6 w-6 text-accent-primary" />
                <h3 className="mb-3 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="body-copy text-sm">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="eyebrow">Workflow</p>
              <h2 className="section-title">From intent to verified artifacts.</h2>
              <p className="body-copy text-lg">
                AgentIC does not assume every user has the same flow. It learns the
                project context first, then chooses the next local action based on the
                tools and PDKs available on that machine.
              </p>
            </div>

            <div className="space-y-3">
              {workflow.map((step, index) => (
                <div key={step} className="surface-panel flex gap-4 p-5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-primary/30 bg-accent-primary/10 font-mono text-[11px] text-accent-primary">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-text-primary">{step}</p>
                    <p className="body-copy text-sm">
                      {index === 0
                        ? "Runs local compilers/linters (Verilator, Questa, Yosys, Design Compiler), identifies syntax or synthesis issues, and surgically patches source code."
                        : index === 1
                          ? "Parses timing logs (OpenSTA, PrimeTime, Tempus), calculates setup/hold slack, and optimizes constraints without bloating context limits."
                          : index === 2
                            ? "Reads physical verification reports (DRC/LVS from Calibre, OpenROAD, Magic) to pin down layout mismatches at specific coordinates."
                            : "Proposes terminal commands and file edits through visual diffs, executing only after your explicit approval."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="container">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-launch-radial px-6 py-14 shadow-surface md:px-10">
              <div className="circuit-tile absolute inset-0 opacity-[0.05]" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-2xl space-y-4">
                  <p className="eyebrow">Security model</p>
                  <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                    Your source code is not the product.
                  </h2>
                  <p className="body-copy text-lg">
                    Buildstack does not need your Verilog, TCL, PDK files, logs, or
                    generated artifacts to sell AgentIC. The cloud entitlement server
                    verifies purchases; the desktop app does the engineering work locally.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:w-[25rem] lg:grid-cols-1">
                  {["License check", "Model configured", "Local tools detected"].map((label) => (
                    <div key={label} className="flex items-center gap-3 rounded-full border border-border bg-bg-surface/70 px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 text-accent-primary" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-primary">
                        {label}
                      </span>
                    </div>
                  ))}
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
