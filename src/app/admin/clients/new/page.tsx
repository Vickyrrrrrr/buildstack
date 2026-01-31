'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewClientPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        email: '',
        password: '',
        websiteType: '',
        description: '',
        referenceUrls: '',
        estimatedDelivery: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to clients list
        router.push('/admin/clients');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/clients" className="icon-btn">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold">Add New Client</h1>
                        <p className="text-[var(--foreground-muted)]">Create a new client account and project</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
                    {/* Client Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Client Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="businessName" className="label">Business Name</label>
                                <input
                                    type="text"
                                    id="businessName"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Acme Inc."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="label">Client Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="client@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="label">Temporary Password</label>
                                    <input
                                        type="text"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="temp123"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* Project Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="websiteType" className="label">Website Type</label>
                                    <select
                                        id="websiteType"
                                        name="websiteType"
                                        value={formData.websiteType}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    >
                                        <option value="">Select type</option>
                                        <option value="business">Business Website</option>
                                        <option value="portfolio">Portfolio Website</option>
                                        <option value="landing">Landing Page</option>
                                        <option value="ecommerce">E-commerce</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="estimatedDelivery" className="label">Estimated Delivery</label>
                                    <input
                                        type="date"
                                        id="estimatedDelivery"
                                        name="estimatedDelivery"
                                        value={formData.estimatedDelivery}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="label">Project Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input"
                                    rows={4}
                                    placeholder="Describe what the client needs..."
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="referenceUrls" className="label">Reference URLs (optional)</label>
                                <input
                                    type="text"
                                    id="referenceUrls"
                                    name="referenceUrls"
                                    value={formData.referenceUrls}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="https://example.com, https://another.com"
                                />
                                <p className="text-xs text-[var(--foreground-muted)] mt-1">Separate multiple URLs with commas</p>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* File Upload */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Client Files</h2>
                        <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center hover:border-[var(--accent)] transition-colors cursor-pointer">
                            <Upload size={32} className="mx-auto text-[var(--foreground-muted)] mb-3" />
                            <p className="font-medium mb-1">Upload client files</p>
                            <p className="text-sm text-[var(--foreground-muted)]">Logo, content documents, images</p>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <Link href="/admin/clients" className="btn btn-outline flex-1">
                            Cancel
                        </Link>
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1">
                            {isSubmitting ? (
                                <>
                                    <span className="spinner" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Create Client
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
