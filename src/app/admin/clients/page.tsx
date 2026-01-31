'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';
import { Plus, ExternalLink, CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import { useProjects } from '@/lib/firestore-hooks';
import { Project } from '@/types';
import { formatDate, formatDateTime } from '@/lib/utils';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function ClientsPage() {
    const { projects, loading } = useProjects();
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusUpdate = async (projectId: string, newStatus: string) => {
        setUpdatingId(projectId);
        try {
            const projectRef = doc(db, 'buildstack_projects', projectId);
            await updateDoc(projectRef, {
                status: newStatus,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please check your permissions.");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-1">
                            Clients & Projects
                        </h1>
                        <p className="text-slate-400 font-medium">
                            Manage all your clients and their projects
                        </p>
                    </div>
                    <Link href="/contact" className="btn-primary flex items-center gap-2 px-6 py-3">
                        <Plus size={18} />
                        New Project Request
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="card p-6 border border-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Total Projects</p>
                                <p className="text-3xl font-black">{projects.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                <CheckCircle2 size={24} className="text-[var(--accent)]" />
                            </div>
                        </div>
                    </div>
                    <div className="card p-6 border border-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Active</p>
                                <p className="text-3xl font-black">{projects.filter(p => p.status === 'active').length}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                <Clock size={24} className="text-blue-400" />
                            </div>
                        </div>
                    </div>
                    <div className="card p-6 border border-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Completed</p>
                                <p className="text-3xl font-black">{projects.filter(p => p.status === 'completed').length}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                <CheckCircle2 size={24} className="text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="card overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-black">All Projects</h2>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#151515]">
                                <tr>
                                    <th className="text-left p-4 font-black text-xs uppercase tracking-widest text-slate-500">Project</th>
                                    <th className="text-left p-4 font-black text-xs uppercase tracking-widest text-slate-500">Submitted At</th>
                                    <th className="text-left p-4 font-black text-xs uppercase tracking-widest text-slate-500">Type</th>
                                    <th className="text-left p-4 font-black text-xs uppercase tracking-widest text-slate-500">Stage</th>
                                    <th className="text-left p-4 font-black text-xs uppercase tracking-widest text-slate-500">Status</th>
                                    <th className="text-right p-4 font-black text-xs uppercase tracking-widest text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-slate-500">
                                            No projects yet. Create your first project from the contact page.
                                        </td>
                                    </tr>
                                ) : (
                                    projects.map((project: Project) => (
                                        <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center text-black font-black text-sm">
                                                        {project.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{project.name}</p>
                                                        <p className="text-sm text-slate-500">{project.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-medium text-slate-400 whitespace-nowrap">
                                                {formatDateTime(project.createdAt)}
                                            </td>
                                            <td className="p-4">
                                                <span className="text-xs font-black px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg uppercase tracking-widest">
                                                    {project.websiteType}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-400 font-medium">
                                                {project.currentStage}
                                            </td>
                                            <td className="p-4">
                                                <div className="relative inline-block text-left">
                                                    <select
                                                        value={project.status}
                                                        onChange={(e) => handleStatusUpdate(project.id, e.target.value as any)}
                                                        disabled={updatingId === project.id}
                                                        className={`text-xs font-black px-3 py-1.5 rounded-lg border appearance-none cursor-pointer outline-none transition-all pr-8
                                                            ${project.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:border-green-500/40' :
                                                                project.status === 'active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/40' :
                                                                    project.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:border-yellow-500/40' :
                                                                        'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                                                            } ${updatingId === project.id ? 'opacity-50' : ''}`}
                                                    >
                                                        <option value="pending" className="bg-[#111] text-yellow-400">Pending</option>
                                                        <option value="active" className="bg-[#111] text-blue-400">Active</option>
                                                        <option value="completed" className="bg-[#111] text-green-400">Completed</option>
                                                        <option value="on-hold" className="bg-[#111] text-slate-400">On-Hold</option>
                                                    </select>
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Link
                                                    href={`/admin/projects/${project.id}`}
                                                    className="btn-outline px-4 py-2 text-xs font-black inline-flex items-center gap-2 hover:bg-[var(--accent)] hover:text-black transition-all"
                                                >
                                                    Manage
                                                    <ExternalLink size={14} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-white/5">
                        {projects.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">
                                No projects yet. Create your first project from the contact page.
                            </div>
                        ) : (
                            projects.map((project: Project) => (
                                <div key={project.id} className="p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center text-black font-black">
                                                {project.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold">{project.name}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{formatDateTime(project.createdAt)}</p>
                                            </div>
                                        </div>
                                        <select
                                            value={project.status}
                                            onChange={(e) => handleStatusUpdate(project.id, e.target.value as any)}
                                            disabled={updatingId === project.id}
                                            className={`text-[10px] font-black px-2 py-1 rounded bg-white/5 border border-white/10 uppercase
                                                ${project.status === 'completed' ? 'text-green-400' :
                                                    project.status === 'active' ? 'text-blue-400' :
                                                        'text-yellow-400'
                                                }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs text-slate-400 font-medium capitalize">{project.websiteType} • {project.currentStage}</p>
                                                <span className="text-xs font-black text-slate-600">{project.progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[var(--accent)] rounded-full transition-all"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className="btn-outline btn-sm px-4 py-2 text-xs font-black"
                                        >
                                            Manage
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
