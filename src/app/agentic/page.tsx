
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Brain, ArrowRight, Activity, Code2, Workflow, Play, CheckCircle2, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const pipelineSteps = [
    { id: 'spec', label: 'Semantic Spec', desc: 'Natural language constraints translation', icon: Brain },
    { id: 'rtl', label: 'RTL Generation', desc: 'Autonomous Verilog synthesis', icon: Code2 },
    { id: 'synth', label: 'Cell Optimization', desc: 'Logic mapping to target technology', icon: Activity },
    { id: 'layout', label: 'Physical Layout', desc: 'Automated floorplanning & routing', icon: Workflow },
    { id: 'verify', label: 'Rule Checking', desc: 'Fabrication-ready DRC/LVS', icon: ShieldCheck },
    { id: 'done', label: 'Sign-off', desc: 'Tape-out ready GDSII Master', icon: Terminal },
];

export default function AgentICPage() {
    const [demoState, setDemoState] = useState<'idle' | 'spec' | 'rtl' | 'synth' | 'layout' | 'verify' | 'done'>('idle');
    const [typedCode, setTypedCode] = useState('');
    
    // Mock Verilog Code
    const mockRtl = `module alu_8bit (
    input  wire [7:0] a, b,
    input  wire [2:0] opcode,
    output reg  [7:0] result
);
  always @(*) begin
    case (opcode)
      3'b000: result = a + b;
      3'b001: result = a - b;
      3'b010: result = a & b;
      3'b011: result = a | b;
      default: result = 8'h00;
    endcase
  end
endmodule`;

    useEffect(() => {
        if (demoState === 'rtl') {
            let i = 0;
            setTypedCode('');
            const interval = setInterval(() => {
                setTypedCode(mockRtl.slice(0, i));
                i += 3;
                if (i > mockRtl.length) {
                    clearInterval(interval);
                    setTimeout(() => setDemoState('synth'), 800);
                }
            }, 25);
            return () => clearInterval(interval);
        }
    }, [demoState, mockRtl]);

    useEffect(() => {
        if (demoState === 'spec') {
            const t = setTimeout(() => setDemoState('rtl'), 1500);
            return () => clearTimeout(t);
        }
        if (demoState === 'synth') {
            const t = setTimeout(() => setDemoState('layout'), 2000);
            return () => clearTimeout(t);
        }
        if (demoState === 'layout') {
            const t = setTimeout(() => setDemoState('verify'), 2000);
            return () => clearTimeout(t);
        }
        if (demoState === 'verify') {
            const t = setTimeout(() => setDemoState('done'), 2200);
            return () => clearTimeout(t);
        }
    }, [demoState]);

    const runDemo = () => {
        setDemoState('spec');
        setTypedCode('');
    };

    const stateOrder = ['spec', 'rtl', 'synth', 'layout', 'verify', 'done'];

    return (
        <div className="bg-[#0A0A0A] min-h-screen selection:bg-white/90 selection:text-black">
            <Header />
            
            <main className="text-[#EAEAEA]">
                {/* --- HERO --- */}
                <section className="relative pt-[20vh] pb-32 overflow-hidden border-b border-white/[0.04]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                    <div className="container relative mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
                        <motion.div 
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{ duration: 1.2, ease: EASE_SMOOTH }}
                            className="flex flex-col items-center max-w-4xl"
                        >
                            <div className="mb-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/70">AgentIC v1.0</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] text-[#F3F3F3] mb-8 leading-[1.05]">
                                Synthesis through <br />
                                <span className="font-serif italic font-medium text-white">Semantic Intelligence.</span>
                            </h1>

                            <p className="text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl text-[#8E8E93]">
                                AgentIC transcends traditional EDA workflows. By translating natural language directly into tape-out ready physical layouts, we provide a unified, deterministically verifiable pipeline.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <a 
                                    href="https://agentic.buildstack.live" 
                                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-xs font-mono font-medium uppercase tracking-[0.1em] transition-all hover:bg-[#F0F0F0] active:scale-95"
                                >
                                    Console Access
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- ARCHITECTURE WITH INTERACTIVE DEMO --- */}
                <section className="py-40 border-b border-white/[0.04] bg-white/[0.01]">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-12 items-center">
                            
                            {/* Left Text Side */}
                            <div className="lg:col-span-5">
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8E8E93] mb-8 block"
                                >
                                    Live Demonstration
                                </motion.span>
                                
                                <motion.h2 
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, ease: EASE_SMOOTH }}
                                    className="text-4xl md:text-5xl font-serif italic mb-8 tracking-tight"
                                >
                                    Watch it synthesize.
                                </motion.h2>
                                
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 1 }}
                                    className="text-[#8E8E93] text-[1.1rem] font-light leading-relaxed mb-12"
                                >
                                    Experience the future of hardware engineering. AgentIC converts your intent into an optimized, foundry-ready cell layout in real-time. Hit run to see the autonomous pipeline in action.
                                </motion.p>
                                
                                <button 
                                    onClick={runDemo}
                                    disabled={demoState !== 'idle' && demoState !== 'done'}
                                    className="group inline-flex items-center gap-3 px-6 py-3 border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono uppercase tracking-widest cursor-pointer"
                                >
                                    {demoState === 'idle' || demoState === 'done' ? (
                                        <><Play size={14} className="fill-current" /> Run Workflow</>
                                    ) : (
                                        <><div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Synthesizing...</>
                                    )}
                                </button>

                                <div className="mt-16 space-y-8">
                                    {pipelineSteps.map((step) => {
                                        const Icon = step.icon;
                                        const isActive = demoState === step.id;
                                        const isPast = stateOrder.indexOf(demoState) > stateOrder.indexOf(step.id);
                                        
                                        return (
                                            <div key={step.id} className={`flex gap-5 transition-opacity duration-500 ${isActive ? 'opacity-100' : isPast ? 'opacity-50' : 'opacity-30'}`}>
                                                <div className="mt-1 text-white transition-colors duration-500">
                                                    {isPast ? <CheckCircle2 size={18} className="text-emerald-500"/> : <Icon size={18} strokeWidth={1.5} />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-[#EAEAEA]'} mb-1`}>{step.label}</h4>
                                                    <p className="text-xs text-[#8E8E93] leading-relaxed font-light">{step.desc}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Right Interface Side: Simulation Terminal */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: EASE_SMOOTH }}
                                className="lg:col-span-7 relative h-[640px]"
                            >
                                <div className="absolute inset-0 rounded-xl border border-white/[0.08] bg-[#0C0C0E] shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col">
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04] bg-white/[0.02] shrink-0">
                                        <div className="flex gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Activity size={12} className="text-white/40" />
                                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">AgentIC_Terminal</span>
                                        </div>
                                        <div className="w-10" />
                                    </div>
                                    
                                    <div className="flex-1 p-6 overflow-hidden bg-[#0A0A0A] font-mono text-xs text-[#A1A1AA] leading-relaxed flex flex-col">
                                        
                                        {/* Idle State */}
                                        {demoState === 'idle' && (
                                            <div className="flex-1 flex items-center justify-center text-white/30">
                                                [ System ready. Waiting for intent... ]
                                            </div>
                                        )}

                                        <AnimatePresence mode="popLayout">
                                            {demoState !== 'idle' && (
                                                <motion.div 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="space-y-6"
                                                >
                                                    {/* SPEC Prompt */}
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-[#5E5E65]">agentic $&gt; input --natural-language</span>
                                                        <div className="text-white p-3 border border-white/[0.05] bg-white/[0.02] rounded-sm">
                                                            "Design an 8-bit Arithmetic Logic Unit (ALU). Optimize for low power on the Sky130 node. Connect I/O directly."
                                                        </div>
                                                    </div>

                                                    {/* RTL Gen */}
                                                    {(demoState === 'rtl' || demoState === 'synth' || demoState === 'layout' || demoState === 'verify' || demoState === 'done') && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 mt-4">
                                                            <span className="text-[#5E5E65]">agentic $&gt; synth --target=sky130 --generate-rtl</span>
                                                            <div className="text-[#00FF9D] p-3 border border-[#00FF9D]/10 bg-[#00FF9D]/[0.02] rounded-sm overflow-hidden">
                                                                <pre className="whitespace-pre-wrap">{typedCode}</pre>
                                                                {demoState === 'rtl' && <span className="inline-block w-2.5 h-4 bg-[#00FF9D] animate-pulse ml-1 align-middle" />}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Synthesis logs */}
                                                    {(demoState === 'synth' || demoState === 'layout' || demoState === 'verify' || demoState === 'done') && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 mt-4 text-[#8E8E93] text-[11px]">
                                                            <span>&gt; Parsing SystemVerilog module... [DONE]</span>
                                                            <span>&gt; Mapping to sky130_fd_sc_hd... [DONE]</span>
                                                            <span>&gt; Cell optimization passes (abc): 14... [DONE]</span>
                                                            <span className="text-white">&gt; Target frequency met.</span>
                                                        </motion.div>
                                                    )}

                                                    {/* Physical Layout */}
                                                    {(demoState === 'layout' || demoState === 'verify' || demoState === 'done') && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 mt-4 text-[#8E8E93] text-[11px]">
                                                            <span>&gt; Executing OpenROAD flow...</span>
                                                            <span>&gt; Floorplanning Core Area: 34um x 34um</span>
                                                            <span>&gt; Placement & CTS... [DONE]</span>
                                                            <span>&gt; Global & Detail Routing... <span className="text-white">[DONE]</span></span>
                                                        </motion.div>
                                                    )}

                                                    {/* Rule Checking / Verification */}
                                                    {(demoState === 'verify' || demoState === 'done') && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 mt-4 text-[#8E8E93] text-[11px]">
                                                            <span>&gt; Running Magic DRC / Netgen LVS...</span>
                                                            <span>&gt; Checking antenna violations... [CLEAN]</span>
                                                            <span className="text-emerald-400">&gt; 0 DRC Violations. GDSII Fabrication Ready.</span>
                                                        </motion.div>
                                                    )}

                                                    {/* Done / Metrics */}
                                                    {demoState === 'done' && (
                                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 grid grid-cols-3 gap-4">
                                                            <div className="p-4 border border-white/[0.05] bg-white/[0.02] rounded-sm flex flex-col gap-1">
                                                                <span className="text-[#5E5E65] text-[10px] uppercase">Gate Count</span>
                                                                <span className="text-xl text-white font-serif">1,248</span>
                                                            </div>
                                                            <div className="p-4 border border-white/[0.05] bg-white/[0.02] rounded-sm flex flex-col gap-1">
                                                                <span className="text-[#5E5E65] text-[10px] uppercase">Area</span>
                                                                <span className="text-xl text-white font-serif">1,156 µm²</span>
                                                            </div>
                                                            <div className="p-4 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-sm flex flex-col gap-1">
                                                                <span className="text-[#5E5E65] text-[10px] uppercase">Sign-off</span>
                                                                <span className="text-xl text-emerald-400 font-serif">PASSED</span>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
