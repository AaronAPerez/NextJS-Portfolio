/**
 * SkillsSection Animation Variants
 *
 * Reusable Framer Motion variants for the skills section.
 * Includes staggered animations and hover effects.
 */

import type { Variants } from 'framer-motion';

// ─── Container Variants ───────────────────────────────────────────────────────

/**
 * Container variants for staggered children animations
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

// ─── Item Variants ────────────────────────────────────────────────────────────

/**
 * Individual skill card animation variants
 */
export const skillCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Hover animation for skill cards
 */
export const skillHoverVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// ─── Tab Variants ─────────────────────────────────────────────────────────────

/**
 * Category tab animation variants
 */
export const tabVariants: Variants = {
  inactive: {
    opacity: 0.7,
    scale: 1,
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    opacity: 1,
    scale: 1.02,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * Tab indicator (underline) animation
 */
export const tabIndicatorVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// ─── Section Header Variants ──────────────────────────────────────────────────

/**
 * Section header animation
 */
export const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ─── Icon Variants ────────────────────────────────────────────────────────────

/**
 * Skill icon hover animation
 */
export const iconVariants: Variants = {
  initial: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

// ─── Glow Effect Variants ─────────────────────────────────────────────────────

/**
 * Glow effect for core/highlighted skills
 */
export const glowVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
