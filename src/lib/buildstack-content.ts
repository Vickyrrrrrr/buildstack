import type { TerminalLine } from "@/types/terminal";

export const navItems = [
  { label: "Products", href: "/#products" },
  { label: "Technology", href: "/#technology" },
  { label: "Methodology", href: "/#methodology" },
  { label: "About", href: "/#about" },
] as const;

export const heroTickerItems = [
  "SKYWATER_130NM",
  "OPENLANE_V2",
  "RTL_SYNTHESIS",
  "GDSII_TAPEOUT",
  "DRC_AUTO_FIX",
  "LVS_REPAIR_LOOP",
  "FORMAL_SIGNOFF",
  "PLACE_AND_ROUTE",
  "ZERO_HUMAN_INTERVENTIONS",
] as const;

export const agenticTerminalLines: TerminalLine[] = [
  { text: '$ agentic run --intent "32-bit RISC-V ALU, Sky130"', type: "output", delay: 200 },
  { text: "", type: "info", delay: 80 },
  { text: "[OK] Parsing design intent...", type: "success" },
  { text: "[OK] Generating RTL (Verilog)...", type: "success" },
  { text: "[OK] Running Yosys synthesis...", type: "success" },
  { text: "[OK] OpenLane P&R initiated...", type: "success" },
  { text: "", type: "info", delay: 80 },
  { text: "[FAIL] DRC FAILED - 3 violations detected", type: "error" },
  { text: "    -> M2 spacing violation at (142, 88)", type: "error" },
  { text: "    -> Via enclosure error at (203, 71)", type: "error" },
  { text: "", type: "info", delay: 80 },
  { text: "[FIX] Repair Agent activated...", type: "repair" },
  { text: "[FIX] Analyzing violation trace...", type: "repair" },
  { text: "[FIX] Patching floorplan constraints...", type: "repair" },
  { text: "[FIX] Re-running affected routing stage...", type: "repair" },
  { text: "", type: "info", delay: 80 },
  { text: "[OK] DRC: 0 violations - Clean", type: "success" },
  { text: "[OK] LVS: Matched", type: "success" },
  { text: "[OK] Formal Sign-off: PASS", type: "success" },
  { text: "-> GDSII written to /output/riscv_alu.gds", type: "output" },
  { text: "-> Total loops: 2 | Human interventions: 0", type: "output" },
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
    name: "NetScope",
    description: "Visual netlist analysis and timing path explorer",
  },
  {
    name: "SynthAI",
    description: "ML-driven synthesis optimization for area/power",
  },
] as const;

export const technologyStack = [
  "OpenLane v2 (Apache 2.0)",
  "SkyWater Sky130 PDK",
  "Yosys RTL Synthesis",
  "Magic VLSI Layout Tool",
  "KLayout for GDSII verification",
  "Autonomous Repair Engine (proprietary - Buildstack)",
] as const;

export const openLaneConfig = `{
  "DESIGN_NAME": "riscv_alu",
  "VERILOG_FILES": ["src/alu.v"],
  "CLOCK_PORT": "clk",
  "CLOCK_PERIOD": 10,
  "FP_CORE_UTIL": 40,
  "PL_TARGET_DENSITY": 0.45
}`;
