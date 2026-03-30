'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import {
    Users,
    Package,
    TrendingUp,
    ArrowRight,
    Clock,
    CheckCircle2,
    DollarSign,
    AlertCircle,
    X
} from 'lucide-react';
import Link from 'next/link';
import { useProjects, useInvoices } from '@/lib/firestore-hooks';
import { Project, STATION_NAMES, Invoice } from '@/types';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

export default function AdminDashboard() {
    const { projects, loading: projectsLoading } = useProjects();
    const { invoices, loading: invoicesLoading } = useInvoices();
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [showRevenueModal, setShowRevenueModal] = useState(false);
    const [showPendingModal, setShowPendingModal] = useState(false);

    const pendingProjects = projects.filter((p: Project) => p.status === 'pending');
    const activeCount = projects.filter((p: Project) => p.status === 'active').length;
    const completedCount = projects.filter((p: Project) => p.status === 'completed').length;

    // Calculate real revenue from paid invoices
    const paidInvoices = invoices.filter((inv: Invoice) => inv.status === 'paid');
    const totalRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);

    const pendingInvoicesList = invoices.filter((inv: Invoice) => inv.status === 'pending');
    const pendingInvoicesCount = pendingInvoicesList.length;

    const handleApprove = async (project: Project) => {
        setIsProcessing(project.id);
        try {
            // 1. Update project status and dates
            const startDate = new Date();
            const estDelivery = new Date();
            estDelivery.setDate(startDate.getDate() + 30); // Default 30 days

            await updateDoc(doc(db, 'buildstack_projects', project.id), {
                status: 'active',
                startDate: serverTimestamp(),
                estimatedDeliveryDate: estDelivery,
                currentStage: STATION_NAMES[0],
                updatedAt: serverTimestamp(),
            });

            // 2. Initialize stations
            for (let i = 0; i < STATION_NAMES.length; i++) {
                await addDoc(collection(db, 'buildstack_stations'), {
                    projectId: project.id,
                    name: STATION_NAMES[i],
                    status: i === 0 ? 'active' : 'pending',
                    order: i,
                    updateNote: i === 0 ? "Project started and requirements are being processed." : "",
                    updatedAt: serverTimestamp(),
                });
            }

            alert(`Project "${project.name}" approved and initialized!`);
        } catch (error) {
            console.error("Error approving project:", error);
            alert("Failed to approve project. Check console.");
        } finally {
            setIsProcessing(null);
        }
    };

    if (projectsLoading || invoicesLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                            Reporting Overview
                        </h1>
                        <p className="text-slate-400 font-medium">
                            Manage your agency performance and clients in real-time.
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-green-500">LIVE SYNC</span>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Revenue - Clickable */}
                    <div
                        onClick={() => setShowRevenueModal(true)}
                        className="card p-8 group relative overflow-hidden cursor-pointer hover:border-[var(--accent-border)] transition-all"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-[var(--accent-border)] transition-colors">
                                <DollarSign size={24} style={{ color: 'var(--accent)' }} />
                            </div>
                            <span className="text-[var(--accent)] text-xs font-black px-2 py-1 bg-[var(--accent-soft)] rounded-lg">Click for Details</span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Revenue</h3>
                        <p className="text-4xl font-black tracking-tighter">₹{(totalRevenue / 1000).toFixed(1)}K</p>
                    </div>

                    {/* Other Stats */}
                    {[
                        { label: 'Active Projects', value: activeCount.toString().padStart(2, '0'), trend: `+${activeCount}`, icon: Package, color: '#38bdf8' },
                        { label: 'Completed', value: completedCount.toString().padStart(2, '0'), trend: '100%', icon: CheckCircle2, color: '#4ade80' },
                        { label: 'Total Clients', value: projects.length.toString().padStart(2, '0'), trend: `+${projects.length}`, icon: Users, color: '#f472b6' },
                    ].map((stat) => (
                        <div key={stat.label} className="card p-8 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-[var(--accent-border)] transition-colors">
                                    <stat.icon size={24} style={{ color: stat.color }} />
                                </div>
                                <span className="text-[var(--accent)] text-xs font-black px-2 py-1 bg-[var(--accent-soft)] rounded-lg">{stat.trend}</span>
                            </div>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                            <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 card p-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-xl font-black mb-1">Project Distribution</h2>
                                <p className="text-sm text-slate-500 font-medium">Real-time project pipeline status</p>
                            </div>
                        </div>

                        {/* Status Breakdown Bar */}
                        <div className="space-y-8">
                            <div className="h-12 w-full bg-white/5 rounded-2xl overflow-hidden p-1 flex">
                                <div
                                    className="h-full bg-blue-400 rounded-l-xl transition-all"
                                    style={{ width: `${(activeCount / Math.max(projects.length, 1)) * 100}%` }}
                                    title="Active"
                                />
                                <div
                                    className="h-full bg-green-400 transition-all"
                                    style={{ width: `${(completedCount / Math.max(projects.length, 1)) * 100}%` }}
                                    title="Completed"
                                />
                                <div
                                    className="h-full bg-yellow-400 rounded-r-xl transition-all"
                                    style={{ width: `${(pendingProjects.length / Math.max(projects.length, 1)) * 100}%` }}
                                    title="Pending"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <p className="text-[10px] uppercase font-black text-blue-400 mb-1">Active</p>
                                    <p className="text-2xl font-black">{activeCount}</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <p className="text-[10px] uppercase font-black text-green-400 mb-1">Completed</p>
                                    <p className="text-2xl font-black">{completedCount}</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <p className="text-[10px] uppercase font-black text-yellow-400 mb-1">Pending</p>
                                    <p className="text-2xl font-black">{pendingProjects.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/5">
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 mb-1">Total Revenue Earned</p>
                                    <p className="text-xl font-black">₹{totalRevenue.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                            <Link href="/admin/clients" className="btn-outline px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2">
                                View All Clients <TrendingUp size={14} />
                            </Link>
                        </div>
                    </div>

                    <div className="card p-8">
                        {/* Quick Actions Removed */}

                        <div className={`p-6 rounded-[2rem] border transition-colors ${pendingInvoicesCount > 0 ? 'bg-[var(--accent-soft)] border-[var(--accent-border)]' : 'bg-white/5 border-white/5 opacity-50'}`}>
                            {pendingInvoicesCount > 0 ? (
                                <>
                                    <AlertCircle size={24} className="text-[var(--accent)] mb-4" />
                                    <h3 className="font-black mb-2">{pendingInvoicesCount} Pending Payments</h3>
                                    <p className="text-sm text-slate-400 font-medium mb-6 leading-relaxed">
                                        There are {pendingInvoicesCount} invoices awaiting client payment.
                                    </p>
                                    <button
                                        onClick={() => setShowPendingModal(true)}
                                        className="btn-primary w-full text-center py-3 text-sm hover:scale-[1.02] transition-transform"
                                    >
                                        Review Invoices
                                    </button>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={24} className="text-green-400 mb-4" />
                                    <h3 className="font-black mb-2">All Clear</h3>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed"> No pending invoices found in the system. </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* New Requests Section */}
                {pendingProjects.length > 0 && (
                    <div className="card border-[var(--accent-border)] bg-[var(--accent-soft)]/20 animate-fade-in">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                                <h2 className="text-xl font-black">Project Requests ({pendingProjects.length})</h2>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody className="divide-y divide-white/5">
                                    {pendingProjects.map((proj: Project) => (
                                        <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-6 px-8">
                                                <div className="font-bold text-lg mb-1">{proj.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">From: {proj.email}</div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="text-xs font-black px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white uppercase tracking-widest">{proj.websiteType}</span>
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <button
                                                    onClick={() => handleApprove(proj)}
                                                    disabled={isProcessing === proj.id}
                                                    className="btn-primary px-6 py-2.5 text-xs font-black disabled:opacity-50"
                                                >
                                                    {isProcessing === proj.id ? 'Processing...' : 'Approve & Start'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Recently Active Projects */}
                <div className="card overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-black">Recently Active</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#151515]">
                                <tr>
                                    <th className="text-left py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Project</th>
                                    <th className="text-left py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="text-left py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Progress</th>
                                    <th className="text-left py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Type</th>
                                    <th className="text-right py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.map((proj: Project) => (
                                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black group-hover:border-[var(--accent)] transition-colors">
                                                    {proj.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-bold">{proj.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${proj.status === 'active' ? 'bg-[var(--accent)] animate-pulse' : 'bg-slate-600'}`} />
                                                <span className="text-sm font-bold text-slate-400 capitalize">{proj.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 min-w-[120px] h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${proj.progress}%` }} />
                                                </div>
                                                <span className="text-xs font-black text-slate-500">{proj.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-xs font-black px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 uppercase tracking-widest uppercase">{proj.websiteType}</span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button className="text-slate-500 hover:text-white transition-colors"><ArrowRight size={20} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Revenue Details Modal */}
            {showRevenueModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRevenueModal(false)}>
                    <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">Revenue Breakdown</h2>
                                <p className="text-sm text-slate-400 mt-1">All cleared invoices contributing to revenue</p>
                            </div>
                            <button onClick={() => setShowRevenueModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {paidInvoices.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="font-bold">No Cleared Invoices Yet</p>
                                    <p className="text-sm mt-2">Mark invoices as cleared in project financials to add to revenue.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {paidInvoices.map((inv: Invoice) => {
                                        const project = projects.find((p: Project) => p.id === inv.projectId);
                                        return (
                                            <div key={inv.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-green-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                                                        <CheckCircle2 size={20} className="text-green-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{project?.name || 'Unknown Project'}</p>
                                                        <p className="text-xs text-slate-400">{project?.email || 'No email'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-black text-green-400">₹{inv.amount.toLocaleString('en-IN')}</p>
                                                    <p className="text-xs text-slate-500">Cleared</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-[var(--accent-soft)]">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400">TOTAL REVENUE EARNED</span>
                                <span className="text-3xl font-black text-[var(--accent)]">₹{totalRevenue.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pending Invoices Modal */}
            {showPendingModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPendingModal(false)}>
                    <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-yellow-500">Pending Invoices</h2>
                                <p className="text-sm text-slate-400 mt-1">Outstanding payments requiring attention</p>
                            </div>
                            <button onClick={() => setShowPendingModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {pendingInvoicesList.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <CheckCircle2 size={48} className="mx-auto mb-4 opacity-50 text-green-500" />
                                    <p className="font-bold">All caught up!</p>
                                    <p className="text-sm mt-2">No pending invoices found.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {pendingInvoicesList.map((inv: Invoice) => {
                                        const project = projects.find((p: Project) => p.id === inv.projectId);
                                        return (
                                            <div key={inv.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-500/30 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                                        <Clock size={20} className="text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{project?.name || 'Unknown Project'}</p>
                                                        <p className="text-xs text-slate-400">{project?.email || 'No email'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="text-xl font-black text-yellow-400">₹{inv.amount.toLocaleString('en-IN')}</p>
                                                        <p className="text-xs text-slate-500">Pending</p>
                                                    </div>
                                                    {project && (
                                                        <Link
                                                            href={`/admin/projects/${project.id}`}
                                                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                                        >
                                                            <ArrowRight size={18} className="text-slate-400 group-hover:text-white" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
