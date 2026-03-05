/**
 * Skill Categories Configuration
 *
 * Contains category definitions, counts, and icon mappings for the skills section.
 * Pre-computed values for optimal performance.
 */

import { skills } from '@/data/skills'

// Category configuration - all available skill categories with metadata
export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Skills',
    color: '#3B82F6',
    description: 'Complete technology stack and development tools',
    icon: '🚀'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#EC4899',
    description: 'User interfaces and web technologies',
    icon: '🎨'
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#10B981',
    description: 'Server-side development and APIs',
    icon: '⚙️'
  },
  {
    id: 'database',
    name: 'Database',
    color: '#8B5CF6',
    description: 'Data storage and management systems',
    icon: '🗄️'
  },
  {
    id: 'tools',
    name: 'Tools',
    color: '#F59E0B',
    description: 'Development tools and workflows',
    icon: '🛠️'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    color: '#06B6D4',
    description: 'Cloud services and deployment',
    icon: '☁️'
  },
  {
    id: 'game',
    name: 'Game Dev',
    color: '#EF4444',
    description: 'Game development and engines',
    icon: '🎮'
  }
] as const

// Type for category IDs - ensures type safety when using category identifiers
export type CategoryId = typeof CATEGORIES[number]['id']

// Pre-computed skill counts per category for performance optimization
// Avoids recalculating counts on every render
export const CATEGORY_COUNTS = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.id === 'all' ? skills.length : skills.filter(s => s.category === cat.id).length
  return acc
}, {} as Record<CategoryId, number>)

// Category icon lookup for quick access throughout the application
// Provides O(1) access to icons by category ID
export const CATEGORY_ICONS = Object.fromEntries(CATEGORIES.map(c => [c.id, c.icon]))
