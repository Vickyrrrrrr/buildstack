'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Clock, Layout, TrendingUp, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { useProject, useStations, useProjects } from '@/lib/firestore-hooks';
import { useAuth } from '@/components/providers/AuthProvider';

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const uid = user?.uid;
    const { projects, loading: projectsLoading } = useProjects(uid);

    // Get the first project for now (most recent)
    const project = projects.length > 0 ? projects[0] : null;
    const { stations, loading: stationsLoading } = useStations(project?.id || null, uid);

    if (authLoading || projectsLoading || (project && stationsLoading)) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <DashboardLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
                    <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-8 animate-pulse-slow">
                        <TrendingUp size={48} className="text-[var(--accent)]" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                        Let's build something <span className="text-[var(--accent)]">great.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        You don't have any active projects yet. Select a service below to start your digital journey with Buildstack.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {[
                            { title: 'Web Development', icon: Layout, desc: 'Custom websites, web apps, and platforms.', service: 'web' },
                            { title: 'Mobile Apps', icon: Package, desc: 'iOS and Android applications.', service: 'app' },
                            { title: 'Product Design', icon: TrendingUp, desc: 'UI/UX design and branding.', service: 'design' }
                        ].map((item) => (
                            <Link
                                key={item.title}
                                href={`/contact?service=${item.service}`}
                                className="card p-8 group hover:-translate-y-2 transition-transform text-left"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] group-hover:text-black transition-colors">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                                <p className="text-slate-500 font-medium">{item.desc}</p>
                                <div className="mt-6 flex items-center gap-2 text-[var(--accent)] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Start Request <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // Handle Pending Status
    if (project.status === 'pending') {
        return (
            <DashboardLayout projectName={project.name}>
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <p className="text-[var(--accent)] font-black text-xs uppercase tracking-[0.2em] mb-3">Project Request</p>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                                Request Received 📥
                            </h1>
                            <p className="text-slate-400 font-medium max-w-lg">
                                We've received your <span className="text-white font-bold">{project.websiteType}</span> request. We're reviewing the details and will get back to you shortly.
                            </p>
                        </div>
                    </div>

                    <div className="card p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] opacity-[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-full text-[10px] font-black text-[var(--accent)] uppercase tracking-widest mb-6">
                                <Clock size={12} className="animate-pulse" />
                                Awaiting Confirmation
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight max-w-2xl">
                                Your project is in our <span className="text-[var(--accent)]">review pipeline.</span>
                            </h2>
                            <p className="text-slate-400 font-medium leading-relaxed max-w-xl text-lg mb-10">
                                Once we confirm the requirements and scope, your project dashboard will go live with a full real-time timeline, asset delivery, and progress tracking.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl min-w-[200px]">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Submitted On</p>
                                    <p className="font-bold text-lg">{formatDate(project.createdAt)}</p>
                                </div>
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl min-w-[200px]">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Service Type</p>
                                    <p className="font-bold text-lg capitalize">{project.websiteType}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-[var(--accent)] rounded-[2.5rem] text-black">
                        <TrendingUp size={40} className="mb-6" />
                        <h3 className="text-2xl font-black tracking-tighter mb-3 leading-tight">Want to add more details?</h3>
                        <p className="font-medium mb-8 leading-relaxed">If you have reference websites or specific features in mind, send them over to us.</p>
                        <a href={`mailto:hello@buildstack.com?subject=Details for ${project.name}`} className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-black hover:scale-95 transition-transform text-center">
                            Email Project Details
                        </a>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const currentStation = stations.find(s => s.status === 'active');
    const completedStations = stations.filter(s => s.status === 'completed').length;
    const progressPercent = stations.length > 0
        ? Math.round((completedStations / stations.length) * 100)
        : project.progress;

    return (
        <DashboardLayout projectName={project.name}>
            <div className="space-y-10">
                {/* Welcome */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <p className="text-[var(--accent)] font-black text-xs uppercase tracking-[0.2em] mb-3">Client Workspace</p>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                            Welcome back 👋
                        </h1>
                        <p className="text-slate-400 font-medium max-w-lg">
                            Track your website build in real-time. We&apos;re currently at the <span className="text-white font-bold">{currentStation?.name || project.currentStage}</span>.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold flex items-center gap-2">
                            <Clock size={16} className="text-[var(--accent)]" />
                            <span>Est. Delivery: {formatDate(project.estimatedDeliveryDate)}</span>
                        </div>
                    </div>
                </div>

                {/* Main Highlight Card */}
                <div className="card p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] opacity-[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.05] transition-opacity" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-soft)] border border-[var(--accent-border)] rounded-full text-[10px] font-black text-[var(--accent)] uppercase tracking-widest mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                                    Active Build Stage
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 leading-tight">
                                    {currentStation?.name || project.currentStage}
                                </h2>
                                <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                                    {currentStation?.updateNote || "Work is currently in progress on this stage. Check back soon for updates."}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link href="/dashboard/tracking" className="btn-primary px-8 py-4 w-full sm:w-auto text-center font-black">
                                    View Full Timeline
                                </Link>
                                <Link href="/dashboard/deliverables" className="btn-outline px-8 py-4 w-full sm:w-auto text-center font-black flex items-center justify-center gap-2">
                                    Assets <Package size={18} />
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group-hover:border-white/10 transition-colors">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-1">Total Progress</p>
                                        <p className="text-3xl font-black tracking-tighter">{progressPercent}%</p>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500">{completedStations} / {stations.length || '...'} Stages</p>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                    <div
                                        className="h-full bg-[var(--accent)] rounded-full transition-all duration-1000 shadow-[0_0_20px_var(--accent)]"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Build Start</p>
                                    <p className="font-bold">{formatDate(project.startDate)}</p>
                                </div>
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Website Type</p>
                                    <p className="font-bold capitalize">{project.websiteType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Latest Assets",
                                    desc: "Download logos, brand kits, and design files.",
                                    href: "/dashboard/deliverables",
                                    icon: Layout,
                                    color: "var(--accent)"
                                },
                                {
                                    title: "Billing & Invoices",
                                    desc: "Manage your payments and download PDF receipts.",
                                    href: "/dashboard/invoice",
                                    icon: TrendingUp,
                                    color: "#38bdf8"
                                }
                            ].map((item) => (
                                <Link key={item.title} href={item.href} className="card p-8 group hover:border-[var(--accent-border)] transition-all">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit mb-6 group-hover:border-[var(--accent-border)] transition-colors">
                                        <item.icon size={24} style={{ color: item.color }} />
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-black mb-2">{item.title}</h3>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                        <ArrowRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Project Overview Card */}
                        <div className="card p-8">
                            <h3 className="text-xl font-black mb-8">Project Configuration</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Project Name</p>
                                    <p className="font-bold text-lg">{project.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Current Stage</p>
                                    <p className="font-bold text-lg">{currentStation?.name || project.currentStage}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Status Note</p>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        {currentStation?.updateNote || "No recent updates for this stage."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Support Card */}
                        <div className="p-8 bg-[var(--accent)] rounded-[2.5rem] text-black">
                            <TrendingUp size={40} className="mb-6" />
                            <h3 className="text-2xl font-black tracking-tighter mb-3 leading-tight">Need technical assistance?</h3>
                            <p className="font-medium mb-8 leading-relaxed">Our design team is ready to help you with any questions about your website build.</p>
                            <Link href="/contact" className="inline-block w-full text-center bg-black text-white px-6 py-4 rounded-2xl font-black hover:scale-95 transition-transform">
                                Contact Designer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
