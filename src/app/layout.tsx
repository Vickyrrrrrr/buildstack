import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import { SplashScreen } from "@/components/SplashScreen";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://buildstack.live"),
    verification: {
      google: "U_iMXuGTMqG085ffGj7yltV-naajy-P1M5vu86RyCvA",
    },
    title: {
      default: "Buildstack EDA Lab — Semiconductor EDA Automation",
      template: "%s | Buildstack EDA Lab",
    },
    description:
      "Buildstack EDA Lab builds agentic EDA tools for the semiconductor industry. AgentIC converts design intent into DRC-clean GDSII with autonomous error repair.",
    authors: [{ name: "Buildstack EDA Lab", url: "https://buildstack.live" }],
    creator: "Buildstack EDA Lab",
    publisher: "Buildstack EDA Lab",
    category: "Technology",
    icons: {
      icon: [
        { url: "/logo.png", type: "image/png" },
      ],
      apple: [
        { url: "/logo.png", sizes: "180x180", type: "image/png" },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "Buildstack EDA Lab — Semiconductor EDA Automation",
      description: "Intent → Silicon. Autonomous error repair & DRC-clean GDSII generation.",
      url: "https://buildstack.live",
      siteName: "Buildstack EDA Lab",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://www.buildstack.live/og-image.png",
          width: 1200,
          height: 630,
          alt: "Buildstack EDA Lab — Semiconductor EDA Automation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buildstack EDA Lab — Semiconductor EDA Automation",
      description: "Buildstack EDA Lab builds agentic EDA tools for the semiconductor industry. AgentIC converts design intent into DRC-clean GDSII with autonomous error repair.",
      images: ["https://www.buildstack.live/og-image.png"],
    },
    alternates: {
      canonical: "https://buildstack.live",
    },
    keywords: [
      "Buildstack",
      "AgentIC",
      "EDA automation",
      "OpenLane v2",
      "Sky130",
      "GDSII",
      "VLSI pipeline",
      "semiconductor automation",
      "RTL to GDSII",
      "Yosys synthesis",
      "OpenROAD PnR",
      "ASAP7 PDK",
      "GF180MCU PDK",
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-base font-sans text-text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AgentIC",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "macOS, Linux",
              description:
                "AgentIC is an AI-powered VLSI design agent that automates RTL-to-GDSII chip design flows using local EDA tools and PDKs. It bridges large language models with local Electronic Design Automation tools for autonomous silicon design.",
              url: "https://buildstack.live/agentic",
              downloadUrl: "https://buildstack.live/agentic/download",
              publisher: {
                "@type": "Organization",
                name: "Buildstack EDA Lab",
                url: "https://buildstack.live",
                sameAs: ["https://github.com/Vickyrrrrrr/buildstack"],
              },
              featureList: [
                "RTL writing, linting, and auto-repair (Verilog/SystemVerilog)",
                "Synthesis (Yosys, Design Compiler, Genus)",
                "Simulation (Verilator, iverilog, VCS, Xcelium)",
                "Static Timing Analysis (OpenSTA, PrimeTime, Tempus)",
                "Physical Design (OpenROAD, Innovus, ICC2)",
                "Physical Verification / DRC / LVS (Magic, KLayout, Netgen, Calibre)",
                "Analog / Mixed-Signal SPICE flow (ngspice, xschem, Spectre, Eldo)",
                "Interactive Yosys schematics, waveform viewer, PDK catalog",
                "Auto-checkpoint engine with structured EDA log parsing",
                "Design-state ledger and capability graph for grounding",
              ],
              offers: [
                {
                  "@type": "Offer",
                  name: "AgentIC Pro",
                  price: "299",
                  priceCurrency: "INR",
                  url: "https://buildstack.live/agentic/pricing",
                },
              ],
              audience: {
                "@type": "Audience",
                audienceType: "Digital IC Design Engineers, Hardware Prototypers, EDA & CAD Developers",
              },
            }),
          }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
