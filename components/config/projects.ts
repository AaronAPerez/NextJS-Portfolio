// components/config/projects.ts
// Updated with verified data from GitHub repos — March 2026

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: 'production' | 'in-progress' | 'archived';
  category: 'client' | 'saas' | 'tool';
  image?: string;
  accentColor: string;
  companyLogo?: string;  // URL to company/client logo image
  stats: {
    commits?: number;
    lighthouse?: number;
    label?: string;
  };
  tech: string[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'amp-vending',
    title: 'AMP Vending Machines',
    description:
      'Full-stack B2B platform for a vending machine company serving Central California. Features a full admin dashboard, Supabase backend, and E2E test coverage.',
    longDescription:
      'First professional web presence for AMP Vending, serving Stanislaus and San Joaquin County. Built a complete full-stack platform: public-facing marketing site, machine catalog with dynamic routes, contact/feedback forms, and a full admin dashboard with machine management, product management, email logs, marketing tools, and SEO controls. Backed by Supabase (PostgreSQL + Auth), with automated email via Resend, Google Maps service area visualization, Vercel Analytics, and Microsoft Clarity. Includes Jest unit tests and Playwright E2E tests.',
    liveUrl: 'https://www.ampvendingmachines.com',
    githubUrl: 'https://github.com/AaronAPerez/AMP-Vending-Machines-Website',
    featured: true,
    status: 'production',
    category: 'client',
    image: '/images/projects/amp-vending/amp-vending-1.webp',
    companyLogo: '/images/projects/amp-vending/AMP_logo.png',
    accentColor: '#FD5A1E',
    stats: {
      commits: 446,
      lighthouse: 98,
      label: 'Sub-1s load',
    },
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript 5.7',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Resend',
      'Jest',
      'Playwright',
      'Vercel Analytics',
      'Google Maps API',
      'Framer Motion',
      'Zod',
    ],
    highlights: [
      'Full admin dashboard — machine/product/contact/email/marketing/SEO management',
      'Supabase PostgreSQL + Auth with real-time capabilities',
      'Jest unit tests + Playwright E2E test suite',
      'Automated transactional email via Resend',
      'Google Maps service area visualization for Central Valley',
      'WCAG 2.1 AA compliant, dynamic JSON-LD structured data',
      '446 commits — actively maintained production codebase',
    ],
  },
  {
    id: 'balderas-concrete',
    title: 'Balderas Concrete',
    description:
      'Professional site for a Houston concrete contractor with 30+ years of experience. Built with Tailwind CSS 4, Neon PostgreSQL via Prisma, and contact forms backed by a real database.',
    longDescription:
      'Modern SEO-optimized website for Balderas Concrete, a commercial and industrial contractor specializing in turnkey concrete, earthwork & site work, and underground utilities across a 75-mile radius from Houston. Contact form submissions are persisted in a Neon PostgreSQL database via Prisma 6, with email notifications through Resend. State management via Zustand, data fetching via React Query. Includes dynamic sitemap, JSON-LD structured data, service area pages, and Vercel Analytics.',
    liveUrl: 'https://www.balderasconcrete.com',
    githubUrl: 'https://github.com/AaronAPerez/balderas-concrete',
    featured: false,
    status: 'production',
    category: 'client',
    image: '/images/projects/balderas-concrete/balderas-concrete-hero.webp',
    accentColor: '#888780',
    stats: {
      commits: 87,
      lighthouse: 95,
      label: 'Houston, TX',
    },
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Tailwind CSS 4',
      'Neon PostgreSQL',
      'Prisma 6',
      'Resend',
      'Zustand',
      'React Query',
      'Framer Motion',
      'Zod',
      'Vercel',
    ],
    highlights: [
      'Tailwind CSS 4 — bleeding-edge styling setup',
      'Neon PostgreSQL + Prisma 6 ORM for contact persistence',
      'Dynamic service area pages (75-mile radius from Houston)',
      'Zustand + React Query state and data management',
      'Dynamic sitemap generation and JSON-LD structured data',
      'WCAG compliant with keyboard navigation and screen reader support',
    ],
  },
  {
    id: 'goldmine-communications',
    title: 'Goldmine Communications',
    description:
      'Full-platform site for a Bay Area communications & construction contractor. Includes social media automation, project portfolio, lead generation, and multi-state service area coverage.',
    longDescription:
      'Comprehensive digital platform for Goldmine Construction Services — a licensed Bay Area contractor (Lic #1099543) specializing in communications infrastructure, commercial construction, and AV charging stations across California, Nevada, and Oregon. Beyond a standard marketing site, the platform includes an automated social media management system (Facebook/Instagram Graph API integration), B2B-optimized scheduling, content generation from project data, and a full admin testing suite. Project portfolio with photos from Bodega Bay, Winnemucca NV, Sparks NV, and Oregon AV Station.',
    liveUrl: 'https://www.goldminecomm.net',
    githubUrl:
      'https://github.com/AaronAPerez/Goldmine-Communications-Construction-Website',
    featured: false,
    status: 'production',
    category: 'client',
    image: '/images/projects/goldmine/Goldmine-Hero-Screenshot.webp',
    accentColor: '#EF9F27',
    stats: {
      commits: 115,
      lighthouse: 95,
      label: 'Bay Area, CA',
    },
    tech: [
      'Next.js 14',
      'React 18',
      'TypeScript 5',
      'Tailwind CSS',
      'Framer Motion',
      'Nodemailer',
      'Facebook Graph API',
      'Supabase',
      'React Hook Form',
      'Lucide React',
    ],
    highlights: [
      'Social media automation — Facebook & Instagram Graph API',
      'B2B-optimized post scheduling with content generated from project data',
      'Dynamic project portfolio with photos from 4 states',
      'Service area coverage: Bay Area, Northern CA, Nevada, Oregon',
      'WCAG 2.1 AA, Lighthouse 95+, semantic structured data',
      '115 commits — full production deployment on Vercel',
    ],
  },
  {
    id: 'digital-tools',
    title: 'Digital Tools Platform',
    description:
      'SaaS image and PDF utility platform with a freemium pricing model. Built on Next.js 15 with Supabase auth, usage-based gating, and a multi-tool processing pipeline.',
    longDescription:
      'A freemium SaaS platform offering image compression, PDF manipulation, and file conversion tools. Designed around a usage-based pricing model with Supabase for auth and usage tracking, Stripe for billing, and a clean multi-tool UI. Built with Next.js 15 App Router, TypeScript strict mode, and Tailwind CSS.',
    liveUrl: '#',
    githubUrl: 'https://github.com/AaronAPerez/digital-tools',
    featured: false,
    status: 'in-progress',
    category: 'saas',
    accentColor: '#1D9E75',
    stats: {
      label: 'SaaS / Freemium',
    },
    tech: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Stripe',
      'Vercel',
    ],
    highlights: [
      'Freemium model with usage-based feature gating',
      'Multi-tool image and PDF processing pipeline',
      'Supabase Auth + usage tracking per user',
      'Stripe billing integration',
      'Next.js 15 App Router with server actions',
    ],
  },
];

export const FEATURED_PROJECT = PROJECTS.find((p) => p.featured)!;
export const OTHER_PROJECTS = PROJECTS.filter((p) => !p.featured);
export const PRODUCTION_PROJECTS = PROJECTS.filter(
  (p) => p.status === 'production'
);
