'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';


const aboutContent = {
  background: {
    title: "Background",
    content: `I am a Full Stack Developer with a solid foundation in IT, expanding my development skills through CodeStack Academy. My journey in technology began with an Applied Science Degree in Network Systems Administration & BS in Information Systems and Cyber Security from ITT Technical Institute, where I graduated with a 3.5 GPA.`
  },
  approach: {
    title: "Approach",
    content: `I am passionate about creating intuitive user experiences and robust applications. My combined background in IT support and full-stack development training gives me a unique perspective on building user-friendly applications that solve real-world problems. I've applied these skills in various projects at CodeStack Academy, including expense tracking applications, business websites, and web-based games.`
  }
};

// Modern card component with dark mode support
const InfoCard = ({ title, content, delay, gradient }: {
  title: string;
  content: string;
  delay: number;
  gradient: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="w-full h-full"
    >
      <Card variant="elevated" hoverable padding="lg" className="h-full min-h-[280px] group relative overflow-hidden">
        {/* Gradient border effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br ${gradient} blur-xl -z-10`} />

        <CardHeader>
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {content}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const AboutSection = () => {
  return (
    <div className="relative w-full overflow-hidden py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching TimelineSection style */}
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
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Full stack developer with a passion for building intuitive and robust applications
          </p>
        </motion.header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <InfoCard
            title={aboutContent.background.title}
            content={aboutContent.background.content}
            delay={0.2}
            gradient="from-indigo-500 via-purple-500 to-pink-500"
          />
          <InfoCard
            title={aboutContent.approach.title}
            content={aboutContent.approach.content}
            delay={0.4}
            gradient="from-teal-500 via-cyan-500 to-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;