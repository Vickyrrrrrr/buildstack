import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Layout, Palette, Code2, Rocket, CheckCircle2, Package, Sparkles } from 'lucide-react';
import Portfolio from '@/components/sections/Portfolio';
import JsonLd from '@/components/seo/JsonLd';

export default function HomePage() {
  return (
    <>
      <Header />
      <JsonLd />
      <main className="bg-black text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-[#0A0A0A]">
          {/* Subtle background glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-soft)] rounded-full blur-[150px] opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--accent-soft)] rounded-full blur-[150px] opacity-10 animate-pulse-slow delay-1000" />

          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-10 animate-fade-in glass hover:bg-white/10 transition-colors cursor-default">
                <Sparkles size={16} className="text-[var(--accent)]" />
                <span className="text-sm font-bold tracking-tight text-white uppercase">Digital Excellence</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 animate-fade-in stagger-1 leading-[0.9] text-white">
                Bringing Your
                <br />
                Dream Into <span className="text-[var(--accent)]">Reality</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in stagger-2 leading-relaxed font-medium">
                We create high-performance websites for visionary brands. Submit requests, track progress live, and receive perfection.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in stagger-3">
                <Link href="/contact?service=web" className="btn-primary flex items-center gap-3 px-10 py-5 text-lg group shadow-[0_0_20px_rgba(190,242,100,0.2)] hover:shadow-[0_0_30px_rgba(190,242,100,0.4)]">
                  Start Project
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/how-it-works" className="btn-outline flex items-center gap-3 px-10 py-5 text-lg rounded-full font-bold bg-white/5 hover:bg-white/10 backdrop-blur-md border-white/10 hover:border-white/20">
                  How it Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-12 bg-[#050505] border-y border-white/5 overflow-hidden">
          <div className="container">
            <p className="text-center text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">Trusted by next-gen companies</p>
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-24 py-4">
                {['NEXUS', 'KINETIC', 'VELOCITY', 'QUANTUM', 'ECHO', 'PULSE', 'ORBIT', 'NEXUS', 'KINETIC', 'VELOCITY'].map((brand, i) => (
                  <span key={i} className="text-3xl md:text-4xl font-black text-white/20 italic tracking-tighter hover:text-white/40 transition-colors cursor-default select-none">
                    {brand}
                  </span>
                ))}
              </div>
              <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-24 py-4">
                {['NEXUS', 'KINETIC', 'VELOCITY', 'QUANTUM', 'ECHO', 'PULSE', 'ORBIT', 'NEXUS', 'KINETIC', 'VELOCITY'].map((brand, i) => (
                  <span key={i} className="text-3xl md:text-4xl font-black text-white/20 italic tracking-tighter hover:text-white/40 transition-colors cursor-default select-none">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-premium bg-[#0A0A0A]">
          <div className="container">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Crafted for Impact</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">We don't just build websites; we build digital assets that drive growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Business Website */}
              <div className="card group cursor-pointer overflow-hidden bg-[#111] hover:-translate-y-2 transition-transform duration-300">
                <div className="h-64 bg-[#151515] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                  <Layout size={48} className="absolute bottom-6 left-6 text-[var(--accent)] z-20" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent)] transition-colors">Business Website</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">Multi-page website for established businesses. Showcase your services, team, and build trust with a professional presence.</p>
                  <Link href="/contact?service=web" className="text-white font-bold flex items-center gap-2 text-sm group-hover:translate-x-2 transition-transform">
                    View Details <ArrowRight size={16} className="text-[var(--accent)]" />
                  </Link>
                </div>
              </div>

              {/* Portfolio */}
              <div className="card group cursor-pointer overflow-hidden bg-[#111] hover:-translate-y-2 transition-transform duration-300">
                <div className="h-64 bg-[#151515] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                  <Palette size={48} className="absolute bottom-6 left-6 text-[var(--accent)] z-20" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent)] transition-colors">Portfolio Website</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">Showcase your creative work beautifully. Perfect for designers, photographers, and artists who need to stand out.</p>
                  <Link href="/contact?service=design" className="text-white font-bold flex items-center gap-2 text-sm group-hover:translate-x-2 transition-transform">
                    View Details <ArrowRight size={16} className="text-[var(--accent)]" />
                  </Link>
                </div>
              </div>

              {/* Landing Page */}
              <div className="card group cursor-pointer overflow-hidden bg-[#111] hover:-translate-y-2 transition-transform duration-300">
                <div className="h-64 bg-[#151515] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                  <Rocket size={48} className="absolute bottom-6 left-6 text-[var(--accent)] z-20" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--accent)] transition-colors">Landing Page</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">High-converting single page for campaigns, product launches, or lead generation. Optimized, fast, and effective.</p>
                  <Link href="/contact?service=design" className="text-white font-bold flex items-center gap-2 text-sm group-hover:translate-x-2 transition-transform">
                    View Details <ArrowRight size={16} className="text-[var(--accent)]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Portfolio />

        {/* How It Works Section */}
        <section className="section-premium bg-[#050505] border-y border-white/5">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-[var(--accent)] font-black text-sm uppercase tracking-widest mb-4 block">Process</span>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                  Design & Dev <br /> at <span className="text-slate-500">Scale.</span>
                </h2>
                <p className="text-xl text-slate-400 mb-10 max-w-md">No more expensive agencies or unreliable freelancers. Get a dedicated design team at a fraction of the cost.</p>
                <Link href="/how-it-works" className="btn-primary inline-flex gap-2 items-center">
                  See Functionality <ArrowRight size={18} />
                </Link>
              </div>
              <div className="space-y-8">
                {[
                  { id: '01', title: 'Subscribe & Request', desc: 'Submit as many design tasks as you need via your dashboard.' },
                  { id: '02', title: 'We Build & Deliver', desc: 'Our team works magic. Receive your initial delivery within 2-3 days.' },
                  { id: '03', title: 'Refine & Launch', desc: 'We iterate until you are 100% happy, then we help you launch.' },
                ].map((step, i) => (
                  <div key={step.id} className="flex gap-8 group p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-black transition-all shadow-lg">
                      <span className="font-black text-xl">{step.id}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{step.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="section-premium">
          <div className="container">
            <div className="card bg-[var(--accent)] p-12 md:p-24 text-center rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-8xl font-black text-black mb-8 tracking-tighter leading-none">
                  Ready to <br /> build?
                </h2>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12">
                  {['Web Design', 'SaaS', 'Webflow', 'React', 'Branding', 'Development'].map(skill => (
                    <span key={skill} className="px-5 py-2 bg-black/10 backdrop-blur-md text-black border border-black/5 rounded-full font-bold text-sm uppercase">{skill}</span>
                  ))}
                </div>
                <Link href="/contact?service=web" className="inline-block bg-black text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
