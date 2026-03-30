'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import Image from 'next/image';
import { usePortfolio } from '@/lib/firestore-hooks';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Plus, Trash2, ExternalLink, Globe, Layout, Image as ImageIcon, Save, X } from 'lucide-react';

export default function PortfolioManagerPage() {
    const { items, loading } = usePortfolio();
    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        link: '',
        category: '',
        imageUrl: ''
    });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await addDoc(collection(db, 'buildstack_portfolio'), {
                ...formData,
                createdAt: serverTimestamp()
            });
            setIsAdding(false);
            setFormData({ name: '', description: '', link: '', category: '', imageUrl: '' });
        } catch (error) {
            console.error("Error adding portfolio item:", error);
            alert("Failed to add project.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteDoc(doc(db, 'buildstack_portfolio', id));
        } catch (error) {
            console.error("Error deleting portfolio item:", error);
            alert("Failed to delete project.");
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Portfolio Manager</h1>
                    <p className="text-slate-400">Manage showcase projects displayed on the homepage.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`btn-primary flex items-center gap-2 px-6 ${isAdding ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''}`}
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                    {isAdding ? 'Cancel' : 'Add New Project'}
                </button>
            </div>

            {/* Add Form */}
            {isAdding && (
                <div className="card p-8 mb-12 border-2 border-[var(--accent)] animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleAdd} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Project Name</label>
                                <div className="relative">
                                    <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Dawakhana Pharmacy"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[var(--accent)] outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Category</label>
                                <div className="relative">
                                    <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. E-commerce / Health"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[var(--accent)] outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Short Description</label>
                                <textarea
                                    required
                                    placeholder="Explain what makes this project special..."
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:border-[var(--accent)] outline-none min-h-[100px]"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Live Link</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        required
                                        type="url"
                                        placeholder="https://example.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[var(--accent)] outline-none"
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Image URL (Unsplash/Link)</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="url"
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[var(--accent)] outline-none"
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="btn-primary flex items-center gap-2 px-10 py-4 font-black"
                            >
                                {isSaving ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
                                {isSaving ? 'Saving...' : 'Add Project to Portfolio'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Portfolio Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {items.map((item) => (
                        <div key={item.id} className="card group overflow-hidden bg-[#111]">
                            <div className="h-48 bg-black relative">
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        unoptimized
                                        loader={({ src }) => src}
                                        className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="mb-4">
                                    <span className="text-[var(--accent)] font-black text-[10px] uppercase tracking-widest bg-[var(--accent-soft)] px-3 py-1 rounded-full border border-[var(--accent-border)]">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black mb-3">{item.name}</h3>
                                <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[var(--accent)] font-bold text-sm hover:underline"
                                >
                                    Live Preview <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
