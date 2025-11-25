'use client'; 


import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/components/config/projects';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="
      grid grid-cols-1 
      md:grid-cols-2 
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
          onHover={setHoveredIndex}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;