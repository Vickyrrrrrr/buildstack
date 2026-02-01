'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Eye, EyeOff, Star, Check, Quote } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

export default function LoginPage() {
    const router = useRouter();
    const { user, loading, signInWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already logged in
    useEffect(() => {
        if (user && !loading) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with Google');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('Please use Google Sign-In to access your account.');
    };


    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#050505] text-white">
            {/* Left Side - Content/Testimonial (Hidden on mobile) */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#0A0A0A] border-r border-white/5 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[150px] opacity-10 animate-pulse-slow" />

                {/* Logo */}
                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="relative w-10 h-10 transition-transform group-hover:rotate-6">
                            <Image
                                src="/logo.png"
                                alt="Buildstack Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter">Buildstack</span>
                    </Link>
                </div>

                {/* Testimonial */}
                <div className="relative z-10 max-w-lg">
                    <Quote size={48} className="text-[var(--accent)] opacity-50 mb-6" />
                    <h2 className="text-4xl font-black leading-tight mb-8">
                        "Our sales doubled within the first month of launching with Buildstack. It's not just a service—it's a superpower for our brand."
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden border border-white/10">
                            <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="font-bold text-white">Utkarsh Singh</p>
                            <p className="text-sm text-slate-500 font-medium">Founder, Dawakhana</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex gap-6 text-sm font-bold text-slate-600 uppercase tracking-widest">
                    <span>© 2026 Buildstack</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative">
                <div className="w-full max-w-md animate-fade-in delay-100">
                    <div className="text-center lg:text-left mb-10">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">Welcome Back</h1>
                        <p className="text-slate-500 text-lg">Enter your details to access your workspace.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Google Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-white text-black p-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-70"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">or sign in with email</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold flex items-center gap-2 animate-shake">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#111] border border-white/10 p-4 rounded-xl focus:border-[var(--accent)] focus:bg-[#151515] outline-none transition-colors text-white font-medium placeholder:text-slate-700"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#111] border border-white/10 p-4 rounded-xl focus:border-[var(--accent)] focus:bg-[#151515] outline-none transition-colors text-white font-medium placeholder:text-slate-700 pr-12"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary py-4 text-base rounded-xl hover:shadow-[0_0_30px_rgba(190,242,100,0.3)] disabled:opacity-50 disabled:hover:shadow-none"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Verifying...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link href="/contact" className="text-white font-bold hover:text-[var(--accent)] transition-colors">
                                Apply for access
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
