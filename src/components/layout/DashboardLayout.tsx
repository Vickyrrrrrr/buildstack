'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, FileDown, Receipt, LogOut, ChevronRight, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

interface DashboardLayoutProps {
    children: React.ReactNode;
    projectName?: string;
}

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/tracking', icon: Package, label: 'Track Delivery' },
    { href: '/dashboard/deliverables', icon: FileDown, label: 'Deliverables' },
    { href: '/dashboard/invoice', icon: Receipt, label: 'Invoice' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children, projectName }: DashboardLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, signOut, isAdmin } = useAuth();

    // Redirect if not authenticated
    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };

    const userInitials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : '??';

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-[#111111] border-r border-white/5 z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 relative transition-transform group-hover:rotate-6">
                            <Image
                                src="/logo.png"
                                alt="Buildstack Logo"
                                fill
                                className="object-contain rounded-xl"
                            />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter">Buildstack</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                                    : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
                                    }`}
                            >
                                <item.icon size={22} className={isActive ? 'text-[var(--accent)]' : 'group-hover:text-white'} />
                                <span className="font-bold tracking-tight">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Admin Link for Authorized Users */}
                    {isAdmin && (
                        <Link
                            href="/admin"
                            className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group text-[var(--accent)] hover:bg-[var(--accent-soft)] border border-dashed border-[var(--accent-border)] mt-6"
                        >
                            <ShieldCheck size={22} />
                            <span className="font-bold tracking-tight">Admin Panel</span>
                        </Link>
                    )}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full px-4 py-4 text-slate-400 hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all font-bold"
                    >
                        <LogOut size={22} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Top Bar - Mobile & Desktop Content Header */}
            <header className="fixed top-0 left-0 right-0 md:left-72 z-40 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-20 px-6 md:px-10">
                    <div className="flex items-center gap-4 lg:hidden">
                        <Link href="/dashboard" className="w-8 h-8 relative block">
                            <Image
                                src="/logo.png"
                                alt="Buildstack Logo"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </Link>
                    </div>

                    {projectName && (
                        <div className="flex items-center gap-4 flex-1 md:flex-none">
                            <span className="text-slate-500 font-medium hidden sm:block">Project:</span>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                <span className="font-bold text-sm tracking-tight">{projectName}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-black text-xs">
                                {user ? userInitials : '...'}
                            </div>
                            <span className="text-sm font-bold">
                                {user?.displayName || 'Loading...'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="md:ml-72 pt-20 min-h-screen">
                <div className="p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
