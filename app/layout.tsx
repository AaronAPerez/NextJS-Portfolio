import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/utils";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { WebVitals } from "./web-vitals";
import LayoutProvider from "@/lib/providers/LayoutProvider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});


export const metadata: Metadata = {
  title: "Aaron A Perez Portfolio",
  description: "Portfolio showcasing SaaS tools, projects, and design work.",
  metadataBase: new URL("https://www.aaronaperez.dev"), // <-- FIX
  openGraph: {
    title: "Aaron A Perez Portfolio",
    description: "Explore projects and tools.",
    url: "https://www.aaronaperez.dev",
    siteName: "Aaron A Perez",
    images: [
      {
        url: "/og-image.png", // relative path resolves against metadataBase
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron A Perez Portfolio",
    description: "Explore projects and tools.",
    images: ["/og-image.png"],
  },
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.variable}
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:ring-2 ring-blue-500"
        >
          Skip to main content
        </a>
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider />
            <header role="banner">
              {/* nav */}
            </header>
            <LayoutProvider>
          
              <main>{children}</main>
              <WebVitals />
              <Analytics />

            
            </LayoutProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

