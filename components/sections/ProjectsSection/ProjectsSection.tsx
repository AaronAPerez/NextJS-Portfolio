'use client';

import SectionTitle from '@/components/SectionTitle';
import { projects } from '@/components/config/projects';
import ProjectsGrid from './ProjectGrid';

const ProjectsSection = () => {
  return (
    <>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-grid" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
      <SectionTitle 
        title="Featured Projects"
        subtitle="A showcase of my technical expertise and creative problem-solving"
      />

        {/* Projects Grid */}
        <ProjectsGrid projects={projects} />
      </div>
    </>
  );
};

export default ProjectsSection;
