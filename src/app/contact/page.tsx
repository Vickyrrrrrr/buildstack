'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, ArrowRight, Lock, Sparkles, MessageSquare } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ContactContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading, signInWithGoogle } = useAuth();
    const serviceParam = searchParams.get('service');

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        websiteType: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Pre-fill email/name if logged in
    useEffect(() => {
        if (user) {
            setFormState(prev => ({
                ...prev,
                name: user.displayName || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            handleLogin();
            return;
        }

        setIsSubmitting(true);

        try {
            // Save project request to Firestore
            await addDoc(collection(db, "buildstack_projects"), {
                clientId: user.uid,
                name: `${formState.websiteType.charAt(0).toUpperCase() + formState.websiteType.slice(1)} Project`,
                email: formState.email,
                company: formState.company,
                websiteType: formState.websiteType,
                message: formState.message,
                status: 'pending',
                progress: 0,
                currentStage: 'Requirements Received',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting project request:", error);
            alert("There was an error submitting your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Login failed:', error);
        }
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
                            {/* Protected Overlay if not logged in AND service param is present */}
                            {!user && !loading && serviceParam && (
                                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                                        <Lock size={32} className="text-[var(--accent)]" />
                                    </div>
                                    <h2 className="text-3xl font-black mb-4 tracking-tight">Login Required</h2>
                                    <p className="text-slate-400 mb-10 max-w-sm text-lg">
                                        Please sign in to start your <span className="text-white font-bold">{serviceParam}</span> project request.
                                    </p>
                                    <div className="flex flex-col gap-4 w-full max-w-xs">
                                        <button onClick={handleLogin} className="btn-primary w-full py-4 text-lg shadow-[0_0_30px_rgba(190,242,100,0.15)]">
                                            Sign In with Google
                                        </button>
                                        <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-white transition-colors py-2">
                                            Use Email Address
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {isSubmitted ? (
                                <div className="text-center py-20">
                                    <div className="w-24 h-24 mx-auto bg-[var(--success)]/10 rounded-full flex items-center justify-center mb-8 border border-[var(--success)]/20 px-8">
                                        <Send size={40} className="text-[var(--success)]" />
                                    </div>
                                    <h2 className="text-4xl font-black mb-4 tracking-tight">Message Sent!</h2>
                                    <p className="text-slate-400 mb-10 text-lg max-w-md mx-auto">
                                        Thank you for reaching out. We&apos;ll review your requirements and get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormState({
                                                name: user?.displayName || '',
                                                email: user?.email || '',
                                                company: '',
                                                websiteType: '',
                                                message: '',
                                            });
                                        }}
                                        className="btn border border-white/20 hover:bg-white text-white hover:text-black px-8 py-3 rounded-full font-bold transition-all"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
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
                                        disabled={isSubmitting || (!user && !loading && !!serviceParam)}
                                        className="btn btn-primary btn-lg w-full py-5 text-lg font-black tracking-wide shadow-[0_0_20px_rgba(190,242,100,0.1)] hover:shadow-[0_0_40px_rgba(190,242,100,0.3)]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
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
            <Header />
            <ContactContent />
            <Footer />
        </Suspense>
    );
}

