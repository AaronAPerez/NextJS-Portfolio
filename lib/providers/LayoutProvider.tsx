/**
 * LayoutProvider Component
 *
 * Conditionally renders page layout based on route type:
 * - Public routes: Full layout with header, footer, and skip link
 * - Admin routes: Minimal wrapper (admin has its own layout)
 * - Auth routes: Minimal wrapper for login/signup pages
 *
 * This is the single source of truth for the main content structure
 * to avoid duplicate <main> tags and skip links.
 */

'use client';

import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Footer, Header } from '@/components/layout';

interface LayoutProviderProps {
  children: React.ReactNode;
}

/**
 * Determines if the current route should hide navigation
 * @param pathname - Current route pathname
 * @returns boolean indicating if navigation should be hidden
 */
function shouldHideNavigation(pathname: string | null): boolean {
  if (!pathname) return false;

  // Admin routes have their own layout
  if (pathname.startsWith('/admin')) return true;

  // Auth pages don't need full navigation
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  if (authRoutes.includes(pathname)) return true;

  return false;
}

function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();

  // Memoize navigation visibility check
  const hideNavigation = useMemo(
    () => shouldHideNavigation(pathname),
    [pathname]
  );

  // Admin/Auth routes - render children without public layout
  if (hideNavigation) {
    return <>{children}</>;
  }

  // Public routes - full layout with header, main content, and footer
  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full"
      suppressHydrationWarning
    >
      {/* Skip link for keyboard/screen reader users - WCAG 2.1 requirement */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          focus:absolute focus:top-4 focus:left-4 focus:z-[100]
          bg-blue-600 text-white px-4 py-2 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          font-medium text-sm
          transition-transform
        "
      >
        Skip to main content
      </a>

      {/* Site header with navigation */}
      <Header />

      {/* Main content area - receives focus from skip link */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-full overflow-x-hidden"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when parent updates
export default memo(LayoutProvider);
