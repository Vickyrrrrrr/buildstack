"use client";

import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import { GitMerge, Plus, Minus, ArrowRight } from "lucide-react";

const diffLines = [
  { text: "module clk_gen (", type: "unchanged" },
  { text: "  input wire clk_in,", type: "unchanged" },
  { text: "  output wire clk_out", type: "unchanged" },
  { text: ");", type: "unchanged" },
  { text: "  // High fan-out net causes DRC max_capacitance violation", type: "removed" },
  { text: "  assign clk_out = clk_in;", type: "removed" },
  { text: "  // AgentIC injected optimized buffer to resolve violation", type: "added" },
  { text: "  sky130_fd_sc_hd__clkbuf_4 u_buffer_root (", type: "added" },
  { text: "    .X(clk_out),", type: "added" },
  { text: "    .A(clk_in)", type: "added" },
  { text: "  );", type: "added" },
  { text: "endmodule", type: "unchanged" }
];

export function CodeDiffViewer() {
  return (
    <section className="section-shell relative z-10 py-24">
      <Reveal className="container flex flex-col items-center">
        <div className="mb-14 text-center max-w-2xl space-y-4">
          <p className="eyebrow flex items-center justify-center gap-2">
            <GitMerge className="h-4 w-4" /> Autonomous Pull Requests
          </p>
          <h2 className="section-title">Zero-Touch DRC Resolutions.</h2>
          <p className="body-copy text-lg">
            AgentIC doesn&apos;t just flag errors; it surgically patches your RTL and Netlists. 
            Review diffs, approve branches, and push to production with confidence.
          </p>
        </div>

        <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-[#141416] shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border/40 bg-[#1C1C1E] px-4 py-3 text-sm font-medium text-text-muted">
             <div className="flex gap-1.5 mr-4">
               <div className="h-3 w-3 rounded-full bg-red-500/80" />
               <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
               <div className="h-3 w-3 rounded-full bg-green-500/80" />
             </div>
             <span className="flex items-center gap-2 text-gray-400">
                src/rtl/clk_gen.v <ArrowRight className="h-3 w-3" /> <span className="text-accent-primary">agentic/patch-14</span>
             </span>
          </div>
          
          <div className="font-mono text-[13px] sm:text-sm leading-relaxed tracking-tight py-4 overflow-x-auto">
            {diffLines.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex px-4 py-0.5 whitespace-pre min-w-[max-content]",
                  line.type === "added" ? "bg-green-500/10 text-green-400" :
                  line.type === "removed" ? "bg-red-500/10 text-red-400" :
                  "text-gray-300"
                )}
              >
                <div className="flex w-12 shrink-0 select-none text-gray-500">
                   {line.type === "added" && <Plus className="mr-2 h-4 w-4 text-green-500/70" />}
                   {line.type === "removed" && <Minus className="mr-2 h-4 w-4 text-red-500/70" />}
                   {line.type === "unchanged" && <span className="w-6" />}
                   {idx + 1}
                </div>
                <div>{line.text}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default CodeDiffViewer;
