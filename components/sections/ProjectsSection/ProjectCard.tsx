'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { skills } from '@/components/config/skills';
import PinContainer from './3d-pin';
import { Project } from '@/components/config/projects';
import { ExternalLink, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const techIcons = Object.fromEntries(
  skills.map(skill => [skill.name, { icon: skill.icon, color: skill.color }])
);

export const ProjectCard = ({ project, index, isHovered, onHover }: ProjectCardProps) => {
  const cardId = `project-${project.id}`;
  const gradient = project.gradient ?? {
    from: '#3B82F6',
    to: '#8B5CF6'
  };

  // Get links from project data
  const codeLink = project.codeLink || undefined;
  const demoLink = project.websiteLink || project.demoLink || undefined;

  // Determine project status
  const isProduction = project.category === 'production';
  const statusBadge = isProduction ? {
    label: 'Live',
    icon: Zap,
    className: 'bg-green-500/20 dark:bg-green-500/30 text-green-600 dark:text-green-400 border-green-500/40 dark:border-green-500/50'
  } : {
    label: 'Demo',
    icon: Award,
    className: 'bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400 border-blue-500/40 dark:border-blue-500/50'
  };

  return (
    <>
      <div
        className="w-full px-4 sm:px-0 pt-20"
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
          <div className="group relative flex flex-col
               w-[300px] sm:w-[420px] md:w-[460px] lg:w-[480px] xl:w-[500px] 2xl:w-[520px]
               h-[420px] sm:h-[540px] md:h-[580px] lg:h-[600px] xl:h-[620px] 2xl:h-[640px]
               bg-gradient-to-br from-gray-100 via-white to-gray-50
               dark:from-gray-900 dark:via-gray-800 dark:to-black
               rounded-2xl shadow-2xl overflow-hidden
               transition-all duration-500
               hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]
               dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]
               border border-gray-200 dark:border-gray-700/50
               backdrop-blur-sm
                ">

            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md",
                  "border font-semibold text-xs shadow-lg",
                  statusBadge.className
                )}
              >
                <statusBadge.icon className="w-3 h-3" />
                {statusBadge.label}
              </motion.div>
            </div>

            {/* Project Image with Enhanced Effects */}
            <div
              className="relative w-full aspect-[16/9] overflow-hidden"
              role="img"
              aria-label={`Project screenshot for ${project.title}`}
            >
              {project.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Screenshot ${idx + 1} of ${project.title} project`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  priority={index < 2}
                />
              ))}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent
                dark:from-black/95 dark:via-black/30 dark:to-transparent
                opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Interactive overlay on hover */}
              <AnimatePresence mode="sync">
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent
                    dark:from-black/90 dark:via-black/40 dark:to-transparent
                    backdrop-blur-[2px]"
                    aria-hidden="true"
                  >
                    {/* Quick action buttons on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      {demoLink && (
                        <motion.a
                          href={demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ scale: 0, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0, y: 20 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-2 px-4 py-2
                          bg-white/90 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20
                          backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20
                          text-gray-900 dark:text-white font-semibold transition-all shadow-lg"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Live Demo</span>
                        </motion.a>
                      )}
                      {codeLink && (
                        <motion.a
                          href={codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ scale: 0, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0, y: 20 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-2 px-4 py-2
                          bg-white/90 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20
                          backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20
                          text-gray-900 dark:text-white font-semibold transition-all shadow-lg"
                          aria-label={`View source code of ${project.title}`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-sm">Code</span>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project Details with Enhanced Layout */}
            <div className="flex flex-col flex-1 p-6 bg-gradient-to-b from-gray-900/80 to-black/90 backdrop-blur-md overflow-visible">

              {/* Title with gradient effect */}
              <motion.h3
                id={`${cardId}-title`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent leading-tight"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
                }}
              >
                {project.title}
              </motion.h3>

              {/* Description with better typography */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4 flex-1 line-clamp-3"
              >
                {project.description}
              </motion.p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" aria-hidden="true" />

              {/* Tech Stack with Enhanced Styling */}
              <div
                role="list"
                aria-label={`Technologies used in ${project.title}`}
                className="flex flex-wrap gap-2 mt-auto"
              >
                {project.tech.slice(0, 6).map((tech, techIndex) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={`${project.id}-${tech}-${techIndex}`}
                      role="listitem"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/tech flex items-center gap-1.5 px-3 py-2 rounded-lg
                        bg-gray-800/60 dark:bg-gray-800/40
                        border border-gray-700/50
                        hover:border-opacity-80
                        transition-all duration-300
                        hover:shadow-lg
                        backdrop-blur-sm
                        whitespace-nowrap"
                      style={{
                        borderColor: `${techData?.color}40`,
                      }}
                    >
                      {techData?.icon && (
                        <div className="relative w-[18px] h-[18px] flex-shrink-0">
                          <Image
                            src={techData.icon}
                            alt={`${tech} icon`}
                            width={18}
                            height={18}
                            className="object-contain transition-transform duration-300 group-hover/tech:scale-110"
                          />
                        </div>
                      )}
                      <span
                        className="text-xs sm:text-sm font-semibold transition-colors duration-300"
                        style={{ color: techData?.color || '#9CA3AF' }}
                      >
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
                {project.tech.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center px-3 py-2 rounded-lg bg-gray-800/60 border border-gray-700/50 text-gray-400 text-xs font-semibold"
                  >
                    +{project.tech.length - 6}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Enhanced Border Glow Effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}20, ${gradient.to}20)`,
                filter: 'blur(20px)'
              }}
              aria-hidden="true"
            />

            {/* Animated Border on Hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
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