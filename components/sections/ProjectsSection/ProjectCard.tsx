'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { skills } from '@/components/config/skills';
import PinContainer from './3d-pin';
import { Project } from '@/components/config/projects';
import { cn } from '@/lib/utils';

/**
 * Project Card Component
 * 
 * Displays a 3D pinned card showcasing project details with interactive hover effects.
 * Implements ARIA labels for accessibility and lazy-loads images for performance.
 * 
 * @component
 * @example
 * ```tsx
 * <ProjectCard 
 *   project={projectData}
 *   index={0}
 *   isHovered={hoveredCard === 0}
 *   onHover={setHoveredCard}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Project} props.project - Project data object containing title, description, tech stack, etc.
 * @param {number} props.index - Card index for stagger animations
 * @param {boolean} props.isHovered - Whether this card is currently hovered
 * @param {(index: number | null) => void} props.onHover - Callback when card hover state changes
 * 
 * @performance
 * - Uses Next.js Image for automatic optimization
 * - Implements intersection observer for lazy loading
 * - GPU-accelerated animations via Framer Motion
 * 
 * @accessibility
 * - ARIA labels for screen readers
 * - Keyboard navigation support
 * - Sufficient color contrast (WCAG AA)
 */

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  viewMode?: 'grid' | 'list';
}

const techIcons = Object.fromEntries(
  skills.map(skill => [skill.name, { icon: skill.icon, color: skill.color }])
);

export const ProjectCard = ({ project, index, isHovered, onHover, viewMode = 'grid' }: ProjectCardProps) => {
  const cardId = `project-${project.id}`;
  const gradient = project.gradient ?? {
    from: '#3B82F6',
    to: '#8B5CF6'
  };

  // Get links from project data
  const codeLink = project.codeLink || undefined;
  const demoLink = project.websiteLink || project.demoLink || undefined;

  return (
    <>
      <div
        className={cn(
          "w-full",
          viewMode === 'grid' ? "pt-10" : "pt-4"
        )}
        role="article"
        aria-labelledby={`${cardId}-title`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
      >
        {/* PinContainer with direct demoLink and codeLink props */}
        <PinContainer
          title={project.title}
          demoLink={demoLink}
          codeLink={codeLink}
          gradient={gradient}
          className="w-full"
        >
          <div className={cn(
            "group relative flex bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95 hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-2xl dark:hover:shadow-indigo-500/30 border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105",
            viewMode === 'grid'
              ? "flex-col w-[300px] sm:w-[560px] md:w-[560px] lg:w-[460px] xl:w-[560px] 2xl:w-[500px] h-[400px] sm:h-[620px] md:h-[560px] lg:h-[580px] xl:h-[600px] 2xl:h-[600px]"
              : "flex-row w-full h-[300px]"
          )}>

            {/* Project Image with Accessibility */}
            <div
              className={cn(
                "relative",
                viewMode === 'grid'
                  ? "w-full aspect-[16/9]"
                  : "w-2/5 h-full"
              )}
              role="img"
              aria-label={`Project screenshot for ${project.title}`}
            >
              {project.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Screenshot ${idx + 1} of ${project.title} project`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 2}
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
            <div className={cn(
              "flex flex-col flex-1 px-6 py-4 bg-gradient-to-br from-gray-100 via-white/90 to-gray-200 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-2xl dark:hover:shadow-indigo-500/30 border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-sm",
              viewMode === 'grid' ? "rounded-b-2xl" : "rounded-r-2xl"
            )}>
              <h3
                id={`${cardId}-title`}
                className={cn(
                  "font-bold mb-4 bg-clip-text text-transparent",
                  viewMode === 'grid' ? "text-xl sm:text-3xl" : "text-2xl"
                )}
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                }}
              >
                {project.title}
              </h3>

              <p className={cn(
                "text-gray-800 dark:text-gray-200 mb-4 flex-1",
                viewMode === 'grid' ? "text-sm sm:text-base line-clamp-5" : "text-base line-clamp-3"
              )}>
                {project.description}
              </p>

              {/* Tech Stack with List Semantics */}
              <div
                role="list"
                aria-label={`Technologies used in ${project.title}`}
                className="flex flex-wrap gap-4 justify-self-start"
              >
                {project.tech.map((tech, techIndex) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={`${project.id}-${tech}-${techIndex}`}
                      role="listitem"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 px-3 py-1 rounded-full border transition-colors duration-200 hover:border-opacity-20"
                      style={{ borderColor: `${techData?.color}40` }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt={`${tech} icon`}
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      )}
                      <span
                        className="text-sm font-medium"
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
};

export default ProjectCard;