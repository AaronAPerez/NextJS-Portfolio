/**
 * AboutSection Module Exports
 *
 * Barrel export file for the AboutSection components.
 * Provides a single entry point for importing about-related components.
 *
 * @example
 * // Import specific components
 * import { AboutSection, AboutNarrative, SimpleTimeline } from '@/components/sections/AboutSection';
 *
 * // Or import the default
 * import AboutSection from '@/components/sections/AboutSection';
 */

// =============================================================================
// Main Components
// =============================================================================

export { AboutSection } from './AboutSection';

// =============================================================================
// Reusable Sub-Components
// =============================================================================

export { AboutNarrative } from './AboutNarrative';
export { SimpleTimeline } from './SimpleTimeline';
export { AboutStats } from './AboutStats';
export { EducationCredentials } from './EducationCredentials';
export { CardContainer, CardBody, CardItem } from './CardContainer';

// =============================================================================
// Animation Utilities
// =============================================================================

export * from './animations';

// =============================================================================
// Default Export
// =============================================================================

export { AboutSection as default } from './AboutSection';
