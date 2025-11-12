import { NavLink, SocialLink } from '@/types';

/**
 * Application Constants
 * Centralized configuration values used throughout the application
 */

// Personal Information
export const PERSONAL_INFO = {
  name: 'Aaron A. Perez',
  firstName: 'Aaron',
  lastName: 'Perez',
  title: 'Full Stack Developer',
  tagline: 'Building accessible, SEO-optimized web applications with React, TypeScript, and Next.js',
  bio: 'Full Stack Developer with 7+ years of IT experience and specialized training in modern web technologies. Recent CodeStack Academy graduate with expertise in React, TypeScript, Next.js, and .NET development.',
  email: 'aaperez06@gmail.com',
  phone: '(209) 470-2061',
  location: 'Stockton, California',
  locationShort: 'Stockton, CA',
  availability: 'Available for opportunities',
  timezone: 'PST (UTC-8)',
} as const;

// Website URLs
export const SITE_CONFIG = {
  url: 'https://aaronaperez.dev',
  name: 'Aaron A. Perez Portfolio',
  description: 'Full Stack Developer specializing in React, TypeScript, Next.js, and modern web technologies',
  locale: 'en_US',
  ogImage: '/images/og-image.jpg',
} as const;

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

// Social Media Links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aaronaperezdev/',
    icon: 'linkedin',
    username: 'aaronaperezdev',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/AaronAPerez',
    icon: 'github',
    username: 'AaronAPerez',
  },
  {
    name: 'Email',
    url: 'mailto:aaperez06@gmail.com',
    icon: 'mail',
    username: 'aaperez06@gmail.com',
  },
  {
    name: 'Portfolio',
    url: 'https://www.aaronaperez.dev/',
    icon: 'globe',
    username: 'aaronaperez.dev',
  },
];

// Tech Stack Categories
export const TECH_STACK = {
  frontend: [
    'React',
    'TypeScript',
    'JavaScript',
    'Next.js',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Chakra UI',
    'Bootstrap',
    'React Bootstrap',
  ],
  backend: [
    'C#',
    '.NET',
    'Node.js',
    'MySQL',
    'RESTful APIs',
    'API Development',
    'Database Design',
  ],
  tools: [
    'Git',
    'GitHub',
    'Azure',
    'Vercel',
    'Vite',
    'Postman',
    'Swagger',
    'npm',
    'VS Code',
  ],
  specializations: [
    'SEO Optimization',
    'Web Accessibility (WCAG)',
    'Responsive Design',
    'Performance Optimization',
    'Quality Assurance',
    'Technical Documentation',
    'CI/CD Pipelines',
    'Testing Strategies',
  ],
} as const;

// SEO Keywords for meta tags
export const SEO_KEYWORDS = [
  'React Developer',
  'TypeScript Developer',
  'Next.js Developer',
  'Full Stack Developer',
  'Web Developer',
  'Frontend Developer',
  'Backend Developer',
  'JavaScript Developer',
  'Stockton Web Developer',
  'California Web Developer',
  'Central California Developer',
  'SEO Optimization Specialist',
  'Web Accessibility Expert',
  'WCAG Compliance',
  'CodeStack Academy Graduate',
  '.NET Developer',
  'C# Developer',
] as const;

// Project Categories
export const PROJECT_CATEGORIES = [
  'All',
  'Web Application',
  'Business Website',
  'E-commerce',
  'Portfolio',
  'Dashboard',
  'API Development',
] as const;

// Skill Proficiency Levels
export const PROFICIENCY_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
} as const;

// Contact Form Budget Options
export const BUDGET_OPTIONS = [
  'Less than $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'More than $50,000',
  'Not sure yet',
] as const;

// Contact Form Timeline Options
export const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 1 month',
  '1-3 months',
  '3-6 months',
  'More than 6 months',
  'Just exploring',
] as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  LIGHTHOUSE_SCORE: 90,
  FCP: 1800, // First Contentful Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  TTI: 3800, // Time to Interactive (ms)
} as const;

// Feature Flags (for gradual rollout of features)
export const FEATURE_FLAGS = {
  ENABLE_BLOG: false,
  ENABLE_DARK_MODE: false,
  ENABLE_ANALYTICS: true,
  ENABLE_CONTACT_FORM: true,
  ENABLE_TESTIMONIALS: true,
} as const;

// External Links
export const EXTERNAL_LINKS = {
  RESUME: '/resume/Aaron-Perez-Resume.pdf',
  GITHUB_REPO: 'https://github.com/AaronAPerez/portfolio',
  CODESTACK: 'https://codestackacademy.com',
} as const;