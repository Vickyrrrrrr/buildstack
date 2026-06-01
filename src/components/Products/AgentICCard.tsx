"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agenticTerminalLines } from "@/lib/buildstack-content";

const featurePills = [
  "Local-first desktop",
  "BYOK models",
  "EDA tool discovery",
  "RTL and verification",
  "IP stays local",
] as const;

export function AgentICCard() {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!isLaunching) return;

    const timeout = window.setTimeout(() => {
      startTransition(() => router.push("/agentic"));
    }, 420);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isLaunching, router, startTransition]);

  return (
    <>
      <motion.article
        layoutId="agentic-card"
        className="group elevated-panel grid gap-8 border-border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow md:p-8 xl:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit">
            LIVE · v1.0
          </Badge>

          <div className="space-y-4">
            <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.04em]">
              AgentIC
            </h3>
            <p className="text-xl text-text-primary">
              Codex for Silicon · Desktop VLSI agent
            </p>
            <p className="body-copy max-w-2xl">
              Describe a CPU, accelerator, peripheral, or verification task in plain
              language. AgentIC works inside your local workspace, uses your available
              EDA tools and PDKs, then iterates through RTL, tests, synthesis, and
              artifacts without sending your source code to Buildstack.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {featurePills.map((pill) => (
              <Badge key={pill} variant="muted">
                {pill}
              </Badge>
            ))}
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full justify-between"
            onClick={() => setIsLaunching(true)}
            data-cursor="interactive"
          >
            Explore AgentIC
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <AnimatedTerminal
          title="agentic://repair-loop"
          lines={agenticTerminalLines}
          loop
          loopDelay={1200}
        />
      </motion.article>

      {isLaunching ? (
        <motion.div
          layoutId="agentic-card"
          className="fixed inset-4 z-[80] rounded-[2rem] border border-border bg-bg-elevated/96 shadow-glow-strong backdrop-blur-2xl"
        />
      ) : null}
    </>
  );
}

export default AgentICCard;
