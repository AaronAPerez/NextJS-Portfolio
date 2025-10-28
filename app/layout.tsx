import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AIChat } from "@/components/AIAssistant/AIChat";

// Styles
import './globals.css';
import FloatingNavbar from "@/components/layout/FloatingNavbar";
import { Analytics } from '@vercel/analytics/react';

// Optimized font loading
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});


// Metadata with enhanced SEO
export const metadata: Metadata = {
  title: 'Aaron A. Perez - FullStack Developer',
  description: 'Portfolio of Aaron A. Perez, showcasing full-stack development projects and skills in React, Next.js, Node.js, TypeScript, AWS, and modern web technologies.',
  keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Portfolio'],
  authors: [{ name: 'Aaron A. Perez' }],
  creator: 'Aaron A. Perez',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aaronaperez.dev',
    title: 'Aaron A. Perez - FullStack Developer',
    description: 'Portfolio showcasing full-stack development projects and skills',
    siteName: 'Aaron A. Perez Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaron A. Perez - FullStack Developer',
    description: 'Portfolio showcasing full-stack development projects and skills',
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

// Navigation configuration
interface NavItem {
  name: string;
  link: string;
}

const navItems: NavItem[] = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
          suppressHydrationWarning
      className="scroll-smooth"
      >

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="facebook-domain-verification" content="6iqzzcn0b2ao92l7p9ctgxqn2e1s64" />

        {/* Performance optimizations - Vercel Analytics */}
        {/* <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" /> */}

        {/* Preload critical assets */}
        <link
          rel="preload"
          as="image"
          href="/images/profile/headshot.png"
          fetchPriority="high"
          type="image/png"
        />
      </head>

      <body className={cn(
        inter.variable,
        "min-h-screen bg-black",
        "text-gray-100",
        "font-sans"
      )}>

        {/* Skip to content - on top for better accessibility */}
        <SkipToContent />

        {/* Header with Navigation */}
        <header role="banner">
          <nav role="navigation" aria-label="Main navigation">
            <FloatingNavbar navItems={navItems} />
          </nav>
        </header>

        {/* AI Assistant */}
        <AIChat />

        {/* Main Content */}
        <main id="main-content" role="main" tabIndex={-1}>
          {/* Content sections wrapper */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
            <Analytics />
          </div>
        </main>



      </body>
    </html>
  );
}


// Skip to content component for accessibility
export const SkipToContent = () => (
  <a
    href="#main-content"
    className={cn(
      "sr-only focus:not-sr-only",
      "fixed top-4 left-4 z-[100]",
      "px-4 py-2 bg-gray-900",
      "border border-gray-700",
      "rounded-md shadow-sm",
      "focus:outline-none focus:ring-2 focus:ring-blue-500"
    )}
  >
    Skip to content
  </a>
);