import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentIC FAQ — Frequently Asked Questions | Buildstack",
  description:
    "Answers to common questions about AgentIC: what it is, supported PDKs, analog design, EDA tools, platforms, pricing, and how it automates VLSI chip design.",
};

const faqs = [
  {
    question: "What is AgentIC?",
    answer:
      "AgentIC is an AI-powered VLSI design agent that automates RTL-to-GDSII chip design flows. It bridges large language models with local Electronic Design Automation (EDA) tools and Process Design Kits (PDKs) to autonomously write, verify, and harden digital and analog designs.",
  },
  {
    question: "What PDKs does AgentIC support?",
    answer:
      "AgentIC supports SkyWater Sky130, GlobalFoundries GF180MCU, ASAP7, and Nangate45 as open-source PDKs. Any proprietary PDK (TSMC, Intel, Samsung) can be used via local installation. The agent discovers available PDKs automatically and asks the user which to target.",
  },
  {
    question: "Can AgentIC design analog circuits?",
    answer:
      "Yes. AgentIC supports analog and mixed-signal design via SPICE netlist generation and simulation with ngspice (open source) or Spectre, Eldo, HSPICE, and Xyce (proprietary). It uses real PDK transistor primitives (e.g. sky130_fd_pr__nfet_01v8) and can run DC, AC, transient, and Monte Carlo analyses. Schematic capture is supported via xschem.",
  },
  {
    question: "What EDA tools does AgentIC work with?",
    answer:
      "AgentIC works with both open-source and proprietary EDA tools. Open-source: Yosys (synthesis), Verilator/iverilog (simulation), OpenROAD (physical design), OpenSTA (timing), Magic/KLayout/Netgen (DRC/LVS), ngspice (SPICE simulation). Proprietary: VCS, Xcelium, Questa (simulation), Design Compiler/Genus (synthesis), Innovus/ICC2 (PnR), PrimeTime/Tempus (STA), Calibre (DRC/LVS).",
  },
  {
    question: "Does AgentIC run on Windows?",
    answer:
      "Yes. AgentIC runs on Windows (via WSL for EDA tools), Linux, and macOS. The desktop app is Electron-based with a local Python backend. On Windows, EDA tools run inside WSL (Windows Subsystem for Linux) and the app connects to them over localhost.",
  },
  {
    question: "Is my chip design data sent to the cloud?",
    answer:
      "No. AgentIC is local-first. Your RTL, netlists, PDK files, simulation logs, and design artifacts never leave your machine. The only external calls are to your configured LLM provider (for agent reasoning) and the license server (for entitlement verification). You can use a local LLM (e.g. Ollama) for zero data leaving your machine.",
  },
  {
    question: "How does AgentIC verify its designs?",
    answer:
      "AgentIC follows a real VLSI verification methodology: it lints every RTL file after writing (verilator/iverilog), simulates with testbenches, runs synthesis with SDC constraints, performs STA with real parasitics, and executes DRC/LVS/antenna checks before declaring a design complete. An auto-checkpoint engine parses EDA logs and returns structured pass/fail verdicts.",
  },
  {
    question: "How does AgentIC handle SRAMs and memories?",
    answer:
      "AgentIC never infers large memories as flip-flop arrays. It queries the PDK capability graph for available compiled SRAM macros (e.g. sky130_sram_2kbyte_1rw1r_32x512_8), instantiates the real macro in a wrapper, and uses black-box synthesis with the macro's Liberty file. If no macro exists, it proposes OpenRAM compilation or asks the user.",
  },
  {
    question: "Can AgentIC integrate third-party SystemVerilog IP?",
    answer:
      "Yes. AgentIC uses sv2v (the open-source SystemVerilog-to-Verilog converter) to convert .sv IP for Yosys synthesis, and Verilator for native SystemVerilog simulation. It never hand-rolls custom preprocessors.",
  },
  {
    question: "What is the difference between AgentIC and a generic coding agent?",
    answer:
      "Generic coding agents treat VLSI output as plain text and dump raw terminal logs into the LLM context. AgentIC has a local backend runtime that parses gigabytes of EDA logs into structured verdicts, maintains a durable checkpoint engine for state recovery, indexes PDK cell libraries for grounding, and enforces VLSI quality gates (behavioral memory rejection, non-synthesizable construct detection, one-module-per-file, structural top-level). It is purpose-built for chip design.",
  },
  {
    question: "How much does AgentIC cost?",
    answer:
      "AgentIC offers Starter and Pro subscription plans. License verification uses signed entitlements (RSA public key cryptography). See the pricing page at https://buildstack.live/agentic/pricing for current rates.",
  },
  {
    question: "Where can I download AgentIC?",
    answer:
      "AgentIC can be downloaded from https://buildstack.live/agentic/download. Builds are available for Windows (NSIS installer), Linux (AppImage, deb), and macOS (dmg).",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-bg-base pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl font-bold text-text-primary mb-4">
          AgentIC FAQ
        </h1>
        <p className="text-text-secondary text-lg mb-12">
          Frequently asked questions about AgentIC, the AI-powered VLSI design agent.
        </p>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border-base pb-6">
              <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
                {faq.question}
              </h2>
              <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="/agentic/download"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Download AgentIC
          </a>
          <a
            href="/agentic/pricing"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border-base text-text-primary font-semibold hover:bg-surface-hover transition-colors"
          >
            View Pricing
          </a>
        </div>
      </div>
    </main>
  );
}
