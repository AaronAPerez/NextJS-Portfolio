import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"

// Components
import ThemeSwitcher from "@/components/ThemeSwitcher";
import FilmCountdown from "@/components/FilmCountdown";
import { SocialLinks } from "@/components/layout/SocialLinks";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Styles
import './globals.css';
import Footer from "@/components/layout/Footer";
import FloatingNavbar from "@/components/layout/FloatingNavbar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


// Metadata
export const metadata: Metadata = {
  title: 'Aaron A. Perez - FullStack Developer',
  description: 'Portfolio of Aaron A. Perez, showcasing full-stack development projects and skills.',
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
    <html lang="en" suppressHydrationWarning>

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>


      <body className={cn(
        geistSans.variable,
        "min-h-screen bg-white dark:bg-black",
        "text-gray-900 dark:text-gray-100",
        "transition-colors duration-300"
      )}>

        {/* Skip to content - moved to top for better accessibility */}
        <SkipToContent />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {/* Initial Loading Animation */}
          <FilmCountdown />

          {/* Header with Navigation */}
          <header role="banner">
            <nav role="navigation" aria-label="Main navigation">
              <FloatingNavbar navItems={navItems} />
            </nav>
            
            {/* Theme Switcher - positioned differently on mobile and desktop */}
            <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50">
              <ThemeSwitcher />
            </div>
          </header>

          {/* Scroll To Top Button */}
          <div className="fixed bottom-4 right-4 z-50">
            <ScrollToTop />
          </div>

          {/* Main Content */}
          <main id="main-content" role="main" tabIndex={-1}>
            {/* Content sections wrapper */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
              <Analytics />
            </div>
          </main>
          
          {/* Social Links */}
          <div className="fixed left-4 bottom-4 z-40 hidden md:block">
            <SocialLinks orientation="vertical" />
          </div>

          {/* Mobile Social Links */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
            <SocialLinks orientation="horizontal" />
          </div>
          
          {/* Footer */}
          <footer role="contentinfo">
            <Footer />
          </footer>
        </ThemeProvider>
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
      "px-4 py-2 bg-white dark:bg-gray-900",
      "border border-gray-200 dark:border-gray-700",
      "rounded-md shadow-sm",
      "focus:outline-none focus:ring-2 focus:ring-blue-500"
    )}
  >
    Skip to content
  </a>
);