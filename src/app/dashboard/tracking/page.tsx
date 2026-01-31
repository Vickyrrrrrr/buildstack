'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { formatDateTime } from '@/lib/utils';
import { CheckCircle2, Circle, Loader2, Package } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProjects, useStations } from '@/lib/firestore-hooks';
import Link from 'next/link';

export default function TrackingPage() {
    const { user, loading: authLoading } = useAuth();
    const { projects, loading: projectsLoading } = useProjects(user?.uid);

    // Get the first (most recent) project
    const project = projects.length > 0 ? projects[0] : null;
    const { stations, loading: stationsLoading } = useStations(project?.id || null, user?.uid);

    // Loading state
    if (authLoading || projectsLoading || (project && stationsLoading)) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    // No project state
    if (!project) {
        return (
            <DashboardLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
                    <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-8">
                        <Package size={48} className="text-[var(--accent)]" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter mb-4">No Active Projects</h1>
                    <p className="text-slate-400 text-lg max-w-md mx-auto mb-8">
                        Start a project to track its progress here in real-time.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start a Project
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout projectName={project.name}>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                        Track Delivery
                    </h1>
                    <p className="text-[var(--foreground-muted)]">
                        Watch your website progress through each delivery stage — updates sync in real-time!
                    </p>
                </div>

                {/* Tracking Card */}
                <div className="card p-6 md:p-8">
                    {/* Project Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
                        <div>
                            <p className="text-sm text-[var(--foreground-muted)] mb-1">Project</p>
                            <h2 className="text-xl font-semibold">{project.name}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`badge ${project.status === 'completed' ? 'badge-success' :
                                project.status === 'active' ? 'badge-accent' :
                                    'badge-outline'
                                }`}>
                                {project.status === 'active' ? 'In Progress' :
                                    project.status === 'completed' ? 'Completed' :
                                        project.status === 'pending' ? 'Pending Review' : project.status}
                            </span>
                            {/* Real-time indicator */}
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-green-500">LIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Station Timeline */}
                    <div className="relative">
                        {stations.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                <p>No tracking stations created yet.</p>
                                <p className="text-sm">The admin will set up your project timeline soon.</p>
                            </div>
                        ) : (
                            stations.map((station, index) => {
                                const isCompleted = station.status === 'completed';
                                const isActive = station.status === 'active';
                                const isPending = station.status === 'pending';
                                const isLast = index === stations.length - 1;

                                return (
                                    <div key={station.id} className="relative flex gap-4 md:gap-6">
                                        {/* Status Line & Circle */}
                                        <div className="flex flex-col items-center">
                                            {/* Circle */}
                                            <div className={`
                                                relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                                transition-all duration-300
                                                ${isCompleted
                                                    ? 'bg-[var(--success)] text-white'
                                                    : isActive
                                                        ? 'bg-[var(--accent)] text-white animate-pulse'
                                                        : 'bg-white border-2 border-[var(--border)]'
                                                }
                                            `}>
                                                {isCompleted && <CheckCircle2 size={20} />}
                                                {isActive && <Loader2 size={20} className="animate-spin" />}
                                                {isPending && <Circle size={20} className="text-[var(--border)]" />}
                                            </div>

                                            {/* Connecting Line */}
                                            {!isLast && (
                                                <div className={`
                                                    w-0.5 flex-1 min-h-[60px]
                                                    ${isCompleted ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}
                                                `} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
                                            <div className={`
                                                p-4 md:p-5 rounded-xl transition-all
                                                ${isActive
                                                    ? 'bg-[var(--accent-soft)] border border-[var(--accent-light)]'
                                                    : isCompleted
                                                        ? 'bg-[var(--success-light)] border border-[var(--success-light)]'
                                                        : 'bg-[var(--background)]'
                                                }
                                            `}>
                                                {/* Station Header */}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                    <h3 className={`font-semibold ${isCompleted
                                                        ? 'text-[var(--success)]'
                                                        : isActive
                                                            ? 'text-[var(--accent)]'
                                                            : 'text-[var(--foreground-muted)]'
                                                        }`}>
                                                        {station.name}
                                                    </h3>

                                                    {/* Status Badge */}
                                                    <span className={`text-xs font-medium uppercase tracking-wider ${isCompleted
                                                        ? 'text-[var(--success)]'
                                                        : isActive
                                                            ? 'text-[var(--accent)]'
                                                            : 'text-[var(--foreground-subtle)]'
                                                        }`}>
                                                        {isCompleted ? '✓ Completed' : isActive ? '⏳ In Progress' : 'Pending'}
                                                    </span>
                                                </div>

                                                {/* Update Note */}
                                                {station.updateNote && (
                                                    <p className={`text-sm ${isCompleted || isActive
                                                        ? 'text-[var(--foreground-muted)]'
                                                        : 'text-[var(--foreground-subtle)]'
                                                        }`}>
                                                        {station.updateNote}
                                                    </p>
                                                )}

                                                {/* Timestamp */}
                                                {station.updatedAt && (
                                                    <p className="text-xs text-[var(--foreground-subtle)] mt-2">
                                                        Last updated: {formatDateTime(station.updatedAt)}
                                                    </p>
                                                )}

                                                {/* Pending State */}
                                                {isPending && !station.updateNote && (
                                                    <p className="text-sm text-[var(--foreground-subtle)] italic">
                                                        Waiting to begin...
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div className="card p-5">
                    <p className="text-sm font-medium mb-3 text-[var(--foreground-muted)]">Status Legend</p>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[var(--success)]" />
                            <span className="text-sm text-[var(--foreground-muted)]">Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[var(--accent)] animate-pulse" />
                            <span className="text-sm text-[var(--foreground-muted)]">In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-[var(--border)] bg-white" />
                            <span className="text-sm text-[var(--foreground-muted)]">Pending</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
