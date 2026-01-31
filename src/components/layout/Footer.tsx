import Link from 'next/link';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

const footerLinks = {
    services: [
        { href: '/services#business', label: 'Business Website' },
        { href: '/services#portfolio', label: 'Portfolio Website' },
        { href: '/services#landing', label: 'Landing Page' },
    ],
    company: [
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/contact', label: 'Contact' },
        { href: '/login', label: 'Client Login' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/5">
            <div className="container py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                                <span className="text-black font-black text-xl">B</span>
                            </div>
                            <span className="font-bold text-2xl tracking-tighter">Buildstack</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                            Premium digital experiences built with precision. Track your progress in real-time with our high-fidelity dashboard.
                        </p>
                        <div className="flex flex-col gap-4">
                            <a
                                href="mailto:hello@buildstack.com"
                                className="flex items-center gap-3 text-slate-400 hover:text-[var(--accent)] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail size={16} />
                                </div>
                                <span>hello@buildstack.com</span>
                            </a>
                            <a
                                href="https://wa.me/919876543210"
                                className="flex items-center gap-3 text-slate-400 hover:text-[var(--accent)] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Phone size={16} />
                                </div>
                                <span>+91 98765 43210</span>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/40">
                            Services
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-[var(--accent)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/40">
                            Company
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-[var(--accent)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Buildstack. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-slate-500 hover:text-white text-sm">Privacy Policy</Link>
                        <Link href="#" className="text-slate-500 hover:text-white text-sm">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
