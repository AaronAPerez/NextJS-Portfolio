'use client';

import SectionTitle from '@/components/SectionTitle';
import { projects } from '@/components/config/projects';
import ProjectsGrid from './ProjectGrid';

const ProjectsSection = () => {
  return (
    <div className="relative w-full overflow-hidden py-20">
      {/* Background Effects - consistent with other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle
          title="Featured Projects"
          subtitle="A showcase of my technical expertise and creative problem-solving"
        />

        {/* Projects Grid */}
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
};

export default ProjectsSection;
