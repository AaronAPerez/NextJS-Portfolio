'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { skills } from '@/components/config/skills';
import PinContainer from './3d-pin';
import { Project } from '@/components/types/project';

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
               w-[300px] sm:w-[420px] md:w-[460px] lg:w-[480px] xl:w-[500px] 2xl:w-[500px] h-[400px] sm:h-[520px] md:h-[560px] lg:h-[580px] xl:h-[600px] 2xl:h-[600px] bg-black/10 rounded-xl shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105
                ">

            {/* Project Image with Accessibility */}
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

              {/* Simple overlay effect on hover */}
              <AnimatePresence mode="sync">
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Project Details with Semantic Structure */}
            <div className="flex flex-col flex-1 p-6 bg-black/20 backdrop-blur-sm overflow-visible">
              <h3
                id={`${cardId}-title`}
                className="text-xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                }}
              >
                {project.title}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base mb-4 flex-1 line-clamp-4">
                {project.description}
              </p>

              {/* Tech Stack with List Semantics */}
              <div
                role="list"
                aria-label={`Technologies used in ${project.title}`}
                className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-2"
              >
                {project.tech.map((tech, techIndex) => {
                  const techData = techIcons[tech];
                  return (
                    <motion.div
                      key={`${project.id}-${tech}-${techIndex}`}
                      role="listitem"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-800/50 border transition-colors duration-200 hover:border-opacity-50 whitespace-nowrap"
                      style={{ borderColor: `${techData?.color}40` }}
                    >
                      {techData?.icon && (
                        <Image
                          src={techData.icon}
                          alt={`${tech} icon`}
                          width={18}
                          height={18}
                          className="object-contain flex-shrink-0"
                        />
                      )}
                      <span
                        className="text-xs sm:text-sm font-medium"
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