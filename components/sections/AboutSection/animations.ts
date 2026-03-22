/**
 * About Section Animation Variants
 *
 * Shared animation configurations for consistent motion across components.
 * Uses Framer Motion variant patterns for reusability.
 */

import { Variants } from 'framer-motion';

// =============================================================================
// Fade Animations
// =============================================================================

/**
 * Fade in from bottom animation for general content
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Fade in from left animation
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
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * Fade in from right animation
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
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// =============================================================================
// Scale Animations
// =============================================================================

/**
 * Scale up animation for cards and stats
 */
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// =============================================================================
// Container Animations (for staggered children)
// =============================================================================

/**
 * Stagger container for animating children sequentially
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Child item animation for use with stagger container
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// =============================================================================
// Timeline Specific Animations
// =============================================================================

/**
 * Timeline item slide in animation
 */
export const timelineSlideIn: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * List item animation for details
 */
export const listItemFade: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// =============================================================================
// Transition Presets
// =============================================================================

export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 25
  },
  smooth: {
    duration: 0.3,
    ease: 'easeInOut'
  },
  slow: {
    duration: 0.6,
    ease: 'easeOut'
  }
} as const;
