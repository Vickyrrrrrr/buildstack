import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Layout, Palette, Rocket, CheckCircle2, ArrowRight, Globe, Smartphone, Search, Zap, Sparkles } from 'lucide-react';

const services = [
    {
        id: 'business',
        icon: Layout,
        title: 'Business Website',
        description: 'Comprehensive multi-page website for established businesses. Build trust, showcase services, and connect with customers.',
        features: [
            '5-7 custom designed pages',
            'Responsive mobile design',
            'Contact & inquiry forms',
            'SEO foundation setup',
            'Google Maps integration',
            'Social media links',
        ],
        ideal: 'Local businesses, agencies, professional services',
    },
    {
        id: 'portfolio',
        icon: Palette,
        title: 'Portfolio Website',
        description: 'Showcase your creative work with stunning visuals. Perfect for designers, photographers, artists, and freelancers.',
        features: [
            'Visual project gallery',
            'Smooth transitions & animations',
            'About & bio section',
            'Contact information',
            'Lightbox image viewing',
            'Filterable categories',
        ],
        ideal: 'Designers, photographers, artists, freelancers',
    },
    {
        id: 'landing',
        icon: Rocket,
        title: 'Landing Page',
        description: 'High-converting single page designed to capture leads and drive action. Perfect for campaigns and launches.',
        features: [
            'Single focused page',
            'Lead capture form',
            'Compelling copy structure',
            'Fast loading speed',
            'A/B testing ready',
            'Analytics integration',
        ],
        ideal: 'Startups, product launches, marketing campaigns',
    },
];

const features = [
    {
        icon: Globe,
        title: 'Fully Responsive',
        description: 'Every website looks perfect on all devices, from mobile phones to desktop screens.',
    },
    {
        icon: Search,
        title: 'SEO Optimized',
        description: 'Built with search engines in mind so your customers can find you online.',
    },
    {
        icon: Zap,
        title: 'Fast Performance',
        description: 'Optimized for speed to keep visitors engaged and improve search rankings.',
    },
    {
        icon: Smartphone,
        title: 'Mobile First',
        description: 'Designed for mobile devices first, ensuring the best experience for most users.',
    },
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className="bg-black text-white min-h-screen">
                {/* Hero */}
                <section className="pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 opacity-[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                    <div className="container relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in glass">
                                <Sparkles size={14} className="text-[var(--accent)]" />
                                <span className="text-xs font-bold tracking-widest uppercase">World Class Engineering</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter animate-fade-in stagger-1 leading-[0.9]">
                                Crafted for <span className="text-[var(--accent)]">Impact.</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in stagger-2 leading-relaxed">
                                Professional websites built with care. Each project is crafted to meet your specific needs and delivered with complete transparency.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="pb-24">
                    <div className="container">
                        <div className="space-y-12">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    id={service.id}
                                    className="card p-8 md:p-12 scroll-mt-32 group hover:border-[var(--accent-border)] transition-all duration-500"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        {/* Left */}
                                        <div className="order-2 lg:order-1">
                                            <div className="w-16 h-16 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500">
                                                <service.icon size={32} className="text-[var(--accent)] group-hover:text-black transition-colors duration-500" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{service.title}</h2>
                                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                                {service.description}
                                            </p>

                                            <div className="space-y-6">
                                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">What's Included</h3>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {service.features.map((feature) => (
                                                        <li key={feature} className="flex items-start gap-3 text-slate-300">
                                                            <CheckCircle2 size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
                                                            <span className="font-medium">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mt-10 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-1">Ideal For</p>
                                                    <p className="text-white font-medium">{service.ideal}</p>
                                                </div>
                                                <Link href={`/contact?service=${service.id === 'landing' ? 'design' : 'web'}`} className="btn-primary px-8 py-3 w-full sm:w-auto text-center">
                                                    Start Project
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Right - Visual */}
                                        <div className="order-1 lg:order-2 h-64 lg:h-full min-h-[300px] bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group-hover:border-[var(--accent)]/20 transition-colors">
                                            <div className={`absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-[200px] font-black opacity-[0.03] select-none scale-150 group-hover:scale-110 transition-transform duration-1000">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Websites Include */}
                <section className="py-24 border-t border-white/5 bg-[#050505]">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Standard Excellence</h2>
                            <p className="text-slate-400 text-lg">Every project includes these foundational pillars.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature) => (
                                <div key={feature.title} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors text-center group">
                                    <div className="w-14 h-14 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-gradient-to-br from-[var(--accent)]/20 to-transparent">
                                        <feature.icon size={24} className="text-[var(--accent)]" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container relative z-10">
                        <div className="card bg-[var(--accent)] text-black p-12 md:p-24 text-center rounded-[3rem] overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter relative z-10">
                                Ready to launch?
                            </h2>
                            <p className="font-bold text-xl md:text-2xl opacity-80 mb-10 max-w-2xl mx-auto relative z-10">
                                Stop dreaming and start building. Your digital future begins with a single click.
                            </p>
                            <Link href="/contact" className="inline-block bg-black text-white px-12 py-5 rounded-full font-black text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 relative z-10">
                                Get Started
                                <ArrowRight size={20} className="inline ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
