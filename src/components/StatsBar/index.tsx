"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

const stats = [
  { value: 16, suffix: "", label: "Active Pipelines", description: "AgentIC live in production research flow" },
  { value: 130, suffix: "nm", label: "Sky130 PDK", description: "Open standard SkyWater process baseline" },
  { value: 2, suffix: "", label: "OpenLane v2", description: "Modernized flow orchestration and repair hooks" },
  { value: 0, suffix: "", label: "Human Interventions", description: "Autonomous clean-run target across repair loops" },
] as const;

export function StatsBar() {
  const rootRef = useRef<HTMLElement | null>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        valueRefs.current.forEach((element, index) => {
          const stat = stats[index];
          if (!element || !stat) return;

          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: stat.value,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: () => {
              element.textContent = `${Math.round(proxy.value)}${stat.suffix}`;
            },
          });
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
    <section ref={rootRef} className="border-y border-border bg-bg-surface/80 py-6">
      <Reveal className="container">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="space-y-2 border-border/80 md:border-r md:pr-6 xl:last:border-r-0">
              <div className="font-mono text-[1.85rem] uppercase tracking-[-0.04em] text-text-primary">
                <span ref={(node) => { valueRefs.current[index] = node; }}>
                  0{stat.suffix}
                </span>
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
