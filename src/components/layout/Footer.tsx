import Link from 'next/link';
import { Mail, Phone, Shield } from 'lucide-react';

const footerLinks = {
    products: [
        { href: '/agentic', label: 'VLSI Methodology' },
        { href: '#', label: 'RTL Synthesis' },
        { href: '#', label: 'GDSII Export' },
    ],
    technical: [
        { href: '#', label: 'Skywater 130nm PDK' },
        { href: '#', label: 'OpenLane Flow' },
        { href: '#', label: 'DRC/LVS Sign-off' },
    ],
    lab: [
        { href: '/contact', label: 'Laboratory Inquiry' },
        { href: '/login', label: 'Member Console' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#080809] text-white border-t border-white/[0.04]">
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-12">
                    {/* Brand / Lab Identity */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-semibold text-lg tracking-tight text-white uppercase italic">Buildstack Laboratory</span>
                        </div>
                        <p className="text-slate-500 max-w-sm mb-10 leading-relaxed text-sm font-light">
                            Advanced Semiconductor Automation. We build autonomous pipelines for verifiable hardware synthesis, bridging natural language intent with physical silicon layouts.
                        </p>
                        <div className="flex flex-col gap-6">
                            <a
                                href="mailto:contactme@buildstack.live"
                                className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors group"
                            >
                                <Mail size={14} className="opacity-40 group-hover:opacity-100" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.25em]">Direct Comms</span>
                            </a>
                        </div>
                    </div>

                    {/* Synthesis Pipeline */}
                    <div>
                        <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] mb-10 text-slate-700">
                            Synthesis
                        </h4>
                        <ul className="space-y-5">
                            {footerLinks.products.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-500 hover:text-white transition-colors text-[11px] font-mono uppercase tracking-widest"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technical PDK */}
                    <div>
                        <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] mb-10 text-slate-700">
                            PDK / Flow
                        </h4>
                        <ul className="space-y-5">
                            {footerLinks.technical.map((link) => (
                                <li key={link.label}>
                                    <span className="text-slate-600 text-[11px] font-mono uppercase tracking-widest">
                                        {link.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lab Console */}
                    <div>
                        <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] mb-10 text-slate-700">
                            Lab
                        </h4>
                        <ul className="space-y-5">
                            {footerLinks.lab.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-500 hover:text-white transition-colors text-[11px] font-mono uppercase tracking-widest"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footnote */}
                <div className="mt-24 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <Shield size={12} className="text-slate-800" />
                        <p className="text-slate-800 text-[9px] font-mono uppercase tracking-[0.3em]">
                            End-to-End Verifiable Hardware Pipeline
                        </p>
                    </div>
                    <div className="flex gap-10">
                        <Link href="#" className="text-slate-800 hover:text-slate-500 text-[9px] font-mono uppercase tracking-[0.3em] transition-colors">Legal</Link>
                        <Link href="#" className="text-slate-800 hover:text-slate-500 text-[9px] font-mono uppercase tracking-[0.3em] transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
