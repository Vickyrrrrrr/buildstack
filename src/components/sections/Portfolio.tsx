'use client';

import { usePortfolio } from '@/lib/firestore-hooks';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Portfolio() {
    const { items, loading } = usePortfolio();

    return (
        <section id="portfolio" className="section-premium bg-[#050505] border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[150px] pointer-events-none" />

            {loading ? (
                <div className="container text-center py-32">
                    <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            ) : items.length === 0 ? (
                <div className="container text-center py-20">
                    <p className="text-slate-500 font-medium">Projects are loading or would appear here once added in the Admin panel.</p>
                </div>
            ) : (
                <div className="container relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl">
                            <span className="text-[var(--accent)] font-black text-sm uppercase tracking-[0.3em] mb-4 block">Selected Works</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                                Featured <br /> <span className="text-slate-500 italic">Deliveries.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg max-w-xs font-medium border-l-2 border-[var(--accent)] pl-6">
                            Explore our latest high-performance web applications and digital products.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {items.map((item) => (
                            <div key={item.id} className="group relative">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/5">
                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />

                                    {/* Image */}
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    )}

                                    {/* Category Tag */}
                                    <div className="absolute top-8 left-8 z-20">
                                        <span className="px-5 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-white">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Link Button */}
                                    <div className="absolute bottom-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-16 h-16 bg-[var(--accent)] rounded-2xl flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform"
                                        >
                                            <ArrowUpRight size={32} />
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-8 px-4 flex justify-between items-start gap-6">
                                    <div>
                                        <h3 className="text-3xl font-black mb-3 group-hover:text-[var(--accent)] transition-colors">{item.name}</h3>
                                        <p className="text-slate-400 text-lg leading-relaxed max-w-md">{item.description}</p>
                                    </div>
                                    <div className="pt-2">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                                        >
                                            Live Demo <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
