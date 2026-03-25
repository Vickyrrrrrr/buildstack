import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://buildstack.live'),
  title: {
    default: "Buildstack | Semiconductor Automation Lab",
    template: "%s | Buildstack"
  },
  description: "Buildstack is a Semiconductor Automation Lab. Our flagship product AgentIC converts natural language into GDSII chip layouts using OpenLane and Sky130 PDK. We also build premium digital experiences.",
  keywords: ["semiconductor automation", "VLSI", "GDSII", "AgentIC", "chip design", "OpenLane", "Sky130", "RTL", "EDA", "AI chip design", "website development", "next.js"],
  authors: [{ name: "Buildstack" }],
  creator: "Utkarsh Singh",
  publisher: "Buildstack",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Buildstack | Semiconductor Automation Lab — AgentIC",
    description: "Buildstack automates the silicon frontier. AgentIC converts natural language to GDSII chip layouts. We also build premium digital experiences.",
    url: 'https://buildstack.live',
    siteName: 'Buildstack',
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Buildstack Semiconductor Automation Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Buildstack | Semiconductor Automation Lab",
    description: "AgentIC: Natural language to GDSII chip layouts. Powered by OpenLane & Sky130 PDK.",
    images: ['/logo.png'],
    creator: '@buildstack',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
