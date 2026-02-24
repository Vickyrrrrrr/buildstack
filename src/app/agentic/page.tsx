import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, Activity, PackageCheck, Zap } from 'lucide-react';

export default function AgentICPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[var(--accent)] selection:text-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="container relative z-10 mx-auto px-6">
                    <div className="max-w-4xl pt-16">
                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Python 3.10+</span>
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Flow: Fail-Closed</span>
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Signoff: Multi-Corner STA + LEC</span>
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">PDK: Sky130 | GF180</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            Tier-1 Autonomous Text-to-Silicon.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
                            Convert natural-language hardware intent into RTL, verification artifacts, and OpenLane physical implementation with <span className="text-white font-medium">autonomous repair loops</span>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#architecture" className="btn-primary inline-flex gap-2 items-center justify-center">
                                View Architecture <ArrowRight size={20} />
                            </Link>
                            <Link href="#features" className="btn-outline inline-flex gap-2 items-center justify-center border-white/20 hover:bg-white/5">
                                Explore Features
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why AgentIC Section */}
            <section className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why this version is different</h2>
                        <p className="text-lg text-slate-400">AgentIC is now built to avoid two expensive failure modes in AI-driven hardware generation.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-black border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                                <AlertTriangle className="w-24 h-24 text-red-500" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                                <span className="text-red-500 font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Silent Quality Regression</h3>
                            <p className="text-slate-400">Weak checks passing bad designs. AgentIC enforces strict semantic rigor checks, multi-corner STA parsing, and LEC before declaring success.</p>
                        </div>

                        <div className="p-8 rounded-3xl bg-black border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.05)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                                <Activity className="w-24 h-24 text-orange-500" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                                <span className="text-orange-500 font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Infinite Churn</h3>
                            <p className="text-slate-400">Retrying the same failing strategy forever. AgentIC uses failure fingerprint detection and capped pivots to fail-closed precisely when it hits a wall.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section id="features" className="py-32">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Tier-1 Upgrade Highlights</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Semantic Preflight', desc: 'Deterministic checks for width mismatches and port shadowing rejections before implementation.' },
                            { title: 'Loop Safety Controls', desc: 'Failure fingerprint detection, per-state retries, global step budgets, and capped strategy pivots.' },
                            { title: 'EDA Intelligence Layer', desc: 'Summarizes massive log files into structured top issues instead of raw text dumping.' },
                            { title: 'Physical Feedback Loop', desc: 'Floorplan stage, congestion assessment, WNS convergence tracking, and ECO stage.' },
                            { title: 'Signoff Upgrades', desc: 'Multi-corner STA parsing (setup + hold), numeric power and IR-drop parsing, and EQY-based LEC checks.' },
                            { title: 'Hierarchy Scaling Scaffold', desc: 'Auto hierarchy planner, per-block artifact emission, and reusable ip_manifest.json.' },
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent)]/50 transition-colors group">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Architecture section */}
            <section id="architecture" className="py-24 bg-white/[0.02] border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Autonomous Repair Model</h2>
                            <p className="text-lg text-slate-400 mb-8">AgentIC is not just an error printer. It has repair loops with decision logic.</p>

                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl border border-white/10 bg-black/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-[var(--accent)]"><Zap size={20} /></div>
                                        <h4 className="font-bold text-lg">Targeted Fixes</h4>
                                    </div>
                                    <p className="text-sm text-slate-400">Classifies cause (TB vs RTL) and applies targeted fixes. Passes structured summaries instead of dumping raw text into prompts.</p>
                                </div>
                                <div className="p-6 rounded-2xl border border-white/10 bg-black/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-[var(--accent)]"><PackageCheck size={20} /></div>
                                        <h4 className="font-bold text-lg">Convergence Behavior</h4>
                                    </div>
                                    <p className="text-sm text-slate-400">If WNS stagnates (&lt; 0.01ns improvement), triggers strategy pivot: constraint tuning, area expansion, register slicing, or fails closed.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-black border border-white/10 p-8 rounded-3xl overflow-x-auto custom-scrollbar">
                            <div className="min-w-[500px] flex flex-col gap-2 font-mono text-sm text-slate-300">
                                <div className="text-[var(--accent)] font-bold"># Orchestrator States</div>
                                <div>INIT <span className="opacity-50">→</span> SPEC <span className="opacity-50">→</span> RTL_GEN <span className="opacity-50">→</span> RTL_FIX</div>
                                <div className="pl-4 border-l border-white/10 ml-2 py-2 text-slate-400">
                                    Semantic Rigor Gate<br />
                                    Syntac/Lint fail ↺ Autonomous Fix Loop
                                </div>
                                <div>VERIFICATION <span className="opacity-50">→</span> FORMAL_VERIFY</div>
                                <div className="pl-4 border-l border-white/10 ml-2 py-2 text-slate-400">
                                    TB Strict Gate<br />
                                    Sim fail ↺ Error Analyst
                                </div>
                                <div>COVERAGE_CHECK <span className="opacity-50">→</span> REGRESSION</div>
                                <div>FLOORPLAN <span className="opacity-50">→</span> HARDENING <span className="opacity-50">→</span> CONVERGENCE_REVIEW</div>
                                <div className="pl-4 border-l border-white/10 ml-2 py-2 text-slate-400">
                                    Congestion/Stagnation ↺ Strategy Pivot<br />
                                </div>
                                <div>SIGNOFF <span className="opacity-50">→</span> SUCCESS</div>
                                <div className="pl-4 border-l border-white/10 ml-2 py-2 text-slate-400">
                                    Fail ↺ ECO_PATCH ↺ HARDENING
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strict Gates Section */}
            <section className="py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Quality Gates (Strict Mode)</h2>
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                        {[
                            { stage: 'Startup', rule: 'Required tools + environment must resolve' },
                            { stage: 'RTL Fix', rule: 'Syntax + lint + semantic rigor must pass' },
                            { stage: 'Verification', rule: 'TB contract + simulation must pass' },
                            { stage: 'Formal', rule: 'Formal result is blocking in strict mode' },
                            { stage: 'Coverage', rule: 'Minimum coverage threshold is blocking' },
                            { stage: 'Regression', rule: 'Regression failures are blocking' },
                            { stage: 'Signoff', rule: 'DRC/LVS/STA/power/IR/LEC all contribute to final pass/fail' },
                        ].map((gate, i) => (
                            <div key={i} className={`flex flex-col md:flex-row gap-4 p-6 items-start md:items-center ${i !== 0 ? 'border-t border-white/5' : ''}`}>
                                <div className="w-48 font-bold text-white flex items-center gap-3">
                                    <CheckCircle2 size={16} className="text-[var(--accent)]" /> {gate.stage}
                                </div>
                                <div className="text-slate-400">{gate.rule}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
