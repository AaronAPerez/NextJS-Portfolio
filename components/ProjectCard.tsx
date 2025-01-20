import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from './types/project';



interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export const ProjectCard = ({ 
  project, 
  index, 
  isHovered, 
  onHover 
}: ProjectCardProps)  => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: project.delay || index * 0.2 }}
      className="relative flex flex-col w-full"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        {/* Project Image */}
        <div className="relative h-48 md:h-64">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            priority={index < 2}
          />

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
              >
                 <motion.a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={`View ${project.title} source code`}
                >
                  <Github className="w-6 h-6 text-white" />
                </motion.a>
                {project.demoLink && (
                   <motion.a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label={`View ${project.title} demo`}
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Details */}
        <div className="p-6 bg-white/5 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-sm rounded-full bg-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
