/**
 * Root Layout
 *
 * The top-level layout component that wraps all pages.
 * Handles:
 * - Font loading (Inter)
 * - SEO metadata and structured data
 * - Provider hierarchy (Query, Theme, Toast)
 * - Analytics and Web Vitals
 *
 * Note: Skip link and main element are handled by LayoutProvider
 * to avoid duplication and maintain single source of truth.
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from '@vercel/analytics/react';
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/utils";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { WebVitals } from "./web-vitals";
import LayoutProvider from "@/lib/providers/LayoutProvider";
import './globals.css';

// Font configuration with performance optimizations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

// SEO metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Aaron A Perez | Full Stack Developer",
    template: "%s | Aaron A Perez"
  },
  description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Azure. View my portfolio of web applications, business solutions, and technical projects.",
  metadataBase: new URL("https://www.aaronaperez.dev"),
  keywords: [
    // Role terms
    "Full Stack Developer",
    "Full Stack Engineer",
    "Software Engineer",
    "Software Developer",
    "Web Developer",
    "Frontend Developer",
    "Front End Developer",
    "Backend Developer",
    "Back End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    // Core stack (matches the tech actually used across live projects)
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    // Backend, data & APIs
    "PostgreSQL",
    "Supabase",
    "Neon Postgres",
    "Prisma ORM",
    "MySQL",
    "C#",
    ".NET",
    "ASP.NET",
    "NestJS",
    "REST API",
    "Socket.IO",
    // Cloud & tooling
    "Microsoft Azure",
    "Vercel",
    "Docker",
    "Google Cloud",
    "Git",
    // SEO & delivery
    "SEO Optimization",
    "Web Accessibility",
    "WCAG",
    "Web Performance",
    "Core Web Vitals",
    "Responsive Web Design",
    // Location & hiring intent
    "Stockton CA Developer",
    "Remote Software Engineer",
    "Web Development Portfolio",
    "Portfolio",
    "Aaron Perez",
    "Aaron A Perez"
  ],
  authors: [{ name: "Aaron A Perez", url: "https://www.aaronaperez.dev" }],
  creator: "Aaron A Perez",
  openGraph: {
    title: "Aaron A Perez | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Azure. Explore my portfolio of projects and technical solutions.",
    url: "https://www.aaronaperez.dev",
    siteName: "Aaron A Perez Portfolio",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Aaron A Perez - Full Stack Developer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron A Perez | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Azure.",
    images: ["/images/og-image.webp"],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Structured data for SEO */}
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

      <body className={inter.className} suppressHydrationWarning>
        {/* Provider hierarchy - order matters for context access */}
        <QueryProvider>
          <ThemeProvider>
            {/* Toast notifications - available app-wide */}
            <ToastProvider />

            {/* Layout wrapper handles header/footer/main structure */}
            <MotionProvider>
              <LayoutProvider>
                {children}
              </LayoutProvider>
            </MotionProvider>

            {/* Performance monitoring */}
            <WebVitals />

            {/* Vercel Analytics */}
            <Analytics />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
