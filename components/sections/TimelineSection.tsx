'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Building,
  Award,
  ExternalLink,
  Globe,
  Zap
} from 'lucide-react'
import { cn } from "@/lib/utils"
import SectionTitle from '@/components/SectionTitle'
import { BackgroundBeams } from '@/components/ui/background-beams'

// Enhanced timeline data with improved structure and new role
const timelineData = {
  education: [
    {
      id: 'codestack',
      title: "Full Stack Development Certification",
      institution: "CodeStack Academy",
      period: "2023 - 2024",
      location: "San Joaquin County, CA",
      type: "certification",
      status: "completed",
      details: [
        "Frontend Development: React, TypeScript, Next.js, Tailwind CSS with advanced component architecture",
        "Backend Development: C#, .NET Core, SQL Server, RESTful APIs with authentication and authorization",
        "DevOps & Tools: Git version control, Azure cloud services, CI/CD pipelines, VS Code, Postman API testing",
        "Built 5+ full-stack applications including expense trackers, game databases, and business websites with responsive design",
        "Collaborative development using Agile methodologies with sprint planning and code reviews",
        "Database design with Entity Framework, migrations, and performance optimization"
      ],
      skills: ["React", "TypeScript", "Next.js", "C#", ".NET Core", "SQL Server", "Azure", "Tailwind CSS"],
      gradient: "from-blue-500 to-cyan-500",
      achievements: [
        "Top 10% of cohort for project completion",
        "Built 5 production-ready applications",
        "100% test coverage on final capstone project"
      ]
    },
    {
      id: 'itt-tech',
      title: "BS Information Systems & Cyber Security",
      institution: "ITT Technical Institute",
      period: "Graduated 2016",
      location: "Rancho Cordova, CA",
      type: "degree",
      status: "completed",
      details: [
        "Network Systems Administration and Security with hands-on lab experience",
        "Information Security and Risk Management including vulnerability assessments",
        "Database Design and Management using SQL Server and Oracle",
        "System Analysis and Design with UML modeling and requirements gathering",
        "Senior Capstone Project: Designed secure network infrastructure for small business",
        "Graduated Cum Laude with GPA: 3.5/4.0"
      ],
      skills: ["Network Security", "Database Management", "System Administration", "Risk Management"],
      gradient: "from-purple-500 to-pink-500",
      achievements: [
        "Cum Laude Graduate (GPA: 3.5)",
        "Dean's List: 4 semesters",
        "Senior Capstone Award recipient"
      ]
    }
  ],
  experience: [
    {
      id: 'amp-vending',
      title: "Full Stack Developer",
      company: "AMP Vending Machines",
      period: "Mar 2025 - Present",
      location: "Modesto, CA (Remote)",
      type: "work",
      status: "current",
      website: "https://www.ampvendingmachines.com",
      details: [
        "Architected and developed complete digital presence showcasing premium vending solutions for Central California businesses",
        "Built comprehensive Next.js application using TypeScript and React with advanced features including dynamic product showcases and interactive contact forms",
        "Developed WCAG-compliant components ensuring inclusive user experiences across all device types and assistive technologies",
        "Implemented advanced SEO strategies including structured data (JSON-LD), dynamic meta tags, and OpenGraph optimization resulting in enhanced search visibility",
        "Created scalable component architecture with reusable UI elements and custom hooks for seamless mobile-to-desktop experiences",
        "Integrated third-party services including email automation, Google Maps, Zod form validation, and analytics tracking for comprehensive business insights",
        "Designed complete product catalog system with dynamic routing and optimized image delivery for technical specifications showcase",
        "Established automated deployment pipelines and performance optimization achieving sub-800ms load times",
        "Ongoing maintenance, feature enhancements, and performance monitoring supporting company growth and customer acquisition"
      ],
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SEO", "WCAG Accessibility", "Zod", "Google Maps API", "Performance Optimization"],
      gradient: "from-emerald-500 to-teal-500",
      achievements: [
        "Improved page load speed from 3s to 800ms",
        "Achieved 100% WCAG AA compliance",
        "Increased organic search traffic by 150%",
        "Built mobile-first responsive design with 98% mobile compatibility"
      ]
    },
    {
      id: 'user-support',
      title: "User Support Specialist",
      company: "San Joaquin County Office of Education - CodeStack",
      period: "2017 - Present",
      location: "Stockton, CA",
      type: "work",
      status: "current",
      details: [
        "QA testing and validation for educational software systems ensuring 99% uptime for critical SEIS platform",
        "Technical support and troubleshooting for SEIS (Special Education Information System) serving 50+ school districts",
        "Compliance validation and data quality assurance for state reporting with zero compliance violations",
        "Help desk support and ticket management using Freshdesk and Zoho with 95% first-call resolution rate",
        "Training and onboarding new users with comprehensive documentation and video tutorials",
        "Database maintenance and user account management for 5,000+ active users across multiple systems",
        "Created automated testing scripts reducing manual QA time by 60%"
      ],
      skills: ["QA Testing", "Technical Support", "Database Management", "Freshdesk", "Zoho", "Documentation", "Training"],
      gradient: "from-green-500 to-emerald-500",
      achievements: [
        "Maintained 99% system uptime",
        "95% first-call resolution rate",
        "Reduced QA testing time by 60%",
        "Zero compliance violations in 7 years"
      ]
    },
    {
      id: 'systems-analyst',
      title: "Information Systems Analyst",
      company: "San Joaquin County - Information Systems Division",
      period: "2017",
      location: "Stockton, CA",
      type: "work",
      status: "completed",
      details: [
        "Help desk support for 2,000+ county employees across 15+ departments with 24/7 coverage",
        "Workstation setup, configuration, and maintenance including Windows domain management",
        "Technical troubleshooting and issue resolution with average resolution time under 4 hours",
        "User account management and software deployment using Microsoft SCCM and Active Directory",
        "Network troubleshooting and system maintenance ensuring minimal downtime during business hours",
        "Emergency response coordination during system outages and security incidents"
      ],
      skills: ["Help Desk", "System Administration", "Network Support", "Active Directory", "SCCM", "Windows Server"],
      gradient: "from-orange-500 to-red-500",
      achievements: [
        "Supported 2,000+ users across 15 departments",
        "Average ticket resolution: 4 hours",
        "98% customer satisfaction rating",
        "Led emergency response for critical outages"
      ]
    }
  ]
}

