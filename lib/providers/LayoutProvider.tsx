'use client';

import { useMemo } from 'react';
import { Footer, Header } from '@/components/layout';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import {
  Home,
  User,
  FolderKanban,
  Code2,
  Briefcase,
  Mail
} from 'lucide-react';

// Map icons to nav items
const NAV_ICONS: Record<string, React.ReactNode> = {
  '/': <Home className="w-4 h-4" />,
  '#about': <User className="w-4 h-4" />,
  '#projects': <FolderKanban className="w-4 h-4" />,
  '#skills': <Code2 className="w-4 h-4" />,
  '#experience': <Briefcase className="w-4 h-4" />,
  '#contact': <Mail className="w-4 h-4" />,
};

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();

  // Transform NAV_LINKS to FloatingNavbar format
  const floatingNavItems = useMemo(() =>
    NAV_LINKS.filter(link => link.href.startsWith('#')).map(link => ({
      name: link.label,
      link: link.href,
      icon: NAV_ICONS[link.href]
    })),
    []
  );

  // Check if we're in the admin area or on a login page
  const isAdminRoute = pathname?.startsWith('/admin') || false;
  const isLoginPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/reset-password';
  const hideNavigation = isAdminRoute || isLoginPage;

  if (hideNavigation) {
    // Admin Layout - No public navigation components
    return <>{children}</>;
  }

  // Public Layout - Full navigation and footer
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4
                   bg-gold-400 text-white px-4 py-2 rounded-lg z-60"
      >
        Skip to main content
      </a>

      {/* Fixed Header - always visible at top */}
      <Header />



      {/* Main content with proper constraints */}
      <main
        id="main-content"
        className="grow w-full max-w-full overflow-x-hidden md:mt-4"
      >
        <div className="w-full max-w-full">
          {children}
        </div>
      </main>

      {/* Footer with width constraints */}
      <Footer />
    </div>
  );
}
