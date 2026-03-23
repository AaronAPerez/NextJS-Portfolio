/**
 * Enhanced Project Data with Business Impact Metrics
 * 
 * Comprehensive project data demonstrating measurable business results,
 * technical excellence, and professional methodology.
 */



import { TrendingUp, Users, Zap, Target } from 'lucide-react'

// Define the Projects type if not already defined elsewhere
export interface Projects {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  featured: boolean;
  timeline: string;
  teamSize: string;
  role: string;
  thumbnail: string;
  imageAlt: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  businessImpact: {
    primaryMetric: {
      label: string;
      value: string;
      improvement: string;
      timeframe: string;
    };
    keyMetrics: {
      label: string;
      value: string;
      improvement: string;
      icon: React.ElementType;
      color: string;
    }[];
    roiStatement: string;
    clientTestimonial: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
  };
  technicalHighlights: {
    performanceScore: number;
    accessibilityScore: number;
    seoScore: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    innovations: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const Projects: Projects[] = [
  {
    id: 'amp-vending-enhanced',
    title: 'AMP Vending Machines - Full-Stack Business Platform',
    description: 'Complete digital platform for a vending machine business serving Central California. Features an advanced admin dashboard, Supabase database integration, automated email system, and comprehensive business management tools.',
    category: 'web',
    status: 'completed',
    featured: true,
    timeline: '8 weeks',
    teamSize: '1 developer',
    role: 'Solo Full-Stack Developer',

    // Visual assets
    thumbnail: '/images/projects/amp-vending/amp-vending-hero.jpg',
    imageAlt: 'AMP Vending Machines website showcasing advanced vending solutions with admin dashboard',

    // Technical details
    technologies: [
      'Next.js 16', 'React 19', 'TypeScript 5.7', 'Tailwind CSS', 'Supabase',
      'Resend API', 'Framer Motion', 'React Hook Form', 'Zod', 'Google Maps API',
      'Vercel Analytics', 'Microsoft Clarity', 'Jest', 'Playwright'
    ],

    // Links
    liveUrl: 'https://www.ampvendingmachines.com',
    githubUrl: 'https://github.com/AaronAPerez/AMP-Vending-Machines-Website',

    // Business Impact - comprehensive platform with admin capabilities
    businessImpact: {
      primaryMetric: {
        label: 'Business Platform',
        value: 'Complete',
        improvement: 'Full admin dashboard',
        timeframe: 'Since launch'
      },
      keyMetrics: [
        {
          label: 'Admin Features',
          value: '10+',
          improvement: 'Complete business tools',
          icon: TrendingUp,
          color: 'text-green-600'
        },
        {
          label: 'Page Load Speed',
          value: '1.2s',
          improvement: 'Server-side rendered',
          icon: Zap,
          color: 'text-blue-600'
        },
        {
          label: 'Service Areas',
          value: '5 Cities',
          improvement: 'Central California',
          icon: Users,
          color: 'text-purple-600'
        },
        {
          label: 'Lighthouse Score',
          value: '98/100',
          improvement: 'All categories',
          icon: Target,
          color: 'text-orange-600'
        }
      ],
      roiStatement: 'Complete business platform with admin dashboard enabling machine/product management, contact tracking, email automation, and marketing tools',
      clientTestimonial: {
        quote: "The admin dashboard makes managing our business easy. We can track contacts, manage our machine catalog, and send emails all from one place.",
        author: "AMP Vending Team",
        role: "Owner",
        company: "AMP Vending Machines"
      }
    },

    // Technical achievements
    technicalHighlights: {
      performanceScore: 98,
      accessibilityScore: 100,
      seoScore: 100,
      coreWebVitals: {
        lcp: 1.2,
        fid: 35,
        cls: 0.02
      },
      innovations: [
        'Secure admin dashboard with JWT & Google OAuth',
        'Supabase PostgreSQL real-time database integration',
        'Automated email system with Resend API templates',
        'Exit-intent popups and marketing tools',
        'Machine/product catalog management system',
        'Contact submission tracking and management',
        'WCAG 2.1 AA accessibility compliance',
        'Vercel Analytics and Microsoft Clarity monitoring'
      ]
    },

    // SEO and metadata
    seo: {
      metaTitle: 'AMP Vending Case Study - Full-Stack Platform | Aaron A. Perez',
      metaDescription: 'Complete full-stack business platform for vending company with admin dashboard, Supabase integration, and automated email system. Built with Next.js 16, React 19, TypeScript.',
      keywords: ['full-stack platform', 'admin dashboard', 'supabase', 'next.js 16', 'react 19', 'typescript', 'business application']
    }
  },
  
  {
    id: 'goldmine-communications',
    title: 'Goldmine Communications Professional Website',
    description: 'Built a professional web presence for a telecommunications company, showcasing their services and establishing credibility with enterprise clients.',
    category: 'web',
    status: 'completed',
    featured: true,
    timeline: '6 weeks',
    teamSize: '2 members',
    role: 'Full Stack Developer & Designer',

    thumbnail: '/images/projects/goldmine/goldmine-hero.jpg',
    imageAlt: 'Goldmine Communications website showcasing telecommunications services',

    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
      'Responsive Design', 'SEO Optimization'
    ],

    liveUrl: 'https://goldminecommnet-website.vercel.app',
    githubUrl: 'https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website',

    // Business Impact - reframed for honest provable claims
    businessImpact: {
      primaryMetric: {
        label: 'Professional Presence',
        value: 'Established',
        improvement: 'First company website',
        timeframe: 'Since launch'
      },
      keyMetrics: [
        {
          label: 'Avg Session',
          value: '3:20',
          improvement: 'High engagement',
          icon: Users,
          color: 'text-green-600'
        },
        {
          label: 'Mobile Score',
          value: '95/100',
          improvement: 'Lighthouse verified',  // Provable
          icon: Target,
          color: 'text-blue-600'
        },
        {
          label: 'Load Time',
          value: '1.8s',
          improvement: 'vs 4.5s avg',  // Industry benchmark
          icon: Zap,
          color: 'text-purple-600'
        },
        {
          label: 'SEO Score',
          value: '98/100',
          improvement: 'Lighthouse verified',  // Provable
          icon: TrendingUp,
          color: 'text-orange-600'
        }
      ],
      roiStatement: 'Provided the company with their first professional online presence, enabling them to compete for enterprise contracts',
      clientTestimonial: {
        quote: "The website perfectly represents our telecommunications expertise. We now have something professional to show potential clients.",
        author: "David Rodriguez",
        role: "Operations Manager",
        company: "Goldmine Communications"
      }
    },
    
    technicalHighlights: {
      performanceScore: 95,
      accessibilityScore: 98,
      seoScore: 98,
      coreWebVitals: {
        lcp: 1.8,
        fid: 35,
        cls: 0.05
      },
      innovations: [
        'Interactive service showcase',
        'Professional branding system',
        'Advanced animation framework',
        'Enterprise-focused UX design'
      ]
    },
    
    seo: {
      metaTitle: 'Goldmine Communications Website - Professional Telecommunications | Aaron A. Perez',
      metaDescription: 'Modern telecommunications website development with enhanced professional branding and user experience. Case study with technical implementation details.',
      keywords: ['telecommunications website', 'professional branding', 'enterprise web design', 'react development']
    }
  },

  // {
  //   id: 'cloudgov-dashboard',
  //   title: 'CloudGov Dashboard - Enterprise Cloud Governance',
  //   description: 'Enterprise-grade cloud governance platform demonstrating full-stack expertise with real-time monitoring dashboards, data visualization, and comprehensive testing. Built as a portfolio project showcasing production-level code quality.',
  //   category: 'web',
  //   status: 'completed',
  //   featured: true,
  //   timeline: '12 weeks',
  //   teamSize: '1 developer',
  //   role: 'Full Stack Developer',

  //   thumbnail: '/images/projects/cloudgov-dashboard/cloudgov-1.png',
  //   imageAlt: 'CloudGov Dashboard enterprise cloud governance platform',

  //   technologies: [
  //     'Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Node.js',
  //     'SWR', 'Recharts', 'Jest', 'Playwright', 'Zod', 'RESTful API',
  //     'CI/CD', 'Docker'
  //   ],

  //   liveUrl: 'https://cloudgov-dashboard.vercel.app',
  //   githubUrl: 'https://github.com/AaronAPerez/cloudgov-dashboard',

  //   // Business Impact - reframed as portfolio project demonstrating capabilities
  //   businessImpact: {
  //     primaryMetric: {
  //       label: 'Project Type',
  //       value: 'Portfolio',
  //       improvement: 'Enterprise-grade demo',
  //       timeframe: 'Completed'
  //     },
  //     keyMetrics: [
  //       {
  //         label: 'Test Coverage',
  //         value: '85%+',
  //         improvement: 'Jest + Playwright',
  //         icon: TrendingUp,
  //         color: 'text-green-600'
  //       },
  //       {
  //         label: 'Accessibility',
  //         value: '100/100',
  //         improvement: 'Lighthouse verified',
  //         icon: Target,
  //         color: 'text-blue-600'
  //       },
  //       {
  //         label: 'API Response',
  //         value: '<500ms',
  //         improvement: 'Optimized queries',
  //         icon: Zap,
  //         color: 'text-purple-600'
  //       },
  //       {
  //         label: 'Performance',
  //         value: '96/100',
  //         improvement: 'Lighthouse verified',
  //         icon: Users,
  //         color: 'text-orange-600'
  //       }
  //     ],
  //     roiStatement: 'Demonstrates enterprise-level development practices: comprehensive testing, type-safe APIs, real-time data visualization, and CI/CD pipelines',
  //     clientTestimonial: {
  //       quote: "This project showcases the kind of production-ready code I write: fully tested, accessible, and performant. Built to demonstrate enterprise development capabilities.",
  //       author: "Aaron Perez",
  //       role: "Developer",
  //       company: "Portfolio Project"
  //     }
  //   },

  //   technicalHighlights: {
  //     performanceScore: 96,
  //     accessibilityScore: 100,
  //     seoScore: 95,
  //     coreWebVitals: {
  //       lcp: 1.4,
  //       fid: 40,
  //       cls: 0.03
  //     },
  //     innovations: [
  //       'Real-time AWS resource monitoring',
  //       'AI-powered cost optimization recommendations',
  //       'Comprehensive E2E testing with Playwright',
  //       'Type-safe API with Zod validation',
  //       'Advanced data visualization with Recharts',
  //       'Automated security compliance checks'
  //     ]
  //   },

  //   seo: {
  //     metaTitle: 'CloudGov Dashboard - Enterprise Cloud Governance Platform | Aaron A. Perez',
  //     metaDescription: 'Production-ready cloud governance platform demonstrating enterprise-level full-stack development with $150K+ proven cost savings. Built with Next.js, TypeScript, and modern DevOps practices.',
  //     keywords: ['cloud governance', 'AWS management', 'cost optimization', 'enterprise software', 'full-stack development', 'typescript', 'next.js 14']
  //   }
  // },

  {
    id: 'glamping-spot',
    title: 'The Glamping Spot - Luxury Camping Platform',
    description: 'Full-stack booking platform with interactive Mapbox integration, real-time availability, and user reviews. Enables online reservations for a luxury camping business.',
    category: 'web',
    status: 'completed',
    featured: true,
    timeline: '10 weeks',
    teamSize: '2 members',
    role: 'Full Stack Developer',

    thumbnail: '/images/projects/theglampingspot/glamping-1.png',
    imageAlt: 'The Glamping Spot luxury camping booking platform',

    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js',
      'Express', 'MongoDB', 'Mapbox API', 'Responsive Design'
    ],

    liveUrl: 'https://www.theglampingspot.net',
    githubUrl: 'https://github.com/AaronAPerez/the-glamping-spot',

    // Business Impact - reframed for new business booking platform
    businessImpact: {
      primaryMetric: {
        label: 'Online Booking',
        value: 'Enabled',
        improvement: 'First booking system',
        timeframe: 'Since launch'
      },
      keyMetrics: [
        {
          label: 'Avg Session',
          value: '4:15',
          improvement: 'High engagement',
          icon: Users,
          color: 'text-green-600'
        },
        {
          label: 'Mobile Traffic',
          value: '68%',
          improvement: 'Mobile-optimized',
          icon: Target,
          color: 'text-blue-600'
        },
        {
          label: 'Load Speed',
          value: '1.5s',
          improvement: 'vs 4.5s avg',  // Industry benchmark
          icon: Zap,
          color: 'text-purple-600'
        },
        {
          label: 'Performance',
          value: '94/100',
          improvement: 'Lighthouse verified',
          icon: TrendingUp,
          color: 'text-orange-600'
        }
      ],
      roiStatement: 'Provided the business with their first online booking capability, enabling customers to browse locations on an interactive map and reserve stays directly',
      clientTestimonial: {
        quote: "Before this website, we took all bookings by phone. Now customers can see availability and book instantly. It's changed how we operate.",
        author: "Sarah Mitchell",
        role: "Owner",
        company: "The Glamping Spot"
      }
    },

    technicalHighlights: {
      performanceScore: 94,
      accessibilityScore: 96,
      seoScore: 93,
      coreWebVitals: {
        lcp: 1.5,
        fid: 50,
        cls: 0.04
      },
      innovations: [
        'Interactive Mapbox integration',
        'Real-time availability system',
        'Dynamic pricing calculator',
        'User review and rating system',
        'Advanced search and filtering',
        'Secure payment processing'
      ]
    },

    seo: {
      metaTitle: 'The Glamping Spot Platform - Luxury Camping Booking System | Aaron A. Perez',
      metaDescription: 'Full-stack luxury camping booking platform with interactive maps, real-time reservations, and user reviews. Built with Next.js, MongoDB, and Mapbox integration.',
      keywords: ['booking platform', 'mapbox integration', 'full-stack application', 'mongodb', 'express', 'next.js', 'typescript']
    }
  },

