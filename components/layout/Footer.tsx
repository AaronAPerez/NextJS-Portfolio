import React from 'react';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  Heart,
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants';

/**
 * Footer Component
 * 
 * Comprehensive footer with navigation, social links, and contact info.
 * 
 * Features:
 * - Multi-column layout (responsive)
 * - Quick navigation links
 * - Social media links with icons
 * - Contact information
 * - Copyright and attribution
 * - Accessible link labels
 * 
 * @example
 * <Footer />
 */

// Icon mapping for social links
const iconMap: { [key: string]: React.ReactNode } = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  mail: <Mail size={20} />,
  globe: <Globe size={20} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-200 dark:bg-gray-950 text-gray-300 dark:text-gray-200"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 mb-6 max-w-md">
              {PERSONAL_INFO.bio}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center
                           justify-center hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           focus:ring-offset-gray-900 dark:focus:ring-offset-gray-950"
                  aria-label={`Visit ${PERSONAL_INFO.name} on ${social.name}`}
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-800 dark:text-gray-200 hover:text-primary-400 transition-colors 
                             focus:outline-none focus:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-gray-800 dark:text-gray-200 hover:text-primary-400 transition-colors 
                           flex items-center gap-2 focus:outline-none focus:text-primary-400"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </li>
              <li>
               <a 
                  href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="text-gray-800 dark:text-gray-200 hover:text-primary-400 transition-colors 
                           focus:outline-none focus:text-primary-400"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </li>
              <li className="text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Globe size={16} aria-hidden="true" />
                <span>{PERSONAL_INFO.location}</span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 px-3 py-1 
                               bg-green-900/30 text-green-400 rounded-full text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                        aria-hidden="true" />
                  {PERSONAL_INFO.availability}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-gray-700 my-8" aria-hidden="true" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-800 dark:text-gray-200 text-center sm:text-left">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>

          {/* Credits */}
          <p className="text-sm text-gray-800 dark:text-gray-200 flex items-center gap-1">
            Built with{' '}
            <Heart 
              size={14} 
              className="text-red-500 inline fill-current" 
              aria-label="love"
            />{' '}
            using Next.js, TypeScript & Tailwind CSS
          </p>
        </div>

        {/* Additional Links - Privacy, Terms, etc. */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/privacy"
            className="text-gray-800 dark:text-gray-200 hover:text-primary-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-gray-800 dark:text-gray-200 hover:text-primary-400 transition-colors"
          >
            Terms of Service
          </Link>
          <a
            href="https://github.com/AaronAPerez/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-primary-400 transition-colors 
                     flex items-center gap-1"
          >
            View Source
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}