'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, User, ExternalLink, Cpu } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

const navLinks = [
    { href: '/', label: 'Synthesizer' },
    { href: '/agentic', label: 'Methodology' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading, signOut, isAdmin } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#080809]/80 backdrop-blur-md border-b border-white/[0.04]">
            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo / Brand */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="relative w-7 h-7 transition-opacity group-hover:opacity-80">
                            <Image
                                src="/logo.png"
                                alt="Buildstack Logo"
                                fill
                                className="object-contain grayscale contrast-125 invert"
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold text-base tracking-tight text-white uppercase">Buildstack Lab</span>
                        </div>
                    </Link>

                    {/* Desktop Nav: AgentIC Only */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: Auth + Launch Console */}
                    <div className="hidden md:flex items-center gap-8">
                        {!loading && user ? (
                            <div className="flex items-center gap-8">
                                <Link
                                    href="/dashboard"
                                    className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-sm opacity-80" />
                                    ) : (
                                        <User size={12} className="opacity-60" />
                                    )}
                                    <span>Console</span>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-[10px] font-mono text-slate-700 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    Exit
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 hover:text-white transition-colors">
                                Auth
                            </Link>
                        )}

                        <a
                            href="https://agentic.buildstack.live"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary !px-6 !py-2 !text-[10px] uppercase tracking-widest font-bold"
                        >
                            Launch AgentIC
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu: Simplified */}
            {mobileMenuOpen && (
                <div className="md:hidden animate-ready fixed inset-0 top-16 bg-[#080809] z-40 p-8 flex flex-col gap-10 border-t border-white/[0.04]">
                    <div className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-light text-slate-400 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="mt-auto flex flex-col gap-6">
                        <a
                            href="https://agentic.buildstack.live"
                            className="btn-primary w-full py-5 text-center uppercase tracking-widest font-bold text-sm"
                        >
                            Launch AgentIC
                        </a>
                        {!loading && !user && (
                            <Link
                                href="/login"
                                className="text-center py-4 text-slate-600 uppercase tracking-[0.3em] text-[10px] font-mono"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Auth Required
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
