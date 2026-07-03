# Buildstack EDA Lab

**Buildstack EDA Lab** builds agentic EDA automation tools for the semiconductor industry. Our mission is to make chip design autonomous — from design intent to DRC-clean GDSII — by bridging large language models with local Electronic Design Automation (EDA) tools and Process Design Kits (PDKs).

## AgentIC — Autonomous VLSI Design Agent

**AgentIC** is the flagship product of Buildstack EDA Lab. It is an AI-powered VLSI design agent that automates RTL-to-GDSII chip design flows using the user's local EDA tools and PDKs.

AgentIC is **local-first**: your chip source code, RTL, netlists, PDK files, simulation logs, and design artifacts never leave your machine. The agent reasons via your configured LLM provider (or a local LLM like Ollama for zero data egress), and executes EDA tools locally.

### What AgentIC does

- **RTL writing, linting, and auto-repair** — writes Verilog/SystemVerilog, lints with verilator/iverilog, auto-fixes syntax/width/connectivity errors
- **Synthesis** — Yosys (OSS), Design Compiler, Genus (proprietary) with SDC constraints
- **Simulation** — Verilator, iverilog (OSS), VCS, Xcelium, Questa (proprietary)
- **Static Timing Analysis** — OpenSTA (OSS), PrimeTime, Tempus (proprietary)
- **Physical Design** — OpenROAD (OSS), Innovus, ICC2 (proprietary): floorplan → placement → CTS → routing
- **Physical Verification** — Magic, KLayout, Netgen (OSS), Calibre (proprietary): DRC, LVS, antenna checks
- **Analog / Mixed-Signal** — SPICE netlist generation + simulation via ngspice (OSS), Spectre, Eldo, HSPICE, Xyce (proprietary); schematic capture via xschem
- **Interactive schematics** — Yosys-generated gate-level schematics with pan/zoom/hover, rendered in-app
- **Waveform viewer** — VCD/FST waveform display in a dedicated tab
- **PDK catalog** — browsable index of available PDK cell libraries, memory macros, and capability evidence
- **DRC/LVS dashboard** — parsed signoff reports with pass/fail status, violation counts, and source evidence
- **Auto-checkpoint engine** — parses EDA tool logs into structured `{pass, errors}` verdicts, preventing log explosion in the LLM context
- **Design-state ledger** — durable checkpoint engine for state recovery; roll back to any previous design stage
- **Capability graph** — indexes PDK cell libraries to ground the agent's hardware decisions in real evidence

### Supported PDKs

| PDK | Node | Type |
|-----|------|------|
| SkyWater Sky130 | 130nm | Open source (volare / Open_PDKs) |
| GlobalFoundries GF180MCU | 180nm | Open source |
| ASAP7 | 7nm (research) | Open source |
| Nangate45 | 45nm | Open source reference |
| Any proprietary | Any | Via local installation (TSMC, Intel, Samsung, etc.) |

The agent discovers available PDKs automatically and asks the user which to target.

### Supported EDA Tools

**Open-source:** Yosys, Verilator, iverilog, OpenROAD, OpenSTA, Magic, KLayout, Netgen, ngspice, xschem, OpenRAM, OpenLane, volare

**Proprietary:** VCS, Xcelium, Questa, Vlogan, Vlog, Xrun, Irun, Xmvlog, Xmelab, Xmsim, Design Compiler, Genus, Innovus, ICC2, PrimeTime, Tempus, Calibre, Spectre, Eldo, HSPICE, Xyce

### Platforms

- **Windows** — EDA tools run in WSL (Windows Subsystem for Linux); desktop app connects over localhost
- **Linux** — native EDA tool execution
- **macOS** — native (limited EDA tool availability; works with Docker/remote backends)

### How it works

```
User intent → Agent (LLM) → Backend (Python) → Local EDA Tools → Verified silicon artifacts
                    ↑                              |
                    └── structured verdicts ←──────┘
                         (parsed logs, not raw text)
```

1. The user describes what chip to design (e.g. "design a 32-bit ALU on Sky130")
2. The agent plans the architecture (hierarchy, interfaces, clock/reset, memory map)
3. The agent writes RTL, lints it, simulates it — bottom-up, one module at a time
4. The agent runs synthesis, STA, physical design, and DRC/LVS signoff
5. The auto-checkpoint engine parses every EDA run into structured pass/fail verdicts
6. The agent iterates until signoff is clean (DRC=0, LVS=clean, STA≥0)
7. The user gets a verified, fabrication-ready design

### Quality gates

AgentIC enforces real VLSI engineering discipline via write-time quality gates:
- **Behavioral memory rejection** — `reg [...] mem [...]` > 1024 bits in design files is blocked; the agent must query the PDK for real SRAM macros
- **Non-synthesizable construct detection** — `initial`, `#delay`, `$system` tasks in design modules are blocked
- **One module per file** — each `.v` file must contain exactly one module definition
- **Structural top-level enforcement** — `*_top.v` must be instantiation + wiring only, no logic
- **Mandatory lint after every write** — the agent must compile-check every RTL file before declaring it done

### Download

| Platform | Link |
|----------|------|
| Windows | [AgentIC Setup (NSIS)](https://github.com/Vickyrrrrrr/buildstack/releases/latest) |
| Linux | [AppImage / deb](https://github.com/Vickyrrrrrr/buildstack/releases/latest) |
| macOS | [dmg](https://github.com/Vickyrrrrrr/buildstack/releases/latest) |

Download page: [buildstack.live/agentic/download](https://buildstack.live/agentic/download)

### Pricing

Starter and Pro subscription plans. See [buildstack.live/agentic/pricing](https://buildstack.live/agentic/pricing).

### FAQ

See [buildstack.live/agentic/faq](https://buildstack.live/agentic/faq) for answers to common questions about PDK support, analog design, EDA tools, platforms, data privacy, and verification methodology.

## Links

- **Website:** [buildstack.live](https://buildstack.live)
- **AgentIC product page:** [buildstack.live/agentic](https://buildstack.live/agentic)
- **Download:** [buildstack.live/agentic/download](https://buildstack.live/agentic/download)
- **Pricing:** [buildstack.live/agentic/pricing](https://buildstack.live/agentic/pricing)
- **FAQ:** [buildstack.live/agentic/faq](https://buildstack.live/agentic/faq)
- **Contact:** [buildstack.live/contact](https://buildstack.live/contact)

## License

AgentIC is a commercial product. See [buildstack.live/terms](https://buildstack.live/terms) for terms of use.

---

© Buildstack EDA Lab. Intent → Silicon. Autonomous.
