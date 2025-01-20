'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { skills } from '../../../../../../Documents/.CodeStack Academy/React/GameApp/NextJS/Next_Portfolio/nextjs_portfolio/types/config/skills';
import { cn } from '@/lib/utils';
import SectionTitle from '@/components/ui/SectionTitle';
import PinContainer from './3d-pin';
import { Project } from '@/types/project';
import { projects } from '../../../../../../Documents/.CodeStack Academy/React/GameApp/NextJS/Next_Portfolio/nextjs_portfolio/types/config/projects';

// Map skills to their icons and colors
const techIcons = Object.fromEntries(
  skills.map(skill => [skill.name, { icon: skill.icon, color: skill.color }])
);

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const ProjectCard = ({ project, isHovered }: ProjectCardProps) => {
  const gradient = project.gradient ?? {
    from: '#3B82F6',
    to: '#8B5CF6'
  };

  return (
    <div className={cn(
      "text-zinc-900 dark:text-white",
      "border-black/10 dark:border-white/10",
    )}>
      <div className='relative py-20' title={project.title}>
        <PinContainer
          href={project.codeLink}
          className="w-full"
          title={project.title}
        >
          {/* Increased width for larger screens */}
          <div className="group relative flex flex-col 
                w-[320px] sm:w-[380px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] 
                h-[500px]">
            {/* Project Image */}
            <div className="relative w-full h-[250px]">
              <Image
                src={project.images[0]}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              
              {/* Hover Actions */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
                  >
                    {/* GitHub Link */}
                    <motion.a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>

                    {/* Demo Link if available */}
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink className="w-6 h-6" />
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project Details */}
            <div className="flex flex-col flex-1 p-6 relative">
              <h3 
                className="text-2xl font-bold mb-3 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                }}
              >
                {project.title}
              </h3>
              
              <p className="dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/10 dark:bg-zinc-800/50 border"
                      style={{ 
                        borderColor: `${techData?.color || '#4B5563'}40`
                      }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt={`${tech} icon`}
                          width={14}
                          height={14}
                          className="object-contain"
                        />
                      )}
                      <span 
                        className="text-xs font-medium" 
                        style={{ color: techData?.color || '#9CA3AF' }}
                      >
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Hover Effect Border */}
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)`,
                filter: 'blur(1px)'
              }}
            />
          </div>
        </PinContainer>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-4 min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-grid" />
      
      {/* Content Container - max widths */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8
                max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2x">

        {/* Section Header */}
        <SectionTitle
          title="Featured Projects"
          subtitle="A showcase of my technical expertise and creative problem-solving through real-world applications."
        />

        {/* Projects Grid - gap and responsive columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3
                gap-4 md:gap-6 lg:gap-8 justify-items-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="w-full flex justify-center"
            >
              <ProjectCard
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
