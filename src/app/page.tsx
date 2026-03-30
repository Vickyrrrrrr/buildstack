import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";

import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AgentICCard from "@/components/Products/AgentICCard";
import FutureCards from "@/components/Products/FutureCards";
import RepairLoop from "@/components/RepairLoop";
import HowItWorks from "@/components/HowItWorks";
import Technology from "@/components/Technology";
import LaunchCTA from "@/components/LaunchCTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <LenisProvider>
      <div className="page-shell">

        <Navigation />

        <main>
          <Hero />
          <StatsBar />

          <section id="products" className="section-shell">
            <Reveal className="container space-y-10">
              <div className="max-w-3xl space-y-4">
                <p className="eyebrow">Products</p>
                <h2 className="section-title">What We&apos;re Building</h2>
                <p className="body-copy text-lg">
                  Each tool in the Buildstack ecosystem solves one hard problem in chip
                  design automation.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-3">
                  <AgentICCard />
                </div>
                <FutureCards />
              </div>
            </Reveal>
          </section>

          <RepairLoop />
          <HowItWorks />
          <Technology />
          <LaunchCTA />
        </main>

        <Footer />
      </div>
    </LenisProvider>
  );
}
