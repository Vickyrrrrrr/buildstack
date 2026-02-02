'use client';

import React, { useState, use } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';
import { useProject, useStations, useInvoice, useDeliverable } from '@/lib/firestore-hooks';
import { formatDateTime, formatDate } from '@/lib/utils';
import {
    Clock,
    CheckCircle2,
    Circle,
    Plus,
    Save,
    Trash2,
    Receipt,
    FileDown,
    Settings,
    ChevronRight,
    Loader2,
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import { db } from '@/lib/firebase';
import {
    doc,
    updateDoc,
    collection,
    addDoc,
    deleteDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
    getDocs,
    writeBatch
} from 'firebase/firestore';

const STANDARD_STATIONS = [
    { name: 'Discovery & Planning', note: 'Defining project scope and requirements' },
    { name: 'UI/UX Design', note: 'Creating wireframes and visual designs' },
    { name: 'Core Development', note: 'Building functionality and frontend' },
    { name: 'Testing & QA', note: 'Bug fixing and quality assurance' },
    { name: 'Final Deployment', note: 'Launching to production server' }
];

export default function AdminProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { project, loading: projectLoading } = useProject(id);
    const { stations, loading: stationsLoading, error: stationsError } = useStations(id);
    const { invoice, loading: invoiceLoading } = useInvoice(id);
    const { deliverable, loading: deliverableLoading } = useDeliverable(id);

    const [activeTab, setActiveTab] = useState<'timeline' | 'financials' | 'deliverables' | 'settings'>('timeline');
    const [isUpdating, setIsUpdating] = useState(false);

    // New Station State
    const [newStation, setNewStation] = useState({ name: '', updateNote: '' });

    // Handle Status Change
    const handleStatusChange = async (status: string) => {
        setIsUpdating(true);
        try {
            await updateDoc(doc(db, 'buildstack_projects', id), {
                status,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    // Timeline Actions
    const addStation = async () => {
        if (!newStation.name) return;
        setIsUpdating(true);
        try {
            await addDoc(collection(db, 'buildstack_stations'), {
                projectId: id,
                name: newStation.name,
                updateNote: newStation.updateNote,
                status: 'pending',
                order: stations.length,
                updatedAt: serverTimestamp()
            });

            // Calculate new progress
            const newTotal = stations.length + 1;
            const completed = stations.filter(s => s.status === 'completed').length;
            const progress = Math.round((completed / newTotal) * 100);

            await updateDoc(doc(db, 'buildstack_projects', id), {
                progress,
                updatedAt: serverTimestamp()
            });

            setNewStation({ name: '', updateNote: '' });
        } catch (error: any) {
            console.error(error);
            alert('Failed to add station: ' + error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const initializeStandardStations = async () => {
        if (stations.length > 0) {
            if (!confirm('This will add 5 new stations to your existing list. Continue?')) return;
        }

        setIsUpdating(true);
        try {
            // Sequential adds to ensure correct order
            const currentCount = stations.length;

            for (let i = 0; i < STANDARD_STATIONS.length; i++) {
                const station = STANDARD_STATIONS[i];
                await addDoc(collection(db, 'buildstack_stations'), {
                    projectId: id,
                    name: station.name,
                    updateNote: station.note,
                    status: 'pending',
                    order: currentCount + i,
                    updatedAt: serverTimestamp()
                });
            }

            // Update Progress
            const total = currentCount + STANDARD_STATIONS.length;
            const completed = stations.filter(s => s.status === 'completed').length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            await updateDoc(doc(db, 'buildstack_projects', id), {
                progress,
                updatedAt: serverTimestamp()
            });

        } catch (error: any) {
            console.error(error);
            alert('Failed to initialize stations: ' + error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const updateStationStatus = async (stationId: string, status: string) => {
        setIsUpdating(true);
        try {
            await updateDoc(doc(db, 'buildstack_stations', stationId), {
                status,
                updatedAt: serverTimestamp()
            });

            // Calculate new progress
            const updatedStations = stations.map(s => s.id === stationId ? { ...s, status } : s);
            const total = updatedStations.length;
            const completed = updatedStations.filter(s => s.status === 'completed').length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            await updateDoc(doc(db, 'buildstack_projects', id), {
                progress,
                updatedAt: serverTimestamp()
            });
        } catch (error: any) {
            console.error(error);
            alert('Failed to update station: ' + error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const deleteStation = async (stationId: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteDoc(doc(db, 'buildstack_stations', stationId));

            // Calculate new progress
            const updatedStations = stations.filter(s => s.id !== stationId);
            const total = updatedStations.length;
            const completed = updatedStations.filter(s => s.status === 'completed').length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            await updateDoc(doc(db, 'buildstack_projects', id), {
                progress,
                updatedAt: serverTimestamp()
            });
        } catch (error: any) {
            console.error(error);
            alert('Failed to delete station: ' + error.message);
        }
    };

    // Invoice Actions
    const [invoicePdfUrl, setInvoicePdfUrl] = useState('');
    const [invoiceAmount, setInvoiceAmount] = useState<string>('');

    const generateInvoice = async () => {
        setIsUpdating(true);
        try {
            const invoiceNum = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
            const invoiceRef = await addDoc(collection(db, 'buildstack_invoices'), {
                projectId: id,
                clientId: project?.clientId,
                invoiceNumber: invoiceNum,
                amount: 49999, // Default package price
                status: 'pending',
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const saveInvoiceDetails = async () => {
        if (!invoice) return;
        setIsUpdating(true);
        try {
            const updates: any = {
                updatedAt: serverTimestamp()
            };
            if (invoicePdfUrl) updates.pdfUrl = invoicePdfUrl;
            if (invoiceAmount) updates.amount = Number(invoiceAmount);

            await updateDoc(doc(db, 'buildstack_invoices', invoice.id), updates);
            alert('Invoice details saved!');
        } catch (error) {
            console.error(error);
            alert('Failed to save details');
        } finally {
            setIsUpdating(false);
        }
    };

    const markInvoicePaid = async () => {
        if (!invoice) return;
        if (!invoice.pdfUrl && !invoicePdfUrl) {
            alert('Please provide an invoice PDF link first.');
            return;
        }
        setIsUpdating(true);
        try {
            await updateDoc(doc(db, 'buildstack_invoices', invoice.id), {
                status: 'paid',
                pdfUrl: invoice.pdfUrl || invoicePdfUrl,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (projectLoading) {
        return (
            <AdminLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-[var(--accent)] animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    if (!project) {
        return (
            <AdminLayout>
                <div className="p-12 text-center">
                    <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                    <h1 className="text-2xl font-black">Project Not Found</h1>
                    <p className="text-slate-500 mt-2">The project you are looking for does not exist or has been deleted.</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8 animate-fade-in">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                    <Link href="/admin/clients" className="hover:text-[var(--accent)] transition-colors">Clients</Link>
                    <ChevronRight size={14} />
                    <span className="text-white">{project.name}</span>
                </div>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
                                {project.name}
                            </h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                project.status === 'active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-slate-400 font-medium">
                            Client: <span className="text-white">{project.company || project.name}</span> • Submitted on {formatDate(project.createdAt)}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={project.status || 'pending'}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            disabled={isUpdating}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-[var(--accent)] transition-all cursor-pointer"
                        >
                            <option value="pending">Set Pending</option>
                            <option value="active">Set Active</option>
                            <option value="completed">Set Completed</option>
                            <option value="on-hold">Set On-Hold</option>
                        </select>
                        <button className="btn-outline px-6 py-2 text-xs font-black flex items-center gap-2">
                            <Trash2 size={16} className="text-red-500" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-white/5 p-1 bg-white/5 rounded-2xl w-fit">
                    {(['timeline', 'financials', 'deliverables', 'settings'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'bg-[var(--accent)] text-black shadow-[0_0_20px_rgba(191,255,0,0.2)]'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'timeline' && (
                            <div className="space-y-6">
                                {/* Add Station */}
                                <div className="card p-6 border border-[var(--accent)]/20 bg-[var(--accent)]/[0.02]">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Plus size={16} className="text-[var(--accent)]" />
                                        Add New Lifecycle Station
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            type="text"
                                            placeholder="Station Name (e.g. Design Approved)"
                                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-all"
                                            value={newStation.name}
                                            onChange={e => setNewStation({ ...newStation, name: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Status Update Note (Optional)"
                                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-all"
                                            value={newStation.updateNote}
                                            onChange={e => setNewStation({ ...newStation, updateNote: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={addStation}
                                        disabled={isUpdating || !newStation.name}
                                        className="btn-primary w-fit px-8 text-xs disabled:opacity-50"
                                    >
                                        Add Custom Station
                                    </button>
                                </div>

                                {/* Quick Templates */}
                                {stations.length === 0 && (
                                    <div className="card p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                                        <div>
                                            <h4 className="font-bold text-lg text-blue-300">New Project Setup?</h4>
                                            <p className="text-sm text-slate-400">One-click to add the standard 5-step Web Development lifecycle.</p>
                                        </div>
                                        <button
                                            onClick={initializeStandardStations}
                                            disabled={isUpdating}
                                            className="btn-primary bg-blue-500 hover:bg-blue-600 border-blue-500 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1"
                                        >
                                            Use Standard Workflow
                                        </button>
                                    </div>
                                )}

                                {/* Station List */}
                                <div className="space-y-4">
                                    {stationsError ? (
                                        <div className="p-6 text-center text-red-400 border border-red-500/20 bg-red-500/5 rounded-3xl animate-pulse">
                                            <AlertCircle className="mx-auto mb-2" />
                                            <p className="font-bold">Error Loading Stations</p>
                                            <p className="text-xs opacity-80 mt-1">{stationsError.message}</p>
                                            {stationsError.message.includes('index') && (
                                                <p className="text-xs font-bold mt-2 text-yellow-500">
                                                    Database Index Building... Please wait a few minutes and refresh.
                                                </p>
                                            )}
                                        </div>
                                    ) : stations.length === 0 ? (
                                        <div className="p-12 text-center text-slate-500 border border-dashed border-white/10 rounded-3xl">
                                            No stations created yet.
                                        </div>
                                    ) : (
                                        stations.map((station, index) => (
                                            <div key={station.id} className="card p-5 flex items-center justify-between group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${station.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                                                        station.status === 'active' ? 'bg-[var(--accent)] text-black animate-pulse' :
                                                            'bg-white/5 text-slate-500'
                                                        }`}>
                                                        {station.status === 'completed' ? <CheckCircle2 size={16} /> : index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold">{station.name}</h4>
                                                        <p className="text-xs text-slate-500">{station.updateNote || 'No description provided'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <select
                                                        value={station.status}
                                                        onChange={(e) => updateStationStatus(station.id, e.target.value)}
                                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-black uppercase outline-none"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="active">Active</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                    <button
                                                        onClick={() => deleteStation(station.id)}
                                                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'financials' && (
                            <div className="space-y-6">
                                {!invoice ? (
                                    <div className="card p-12 text-center border-dashed">
                                        <Receipt size={48} className="mx-auto text-slate-500 mb-4" />
                                        <h3 className="text-xl font-bold">No Invoice Found</h3>
                                        <p className="text-slate-500 mt-2 mb-8">Generate an invoice to start the billing process for this project.</p>
                                        <button onClick={generateInvoice} className="btn-primary px-8">Generate First Invoice</button>
                                    </div>
                                ) : (
                                    <div className="card p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Invoice Number</p>
                                                <h3 className="text-2xl font-black">{invoice.invoiceNumber}</h3>
                                            </div>
                                            <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${invoice.status === 'paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                                }`}>
                                                {invoice.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 mb-8">
                                            <div>
                                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Invoice Amount</p>
                                                {invoice.status !== 'paid' ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-[var(--accent)]">₹</span>
                                                        <input
                                                            type="number"
                                                            className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xl font-bold text-[var(--accent)] w-32 outline-none focus:border-[var(--accent)]"
                                                            defaultValue={invoice.amount}
                                                            onChange={(e) => setInvoiceAmount(e.target.value)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <p className="text-xl font-bold text-[var(--accent)]">₹{invoice.amount.toLocaleString()}</p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Created At</p>
                                                <p className="text-sm font-medium">{formatDate(invoice.createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Invoice Cleared Checkbox */}
                                            <div className={`p-6 rounded-2xl border-2 transition-all ${invoice.status === 'paid'
                                                ? 'bg-green-500/10 border-green-500/30'
                                                : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                                <label className="flex items-center gap-4 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={invoice.status === 'paid'}
                                                        onChange={async (e) => {
                                                            const newStatus = e.target.checked ? 'paid' : 'pending';
                                                            setIsUpdating(true);
                                                            try {
                                                                await updateDoc(doc(db, 'buildstack_invoices', invoice.id), {
                                                                    status: newStatus,
                                                                    updatedAt: serverTimestamp()
                                                                });
                                                            } catch (error: any) {
                                                                console.error(error);
                                                                alert('Failed to update invoice: ' + error.message);
                                                            } finally {
                                                                setIsUpdating(false);
                                                            }
                                                        }}
                                                        disabled={isUpdating}
                                                        className="w-6 h-6 rounded-lg border-2 border-white/20 bg-black/40 checked:bg-green-500 checked:border-green-500 appearance-none cursor-pointer relative
                                                            after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:font-bold after:opacity-0 checked:after:opacity-100"
                                                    />
                                                    <div className="flex-1">
                                                        <p className={`font-black text-lg ${invoice.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                                                            {invoice.status === 'paid' ? '✓ Invoice Cleared — Added to Revenue' : '⏳ Payment Pending'}
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-1">
                                                            {invoice.status === 'paid'
                                                                ? `₹${invoice.amount.toLocaleString()} has been added to your total revenue.`
                                                                : 'Check this box once payment is received to add amount to revenue.'}
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>

                                            {/* PDF Link Section */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Invoice Link (PDF)</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] outline-none"
                                                        placeholder="Paste invoice PDF URL here..."
                                                        defaultValue={invoice.pdfUrl || ''}
                                                        onChange={(e) => setInvoicePdfUrl(e.target.value)}
                                                    />
                                                    <button
                                                        onClick={saveInvoiceDetails}
                                                        disabled={isUpdating}
                                                        className="btn-outline px-6 text-xs font-black flex items-center gap-2"
                                                    >
                                                        <Save size={16} />
                                                        Save
                                                    </button>
                                                    {invoice.pdfUrl && (
                                                        <a
                                                            href={invoice.pdfUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-outline px-4 text-xs font-black flex items-center gap-2"
                                                        >
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'deliverables' && (
                            <div className="card p-8">
                                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                    <FileDown className="text-[var(--accent)]" size={20} />
                                    Project Deliverables
                                </h3>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Preview URL (Vercel/Staging)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] outline-none"
                                            placeholder="https://your-preview.vercel.app"
                                            defaultValue={deliverable?.previewUrl || ''}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Source Files (DropBox/Drive)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--accent)] outline-none"
                                            placeholder="https://dropbox.com/s/..."
                                            defaultValue={deliverable?.filesUrl || ''}
                                        />
                                    </div>
                                    <button className="btn-primary px-8 flex items-center gap-2">
                                        <Save size={16} />
                                        Save links
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="card p-8">
                                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                    <Settings className="text-[var(--accent)]" size={20} />
                                    Project Core Settings
                                </h3>
                                <p className="text-slate-500 text-sm mb-6">Coming soon: Edit project name, client links, and description.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Quick Stats</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Timeline Progress</span>
                                    <span className="text-sm font-bold text-[var(--accent)]">
                                        {stations.length > 0
                                            ? Math.round((stations.filter(s => s.status === 'completed').length / stations.length) * 100)
                                            : 0}%
                                    </span>
                                </div>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[var(--accent)] transition-all duration-500"
                                        style={{
                                            width: `${stations.length > 0
                                                ? Math.round((stations.filter(s => s.status === 'completed').length / stations.length) * 100)
                                                : 0}%`
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm text-slate-400">Invoices Generated</span>
                                    <span className="text-sm font-bold">{invoice ? '1' : '0'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6 border-white/10 bg-white/[0.01]">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Admin Controls</h4>
                            <div className="space-y-3">
                                <button className="w-full py-3 rounded-xl bg-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Send Update Email
                                </button>
                                <button className="w-full py-3 rounded-xl bg-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Pause Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
