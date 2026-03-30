'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Image from 'next/image';
import { User, Mail, Building, Globe, Save } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useState, useEffect } from 'react';
import { useUserProfile } from '@/lib/firestore-hooks';

import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const { profile, loading: profileLoading } = useUserProfile(user?.uid || '');
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        bio: '',
        website: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || user?.displayName || '',
                bio: profile.description || '',
                website: profile.referenceUrls?.[0] || ''
            });
        }
    }, [user, profile]);

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(db, 'buildstack_users', user.uid), {
                name: formData.name,
                description: formData.bio,
                referenceUrls: [formData.website],
                updatedAt: serverTimestamp(),
            });
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("Failed to update settings. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || profileLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto animate-fade-in delay-100">
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight mb-2">Settings</h1>
                    <p className="text-slate-500">Manage your profile and account preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar Nav (Local) */}
                    <div className="space-y-2">
                        <button className="w-full text-left px-4 py-3 bg-[var(--accent-soft)] text-[var(--accent)] rounded-xl font-bold text-sm">
                            General
                        </button>
                        <button className="w-full text-left px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
                            Billing
                        </button>
                        <button className="w-full text-left px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-colors">
                            Notifications
                        </button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <div className="card p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <User className="text-[var(--accent)]" size={20} />
                                Profile Information
                            </h2>

                            <div className="space-y-6">
                                {/* Avatar */}
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl font-black">
                                        {user?.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="Profile"
                                                width={80}
                                                height={80}
                                                unoptimized
                                                loader={({ src }) => src}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            user?.displayName?.charAt(0).toUpperCase() || 'U'
                                        )}
                                    </div>
                                    <div>
                                        <button className="btn-outline text-sm py-2 px-4 rounded-lg font-bold">
                                            Change Avatar
                                        </button>
                                        <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max 1MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Display Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                            <input
                                                type="text"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:border-[var(--accent)] outline-none transition-colors"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                            <input
                                                type="email"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-slate-500 cursor-not-allowed"
                                                value={user?.email || ''}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Bio</label>
                                    <textarea
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm font-medium focus:border-[var(--accent)] outline-none transition-colors min-h-[100px]"
                                        placeholder="Tell us about yourself..."
                                        value={formData.bio}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company Details */}
                        <div className="card p-8 bg-[#111111]">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Building className="text-[var(--accent)]" size={20} />
                                Company Details
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Website</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input
                                            type="url"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:border-[var(--accent)] outline-none transition-colors"
                                            placeholder="https://acme.com"
                                            value={formData.website}
                                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-4">
                            <button onClick={handleSave} disabled={isSaving} className="btn-primary px-8 flex items-center gap-2 disabled:opacity-60">
                                <Save size={18} />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
