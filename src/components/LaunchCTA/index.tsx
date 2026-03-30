import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

export function LaunchCTA() {
  return (
    <section id="launch" className="section-shell">
      <Reveal className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-launch-radial px-6 py-16 text-center shadow-surface md:px-10">
          <div className="circuit-tile absolute inset-0 opacity-[0.04]" />
          <div className="relative mx-auto max-w-3xl space-y-6">
            <p className="eyebrow">Launch</p>
            <h2 className="section-title">Ready to bypass the EDA bottleneck?</h2>
            <p className="body-copy text-lg">
              AgentIC is live. Start your first autonomous chip design run. It will fix
              itself until it&apos;s done.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/agentic">
                  Launch AgentIC
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link href="/#technology" className="eyebrow transition hover:text-text-primary">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default LaunchCTA;
