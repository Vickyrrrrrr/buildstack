'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Code2, Layers, Binary, Zap, Cpu, Search, Workflow, Database, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useRef } from 'react';

/* --- Premium Easing --- */
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export default function HomePage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <div ref={containerRef} className="relative bg-[#080809]">
            <Header />
            <main className="text-white">
                
                {/* --- ADVANCED HERO --- */}
                <section className="relative overflow-hidden pt-40 pb-32 border-b border-white/[0.04]">
                    <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-[0.06] pointer-events-none select-none overflow-hidden">
                        <div className="absolute top-20 right-[-10%] text-[400px] font-mono font-bold leading-none select-none">SILICON</div>
                    </motion.div>

                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE_SMOOTH }}
                            className="max-w-5xl"
                        >
                            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-sm bg-white/[0.03] border border-white/[0.05] mb-12">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Autonomous VLSI Engine v4.0 Active</span>
                            </div>

                            <h1 className="text-[ clamp(3.5rem,10vw,7.5rem) ] leading-[0.85] font-semibold tracking-[-0.06em] text-white mb-12">
                                Synthesize Silicon <br />
                                <span className="text-slate-300 italic">with Intent.</span>
                            </h1>

                            <p className="text-academic-body max-w-2xl mb-16 text-slate-200 leading-relaxed">
                                AgentIC is a singular pipeline for autonomous hardware generation. 
                                We translate natural language intent into verified physical layouts, bypassing 
                                the complexity of traditional EDA environments.
                            </p>

                            <div className="flex flex-wrap items-center gap-10">
                                <a href="https://agentic.buildstack.live" className="btn-primary !px-10 !py-4 shadow-2xl shadow-white/5">
                                    Launch AgentIC Console
                                </a>
                                <Link href="/agentic" className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all duration-500 flex items-center gap-2 group">
                                    Methodology <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-2" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- TECHNICAL SPECS MARQUEE --- */}
                <section className="bg-black/50 py-12 border-b border-white/[0.04] overflow-hidden">
                    <div className="flex whitespace-nowrap animate-marquee opacity-60">
                        {[
                            'SKYWATER_130NM_PDK', 'OPENLANE_V2_FLOW', 'RTL_SYNTHESIS_ENGINE', 
                            'DRC_LVS_READY', 'GDSII_TAPE_OUT', 'LOGICAL_EQUIVALENCE_CHECK',
                            'TIMING_SIGN_OFF', 'PLACE_AND_ROUTE_AUTOMATION'
                        ].map((text, i) => (
                            <span key={i} className="text-[10px] font-mono mx-12 text-slate-400 tracking-[0.3em] font-bold">{text}</span>
                        ))}
                    </div>
                </section>

                {/* --- CAPABILITIES --- */}
                <section className="py-48 border-b border-white/[0.04]">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[
                                { icon: <Terminal size={20} />, title: "Semantic RTL", desc: "Convert natural language specifications directly into verifiable Verilog cores." },
                                { icon: <Layers size={20} />, title: "Automated P&R", desc: "High-density floorplanning and routing optimized for Sky130 technology libraries." },
                                { icon: <ShieldCheck size={20} />, title: "Formal Sign-off", desc: "Every netlist is verified for logical equivalence and physical manufacturability." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: EASE_SMOOTH }}
                                    className="card-monaco group hover:bg-white/[0.02]"
                                >
                                    <div className="mb-10 text-slate-400 group-hover:text-white transition-all duration-700">{item.icon}</div>
                                    <h3 className="text-xl font-medium mb-4 text-white">{item.title}</h3>
                                    <p className="text-slate-300 font-light leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
