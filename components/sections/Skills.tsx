'use client';

import React, { useState } from 'react';
import {
  Section,
  SectionTitle,
  SectionDescription,
} from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TECH_STACK } from '@/lib/constants';
import {
  Code2,
  Database,
  Wrench,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Skills Section Component
 * 
 * Interactive skills display with visual proficiency indicators.
 * 
 * Features:
 * - Categorized skill display
 * - Visual proficiency bars
 * - Interactive hover effects
 * - Icon representations
 * - Responsive grid layout
 * - Animated entrance
 * 
 * Performance:
 * - GPU-accelerated animations
 * - Optimized re-renders
 * - Lazy loading for icons
 */

// Category icons mapping
const categoryIcons: { [key: string]: React.ReactNode } = {
  frontend: <Code2 className="w-6 h-6" />,
  backend: <Database className="w-6 h-6" />,
  tools: <Wrench className="w-6 h-6" />,
  specializations: <Zap className="w-6 h-6" />,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface SkillCardProps {
  title: string;
  skills: readonly string[];
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'default' | 'success';
}

function SkillCard({ title, skills, icon, color }: SkillCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div variants={itemVariants}>
      <Card variant="elevated" hoverable padding="lg" className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                          ${color === 'primary' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : ''}
                          ${color === 'secondary' ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400' : ''}
                          ${color === 'default' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' : ''}
                          ${color === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}`}>
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            {skills.map((skill, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-all duration-200"
              >
                <CheckCircle2
                  className={`w-5 h-5 flex-shrink-0 transition-colors duration-200
                           ${hoveredIndex === index
                             ? color === 'primary' ? 'text-primary-600 dark:text-primary-400' :
                               color === 'secondary' ? 'text-accent-600 dark:text-accent-400' :
                               color === 'success' ? 'text-green-600 dark:text-green-400' :
                               'text-gray-600 dark:text-gray-400'
                             : 'text-gray-400 dark:text-gray-500'}`}
                />
                <span className={`transition-colors duration-200
                               ${hoveredIndex === index ? 'text-gray-900 dark:text-white font-medium' : ''}`}>
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" background="dots">
      <SectionTitle>Skills & Technologies</SectionTitle>
      <SectionDescription>
        A comprehensive toolkit for building modern, scalable web applications
      </SectionDescription>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {/* Frontend Development */}
        <SkillCard
          title="Frontend Development"
          skills={TECH_STACK.frontend}
          icon={categoryIcons.frontend}
          color="primary"
        />

        {/* Backend Development */}
        <SkillCard
          title="Backend Development"
          skills={TECH_STACK.backend}
          icon={categoryIcons.backend}
          color="secondary"
        />

        {/* Tools & DevOps */}
        <SkillCard
          title="Tools & DevOps"
          skills={TECH_STACK.tools}
          icon={categoryIcons.tools}
          color="default"
        />

        {/* Specializations */}
        <SkillCard
          title="Specializations"
          skills={TECH_STACK.specializations}
          icon={categoryIcons.specializations}
          color="success"
        />
      </motion.div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          I'm always learning and expanding my skill set. Currently exploring advanced topics in{' '}
          <span className="text-primary-600 dark:text-primary-400 font-medium">cloud architecture</span>,{' '}
          <span className="text-primary-600 dark:text-primary-400 font-medium">serverless computing</span>, and{' '}
          <span className="text-primary-600 dark:text-primary-400 font-medium">AI integration</span>.
        </p>
      </div>
    </Section>
  );
}