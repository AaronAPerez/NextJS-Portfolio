/**
 * Hero Section Animation Variants
 *
 * Shared animation configurations for Hero section components.
 * Uses Framer Motion variant patterns for reusability and consistency.
 */

import { Variants, Transition } from 'framer-motion';

// =============================================================================
// Fade Animations
// =============================================================================

/**
 * Fade in from left animation for content column
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

/**
 * Fade in from right animation for visual column
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.2
    }
  }
};

/**
 * Fade in from bottom for staggered elements
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

/**
 * Simple fade animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

// =============================================================================
// Scale Animations
// =============================================================================

/**
 * Scale up animation for badges and icons
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.5,
      duration: 0.5
    }
  }
};

// =============================================================================
// Tech Rotation Animations
// =============================================================================

/**
 * Tech name rotation animation
 */
export const techRotation: Variants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -10
  }
};

// =============================================================================
// Hover/Tap Animations
// =============================================================================

/**
 * Interactive element hover animation
 */
export const hoverScale = {
  scale: 1.1,
  y: -2
};

/**
 * Interactive element tap animation
 */
export const tapScale = {
  scale: 0.95
};

/**
 * Button hover animation
 */
export const buttonHover = {
  scale: 1.05
};

// =============================================================================
// Transition Presets
// =============================================================================

export const transitions = {
  fast: {
    duration: 0.2
  } as Transition,
  default: {
    duration: 0.3
  } as Transition,
  slow: {
    duration: 0.5,
    ease: 'easeOut'
  } as Transition,
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 25
  } as Transition
} as const;

// =============================================================================
// Reduced Motion Helpers
// =============================================================================

/**
 * Returns empty object if reduced motion is preferred
 * @param animation - The animation to conditionally apply
 * @param prefersReducedMotion - User's motion preference
 */
export const withReducedMotion = <T extends object>(
  animation: T,
  prefersReducedMotion: boolean | null
): T | Record<string, never> => {
  return prefersReducedMotion ? {} : animation;
};

/**
 * Returns instant transition if reduced motion is preferred
 */
export const getTransition = (
  prefersReducedMotion: boolean | null,
  normalTransition: Transition = transitions.default
): Transition => {
  return prefersReducedMotion ? { duration: 0 } : normalTransition;
};
