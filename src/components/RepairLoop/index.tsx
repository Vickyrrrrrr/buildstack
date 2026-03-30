"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircuitBoard, ShieldCheck, TerminalSquare } from "lucide-react";
import Reveal from "@/components/Reveal";

const callouts = [
  {
    icon: TerminalSquare,
    title: "Compiler-Guided Feedback",
    text: "AgentIC parses raw Yosys and OpenLane logs, extracts specific violations, and surgically patches only the failing lines instead of rewriting the full design.",
  },
  {
    icon: CircuitBoard,
    title: "Closed-Loop Physical Repair",
    text: "Timing slack violations and congestion maps are fed back into RTL. AgentIC can insert pipeline stages or adjust floorplan density without touching the rest of the design.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Human Checkpoints",
    text: "The loop runs until DRC, LVS, and formal sign-off are clean. Every repair is logged with a diff of what changed and why for a full audit trail.",
  },
] as const;

const nodes = [
  { label: "Run Stage", x: 110, y: 64, colorClass: "fill-accent-primary text-accent-primary" },
  { label: "Detect Error", x: 318, y: 64, colorClass: "fill-accent-error text-accent-error" },
  { label: "Diagnose Root Cause", x: 318, y: 236, colorClass: "fill-accent-repair text-accent-repair" },
  { label: "Apply Fix + Retry", x: 110, y: 236, colorClass: "fill-accent-primary text-accent-primary" },
] as const;

export function RepairLoop() {
  const rootRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const counterRef = useRef<SVGTSpanElement | null>(null);
  const particleRef = useRef<SVGRectElement | null>(null);

  const paths = useMemo(
    () => [
      "M148 64 H280",
      "M318 102 V198",
      "M280 236 H148",
      "M110 198 V102",
    ],
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const pathElements =
          svgRef.current?.querySelectorAll<SVGPathElement>("[data-loop-path]");

        pathElements?.forEach((path) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;
        });

        if (pathElements?.length) {
          gsap.to(pathElements, {
            strokeDashoffset: 0,
            duration: 0.45,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
              once: true,
            },
          });
        }

        const proxy = { value: 747 };
        if (counterRef.current) {
          gsap.to(proxy, {
            value: 0,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 45%",
              once: true,
            },
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = proxy.value.toFixed(0);
              }
            },
          });
        }

        const particle = particleRef.current;
        if (particle) {
          gsap.set(particle, { x: 110, y: 64, opacity: 1 });
          
          const tl = gsap.timeline({
            repeat: -1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
            },
          });
          
          const speed = 150; // pixels per second
          const dX = 318 - 110;
          const dY = 236 - 64;
          const durX = dX / speed;
          const durY = dY / speed;
          
          tl.to(particle, { x: 318, duration: durX, ease: "none" })
            .to(particle, { y: 236, duration: durY, ease: "none" })
            .to(particle, { x: 110, duration: durX, ease: "none" })
            .to(particle, { y: 64, duration: durY, ease: "none" });
        }
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
    <section ref={rootRef} className="section-shell">
      <Reveal className="container space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="eyebrow">Repair Loop</p>
          <h2 className="section-title">It Fixes Itself.</h2>
          <p className="body-copy text-lg">
            Most EDA pipelines stop at the first violation. AgentIC treats every error as
            an input.
          </p>
        </div>

        <div className="surface-panel grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-border bg-bg-elevated/80 shadow-sm circuit-tile p-4">
            <svg
              ref={svgRef}
              viewBox="0 0 428 300"
              className="h-full w-full"
              aria-label="AgentIC repair loop diagram"
            >
              {paths.map((path, index) => (
                <path
                  key={path}
                  data-loop-path
                  d={path}
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity={index === 1 ? 0.8 : 0.65}
                  fill="none"
                />
              ))}
              {nodes.map((node) => (
                <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
                  <circle
                    r="34"
                    className={node.colorClass}
                    fillOpacity="0.12"
                    stroke="currentColor"
                  />
                  <text
                    x="0"
                    y={node.y < 150 ? -48 : 56}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight="600"
                    letterSpacing="1.2"
                    fill="var(--text-primary)"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
              <rect
                ref={particleRef}
                width="14"
                height="14"
                x="-7"
                y="-7"
                rx="3"
                fill="var(--accent-primary)"
                className="pointer-events-none drop-shadow-[0_0_12px_rgba(217,119,69,0.9)]"
                opacity="0"
              />
              <text
                x="214"
                y="150"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="24"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                <tspan ref={counterRef}>747</tspan> DRC Errors
              </text>
              <text
                x="214"
                y="176"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fontWeight="500"
                letterSpacing="1.6"
                fill="var(--text-muted)"
              >
                Resolved to Zero
              </text>
              <text
                x="82"
                y="150"
                transform="rotate(-90 82 150)"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fontWeight="600"
                letterSpacing="1.6"
                fill="var(--text-primary)"
              >
                Until clean loop
              </text>
            </svg>
          </div>

          <div className="space-y-4">
            {callouts.map((callout, index) => {
              const Icon = callout.icon;
              return (
                <Reveal
                  key={callout.title}
                  delay={index * 0.08}
                  className="rounded-[1.25rem] border border-border bg-bg-elevated/70 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-full border border-border bg-bg-surface p-3 text-accent-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold tracking-[-0.03em]">
                        {callout.title}
                      </h3>
                      <p className="body-copy">{callout.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default RepairLoop;
