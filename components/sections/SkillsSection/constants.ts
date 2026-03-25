/**
 * SkillsSection Constants
 *
 * Configuration for skill categories, core skills, and display settings.
 * Centralized configuration for easy maintenance.
 */

import type { Skill } from '@/types/skills';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SkillCategoryId = Skill['category'] | 'all';

export interface CategoryConfig {
  /** Unique identifier matching skill category */
  id: SkillCategoryId;
  /** Display label for the tab */
  label: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Gradient colors for category accent */
  gradient: {
    from: string;
    to: string;
  };
  /** Short description of the category */
  description: string;
}

// ─── Core Skills Configuration ────────────────────────────────────────────────

/**
 * Primary stack skills that receive highlighted styling.
 * These are the technologies used on every production project.
 */
export const CORE_SKILL_IDS = [
  'react',
  'nextjs',
  'typescript',
  'tailwind',
  'nodejs',
  'csharp',
  'dotnet',
  'azure',
] as const;

// ─── Category Configuration ───────────────────────────────────────────────────

/**
 * Category tabs configuration with icons and gradients.
 * Order determines display order in the tabs.
 */
export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    id: 'all',
    label: 'All Skills',
    icon: 'Layers',
    gradient: { from: '#667eea', to: '#764ba2' },
    description: 'Complete technical toolkit',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'Monitor',
    gradient: { from: '#3b82f6', to: '#06b6d4' },
    description: 'UI/UX and client-side technologies',
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'Server',
    gradient: { from: '#10b981', to: '#059669' },
    description: 'Server-side and API development',
  },
  {
    id: 'database',
    label: 'Database',
    icon: 'Database',
    gradient: { from: '#f59e0b', to: '#d97706' },
    description: 'Data storage and management',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: 'Cloud',
    gradient: { from: '#8b5cf6', to: '#6366f1' },
    description: 'Cloud platforms and deployment',
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'Wrench',
    gradient: { from: '#ec4899', to: '#be185d' },
    description: 'Development tools and utilities',
  },
  {
    id: 'game',
    label: 'Game Dev',
    icon: 'Gamepad2',
    gradient: { from: '#ef4444', to: '#dc2626' },
    description: 'Game development technologies',
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Get category configuration by ID
 */
export const getCategoryConfig = (id: SkillCategoryId): CategoryConfig | undefined => {
  return CATEGORY_CONFIG.find((cat) => cat.id === id);
};

/**
 * Check if a skill is a core/primary stack skill
 */
export const isCoreSkill = (skillId: string): boolean => {
  return CORE_SKILL_IDS.includes(skillId as (typeof CORE_SKILL_IDS)[number]);
};

/**
 * Get gradient style for a category
 */
export const getCategoryGradient = (id: SkillCategoryId): string => {
  const config = getCategoryConfig(id);
  if (!config) return 'linear-gradient(135deg, #667eea, #764ba2)';
  return `linear-gradient(135deg, ${config.gradient.from}, ${config.gradient.to})`;
};
