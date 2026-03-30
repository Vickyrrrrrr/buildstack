/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactContent() {
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get('service');

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        websiteType: '',
        message: '',
    });

    // Map service param to form values
    useEffect(() => {
        if (serviceParam) {
            const typeMap: Record<string, string> = {
                'web': 'business',
                'app': 'other',
                'design': 'landing',
                'saas': 'business'
            };
            setFormState(prev => ({
                ...prev,
                websiteType: typeMap[serviceParam] || 'business'
            }));
        }
    }, [serviceParam]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert form state to an email
        const subject = encodeURIComponent(`Project Inquiry: ${formState.websiteType}`);
        const body = encodeURIComponent(`Name: ${formState.name}
Email: ${formState.email}
Company: ${formState.company}
Project Type: ${formState.websiteType}

Message:
${formState.message}`);

        // Trigger default mail client
        window.location.href = `mailto:contactme@buildstack.live?subject=${subject}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <main className="bg-black text-white min-h-screen pt-24 pb-12 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 opacity-[0.03] rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left - Content */}
                    <div className="pt-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in glass">
                            <MessageSquare size={14} className="text-[var(--accent)]" />
                            <span className="text-xs font-bold tracking-widest uppercase">Get in touch</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter animate-fade-in stagger-1 leading-[0.9]">
                            Let&apos;s build <br />
                            <span className="text-[var(--accent)]">something great.</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 leading-relaxed animate-fade-in stagger-2">
                            Tell us about your project. We&apos;ll review your requirements and get back to you within 24 hours.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 animate-fade-in stagger-3">
                            {[
                                { icon: Mail, title: 'Email', value: 'contactme@buildstack.live', href: 'mailto:contactme@buildstack.live' },
                                { icon: Phone, title: 'WhatsApp', value: '+91 79053 88194', href: 'https://wa.me/917905388194' },
                                { icon: MapPin, title: 'Location', value: 'Remote — Working globally', href: null }
                            ].map((item) => (
                                <div key={item.title} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/10 transition-all">
                                        <item.icon size={24} className="text-[var(--accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-0.5 text-white">{item.title}</h3>
                                        {item.href ? (
                                            <a href={item.href} className="text-slate-400 group-hover:text-[var(--accent)] transition-colors">{item.value}</a>
                                        ) : (
                                            <p className="text-slate-400">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Response */}
                        <div className="mt-12 p-8 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-3xl animate-fade-in stagger-4">
                            <p className="text-[var(--accent)] font-bold flex items-center gap-2 mb-2">
                                <Sparkles size={16} />
                                Prefer instant messaging?
                            </p>
                            <p className="text-sm text-slate-400">
                                Send us a WhatsApp message for faster responses. We typically reply within 2 hours during business hours.
                            </p>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="animate-fade-in stagger-2 delay-200">
                        <div className="card p-8 md:p-10 relative overflow-hidden backdrop-blur-xl bg-white/[0.02] border border-white/10 shadow-2xl rounded-3xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 block ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 block ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all"
                                        placeholder="john@company.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 block ml-1">Company / Business</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formState.company}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all"
                                        placeholder="Acme Inc."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="websiteType" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 block ml-1">Project Type</label>
                                    <div className="relative">
                                        <select
                                            id="websiteType"
                                            name="websiteType"
                                            value={formState.websiteType}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all appearance-none"
                                            required
                                        >
                                            <option value="" className="bg-black text-slate-500">Select a project type</option>
                                            <option value="business" className="bg-black text-white">Business Website</option>
                                            <option value="portfolio" className="bg-black text-white">Portfolio Website</option>
                                            <option value="landing" className="bg-black text-white">Landing Page</option>
                                            <option value="ecommerce" className="bg-black text-white">E-commerce</option>
                                            <option value="other" className="bg-black text-white">Something Else</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            <ArrowRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 block ml-1">Project Details</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all min-h-[150px]"
                                        rows={5}
                                        placeholder="Tell us about your goals, features you need, and any reference sites you like..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-full py-5 text-lg font-black tracking-wide shadow-[0_0_20px_rgba(190,242,100,0.1)] hover:shadow-[0_0_40px_rgba(190,242,100,0.3)] flex items-center justify-center gap-2"
                                >
                                    Open Default Mail Client
                                    <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="bg-black min-h-screen pt-24 pb-12" />}>
            <Navigation />
            <ContactContent />
            <Footer />
        </Suspense>
    );
}
