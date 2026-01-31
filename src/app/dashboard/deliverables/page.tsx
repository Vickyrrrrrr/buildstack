'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { ExternalLink, Download, FileText, Globe, Package } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProjects, useStations, useDeliverable } from '@/lib/firestore-hooks';

export default function DeliverablesPage() {
    const { user, loading: authLoading } = useAuth();
    const { projects, loading: projectsLoading } = useProjects(user?.uid);

    // Get the first (most recent) project
    const project = projects.length > 0 ? projects[0] : null;
    const { stations, loading: stationsLoading } = useStations(project?.id || null, user?.uid);
    const { deliverable, loading: deliverableLoading } = useDeliverable(project?.id || null, user?.uid);

    // Loading state
    if (authLoading || projectsLoading || (project && (stationsLoading || deliverableLoading))) {
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
                        Start a project to view deliverables here.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start a Project
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const isDelivered = stations.length > 0 && stations.every(s => s.status === 'completed');
    const isInReview = stations.find(s => s.name === 'Review & Fixes')?.status === 'active';
    const hasPreview = deliverable?.previewUrl;

    return (
        <DashboardLayout projectName={project.name}>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            Deliverables
                        </h1>
                        <p className="text-[var(--foreground-muted)]">
                            Preview your website and download project files
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-green-500">LIVE</span>
                    </div>
                </div>

                {/* Status Notice */}
                {!isDelivered && !isInReview && stations.length > 0 && (
                    <div className="card p-6 bg-[var(--accent-soft)] border-[var(--accent-light)]">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[var(--accent-light)] rounded-lg flex items-center justify-center shrink-0">
                                <Package size={20} className="text-[var(--accent)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--accent)] mb-1">Project In Progress</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Your deliverables will be available once the project reaches the Review stage.
                                    <Link href="/dashboard/tracking" className="text-[var(--accent)] hover:underline ml-1">
                                        Track progress →
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Website Preview */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[var(--accent-soft)] rounded-lg flex items-center justify-center">
                            <Globe size={20} className="text-[var(--accent)]" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Website Preview</h3>
                            <p className="text-sm text-[var(--foreground-muted)]">Live preview of your website</p>
                        </div>
                    </div>

                    {hasPreview ? (
                        <div className="space-y-4">
                            <div className="bg-[var(--background)] rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-[var(--border)]">
                                        <Globe size={16} className="text-[var(--foreground-muted)]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Preview URL</p>
                                        <p className="text-xs text-[var(--foreground-muted)]">{deliverable.previewUrl}</p>
                                    </div>
                                </div>
                                <a
                                    href={deliverable.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <ExternalLink size={16} />
                                    View Live
                                </a>
                            </div>
                            <p className="text-xs text-[var(--foreground-subtle)]">
                                Note: This is a preview link and may be removed after project completion.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-[var(--background)] rounded-lg p-8 text-center">
                            <Globe size={32} className="mx-auto text-[var(--foreground-subtle)] mb-3" />
                            <p className="text-[var(--foreground-muted)]">Preview not available yet</p>
                            <p className="text-sm text-[var(--foreground-subtle)]">
                                Will be available during review phase
                            </p>
                        </div>
                    )}
                </div>

                {/* Downloads */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[var(--success-light)] rounded-lg flex items-center justify-center">
                            <Download size={20} className="text-[var(--success)]" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Downloads</h3>
                            <p className="text-sm text-[var(--foreground-muted)]">Project files and documents</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Invoice Download */}
                        <div className="bg-[var(--background)] rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[var(--border)]">
                                    <FileText size={18} className="text-[var(--foreground-muted)]" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm mb-1">Invoice</p>
                                    <p className="text-xs text-[var(--foreground-muted)] mb-3">PDF document</p>
                                    <Link href="/dashboard/invoice" className="btn btn-outline btn-sm w-full">
                                        View Invoice
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Website Files */}
                        <div className="bg-[var(--background)] rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[var(--border)]">
                                    <Package size={18} className="text-[var(--foreground-muted)]" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm mb-1">Website Files</p>
                                    <p className="text-xs text-[var(--foreground-muted)] mb-3">Source code & assets</p>
                                    {deliverable?.filesUrl ? (
                                        <a
                                            href={deliverable.filesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline btn-sm w-full"
                                        >
                                            Download Files
                                        </a>
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-sm w-full"
                                            disabled
                                        >
                                            {isDelivered ? 'Files Not Uploaded' : 'Available on Delivery'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help */}
                <div className="card p-5 bg-[var(--background)] border-dashed">
                    <p className="text-sm text-[var(--foreground-muted)] text-center">
                        Questions about your deliverables? Contact us at{' '}
                        <a href="mailto:hello@buildstack.com" className="text-[var(--accent)] hover:underline">
                            hello@buildstack.com
                        </a>
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
