/**
 * ProjectCard Component
 *
 * Standard project card with 3D hover effects and glass morphism.
 * Features smooth animations with reduced motion support for accessibility.
 */

'use client';

import Image from 'next/image';
import { memo, useMemo, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import type { DisplayProject } from '@/types/display-project';
import { DEFAULT_GRADIENT } from '@/types/display-project';
import { TechChip } from './shared';
import { matchTechArrayToSkills } from './utils/project-mappers';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  /** Project data to display */
  project: DisplayProject;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

function ProjectCard({ project }: ProjectCardProps) {
  // Check for reduced motion preference for accessibility
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Fallback to default gradient if project gradient is undefined
  const gradient = project.gradient ?? DEFAULT_GRADIENT;

  // Match tech strings to skills data for icons
  const techWithIcons = useMemo(
    () => matchTechArrayToSkills(project.tech.slice(0, 4)),
    [project.tech]
  );

  // Memoized hover handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Determine status badge styling
  const statusConfig = useMemo(() => {
    switch (project.status) {
      case 'production':
        return {
          label: 'Live',
          dotColor: 'bg-green-400',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30',
          bgColor: 'bg-green-500/10',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          dotColor: 'bg-amber-400',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/30',
          bgColor: 'bg-amber-500/10',
        };
      default:
        return {
          label: 'Archived',
          dotColor: 'bg-gray-400',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/30',
          bgColor: 'bg-gray-500/10',
        };
    }
  }, [project.status]);

  return (
    <motion.article
      variants={shouldReduceMotion ? undefined : cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover={shouldReduceMotion ? undefined : 'hover'}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/50 backdrop-blur-sm transition-colors duration-300 hover:border-gray-700/80"
      aria-label={`${project.title} project card`}
    >
      {/* Gradient glow effect on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${gradient.from}20, transparent, ${gradient.to}20)`,
        }}
        aria-hidden="true"
      />

      {/* Image container with overlay effects */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <>
            <motion.div
              variants={shouldReduceMotion ? undefined : imageVariants}
              className="relative h-full w-full"
            >
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </motion.div>

            {/* Gradient overlay */}
            {/* <div
              className="absolute inset-0 bg-gradient-to-t from-gray-500 via-gray-300/20 to-transparent"
              aria-hidden="true"
            /> */}

            {/* Hover overlay with quick action */}
            <motion.div
              variants={shouldReduceMotion ? undefined : overlayVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
              aria-hidden="true"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20"
                style={{
                  boxShadow: `0 0 30px ${gradient.from}40`,
                }}
              >
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
            </motion.div>
          </>
        ) : (
          // Gradient fallback with floating elements
          <div
            className="flex h-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}15, ${gradient.to}10)`,
            }}
          >
            {/* Browser mockup */}
            <div className="w-4/5 max-w-[200px] overflow-hidden rounded-lg border border-white/10 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: gradient.from }}
                />
                <span
                  className="h-2 w-2 rounded-full opacity-60"
                  style={{ backgroundColor: gradient.from }}
                />
                <span
                  className="h-2 w-2 rounded-full opacity-30"
                  style={{ backgroundColor: gradient.from }}
                />
              </div>
              <div className="space-y-2 p-4">
                <div
                  className="h-2.5 w-3/4 rounded"
                  style={{ backgroundColor: `${gradient.from}30` }}
                />
                <div
                  className="h-2.5 w-1/2 rounded"
                  style={{ backgroundColor: `${gradient.from}20` }}
                />
                <div
                  className="h-2.5 w-2/3 rounded"
                  style={{ backgroundColor: `${gradient.from}15` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium backdrop-blur-sm ${statusConfig.borderColor} ${statusConfig.bgColor} ${statusConfig.textColor}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotColor} ${project.status === 'production' ? 'animate-pulse' : ''}`}
              aria-hidden="true"
            />
            {statusConfig.label}
          </span>
        </div>

        {/* Gradient accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-white">
          <span
            className="bg-clip-text transition-all duration-300 group-hover:text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            {project.title}
          </span>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        {/* Tech stack chips */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {techWithIcons.map((tech) => (
            <TechChip
              key={tech.label}
              label={tech.label}
              icon={tech.icon}
              color={tech.color}
              className="border-gray-700/50 text-gray-400"
            />
          ))}
          {project.tech.length > 4 && (
            <span className="rounded border border-gray-700/50 px-2 py-0.5 text-[10px] text-gray-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Action links */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          {project.status === 'production' && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              }}
              aria-label={`View ${project.title} live site (opens in new tab)`}
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              Live Site
            </a>
          )}
          {project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(ProjectCard);
