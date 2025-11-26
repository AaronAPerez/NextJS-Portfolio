import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Aaron A. Perez | Full Stack Developer",
  description: "Full Stack Developer specializing in React, TypeScript, Next.js, and modern web technologies. Building accessible, SEO-optimized web applications.",
  keywords: [
    "React Developer",
    "TypeScript",
    "Next.js",
    "Full Stack Developer",
    "Web Developer",
    "Stockton CA",
  ],
  authors: [{ name: "Aaron A. Perez" }],
  creator: "Aaron A. Perez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aaronaperez.dev",
    siteName: "Aaron A. Perez Portfolio",
    title: "Aaron A. Perez | Full Stack Developer",
    description: "Full Stack Developer specializing in React, TypeScript, and Next.js",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aaron A. Perez - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron A. Perez | Full Stack Developer",
    description: "Building modern web applications with React, TypeScript, and Next.js",
    images: ["/images/og-image.jpg"],
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema()),
          }}
        />
      </head>

      {/* Skip to content - on top for better accessibility */}
     


      <body className={inter.className} suppressHydrationWarning>
         <SkipToContent />
        <ThemeProvider>
          <ToastProvider />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1" role="main">
              {children}
              <Analytics />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

