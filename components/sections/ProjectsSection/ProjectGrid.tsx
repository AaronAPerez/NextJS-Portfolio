'use client';

import { useState, useCallback, memo } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/components/config/projects';

interface ProjectsGridProps {
  projects: Project[];
}

// Memoized grid component for better performance
const ProjectsGrid = memo(function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Memoize hover handler to maintain stable reference
  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  return (
    <div className="
      grid grid-cols-1
      lg:grid-cols-2
      xl:grid-cols-2
      gap-8 min-w-2x1 mx-auto"
      >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredIndex === index}
          onHover={handleHover}
        />
      ))}
    </div>
  );
});

export default ProjectsGrid;