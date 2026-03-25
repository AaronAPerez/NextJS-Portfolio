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

export interface TimelineItem {
  id: string;
  title: string;
  company?: string;
  institution?: string;
  period: string;
  location: string;
  type: 'work' | 'education' | 'certification' | 'degree';
  status: 'completed' | 'current';
  details: string[];
  skills: string[];
  gradient: string;
  achievements?: string[];
  website?: string;
}

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
      `I graduated CodeStack Academy's Full Stack Web Development program and immediately shipped production sites for real clients. Not portfolio demos — actual businesses depending on my work every day.`,
      `I run AP Designs as a freelance web development business while actively looking for a full-time role.`
    ],
    highlights: [
      'how real users break things',
      'actual businesses depending on my work'
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
// Experience Timeline
// =============================================================================

export const experience: TimelineItem[] = [
  {
    id: 'amp-vending',
    title: 'Full Stack Developer',
    company: 'AMP Vending Machines',
    period: 'Mar 2025 - Present',
    location: 'Modesto, CA (Remote)',
    type: 'work',
    status: 'current',
    website: 'https://www.ampvendingmachines.com',
    details: [
      'First Production Role: Transitioned from IT Support to Full Stack Development',
      'Architected and developed complete digital presence for AMP Vending Machines',
      'Built comprehensive Next.js application with TypeScript and React',
      'Developed WCAG-compliant components ensuring inclusive user experiences',
      'Implemented advanced SEO strategies resulting in enhanced search visibility',
      'Created scalable component architecture with reusable UI elements',
      'Established automated deployment pipelines achieving sub-800ms load times'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SEO', 'WCAG Accessibility'],
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'user-support',
    title: 'User Support Specialist',
    company: 'San Joaquin County Office of Education',
    period: 'Aug. 2017 - Jan. 2025',
    location: 'Stockton, CA',
    type: 'work',
    status: 'completed',
    details: [
      'QA testing and validation for educational software systems ensuring 99% uptime',
      'Technical support for SEIS serving 50+ school districts',
      'Compliance validation and data quality assurance with zero violations',
      'Help desk support with 95% first-call resolution rate',
      'Database maintenance and user account management for 5,000+ users',
      'Created automated testing scripts reducing manual QA time by 60%'
    ],
    skills: ['QA Testing', 'Technical Support', 'Database Management', 'Freshdesk', 'Documentation'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'systems-analyst',
    title: 'Information Systems Analyst',
    company: 'San Joaquin County - Information Systems Division',
    period: '2017',
    location: 'Stockton, CA',
    type: 'work',
    status: 'completed',
    details: [
      'Help desk support for 2,000+ county employees across 15+ departments',
      'Workstation setup, configuration, and Windows domain management',
      'Technical troubleshooting with average resolution time under 4 hours',
      'User account management using Microsoft SCCM and Active Directory',
      'Emergency response coordination during system outages'
    ],
    skills: ['Help Desk', 'System Administration', 'Network Support', 'Active Directory', 'SCCM'],
    gradient: 'from-orange-500 to-red-500'
  }
];

// =============================================================================
// Education Timeline
// =============================================================================

export const education: TimelineItem[] = [
  {
    id: 'codestack',
    title: 'Software Development Certification',
    institution: 'CodeStack Academy',
    period: '2023 - 2024',
    location: 'San Joaquin County, CA',
    type: 'certification',
    status: 'completed',
    details: [
      'Frontend Development: React, TypeScript, Next.js, Tailwind CSS',
      'Backend Development: C#, .NET Core, SQL Server, RESTful APIs',
      'DevOps & Tools: Git, Azure cloud services, CI/CD pipelines',
      'Built 5+ full-stack applications including business websites',
      'Collaborative development using Agile methodologies'
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'C#', '.NET Core', 'SQL Server', 'Azure'],
    gradient: 'from-blue-500 to-yellow-500'
  },
  {
    id: 'itt-tech-bs',
    title: 'BS Information Systems & Cyber Security',
    institution: 'ITT Technical Institute',
    period: 'Graduated 2016',
    location: 'Rancho Cordova, CA',
    type: 'degree',
    status: 'completed',
    details: [
      'Network Systems Administration and Security',
      'Information Security and Risk Management',
      'Database Design and Management using SQL Server',
      'Senior Capstone: Designed secure network infrastructure',
      'Graduated Cum Laude with GPA: 3.5/4.0'
    ],
    skills: ['Network Security', 'Database Management', 'System Administration', 'Risk Management'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'itt-tech-as',
    title: 'AS Network System Administration',
    institution: 'ITT Technical Institute',
    period: '2012 - 2014',
    location: 'Lathrop, CA',
    type: 'degree',
    status: 'completed',
    details: [
      'Network Infrastructure and Administration',
      'TCP/IP protocols, routing, switching, and network topology',
      'Active Directory management and domain administration',
      'Hardware installation and enterprise system troubleshooting',
      'Hands-on experience with Cisco networking equipment'
    ],
    skills: ['Windows Server', 'Active Directory', 'TCP/IP', 'Network Administration', 'Cisco'],
    gradient: 'from-indigo-500 to-blue-500'
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

export const simpleTimeline: SimpleTimelineItem[] = [
  {
    role: 'Full Stack Developer',
    company: 'AMP Vending · AP Designs',
    period: '2024 – Present',
    detail: 'Building and maintaining 4 production client sites. Running AP Designs as a freelance web development business.',
    current: true
  },
  {
    role: 'CodeStack Academy',
    company: 'Full Stack Web Development',
    period: '2023 – 2024',
    detail: 'Intensive full-stack development program. React, TypeScript, Next.js, C#, .NET, SQL Server.',
    current: false
  },
  {
    role: 'User Support Specialist',
    company: 'San Joaquin County Office of Education',
    period: '2017 – 2025',
    detail: 'QA testing, technical support, and compliance validation for educational software serving 50+ districts.',
    current: false
  },
  {
    role: 'Information Systems Analyst',
    company: 'San Joaquin County',
    period: '2017',
    detail: 'Help desk support for 2,000+ county employees across 15+ departments.',
    current: false
  }
];

// =============================================================================
// Education Credentials (for prominent display)
// =============================================================================

export interface EducationCredential {
  id: string;
  degree: string;
  degreeType: 'BS' | 'AS' | 'Certification';
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
    year: '2024',
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
    degree: 'Bachelor of Science',
    degreeType: 'BS',
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
