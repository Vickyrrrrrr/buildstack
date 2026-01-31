'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden text-white">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 text-center px-6">
                <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-[#111] select-none">
                    404
                </h1>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Page not found</h2>
                    <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto mb-8">
                        The page you are looking for doesn't exist or has been moved.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/" className="btn-primary flex items-center gap-2 px-8">
                            <Home size={18} />
                            Back Home
                        </Link>
                        <button onClick={() => window.history.back()} className="btn-outline flex items-center gap-2 px-8 py-3 rounded-full font-bold hover:text-white transition-colors">
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
