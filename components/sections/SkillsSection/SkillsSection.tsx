'use client';

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import NeonSkillsGrid from '@/components/sections/SkillsSection/NeonSkillsGrid';
import SectionTitle from '@/components/SectionTitle';
import { BackgroundBeams } from '@/components/ui/background-beams';

const skillsDescription = {
  title: "Skills & Technologies",
  subtitle: "Technologies learned at CodeStack Academy",
  categories: {
    frontend: "Building modern, responsive user interfaces",
    backend: "Server-side development and databases",
    tools: "Development and deployment tools",
    game: "Game development fundamentals"
  }
};

export const SkillsSection = () => {
  return (
    <section className="min-h-screen px-6
    pt-20 md:pt-24 pb-8 md:pb-12">
      <BackgroundBeams className="absolute inset-0" />
      
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8
                max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2xl">

        {/* Section Header */}
        <SectionTitle 
          title={skillsDescription.title}
          subtitle={skillsDescription.subtitle}
        />
        {/* Category Descriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {Object.entries(skillsDescription.categories).map(([key, desc], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 rounded-xl",
                "bg-white/5 backdrop-blur-sm",
                "border border-white/10"
              )}
            >
              <h3 className="text-lg font-semibold text-white capitalize mb-2">
                {key}
              </h3>
              <p className="text-sm text-gray-400">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Neon Skills Grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent opacity-30 blur-3xl" />
          <NeonSkillsGrid />
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Constantly learning and exploring new technologies through hands-on projects
            and practical applications at CodeStack Academy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;