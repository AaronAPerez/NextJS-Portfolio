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
 * Match a tech string to a skill from the skills data
 *
 * Handles version numbers (e.g., "Next.js 16" -> "Next.js")
 * and common variations (e.g., "Tailwind CSS" matches "tailwind")
 *
 * @param techString - Technology string from project (e.g., "React 19", "TypeScript 5.7")
 * @returns TechSkillInfo with icon and color if matched, otherwise just the label
 */
export function matchTechToSkill(techString: string): TechSkillInfo {
  // Normalize the tech string: remove version numbers and lowercase
  const normalized = techString
    .toLowerCase()
    .replace(/\s*\d+(\.\d+)*\s*$/g, '') // Remove version numbers
    .trim();

  // Find matching skill
  const matchedSkill = skills.find((skill) => {
    const skillName = skill.name.toLowerCase();
    const skillId = skill.id.toLowerCase();

    // Direct match on name or id
    if (skillName === normalized || skillId === normalized) return true;

    // Partial matches for common variations
    if (normalized.includes(skillName) || skillName.includes(normalized)) return true;

    // Handle special cases
    const specialMatches: Record<string, string[]> = {
      'nextjs': ['next.js', 'next'],
      'tailwind': ['tailwind css', 'tailwindcss'],
      'typescript': ['ts'],
      'javascript': ['js'],
      'nodejs': ['node.js', 'node'],
      'react': ['react.js', 'reactjs'],
      'postgresql': ['postgres', 'neon postgresql', 'supabase'],
      'prisma': ['prisma orm'],
      'vercel': ['vercel analytics'],
      'socketio': ['socket.io'],
      'dotnet': ['.net', 'asp.net'],
      'csharp': ['c#'],
    };

    const variations = specialMatches[skillId] || [];
    return variations.some((v) => normalized.includes(v) || v.includes(normalized));
  });

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
    companyLogo: (project as ProjectDB & { companyLogo?: string }).companyLogo,
    stats: {
      lighthouse: project.technicalHighlights?.performanceScore,
      label: project.clientType === 'business' ? 'Client Project' : undefined,
    },
    tech: project.tech || [],
    highlights: project.technicalHighlights?.innovations || [],
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

/**
 * Separate featured project from others
 *
 * @param projects - Array of DisplayProject
 * @returns Object with featured project and remaining projects
 */
export function separateFeaturedProject(projects: DisplayProject[]): {
  featured: DisplayProject | undefined;
  others: DisplayProject[];
} {
  return {
    featured: projects.find((p) => p.featured),
    others: projects.filter((p) => !p.featured),
  };
}
