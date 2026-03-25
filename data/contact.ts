/**
 * Contact Data Constants
 *
 * Centralized contact information used throughout the application.
 * This ensures consistency and makes updates easier to manage.
 */

import { Github, Linkedin, Copy, Download, LucideIcon } from 'lucide-react';

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
  /** Background color as hex value for reliable styling */
  bgColor: string;
  /** Hover background color as hex value */
  hoverBgColor: string;
  ariaLabel: string;
}

export const quickActions: QuickAction[] = [
  {
    id: 'copy',
    label: 'Copy Email',
    icon: Copy,
    action: 'copy',
    value: contactInfo.email,
    bgColor: '#6366F1',      // indigo-500
    hoverBgColor: '#4F46E5', // indigo-600
    ariaLabel: 'Copy email address to clipboard'
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: Download,
    action: 'download',
    value: contactInfo.resume,
    bgColor: '#22C55E',      // green-500
    hoverBgColor: '#16A34A', // green-600
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
  // Extended styling for hero section
  baseColor?: string;
  hoverColor?: string;
  baseBg?: string;
  hoverBg?: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/AaronAPerez',
    color: 'hover:bg-gray-800 hover:text-white',
    ariaLabel: 'Visit my GitHub profile',
    baseColor: 'text-[#181717] dark:text-white',
    hoverColor: 'hover:text-white dark:hover:text-[#181717]',
    baseBg: 'bg-white/80 dark:bg-gray-800/80',
    hoverBg: 'hover:bg-[#181717] dark:hover:bg-white'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aaronaperezdev/',
    color: 'hover:bg-blue-600 hover:text-white',
    ariaLabel: 'Visit my LinkedIn profile',
    baseColor: 'text-[#0A66C2]',
    hoverColor: 'hover:text-white',
    baseBg: 'bg-white/80 dark:bg-gray-800/80',
    hoverBg: 'hover:bg-[#0A66C2]'
  }
];
