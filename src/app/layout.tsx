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
  title: "Buildstack | We Build Websites. You Track Progress.",
  description: "Professional website development with transparent progress tracking. Submit your requirements, track delivery like a parcel, and receive your completed website.",
  keywords: ["website development", "web design", "business website", "portfolio website", "landing page"],
  authors: [{ name: "Buildstack" }],
  openGraph: {
    title: "Buildstack | We Build Websites. You Track Progress.",
    description: "Professional website development with transparent progress tracking.",
    type: "website",
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
