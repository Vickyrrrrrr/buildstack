import type { Metadata } from "next";
import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Buildstack EDA Lab — Autonomous Semiconductor EDA",
  description: "Buildstack EDA Lab builds agentic EDA tools for the semiconductor industry. Automate design intent into DRC-clean GDSII with AI.",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Buildstack EDA Lab",
    url: "https://buildstack.live",
    logo: "https://buildstack.live/icon.png",
    description: "Buildstack EDA Lab builds agentic EDA tools for the semiconductor industry.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Buildstack EDA Lab",
    alternateName: ["Buildstack Lab", "Buildstack"],
    url: "https://buildstack.live",
  }
];

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
import LiveTerminal from "@/components/LiveTerminal";
import CodeDiffViewer from "@/components/CodeDiffViewer";
import RoutingBackground from "@/components/RoutingBackground";

export default function HomePage() {
  return (
    <LenisProvider>
      <div className="page-shell relative">
        <RoutingBackground />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Navigation />

        <main className="relative z-10">
          <Hero />
          <StatsBar />
          <LiveTerminal />

          <section id="products" className="section-shell">
            <Reveal className="container space-y-10">
              <div className="max-w-3xl space-y-4">
                <p className="eyebrow">Products</p>
                <h2 className="section-title">Meet AgentIC.</h2>
                <p className="body-copy text-lg">
                  We are rethinking electronic design automation from the ground up. Stop jumping between terminal windows and let AI handle the flow orchestration.
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
          <CodeDiffViewer />
          <HowItWorks />
          <Technology />
          <LaunchCTA />
        </main>

        <Footer />
      </div>
    </LenisProvider>
  );
}
