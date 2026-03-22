/**
 * ProjectsSection Component
 *
 * Main projects showcase section displaying featured and grid project cards.
 * Fetches from database with fallback to static data.
 *
 * Features:
 * - Database integration with fallback to static projects
 * - Category filtering with animated transitions
 * - Featured project highlighting
 * - Loading skeleton states
 * - Responsive grid layout
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hooks
import { useProjects } from '@/hooks/useProjects';

// Data
import { PROJECTS } from '@/components/config/projects';

// Types
import type { FilterTab } from '@/types/display-project';

// Components
import FeaturedProjectCard from './FeaturedProjectCard';
import ProjectCard from './ProjectCard';
import FilterTabs from './FilterTabs';
import ProjectsSkeleton from './ProjectsSkeleton';

// Utilities
import {
  mapDBToDisplay,
  mapStaticToDisplay,
  calculateFilterCounts,
  filterProjectsByCategory,
  separateFeaturedProject,
} from './utils/project-mappers';

// Animations
import { containerVariants, itemVariants } from './animations';

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex flex-col text-center items-center"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        Selected work
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Production projects
      </h2>
      <p className="mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
        Real sites for real businesses — not demos. Each one is live, maintained, and
        driving results for clients.
      </p>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div variants={itemVariants} className="py-12 text-center">
      <p className="text-gray-500 dark:text-gray-400">
        No projects found in this category.
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ProjectsSection = () => {
  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Fetch projects from database with fallback to static
  const { projects: dbProjects, isLoading } = useProjects({
    fallbackToStatic: true,
  });

  // Convert projects to display format
  const displayProjects = useMemo(() => {
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map(mapDBToDisplay);
    }
    return PROJECTS.map(mapStaticToDisplay);
  }, [dbProjects]);

  // Filter projects by category
  const filteredProjects = useMemo(
    () => filterProjectsByCategory(displayProjects, activeFilter),
    [displayProjects, activeFilter]
  );

  // Separate featured and other projects
  const { featured: featuredProject, others: otherProjects } = useMemo(
    () => separateFeaturedProject(filteredProjects),
    [filteredProjects]
  );

  // Calculate counts for filter tabs
  const filterCounts = useMemo(
    () => calculateFilterCounts(displayProjects),
    [displayProjects]
  );

  // Whether to show featured card (only on 'all' filter)
  const showFeatured = featuredProject && activeFilter === 'all';

  return (
    <section
      id="projects"
      className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col text-center items-center">
        {/* Section header */}
        <SectionHeader />

        {/* Filter tabs */}
        <FilterTabs
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
          counts={filterCounts}
        />

        {/* Content area */}
        {isLoading ? (
          <ProjectsSkeleton count={3} showFeatured />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="tabpanel"
              id={`projects-panel-${activeFilter}`}
            >
              {/* Featured project card */}
              {showFeatured && (
                <motion.div variants={itemVariants} className="mb-6">
                  <FeaturedProjectCard project={featuredProject} />
                </motion.div>
              )}

              {/* Projects grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {otherProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Empty state */}
              {filteredProjects.length === 0 && <EmptyState />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
