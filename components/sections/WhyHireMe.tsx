'use client';

import { motion } from 'framer-motion';
import {
  Rocket,
  Users,
  Shield,
  Code2,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Why Hire Me Section
 *
 * This section directly addresses the questions recruiters and hiring managers ask:
 * 1. Can this person deliver results?
 * 2. Will they fit with our team?
 * 3. Do they understand our problems?
 * 4. Are they reliable?
 *
 * Includes the career transition narrative which resonates with many hiring managers.
 */

// Key differentiators that answer recruiter questions
const differentiators = [
  {
    icon: Rocket,
    title: 'I Ship Production Code',
    description:
      'Not just tutorials or side projects. I build websites that real businesses rely on every day to generate leads and serve customers.',
    proof: '4 live production websites',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'I Understand End Users',
    description:
      '7+ years in IT support taught me how real users think, what frustrates them, and how to build intuitive experiences.',
    proof: '99% first-call resolution rate',
    color: 'green',
  },
  {
    icon: Shield,
    title: 'I Care About Quality',
    description:
      'Every project meets WCAG accessibility standards, scores 90+ on Lighthouse, and loads in under 2 seconds.',
    proof: 'Verifiable on every live site',
    color: 'purple',
  },
  {
    icon: MessageSquare,
    title: 'I Communicate Clearly',
    description:
      'Years of translating technical issues for non-technical stakeholders means I can bridge the gap between developers and business.',
    proof: 'Client testimonials available',
    color: 'amber',
  },
];

// Career journey milestones - tells the story recruiters find compelling
const journeyMilestones = [
  {
    year: '2016',
    title: 'IT Foundation',
    description: 'AAS in Network Systems Admin, BAS in Information Systems & Cybersecurity',
  },
  {
    year: '2017-2024',
    title: 'Real-World Experience',
    description: '7+ years User and IT support, understanding user pain points',
  },
  {
    year: '2024',
    title: 'CodeStack Graduate',
    description: 'Full-stack development certification',
  },
  {
    year: '2025',
    title: 'Production Developer',
    description: 'Building websites for real businesses',
  },
];

export default function WhyHireMe() {
  return (
    <section
      id="why-hire-me"
      className="relative py-16 sm:py-24 overflow-hidden"
      aria-labelledby="why-hire-me-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            For Recruiters & Hiring Managers
          </span> */}
          <h2
            id="why-hire-me-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why Work With Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I bring a unique combination of hands-on development skills and years of understanding
            what users actually need.
          </p>
        </motion.div>

        {/* Career journey - compelling narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              My Journey: From IT Support to Production Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I didn&apos;t take the traditional path. I spent 7+ years in User and IT support, solving real problems
              for real users. That experience taught me what most developers miss: <strong className="text-gray-900 dark:text-white">how to build
              software that people actually want to use</strong>. When I transitioned to development,
              I brought that user-first mindset with me.
            </p>

            {/* Timeline visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < journeyMilestones.length - 1 && (
                    <div className="hidden sm:block absolute top-4 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-300" />
                  )}
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                      {milestone.year}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mt-1">
                      {milestone.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key differentiators grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
              purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
              amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
            };
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${colorClasses[item.color as keyof typeof colorClasses]} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>

                {/* Proof point */}
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-500 dark:text-gray-400">{item.proof}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - make it easy for recruiters to take action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Let&apos;s Talk
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/resume/Aaron-Perez-Resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Download Resume
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Available for full-time, contract, or freelance opportunities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
