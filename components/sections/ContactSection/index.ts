/**
 * ContactSection Module Exports
 *
 * Barrel export file for the ContactSection components.
 * Provides a single entry point for importing contact-related components.
 *
 * @example
 * // Import specific components
 * import { ContactSection, ContactForm, SocialLinks } from '@/components/sections/ContactSection';
 *
 * // Or import the default
 * import ContactSection from '@/components/sections/ContactSection';
 */

// =============================================================================
// Main Components
// =============================================================================

export { ContactSection } from './ContactSection';
export { ContactForm } from './ContactForm';

// =============================================================================
// Reusable Sub-Components
// =============================================================================

export { ContactSidebar } from './ContactSidebar';
export { ContactInfoCard } from './ContactInfoCard';
export { QuickActionButton } from './QuickActionButton';
export { SocialLinks } from './SocialLinks';
export { CopyNotification } from './CopyNotification';

// =============================================================================
// Animation Utilities
// =============================================================================

export * from './animations';

// =============================================================================
// Default Export
// =============================================================================

export { ContactSection as default } from './ContactSection';
