'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { formatDate } from '@/lib/utils';
import { Receipt, Download, CreditCard, Building2, Smartphone, CheckCircle2, FileText } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProjects, useInvoice } from '@/lib/firestore-hooks';
import Link from 'next/link';

export default function InvoicePage() {
    const { user, loading: authLoading } = useAuth();
    const { projects, loading: projectsLoading } = useProjects(user?.uid);

    // Get the first (most recent) project
    const project = projects.length > 0 ? projects[0] : null;
    const { invoice, loading: invoiceLoading } = useInvoice(project?.id || null, user?.uid);

    // Loading state
    if (authLoading || projectsLoading || (project && invoiceLoading)) {
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
                        <Receipt size={48} className="text-[var(--accent)]" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter mb-4">No Active Projects</h1>
                    <p className="text-slate-400 text-lg max-w-md mx-auto mb-8">
                        Start a project to view invoices here.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start a Project
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    // No invoice yet
    if (!invoice) {
        return (
            <DashboardLayout projectName={project.name}>
                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Invoice</h1>
                        <p className="text-[var(--foreground-muted)]">View and download your project invoice</p>
                    </div>

                    <div className="card p-12 text-center">
                        <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText size={40} className="text-[var(--accent)]" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Invoice Pending</h2>
                        <p className="text-slate-400 max-w-md mx-auto">
                            Your invoice will be generated once the project details are finalized.
                            You'll be notified when it's ready.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-[var(--accent)]">
                            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                            <span>Synced in real-time</span>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const isPaid = invoice.status === 'paid';

    return (
        <DashboardLayout projectName={project.name}>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                        Invoice
                    </h1>
                    <p className="text-[var(--foreground-muted)]">
                        View and download your project invoice
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Invoice Card */}
                    <div className="lg:col-span-2">
                        <div className="card p-6 md:p-8">
                            {/* Invoice Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Receipt size={20} className="text-[var(--accent)]" />
                                        <span className="text-sm text-[var(--foreground-muted)]">Invoice</span>
                                    </div>
                                    <h2 className="text-2xl font-semibold">{invoice.invoiceNumber}</h2>
                                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                        Issued on {formatDate(invoice.createdAt)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`badge ${isPaid ? 'badge-success' : 'badge-warning'}`}>
                                        {isPaid ? 'Paid' : 'To Be Paid'}
                                    </span>
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs font-bold text-green-500">LIVE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Details */}
                            <div className="border-t border-b border-[var(--border)] py-6 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[var(--foreground-muted)]">Project</span>
                                    <span className="font-medium">{project.name}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[var(--foreground-muted)]">Website Type</span>
                                    <span className="font-medium capitalize">{project.websiteType || 'Custom'} Website</span>
                                </div>
                                {project.startDate && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--foreground-muted)]">Start Date</span>
                                        <span className="font-medium">{formatDate(project.startDate)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Amount */}
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-sm text-[var(--foreground-muted)]">Total Amount</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-semibold">
                                        ₹{invoice.amount.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>

                            {/* Download Button */}
                            {invoice.pdfUrl ? (
                                <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                                    <Download size={18} />
                                    Download Invoice PDF
                                </a>
                            ) : (
                                <button className="btn btn-primary w-full" disabled>
                                    <Download size={18} />
                                    PDF Not Available Yet
                                </button>
                            )}

                            {isPaid && (
                                <div className="mt-4 p-4 bg-[var(--success-light)] rounded-lg flex items-center gap-3">
                                    <CheckCircle2 size={20} className="text-[var(--success)]" />
                                    <span className="text-sm text-[var(--success)]">
                                        This invoice has been paid. Thank you!
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-4">
                        {!isPaid && (
                            <>
                                <div className="card p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-[var(--accent-soft)] rounded-lg flex items-center justify-center">
                                            <Smartphone size={18} className="text-[var(--accent)]" />
                                        </div>
                                        <h3 className="font-semibold">UPI Payment</h3>
                                    </div>
                                    <div className="bg-[var(--background)] rounded-lg p-4">
                                        <p className="text-sm text-[var(--foreground-muted)] mb-1">UPI ID</p>
                                        <p className="font-mono font-medium">buildstack@upi</p>
                                    </div>
                                </div>

                                <div className="card p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-[var(--accent-soft)] rounded-lg flex items-center justify-center">
                                            <Building2 size={18} className="text-[var(--accent)]" />
                                        </div>
                                        <h3 className="font-semibold">Bank Transfer</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-[var(--background)] rounded-lg p-3">
                                            <p className="text-xs text-[var(--foreground-muted)]">Account Name</p>
                                            <p className="font-medium text-sm">Buildstack Solutions</p>
                                        </div>
                                        <div className="bg-[var(--background)] rounded-lg p-3">
                                            <p className="text-xs text-[var(--foreground-muted)]">Account Number</p>
                                            <p className="font-mono font-medium text-sm">1234567890123456</p>
                                        </div>
                                        <div className="bg-[var(--background)] rounded-lg p-3">
                                            <p className="text-xs text-[var(--foreground-muted)]">IFSC Code</p>
                                            <p className="font-mono font-medium text-sm">HDFC0001234</p>
                                        </div>
                                        <div className="bg-[var(--background)] rounded-lg p-3">
                                            <p className="text-xs text-[var(--foreground-muted)]">Bank</p>
                                            <p className="font-medium text-sm">HDFC Bank</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-4 bg-[var(--accent-soft)] border-[var(--accent-light)]">
                                    <p className="text-sm text-[var(--foreground-muted)]">
                                        <span className="font-medium text-[var(--accent)]">Note:</span> Please share payment confirmation screenshot to{' '}
                                        <a href="mailto:contactme@buildstack.live" className="text-[var(--accent)] hover:underline">
                                            contactme@buildstack.live
                                        </a>
                                    </p>
                                </div>
                            </>
                        )}

                        {isPaid && (
                            <div className="card p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 bg-[var(--success-light)] rounded-lg flex items-center justify-center">
                                        <CreditCard size={18} className="text-[var(--success)]" />
                                    </div>
                                    <h3 className="font-semibold">Payment Received</h3>
                                </div>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Thank you for your payment. Your project is now complete!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
