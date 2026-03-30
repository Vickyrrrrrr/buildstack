"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import { Terminal, Copy, Check } from "lucide-react";
import { useInView } from "framer-motion";

type LogEntry = {
  text: string;
  type:
    | "command"
    | "system"
    | "tool"
    | "warning"
    | "error"
    | "agent"
    | "agent_success"
    | "success";
};

const RAW_LOGS: LogEntry[] = [
  { text: "$ buildstack agentic-run --design riscv_core --target sky130", type: "command" },
  { text: "[INFO] Initializing OpenLane v2.0 pipeline...", type: "system" },
  { text: "[INFO] Parsing SystemVerilog module 'alu_pipeline'...", type: "system" },
  { text: "[YOSYS] Executing synth_sky130...", type: "tool" },
  { text: "[OPENROAD] Starting global placement iteration 1/3", type: "tool" },
  { text: "[OPENROAD] Global placement complete. Target density: 68.2%", type: "system" },
  { text: "[WARNING] Hold time violation (-0.12ns) detected at path clk_gen -> mem_ctrl", type: "warning" },
  { text: "[WARNING] Congestion hotspot detected at coordinates (1500, 2400)", type: "warning" },
  { text: "[CRITICAL] DRC Error: Max fanout violation on reset_n_sync (Fanout: 142 > Limit: 50)", type: "error" },
  { text: "agentic: Critical faults detected. Analyzing failure modes...", type: "agent" },
  { text: "agentic: Synthesizing logic patch for setup violation...", type: "agent" },
  { text: "agentic: Expanding clock tree and inserting buffers [sky130_fd_sc_hd__clkbuf_4]", type: "agent_success" },
  { text: "agentic: Injecting localized congestion relief via macro padding...", type: "agent" },
  { text: "agentic: Patch applied via incremental ECO. Re-running STA and LVS...", type: "agent_success" },
  { text: "[OPENROAD] Static Timing Analysis: WNS is now MET (+0.08ns)", type: "success" },
  { text: "[MAGIC] DRC Check: 0 violations found.", type: "success" },
  { text: "[INFO] GDSII layer successfully streamed to out/riscv_core.gds. Tapeout ready.", type: "success" },
  { text: "agentic: Pipeline fully repaired. Returning to idle.", type: "agent_success" },
];

export function LiveTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setLogs((prev) => {
        if (prev.length < RAW_LOGS.length) {
          // Auto scroll to bottom smoothly
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          }, 10);
          
          const nextLog = RAW_LOGS[prev.length];
          return nextLog ? [...prev, nextLog] : prev;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 600); // Wait 600ms between each log line for realism

    return () => clearInterval(interval);
  }, [isInView]);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm i -g agentic");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getColorClass = (type: LogEntry["type"]) => {
    switch (type) {
      case "command":
        return "text-text-primary font-bold";
      case "error":
        return "text-accent-error";
      case "warning":
        return "text-yellow-400";
      case "agent":
        return "text-accent-primary animate-pulse";
      case "agent_success":
        return "text-accent-primary font-bold";
      case "success":
        return "text-green-400";
      case "tool":
        return "text-text-muted";
      default:
        return "text-gray-300";
    }
  };

  return (
    <section className="section-shell" ref={containerRef}>
      <Reveal className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-xl space-y-4 lg:w-1/2">
            <h2 className="section-title">See your silicon compile in real-time.</h2>
            <p className="body-copy text-lg">
              Stop debugging thousands of lines of Yosys outputs. Watch AgentIC ingest
              your EDA logs, identify critical pathways, and autonomously inject fixes—live.
              CLI Coming Soon .
            </p>
            <div className="pt-4 flex items-center gap-4">
               <div className="inline-flex h-11 items-center rounded-lg border border-border bg-bg-surface px-4 font-mono text-sm text-text-muted shadow-sm">
                 <span className="mr-2 text-accent-primary">$</span> npm i -g agentic
                 <button onClick={handleCopy} className="ml-4 hover:text-text-primary transition">
                   {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                 </button>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="absolute inset-x-8 -inset-y-8 bg-accent-primary/5 blur-[100px] pointer-events-none rounded-full" />
             <div className="surface-panel relative flex h-[420px] w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-[#0A0A0B] shadow-2xl">
                {/* Mac OS Terminal Header */}
                <div className="flex h-10 w-full shrink-0 items-center justify-between border-b border-border/40 bg-[#121214] px-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent-error/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                    <Terminal className="h-4 w-4" />
                    bash — buildstack
                  </div>
                  <div className="w-14" /> {/* Spacer */}
                </div>

                {/* Terminal Body */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed scroll-smooth text-gray-300">
                  {logs.map((log, index) => {
                    if (!log) return null;
                    return (
                      <div key={index} className="mb-1">
                        <span className={cn(getColorClass(log.type))}>{log.text}</span>
                      </div>
                    );
                  })}
                  {/* Blinking Cursor */}
                  {logs.length < RAW_LOGS.length && (
                    <div className="mt-1 h-4 w-2 animate-pulse bg-gray-400" />
                  )}
                  {logs.length === RAW_LOGS.length && (
                    <div className="mt-1"><span className="text-accent-primary font-bold">$</span> <span className="animate-pulse opacity-70">_</span></div>
                  )}
                </div>
             </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default LiveTerminal;
