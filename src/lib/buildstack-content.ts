import type { TerminalLine } from "@/types/terminal";

export const navItems = [
  { label: "AgentIC", href: "/agentic" },
  { label: "Pricing", href: "/agentic/pricing" },
  { label: "Technology", href: "/#technology" },
  { label: "Contact", href: "/contact" },
] as const;

export const heroTickerItems = [
  "ANY_PDK",
  "ANY_HARDENING_TOOL",
  "RTL_SYNTHESIS",
  "GDSII_TAPEOUT",
  "DRC_AUTO_FIX",
  "LVS_REPAIR_LOOP",
  "FORMAL_SIGNOFF",
  "PLACE_AND_ROUTE",
  "WORKS_WITH_YOU",
] as const;

export const agenticTerminalLines: TerminalLine[] = [
  { text: '$ agentic desktop', type: "output", delay: 200 },
  { text: "", type: "info", delay: 80 },
  { text: "[OK] License verified", type: "success" },
  { text: "[OK] Model key configured locally", type: "success" },
  { text: "[OK] Discovering EDA tools and PDKs", type: "success" },
  { text: "[OK] Creating RTL and testbench files", type: "success" },
  { text: "", type: "info", delay: 80 },
  { text: "[RUN] Simulating with local tools", type: "output" },
  { text: "[WARN] Compile issue found", type: "error" },
  { text: "", type: "info", delay: 80 },
  { text: "[FIX] Reading project context", type: "repair" },
  { text: "[FIX] Patching source and constraints", type: "repair" },
  { text: "[FIX] Re-running verification", type: "repair" },
  { text: "", type: "info", delay: 80 },
  { text: "[OK] Build artifacts refreshed", type: "success" },
  { text: "-> Files stay under AgentIC-workspace", type: "output" },
  { text: "-> Cloud sees license + usage counts only", type: "output" },
];

export const technologyTerminalLines: TerminalLine[] = [
  { text: "$ openlane config inspect ./designs/riscv_alu/config.json", type: "output", delay: 180 },
  { text: "[OK] Resolving design context...", type: "success" },
  { text: "[OK] Sky130 PDK mounted", type: "success" },
  { text: "[OK] Flow profile loaded", type: "success" },
  { text: "-> Config rendered below", type: "output", delay: 120 },
];

export const futureTools = [
  {
    name: "Autonomous PCB Builder",
    description: "AI-driven schematic-to-layout automation for complex boards",
  },
] as const;

export const technologyStack = [
  "Local Electron desktop runtime",
  "FastAPI executor on localhost",
  "OpenAI-compatible BYOK model providers",
  "Native, Docker, WSL, and proprietary EDA flows",
  "Workspace-scoped file and command tools",
  "Signed cloud entitlement verification",
] as const;

export const openLaneConfig = `{
  "DESIGN_NAME": "riscv_alu",
  "VERILOG_FILES": ["src/alu.v"],
  "CLOCK_PORT": "clk",
  "CLOCK_PERIOD": 10,
  "FP_CORE_UTIL": 40,
  "PL_TARGET_DENSITY": 0.45
}`;
