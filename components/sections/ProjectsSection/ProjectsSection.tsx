'use client';

import { projects } from '@/components/config/projects';
import ProjectsGrid from './ProjectGrid';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';


const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'production', label: 'Production Sites', count: projects.filter(p => p.category === 'production').length },
    { id: 'portfolio', label: 'Portfolio Demos', count: projects.filter(p => p.category === 'portfolio').length },
  ];

  return (
    <div className="relative w-full overflow-hidden py-20">

      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my technical expertise and creative problem-solving
          </p>
        </motion.header>

        {/* Projects Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold transition-all",
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              )}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className='py-12'>
          <ProjectsGrid projects={projects} />
        </div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            View Detailed Case Studies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div> */}

      </div>
    </div>
  );
};

export default ProjectsSection;
