'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/clients', icon: Users, label: 'Clients' },
    { href: '/admin/portfolio', icon: Sparkles, label: 'Portfolio' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, signOut, isAdmin } = useAuth();

    // Handle authentication and authorization
    React.useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (!isAdmin) {
                // If logged in but not an admin, redirect to dashboard after a delay
                const timer = setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [loading, user, isAdmin, router]);

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user && !isAdmin) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-6">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                        <Settings size={40} className="text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">Access Denied</h1>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        The email <span className="text-white font-bold">{user?.email}</span> is not authorized to access the Admin Panel.
                        Only <span className="text-[var(--accent)] font-bold">vickynishad110@gmail.com</span> has administrative privileges.
                    </p>
                    <p className="text-sm text-slate-500">Redirecting to project dashboard...</p>
                    <Link href="/dashboard" className="btn-primary inline-flex mt-4 px-8 py-3">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const userInitials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : '??';

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-inter">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-[#111111] border-r border-white/5 z-50">
                <div className="p-8">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                            <span className="text-black font-black text-xl">B</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tighter">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]'
                                    : 'text-slate-400 hover:bg-white/[0.03] hover:text-white border border-transparent'
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
                        <Link href="/admin" className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                            <span className="text-black font-black text-sm">B</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 flex-1 md:flex-none">
                        <div className="px-4 py-2 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-full hidden sm:block">
                            <span className="text-[var(--accent)] font-black text-xs uppercase tracking-widest">Admin Control</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-black text-xs border border-white/10">
                                {user ? userInitials : '??'}
                            </div>
                            <span className="text-sm font-bold hidden sm:block">
                                {user?.displayName || 'Loading...'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-20 flex">
                {/* Mobile Bottom Nav */}
                <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-4 py-3 z-50 shadow-2xl">
                    <div className="flex justify-around items-center">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${isActive
                                        ? 'text-[var(--accent)] bg-white/5'
                                        : 'text-slate-500'
                                        }`}
                                >
                                    <item.icon size={24} />
                                </Link>
                            );
                        })}
                        <button onClick={handleLogout} className="text-slate-500 p-3">
                            <LogOut size={24} />
                        </button>
                    </div>
                </nav>

                {/* Content */}
                <main className="flex-1 md:ml-72 p-6 md:p-12 pb-32 md:pb-12 bg-[#0A0A0A]">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
