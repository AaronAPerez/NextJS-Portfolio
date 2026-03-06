/**
 * Barrel Export for Skills Components
 *
 * Provides convenient single-import access to all skill-related components.
 * This simplifies imports in parent components:
 *
 * Instead of:
 *   import { SkillCard } from './skills/SkillCard'
 *   import { CategoryButton } from './skills/CategoryButton'
 *   import { SkillsGrid } from './skills/SkillsGrid'
 *
 * Use:
 *   import { SkillCard, CategoryButton, SkillsGrid } from './skills'
 */

export { SkillCard } from './SkillCard'
export { CategoryButton } from './CategoryButton'
export { SkillsGrid } from './SkillsGrid'
