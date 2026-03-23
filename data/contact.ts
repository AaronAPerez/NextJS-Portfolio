/**
 * Contact Data Constants
 *
 * Centralized contact information used throughout the application.
 * This ensures consistency and makes updates easier to manage.
 */

import { Github, Linkedin, Send, Copy, Download, LucideIcon } from 'lucide-react';

// =============================================================================
// Contact Information
// =============================================================================

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  resume: string;
  availability: string;
}

export const contactInfo: ContactInfo = {
  email: 'aaronperezdev@gmail.com',
  phone: '+1 (209) 470-2061',
  location: 'Stockton, CA',
  resume: '/A.Perez - Fullstack Resume.pdf',
  availability: 'Open to remote opportunities worldwide'
};

// =============================================================================
// Quick Actions Configuration
// =============================================================================

export type QuickActionType = 'mailto' | 'copy' | 'download';

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  action: QuickActionType;
  value: string;
  color: string;
  ariaLabel: string;
}

export const quickActions: QuickAction[] = [
  {
    id: 'email',
    label: 'Email',
    icon: Send,
    action: 'mailto',
    value: contactInfo.email,
    color: 'bg-blue-500 hover:bg-blue-600',
    ariaLabel: 'Send email to Aaron Perez'
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: Copy,
    action: 'copy',
    value: contactInfo.email,
    color: 'bg-indigo-500 hover:bg-indigo-600',
    ariaLabel: 'Copy email address to clipboard'
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: Download,
    action: 'download',
    value: contactInfo.resume,
    color: 'bg-green-500 hover:bg-green-600',
    ariaLabel: 'Download resume PDF'
  }
];

// =============================================================================
// Social Links Configuration
// =============================================================================

export interface SocialLink {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  color: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/AaronAPerez',
    color: 'hover:bg-gray-800 hover:text-white',
    ariaLabel: 'Visit my GitHub profile'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aaronaperezdev/',
    color: 'hover:bg-blue-600 hover:text-white',
    ariaLabel: 'Visit my LinkedIn profile'
  }
];
