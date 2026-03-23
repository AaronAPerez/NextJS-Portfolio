/**
 * Hooks Module Exports
 *
 * Barrel export file for all custom React hooks.
 * Provides a single entry point for importing hooks.
 *
 * @example
 * import { useLocalStorage, useCopyToClipboard } from '@/hooks';
 */

// =============================================================================
// Storage Hooks
// =============================================================================

export { useLocalStorage, default as useLocalStorageDefault } from './useLocalStorage';

// =============================================================================
// Clipboard Hooks
// =============================================================================

export { useCopyToClipboard, default as useCopyToClipboardDefault } from './useCopyToClipboard';

// =============================================================================
// Performance & Analytics Hooks
// =============================================================================

export { useWebVitals, default as useWebVitalsDefault } from './useWebVitals';

// =============================================================================
// UI/UX Hooks
// =============================================================================

export { useIntersectionObserver, default as useIntersectionObserverDefault } from './useIntersectionObserver';

// =============================================================================
// Data Hooks
// =============================================================================

export { useProjects, default as useProjectsDefault } from './useProjects';
