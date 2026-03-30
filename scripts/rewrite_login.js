/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const content = `
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Activity, Lock, Terminal, ShieldCheck } from 'lucide-react';
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
            {/* Left Side - Creative Graphic (Hidden on mobile) */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-gradient-to-br from-[#050505] via-[#0c0c11] to-[#121217] border-r border-white/5 overflow-hidden">
                {/* Animated Background Grids */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />

                {/* Logo */}
                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="relative w-10 h-10 transition-transform group-hover:rotate-6">
                            <Image
                                src="/logo.png"
                                alt="Buildstack Logo"
                                fill
                                className="object-contain grayscale contrast-125 invert"
                            />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter">Buildstack</span>
                    </Link>
                </div>

                {/* Secure Auth Visualization */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full relative"
                    >
                        {/* Outer Glow Ring */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-white/5 rounded-full border-dashed"
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-5 border border-white/10 rounded-full border-dotted opacity-50"
                        />
                        
                        {/* Core Data Card */}
                        <div className="relative bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl overflow-hidden mt-10">
                            {/* Inner Header */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <Lock size={16} className="text-white/60" />
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">Secure Enclave</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>

                            {/* Node Connectors */}
                            <div className="space-y-6">
                                {[
                                    { label: 'AgentIC System Core', icon: Activity, delay: 0.1 },
                                    { label: 'Encrypted Handshake', icon: ShieldCheck, delay: 0.3 },
                                    { label: 'Establishing Link', icon: Terminal, delay: 0.5 }
                                ].map((node, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + node.delay, duration: 0.8 }}
                                        className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-lg border border-white/[0.03]"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#121217] flex items-center justify-center border border-white/10">
                                            <node.icon size={16} className="text-white" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-white">{node.label}</span>
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ delay: 1 + node.delay, duration: 1.5, ease: "easeInOut" }}
                                                className="h-[2px] bg-gradient-to-r from-white/40 to-transparent"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Title text under UI */}
                        <div className="mt-12 text-center">
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="text-3xl font-light tracking-tight mb-3"
                            >
                                Enter the <span className="font-serif italic font-medium">Terminal.</span>
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="text-[#8E8E93] text-sm font-light max-w-sm mx-auto leading-relaxed"
                            >
                                Authenticate to access your centralized hardware methodology and agent control center.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex gap-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-auto pt-8">
                    <span>© 2026 Buildstack Lab</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative bg-[#050505]">
                <div className="w-full max-w-md animate-fade-in delay-100">
                    <div className="text-center lg:text-left mb-10">
                        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3">Welcome Back</h1>
                        <p className="text-slate-500 text-sm">Enter your details to access your workspace.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Google Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-white text-black p-4 rounded-sm font-medium text-sm hover:scale-[1.01] transition-transform shadow-lg disabled:opacity-70 active:scale-95"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-1 h-px bg-white/5" />
                            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">or email logic</span>
                            <div className="flex-1 h-px bg-white/5" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-sm text-xs font-mono flex items-center gap-2 animate-shake">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">Identity</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0A0A0A] border border-white/10 p-4 rounded-sm focus:border-white/30 focus:bg-[#0c0c0c] outline-none transition-colors text-white text-sm font-light placeholder:text-slate-700"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 ml-1">Key</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-white/10 p-4 rounded-sm focus:border-white/30 focus:bg-[#0c0c0c] outline-none transition-colors text-white text-sm font-light placeholder:text-slate-700 pr-12"
                                        placeholder="Enter your security key"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary !rounded-sm !py-4 text-xs font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500 disabled:opacity-50 disabled:hover:shadow-none bg-white text-black"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Authenticating...
                                    </span>
                                ) : (
                                    "Initialize Session"
                                )}
                            </button>
                        </form>

                        <p className="text-center text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-8">
                            Unregistered?{' '}
                            <Link href="/contact" className="text-white hover:text-slate-300 transition-colors underline decoration-white/20 underline-offset-4">
                                Request Access
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

`;

fs.writeFileSync('src/app/login/page.tsx', content, 'utf8');
console.log('File written successfully');