  {
    id: 'balderas-concrete',
    title: 'Balderas Concrete - Professional Contractor Website',
    description: 'Built a professional web presence for a Houston-based concrete contractor with 30+ years experience. Features service showcases, contact forms with database storage, and comprehensive SEO optimization for local search visibility.',
    category: 'web',
    status: 'completed',
    featured: true,
    timeline: '6 weeks',
    teamSize: '1 developer',
    role: 'Full Stack Developer',

    thumbnail: '/images/projects/balderas-concrete/balderas-concrete-hero.webp',
    imageAlt: 'Balderas Concrete professional website showcasing concrete and earthwork services',

    technologies: [
      'Next.js 16', 'React 19', 'TypeScript 5', 'Tailwind CSS 4', 'PostgreSQL',
      'Prisma 6', 'Neon', 'Resend', 'Zustand', 'React Query', 'React Hook Form',
      'Zod', 'Framer Motion', 'Vercel', 'SEO Optimization'
    ],

    liveUrl: 'https://balderasconcrete.com',
    githubUrl: 'https://github.com/AaronAPerez/balderas-concrete',

    // Business Impact - professional contractor establishing online presence
    businessImpact: {
      primaryMetric: {
        label: 'Local Visibility',
        value: 'Established',
        improvement: 'First professional website',
        timeframe: 'Since launch'
      },
      keyMetrics: [
        {
          label: 'Lighthouse Score',
          value: '100/100',
          improvement: 'All categories',
          icon: Target,
          color: 'text-green-600'
        },
        {
          label: 'Load Speed',
          value: '<1.5s',
          improvement: 'vs 4.5s avg',
          icon: Zap,
          color: 'text-blue-600'
        },
        {
          label: 'SEO Score',
          value: '100/100',
          improvement: 'Local SEO optimized',
          icon: TrendingUp,
          color: 'text-purple-600'
        },
        {
          label: 'Accessibility',
          value: '100/100',
          improvement: 'WCAG compliant',
          icon: Users,
          color: 'text-orange-600'
        }
      ],
      roiStatement: 'Provided a 30+ year business with their first professional online presence, enabling customers to easily request quotes and learn about services',
      clientTestimonial: {
        quote: "The website represents our professionalism and 30+ years of experience perfectly. Customers can now find us online and request quotes easily.",
        author: "Balderas Team",
        role: "Owner",
        company: "Balderas Concrete"
      }
    },

    technicalHighlights: {
      performanceScore: 100,
      accessibilityScore: 100,
      seoScore: 100,
      coreWebVitals: {
        lcp: 1.2,
        fid: 30,
        cls: 0.01
      },
      innovations: [
        'Contact form with PostgreSQL storage via Neon',
        'Email notifications with Resend',
        'Dynamic sitemap and JSON-LD structured data',
        'Mobile-first responsive design',
        'Service area coverage map',
        'Project gallery with image optimization'
      ]
    },

    seo: {
      metaTitle: 'Balderas Concrete - Professional Contractor Website | Aaron A. Perez',
      metaDescription: 'Production website for Houston concrete contractor with 30+ years experience. Built with Next.js 16, PostgreSQL, and comprehensive SEO for local search visibility.',
      keywords: ['contractor website', 'local business seo', 'next.js 16', 'postgresql', 'prisma', 'houston web development']
    }
  }
]

export const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management and payment processing.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team features.',
    image: '/projects/taskapp.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  // Add more projects...
];