// TypeScript interfaces for better type safety
interface TimelineItem {
  id: string
  title: string
  company?: string
  institution?: string
  period: string
  location: string
  type: 'work' | 'education' | 'certification' | 'degree'
  status: 'completed' | 'current'
  details: string[]
  skills: string[]
  gradient: string
  achievements?: string[]
  website?: string
}

interface TimelineCardProps extends TimelineItem {
  delay?: number
}

/**
 * Individual Timeline Card Component
 */
const TimelineCard = ({
  title,
  company,
  institution,
  period,
  location,
  details,
  skills,
  delay = 0,
  type,
  status,
  gradient,
  achievements = [],
  website
}: TimelineCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-6 h-6" aria-hidden="true" />
      case 'education':
      case 'degree':
        return <GraduationCap className="w-6 h-6" aria-hidden="true" />
      case 'certification':
        return <Award className="w-6 h-6" aria-hidden="true" />
      default:
        return <Star className="w-6 h-6" aria-hidden="true" />
    }
  }

  const getStatusBadge = () => {
    if (status === 'current') {
      return (
        <div
          className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full"
          role="status"
          aria-label="Currently employed"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
          Current
        </div>
      )
    }
    return (
      <div
        className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full"
        role="status"
        aria-label="Previously completed"
      >
        <CheckCircle className="w-3 h-3" aria-hidden="true" />
        Completed
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
      role="article"
      aria-labelledby={`${type}-${title.replace(/\s+/g, '-').toLowerCase()}`}
      tabIndex={0}
    >
      {/* Main card with consistent styling */}
      <div className="relative h-full backdrop-blur-sm bg-black/40 border border-white/10 dark:border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-slate-500/50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">

        {/* Gradient header */}
        <div className={cn("p-6 bg-gradient-to-r", gradient, "relative overflow-hidden")}>
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute inset-0 bg-grid-white/20" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {getIcon()}
                </div>
                {getStatusBadge()}
              </div>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors"
                  aria-label={`Visit ${company || institution} website`}
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              )}
            </div>

            <h3
              id={`${type}-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight"
            >
              {title}
            </h3>

            <div className="space-y-1 text-white/90">
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" aria-hidden="true" />
                <span>{company || institution}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time>{period}</time>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" aria-hidden="true" />
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" aria-hidden="true" />
        </div>

        {/* Card content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-300 dark:text-gray-300 mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              Key Responsibilities & Achievements
            </h4>
            <ul className="space-y-3" role="list">
              {details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + (idx * 0.1), duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-gray-400 dark:text-gray-300"
                  role="listitem"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {achievements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-300 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" aria-hidden="true" />
                Key Achievements
              </h4>
              <ul className="space-y-2" role="list">
                {achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-400 dark:text-gray-300"
                    role="listitem"
                  >
                    <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-gray-300 dark:text-gray-300 mb-3">
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Skills and technologies used">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium bg-gray-800/50 dark:bg-gray-800 text-gray-300 dark:text-gray-300 rounded-full border border-gray-700 dark:border-gray-700 hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
      </div>
    </motion.article>
  )
}

/**
 * Statistics Component
 */
// const Statistics = () => {
  // const stats = [
  //   { label: 'Years Experience', value: '8+', color: 'text-blue-600 dark:text-blue-400', icon: Briefcase },
  //   { label: 'Education Programs', value: '2', color: 'text-purple-600 dark:text-purple-400', icon: GraduationCap },
  //   { label: 'Current Roles', value: '2', color: 'text-green-600 dark:text-green-400', icon: Building },
  //   { label: 'Projects Built', value: '10+', color: 'text-orange-600 dark:text-orange-400', icon: Code }
  // ]

  // return (
  //   <motion.div
  //     initial={{ opacity: 0, y: 30 }}
  //     whileInView={{ opacity: 1, y: 0 }}
  //     viewport={{ once: true }}
  //     transition={{ duration: 0.6, delay: 0.8 }}
  //     className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
  //     role="region"
  //     aria-label="Professional statistics"
  //   >
      {/* {stats.map((stat, index) => { */}
        {/* const IconComponent = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + (index * 0.1), duration: 0.4 }}
            className="text-center p-6 backdrop-blur-sm bg-black/40 rounded-xl border border-white/10 dark:border-gray-700/50 hover:bg-black/50 dark:hover:bg-gray-800/70 hover:border-slate-500/50 transition-all duration-500"
          >
            <IconComponent className={cn("w-8 h-8 mx-auto mb-3", stat.color)} aria-hidden="true" />
            <div className={cn("text-3xl font-bold mb-2", stat.color)}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </motion.div> */}
        {/* ) */}
      {/* })} */}
//     </motion.div>
//   )
// }

/**
 * Main Timeline Section Component
 */
export const TimelineSection = () => {
  return (
    <div className="relative w-full overflow-hidden py-20">
      {/* Background Effects - consistent with other sections */}
      <BackgroundBeams className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle
          title="Professional Experience & Education"
          subtitle="My comprehensive journey in technology, from systems administration to full-stack development"
        />

        {/* <Statistics /> */}

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-12">
          {/* Experience Column */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-labelledby="work-experience-heading"
          >
            <div className="mb-8 text-center lg:text-left">
              <h3
                id="work-experience-heading"
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center lg:justify-start gap-3"
              >
                <Briefcase className="w-6 h-6 text-green-600" aria-hidden="true" />
                Work Experience
              </h3>
              <p className="text-gray-400 dark:text-gray-400">
                Professional experience spanning systems administration to full-stack development
              </p>
            </div>

            <div className="space-y-6">
              {timelineData.experience.map((item, index) => (
                <TimelineCard
                  key={item.id}
                  {...item}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </motion.section>

          {/* Education Column */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            aria-labelledby="education-heading"
          >
            <div className="mb-8 text-center lg:text-left">
              <h3
                id="education-heading"
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center lg:justify-start gap-3"
              >
                <GraduationCap className="w-6 h-6 text-purple-600" aria-hidden="true" />
                Education & Certifications
              </h3>
              <p className="text-gray-400 dark:text-gray-400">
                Academic foundation and continuous learning in technology and development
              </p>
            </div>

            <div className="space-y-6">
              {timelineData.education.map((item, index) => (
                <TimelineCard
                  key={item.id}
                  {...item}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </motion.section>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 dark:text-gray-300 mb-6 text-lg">
            Ready to see these skills in action?
          </p>
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects')
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Navigate to projects section"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" aria-hidden="true" />
              View My Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default TimelineSection
