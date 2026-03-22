'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { DisplayProject } from '@/types/display-project';
import { StatusBadge, TechChip } from './shared';
import { matchTechArrayToSkills } from './utils/project-mappers';

// ─── Main Component ───────────────────────────────────────────────────────────

interface FeaturedProjectCardProps {
  project: DisplayProject;
}

const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
  // Create gradient background style
  const gradientBg = `linear-gradient(135deg, ${project.gradient.from}12, ${project.gradient.to}08)`;

  // Match tech strings to skills for icons
  const techWithIcons = useMemo(
    () => matchTechArrayToSkills(project.tech.slice(0, 6)),
    [project.tech]
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        {/* Visual pane with project image or gradient background */}
        <div
          className="relative min-h-56 overflow-hidden rounded-t-2xl lg:min-h-72 lg:rounded-l-2xl lg:rounded-tr-none"
          style={{ background: !project.image ? gradientBg : undefined }}
        >
          {/* Project screenshot image */}
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Overlay gradient for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
            </>
          ) : project.companyLogo ? (
            // Company logo fallback
            <div className="flex h-full min-h-56 items-center justify-center p-8 lg:min-h-72" style={{ background: gradientBg }}>
              <div className="relative h-24 w-48">
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
            <div className="flex h-full min-h-56 items-center justify-center p-8 lg:min-h-72" style={{ background: gradientBg }}>
              <div className="w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: project.gradient.from }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full opacity-60"
                    style={{ backgroundColor: project.gradient.from }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full opacity-30"
                    style={{ backgroundColor: project.gradient.from }}
                  />
                  <span className="ml-2 flex-1 truncate rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                    {project.liveUrl.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <div
                    className="h-3 w-3/4 rounded"
                    style={{ backgroundColor: `${project.gradient.from}20` }}
                  />
                  <div
                    className="h-3 w-1/2 rounded"
                    style={{ backgroundColor: `${project.gradient.from}15` }}
                  />
                  <div
                    className="h-3 w-2/3 rounded"
                    style={{ backgroundColor: `${project.gradient.from}10` }}
                  />
                  <div
                    className="mt-3 h-7 w-1/3 rounded-md"
                    style={{ backgroundColor: `${project.gradient.from}25` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Gradient accent line */}
          <div
            className="absolute bottom-0 left-0 z-10 h-1 w-full lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-1"
            style={{
              background: `linear-gradient(90deg, ${project.gradient.from}, ${project.gradient.to})`,
            }}
          />
        </div>

        {/* Info pane */}
        <div className="flex flex-col p-6 lg:p-8">
          <div className="mb-3 flex items-center gap-2">
            <StatusBadge status={project.status} />
            {project.stats.commits && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {project.stats.commits} commits
              </span>
            )}
            {project.stats.lighthouse && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {project.stats.lighthouse} Lighthouse
              </span>
            )}
          </div>

          <h3
            className="mb-2 text-xl font-semibold lg:text-2xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {project.description}
          </p>

          {/* Key highlights */}
          {project.highlights.length > 0 && (
            <ul className="mb-5 space-y-1.5">
              {project.highlights.slice(0, 3).map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  <span
                    className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: project.gradient.from }}
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* Tech chips with skill icons */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {techWithIcons.map((tech) => (
              <TechChip
                key={tech.label}
                label={tech.label}
                icon={tech.icon}
                color={tech.color}
              />
            ))}
            {project.tech.length > 6 && (
              <span className="rounded border border-gray-100 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-400 dark:border-gray-700 dark:bg-gray-800">
                +{project.tech.length - 6}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="mt-auto flex items-center gap-3">
            {project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`,
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                View live site
              </a>
            )}
            {project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;
