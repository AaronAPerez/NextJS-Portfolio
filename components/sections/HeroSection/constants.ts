/**
 * Hero Section Constants
 *
 * Hero-specific configuration and data.
 * References centralized data from data/ folder where possible.
 */

import { skills } from '@/data/skills';

// =============================================================================
// Hero Content
// =============================================================================

export const heroContent = {
  name: 'Aaron A. Perez',
  title: 'Full Stack Developer',
  tagline: 'I build production websites that drive real business results.',
  location: 'Stockton, CA • Open to Remote',
  availabilityStatus: 'Available for Hire',
  ctaConnect: "Let's Connect",
  resumePath: '/resume/Aaron-Perez-Resume.pdf'
} as const;

// =============================================================================
// Featured Technologies (for rotating display)
// =============================================================================

// IDs of skills to feature in the hero rotation
const FEATURED_SKILL_IDS = [
  'react',
  'typescript',
  'nextjs',
  'nodejs',
  'azure',
  'csharp'
] as const;

// Get featured technologies from skills data
export const featuredTechnologies = skills
  .filter(skill => FEATURED_SKILL_IDS.includes(skill.id as typeof FEATURED_SKILL_IDS[number]))
  .map(skill => ({
    id: skill.id,
    name: skill.name,
    icon: skill.icon,
    color: skill.color
  }));

// =============================================================================
// Floating Tech Icons (for visual display around profile)
// =============================================================================

export interface FloatingTechIcon {
  id: string;
  icon: string;
  alt: string;
  position: string;
  size: string;
  animation?: string;
}

export const floatingTechIcons: FloatingTechIcon[] = [
  {
    id: 'react',
    icon: '/icons/frontend/react.svg',
    alt: 'React',
    position: 'absolute -top-6 -right-6',
    size: 'w-16 h-16',
    animation: 'spin 20s linear infinite'
  },
  {
    id: 'nodejs',
    icon: '/icons/backend/nodejs.svg',
    alt: 'Node.js',
    position: 'absolute -bottom-2 -left-6',
    size: 'w-14 h-14',
    animation: 'spin 25s linear infinite reverse'
  },
  {
    id: 'typescript',
    icon: '/icons/frontend/typescript.svg',
    alt: 'TypeScript',
    position: 'absolute top-1/4 -left-8',
    size: 'w-12 h-12',
    animation: 'pulse-scale 3s ease-in-out infinite'
  },
  {
    id: 'javascript',
    icon: '/icons/frontend/javascript.svg',
    alt: 'JavaScript',
    position: 'absolute top-1/3 -right-8',
    size: 'w-10 h-10',
    animation: 'pulse-scale 4s ease-in-out infinite'
  }
];

// =============================================================================
// Profile Image Configuration
// =============================================================================

export const profileImage = {
  src: '/images/profile/headshot.webp',
  alt: 'Aaron A. Perez - Full Stack Developer',
  width: 384,
  height: 384,
  sizes: '(max-width: 640px) 256px, (max-width: 768px) 320px, 384px'
} as const;

// =============================================================================
// Tech Rotation Interval (ms)
// =============================================================================

export const TECH_ROTATION_INTERVAL = 2500;
