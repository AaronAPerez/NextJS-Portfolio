/**
 * About Section Data Constants
 *
 * Centralized data for the About section including narrative content,
 * timeline information, and statistics. This ensures consistency
 * and makes updates easier to manage.
 */

import {
  Briefcase,
  GraduationCap,
  Award,
  Code,
  LucideIcon
} from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

export interface NarrativeSection {
  id: string;
  title: string;
  content: string[];
  highlights?: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

// =============================================================================
// Narrative Content
// =============================================================================

export const narrative: NarrativeSection[] = [
  {
    id: 'background',
    title: '',
    content: [
      `I came up through 7+ years of IT support before writing a single line of production code. That means I understand how real users break things, what causes downtime, and why accessibility isn't optional — it's engineering.`,
      `I graduated CodeStack Academy's Full Stack Web Development program and immediately shipped production sites for real clients — built on Next.js, TypeScript, Tailwind CSS, deployed to Vercel. Not portfolio demos — actual businesses depending on my work every day.`,
      `My stack matches what modern client-site work demands: Supabase for databases and backend logic, PostgreSQL for relational data, GA4 for real performance insight, and AI-assisted tools to ship faster without cutting corners.`,
      `I run AP Designs as a freelance web development practice and I'm looking for a full-time software developer role.`
    ],
    highlights: [
      'actual businesses depending on my work',
      'Supabase for databases and backend logic',
      'AI-assisted tools to ship faster'
    ]
  }
];

// =============================================================================
// Statistics
// =============================================================================

export const stats: StatItem[] = [
  {
    id: 'years',
    label: 'Years Experience',
    value: '7+',
    icon: Briefcase,
    color: 'text-blue-500'
  },
  {
    id: 'education',
    label: 'Education Programs',
    value: '3',
    icon: GraduationCap,
    color: 'text-purple-500'
  },
  {
    id: 'projects',
    label: 'Production Sites',
    value: '4+',
    icon: Code,
    color: 'text-green-500'
  },
  {
    id: 'certifications',
    label: 'Certifications',
    value: '2',
    icon: Award,
    color: 'text-orange-500'
  }
];

// =============================================================================
// Simple Timeline (for compact display)
// =============================================================================

export interface SimpleTimelineItem {
  role: string;
  company: string;
  period: string;
  detail: string;
  current: boolean;
}

// Keep these entries in step with the resume (public/resume/Aaron-Perez-Resume.pdf);
// recruiters compare the two.
export const simpleTimeline: SimpleTimelineItem[] = [
  {
    role: 'Freelance Full Stack Developer',
    company: 'AP Designs',
    period: 'Mar 2025 – Present',
    detail: "Building and maintaining four production client sites on Next.js and Vercel, including AMP Vending's site and admin dashboard on Supabase PostgreSQL, plus a separate Playwright and Cypress QA suite for it.",
    current: true
  },
  {
    role: 'CodeStack Academy',
    company: 'Full Stack Web Development Program',
    period: 'Sep 2023 – Apr 2025',
    detail: 'Full stack program at the San Joaquin County Office of Education: React, TypeScript, Next.js, C#, ASP.NET MVC, SQL Server and Azure.',
    current: false
  },
  {
    role: 'User Support Specialist, QA Testing and Support (SEIS)',
    company: 'San Joaquin County Office of Education',
    period: 'Aug 2017 – Jan 2025',
    detail: 'Tested new features during SEIS rollout sprints for 100+ SELPAs statewide, wrote bug reports developers could act on, and verified fixes before release.',
    current: false
  },
  {
    role: 'Information Systems Analyst',
    company: 'San Joaquin County, Information Systems Division',
    period: 'Feb 2017 – May 2017',
    detail: 'Supported county systems and applications, managed user access, and documented troubleshooting procedures for the team knowledge base.',
    current: false
  }
];

// =============================================================================
// Education Credentials (for prominent display)
// =============================================================================

export interface EducationCredential {
  id: string;
  degree: string;
  degreeType: 'BAS' | 'AS' | 'Certification';
  field: string;
  institution: string;
  year: string;
  gpa?: string;
  honors?: string;
  icon: 'degree' | 'certification';
  gradient: string;
  highlights: string[];
}

export const educationCredentials: EducationCredential[] = [
    {
    id: 'codestack-cert',
    degree: 'Professional Certification',
    degreeType: 'Certification',
    field: 'Full Stack Web Development',
    institution: 'CodeStack Academy',
    year: '2025',
    icon: 'certification',
    gradient: 'from-blue-600 to-yellow-600',
    highlights: [
      'React, TypeScript, Next.js',
      'C#, .NET Core, SQL Server',
      'Azure Cloud Services & CI/CD',
      'Agile Development Practices'
    ]
  },
  {
    id: 'bs-degree',
    degree: 'Bachelor of Applied Science',
    degreeType: 'BAS',
    field: 'Information Systems & Cyber Security',
    institution: 'ITT Technical Institute',
    year: '2016',
    icon: 'degree',
    gradient: 'from-purple-600 to-indigo-600',
    highlights: [
      'Network Security & Risk Management',
      'Database Design & SQL Server',
      'System Analysis & Design',
      'Senior Capstone Project'
    ]
  },
  {
    id: 'as-degree',
    degree: 'Associate of Science',
    degreeType: 'AS',
    field: 'Network System Administration',
    institution: 'ITT Technical Institute',
    year: '2014',
    icon: 'degree',
    gradient: 'from-blue-600 to-cyan-600',
    highlights: [
      'Windows Server Administration',
      'Active Directory & Group Policy',
      'TCP/IP & Network Infrastructure',
      'Cisco Networking Equipment'
    ]
  },
];
