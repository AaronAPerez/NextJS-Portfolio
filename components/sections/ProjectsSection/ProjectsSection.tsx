'use client';

import { useMemo } from 'react';
import { projects as staticProjects, Project, ProjectDisplayStatus } from '@/components/config/projects';
import ProjectsGrid from './ProjectGrid';
import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import type { ProjectDB } from '@/types/project';

/**
 * Convert ProjectDB format from API to Project format for frontend display
 * Maps the database structure to what ProjectCard expects
 */
function mapProjectDBToProject(dbProject: ProjectDB): Project {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    tech: dbProject.tech || [],
    category: dbProject.category,
    isLive: dbProject.isLive,
    clientType: dbProject.clientType,
    featured: dbProject.featured,
    // Convert images array of objects to array of URLs
    images: dbProject.images?.map((img) => img.url) || [],
    imagesAlt: dbProject.images?.map((img) => img.alt) || [],
    demoLink: dbProject.demoLink,
    codeLink: dbProject.codeLink || '',
    websiteLink: dbProject.websiteLink,
    gradient: dbProject.gradient,
    // Include status for displaying badges (In Development, etc.)
    status: dbProject.status as ProjectDisplayStatus,
  };
}

const ProjectsSection = () => {
  // Fetch projects from API with fallback to static data
  const { projects: apiProjects, isLoading } = useProjects({
    status: 'published',
    fallbackToStatic: true,
  });

  // Convert API projects to display format, or use static projects as fallback
  const displayProjects = useMemo(() => {
    // If we have API projects, map them to display format
    if (apiProjects && apiProjects.length > 0) {
      return apiProjects
        .filter((p) => p.status === 'published' || p.status === 'in_development')
        .map(mapProjectDBToProject);
    }
    // Fallback to static projects
    return staticProjects;
  }, [apiProjects]);

  return (
    <div className="relative w-full overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Projects Grid */}
        <div>
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <ProjectsGrid projects={displayProjects} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
