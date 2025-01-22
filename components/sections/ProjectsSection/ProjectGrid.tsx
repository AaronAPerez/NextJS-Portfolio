'use client'; 

import { Project } from '@/components/types/project';
import { useState } from 'react';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="
      grid grid-cols-1 
      md:grid-cols-1 
      lg:grid-cols-2
      xl:grid-cols-3 
      gap-6 min-w-2x1 max-w-7xl mx-auto"
      >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredIndex === index}
          onHover={setHoveredIndex}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;