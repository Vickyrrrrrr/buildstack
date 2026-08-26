import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    question: "What operating systems does AgentIC support?",
    answer:
      "AgentIC natively supports Linux and macOS (Apple Silicon & Intel). The desktop app is Electron-based with a local Python backend that interacts directly with your local EDA tools and PDKs.",
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
      "AgentIC can be downloaded and used without a license key or account. If AgentIC ever introduces paid plans in the future, the pricing page will be updated accordingly.",
  },
  {
    question: "Where can I download AgentIC?",
    answer:
      "AgentIC can be downloaded from https://buildstack.live/agentic/download. Builds are available for macOS (.dmg) and Linux (.AppImage, .deb).",
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
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      <main className="pt-28 pb-20">
        <section className="section-shell">
          <div className="container max-w-4xl space-y-10">
            <div className="space-y-4">
              <Badge variant="accent" className="w-fit">
                AgentIC FAQ
              </Badge>
              <h1 className="section-title">Frequently Asked Questions</h1>
              <p className="body-copy text-lg">
                Everything you need to know about AgentIC, local EDA automation, supported PDKs, and pricing.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="surface-panel p-6 md:p-8 space-y-3">
                  <h2 className="text-xl font-semibold tracking-[-0.01em] text-text-primary">
                    {faq.question}
                  </h2>
                  <p className="body-copy text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/agentic/download">Download AgentIC</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/agentic/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
