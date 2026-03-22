/**
 * Contact Section Animation Variants
 *
 * Shared animation configurations for consistent motion across components.
 * Uses Framer Motion variant patterns for reusability.
 */

import { Variants } from 'framer-motion';

// =============================================================================
// Fade and Slide Animations
// =============================================================================

/**
 * Fade in from bottom animation for general content
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
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

/**
 * Fade in from left animation for form elements
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30
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
 * Fade in from right animation for sidebar elements
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: 'easeOut'
    }
  }
};

// =============================================================================
// Scale Animations
// =============================================================================

/**
 * Scale up animation for buttons and interactive elements
 */
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

/**
 * Pop in animation for notification badges
 */
export const popIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2
    }
  }
};

// =============================================================================
// Notification Animations
// =============================================================================

/**
 * Slide down animation for toast notifications
 */
export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
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
// Hover/Tap States (for use with whileHover/whileTap)
// =============================================================================

export const buttonHoverTap = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const linkHoverTap = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
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
  bounce: {
    type: 'spring',
    stiffness: 500,
    damping: 30
  }
} as const;
