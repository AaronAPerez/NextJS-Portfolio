/**
 * SkillsSection Module
 *
 * Clean exports for the skills section components.
 */

// Main component
export { default } from './SkillsSection';
export { default as SkillsSection } from './SkillsSection';

// Sub-components (for custom compositions)
export { default as SkillCard } from './SkillCard';
export { default as CategoryTabs } from './CategoryTabs';

// Constants & Types
export {
  CATEGORY_CONFIG,
  CORE_SKILL_IDS,
  getCategoryConfig,
  getCategoryGradient,
  isCoreSkill,
  type SkillCategoryId,
  type CategoryConfig,
} from './constants';

// Animations (for extending/customizing)
export {
  containerVariants,
  skillCardVariants,
  skillHoverVariants,
  tabVariants,
  headerVariants,
  iconVariants,
  glowVariants,
} from './animations';
