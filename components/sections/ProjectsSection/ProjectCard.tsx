'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
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

export const ProjectCard = ({ project, index, isHovered }: ProjectCardProps) => {
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


  return (
    <>
      <div
        className="w-full px-4 sm:px-0 pt-20"
        role="article"
        aria-labelledby={`${cardId}-title`}
      >
        <PinContainer
          href={project.codeLink}
          title={project.title}
          className="w-full"
        >
          <div className="group relative flex flex-col
               w-[300px] sm:w-[420px] md:w-[460px] lg:w-[480px] xl:w-[500px] 2xl:w-[500px] h-[400px] sm:h-[520px] md:h-[560px] lg:h-[580px] xl:h-[600px] 2xl:h-[600px] bg-black/10 rounded-xl shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105
                ">

            {/* Project Image with Improved Accessibility */}
            <div
              className="relative w-full aspect-[16/9]"
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
                        "transition-colors"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => handleKeyPress(e, () => window.open(project.codeLink, '_blank'))}
                      aria-label={`View source code for ${project.title} on GitHub`}
                      tabIndex={0}
                    >
                    <a href="https://github.com/AaronAPerez/form-showcase"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
                    </motion.a>

                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-3 rounded-full",
                          "bg-white/10 hover:bg-white/20",
                          "transition-colors"
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
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
            <div className="flex flex-col flex-1 p-6 bg-black/20 backdrop-blur-sm">
              <h3
                className="text-xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                }}
              >
                {project.title}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 line-clamp-5">
                {project.description}
              </p>


              {/* Tech Stack with List Semantics */}
              <div
                role="list"
                aria-label={`Technologies used in ${project.title}`}
                className="flex flex-wrap gap-4 justify-self-start"
              >
                {project.tech.map((tech) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={tech}
                      role="listitem"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800/50 border transition-colors duration-200 hover:border-opacity-50"
                      style={{ borderColor: `${techData?.color}40` }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt={`${tech} icon`}
                          width={24}
                          height={24}
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