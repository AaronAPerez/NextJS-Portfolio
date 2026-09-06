/**
 * Project Mappers
 *
 * Utility functions for converting between different project data formats.
 * Handles mapping from database (ProjectDB) and static config formats to DisplayProject.
 */

import type { ProjectDB } from '@/types/project';
import type { DisplayProject } from '@/types/display-project';
import { DEFAULT_GRADIENT } from '@/types/display-project';
import type { Project } from '@/components/config/projects';
import { skills } from '@/data/skills';

/**
 * Matched skill info for tech chips
 */
export interface TechSkillInfo {
  label: string;
  icon?: string;
  color?: string;
}

/**
 * Aliases mapping a project's tech string to a skill id.
 *
 * Explicit rather than fuzzy on purpose: the previous substring matcher paired
 * every "Next.js" chip with the JavaScript logo, because the 'js' alias for
 * JavaScript is a substring of "next.js" and JavaScript is declared first in
 * the skills list. Anything not listed here renders as a text-only chip, which
 * is the correct outcome for a tool we have no icon for.
 *
 * Keys are compared against the tech string lowercased with any trailing
 * version number stripped ("TypeScript 5.7" -> "typescript").
 */
const TECH_ALIASES: Record<string, string> = {
  // Frontend
  'next.js': 'nextjs',
  next: 'nextjs',
  nextjs: 'nextjs',
  react: 'react',
  'react.js': 'react',
  reactjs: 'react',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  html: 'html5',
  html5: 'html5',
  css: 'css3',
  css3: 'css3',
  'tailwind css': 'tailwind',
  tailwindcss: 'tailwind',
  tailwind: 'tailwind',
  vite: 'vite',
  bootstrap: 'bootstrap',
  'react bootstrap': 'react-bootstrap',
  'chakra ui': 'chakra-ui',

  // Backend and data
  'node.js': 'nodejs',
  nodejs: 'nodejs',
  node: 'nodejs',
  'nest.js': 'nestjs',
  nestjs: 'nestjs',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  'neon postgresql': 'neon',
  neon: 'neon',
  supabase: 'supabase',
  mysql: 'mysql',
  'azure sql': 'azure-sql',
  prisma: 'prisma',
  'prisma orm': 'prisma',
  'socket.io': 'socketio',
  socketio: 'socketio',
  'c#': 'csharp',
  csharp: 'csharp',
  '.net': 'dotnet',
  'asp.net': 'dotnet',
  dotnet: 'dotnet',

  // Platform and tooling
  vercel: 'vercel',
  'vercel analytics': 'vercel',
  azure: 'azure',
  'google cloud': 'googlecloud',
  docker: 'docker',
  git: 'git',
  postman: 'postman',
  swagger: 'swagger',
  axios: 'axios',
  json: 'json',
  unity: 'unity',
  'google analytics': 'ga4',
  ga4: 'ga4',
  'google ads': 'google-ads',
};

/**
 * Match a tech string to a skill from the skills data.
 *
 * @param techString - Technology string from project (e.g. "React 19")
 * @returns TechSkillInfo with icon and color when the tech has a known icon,
 *   otherwise just the label
 */
export function matchTechToSkill(techString: string): TechSkillInfo {
  // "TypeScript 5.7" and "TypeScript" should resolve to the same skill.
  const normalized = techString
    .toLowerCase()
    .replace(/\s*\d+(\.\d+)*\s*$/, '')
    .trim();

  const skillId = TECH_ALIASES[normalized];
  const matchedSkill = skillId
    ? skills.find((skill) => skill.id === skillId)
    : undefined;

  return {
    label: techString,
    icon: matchedSkill?.icon,
    color: matchedSkill?.color,
  };
}

/**
 * Match all tech strings to skills
 *
 * @param techStrings - Array of technology strings from project
 * @returns Array of TechSkillInfo with icons and colors where available
 */
export function matchTechArrayToSkills(techStrings: string[]): TechSkillInfo[] {
  return techStrings.map(matchTechToSkill);
}

/**
 * Adjust hex color brightness
 *
 * @param hex - Hex color string (e.g., "#FD5A1E")
 * @param amount - Amount to adjust brightness (negative = darker, positive = lighter)
 * @returns Adjusted hex color string
 */
export function adjustColor(hex: string, amount: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Convert database project to display format
 *
 * Maps ProjectDB schema to the unified DisplayProject interface
 * for consistent rendering across the application.
 *
 * @param project - Database project object
 * @returns DisplayProject formatted for UI rendering
 */
export function mapDBToDisplay(project: ProjectDB): DisplayProject {
  // Map database status to display status
  const getStatus = (): DisplayProject['status'] => {
    if (project.isLive) return 'production';
    if (project.status === 'in_development') return 'in-progress';
    return 'archived';
  };

  // Map database category to display category
  const getCategory = (): DisplayProject['category'] => {
    if (project.category === 'production') return 'client';
    if (project.category === 'portfolio') return 'saas';
    return 'tool';
  };

  // Get primary image from images array
  const primaryImage = project.images?.find((img) => img.isPrimary)?.url
    || project.images?.[0]?.url;

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    longDescription: project.description,
    liveUrl: project.websiteLink || project.demoLink || '#',
    githubUrl: project.codeLink || '#',
    featured: project.featured,
    status: getStatus(),
    category: getCategory(),
    gradient: project.gradient || DEFAULT_GRADIENT,
    image: primaryImage,
    companyLogo: project.companyLogo ?? undefined,
    stats: {
      // The stored label ("Houston, TX") is more informative than the generic
      // fallback, which is why it wins when a row has one.
      label:
        project.stats?.label ??
        (project.clientType === 'business' ? 'Client Project' : undefined),
    },
    tech: project.tech || [],
    // The real content lives in the row's own `highlights` column — not
    // `technicalHighlights.innovations`, which no row in this DB populates,
    // so reading it here silently dropped every DB-backed project's
    // highlights list.
    highlights: project.highlights || [],
  };
}

/**
 * Convert static project to display format
 *
 * Maps static config Project to the unified DisplayProject interface.
 * Automatically generates gradient from accentColor.
 *
 * @param project - Static config project object
 * @returns DisplayProject formatted for UI rendering
 */
export function mapStaticToDisplay(project: Project): DisplayProject {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    featured: project.featured,
    status: project.status,
    category: project.category,
    // Generate gradient from accentColor
    gradient: {
      from: project.accentColor,
      to: adjustColor(project.accentColor, -30),
    },
    image: project.image,
    companyLogo: project.companyLogo,
    stats: project.stats,
    tech: project.tech,
    highlights: project.highlights,
  };
}

/**
 * Calculate filter counts for each category
 *
 * @param projects - Array of DisplayProject
 * @returns Object with counts for each filter category
 */
export function calculateFilterCounts(
  projects: DisplayProject[]
): Record<'all' | 'client' | 'saas' | 'tool', number> {
  return {
    all: projects.length,
    client: projects.filter((p) => p.category === 'client').length,
    saas: projects.filter((p) => p.category === 'saas').length,
    tool: projects.filter((p) => p.category === 'tool').length,
  };
}

/**
 * Filter projects by category
 *
 * @param projects - Array of DisplayProject
 * @param category - Category to filter by ('all' returns unfiltered)
 * @returns Filtered array of DisplayProject
 */
export function filterProjectsByCategory(
  projects: DisplayProject[],
  category: 'all' | 'client' | 'saas' | 'tool'
): DisplayProject[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}
