/**
 * ProjectsSection Component
 *
 * Main projects showcase section displaying every project as a uniform card.
 * Fetches from database with fallback to static data.
 *
 * Features:
 * - Database integration with fallback to static projects
 * - Category filtering with animated transitions
 * - Loading skeleton states
 * - Responsive grid layout
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

// Hooks
import { useProjects } from '@/hooks/useProjects';

// Data
import { PROJECTS } from '@/components/config/projects';

// Types
import type { FilterTab } from '@/types/display-project';

// Components
import { SectionHeader } from '@/components/sections/shared';
import ProjectCard from './ProjectCard';
import FilterTabs from './FilterTabs';
import ProjectsSkeleton from './ProjectsSkeleton';

// Utilities
import {
  mapDBToDisplay,
  mapStaticToDisplay,
  calculateFilterCounts,
  filterProjectsByCategory,
} from './utils/project-mappers';

// Animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      staggerChildren: 0.08,
    },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

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

  // Calculate counts for filter tabs
  const filterCounts = useMemo(
    () => calculateFilterCounts(displayProjects),
    [displayProjects]
  );

  return (
    <div className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader
          icon={Layers}
          titleId="projects-heading"
          title="Production Projects"
          description="Real sites for real businesses — not demos. Each one is live, maintained, and driving results for clients."
          className="mb-12 w-full"
        />

        {/* Filter tabs */}
        <FilterTabs
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
          counts={filterCounts}
          className="w-full"
        />

        {/* Content area */}
        {isLoading ? (
          <ProjectsSkeleton count={5} />
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
              className="w-full"
            >
              {/* Projects grid — every project renders as the same card */}
              <motion.div
                variants={containerVariants}
                className="grid sm:grid-cols-1 gap-6 text-left md:grid-cols-2"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} priority={index < 3} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Empty state */}
              {filteredProjects.length === 0 && <EmptyState />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
