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
    title: "Buildstack — Semiconductor EDA Automation Lab",
    description:
      "Buildstack builds agentic EDA tools for the semiconductor industry. AgentIC converts design intent into DRC-clean GDSII with autonomous error repair.",
    openGraph: {
      title: "Buildstack EDA Lab",
      description: "Intent → Silicon. Autonomous.",
      url: "https://buildstack.live",
      siteName: "Buildstack",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Buildstack — Semiconductor EDA Automation Lab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buildstack — Semiconductor EDA Automation Lab",
      description: "Buildstack builds agentic EDA tools for the semiconductor industry. AgentIC converts design intent into DRC-clean GDSII with autonomous error repair.",
      images: ["/og-image.png"],
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
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
