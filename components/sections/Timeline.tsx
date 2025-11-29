'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Calendar,
} from 'lucide-react'
import TimelineCard from '../TimelineCard'
import { Container } from '../layout/Container'


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

// Enhanced timeline data with improved structure and new role
const timelineData: { education: TimelineItem[]; experience: TimelineItem[] } = {
  education: [
    {
      id: 'codestack',
      title: "Software Development Certification",
      institution: "CodeStack Academy",
      period: "2023 - 2024",
      location: "San Joaquin County, CA",
      type: "certification" as const,
      status: "completed" as const,
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
      // achievements: [
      //   "Top 10% of cohort for project completion",
      //   "Built 5 production-ready applications",
      //   "100% test coverage on final capstone project"
      // ]
    },
    {
      id: 'itt-tech',
      title: "BS Information Systems & Cyber Security",
      institution: "ITT Technical Institute",
      period: "Graduated 2016",
      location: "Rancho Cordova, CA",
      type: "degree" as const,
      status: "completed" as const,
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
      // achievements: [
      //   "Graduate (GPA: 3.5)",
      //   "Dean's List: 4 semesters",
      //   "Senior Capstone Award recipient"
      //]
    },
    {
      id: 'itt-tech-as',
      title: "AS Network System Administration",
      institution: "ITT Technical Institute",
      period: "2012 - 2014",
      location: "Lathrop, CA",
      type: "degree",
      status: "completed",
      details: [
        "Network Infrastructure and Administration with focus on Windows Server environments",
        "TCP/IP protocols, routing, switching, and network topology design",
        "Active Directory management, group policies, and domain administration",
        "Hardware installation, configuration, and troubleshooting for enterprise systems",
        "Network security fundamentals including firewalls, VPNs, and intrusion detection",
        "Hands-on lab experience with Cisco networking equipment and Windows Server"
      ],
      skills: ["Windows Server", "Active Directory", "TCP/IP", "Network Administration", "Cisco", "System Troubleshooting"],
      gradient: "from-indigo-500 to-blue-500",
      // achievements: [
      //   "Strong foundation in network infrastructure",
      //   "Hands-on experience with enterprise systems",
      //   "Prepared for IT career advancement"
      // ]
    }
  ],
  experience: [
    {
      id: 'amp-vending',
      title: "Full Stack Developer",
      company: "AMP Vending Machines",
      period: "Mar 2025 - Present",
      location: "Modesto, CA (Remote)",
      type: "work" as const,
      status: "current" as const,
      website: "https://www.ampvendingmachines.com",
      details: [
        "⭐ First Production Role: Transitioned from IT Support to Full Stack Development",
        "Architected and developed complete digital presence for AMP Vending Machines",
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
      period: "Aug. 2017 - Jan. 2025",
      location: "Stockton, CA",
      type: "work" as const,
      status: "completed" as const,
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
      // achievements: [
      //   "Maintained 99% system uptime",
      //   "95% first-call resolution rate",
      //   "Reduced QA testing time by 60%",
      //   "Zero compliance violations in 7 years"
      // ]
    },
    {
      id: 'systems-analyst',
      title: "Information Systems Analyst",
      company: "San Joaquin County - Information Systems Division",
      period: "2017",
      location: "Stockton, CA",
      type: "work" as const,
      status: "completed" as const,
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
      // achievements: [
      //   "Supported 2,000+ users across 15 departments",
      //   "Average ticket resolution: 4 hours",
      //   "98% customer satisfaction rating",
      //   "Led emergency response for critical outages"
      // ]
    }
  ]
}


/**
 * Section Header Component matching Contact/About section style
 */
const SectionHeader = () => (
  <motion.header
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    {/* Decorative line with icon */}
    <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500" />
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
        <Calendar className="w-6 h-6 text-white" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500" />
    </div>

    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
      Professional Experience & Education
    </h2>

    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
      My comprehensive journey in technology, showcasing continuous growth from systems administration to full-stack development
    </p>
  </motion.header>
)


/**
 * Statistics Component
 * Commented out - not currently in use
 */
/*
const Statistics = () => {
  const stats = [
    { label: 'Years Experience', value: '8+', color: 'text-blue-400', icon: Briefcase },
    { label: 'Education Programs', value: '2', color: 'text-purple-400', icon: GraduationCap },
    { label: 'Current Roles', value: '2', color: 'text-green-400', icon: Building },
    { label: 'Projects Built', value: '10+', color: 'text-orange-400', icon: Code }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      role="region"
      aria-label="Professional statistics"
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + (index * 0.1), duration: 0.4 }}
            className="text-center p-6 backdrop-blur-sm bg-black/40 rounded-xl border border-white/10 hover:bg-black/50 hover:border-slate-500/50 transition-all duration-500"
          >
            <IconComponent className={cn("w-8 h-8 mx-auto mb-3", stat.color)} aria-hidden="true" />
            <div className={cn("text-3xl font-bold mb-2", stat.color)}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
*/

/**
 * Main Timeline Section Component
 * Enhanced with better SEO, accessibility, and performance optimizations
 */
export const Timeline = () => {
  /**
   * Main Timeline Section Component
   */

    return (
      <div
        className="relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-20 md:py-24 lg:py-28 transition-colors duration-300"
        aria-label="Professional experience and education timeline"
      >

        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
        <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader />

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
                <p className="text-gray-400">
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
                <p className="text-gray-400">
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
        </Container >
      </div >
    )
  }

export default Timeline;