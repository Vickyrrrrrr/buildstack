import type { Metadata } from "next";
import AgentICClientPage from "./client";

export const metadata: Metadata = {
  title: "AgentIC — Autonomous VLSI Design Agent | Buildstack EDA Lab",
  description: "AgentIC is a local-first desktop workspace for autonomous chip design. Connect your local EDA tools, PDKs, and models to run closed-loop Verilog repair, STA timing, and DRC checks.",
};

export default function AgentICPage() {
  return <AgentICClientPage />;
}
