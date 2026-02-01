import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://buildstack.live'),
  title: {
    default: "Buildstack | We Build Websites. You Track Progress.",
    template: "%s | Buildstack"
  },
  description: "Professional website development with transparent progress tracking. Submit your requirements, track delivery like a parcel, and receive your completed website.",
  keywords: ["website development", "web design", "business website", "portfolio website", "landing page", "next.js", "react", "tailwindcss"],
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
    title: "Buildstack | We Build Websites. You Track Progress.",
    description: "Professional website development with transparent progress tracking.",
    url: 'https://buildstack.live',
    siteName: 'Buildstack',
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Buildstack Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Buildstack | We Build Websites. You Track Progress.",
    description: "Professional website development with transparent progress tracking.",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
