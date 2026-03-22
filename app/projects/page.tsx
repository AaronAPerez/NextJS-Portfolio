'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Server,
  Database,
  Shield,
  Mail,
  BarChart3,
  MapPin,
  Users,
  Zap,
  CheckCircle2,
  Code2,
  Layers,
  Terminal,
  Globe,
  Sparkles,
  Settings,
  Layout
} from 'lucide-react';

/**
 * Project Details Data
 * Contains comprehensive information about each project for the case study display
 */
const projectDetails = [
  {
    id: 'amp-vending',
    slug: 'amp-vending',
    title: "AMP Vending Machines",
    tagline: "Full-Stack Business Platform with Admin Dashboard",
    type: "Production Client Project",
    description: "Complete digital platform for a vending machine business serving Central California, featuring an advanced admin dashboard and comprehensive business tools",

    problem: "A vending machine business needed a professional web platform to compete with established companies, attract B2B clients (corporate offices, healthcare facilities, schools), and manage their operations efficiently with an admin dashboard.",

    // Organized features by category for better visual presentation
    features: {
      frontend: [
        "Next.js 16 App Router with React Server Components",
        "React 19 with TypeScript 5.7 for type safety",
        "Responsive design with Tailwind CSS",
        "Smooth animations with Framer Motion",
        "WCAG 2.1 AA accessibility compliance"
      ],
      backend: [
        "Supabase PostgreSQL real-time database",
        "JWT & Google OAuth authentication",
        "Resend API for transactional emails",
        "RESTful API endpoints",
        "Server-side rendering for SEO"
      ],
      admin: [
        "Secure dashboard with role-based access",
        "Machine & product catalog management",
        "Contact submission tracking",
        "Email template customization",
        "SEO configuration panel",
        "Marketing tools (exit-intent popups)"
      ],
      analytics: [
        "Vercel Analytics integration",
        "Microsoft Clarity user insights",
        "Performance monitoring",
        "Conversion tracking"
      ]
    },

    challenges: [
      {
        title: "Admin Dashboard UX",
        description: "Building an intuitive admin interface for non-technical users to manage their business"
      },
      {
        title: "Multi-Provider Auth",
        description: "Implementing secure authentication with JWT tokens and Google OAuth seamlessly"
      },
      {
        title: "Email Automation",
        description: "Creating a reliable automated email notification system with customizable templates"
      },
      {
        title: "Performance at Scale",
        description: "Optimizing performance with large product catalogs and image-heavy content"
      }
    ],

    solutions: [
      "Used Supabase for real-time database and built-in authentication",
      "Implemented React Hook Form with Zod for robust form validation",
      "Built modular admin components for machine/product management",
      "Added Resend API integration for transactional emails",
      "Created SEO configuration panel in admin dashboard",
      "Implemented code splitting and lazy loading for performance"
    ],

    results: [
      { label: "Lighthouse Score", value: "98", suffix: "/100", icon: Zap, color: "text-green-400" },
      { label: "Load Time", value: "<1.2", suffix: "s", icon: BarChart3, color: "text-blue-400" },
      { label: "Admin Features", value: "10", suffix: "+", icon: Settings, color: "text-purple-400" },
      { label: "Service Areas", value: "5", suffix: " Cities", icon: MapPin, color: "text-orange-400" }
    ],

    // Categorized tech stack for visual grouping
    techStack: {
      frontend: ["Next.js 16", "React 19", "TypeScript 5.7", "Tailwind CSS", "Framer Motion"],
      backend: ["Supabase", "PostgreSQL", "Resend API", "Zod"],
      tools: ["Jest", "Playwright", "Vercel", "Google Maps API"],
      monitoring: ["Vercel Analytics", "Microsoft Clarity"]
    },

    myRole: "Solo Full-Stack Developer",
    responsibilities: ["Architecture", "UI/UX Design", "Frontend Development", "Backend Development", "Database Design", "Deployment & DevOps"],
    timeline: "8 weeks",
    status: "Live in Production",

    images: ["/images/projects/amp-vending/amp-vending-1.png"],
    demoLink: "https://www.ampvendingmachines.com",
    codeLink: "https://github.com/AaronAPerez/AMP-Vending-Machines-Website",

    keyLearnings: [
      "Architected a complete full-stack application with admin capabilities",
      "Implemented secure authentication flows with multiple providers",
      "Built automated email systems for business notifications",
      "Created reusable admin components for content management",
      "Integrated analytics and monitoring for production insights"
    ]
  },

  {
    id: 'cloudgov-dashboard',
    slug: 'cloudgov-dashboard',
    title: "CloudGov Dashboard",
    tagline: "Enterprise Cloud Management Platform",
    type: "Portfolio/Job Application Project",
    description: "Full-stack AWS resource management dashboard built to demonstrate qualifications for Software Developer position at Lawrence Livermore National Laboratory",

    problem: "Needed to demonstrate enterprise-level development skills including AWS integration, real-time data handling, security best practices, and production-ready code quality.",

    features: {
      frontend: [
        "Next.js 14 with React 18",
        "TypeScript for complete type safety",
        "Interactive data visualizations with Recharts",
        "Responsive dashboard layouts",
        "Accessible UI components"
      ],
      backend: [
        "RESTful API design",
        "Data caching with SWR",
        "Mock AWS resource monitoring",
        "Zod schema validation"
      ],
      admin: [
        "Real-time resource monitoring",
        "Cost optimization recommendations",
        "Security compliance tracking",
        "User management interface"
      ],
      analytics: [
        "Performance metrics dashboard",
        "Resource utilization graphs",
        "Cost trend analysis"
      ]
    },

    challenges: [
      {
        title: "Enterprise Simulation",
        description: "Simulating enterprise AWS features without real AWS access"
      },
      {
        title: "Data Visualization",
        description: "Implementing complex interactive charts and graphs"
      },
      {
        title: "Testing Coverage",
        description: "Writing production-quality tests with high coverage"
      },
      {
        title: "Security Patterns",
        description: "Demonstrating security best practices in code"
      }
    ],

    solutions: [
      "Built realistic mock data generators",
      "Implemented data caching with SWR",
      "Created modular, testable components",
      "Used TypeScript for type safety",
      "Documented architecture decisions",
      "Set up professional git workflow"
    ],

    results: [
      { label: "Test Coverage", value: "85", suffix: "%", icon: CheckCircle2, color: "text-green-400" },
      { label: "Type Safety", value: "100", suffix: "%", icon: Code2, color: "text-blue-400" },
      { label: "Code Quality", value: "A", suffix: " Grade", icon: BarChart3, color: "text-purple-400" },
      { label: "Documentation", value: "Complete", suffix: "", icon: Layers, color: "text-orange-400" }
    ],

    techStack: {
      frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Recharts"],
      backend: ["SWR", "Zod", "REST API"],
      tools: ["Jest", "Playwright", "Docker", "ESLint"],
      monitoring: ["Performance Testing"]
    },

    myRole: "Solo Developer",
    responsibilities: ["Architecture", "Development", "Testing", "Documentation", "CI/CD Setup"],
    timeline: "4 weeks",
    status: "Portfolio Showcase",

    images: ["/images/projects/cloudgov-dashboard/cloudgov-1.png"],
    demoLink: "https://cloudgov-dashboard.vercel.app",
    codeLink: "https://github.com/YOUR_USERNAME/cloudgov-dashboard",

    keyLearnings: [
      "How to structure enterprise-scale applications",
      "Importance of comprehensive testing",
      "Writing production-ready documentation",
      "Implementing complex state management",
      "Creating professional developer experience"
    ]
  }
];

