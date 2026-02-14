'use client';

import { memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { skills } from '@/components/config/skills';
import PinContainer from './3d-pin';
import { Project } from '@/components/config/projects';


interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

// Static lookup - computed once outside component for performance
const techIcons = Object.fromEntries(
  skills.map(skill => [skill.name, { icon: skill.icon, color: skill.color }])
);

// Memoized ProjectCard - prevents re-render when other cards are hovered
const ProjectCard = memo(function ProjectCard({ project, index, isHovered, onHover }: ProjectCardProps) {
  const cardId = `project-${project.id}`;

  // Memoize gradient to prevent object recreation
  const gradient = useMemo(() => project.gradient ?? {
    from: '#3B82F6',
    to: '#8B5CF6'
  }, [project.gradient]);

  // Get links from project data
  const codeLink = project.codeLink || undefined;
  const demoLink = project.websiteLink || project.demoLink || undefined;

  // Memoize event handlers to prevent child re-renders
  const handleMouseEnter = useCallback(() => onHover(index), [onHover, index]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);

  return (
    <>
      <div
        className="w-full lg:pb-16 lg:pt-12 py-4"
        role="article"
        aria-labelledby={`${cardId}-title`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {/* PinContainer with direct demoLink and codeLink props */}
        <PinContainer
          title={project.title}
          demoLink={demoLink}
          codeLink={codeLink}
          gradient={gradient}
          className="w-full"
        >
          <div className="group relative flex flex-col
               min-w-[340px] w-400 sm:w-[440px] md:w[480px] lg:min-w-[440px] xl:w-[560px]
               h-[460px] sm:h-[560px] lg:h-[570px]
               bg-gradient-to-br from-gray-50 via-white to-gray-100
               dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95
               hover:shadow-2xl hover:shadow-indigo-500/20
               dark:hover:shadow-2xl dark:hover:shadow-indigo-500/30
               border border-gray-200/80 dark:border-gray-700/60
               backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105
                ">

            {/* Project Image with Accessibility */}
            <div className="relative aspect-[410/220]"
              role="img"
              aria-label={`Project screenshot for ${project.title}`}
            >
              {project.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Screenshot ${idx + 1} of ${project.title} project`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ))}

              {/* Simple overlay effect on hover */}
              <AnimatePresence mode="sync">
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Project Details with Semantic Structure */}
            <div className="flex flex-col flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-gray-100 via-white/90 to-gray-200
               dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95
               rounded-b-2xl shadow-xl overflow-hidden
               transition-all duration-500
               hover:shadow-2xl hover:shadow-indigo-500/20
               dark:hover:shadow-2xl dark:hover:shadow-indigo-500/30
               border border-gray-200/80 dark:border-gray-700/60
               backdrop-blur-sm">
              <h3
                id={`${cardId}-title`}
                className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent leading-tight"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                }}
              >
                {project.title}
              </h3>

              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-base lg:text-lg mb-3 sm:mb-4 flex-1 line-clamp-3 sm:line-clamp-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack with List Semantics */}
              <div
                role="list"
                aria-label={`Technologies used in ${project.title}`}
                className="flex flex-wrap gap-2 sm:gap-3 justify-start items-center"
              >
                {project.tech.map((tech, techIndex) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={`${project.id}-${tech}-${techIndex}`}
                      role="listitem"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border-2 transition-all duration-200 hover:border-opacity-70 hover:shadow-md"
                      style={{ borderColor: `${techData?.color}40` }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt={`${tech} icon`}
                          width={18}
                          height={18}
                          className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain"
                        />
                      )}
                      <span
                        className="text-xs sm:text-sm font-semibold whitespace-nowrap"
                        style={{ color: techData?.color || '#9CA3AF' }}
                      >
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Decorative Border - Hidden from Screen Readers */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)`,
                filter: 'blur(1px)'
              }}
              aria-hidden="true"
            />
          </div>
        </PinContainer>
      </div>
    </>
  );
});

export { ProjectCard };
export default ProjectCard;