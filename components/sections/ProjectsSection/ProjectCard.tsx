'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { DisplayProject } from '@/types/display-project';
import { StatusBadge, TechChip } from './shared';
import { matchTechArrayToSkills } from './utils/project-mappers';

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: DisplayProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Create gradient background style
  const gradientBg = `linear-gradient(135deg, ${project.gradient.from}15, ${project.gradient.to}10)`;

  // Match tech strings to skills for icons
  const techWithIcons = useMemo(
    () => matchTechArrayToSkills(project.tech.slice(0, 5)),
    [project.tech]
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-900/50">
      {/* Visual header with project image or gradient background */}
      <div
        className="relative aspect-[410/220]"
               role="img"
               aria-label="Project screenshot"
        style={{ background: !project.image ? gradientBg : undefined }}
      >
        {/* Project screenshot image */}
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : project.companyLogo ? (
          // Company logo fallback
          <div className="flex h-full items-center justify-center" style={{ background: gradientBg }}>
            <div className="relative h-16 w-32">
              <Image
                src={project.companyLogo}
                alt={`${project.title} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          // Browser mockup fallback
          <div className="flex h-full items-center justify-center p-6" style={{ background: gradientBg }}>
            <div className="w-full max-w-[180px] overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-1 border-b border-gray-100 bg-gray-50 px-2 py-1.5 dark:border-gray-700 dark:bg-gray-800">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.gradient.from }}
                />
                <span
                  className="h-2 w-2 rounded-full opacity-60"
                  style={{ backgroundColor: project.gradient.from }}
                />
                <span
                  className="h-2 w-2 rounded-full opacity-30"
                  style={{ backgroundColor: project.gradient.from }}
                />
              </div>
              <div className="space-y-1.5 p-3">
                <div
                  className="h-2 w-3/4 rounded"
                  style={{ backgroundColor: `${project.gradient.from}20` }}
                />
                <div
                  className="h-2 w-1/2 rounded"
                  style={{ backgroundColor: `${project.gradient.from}15` }}
                />
                <div
                  className="h-2 w-2/3 rounded"
                  style={{ backgroundColor: `${project.gradient.from}10` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Gradient accent line at bottom */}
        <div
          className="absolute bottom-0 left-0 h-1 w-full opacity-80"
          style={{
            background: `linear-gradient(90deg, ${project.gradient.from}, ${project.gradient.to})`,
          }}
        />

        {/* Overlay gradient for better text contrast */}
        {project.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        )}
      </div>

      {/* Info section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <StatusBadge status={project.status} />
        </div>

        <h3 className="mb-1.5 text-base font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {project.description}
        </p>

        {/* Tech chips with skill icons */}
        <div className="mb-4 flex flex-wrap gap-1">
          {techWithIcons.map((tech) => (
            <TechChip
              key={tech.label}
              label={tech.label}
              icon={tech.icon}
              color={tech.color}
            />
          ))}
          {project.tech.length > 5 && (
            <span className="rounded border border-gray-100 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-400 dark:border-gray-700 dark:bg-gray-800">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-3">
          {project.status === 'production' && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                backgroundColor: `${project.gradient.from}15`,
                color: project.gradient.from,
              }}
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              Live site
            </a>
          )}
          {project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
