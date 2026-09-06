/**
 * Animation Variants
 *
 * Reusable Framer Motion animation variants for the projects section.
 * These can be imported and used across different components.
 */

import type { Variants } from 'framer-motion';

/**
 * Container variants for staggered children animations
 *
 * @example
 * ```tsx
 * <motion.div variants={containerVariants} initial="hidden" animate="visible">
 *   {items.map(item => <motion.div variants={itemVariants} />)}
 * </motion.div>
 * ```
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Item variants for individual card animations
 * Used with containerVariants for staggered entrance effects.
 */
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Fade in animation for simple opacity transitions
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/**
 * Scale up animation for hover effects
 */
export const scaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Slide in from right animation
 */
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide in from left animation
 */
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};



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