/**
 * Feature Card Component
 * Displays a feature category with icon and list of items
 */
function FeatureCard({
  title,
  items,
  icon: Icon,
  gradient
}: {
  title: string;
  items: string[];
  icon: React.ElementType;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${gradient} p-6`}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-white">{title}</h4>
        </div>

        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/**
 * Tech Badge Component
 * Displays a single technology with hover effect
 */
function TechBadge({ tech, delay = 0 }: { tech: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.05 }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition-colors"
    >
      <Code2 className="h-3 w-3 text-blue-400" />
      {tech}
    </motion.span>
  );
}

/**
 * Metric Card Component
 * Displays a result metric with animated value
 */
function MetricCard({
  label,
  value,
  suffix,
  icon: Icon,
  color,
  delay = 0
}: {
  label: string;
  value: string;
  suffix: string;
  icon: React.ElementType;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-blue-500/50 hover:bg-white/10"
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-10" />

      <div className="relative flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-bold ${color}`}>{value}</span>
            <span className="text-lg text-gray-400">{suffix}</span>
          </div>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Challenge Card Component
 * Displays a challenge with title and description
 */
function ChallengeCard({
  title,
  description,
  index
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-orange-500/30 hover:bg-white/10"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
        <span className="text-sm font-bold">{index + 1}</span>
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}

/**
 * Projects Page Component
 * Main page displaying project case studies with comprehensive details
 */
export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400"
            >
              <Terminal className="h-4 w-4" />
              <span>Production Projects & Case Studies</span>
            </motion.div>

            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Project{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Case Studies
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Real-world projects built for real businesses. Each project showcases
              full-stack development skills, problem-solving abilities, and
              attention to production-quality code.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="space-y-24">
          {projectDetails.map((project, projectIndex) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Project Number Indicator */}
              <div className="absolute -left-4 top-0 hidden text-8xl font-bold text-white/5 lg:block">
                {String(projectIndex + 1).padStart(2, '0')}
              </div>

              {/* Main Project Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">

                {/* Project Header */}
                <div className="border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30">
                      <Globe className="h-3 w-3" />
                      {project.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/30">
                      <Sparkles className="h-3 w-3" />
                      {project.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/30">
                      <Users className="h-3 w-3" />
                      {project.myRole}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-xl text-gray-400">{project.tagline}</p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    <motion.a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Site
                    </motion.a>
                    <motion.a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
                    >
                      <Github className="h-4 w-4" />
                      View Source Code
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8 space-y-12">

                  {/* Problem Statement */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                        <Layers className="h-5 w-5 text-orange-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">The Problem</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
                      {project.problem}
                    </p>
                  </motion.section>

                  {/* Results Metrics */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                        <BarChart3 className="h-5 w-5 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Results & Metrics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {project.results.map((result, i) => (
                        <MetricCard
                          key={result.label}
                          label={result.label}
                          value={result.value}
                          suffix={result.suffix}
                          icon={result.icon}
                          color={result.color}
                          delay={i}
                        />
                      ))}
                    </div>
                  </motion.section>

                  {/* Features Grid */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                        <Code2 className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">What I Built</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FeatureCard
                        title="Frontend"
                        items={project.features.frontend}
                        icon={Layout}
                        gradient="from-blue-500/10 to-cyan-500/10"
                      />
                      <FeatureCard
                        title="Backend & Database"
                        items={project.features.backend}
                        icon={Database}
                        gradient="from-purple-500/10 to-pink-500/10"
                      />
                      <FeatureCard
                        title="Admin Dashboard"
                        items={project.features.admin}
                        icon={Settings}
                        gradient="from-orange-500/10 to-red-500/10"
                      />
                      <FeatureCard
                        title="Analytics & Monitoring"
                        items={project.features.analytics}
                        icon={BarChart3}
                        gradient="from-green-500/10 to-emerald-500/10"
                      />
                    </div>
                  </motion.section>

                  {/* Challenges & Solutions */}
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* Challenges */}
                    <motion.section
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20">
                          <Zap className="h-5 w-5 text-orange-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Challenges</h3>
                      </div>
                      <div className="space-y-3">
                        {project.challenges.map((challenge, i) => (
                          <ChallengeCard
                            key={i}
                            title={challenge.title}
                            description={challenge.description}
                            index={i}
                          />
                        ))}
                      </div>
                    </motion.section>

                    {/* Solutions */}
                    <motion.section
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20">
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Solutions</h3>
                      </div>
                      <div className="space-y-3">
                        {project.solutions.map((solution, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                          >
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                              <CheckCircle2 className="h-4 w-4 text-green-400" />
                            </div>
                            <p className="text-gray-300">{solution}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  </div>

                  {/* Tech Stack */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                        <Terminal className="h-5 w-5 text-violet-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Technology Stack</h3>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(project.techStack).map(([category, techs]) => (
                        <div key={category} className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 min-w-[100px]">
                            {category}:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, i) => (
                              <TechBadge key={tech} tech={tech} delay={i} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>

                  {/* Key Learnings */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                        <Sparkles className="h-5 w-5 text-yellow-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Key Learnings</h3>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {project.keyLearnings.map((learning, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-xl">💡</span>
                          <p className="text-gray-300">{learning}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>

                  {/* Project Meta Info */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-400">Role:</span>
                        <span className="text-sm font-semibold text-white">{project.myRole}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-400">Timeline:</span>
                        <span className="text-sm font-semibold text-white">{project.timeline}</span>
                      </div>
                    </div>

                    <motion.a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <span>View Full Source Code</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
