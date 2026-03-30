"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCheck, CircuitBoard, FileCode2, MessageSquareQuote, RefreshCw } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
  icon: typeof MessageSquareQuote;
  loop?: boolean;
};

const steps: Step[] = [
  {
    title: "Define Intent",
    description: "Natural language or structured spec input.",
    icon: MessageSquareQuote,
  },
  {
    title: "RTL Generation",
    description: "AgentIC synthesizes verified Verilog.",
    icon: FileCode2,
  },
  {
    title: "Physical Design + Repair Loop",
    description:
      "OpenLane runs P&R. On any DRC or LVS violation, the Repair Agent intercepts, diagnoses, patches, and retries until the layout is clean.",
    icon: RefreshCw,
    loop: true,
  },
  {
    title: "Tape-Out Ready",
    description: "DRC and LVS clean GDSII export.",
    icon: CheckCheck,
  },
];

export function HowItWorks() {
  const rootRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]");
        gsap.set(cards, { opacity: 0, y: 18 });
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

        gsap.to(lineRef.current, {
          scaleX: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            once: true,
          },
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            once: true,
          },
        });
      }, rootRef);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="methodology" ref={rootRef} className="section-shell">
      <Reveal className="container space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Methodology</p>
          <h2 className="section-title">From Intent to Silicon</h2>
          <p className="body-copy text-lg">
            The Buildstack methodology distilled into four precise stages.
          </p>
        </div>

        <div className="relative hidden xl:block">
          <div className="absolute left-0 right-0 top-11 h-px bg-border/80" />
          <div ref={lineRef} className="absolute left-0 right-0 top-11 h-px bg-accent-primary" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                data-step-card
                className="surface-panel relative flex min-h-[20rem] flex-col justify-between p-6"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <p className="eyebrow text-accent-primary">Step {index + 1}</p>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                    </div>
                    <div
                      className={cn(
                        "relative rounded-full border border-border bg-bg-elevated p-3 text-accent-primary",
                        step.loop ? "shadow-glow" : "",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {step.loop ? (
                        <span className="absolute inset-0 rounded-full border border-accent-repair/60 animate-orbit" />
                      ) : null}
                    </div>
                  </div>

                  <p className="body-copy">{step.description}</p>
                </div>

                <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  <CircuitBoard className="h-4 w-4 text-accent-primary" />
                  {step.loop ? "Loop-aware stage" : "Linear progression"}
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

export default HowItWorks;
