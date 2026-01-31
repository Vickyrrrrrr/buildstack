import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, FileText, Eye, Package, CheckCircle2, Workflow, Sparkles } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: FileText,
        title: 'Submit Requirements',
        description: 'Fill out our simple form. Tell us about your business, what kind of website you need, and upload any relevant materials.',
        details: [
            'Business information',
            'Website type selection',
            'Content & logo upload',
            'Reference websites (optional)',
        ],
    },
    {
        number: '02',
        icon: Eye,
        title: 'Track Progress',
        description: 'Log into your private dashboard to see exactly where your project stands. Watch as it moves through each stage live.',
        details: [
            'Real-time status updates',
            'Stage-by-stage tracking',
            'Progress notifications',
            'Transparent timeline',
        ],
    },
    {
        number: '03',
        icon: Package,
        title: 'Review & Receive',
        description: 'Preview your website live. After any final adjustments, download your completed website and invoice instantly.',
        details: [
            'Live preview link',
            'Final adjustments',
            'Download deliverables',
            'Invoice & payment',
        ],
    },
];

const expectations = [
    {
        title: 'What You Can Expect',
        items: [
            'Transparent project tracking',
            'Regular progress updates',
            'Clear delivery timeline',
            'Professional communication',
            'Quality deliverables',
        ],
    },
    {
        title: 'What We Handle',
        items: [
            'Complete design & development',
            'Mobile responsiveness',
            'Basic SEO setup',
            'Testing & quality checks',
            'Deployment assistance',
        ],
    },
];

export default function HowItWorksPage() {
    return (
        <>
            <Header />
            <main className="bg-black text-white min-h-screen">
                {/* Hero */}
                <section className="pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[150px] animate-pulse-slow" />

                    <div className="container relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in glass">
                                <Workflow size={14} className="text-[var(--accent)]" />
                                <span className="text-xs font-bold tracking-widest uppercase">The Process</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter animate-fade-in stagger-1 leading-[0.9]">
                                Zero <span className="text-[var(--accent)]">Black Boxes.</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in stagger-2 leading-relaxed">
                                A simple, transparent process from requirements to delivery. No complicated back-and-forth — just clear progress tracking.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Steps */}
                <section className="pb-24">
                    <div className="container">
                        <div className="max-w-5xl mx-auto">
                            <div className="relative">
                                {/* Connection Line (Desktop) */}
                                <div className="absolute left-[2.25rem] top-24 bottom-24 w-px bg-gradient-to-b from-[var(--accent)] to-transparent hidden md:block" />

                                {steps.map((step, index) => (
                                    <div key={step.number} className="relative mb-24 last:mb-0 group">
                                        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                                            {/* Icon Column */}
                                            <div className="shrink-0 relative">
                                                <div className="w-20 h-20 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_50px_var(--accent-glow)] transition-all duration-500">
                                                    <step.icon size={32} className="text-white group-hover:text-[var(--accent)] transition-colors" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 card p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-5xl font-black text-white/5 group-hover:text-[var(--accent)]/20 transition-colors">{step.number}</span>
                                                    <h2 className="text-3xl font-black tracking-tight">{step.title}</h2>
                                                </div>
                                                <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-2xl">
                                                    {step.description}
                                                </p>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                                                    {step.details.map((detail) => (
                                                        <div key={detail} className="flex items-center gap-3 text-slate-300">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                                            <span className="font-medium text-sm">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Delivery Tracking Preview */}
                <section className="section bg-[#050505] border-t border-white/5">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Status at a Glance</h2>
                            <p className="text-slate-400 text-lg max-w-xl mx-auto">
                                Your dashboard shows progress just like tracking a delivery. Clear, simple, and anxiety-free.
                            </p>
                        </div>

                        {/* Mini Preview */}
                        <div className="max-w-2xl mx-auto">
                            <div className="card p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-[0.05] rounded-full blur-[80px]" />

                                <div className="space-y-0 relative z-10">
                                    {['Requirements Received', 'Design Phase', 'Development Phase', 'Review & Fixes', 'Delivered'].map((stage, index) => (
                                        <div key={stage} className="flex gap-6 relative group/stage">
                                            {/* Status Indicator */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-500 ${index < 2
                                                    ? 'bg-[var(--accent)] border-[var(--accent)]'
                                                    : index === 2
                                                        ? 'border-[var(--accent)] bg-black shadow-[0_0_10px_var(--accent)]'
                                                        : 'border-white/10 bg-black'
                                                    }`}>
                                                    {index < 2 && (
                                                        <CheckCircle2 size={14} className="text-black font-bold" />
                                                    )}
                                                    {index === 2 && (
                                                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                                                    )}
                                                </div>
                                                {index < 4 && (
                                                    <div className={`w-0.5 h-12 ${index < 2 ? 'bg-[var(--accent)]' : 'bg-white/5'}`} />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="pb-8 pt-0.5">
                                                <p className={`font-bold text-lg transition-colors ${index < 2
                                                    ? 'text-[var(--accent)]'
                                                    : index === 2
                                                        ? 'text-white'
                                                        : 'text-slate-600'
                                                    }`}>
                                                    {stage}
                                                </p>
                                                {index === 2 && (
                                                    <p className="text-xs font-mono text-[var(--accent)] mt-1 uppercase tracking-widest animate-pulse">Processing...</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expectations */}
                <section className="section">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {expectations.map((exp) => (
                                <div key={exp.title} className="card p-10 group hover:bg-white/[0.03] transition-colors">
                                    <h3 className="text-2xl font-black mb-8">{exp.title}</h3>
                                    <ul className="space-y-4">
                                        {exp.items.map((item) => (
                                            <li key={item} className="flex items-center gap-4 text-slate-300">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <span className="font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container relative z-10">
                        <div className="card bg-[var(--accent)] text-black p-12 md:p-24 text-center rounded-[3rem] overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-full h-full bg-white/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter relative z-10">
                                Ready to begin?
                            </h2>
                            <p className="font-bold text-xl md:text-2xl opacity-80 mb-10 max-w-2xl mx-auto relative z-10">
                                Start your project today and experience our transparent delivery process.
                            </p>
                            <Link href="/contact" className="inline-block bg-black text-white px-12 py-5 rounded-full font-black text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 relative z-10">
                                Get Started
                                <ArrowRight size={20} className="inline ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
