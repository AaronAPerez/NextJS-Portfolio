/**
 * ProjectCard Component
 *
 * Standard project card: screenshot, brand mark, tech stack, and explicit
 * "View live site" / "View source" actions. Used uniformly for every project
 * — there is no separate "featured" treatment.
 */

'use client';

import Image from 'next/image';
import { memo, useMemo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, MapPin } from 'lucide-react';
import type { DisplayProject } from '@/types/display-project';
import { DEFAULT_GRADIENT } from '@/types/display-project';
import { TechChip, ProjectLogo } from './shared';
import { matchTechArrayToSkills } from './utils/project-mappers';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  /** Project data to display */
  project: DisplayProject;
  /**
   * Marks this card's screenshot eager/high-priority. The first row of the
   * grid renders above the fold on most viewports — Next's LCP detector
   * flags those images and asks for this when they're left lazy-loaded.
   */
  priority?: boolean;
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
    y: -6,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ─── Status Presentation ──────────────────────────────────────────────────────

const STATUS_CONFIG = {
  production: {
    label: 'Live',
    className:
      'border-green-500/30 bg-green-500/15 text-green-700 dark:text-green-300',
    dot: 'bg-green-500',
    pulse: true,
  },
  'in-progress': {
    label: 'In Progress',
    className:
      'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    pulse: false,
  },
  archived: {
    label: 'Archived',
    className:
      'border-gray-500/30 bg-gray-500/15 text-gray-700 dark:text-gray-300',
    dot: 'bg-gray-400',
    pulse: false,
  },
} as const;

// ─── Main Component ───────────────────────────────────────────────────────────

function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const gradient = project.gradient ?? DEFAULT_GRADIENT;
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.archived;
  const hasLiveSite = project.status === 'production' && project.liveUrl !== '#';

  const techWithIcons = useMemo(
    () => matchTechArrayToSkills(project.tech.slice(0, 4)),
    [project.tech]
  );

  return (
    <m.article
      variants={shouldReduceMotion ? undefined : cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover={shouldReduceMotion ? undefined : 'hover'}
      viewport={{ once: true }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Preview pane */}
      {/* 16:9 roughly matches these screenshots' real aspect ratio (1.67-2.1);
          16:10 forced a heavy horizontal crop that read as "zoomed in". */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? undefined : 'lazy'}
            priority={priority}
          />
        ) : (
          // Abstract browser chrome stands in when a project has no screenshot
          <div
            className="flex h-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}18, ${gradient.to}0D)`,
            }}
            aria-hidden="true"
          >
            <div className="w-4/5 max-w-[200px] overflow-hidden rounded-lg border border-black/5 bg-white/70 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2 dark:border-white/10">
                {[1, 0.6, 0.3].map((opacity) => (
                  <span
                    key={opacity}
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: gradient.from, opacity }}
                  />
                ))}
              </div>
              <div className="space-y-2 p-4">
                {['75%', '50%', '66%'].map((width, i) => (
                  <div
                    key={width}
                    className="h-2.5 rounded"
                    style={{
                      width,
                      backgroundColor: gradient.from,
                      opacity: 0.25 - i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hover actions — visual duplicate of the action row below, for mouse
            users who hover the screenshot directly. aria-hidden + tabIndex=-1
            keep it out of the a11y tree and tab order entirely, so keyboard
            and screen-reader users see exactly one set of links (the row
            below), not two pointing at the same destinations. */}
        {(hasLiveSite || project.githubUrl !== '#') && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            {/* Frosted panel sized to the buttons only — the rest of the
                screenshot stays sharp and unobscured on hover. */}
            <div className="flex items-center gap-3 rounded-2xl bg-black/50 px-4 py-3 shadow-lg backdrop-blur-md">
              {hasLiveSite && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
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
                  tabIndex={-1}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  View source
                </a>
              )}
            </div>
          </div>
        )}

        {/* Scrim keeps the status badge readable over light screenshots */}
        <div
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent"
          aria-hidden="true"
        />

        <span
          className={`absolute right-3 top-50 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium backdrop-blur-sm ${status.className}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${status.dot} ${status.pulse ? 'animate-pulse' : ''}`}
            aria-hidden="true"
          />
          {status.label}
        </span>

        {/* Accent rule ties the preview to the project's brand colour */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand mark + title */}
        <div className="mb-3 flex items-start gap-3">
          <ProjectLogo
            title={project.title}
            logo={project.companyLogo}
            accentColor={gradient.from}
            size="md"
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h3>

            {project.stats.label && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                {project.stats.label}
              </p>
            )}
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {techWithIcons.map((tech) => (
            <TechChip
              key={tech.label}
              label={tech.label}
              icon={tech.icon}
              color={tech.color}
            />
          ))}
          {project.tech.length > 4 && (
            <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
          {hasLiveSite && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              }}
              aria-label={`${project.title} — view live site (opens in a new tab)`}
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              View source
            </a>
          )}
        </div>
      </div>
    </m.article>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(ProjectCard);
