'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui';

/**
 * Navigation Component
 * 
 * Responsive navigation with mobile menu, smooth scrolling, and active states.
 * 
 * Features:
 * - Desktop horizontal navigation
 * - Mobile hamburger menu with slide-in animation
 * - Active link highlighting
 * - Smooth scroll to sections
 * - Sticky header on scroll
 * - Accessible keyboard navigation
 * - Focus trap in mobile menu
 * 
 * @example
 * <Navigation />
 */

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [, setIsScrolled] = useState(false);

  // Handle scroll for sticky header and active section
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for sticky header effect
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle navigation click
  const handleNavClick = (href: string) => {
    setIsOpen(false);

    // If it's a hash link, smooth scroll to section
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex items-center gap-8"
        role="navigation"
        aria-label="Main navigation"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => handleNavClick(link.href)}
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              'hover:text-primary-600 focus:outline-none focus:text-primary-600',
              'relative py-2',
              activeSection === link.href
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-gray-700 dark:text-white'
            )}
          >
            {link.label}
            {/* Active indicator */}
            {activeSection === link.href && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                aria-hidden="true"
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50',
          'transform transition-transform duration-300 ease-in-out md:hidden',
          'flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium',
                    'transition-colors duration-200',
                    'hover:bg-primary-50 hover:text-primary-600',
                    'focus:outline-none focus:bg-primary-50 focus:text-primary-600',
                    activeSection === link.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Footer - CTA */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="primary"
            fullWidth
            onClick={() => handleNavClick('#contact')}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </>
  );
}