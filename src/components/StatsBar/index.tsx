"use client";

import Reveal from "@/components/Reveal";

const stats = [
  { value: "Zero", label: "IP Leaks", description: "Runs 100% locally on your machine." },
  { value: "Any", label: "Foundry PDK", description: "Seamlessly integrates with your existing libraries." },
  { value: "Auto", label: "Error Recovery", description: "Autonomous loops that fix timing and routing." },
  { value: "One", label: "Prompt", description: "From idea to GDSII without the boilerplate." },
] as const;

export function StatsBar() {
  return (
    <section className="border-y border-border bg-bg-surface/80 py-6">
      <Reveal className="container">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2 border-border/80 md:border-r md:pr-6 xl:last:border-r-0">
              <div className="text-2xl font-semibold tracking-tight text-text-primary">
                {stat.value}
              </div>
              <p className="eyebrow text-text-primary">{stat.label}</p>
              <p className="text-sm leading-6 text-text-muted">{stat.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default StatsBar;
