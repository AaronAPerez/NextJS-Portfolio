/**
 * ProjectsSection Component
 *
 * Main projects showcase section displaying every project as a uniform card.
 *
 * Projects come from components/config/projects.ts, not the database: the
 * list a reviewer sees lives in the repo, and the cards are in the
 * server-rendered HTML instead of appearing after a client-side fetch.
 */

'use client';

import { useState, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

// Data
import { PROJECTS } from '@/components/config/projects';

// Types
import type { FilterTab } from '@/types/display-project';

// Components
import { SectionHeader } from '@/components/sections/shared';
import ProjectCard from './ProjectCard';
import FilterTabs from './FilterTabs';

// Utilities
import {
  mapStaticToDisplay,
  calculateFilterCounts,
  filterProjectsByCategory,
} from './utils/project-mappers';

const DISPLAY_PROJECTS = PROJECTS.map(mapStaticToDisplay);
const FILTER_COUNTS = calculateFilterCounts(DISPLAY_PROJECTS);

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
    <m.div variants={itemVariants} className="py-12 text-center">
      <p className="text-gray-500 dark:text-gray-400">
        No projects found in this category.
      </p>
    </m.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ProjectsSection = () => {
  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredProjects = useMemo(
    () => filterProjectsByCategory(DISPLAY_PROJECTS, activeFilter),
    [activeFilter]
  );

  return (
    <div className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader
          icon={Layers}
          titleId="projects-heading"
          title="Projects"
          description="Four client sites in production, plus an internal estimating tool, a QA automation suite and a computer vision project."
          className="mb-12 w-full"
        />

        {/* Filter tabs */}
        <FilterTabs
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
          counts={FILTER_COUNTS}
          className="w-full"
        />

        {/* Content area */}
        <AnimatePresence mode="wait">
          <m.div
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
            <m.div
              variants={containerVariants}
              className="grid sm:grid-cols-1 gap-6 text-left md:grid-cols-2"
            >
              {filteredProjects.map((project, index) => (
                <m.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} priority={index < 3} />
                </m.div>
              ))}
            </m.div>

            {/* Empty state */}
            {filteredProjects.length === 0 && <EmptyState />}
          </m.div>
          </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsSection;
