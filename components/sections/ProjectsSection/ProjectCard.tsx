'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { skills } from '@/components/config/skills';
import PinContainer from './3d-pin';
import { Project } from '@/components/types/project';
import { KeyboardEvent } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const techIcons = Object.fromEntries(
  skills.map(skill => [skill.name, { icon: skill.icon, color: skill.color }])
);

export const ProjectCard = ({ 
  project, 
  index, 
  isHovered, 
  onHover 
}: ProjectCardProps) => {
  const cardId = `project-${project.id}`;
  const gradient = project.gradient ?? {
    from: '#3B82F6',
    to: '#8B5CF6'
  };

  // Keyboard navigation handlers
  const handleKeyPress = (e: KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleCardKeyPress = (e: KeyboardEvent) => {
    handleKeyPress(e, () => onHover(isHovered ? null : index));
  };

  return (
    <div 
      className={cn(
        "text-zinc-900 dark:text-white",
        "border-black/10 dark:border-white/10",
      )}
      role="article"
      aria-labelledby={`${cardId}-title`}
    >
      <div 
        className="relative py-20"
        onKeyDown={handleCardKeyPress}
        tabIndex={0}
        role="button"
        aria-expanded={isHovered}
        aria-label={`View details for ${project.title}`}
      >
        <PinContainer
          href={project.codeLink}
          className="w-full"
          title={project.title}
        >
          <div className="group relative flex flex-col 
                w-[320px] sm:w-[380px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] 
                h-[500px]">
            {/* Project Image with Improved Accessibility */}
            <div 
              className="relative w-full h-[250px]"
              role="img"
              aria-label={`Project screenshot for ${project.title}`}
            >
              {project.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Screenshot ${idx + 1} of ${project.title} project`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index < 2}
                />
              ))}
              
              {/* Interactive Elements with Keyboard Support */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
                    role="group"
                    aria-label={`${project.title} project links`}
                  >
                    <motion.a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-3 rounded-full",
                        "bg-white/10 hover:bg-white/20",
                        "transition-colors focus:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-blue-500"
                      )}
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => handleKeyPress(e, () => window.open(project.codeLink, '_blank'))}
                      aria-label={`View source code for ${project.title} on GitHub`}
                      tabIndex={0}
                    >
                      <Github className="w-6 h-6" aria-hidden="true" />
                    </motion.a>

                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-3 rounded-full",
                          "bg-white/10 hover:bg-white/20",
                          "transition-colors focus:outline-none",
                          "focus-visible:ring-2 focus-visible:ring-blue-500"
                        )}
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => handleKeyPress(e, () => window.open(project.demoLink!, '_blank'))}
                        aria-label={`View live demo of ${project.title}`}
                        tabIndex={0}
                      >
                        <ExternalLink className="w-6 h-6" aria-hidden="true" />
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project Details with Semantic Structure */}
            <div className="flex flex-col flex-1 p-6 relative">
              <h3 
                id={`${cardId}-title`}
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

              {/* Tech Stack with List Semantics */}
              <div 
                role="list"
                aria-label={`Technologies used in ${project.title}`}
                className="flex flex-wrap gap-2"
              >
                {project.tech.map((tech) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={tech}
                      role="listitem"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/10 dark:bg-zinc-800/50 border"
                      style={{ 
                        borderColor: `${techData?.color || '#4B5563'}40`
                      }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt=""
                          width={14}
                          height={14}
                          className="object-contain"
                          aria-hidden="true"
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
    </div>
  );
};

export default ProjectCard;