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
  status: 'production' | 'active' | 'in-progress' | 'archived';
  category: 'client' | 'saas' | 'tool';
  image?: string;
  accentColor: string;
  companyLogo?: string;  // URL to a brand mark; cards fall back to a monogram
  stats: {
    /**
     * Durable context for the card (service area, domain). Point-in-time
     * metrics are deliberately excluded — a hardcoded commit count or
     * Lighthouse score is wrong the day after it is written.
     */
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
      'Production site and admin dashboard for a Central California vending company, so the owner can update machines, products and photos without a developer.',
    longDescription:
      'Modern full-stack web application for AMP Vending, serving Stanislaus County, San Joaquin County, and Central Valley California. Built a complete platform with machine catalog (detailed specs and galleries), 50+ customizable product showcase, contact/feedback forms, and location-specific landing pages. Full admin dashboard with JWT and Google OAuth authentication, machine/product CRUD, contact submission tracking, email log management, SEO/marketing tools, and photo management. Backed by Supabase (PostgreSQL + Auth), automated email via Resend, Google Maps service area visualization, Vercel Analytics, and Microsoft Clarity. Includes Jest unit tests and Playwright E2E tests.',
    liveUrl: 'https://www.ampvendingmachines.com',
    githubUrl: 'https://github.com/AaronAPerez/AMP-Vending-Machines-Website',
    featured: true,
    status: 'production',
    category: 'client',
    image: '/images/projects/amp-vending/hero-screenshot.png',
    companyLogo: '/images/projects/amp-vending/AMP_logo.webp',
    accentColor: '#FD5A1E',
    stats: {
      label: 'Modesto, CA',
    },
    tech: [
      'Next.js 16.1',
      'React 19',
      'TypeScript 5.7',
      'Tailwind CSS 3.4',
      'Supabase',
      'PostgreSQL',
      'Resend',
      'Jest',
      'Playwright',
      'Vercel Analytics',
      'Microsoft Clarity',
      'Google Maps API',
      'Framer Motion',
      'React Hook Form',
      'Zod',
    ],
    highlights: [
      'Full admin dashboard — JWT + Google OAuth, machine/product CRUD, contact tracking, email logs, SEO tools',
      'Machine catalog with detailed specifications and image galleries',
      '50+ customizable product showcase with filtering',
      'Supabase PostgreSQL + Auth with real-time capabilities',
      'Jest unit tests + Playwright E2E test suite',
      'Location-specific landing pages for Central Valley service areas',
      'WCAG 2.1 AA compliant, dynamic JSON-LD structured data',
    ],
  },
  {
    id: 'ampvending-qa',
    title: 'AMP Vending QA Suite',
    description:
      'Test automation for the AMP Vending contact form, the business\'s lead source. Runs against production without ever sending a real lead.',
    longDescription:
      'A risk-based test plan with 20 prioritized cases, implemented in Playwright (Chromium, Firefox, WebKit) and ported to Cypress with shared test data. Covers functional, negative, boundary, API-contract and accessibility testing. Six defects found and written up as GitHub issues on the website repo; known bugs are tracked with test.fail() so a fix shows up as a passing-but-expected-to-fail test.',
    liveUrl: '#',
    githubUrl: 'https://github.com/AaronAPerez/ampvending-qa',
    featured: false,
    status: 'active',
    category: 'tool',
    accentColor: '#16A34A',
    stats: {
      label: 'QA automation',
    },
    tech: ['Playwright', 'Cypress', 'TypeScript', 'axe-core', 'GitHub Actions'],
    highlights: [
      'Risk-based test plan with 20 prioritized cases',
      'Page Object Model with accessibility-first locators',
      'Boundary and negative tests on the limits the server enforces',
      'API-contract tests that stub the real 400 and 500 responses',
      'axe-core WCAG 2.1 A/AA scan that fails on any new violation',
      'Six defects found and filed as issues on the website repo',
    ],
  },
  {
    id: 'construction-takeoff',
    title: 'Construction Takeoff and Bid App',
    description:
      'Internal estimating tool for concrete and metal-panel jobs. Estimators trace blueprint PDFs on a custom canvas, and the app outputs quantities, costs and the bid form.',
    longDescription:
      'Built for a contractor\'s estimators. Blueprint PDFs render with pdf.js under a custom canvas engine for tracing walls, slabs and panels; the app turns those measurements into quantities, labor and material costs, and the contractor\'s bid form. Nearly 500 Vitest unit tests cover the costing and geometry math, with expected values tied to cited rates or real engineered schedules. The code is private client work; a walkthrough is available on request.',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    status: 'in-progress',
    category: 'tool',
    accentColor: '#EA580C',
    stats: {
      label: 'Private client tool',
    },
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Neon PostgreSQL', 'Zustand', 'pdf.js', 'Vitest'],
    highlights: [
      'Custom canvas engine for tracing blueprint PDFs',
      'Quantities, costs and a 78-line bid form generated from the takeoff',
      'Nearly 500 Vitest unit tests on the costing and geometry math',
      'Expected test values tied to cited rates and engineered schedules',
      'UI changes verified in the running app with Playwright',
    ],
  },
  {
    id: 'the-glamping-spot',
    title: 'The Glamping Spot',
    description:
      'Marketing and guest-onboarding site for a geodesic dome rental in Kountze, Texas. Bookings route to Airbnb; the in-house piece is a digital liability waiver with e-signature and PDF generation.',
    longDescription:
      'Next.js 16 marketing site for "Nice Dreams @ The Glamping Spot", a single luxury geodesic dome listing in Kountze, Texas (East Texas, ~90 minutes from Houston). Reservations are handled on Airbnb rather than a custom checkout, so the site is built to drive qualified traffic there: geographic SEO targeting for Kountze and the Houston metro, structured data, generated XML sitemap, and a property gallery. The custom build is the guest waiver flow — a multi-step liability waiver with e-signature that renders a signed PDF via @react-pdf/renderer and emails it out through Nodemailer. UI state runs through Zustand, forms through React Hook Form + Zod, and the site ships WCAG 2.1 AA support with Core Web Vitals monitoring in production.',
    liveUrl: 'https://theglampingspot.net',
    githubUrl: 'https://github.com/AaronAPerez/the-glamping-spot',
    featured: false,
    status: 'production',
    category: 'client',
    image: '/images/projects/the-glamping-spot/hero-screenshot.png',
    companyLogo: '/images/projects/the-glamping-spot/logo.png',
    // Sampled from the logo's dome-sky teal (#00B4D8 dominant), matching the
    // live site's navbar color — not the green placeholder value.
    accentColor: '#00A8C4',
    stats: {
      label: 'Kountze, TX',
    },
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Tailwind CSS 4',
      'Framer Motion',
      'Zustand',
      'React Hook Form',
      'Zod',
      'React PDF',
      'Nodemailer',
      'Vercel Analytics',
    ],
    highlights: [
      'Digital liability waiver — e-signature, PDF generation, emailed confirmation',
      'Airbnb-routed booking funnel instead of a custom checkout',
      'Geographic SEO for Kountze, TX and the Houston metro',
      'Zustand UI store with React Hook Form + Zod validation',
      'WCAG 2.1 AA — keyboard navigation, focus management, 44px touch targets',
      'Core Web Vitals monitoring and image optimization in production',
    ],
  },
  {
    id: 'balderas-concrete',
    title: 'Balderas Concrete',
    description:
      'Site for a Houston concrete contractor. Contact submissions are saved to Neon PostgreSQL through Prisma and emailed with Resend, with service area pages for a 75-mile radius.',
    longDescription:
      'Modern SEO-optimized website for Balderas Concrete, a commercial and industrial contractor specializing in turnkey concrete, earthwork & site work, and underground utilities across a 75-mile radius from Houston. Contact form submissions are persisted in a Neon PostgreSQL database via Prisma 6, with email notifications through Resend. State management via Zustand, data fetching via React Query. Includes dynamic sitemap, JSON-LD structured data, service area pages, and Vercel Analytics.',
    liveUrl: 'https://www.balderasconcrete.com',
    githubUrl: 'https://github.com/AaronAPerez/balderas-concrete',
    featured: false,
    status: 'production',
    category: 'client',
    image: '/images/projects/balderas-concrete/balderas-concrete-hero.webp',
    // Icon-only mark (309x301, near-square) — the full "BALDERAS CONCRETE"
    // wordmark file is a 2.6:1 banner that doesn't fit the card's square tile.
    companyLogo: '/images/projects/balderas-concrete/logo.png',
    // Sampled from the logo's actual navy ink (#183C60/#184860 dominant pixels).
    accentColor: '#1F4A6E',
    stats: {
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
      'Site for a Bay Area communications and construction contractor, with a project portfolio and Facebook and Instagram posts scheduled through the Graph API from project data.',
    longDescription:
      'Comprehensive digital platform for Goldmine Construction Services — a licensed Bay Area contractor (Lic #1099543) specializing in communications infrastructure, commercial construction, and AV charging stations across California, Nevada, and Oregon. Beyond a standard marketing site, the platform includes an automated social media management system (Facebook/Instagram Graph API integration), B2B-optimized scheduling, content generation from project data, and a full admin testing suite. Project portfolio with photos from Bodega Bay, Winnemucca NV, Sparks NV, and Oregon AV Station.',
    liveUrl: 'https://www.goldminecomm.net',
    githubUrl:
      'https://github.com/AaronAPerez/Goldmine-Communications-Construction-Website',
    featured: false,
    status: 'production',
    category: 'client',
    image: '/images/projects/goldmine/Goldmine-Hero-Screenshot.webp',
    companyLogo: '/images/projects/goldmine/logo-circular.webp',
    // Sampled from the badge's metallic gold ink (~#D0A870), not the brighter
    // amber the placeholder value used.
    accentColor: '#C9A063',
    stats: {
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
      'WCAG 2.1 AA compliant with semantic structured data',
    ],
  },
  {
    id: 'cat-sprinkler',
    title: 'Cat Sprinkler',
    description:
      'Computer vision project: a Python app watches a WiFi camera, detects cats with YOLO11, and aims an ESP32-driven pan/tilt water sprayer.',
    longDescription:
      'The laptop reads the camera\'s RTSP stream, runs YOLO11 detection, and sends aim and spray commands over WiFi to an ESP32 that drives the servos and a water valve. A Flask page gives live view, manual aim and spray from a phone, and each event is saved as a video clip.',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    status: 'in-progress',
    category: 'tool',
    accentColor: '#0EA5E9',
    stats: {
      label: 'Hardware + computer vision',
    },
    tech: ['Python', 'OpenCV', 'YOLO11', 'Flask', 'ESP32 (C++)'],
    highlights: [
      'YOLO11 cat detection on a live RTSP camera stream',
      'ESP32 firmware driving pan/tilt servos and a water valve',
      'Flask control page for live view and manual aim from a phone',
      'Every event saved as a video clip',
    ],
  },
];

export const FEATURED_PROJECT = PROJECTS.find((p) => p.featured)!;
export const OTHER_PROJECTS = PROJECTS.filter((p) => !p.featured);
export const PRODUCTION_PROJECTS = PROJECTS.filter(
  (p) => p.status === 'production'
);
