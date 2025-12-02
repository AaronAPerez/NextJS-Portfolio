'use client';


import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/components/config/projects';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
  projects: Project[];
  viewMode?: 'grid' | 'list';
}

const ProjectsGrid = ({ projects, viewMode = 'grid' }: ProjectsGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn(
      "w-full mx-auto transition-all duration-300",
      viewMode === 'grid'
        ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
        : "flex flex-col gap-6"
    )}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredIndex === index}
          onHover={setHoveredIndex}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;