import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { cn } from "@/lib/utils";

// Components
import ThemeSwitcher from "@/components/ThemeSwitcher";
import FilmCountdown from "@/components/FilmCountdown";
import { SocialLinks } from "@/components/layout/SocialLinks";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Styles
import './globals.css';
import { FloatingNav } from "@/components/layout/FloatingNavbar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
        >
          {/* Initial Loading Animation */}
          <FilmCountdown />

          {/* Navigation */}
          <FloatingNav navItems={navItems}
            className="fixed top-4"/>

          {/* Theme Switcher */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeSwitcher />
          </div>

          {/* Scroll To Top Button */}
          <div className="fixed bottom-4 right-4 z-50">
            <ScrollToTop />
          </div>

          {/* Desktop Social Links */}
          <div className={cn(
            "fixed left-4 bottom-4 z-50",
            "hidden md:flex flex-col gap-4",
            "md:left-8 md:bottom-8"
          )}>
            <SocialLinks />
          </div>

          {/* Mobile Social Links */}
          <div className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
            "flex md:hidden flex-row gap-4"
          )}>
            <SocialLinks orientation="horizontal" />
          </div>

          {/* Main Content */}
          <main className="relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
