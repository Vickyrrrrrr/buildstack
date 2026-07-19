import type { Metadata } from "next";
import AgentICClientPage from "./client";

export const metadata: Metadata = {
  title: "AgentIC — Autonomous VLSI Design Agent | Buildstack EDA Lab",
  description:
    "AgentIC is an AI-powered VLSI design agent that automates RTL-to-GDSII chip design. It writes Verilog, runs synthesis (Yosys), simulation (Verilator), STA (OpenSTA), physical design (OpenROAD), and DRC/LVS (Magic/KLayout). Supports Sky130, ASAP7, gf180mcu PDKs and analog SPICE flow. Local-first desktop app for Windows, Linux, macOS.",
  keywords: [
    "AgentIC",
    "AI VLSI design",
    "AI chip design",
    "automated EDA",
    "RTL to GDSII automation",
    "AI agent for chip design",
    "VLSI design automation",
    "autonomous chip design",
    "Verilog generation AI",
    "Yosys synthesis automation",
    "OpenROAD automation",
    "Sky130 AI design",
    "ngspice AI",
    "SPICE simulation AI agent",
    "DRC LVS automation",
    "EDA AI agent",
    "semiconductor AI",
    "chip design copilot",
    "RTL design agent",
    "analog design AI",
  ],
  alternates: {
    canonical: "https://buildstack.live/agentic",
  },
  openGraph: {
    title: "AgentIC — Autonomous VLSI Design Agent",
    description:
      "AI-powered chip design agent. Writes Verilog, runs synthesis, simulation, STA, PnR, and DRC/LVS autonomously. Local-first. Supports Sky130, ASAP7, gf180mcu.",
    url: "https://buildstack.live/agentic",
    type: "website",
    images: [
      {
        url: "https://www.buildstack.live/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgentIC — Autonomous VLSI Design Agent | Buildstack EDA Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentIC — Autonomous VLSI Design Agent | Buildstack EDA Lab",
    description: "AI-powered chip design agent. Writes Verilog, runs synthesis, simulation, STA, PnR, and DRC/LVS autonomously. Local-first.",
    images: ["https://www.buildstack.live/og-image.png"],
  },
};

export default function AgentICPage() {
  return <AgentICClientPage />;
}
