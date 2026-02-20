'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Navigation } from './Navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md'
            : 'bg-white dark:bg-gray-900'
        )}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
              aria-label="AP Designs - Portfolio Home">
              {/* <Image
                src="/favicon-48x48.svg"
                alt="AP Designs Logo"
                width={48}
                height={48}
                className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-2xl',
                  'transition-transform duration-200',
                  'group-hover:scale-110 group-focus:scale-110'
                )}
                priority
              /> */}
              <header className="ap-header">
                <a href="https://www.aaronaperez.dev" className="ap-header-brand backdrop-blur-lg shadow-xl">
                  <img src="/favicon-48x48.svg" alt="AP Designs Logo" className="ap-header-logo" />
                  {/* <span className="ap-header-text">AP Designs</span> */}
                </a>
              </header>

              <div className="hidden sm:block">
                <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  AP Designs
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Web Development
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <Navigation />

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button - Desktop Only */}
              <div className="hidden lg:block">
                <a
                  href="/resume/Aaron-Perez-Resume.pdf"
                  download="Aaron-Perez-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
                    'transition-all duration-200 focus:outline-none focus:ring-2',
                    'focus:ring-offset-2 active:scale-95',
                    'touch-target px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]',
                    'focus:ring-primary-500 shadow-sm hover:shadow-md',
                    'text-base px-4 py-2 min-h-[40px]'
                  )}
                  aria-label="Download resume PDF"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
}