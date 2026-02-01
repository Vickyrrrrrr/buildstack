'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading, signOut, isAdmin } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
            <div className="container">
                <nav className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 transition-transform group-hover:rotate-6">
                            <Image
                                src="/logo.png"
                                alt="Buildstack Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter text-white">Buildstack</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-400 hover:text-[var(--accent)] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        {!loading && user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-semibold text-white hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-white/10" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                    )}
                                    <span>Dashboard</span>
                                </Link>
                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="text-xs font-black uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1.5 rounded-lg border border-[var(--accent)]/20 hover:bg-[var(--accent)] hover:text-black transition-all"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-slate-500 hover:text-white transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-semibold text-white hover:text-[var(--accent)] transition-colors">
                                    Client Login
                                </Link>
                                <Link href="/contact" className="btn-primary">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-6 bg-black border-t border-white/10 animate-fade-in absolute top-20 left-0 w-full px-6">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xl font-bold text-white hover:text-[var(--accent)] animate-fade-in"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-4">
                                {!loading && user ? (
                                    <>
                                        {isAdmin && (
                                            <Link href="/admin" className="btn-outline text-center py-4 rounded-full font-bold border-[var(--accent)] text-[var(--accent)]" onClick={() => setMobileMenuOpen(false)}>
                                                Admin Panel
                                            </Link>
                                        )}
                                        <Link href="/dashboard" className="btn-primary text-center py-4 rounded-full font-bold" onClick={() => setMobileMenuOpen(false)}>
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { signOut(); setMobileMenuOpen(false); }}
                                            className="btn-outline text-center py-4 rounded-full font-bold"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="btn-outline text-center py-4 rounded-full font-bold" onClick={() => setMobileMenuOpen(false)}>
                                            Client Login
                                        </Link>
                                        <Link href="/contact" className="btn-primary text-center py-4 rounded-full font-bold" onClick={() => setMobileMenuOpen(false)}>
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                )
                }
            </div >
        </header >
    );
}
