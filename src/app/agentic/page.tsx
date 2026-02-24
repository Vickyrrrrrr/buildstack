import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, Activity, PackageCheck, Zap, Cpu, BookOpen } from 'lucide-react';

export default function AgentICPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-[#333333] selection:text-white font-sans">
            {/* Nav/Header Spacer roughly since normal header handles it but we want custom hero padding */}
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-white/[0.05]">
                {/* Academic Grid Background */}
                <div className="absolute top-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
                <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

                <div className="container relative z-10 mx-auto px-6">
                    <div className="flex flex-col items-center justify-center w-full mb-12 pt-6 animate-fade-in">
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)] relative overflow-hidden transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                                    <Cpu className="w-8 h-8 text-zinc-300 relative z-10 animate-pulse-slow" />
                                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
                                </div>
                                <span className="text-4xl md:text-5xl font-serif tracking-tight text-white border-b border-transparent group-hover:border-white/30 transition-colors duration-300 pb-1">
                                    AgentIC
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-4 text-zinc-500">
                                <BookOpen className="w-4 h-4" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                                    Research & Architecture
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl pt-8 mx-auto text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                            <span className="px-4 py-1.5 text-xs font-sans tracking-wide text-zinc-400 border border-zinc-800 rounded-sm bg-zinc-900/50">Runtime: Python 3.10+</span>
                            <span className="px-4 py-1.5 text-xs font-sans tracking-wide text-zinc-400 border border-zinc-800 rounded-sm bg-zinc-900/50">Architecture: Fail-Closed</span>
                            <span className="px-4 py-1.5 text-xs font-sans tracking-wide text-zinc-400 border border-zinc-800 rounded-sm bg-zinc-900/50">Validation: Multi-Corner STA + LEC</span>
                            <span className="px-4 py-1.5 text-xs font-sans tracking-wide text-zinc-400 border border-zinc-800 rounded-sm bg-zinc-900/50">Target: Sky130 / GF180</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-8 text-zinc-100 animate-flicker">
                            Autonomous Text-to-Silicon
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            A foundational framework for converting natural-language intent into verifiable RTL and physical implementation via
                            <span className="text-zinc-200"> structural synthesis loops.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="#architecture" className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-white bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors uppercase">
                                View Methodology <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#features" className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors uppercase underline underline-offset-4 decoration-zinc-700 hover:decoration-white">
                                Read Abstract
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why AgentIC Section */}
            <section className="py-24 bg-[#0a0a0a] border-b border-white/[0.05]">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-16 mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-serif mb-6 text-zinc-100">Addressing Paradigm Limitations</h2>
                        <div className="w-16 h-px bg-zinc-700 mx-auto mb-6"></div>
                        <p className="text-lg text-zinc-400 font-light">AgentIC structurally mitigates two primary failure modes inherent in contemporary LLM-driven EDA workflows.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="p-10 border border-zinc-800/50 bg-[#050505] relative group hover:border-zinc-700 transition-colors">
                            <h3 className="text-2xl font-serif mb-4 flex items-center gap-3 text-zinc-200">
                                <span className="text-xs font-sans tracking-widest text-zinc-500 uppercase">Fig 1.</span> Silent Regression
                            </h3>
                            <p className="text-zinc-400 leading-relaxed font-light text-sm">LLM pipelines frequently yield false positives against weak assertions. AgentIC enforces deterministic semantic rigor, multi-corner Static Timing Analysis, and Logical Equivalence Checking as non-negotiable exit criteria.</p>
                        </div>

                        <div className="p-10 border border-zinc-800/50 bg-[#050505] relative group hover:border-zinc-700 transition-colors">
                            <h3 className="text-2xl font-serif mb-4 flex items-center gap-3 text-zinc-200">
                                <span className="text-xs font-sans tracking-widest text-zinc-500 uppercase">Fig 2.</span> Infinite Churn
                            </h3>
                            <p className="text-zinc-400 leading-relaxed font-light text-sm">Unbounded generative loops reliably diverge. AgentIC implements stateful failure fingerprinting and probabilistic decay boundaries to assert a definitive <i>fail-closed</i> state upon stagnation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section id="features" className="py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-zinc-100">Core Propositions</h2>
                        <div className="w-16 h-px bg-zinc-700 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
                        {[
                            { title: 'Semantic Preflight', desc: 'Pre-synthesis structural verification; enforcing exact width resolution and port topological integrity.' },
                            { title: 'Finite Execution Bounds', desc: 'Deterministic limits on generation permutations derived from historical trajectory analysis.' },
                            { title: 'Telemetry Reduction', desc: 'Condensation of verbose EDA execution traces into actionable causal vectors.' },
                            { title: 'Implementation Feedback', desc: 'Closed-loop parameter adjustment informed by localized congestion and WNS deltas.' },
                            { title: 'Definitive Signoff', desc: 'Aggregated validation across power (IR drop), timing (Hold/Setup), and functional equivalence.' },
                            { title: 'Hierarchy Scaffolding', desc: 'Automated modular partitioning dictated by synthesized module interconnect topologies.' },
                        ].map((feature, i) => (
                            <div key={i} className="group">
                                <h3 className="text-lg font-serif mb-3 text-zinc-200 flex items-baseline gap-2">
                                    <span className="text-xs font-sans text-zinc-600 group-hover:text-zinc-400 transition-colors">0{i + 1}</span> {feature.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Architecture section */}
            <section id="architecture" className="py-32 bg-[#0a0a0a] border-y border-white/[0.05]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-zinc-100">State Machine Logic</h2>
                            <p className="text-base text-zinc-400 mb-8 font-light leading-relaxed">AgentIC abstains from linear prompt chains. It orchestrates a Directed Acyclic Graph (DAG) with explicit fallback conditions and constraint mutation.</p>

                            <div className="space-y-8">
                                <div className="border-l border-zinc-800 pl-6">
                                    <h4 className="font-serif text-lg text-zinc-200 mb-2">Error Localization</h4>
                                    <p className="text-sm text-zinc-400 font-light">Disambiguates between stimulus faults (Testbench) and logical synthesis faults (RTL), generating discrete summary matrices for contextual repair.</p>
                                </div>
                                <div className="border-l border-zinc-800 pl-6">
                                    <h4 className="font-serif text-lg text-zinc-200 mb-2">Heuristic Pivoting</h4>
                                    <p className="text-sm text-zinc-400 font-light">Detects timing stagnation (ΔWNS &lt; 0.01ns/epoch). Upon detection, induces structural modifications such as pipeline insertion or target density relaxation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-[#050505] border border-zinc-800/80 p-10 rounded-sm">
                            <div className="flex flex-col gap-3 font-mono text-xs text-zinc-500 leading-relaxed">
                                <div className="text-zinc-300 mb-4 border-b border-zinc-800 pb-2">/* Execution DAG Profile */</div>
                                <div><span className="text-zinc-400">STATE_INIT</span> <span className="opacity-50 mx-2">→</span> <span className="text-zinc-400">GEN_SPEC</span> <span className="opacity-50 mx-2">→</span> <span className="text-zinc-400">SYNTH_RTL</span></div>
                                <div className="pl-6 border-l-2 border-zinc-800/50 py-3 text-zinc-500 italic">
                                    // Syntax / Linter Validation Gate<br />
                                    if (ERR) return MUTATE_RTL
                                </div>
                                <div><span className="text-zinc-400">VERIFY_FUNCTIONAL</span> <span className="opacity-50 mx-2">→</span> <span className="text-zinc-400">VERIFY_FORMAL</span></div>
                                <div className="pl-6 border-l-2 border-zinc-800/50 py-3 text-zinc-500 italic">
                                    // Assertion Compliance Gate<br />
                                    if (SIM_FAIL) return ANALYZE_TRACE
                                </div>
                                <div><span className="text-zinc-400">PLACE_ROUTE</span> <span className="opacity-50 mx-2">→</span> <span className="text-zinc-400">PHYSICAL_SIGNOFF</span></div>
                                <div className="pl-6 border-l-2 border-zinc-800/50 py-3 text-zinc-500 italic">
                                    // Performance Convergence Gate<br />
                                    if (WNS_STAGNANT) apply HEURISTIC_RELAXATION<br />
                                    if (DRC_VIOLATION) apply ECO_PATCH
                                </div>
                                <div><span className="text-zinc-200 font-bold">TERMINATE_SUCCESS</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strict Gates Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-zinc-100">Validation Axioms</h2>
                        <div className="w-16 h-px bg-zinc-700 mx-auto"></div>
                    </div>
                    <div className="border border-zinc-800/50 bg-[#050505]">
                        {[
                            { stage: 'Initialization', rule: 'Toolchain dependencies and environment assertions validated' },
                            { stage: 'Synthesis', rule: 'Syntax, implicit net declarations, and topological sanity verified' },
                            { stage: 'Dynamic Test', rule: 'Stimulus execution bounds hit without assertion failures' },
                            { stage: 'Equivalence', rule: 'Logical Equivalence Checking (LEC) yields isomorphic graphs' },
                            { stage: 'Signoff', rule: 'Zero DRC violations; Setup/Hold timing metrics positive' },
                        ].map((gate, i) => (
                            <div key={i} className={`flex flex-col sm:flex-row gap-6 p-8 items-start sm:items-baseline ${i !== 0 ? 'border-t border-zinc-800/50' : ''}`}>
                                <div className="font-serif text-zinc-300 w-48 shrink-0 flex items-center gap-3">
                                    <span className="text-xs font-sans text-zinc-600 block w-6">{(i + 1).toString().padStart(2, '0')}</span> {gate.stage}
                                </div>
                                <div className="text-zinc-400 text-sm font-light leading-relaxed">{gate.rule}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
